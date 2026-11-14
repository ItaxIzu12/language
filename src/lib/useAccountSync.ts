import { useEffect, useRef, useState } from "react";
import { ApiError, writeState } from "./account";
import type { AccountState, LearnerDocument } from "./account";

export interface Draft {
  revision: number;
  document: LearnerDocument;
}

export function draftKey(username: string, language: string) {
  return "linguaflow.draft." + JSON.stringify([username, language]);
}

export function getDraft(key: string): Draft | null {
  try { return JSON.parse(sessionStorage.getItem(key) ?? "null"); }
  catch { return null; }
}

export function useAccountSync(account: AccountState | null, document: LearnerDocument, draft: Draft | null) {
  const revision = useRef(draft?.revision ?? account?.revision ?? 0);
  const saved = useRef(draft ? null : document);
  const latest = useRef(document);
  const running = useRef(false);
  const blocked = useRef(false);
  const mounted = useRef(false);
  const [attempt, retry] = useState(0);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(!!draft);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  useEffect(() => {
    latest.current = document;
    if (!account || saved.current === document) return;
    const key = draftKey(account.username, document.settings.lang);
    function cache(value: Draft | null) {
      try {
        if (value) sessionStorage.setItem(key, JSON.stringify(value));
        else sessionStorage.removeItem(key);
      } catch { /* The in-memory draft still permits retry and export. */ }
    }
    cache({ revision: revision.current, document });
    setPending(true);
    if (blocked.current) return;
    setStatus("Speichert …");
    async function flush(username: string) {
      if (running.current) return;
      running.current = true;
      try {
        while (mounted.current && saved.current !== latest.current) {
          const current = latest.current;
          const data = await writeState(username, revision.current, current);
          revision.current = data.revision;
          saved.current = current;
          if (current !== latest.current) cache({ revision: data.revision, document: latest.current });
        }
        if (mounted.current) {
          cache(null);
          setPending(false);
          setStatus("Auf dem Server gespeichert.");
        }
      } catch (err) {
        if (!mounted.current) return;
        blocked.current = err instanceof ApiError && [409, 401, 403].includes(err.status);
        setStatus(blocked.current
          ? "Speichern angehalten. Exportiere deine Sicherung und lade anschließend den Kontostand neu."
          : "Speichern fehlgeschlagen. Dein Entwurf bleibt in diesem Tab.");
      } finally {
        running.current = false;
      }
    }
    const timer = window.setTimeout(() => void flush(account.username), 250);
    return () => window.clearTimeout(timer);
  }, [account, document, attempt]);

  useEffect(() => {
    if (!pending) return;
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [pending]);
  return { status, pending, retry: () => retry(n => n + 1), blocked: blocked.current };
}
