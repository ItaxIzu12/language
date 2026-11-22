import WordUnderstanding from "../../shared/learning/WordUnderstanding";
import { Check, Play, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Choice from "../../shared/learning/Choice";
import { Bar, Empty, ICON, LevelTag, Seal, SpeakButton, Verdict, WordLine } from "../../shared/ui/ui";
import { POS_LABELS } from "../../languages/registry";
import { makeOptions, sentenceTiles, stripPunct } from "../../shared/lib/exercises";
import { getSet } from "../../shared/lib/sets";
import type { WordSet } from "../../shared/lib/sets";
import { useStore } from "../../state/learningStore";
import { speak } from "../../shared/audio/tts";
import { cx, shuffle } from "../../shared/lib/utils";
import type { VocabItem } from "../../languages/types";

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
  const set = getSet(lang, categoryId);
  if (!set) return <Navigate to="/learn" replace />;
  return <LessonRun key={`${set.id}-${run}`} set={set} onRestart={() => setRun((r) => r + 1)} />;
}

function LessonRun({ set, onRestart }: { set: WordSet; onRestart: () => void }) {
  const { lang, progress, settings, answer, addXp, finishLesson } = useStore();

  // Freeze the lesson content at start so progress updates don't reshuffle it.
  const [words] = useState<VocabItem[]>(() => {
    const fresh = set.words.filter((w) => !progress.cards[w.id]);
    const known = set.words
      .filter((w) => progress.cards[w.id])
      .sort((a, b) => progress.cards[a.id].box - progress.cards[b.id].box);
    return [...fresh, ...known].slice(0, settings.dailyMinutes === 5 ? 2 : settings.dailyMinutes === 20 ? 5 : 3);
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
    void speak(step.word.target, lang.ttsLang, settings.rate);
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
      void speak(step.word.target, lang.ttsLang, settings.rate);
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
      <Empty
        action={
          <Link to="/learn" className="btn-ink">
            Zum Wortschatz
          </Link>
        }
      >
        In „{set.name}“ gibt es noch keine Wörter.
      </Empty>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl">
        <header className="flex flex-wrap items-center gap-6 border-b-2 border-ink pb-6">
          <Seal text={lang.culture.seal} />
          <div className="min-w-0 flex-1">
            <h1 className="title">{mistakes.size === 0 ? "Fehlerfrei" : "Geschafft"}</h1>
            <p className="mt-2 text-dim">Lektion aus „{set.name}“</p>
          </div>
        </header>
        <dl className="grid grid-cols-3 border-b border-rule">
          {[
            ["XP", `+${xp + LESSON_BONUS}`],
            ["Wörter", words.length],
            ["Fehler", mistakes.size],
          ].map(([label, value], i) => (
            <div key={label} className={cx("py-4", i > 0 && "border-l border-rule pl-5")}>
              <dt className="caption">{label}</dt>
              <dd className="font-display text-5xl font-extrabold leading-tight">{value}</dd>
            </div>
          ))}
        </dl>
        <ul className="rows border-b border-rule">
          {words.map((w) => (
            <li key={w.id} className="flex items-center gap-3 py-3">
              <span
                className={cx(
                  "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm",
                  mistakes.has(w.id) ? "border border-ochre text-ochre" : "bg-jade text-paper",
                )}
                title={mistakes.has(w.id) ? "kommt bald wieder" : "sicher beantwortet"}
              >
                {mistakes.has(w.id) ? (
                  <RotateCcw size={14} strokeWidth={2} aria-hidden />
                ) : (
                  <Check size={16} strokeWidth={2.5} aria-hidden />
                )}
              </span>
              <WordLine target={w.target} reading={w.reading} de={w.de} />
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="btn-ink" onClick={onRestart}>
            <Play {...ICON} aria-hidden /> Nächste Lektion
          </button>
          <Link to="/heute" className="btn-line">
            Zum Tagesblatt
          </Link>
        </div>
      </div>
    );
  }

  if (!step) return null;

  const shown = step.kind === "build" ? step.word.example : step.word;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center gap-4">
        <Link
          to={`/learn/${set.id}`}
          aria-label="Lektion beenden"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded border border-ink/60 hover:bg-wash"
        >
          <X {...ICON} aria-hidden />
        </Link>
        <Bar value={index / steps.length} tone="red" className="h-2" />
        <span className="shrink-0 text-sm font-semibold text-dim">
          <span className="font-display text-2xl font-extrabold leading-none text-ink">{xp}</span> XP
        </span>
      </div>

      <div key={index} className="animate-enter">
        {step.kind === "intro" && <Intro word={step.word} />}
        {step.kind === "choice" && <ChoiceStep step={step} onPick={grade} />}
        {step.kind === "build" && (
          <BuildStep word={step.word} tiles={step.tiles} locked={result !== null} onCheck={grade} />
        )}
      </div>

      <div className="mt-8">
        {step.kind === "intro" ? (
          <button type="button" className="btn-ink w-full" onClick={next}>
            Verstanden, weiter
          </button>
        ) : (
          result !== null && (
            <Verdict
              ok={result}
              title={result ? `Richtig. +${XP_PER_ANSWER} XP` : "Nicht ganz – das kommt am Ende noch einmal."}
              action={
                <button type="button" className="btn-ink" onClick={next}>
                  Weiter
                </button>
              }
            >
              <WordLine target={shown?.target} reading={shown?.reading} de={shown?.de} />
            </Verdict>
          )
        )}
      </div>
    </div>
  );
}

function Intro({ word }: { word: VocabItem }) {
  const { settings } = useStore();
  return (
    <div>
      <p className="mb-4 flex items-center gap-2 text-sm font-semibold">
        <span className="tag text-cinnabar">Neues Wort</span>
        <LevelTag level={word.level} />
        <span className="text-dim">{POS_LABELS[word.pos]}</span>
      </p>
      <div className="grid gap-x-8 gap-y-4 border-y-2 border-ink py-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
        <div className="hanzi text-7xl font-black leading-none sm:text-8xl">{word.target}</div>
        <div className="min-w-0">
          {settings.showReading && <div className="reading text-2xl font-semibold">{word.reading}</div>}
          <div className="mt-1 text-xl">{word.de}</div>
          <div className="mt-4 flex gap-2">
            <SpeakButton text={word.target} />
            <SpeakButton text={word.target} slow />
          </div>
        </div>
      </div>
      <WordUnderstanding word={word} />
      {word.example && (
        <div className="flex items-start gap-3 border-b border-rule py-4">
          <SpeakButton text={word.example.target} size="sm" />
          <p className="min-w-0">
            <span className="hanzi block text-xl font-medium">{word.example.target}</span>
            {settings.showReading && <span className="reading block text-sm">{word.example.reading}</span>}
            <span className="block text-sm text-dim">{word.example.de}</span>
          </p>
        </div>
      )}
    </div>
  );
}

function ChoiceStep({ step, onPick }: { step: Extract<Step, { kind: "choice" }>; onPick: (correct: boolean) => void }) {
  const { settings } = useStore();
  const { word, mode, options } = step;
  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">
        {mode === "toDe" && "Was bedeutet das?"}
        {mode === "toTarget" && "Wie sagt man das?"}
        {mode === "listen" && "Welches Wort hörst du?"}
      </h2>
      <div className="mb-6 flex min-h-[7rem] items-center gap-5 border-y-2 border-ink py-5">
        {mode === "toDe" && (
          <>
            <div className="min-w-0 flex-1">
              <div className="hanzi text-6xl font-black leading-none">{word.target}</div>
              {settings.showReading && <div className="reading mt-2 text-lg">{word.reading}</div>}
            </div>
            <SpeakButton text={word.target} />
          </>
        )}
        {mode === "toTarget" && <div className="text-3xl font-bold">{word.de}</div>}
        {mode === "listen" && (
          <div className="flex gap-3">
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
            : {
                key: o.id,
                label: o.target,
                sub: mode === "toTarget" && settings.showReading ? o.reading : undefined,
                hanzi: true,
              },
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
      <h2 className="mb-4 text-lg font-bold">Setze den Satz zusammen</h2>
      <div className="border-t-2 border-ink py-5 text-2xl font-bold">{example.de}</div>

      <div className="flex min-h-[4.75rem] flex-wrap items-center gap-2 border-y-2 border-ink py-3" data-answer>
        {picked.length === 0 && (
          <span className="text-sm text-dim">Tippe die Zeichen unten in der richtigen Reihenfolge an.</span>
        )}
        {picked.map((id) => (
          <button
            key={id}
            type="button"
            disabled={locked}
            aria-label={`${byId.get(id)!.ch} entfernen`}
            onClick={() => setPicked((p) => p.filter((x) => x !== id))}
            className="hanzi h-14 w-14 rounded-sm bg-ink text-3xl font-bold text-paper transition-transform active:translate-y-px"
          >
            {byId.get(id)!.ch}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2" data-tiles>
        {tiles.map((t) => {
          const used = picked.includes(t.id);
          return (
            <button
              key={t.id}
              type="button"
              disabled={used || locked}
              onClick={() => setPicked((p) => [...p, t.id])}
              className={cx(
                "hanzi h-14 w-14 rounded-sm border text-3xl font-bold transition-transform active:translate-y-px",
                used ? "border-rule text-transparent" : "border-ink/70 bg-sheet hover:bg-wash",
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
          className="btn-ink mt-8 w-full"
          disabled={picked.length !== tiles.length}
          onClick={() => onCheck(answerText === stripPunct(example.target))}
        >
          Prüfen
        </button>
      )}
    </div>
  );
}
