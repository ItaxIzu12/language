import type { Progress, Settings } from "../../state/learningStore";
import type { VocabItem } from "../../languages/types";

export interface LearnerDocument {
  settings: Settings;
  progress: Progress;
  customWords: VocabItem[];
}

export interface AccountState {
  language: string;
  username: string;
  revision: number;
  document: LearnerDocument | null;
}

export const accountEnabled = import.meta.env.VITE_ACCOUNT_BACKEND === "1";
let csrf = "";
let providers: string[] = [];
export const socialOptions = () => ({ csrf, providers });

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

export async function api<T>(path: string, method = "GET", data?: unknown, username?: string): Promise<T> {
  const response = await fetch("/api/v1/" + path + "/", {
    method,
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf,
      ...(username ? { "X-Learner": encodeURIComponent(username) } : {}),
    },
    body: data === undefined ? undefined : JSON.stringify(data),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new ApiError(
      payload.error ??
        (response.status === 429 ? "Zu viele Versuche. Bitte warte kurz." : "Serveranfrage fehlgeschlagen."),
      response.status,
    );
  return payload;
}

export async function accountSession(
  action = "session",
  credentials?: { username: string; password: string; email?: string },
) {
  const data = await api<{ csrf: string; providers: string[]; username: string | null }>(
    action,
    action === "session" ? "GET" : "POST",
    credentials,
  );
  csrf = data.csrf;
  providers = data.providers ?? [];
  return data.username;
}

export const readState = (username: string, lang: string) =>
  api<Pick<AccountState, "document" | "revision">>("state/" + encodeURIComponent(lang), "GET", undefined, username);

export const writeState = (username: string, revision: number, document: LearnerDocument) =>
  api<{ revision: number }>(
    "state/" + encodeURIComponent(document.settings.lang),
    "PUT",
    { revision, document },
    username,
  );
