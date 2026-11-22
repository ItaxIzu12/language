import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Pause, Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import Choice from "../../shared/learning/Choice";
import { RoundEnd } from "../../shared/learning/Round";
import { Glyph, ICON, LevelTag, PageHeader, Segmented } from "../../shared/ui/ui";
import { LEVELS } from "../../languages/registry";
import { useStore } from "../../state/learningStore";
import { speak, stopSpeaking } from "../../shared/audio/tts";
import { cx, shuffle } from "../../shared/lib/utils";
import type { Level, ReadingText } from "../../languages/types";

/** Reading: graded texts, tap-to-hear sentences, comprehension questions. */
export default function Read() {
  const { lang, progress } = useStore();
  const [level, setLevel] = useState<Level | "all">("all");
  const { textId } = useParams();
  const navigate = useNavigate();
  const open = lang.texts.find((text) => text.id === textId);

  if (textId && !open) return <Navigate to="/read" replace />;
  if (open) return <Reader key={open.id} text={open} onBack={() => navigate("/read")} />;

  const shown = lang.texts.filter((t) => level === "all" || t.level === level);
  const doneCount = lang.texts.filter((t) => progress.done[t.id]).length;

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Lesetexte"
        subtitle={`${doneCount} von ${lang.texts.length} Texten gelesen. Jeder Text lässt sich vorlesen und endet mit drei Fragen.`}
      />
      <div className="mb-6">
        <Segmented<Level | "all">
          label="Stufe"
          value={level}
          onChange={setLevel}
          options={[{ value: "all", label: "Alle" }, ...LEVELS.map((l) => ({ value: l, label: l }))]}
        />
      </div>
      <ul className="rows border-y border-rule">
        {shown.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => navigate("/read/" + encodeURIComponent(t.id))}
              className="group flex w-full items-center gap-4 py-4 text-left"
            >
              <Glyph char={t.glyph} tone={progress.done[t.id] ? "red" : "ink"} />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="hanzi text-lg font-bold">{t.title}</span>
                  <span className="font-semibold">{t.titleDe}</span>
                </span>
                <span className="mt-1 flex items-center gap-2 text-sm text-dim">
                  <LevelTag level={t.level} />
                  {t.sentences.length} Sätze
                  {progress.done[t.id] && (
                    <span className="inline-flex items-center gap-1 text-jade">
                      <Check size={14} strokeWidth={2.5} aria-hidden /> gelesen
                    </span>
                  )}
                </span>
              </span>
              <ArrowRight
                {...ICON}
                aria-hidden
                className="shrink-0 text-dim transition-transform group-hover:translate-x-1"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Reader({ text, onBack }: { text: ReadingText; onBack: () => void }) {
  const { lang, settings, addXp, markDone, logActivity, progress } = useStore();
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
    if (finished) {
      markDone(text.id);
      if (!wasDone.current) logActivity("apply");
    }
  }, [finished, markDone, logActivity, text.id]);

  if (finished) {
    return (
      <RoundEnd
        score={score}
        total={questions.length}
        perfect={score === questions.length}
        line={
          wasDone.current
            ? "Wiederholung – Punkte gibt es nur beim ersten Lesen."
            : `Fragen zu „${text.titleDe}“ richtig. +${score * 10} XP`
        }
        onExit={onBack}
        exitLabel="Weitere Texte"
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-dim hover:text-ink"
      >
        <ArrowLeft {...ICON} aria-hidden /> Alle Texte
      </button>

      <header className="mb-6 border-b-2 border-ink pb-4">
        <h1 className="hanzi text-4xl font-black leading-tight">{text.title}</h1>
        <p className="mt-1 flex items-center gap-3 text-dim">
          {text.titleDe} <LevelTag level={text.level} />
        </p>
      </header>

      {!quiz ? (
        <>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <button type="button" className="btn-ink" onClick={() => void playAll()}>
              {playing ? <Pause {...ICON} aria-hidden /> : <Play {...ICON} aria-hidden />}
              {playing ? "Anhalten" : "Vorlesen"}
            </button>
            <Toggle on={showReading} onClick={() => setShowReading((s) => !s)}>
              {lang.readingName}
            </Toggle>
            <Toggle on={showDe} onClick={() => setShowDe((s) => !s)}>
              Übersetzung
            </Toggle>
          </div>
          <p className="mb-4 text-sm text-dim">Tippe einen Satz an, um ihn zu hören und seine Übersetzung zu sehen.</p>

          <ol className="rows border-y border-rule">
            {text.sentences.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => tap(i)}
                  className={cx(
                    "block w-full py-3.5 pl-3 text-left transition-colors",
                    active === i ? "bg-wash" : "hover:bg-wash/60",
                  )}
                >
                  <span className="hanzi block text-2xl font-medium leading-relaxed">{s.target}</span>
                  {showReading && <span className="reading block text-sm">{s.reading}</span>}
                  {(showDe || revealed.has(i)) && <span className="block animate-enter text-sm text-dim">{s.de}</span>}
                </button>
              </li>
            ))}
          </ol>

          <button
            type="button"
            className="btn-ink mt-6 w-full"
            onClick={() => {
              halt();
              setQuiz(true);
            }}
          >
            Zu den Fragen <ArrowRight {...ICON} aria-hidden />
          </button>
        </>
      ) : (
        <div key={qIndex} className="animate-enter">
          <h2 className="text-sm font-semibold text-dim">
            Frage {qIndex + 1} von {questions.length}
          </h2>
          <p className="mb-6 mt-1 text-2xl font-bold">{questions[qIndex].question}</p>
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
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button type="button" className="btn-quiet" onClick={() => setQuiz(false)}>
              <ArrowLeft {...ICON} aria-hidden /> Zurück zum Text
            </button>
            {answered !== null && (
              <button
                type="button"
                className="btn-ink"
                onClick={() => {
                  setAnswered(null);
                  setQIndex((i) => i + 1);
                }}
              >
                Weiter
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cx(
        "inline-flex min-h-[44px] items-center gap-2 rounded border px-3 text-sm font-semibold",
        on ? "border-ink bg-ink text-paper" : "border-ink/60 text-ink hover:bg-wash",
      )}
    >
      {on && <Check size={16} strokeWidth={2.25} aria-hidden />}
      {children}
    </button>
  );
}
