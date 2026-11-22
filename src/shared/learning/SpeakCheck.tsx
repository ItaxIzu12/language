import { Check, Mic, RotateCcw, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { listenOnce, recognitionSupported } from "../audio/speech";
import type { ListenHandle } from "../audio/speech";
import { useStore } from "../../state/learningStore";
import { cx, similarity } from "../lib/utils";
import { ICON, Verdict } from "../ui/ui";

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
            ? "Das Mikrofon ist nicht freigegeben. Erlaube den Zugriff in der Adressleiste des Browsers und versuch es erneut."
            : "Es kam nichts an. Sprich näher am Mikrofon und drück den Knopf noch einmal.",
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
      <div>
        <p className="mb-3 text-sm text-dim">
          Dieser Browser unterstützt keine Spracherkennung. Sprich laut und beurteile dich selbst.
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-line" onClick={() => onResult(0)}>
            <RotateCcw {...ICON} aria-hidden /> Noch unsicher
          </button>
          <button type="button" className="btn-ink" onClick={() => onResult(1)}>
            <Check {...ICON} aria-hidden /> Hat geklappt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={record}
          aria-label={recording ? "Aufnahme stoppen" : "Aufnahme starten"}
          className={cx(
            "inline-flex h-16 w-16 shrink-0 items-center justify-center rounded transition-transform active:translate-y-px",
            recording ? "animate-pulse bg-cinnabar text-on-cinnabar" : "bg-ink text-paper hover:bg-ink/85",
          )}
        >
          {recording ? (
            <Square size={24} strokeWidth={1.75} aria-hidden />
          ) : (
            <Mic size={26} strokeWidth={1.75} aria-hidden />
          )}
        </button>
        <p className="text-sm text-dim">
          {recording ? "Aufnahme läuft – sprich jetzt." : "Knopf drücken und sprechen."}
        </p>
      </div>

      {error && (
        <p role="alert" className="mt-4 border-t-2 border-cinnabar pt-3 text-sm">
          {error}
        </p>
      )}

      {score !== null && heard !== null && (
        <div className="mt-4">
          <Verdict
            ok={score >= PASS_SCORE}
            title={score >= PASS_SCORE ? "Satz erkannt" : "Vergleiche die beiden Sätze"}
          >
            Dein Browser hat erkannt:{" "}
            <span lang={lang.code} className="hanzi text-base font-medium">
              {heard}
            </span>
          </Verdict>
        </div>
      )}
    </div>
  );
}
