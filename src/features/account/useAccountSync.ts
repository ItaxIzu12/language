import { useEffect, useRef, useState } from "react";
import { accountSession, ApiError, readState, writeState } from "./account";
import type { AccountState, LearnerDocument } from "./account";

export interface Draft {
  revision: number;
  document: LearnerDocument;
  updatedAt?: number;
  sourceKey?: string;
}

export function draftKey(username: string, language: string) {
  return "linguaflow.draft." + JSON.stringify([username, language]);
}

export function getDraft(key: string): Draft | null {
  try {
    const candidates: Draft[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const candidate = localStorage.key(i)!;
      if (!candidate.startsWith(key + ".")) continue;
      let value;
      try {
        value = JSON.parse(localStorage.getItem(candidate) ?? "null");
      } catch {
        continue;
      }
      if (
        value?.document?.settings &&
        value.document.progress &&
        Array.isArray(value.document.customWords) &&
        Number.isInteger(value.revision)
      )
        candidates.push({ ...value, sourceKey: candidate });
    }
    candidates.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
    return candidates[0] ?? JSON.parse(sessionStorage.getItem(key) ?? "null");
  } catch {
    return null;
  }
}

export function discardDraft(key: string, draft: Draft | null) {
  sessionStorage.removeItem(key);
  if (!draft?.sourceKey) return;
  const saved = JSON.parse(localStorage.getItem(draft.sourceKey) ?? "null");
  if (JSON.stringify(saved?.document) === JSON.stringify(draft.document)) localStorage.removeItem(draft.sourceKey);
}

export function useAccountSync(account: AccountState | null, document: LearnerDocument, draft: Draft | null) {
  const revision = useRef(draft?.revision ?? account?.revision ?? 0);
  const saved = useRef(draft ? null : document);
  const latest = useRef(document);
  const running = useRef(false);
  const blocked = useRef(false);
  const mounted = useRef(false);
  const storageKey = useRef(draftKey(account?.username ?? "", document.settings.lang) + "." + crypto.randomUUID());
  const [attempt, retry] = useState(0);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(!!draft);
  const [conflict, setConflict] = useState<Pick<AccountState, "document" | "revision"> | null>(null);
  const [resolving, setResolving] = useState(false);

  function cache(current: LearnerDocument) {
    try {
      localStorage.setItem(
        storageKey.current,
        JSON.stringify({ revision: revision.current, document: current, updatedAt: Date.now() }),
      );
      return true;
    } catch {
      return false;
    }
  }

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    latest.current = document;
    if (!account || saved.current === document) return;
    const durable = cache(document);
    setPending(true);
    if (blocked.current) return;
    setStatus(
      durable
        ? "Auf diesem Gerät gesichert · wird synchronisiert …"
        : "Gerätespeicher voll. Bitte Tab offen lassen und eine Sicherung exportieren.",
    );
    async function flush() {
      if (!account || running.current) return;
      running.current = true;
      try {
        while (mounted.current && saved.current !== latest.current) {
          const current = latest.current;
          const result = await writeState(account.username, revision.current, current);
          revision.current = result.revision;
          saved.current = current;
          if (current !== latest.current) cache(latest.current);
        }
        if (mounted.current) {
          localStorage.removeItem(storageKey.current);
          discardDraft(draftKey(account.username, document.settings.lang), draft);
          setPending(false);
          setStatus("Auf dem Server gespeichert.");
        }
      } catch (err) {
        if (!mounted.current) return;
        blocked.current = err instanceof ApiError && [409, 401, 403].includes(err.status);
        if (err instanceof ApiError && err.status === 409) {
          try {
            setConflict(await readState(account.username, document.settings.lang));
          } catch {
            /* Retry remains available if the server cannot be read. */
          }
        }
        setStatus(
          blocked.current
            ? "Ein anderer Kontostand liegt vor. Bitte öffne dein Profil, um weiterzumachen."
            : durable
              ? "Verbindung unterbrochen. Änderungen sind auf diesem Gerät gesichert."
              : "Speichern fehlgeschlagen. Bitte Tab offen lassen und eine Sicherung exportieren.",
        );
      } finally {
        running.current = false;
      }
    }
    const timer = window.setTimeout(() => void flush(), 250);
    return () => window.clearTimeout(timer);
  }, [account, document, attempt]);

  useEffect(() => {
    const online = () => {
      if (!blocked.current) retry((n) => n + 1);
    };
    window.addEventListener("online", online);
    return () => window.removeEventListener("online", online);
  }, []);

  useEffect(() => {
    if (!pending) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [pending]);

  async function resolve(choice: "device" | "server") {
    if (!account || !conflict || resolving) return;
    setResolving(true);
    try {
      const username = await accountSession();
      if (username !== account.username) throw new Error("Bitte melde dich wieder mit dem ursprünglichen Konto an.");
      // Recheck before replacing either side. A newer remote write must be reviewed again.
      const remote = await readState(account.username, document.settings.lang);
      if (remote.revision !== conflict.revision) {
        setConflict(remote);
        setStatus("Der Serverstand wurde erneut geändert. Bitte prüfe die Auswahl noch einmal.");
        return;
      }
      localStorage.setItem(
        "linguaflow.recovery." + JSON.stringify([account.username, document.settings.lang]) + "." + Date.now(),
        JSON.stringify({ device: latest.current, server: remote, createdAt: Date.now() }),
      );
      if (choice === "device") {
        const current = latest.current;
        const result = await writeState(account.username, remote.revision, current);
        revision.current = result.revision;
        saved.current = current;
        blocked.current = false;
        setConflict(null);
        retry((n) => n + 1);
        localStorage.removeItem(storageKey.current);
        discardDraft(draftKey(account.username, document.settings.lang), draft);
        if (latest.current !== current) cache(latest.current);
        setPending(latest.current !== current);
        setStatus("Dein Gerätestand wurde gespeichert. Beide vorherigen Stände sind im Wiederherstellungsarchiv.");
      } else {
        localStorage.removeItem(storageKey.current);
        discardDraft(draftKey(account.username, document.settings.lang), draft);
        window.location.reload();
      }
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Wiederherstellung fehlgeschlagen. Bitte erneut versuchen.");
    } finally {
      setResolving(false);
    }
  }

  return {
    status,
    pending,
    conflict,
    resolving,
    resolve,
    retry: () => {
      blocked.current = false;
      retry((n) => n + 1);
    },
    blocked: blocked.current,
  };
}
