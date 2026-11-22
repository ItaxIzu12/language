import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { accountEnabled, accountSession, api } from "./account";

export default function PasswordRecovery() {
  const [params] = useSearchParams();
  const uid = params.get("uid");
  const token = params.get("token");
  const confirming = Boolean(uid && token);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      await accountSession();
      const result = await api<{ message: string }>(
        confirming ? "password-reset-confirm" : "password-reset",
        "POST",
        confirming
          ? { uid, token, password: fields.get("password"), confirmation: fields.get("confirmation") }
          : { email: fields.get("email") },
      );
      setMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bitte erneut versuchen.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="lf-landing min-h-screen">
      <main className="mx-auto max-w-lg px-6 py-12">
        <Link to="/" className="lf-logo">
          LinguaFlow
        </Link>
        <h1 className="my-6 text-3xl font-bold">{confirming ? "Neues Passwort wählen" : "Passwort vergessen?"}</h1>
        {message ? (
          <p role="status">{message}</p>
        ) : (
          <form onSubmit={submit} className="grid gap-4">
            {confirming ? (
              <>
                <p>Mindestens 8 Zeichen und ein Sonderzeichen. Verwende ein eigenes, schwer zu erratendes Passwort.</p>
                <label>
                  Neues Passwort
                  <input
                    name="password"
                    type="password"
                    minLength={8}
                    maxLength={1024}
                    autoComplete="new-password"
                    required
                    className="field"
                  />
                </label>
                <label>
                  Passwort bestätigen
                  <input
                    name="confirmation"
                    type="password"
                    minLength={8}
                    maxLength={1024}
                    autoComplete="new-password"
                    required
                    className="field"
                  />
                </label>
              </>
            ) : (
              <>
                <p>
                  Gib die E-Mail-Adresse deines Lernkontos ein. Bei älteren Konten kannst du sie nach dem Anmelden im
                  Profil ergänzen.
                </p>
                <label>
                  E-Mail-Adresse
                  <input name="email" type="email" autoComplete="email" required className="field" />
                </label>
              </>
            )}
            {error && <p role="alert">{error}</p>}
            {!accountEnabled && <p>Die Kontowiederherstellung ist in dieser Vorschau nicht verfügbar.</p>}
            <button className="btn-ink" disabled={busy || !accountEnabled}>
              {busy ? "Bitte warten …" : confirming ? "Passwort speichern" : "Link anfordern"}
            </button>
          </form>
        )}
        <Link className="mt-6 inline-block underline" to="/anmelden">
          Zur Anmeldung
        </Link>
      </main>
    </div>
  );
}

export function RecoveryEmail() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setBusy(true);
    try {
      const result = await api<{ message: string }>("recovery-email", "POST", {
        email: fields.get("email"),
        password: fields.get("password"),
      });
      setMessage(result.message);
      form.reset();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Speichern fehlgeschlagen.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <details className="my-4">
      <summary>E-Mail für die Wiederherstellung hinterlegen</summary>
      <form onSubmit={save} className="mt-3 grid max-w-md gap-3">
        <label>
          E-Mail-Adresse
          <input className="field" name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Aktuelles Passwort
          <input className="field" name="password" type="password" autoComplete="current-password" required />
        </label>
        <button className="btn-line" disabled={busy}>
          E-Mail speichern
        </button>
        <p role="status">{message}</p>
      </form>
    </details>
  );
}
