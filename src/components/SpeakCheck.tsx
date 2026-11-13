import { useEffect, useRef, useState } from "react";
import { listenOnce, recognitionSupported } from "../lib/speech";
import type { ListenHandle } from "../lib/speech";
import { useStore } from "../lib/store";
import { cx, similarity } from "../lib/utils";

export const PASS_SCORE = 0.75;

/**
 * Microphone button with pronunciation check against `target`.
 * Without speech recognition it falls back to self-assessment.
 * Remount with a new `key` for each prompt.
 */
export default function SpeakCheck({
  target,
  onResult,
}: {
  target: string;
  /** Called with a 0..1 score after each attempt. */
  onResult: (score: number) => void;
}) {
  const { lang } = useStore();
  const supported = recognitionSupported();
  const [recording, setRecording] = useState(false);
  const [heard, setHeard] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handle = useRef<ListenHandle | null>(null);

  useEffect(() => () => handle.current?.stop(), []);

  const record = () => {
    if (recording) {
      handle.current?.stop();
      return;
    }
    setHeard(null);
    setScore(null);
    setError(null);
    setRecording(true);
    handle.current = listenOnce(lang.ttsLang, (alternatives, err) => {
      setRecording(false);
      if (!alternatives.length) {
        setError(
          err === "not-allowed" || err === "service-not-allowed"
            ? "Mikrofon-Zugriff wurde nicht erlaubt. Bitte im Browser freigeben."
            : "Ich habe nichts verstanden – versuch es noch einmal, nah am Mikrofon.",
        );
        return;
      }
      let best = alternatives[0];
      let bestScore = 0;
      for (const alt of alternatives) {
        const s = similarity(alt, target);
        if (s >= bestScore) {
          best = alt;
          bestScore = s;
        }
      }
      setHeard(best);
      setScore(bestScore);
      onResult(bestScore);
    });
  };

  if (!supported) {
    return (
      <div className="text-center">
        <p className="muted mb-3 text-sm">Sprich laut – dein Browser kann die Aussprache nicht prüfen. Wie lief es?</p>
        <div className="flex justify-center gap-3">
          <button type="button" className="btn-ghost" onClick={() => onResult(0)}>
            🔁 Noch unsicher
          </button>
          <button type="button" className="btn-primary" onClick={() => onResult(1)}>
            ✅ Hat geklappt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <button
        type="button"
        onClick={record}
        aria-label={recording ? "Aufnahme stoppen" : "Aufnahme starten"}
        className={cx(
          "mx-auto flex h-20 w-20 items-center justify-center rounded-full text-3xl text-white shadow-soft transition active:scale-95",
          recording ? "animate-pulse bg-rose-500" : "bg-accent-500 hover:bg-accent-600",
        )}
      >
        {recording ? "⏹" : "🎤"}
      </button>
      <p className="muted mt-2 text-sm">{recording ? "Ich höre zu … sprich jetzt." : "🎤 drücken und sprechen"}</p>

      {error && <p className="mt-3 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">{error}</p>}

      {score !== null && heard !== null && (
        <div
          className={cx(
            "animate-fade-in mt-4 rounded-2xl p-4",
            score >= PASS_SCORE ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-amber-50 dark:bg-amber-900/30",
          )}
        >
          <div className="text-lg font-extrabold">
            {score >= 0.95 ? "Perfekt! 🎯" : score >= PASS_SCORE ? "Gut gemacht! 👍" : "Fast – versuch es nochmal 💪"}
          </div>
          <div className="muted mt-1 text-sm">
            Verstanden: <span className="hanzi text-base text-slate-900 dark:text-slate-100">{heard}</span> ·{" "}
            {Math.round(score * 100)} % Übereinstimmung
          </div>
        </div>
      )}
    </div>
  );
}
