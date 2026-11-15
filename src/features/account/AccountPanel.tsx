import { Check, Circle } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { accountEnabled, accountSession, socialOptions } from "./account";
import SocialSignIn from "./SocialSignIn";
import { draftKey } from "./useAccountSync";
import { useStore } from "../../lib/store";

export default function AccountPanel({ afterAuth }: { afterAuth?: string }) {
  const { username, sync, lang } = useStore();
  const [register, setRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const rules = [
    { label: "Mindestens 8 Zeichen", met: Array.from(password).length >= 8 },
    { label: "Mindestens ein Sonderzeichen (z. B. !, ? oder #)", met: /[\p{P}\p{S}]/u.test(password) },
    { label: "Beide Passwörter stimmen überein", met: password.length > 0 && password === confirmation },
  ];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accountEnabled || busy) return;
    const fields = new FormData(event.currentTarget);
    if (register && fields.get("password") !== fields.get("confirmation")) {
      setError("Die beiden Passwörter stimmen nicht überein.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await accountSession();
      await accountSession(register ? "register" : "login", {
        username: String(fields.get("username")), password: String(fields.get("password")),
      });
      if (afterAuth) {
        const target = new URL(window.location.pathname + afterAuth, window.location.origin);
        window.history.replaceState(null, "", target);
      }
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
  const { csrf, providers } = socialOptions();
  return <div className="account-fields">
    <div className="account-modes" role="group" aria-label="Kontozugang">
      {[false, true].map(mode => <button type="button" key={String(mode)} aria-pressed={register === mode}
        disabled={busy} onClick={() => { if (mode !== register) { setShowPassword(false); setPassword(""); setConfirmation(""); } setRegister(mode); setError(""); }}>
        {mode ? "Registrieren" : "Anmelden"}
      </button>)}
    </div>
    <h2>{register ? "Konto erstellen" : "Willkommen zurück"}</h2>
    <p>{register ? "Lege deinen Zugang an, um deinen Lernfortschritt zu speichern." : "Melde dich an, um deinen Kurs fortzusetzen."}</p>
    {!accountEnabled && <p className="account-preview">In dieser Vorschau kannst du als Gast lernen. Für ein Lernkonto starte die App mit Docker Compose.</p>}

    <form key={String(register)} onSubmit={submit} className="grid gap-3">
    <label>Benutzername<input className="field" disabled={!accountEnabled} required name="username" autoComplete="username" maxLength={150}/></label>
    <label>Passwort<input className="field" value={password} onChange={e => setPassword(e.target.value)} disabled={!accountEnabled && !register} required minLength={register ? 8 : undefined} maxLength={1024} aria-describedby={register ? "password-rules" : undefined} type={showPassword ? "text" : "password"} name="password" autoComplete={register ? "new-password" : "current-password"}/></label>
    {register && <>
      <label>Passwort bestätigen<input className="field" value={confirmation} onChange={e => setConfirmation(e.target.value)} required type={showPassword ? "text" : "password"} name="confirmation" autoComplete="new-password"/></label>
      <ul id="password-rules" className="password-rules" aria-label="Passwortkriterien">
        {rules.map(({ label, met }) => <li key={label} data-met={met}>
          {met ? <Check size={16} aria-hidden/> : <Circle size={14} aria-hidden/>}
          <span className="sr-only">{met ? "Erfüllt: " : "Offen: "}</span>{label}
        </li>)}
      </ul>
      <small>Beim Erstellen prüft der Server zusätzlich auf häufig verwendete Passwörter und Ähnlichkeit zum Benutzernamen.</small>
    </>}
    <label className="password-toggle"><input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)}/> Passwort anzeigen</label>
    {error && <p role="alert">{error}</p>}
    <button className="btn-ink" disabled={busy || !accountEnabled || (register && rules.some(rule => !rule.met))}>{busy ? "Bitte warten …" : register ? "Konto erstellen" : "Anmelden"}</button>
  </form>
    <SocialSignIn next={window.location.pathname + (afterAuth ?? window.location.search + window.location.hash)} providers={providers} csrf={csrf} busy={busy}/>
  </div>;
}
