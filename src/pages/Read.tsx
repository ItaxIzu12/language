import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import Choice from "../components/Choice";
import { Confetti, LevelBadge, PageHeader, Segmented } from "../components/ui";
import { LEVELS } from "../data/languages";
import { useStore } from "../lib/store";
import { speak, stopSpeaking } from "../lib/tts";
import { cx, shuffle } from "../lib/utils";
import type { Level, ReadingText } from "../types";

/** Reading: graded texts, tap-to-hear sentences, comprehension questions. */
export default function Read() {
  const { lang, progress } = useStore();
  const [level, setLevel] = useState<Level | "all">("all");
  const [open, setOpen] = useState<ReadingText | null>(null);

  if (open) return <Reader text={open} onBack={() => setOpen(null)} />;

  const shown = lang.texts.filter((t) => level === "all" || t.level === level);
  const doneCount = lang.texts.filter((t) => progress.done[t.id]).length;

  return (
    <div>
      <PageHeader
        title="Lesen"
        subtitle={`Texte von A1 bis B2 mit Vorlesen und Verständnisfragen · ${doneCount} von ${lang.texts.length} gelesen`}
      />
      <div className="mb-5">
        <Segmented<Level | "all">
          value={level}
          onChange={setLevel}
          options={[{ value: "all", label: "Alle" }, ...LEVELS.map((l) => ({ value: l, label: l }))]}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {shown.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setOpen(t)}
            className="card group flex items-start gap-4 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-2xl transition group-hover:scale-110 dark:bg-brand-900/40">
              {t.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="hanzi text-lg font-medium">{t.title}</div>
              <div className="font-semibold">{t.titleDe}</div>
              <div className="mt-2 flex items-center gap-2">
                <LevelBadge level={t.level} />
                <span className="muted text-xs">
                  {t.sentences.length} Sätze · {t.questions.length} Fragen
                </span>
              </div>
            </div>
            {progress.done[t.id] && <span title="Gelesen">✅</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function Reader({ text, onBack }: { text: ReadingText; onBack: () => void }) {
  const { lang, settings, addXp, markDone, progress } = useStore();
  const [showReading, setShowReading] = useState(settings.showReading);
  const [showDe, setShowDe] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const token = useRef(0);
  const wasDone = useRef(!!progress.done[text.id]);

  const questions = useMemo(
    () => text.questions.map((q) => ({ ...q, options: shuffle([q.answer, ...q.wrong]) })),
    [text],
  );

  const halt = () => {
    token.current++;
    stopSpeaking();
    setPlaying(false);
  };
  useEffect(() => () => void (token.current++, stopSpeaking()), []);

  // Read the whole text aloud, sentence by sentence.
  const playAll = async () => {
    if (playing) return halt();
    const my = ++token.current;
    setPlaying(true);
    for (let i = active ?? 0; i < text.sentences.length; i++) {
      if (token.current !== my) return;
      setActive(i);
      await speak(text.sentences[i].target, lang.ttsLang, settings.rate);
      await new Promise((r) => setTimeout(r, 350));
    }
    if (token.current === my) {
      setPlaying(false);
      setActive(null);
    }
  };

  const tap = (i: number) => {
    halt();
    setActive(i);
    setRevealed((r) => new Set(r).add(i));
    void speak(text.sentences[i].target, lang.ttsLang, settings.rate);
  };

  const finished = quiz && qIndex >= questions.length;

  useEffect(() => {
    if (finished) markDone(text.id);
  }, [finished, markDone, text.id]);

  return (
    <div className="mx-auto max-w-2xl">
      <button type="button" onClick={onBack} className="muted mb-3 text-sm font-semibold hover:text-brand-600">
        ← Alle Texte
      </button>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="text-4xl">{text.icon}</span>
        <div className="min-w-0 flex-1">
          <h1 className="hanzi text-2xl font-medium">{text.title}</h1>
          <div className="muted flex items-center gap-2 font-semibold">
            {text.titleDe} <LevelBadge level={text.level} />
          </div>
        </div>
      </div>

      {!quiz && (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <button type="button" className="btn-primary" onClick={() => void playAll()}>
              {playing ? "⏸ Stopp" : "▶ Vorlesen"}
            </button>
            <Pill on={showReading} onClick={() => setShowReading((s) => !s)}>
              {lang.readingName}
            </Pill>
            <Pill on={showDe} onClick={() => setShowDe((s) => !s)}>
              Übersetzung
            </Pill>
          </div>
          <p className="muted mb-3 text-sm">Tippe einen Satz an, um ihn zu hören und die Übersetzung zu sehen.</p>

          <div className="card divide-y divide-slate-100 dark:divide-slate-800">
            {text.sentences.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => tap(i)}
                className={cx(
                  "block w-full px-5 py-3.5 text-left transition first:rounded-t-2xl last:rounded-b-2xl",
                  active === i ? "bg-brand-50 dark:bg-brand-900/30" : "hover:bg-slate-50 dark:hover:bg-slate-800/50",
                )}
              >
                <div className="hanzi text-xl leading-relaxed">{s.target}</div>
                {showReading && <div className="text-sm text-brand-700 dark:text-brand-300">{s.reading}</div>}
                {(showDe || revealed.has(i)) && <div className="muted animate-fade-in text-sm">{s.de}</div>}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn-accent mt-5 w-full py-3.5 text-base"
            onClick={() => {
              halt();
              setQuiz(true);
            }}
          >
            Verstanden? Zu den Fragen →
          </button>
        </>
      )}

      {quiz && !finished && (
        <div key={qIndex} className="animate-fade-in">
          <p className="muted mb-3 text-sm font-bold uppercase tracking-wide">
            Frage {qIndex + 1} / {questions.length}
          </p>
          <div className="card mb-5 p-5 text-lg font-bold">{questions[qIndex].question}</div>
          <Choice
            correctKey={questions[qIndex].answer}
            options={questions[qIndex].options.map((o) => ({ key: o, label: o }))}
            onPick={(ok) => {
              setAnswered(ok);
              if (ok) {
                setScore((s) => s + 1);
                if (!wasDone.current) addXp(10);
              }
            }}
          />
          {answered !== null && (
            <div className="mt-5 flex items-center justify-between gap-3">
              <button type="button" className="btn-ghost" onClick={() => setQuiz(false)}>
                ← Zurück zum Text
              </button>
              <button
                type="button"
                className={answered ? "btn-primary" : "btn-accent"}
                onClick={() => {
                  setAnswered(null);
                  setQIndex((i) => i + 1);
                }}
              >
                Weiter
              </button>
            </div>
          )}
        </div>
      )}

      {finished && (
        <div className="card p-8 text-center">
          {score === questions.length && <Confetti count={40} />}
          <p className="text-6xl">{score === questions.length ? "🏆" : "📖"}</p>
          <h2 className="mt-4 text-2xl font-extrabold">
            {score} / {questions.length} richtig
          </h2>
          <p className="muted mt-1">
            {wasDone.current ? "Wiederholung – XP gibt es nur beim ersten Lesen." : `+${score * 10} XP`}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                setQuiz(false);
                setQIndex(0);
                setScore(0);
                wasDone.current = true;
              }}
            >
              Text nochmal lesen
            </button>
            <button type="button" className="btn-primary" onClick={onBack}>
              Weitere Texte
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Pill({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cx(
        "rounded-full border px-3.5 py-2 text-sm font-semibold transition",
        on
          ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200"
          : "border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
      )}
    >
      {children}
    </button>
  );
}
