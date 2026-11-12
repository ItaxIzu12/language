import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Choice from "../components/Choice";
import { Confetti, LevelBadge, ProgressBar, SpeakButton } from "../components/ui";
import { POS_LABELS } from "../data/languages";
import { makeOptions, sentenceTiles, stripPunct } from "../lib/exercises";
import { useStore } from "../lib/store";
import { speak } from "../lib/tts";
import { cx, shuffle } from "../lib/utils";
import type { Category, VocabItem } from "../types";

const WORDS_PER_LESSON = 5;
const XP_PER_ANSWER = 10;
const LESSON_BONUS = 20;

interface Tile {
  id: number;
  ch: string;
}

type Step = { retry?: boolean } & (
  | { kind: "intro"; word: VocabItem }
  | { kind: "choice"; mode: "toDe" | "toTarget" | "listen"; word: VocabItem; options: VocabItem[] }
  | { kind: "build"; word: VocabItem; tiles: Tile[] }
);

function buildSteps(words: VocabItem[], pool: VocabItem[]): Step[] {
  const steps: Step[] = [];
  // Introduce words in small groups, each followed by a first recognition check.
  for (let i = 0; i < words.length; i += 2) {
    const group = words.slice(i, i + 2);
    group.forEach((word) => steps.push({ kind: "intro", word }));
    group.forEach((word) => steps.push({ kind: "choice", mode: "toDe", word, options: makeOptions(word, pool) }));
  }
  // Then mixed practice: recall, listening, sentence building.
  const practice: Step[] = [];
  for (const word of words) {
    practice.push({ kind: "choice", mode: "toTarget", word, options: makeOptions(word, pool) });
    practice.push({ kind: "choice", mode: "listen", word, options: makeOptions(word, pool) });
    const tiles = word.example && sentenceTiles(word.example.target);
    if (tiles) {
      practice.push({ kind: "build", word, tiles: shuffle(tiles.map((ch, id) => ({ id, ch }))) });
    }
  }
  return [...steps, ...shuffle(practice)];
}

export default function Lesson() {
  const { categoryId } = useParams();
  const { lang } = useStore();
  const [run, setRun] = useState(0);
  const category = lang.categories.find((c) => c.id === categoryId);
  if (!category) return <Navigate to="/learn" replace />;
  return <LessonRun key={`${category.id}-${run}`} category={category} onRestart={() => setRun((r) => r + 1)} />;
}

function LessonRun({ category, onRestart }: { category: Category; onRestart: () => void }) {
  const { lang, progress, settings, answer, addXp, finishLesson } = useStore();

  // Freeze the lesson content at start so progress updates don't reshuffle it.
  const [words] = useState<VocabItem[]>(() => {
    const all = lang.vocab.filter((w) => w.category === category.id);
    const fresh = all.filter((w) => !progress.cards[w.id]);
    const known = all
      .filter((w) => progress.cards[w.id])
      .sort((a, b) => progress.cards[a.id].box - progress.cards[b.id].box);
    return [...fresh, ...known].slice(0, WORDS_PER_LESSON);
  });
  const [steps, setSteps] = useState<Step[]>(() => buildSteps(words, lang.vocab));
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);
  const [mistakes, setMistakes] = useState<Set<string>>(new Set());
  const [xp, setXp] = useState(0);
  const finalized = useRef(false);

  const step: Step | undefined = steps[index];
  const done = index >= steps.length;

  const next = useCallback(() => {
    setResult(null);
    setIndex((i) => i + 1);
  }, []);

  const grade = (correct: boolean) => {
    if (!step || result !== null) return;
    setResult(correct);
    speak(step.word.target, lang.ttsLang, settings.rate);
    if (correct) {
      setXp((x) => x + XP_PER_ANSWER);
      addXp(XP_PER_ANSWER);
    } else {
      setMistakes((m) => new Set(m).add(step.word.id));
      // Ask again at the end (once).
      if (!step.retry) {
        const again: Step =
          step.kind === "build"
            ? { ...step, retry: true, tiles: shuffle(step.tiles) }
            : step.kind === "choice"
              ? { ...step, retry: true, options: shuffle(step.options) }
              : step;
        setSteps((s) => [...s, again]);
      }
    }
  };

  // Read new words and listening prompts aloud automatically.
  useEffect(() => {
    if (!step) return;
    if (step.kind === "intro" || (step.kind === "choice" && step.mode === "listen")) {
      speak(step.word.target, lang.ttsLang, settings.rate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Enter = continue.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || done || !step) return;
      // A focused button already handles Enter itself.
      if ((e.target as HTMLElement | null)?.tagName === "BUTTON") return;
      if (step.kind === "intro" || result !== null) next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, step, result, next]);

  // Save results once when the lesson is finished.
  useEffect(() => {
    if (!done || finalized.current) return;
    finalized.current = true;
    words.forEach((w) => answer(w.id, !mistakes.has(w.id), 0));
    addXp(LESSON_BONUS);
    finishLesson();
  }, [done, words, mistakes, answer, addXp, finishLesson]);

  if (!words.length) {
    return (
      <div className="card mx-auto max-w-xl p-8 text-center">
        <p className="text-4xl">📭</p>
        <p className="mt-3 font-bold">In dieser Kategorie gibt es noch keine Wörter.</p>
        <Link to="/learn" className="btn-primary mt-5">
          Zurück
        </Link>
      </div>
    );
  }

  if (done) {
    const perfect = mistakes.size === 0;
    return (
      <div className="mx-auto max-w-xl text-center">
        <Confetti />
        <div className="card p-8">
          <p className="text-6xl">{perfect ? "🏆" : "🎉"}</p>
          <h1 className="mt-4 text-3xl font-extrabold">{perfect ? "Perfekt!" : "Lektion geschafft!"}</h1>
          <p className="muted mt-1">
            {category.icon} {category.name}
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat value={`+${xp + LESSON_BONUS}`} label="XP" />
            <Stat value={String(words.length)} label="Wörter" />
            <Stat value={String(mistakes.size)} label="Fehler" />
          </div>
          <ul className="mt-6 space-y-2 text-left">
            {words.map((w) => (
              <li key={w.id} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
                <span>{mistakes.has(w.id) ? "🔁" : "✅"}</span>
                <span className="hanzi text-lg">{w.target}</span>
                <span className="text-sm text-brand-700 dark:text-brand-300">{w.reading}</span>
                <span className="muted ml-auto truncate text-sm">{w.de}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button type="button" className="btn-primary" onClick={onRestart}>
              ▶ Nächste Lektion
            </button>
            <Link to="/" className="btn-ghost">
              Zur Übersicht
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!step) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Link to={`/learn/${category.id}`} aria-label="Lektion beenden" className="muted text-xl hover:text-slate-900 dark:hover:text-white">
          ✕
        </Link>
        <ProgressBar value={index / steps.length} className="h-3.5" />
        <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">⚡ {xp}</span>
      </div>

      <div key={index} className="animate-fade-in">
        {step.kind === "intro" && <Intro word={step.word} />}
        {step.kind === "choice" && <ChoiceStep step={step} onPick={grade} />}
        {step.kind === "build" && <BuildStep word={step.word} tiles={step.tiles} locked={result !== null} onCheck={grade} />}
      </div>

      {/* Footer: continue / feedback */}
      <div className="mt-6">
        {step.kind === "intro" ? (
          <button type="button" className="btn-primary w-full py-3.5 text-base" onClick={next}>
            Verstanden – weiter
          </button>
        ) : (
          result !== null && (
            <div
              className={cx(
                "animate-fade-in flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4",
                result ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-rose-50 dark:bg-rose-900/30",
              )}
            >
              <div>
                <div className={cx("font-extrabold", result ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300")}>
                  {result ? `Richtig! +${XP_PER_ANSWER} XP` : "Nicht ganz – das kommt gleich nochmal."}
                </div>
                <div className="mt-0.5 text-sm">
                  <span className="hanzi text-base">{step.kind === "build" ? step.word.example?.target : step.word.target}</span>{" "}
                  <span className="text-brand-700 dark:text-brand-300">
                    {step.kind === "build" ? step.word.example?.reading : step.word.reading}
                  </span>{" "}
                  – {step.kind === "build" ? step.word.example?.de : step.word.de}
                </div>
              </div>
              <button type="button" className={result ? "btn-primary" : "btn-accent"} onClick={next}>
                Weiter
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="muted text-xs font-semibold">{label}</div>
    </div>
  );
}

function Intro({ word }: { word: VocabItem }) {
  return (
    <div className="card p-6 text-center sm:p-8">
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">Neues Wort</span>
        <LevelBadge level={word.level} />
        <span className="chip bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{POS_LABELS[word.pos]}</span>
      </div>
      <div className="hanzi text-6xl font-medium sm:text-7xl">{word.target}</div>
      <div className="mt-3 text-xl font-semibold text-brand-700 dark:text-brand-300">{word.reading}</div>
      <div className="mt-1 text-lg">{word.de}</div>
      <div className="mt-5 flex justify-center gap-3">
        <SpeakButton text={word.target} size="lg" />
        <SpeakButton text={word.target} size="lg" slow />
      </div>
      {word.example && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-left dark:bg-slate-800/60">
          <SpeakButton text={word.example.target} size="sm" />
          <div>
            <div className="hanzi text-lg">{word.example.target}</div>
            <div className="text-sm text-brand-700 dark:text-brand-300">{word.example.reading}</div>
            <div className="muted text-sm">{word.example.de}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChoiceStep({
  step,
  onPick,
}: {
  step: Extract<Step, { kind: "choice" }>;
  onPick: (correct: boolean) => void;
}) {
  const { settings } = useStore();
  const { word, mode, options } = step;
  return (
    <div>
      <p className="muted mb-3 text-sm font-bold uppercase tracking-wide">
        {mode === "toDe" && "Was bedeutet das?"}
        {mode === "toTarget" && "Wie sagt man das?"}
        {mode === "listen" && "Was hörst du?"}
      </p>
      <div className="card mb-5 flex items-center gap-4 p-5">
        {mode === "toDe" && (
          <>
            <SpeakButton text={word.target} />
            <div>
              <div className="hanzi text-4xl font-medium">{word.target}</div>
              {settings.showReading && <div className="mt-1 text-brand-700 dark:text-brand-300">{word.reading}</div>}
            </div>
          </>
        )}
        {mode === "toTarget" && <div className="text-2xl font-bold">{word.de}</div>}
        {mode === "listen" && (
          <div className="flex w-full items-center justify-center gap-4 py-2">
            <SpeakButton text={word.target} size="lg" />
            <SpeakButton text={word.target} size="lg" slow />
          </div>
        )}
      </div>
      <Choice
        correctKey={word.id}
        onPick={onPick}
        options={options.map((o) =>
          mode === "toDe"
            ? { key: o.id, label: o.de }
            : { key: o.id, label: o.target, sub: mode === "toTarget" && settings.showReading ? o.reading : undefined, hanzi: true },
        )}
      />
    </div>
  );
}

function BuildStep({
  word,
  tiles,
  locked,
  onCheck,
}: {
  word: VocabItem;
  tiles: Tile[];
  locked: boolean;
  onCheck: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<number[]>([]);
  const example = word.example!;
  const byId = new Map(tiles.map((t) => [t.id, t]));
  const answerText = picked.map((id) => byId.get(id)!.ch).join("");

  return (
    <div>
      <p className="muted mb-3 text-sm font-bold uppercase tracking-wide">Bilde den Satz</p>
      <div className="card mb-5 p-5 text-xl font-bold">{example.de}</div>

      <div className="mb-4 flex min-h-[4.5rem] flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 p-3 dark:border-slate-700">
        {picked.length === 0 && <span className="muted text-sm">Tippe die Zeichen in der richtigen Reihenfolge an.</span>}
        {picked.map((id) => (
          <button
            key={id}
            type="button"
            disabled={locked}
            onClick={() => setPicked((p) => p.filter((x) => x !== id))}
            className="hanzi rounded-xl bg-brand-600 px-3.5 py-2 text-2xl text-white shadow-soft transition active:scale-95"
          >
            {byId.get(id)!.ch}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {tiles.map((t) => {
          const used = picked.includes(t.id);
          return (
            <button
              key={t.id}
              type="button"
              disabled={used || locked}
              onClick={() => setPicked((p) => [...p, t.id])}
              className={cx(
                "hanzi rounded-xl border-2 px-3.5 py-2 text-2xl transition active:scale-95",
                used
                  ? "border-slate-200 text-transparent dark:border-slate-800"
                  : "border-slate-200 bg-white hover:border-brand-400 dark:border-slate-700 dark:bg-slate-900",
              )}
            >
              {t.ch}
            </button>
          );
        })}
      </div>

      {!locked && (
        <button
          type="button"
          className="btn-primary mt-6 w-full py-3.5 text-base"
          disabled={picked.length !== tiles.length}
          onClick={() => onCheck(answerText === stripPunct(example.target))}
        >
          Prüfen
        </button>
      )}
    </div>
  );
}
