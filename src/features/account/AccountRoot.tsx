import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getLanguage } from "../../data/languages";
import { StoreProvider } from "../../lib/store";
import { accountEnabled, accountSession, readState } from "./account";
import type { AccountState } from "./account";

export default function AccountRoot({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<AccountState | null | undefined>(accountEnabled ? undefined : null);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!accountEnabled) return;
    let active = true;
    async function load() {
      const username = await accountSession();
      const preference = new URLSearchParams(window.location.search).get("lang");
      const language = getLanguage(preference ?? "").code;
      const account = username ? { username, language, ...await readState(username, language) } : null;
      if (active) setAccount(account);
    }
    void load().catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, []);
  if (account === undefined) return <main className="mx-auto max-w-lg p-8" role="status">
    {error ? <>Der Lernserver ist gerade nicht erreichbar. <button className="btn-line" onClick={() => location.reload()}>Erneut verbinden</button>
      <button className="btn-line" onClick={() => setAccount(null)}>Lokal als Gast lernen</button></> : "Lernstand wird geladen …"}
  </main>;
  return <StoreProvider account={account}>{children}</StoreProvider>;
}
