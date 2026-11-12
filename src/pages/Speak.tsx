import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeader, Segmented, SpeakButton } from "../components/ui";
import { listenOnce, recognitionSupported } from "../lib/speech";
import type { ListenHandle } from "../lib/speech";
import { useStore } from "../lib/store";
import { cx, shuffle, similarity } from "../lib/utils";

interface Prompt {
  id: string;
  target: string;
  reading: string;
  de: string;
}

type Mode = "words" | "sentences";

const PASS = 0.75;

/** Pronunciation practice: listen, repeat, get instant feedback. */
export default function Speak() {
  const { lang, progress, addXp } = useStore();
  const [mode, setMode] = useState<Mode>("words");
  const [index, setIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [heard, setHeard] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handle = useRef<ListenHandle | null>(null);
  const supported = recognitionSupported();

  const prompts = useMemo<Prompt[]>(() => {
    if (mode === "sentences") {
      return shuffle(lang.listening.filter((s) => s.target.length <= 14));
    }
    // Prefer words the learner has already started.
    const started = lang.vocab.filter((w) => progress.cards[w.id]);
    const source = started.length >= 10 ? started : lang.vocab.filter((w) => w.level === "A1" || w.level === "A2");
    return shuffle(source).slice(0, 40);
    // Build the deck once per mode; progress changes must not reshuffle it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, lang]);

  useEffect(() => () => handle.current?.stop(), []);

  const prompt = prompts[index % Math.max(prompts.length, 1)];

  const reset = () => {
    setHeard(null);
    setScore(null);
    setError(null);
  };

  const record = () => {
    if (recording) {
      handle.current?.stop();
      return;
    }
    reset();
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
      // Take the alternative closest to the target.
      let best = alternatives[0];
      let bestScore = 0;
      for (const alt of alternatives) {
        const s = similarity(alt, prompt.target);
        if (s >= bestScore) {
          best = alt;
          bestScore = s;
        }
      }
      setHeard(best);
      setScore(bestScore);
      if (bestScore >= PASS) addXp(10);
    });
  };

  const next = () => {
    reset();
    setIndex((i) => i + 1);
  };

  return (
    <div>
      <PageHeader title="Sprechen" subtitle="Anhören, nachsprechen, sofort Feedback zur Aussprache bekommen." />

      <div className="mb-5">
        <Segmented<Mode>
          value={mode}
          onChange={(m) => {
            setMode(m);
            setIndex(0);
            reset();
          }}
          options={[
            { value: "words", label: "Wörter" },
            { value: "sentences", label: "Sätze" },
          ]}
        />
      </div>

      {!supported && (
        <div className="mb-5 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
          <strong>Spracherkennung wird von diesem Browser nicht unterstützt.</strong> Nutze Chrome, Edge oder Safari für das
          Aussprache-Feedback. Anhören und laut Nachsprechen funktioniert trotzdem.
        </div>
      )}

      {prompt && (
        <div className="mx-auto max-w-xl">
          <div className="card p-6 text-center sm:p-8">
            <div className="hanzi text-5xl font-medium leading-tight">{prompt.target}</div>
            <div className="mt-3 text-lg font-semibold text-brand-700 dark:text-brand-300">{prompt.reading}</div>
            <div className="muted mt-1">{prompt.de}</div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <SpeakButton text={prompt.target} size="lg" />
              <SpeakButton text={prompt.target} size="lg" slow />
              {supported && (
                <button
                  type="button"
                  onClick={record}
                  aria-label={recording ? "Aufnahme stoppen" : "Aufnahme starten"}
                  className={cx(
                    "flex h-20 w-20 items-center justify-center rounded-full text-3xl text-white shadow-soft transition active:scale-95",
                    recording ? "animate-pulse bg-rose-500" : "bg-accent-500 hover:bg-accent-600",
                  )}
                >
                  {recording ? "⏹" : "🎤"}
                </button>
              )}
            </div>
            <p className="muted mt-3 text-sm">
              {recording ? "Ich höre zu … sprich jetzt." : supported ? "Erst anhören, dann 🎤 drücken und nachsprechen." : "Anhören und laut nachsprechen."}
            </p>

            {error && <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">{error}</p>}

            {score !== null && heard !== null && (
              <div
                className={cx(
                  "animate-fade-in mt-5 rounded-2xl p-4",
                  score >= PASS ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-amber-50 dark:bg-amber-900/30",
                )}
              >
                <div className="text-lg font-extrabold">
                  {score >= 0.95 ? "Perfekt! 🎯" : score >= PASS ? "Gut gemacht! 👍" : "Fast – versuch es nochmal 💪"}
                  {score >= PASS && <span className="ml-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">+10 XP</span>}
                </div>
                <div className="muted mt-1 text-sm">
                  Verstanden: <span className="hanzi text-base text-slate-900 dark:text-slate-100">{heard}</span> ·{" "}
                  {Math.round(score * 100)} % Übereinstimmung
                </div>
              </div>
            )}
          </div>

          <button type="button" className="btn-primary mt-5 w-full py-3.5 text-base" onClick={next}>
            Nächstes →
          </button>
        </div>
      )}
    </div>
  );
}
