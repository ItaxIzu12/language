import { readState, writeState } from "./account";
import type { LearnerDocument } from "./account";
import { draftKey } from "./useAccountSync";

export async function keepGuestProgress(username: string, document: LearnerDocument) {
  const language = document.settings.lang;
  const remote = await readState(username, language);
  const key = "linguaflow.recovery." + JSON.stringify([username, language]) + "." + Date.now();
  localStorage.setItem(key, JSON.stringify({ device: document, server: remote, createdAt: Date.now() }));
  if (remote.document) {
    sessionStorage.setItem(
      "linguaflow.account.notice",
      "Dein Gaststand liegt im Wiederherstellungsarchiv deines Profils. Dein bisheriger Kontostand wurde geladen.",
    );
    return;
  }
  const pendingKey = draftKey(username, language) + "." + crypto.randomUUID();
  localStorage.setItem(pendingKey, JSON.stringify({ revision: remote.revision, document, updatedAt: Date.now() }));
  try {
    await writeState(username, remote.revision, document);
    localStorage.removeItem(pendingKey);
    localStorage.removeItem(key);
    sessionStorage.setItem("linguaflow.account.notice", "Dein Gastfortschritt wurde in dein Konto übernommen.");
  } catch {
    sessionStorage.setItem(
      "linguaflow.account.notice",
      "Dein Gastfortschritt ist auf diesem Gerät gesichert. Bitte prüfe den Speicherstatus im Profil.",
    );
  }
}
