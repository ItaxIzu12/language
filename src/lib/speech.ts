// Speech input (pronunciation practice) via the Web Speech Recognition API.
// Available in Chrome, Edge and Safari; other browsers get a friendly fallback.

interface RecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

type RecognitionCtor = new () => RecognitionLike;

function getCtor(): RecognitionCtor | undefined {
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export function recognitionSupported(): boolean {
  return typeof window !== "undefined" && !!getCtor();
}

export interface ListenHandle {
  stop(): void;
}

/** Listens once and returns all recognised alternatives. */
export function listenOnce(
  lang: string,
  onDone: (alternatives: string[], error?: string) => void,
): ListenHandle {
  const Ctor = getCtor();
  if (!Ctor) {
    onDone([], "unsupported");
    return { stop() {} };
  }
  const rec = new Ctor();
  rec.lang = lang;
  rec.interimResults = false;
  rec.maxAlternatives = 5;
  let finished = false;
  const finish = (alts: string[], err?: string) => {
    if (finished) return;
    finished = true;
    onDone(alts, err);
  };
  rec.onresult = (e) => {
    const alts: string[] = [];
    const first = e.results[0];
    for (let i = 0; i < first.length; i++) alts.push(first[i].transcript);
    finish(alts);
  };
  rec.onerror = (e) => finish([], e.error);
  rec.onend = () => finish([], "no-speech");
  try {
    rec.start();
  } catch {
    finish([], "start-failed");
  }
  return { stop: () => rec.stop() };
}
