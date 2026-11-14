import { useEffect, useMemo, useRef, useState } from "react";
import Choice from "../components/Choice";
import { Field, RoundBar, RoundEnd } from "../components/Round";
import { PageHeader, Segmented, SpeakButton, Verdict, WordLine } from "../components/ui";
import { TONE_NAMES, stripTones, tonesOf } from "../lib/pinyin";
import type { Tone } from "../lib/pinyin";
import { useStore } from "../lib/store";
import { speak } from "../lib/tts";
import { shuffle } from "../lib/utils";
import type { VocabItem } from "../types";
import { VoiceNotice } from "./Listen";

type Mode = "single" | "pairs";

const ROUND = 10;

/** The pitch movement of a tone as a line, on the five-level scale used in textbooks. */
function Contour({ tone }: { tone: Tone }) {
  const d: Record<Tone, string> = {
    1: "M4 6 H36",
    2: "M4 21 L36 5",
    3: "M4 12 L17 24 L36 8",
    4: "M4 5 L36 24",
    5: "M18 15 h4",
  };
  return (
    <svg viewBox="0 0 40 30" width="40" height="30" aria-hidden className="shrink-0">
      <path d={d[tone]} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface Question {
  word: VocabItem;
  tones: Tone[];
  options: Tone[][];
}

const key = (t: Tone[]) => t.join("-");

/** Tone lab: hear a word and recognise its tones. */
export default function Tones() {
  const { lang } = useStore();
  const [mode, setMode] = useState<Mode>("single");
  const [round, setRound] = useState<Question[] | null>(null);

  // Words whose reading maps cleanly onto their characters.
  const pool = useMemo(() => {
    const want = mode === "single" ? 1 : 2;
    return lang.vocab
      .map((word) => ({ word, tones: tonesOf(word.reading) }))
      .filter(
        ({ word, tones }) =>
          [...word.target].length === want &&
          tones.length === want &&
          !/[\s…]/.test(word.reading) &&
          (mode === "pairs" || tones[0] !== 5),
      );
  }, [lang.vocab, mode]);

  const start = () => {
    const picked = shuffle(pool).slice(0, ROUND);
    setRound(
      picked.map(({ word, tones }) => {
        if (mode === "single") {
          return { word, tones, options: ([1, 2, 3, 4] as Tone[]).map((t) => [t]) };
        }
        const options = new Map<string, Tone[]>([[key(tones), tones]]);
        while (options.size < 4) {
          const a = (Math.floor(Math.random() * 4) + 1) as Tone;
          const b = (Math.random() < 0.15 ? 5 : Math.floor(Math.random() * 4) + 1) as Tone;
          options.set(key([a, b]), [a, b]);
        }
        return { word, tones, options: shuffle([...options.values()]) };
      }),
    );
  };

  if (round) return <Round questions={round} onExit={() => setRound(null)} />;

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Tonlabor"
        subtitle="Im Mandarin entscheidet die Tonhöhe über die Bedeutung. Hier trainierst du, die Töne nach Gehör zu erkennen."
      />
      <VoiceNotice />

      <ul className="mb-8 grid gap-x-8 border-t-2 border-ink sm:grid-cols-2">
        {([1, 2, 3, 4, 5] as Tone[]).map((t) => (
          <li key={t} className="flex items-center gap-4 border-b border-rule py-3">
            <Contour tone={t} />
            <span className="text-sm font-semibold">{TONE_NAMES[t]}</span>
          </li>
        ))}
      </ul>

      <div className="border-b border-rule">
        <Field label="Übung">
          <Segmented<Mode>
            label="Übung"
            value={mode}
            onChange={setMode}
            options={[
              { value: "single", label: "Einzelne Silben" },
              { value: "pairs", label: "Tonpaare (zwei Silben)" },
            ]}
          />
        </Field>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="button" className="btn-ink" disabled={pool.length < 4} onClick={start}>
          Runde starten
        </button>
        <span className="text-sm text-dim">{pool.length} Wörter stehen bereit</span>
      </div>
    </div>
  );
}

function Round({ questions, onExit }: { questions: Question[]; onExit: () => void }) {
  const { lang, settings, addXp, logActivity } = useStore();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);
  const logged = useRef(false);
  const q = questions[index];

  useEffect(() => {
    if (q) void speak(q.word.target, lang.ttsLang, settings.rate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (!q && !logged.current) {
      logged.current = true;
      logActivity("apply");
    }
  }, [q, logActivity]);

  if (!q) {
    return (
      <RoundEnd
        score={score}
        total={questions.length}
        perfect={score === questions.length}
        line="Töne nach Gehör erkannt."
        onExit={onExit}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <RoundBar
        onExit={onExit}
        value={index / questions.length}
        right={
          <>
            {index + 1} / {questions.length}
          </>
        }
      />
      <div key={index} className="animate-enter">
        <h2 className="mb-4 text-lg font-bold">{q.tones.length === 1 ? "Welchen Ton hörst du?" : "Welche beiden Töne hörst du?"}</h2>
        <div className="mb-6 flex min-h-[7rem] flex-wrap items-center gap-5 border-y-2 border-ink py-5">
          <div className="flex gap-3">
            <SpeakButton text={q.word.target} size="lg" />
            <SpeakButton text={q.word.target} size="lg" slow />
          </div>
          <p className="min-w-0">
            <span className="block text-3xl font-bold">{result === null ? stripTones(q.word.reading) : q.word.reading}</span>
            <span className="block text-sm text-dim">
              {result === null ? "Die Tonzeichen fehlen noch – hör genau hin." : `${q.word.target} – ${q.word.de}`}
            </span>
          </p>
        </div>
        <ToneChoice
          options={q.options}
          correct={q.tones}
          onPick={(ok) => {
            setResult(ok);
            if (ok) {
              setScore((s) => s + 1);
              addXp(5);
            }
          }}
        />
      </div>

      {result !== null && (
        <div className="mt-8">
          <Verdict
            ok={result}
            title={result ? "Richtig gehört. +5 XP" : `Es war: ${q.tones.map((t) => (t === 5 ? "neutral" : `${t}.`)).join(" + ")} Ton`}
            action={
              <button
                type="button"
                className="btn-ink"
                onClick={() => {
                  setResult(null);
                  setIndex((i) => i + 1);
                }}
              >
                Weiter
              </button>
            }
          >
            <WordLine target={q.word.target} reading={q.word.reading} de={q.word.de} />
          </Verdict>
        </div>
      )}
    </div>
  );
}

/** Answer buttons that show each tone as its contour line. */
function ToneChoice({ options, correct, onPick }: { options: Tone[][]; correct: Tone[]; onPick: (ok: boolean) => void }) {
  // Reuse the standard choice list; the label names the tones, the contour is drawn beside it.
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-dim" aria-hidden>
        {options.map((o, i) => (
          <span key={key(o)} className="inline-flex items-center gap-2 text-sm">
            <span className="font-display text-xl font-extrabold leading-none">{i + 1}</span>
            {o.map((t, j) => (
              <Contour key={j} tone={t} />
            ))}
          </span>
        ))}
      </div>
      <Choice
        correctKey={key(correct)}
        onPick={onPick}
        options={options.map((o) => ({
          key: key(o),
          label: o.map((t) => (t === 5 ? "neutral" : `${t}. Ton`)).join(" + "),
          sub: o.length === 1 ? TONE_NAMES[o[0]].split(" – ")[1] : undefined,
        }))}
      />
    </div>
  );
}
