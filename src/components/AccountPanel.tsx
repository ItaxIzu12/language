import { useState } from "react";
import type { FormEvent } from "react";
import { accountSession } from "../lib/account";
import { draftKey } from "../lib/useAccountSync";
import { useStore } from "../lib/store";

export default function AccountPanel() {
  const { username, sync, lang } = useStore();
  const [register, setRegister] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      await accountSession();
      await accountSession(register ? "register" : "login", {
        username: String(fields.get("username")), password: String(fields.get("password")),
      });
      location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verbindung fehlgeschlagen.");
      setBusy(false);
    }
  }
  if (username) return <div>
    <p>Angemeldet als <strong>{username}</strong></p>
    <p role="status">{sync.status || "Kontostand geladen."}</p>
    <div className="my-3 flex flex-wrap gap-2">
      {sync.pending && !sync.blocked && <button className="btn-line" onClick={sync.retry}>Erneut speichern</button>}
      {sync.blocked && <button className="btn-line" onClick={() => {
        if (window.confirm("Lokalen Entwurf verwerfen und Serverstand laden? Exportiere bei Bedarf zuerst eine Sicherung.")) {
          sessionStorage.removeItem(draftKey(username, lang.code));
          location.reload();
        }
      }}>Serverstand laden</button>}
      <button className="btn-line" disabled={busy || sync.pending} onClick={async () => {
        setBusy(true);
        try { await accountSession("logout"); location.reload(); }
        catch { setError("Abmeldung fehlgeschlagen."); setBusy(false); }
      }}>Abmelden</button>
    </div>{error && <p role="alert">{error}</p>}
  </div>;
  return <form onSubmit={submit} className="grid max-w-md gap-3">
    <p>Mit einem Konto kannst du auf mehreren Geräten weiterlernen. Deinen Gaststand kannst du als Datei ins Konto übernehmen.</p>
    <label>Benutzername<input className="field" required name="username" autoComplete="username" maxLength={150}/></label>
    <label>Passwort<input className="field" required type="password" name="password" autoComplete={register ? "new-password" : "current-password"}/></label>
    {error && <p role="alert">{error}</p>}
    <button className="btn-ink" disabled={busy}>{register ? "Konto erstellen" : "Anmelden"}</button>
    <button type="button" className="btn-line" disabled={busy} onClick={() => { setRegister(!register); setError(""); }}>
      {register ? "Zur Anmeldung" : "Neues Konto anlegen"}</button>
  </form>;
}
