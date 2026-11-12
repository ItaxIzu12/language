import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Choice from "../components/Choice";
import { PageHeader, Segmented, SpeakButton } from "../components/ui";
import { LEVELS } from "../data/languages";
import { makeOptions } from "../lib/exercises";
import { useStore } from "../lib/store";
import { speak } from "../lib/tts";
import { cx, shuffle } from "../lib/utils";
import type { Level, VocabItem } from "../types";

type Direction = "toDe" | "toTarget" | "mixed";
type Scope = "all" | "course" | "started";

const ROUND = 10;

export default function Quiz() {
  const { lang, progress } = useStore();
  const [direction, setDirection] = useState<Direction>("mixed");
  const [scope, setScope] = useState<Scope>("all");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState<Level | "all">("all");
  const [round, setRound] = useState<VocabItem[] | null>(null);

  const pool = useMemo(
    () =>
      lang.vocab.filter(
        (w) =>
          (category === "all" || w.category === category) &&
          (level === "all" || w.level === level) &&
          (scope === "all" || (scope === "course" ? w.learned : !!progress.cards[w.id])),
      ),
    [lang.vocab, category, level, scope, progress.cards],
  );

  if (round) return <Round words={round} direction={direction} onExit={() => setRound(null)} />;

  return (
    <div>
      <PageHeader title="Quiz" subtitle={`Schnelle Runden mit ${ROUND} Fragen – wähle, was du üben willst.`} />
      <div className="card space-y-5 p-5 sm:p-6">
        <Field label="Richtung">
          <Segmented<Direction>
            value={direction}
            onChange={setDirection}
            options={[
              { value: "mixed", label: "Gemischt" },
              { value: "toDe", label: `${lang.nativeName} → Deutsch` },
              { value: "toTarget", label: `Deutsch → ${lang.nativeName}` },
            ]}
          />
        </Field>
        <Field label="Wörter">
          <Segmented<Scope>
            value={scope}
            onChange={setScope}
            options={[
              { value: "all", label: "Alle" },
              { value: "course", label: "★ Aus meinem Kurs" },
              { value: "started", label: "Schon begonnen" },
            ]}
          />
        </Field>
        <Field label="Niveau">
          <Segmented<Level | "all">
            value={level}
            onChange={setLevel}
            options={[{ value: "all", label: "Alle" }, ...LEVELS.map((l) => ({ value: l, label: l }))]}
          />
        </Field>
        <Field label="Kategorie">
          <select className="input max-w-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">Alle Kategorien</option>
            {lang.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.name}
              </option>
            ))}
          </select>
        </Field>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <span className="muted text-sm">{pool.length} Wörter passen zur Auswahl</span>
          <button
            type="button"
            className="btn-primary"
            disabled={pool.length < 4}
            onClick={() => setRound(shuffle(pool).slice(0, ROUND))}
          >
            🎯 Runde starten
          </button>
        </div>
        {pool.length < 4 && <p className="text-sm text-rose-600">Mindestens 4 Wörter nötig – erweitere die Auswahl.</p>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="muted mb-2 text-xs font-bold uppercase tracking-wide">{label}</div>
      {children}
    </div>
  );
}

function Round({ words, direction, onExit }: { words: VocabItem[]; direction: Direction; onExit: () => void }) {
  const { lang, settings, answer } = useStore();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);

  // Fix direction + options per question once.
  const questions = useMemo(
    () =>
      words.map((word) => ({
        word,
        mode: direction === "mixed" ? (Math.random() < 0.5 ? "toDe" : "toTarget") : direction,
        options: makeOptions(word, lang.vocab),
      })),
    [words, direction, lang.vocab],
  );

  if (index >= questions.length) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="mx-auto max-w-md text-center">
        <div className="card p-8">
          <p className="text-6xl">{pct === 100 ? "🏆" : pct >= 70 ? "🎉" : "💪"}</p>
          <h1 className="mt-4 text-3xl font-extrabold">
            {score} / {questions.length}
          </h1>
          <p className="muted mt-1">
            {pct === 100 ? "Fehlerfrei – stark!" : pct >= 70 ? "Gute Runde!" : "Dranbleiben – Übung macht den Meister."}
          </p>
          <p className="mt-3 text-sm font-semibold">🔥 Beste Serie: {bestCombo}</p>
          <button type="button" className="btn-primary mt-6" onClick={onExit}>
            Neue Runde
          </button>
        </div>
      </div>
    );
  }

  const q = questions[index];
  const onPick = (correct: boolean) => {
    setResult(correct);
    answer(q.word.id, correct, 5);
    speak(q.word.target, lang.ttsLang, settings.rate);
    if (correct) {
      setScore((s) => s + 1);
      setCombo((c) => {
        setBestCombo((b) => Math.max(b, c + 1));
        return c + 1;
      });
    } else {
      setCombo(0);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex items-center justify-between text-sm font-bold">
        <button type="button" onClick={onExit} className="muted hover:text-slate-900 dark:hover:text-white">
          ✕ Beenden
        </button>
        <span className="muted">
          Frage {index + 1} / {questions.length}
        </span>
        <span className={cx("chip", combo >= 3 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300")}>
          🔥 {combo}
        </span>
      </div>

      <div key={index} className="animate-fade-in">
        <div className="card mb-5 flex min-h-[7rem] items-center gap-4 p-5">
          {q.mode === "toDe" ? (
            <>
              <SpeakButton text={q.word.target} />
              <div>
                <div className="hanzi text-4xl font-medium">{q.word.target}</div>
                {settings.showReading && <div className="mt-1 text-brand-700 dark:text-brand-300">{q.word.reading}</div>}
              </div>
            </>
          ) : (
            <div className="text-2xl font-bold">{q.word.de}</div>
          )}
        </div>
        <Choice
          correctKey={q.word.id}
          onPick={onPick}
          options={q.options.map((o) =>
            q.mode === "toDe"
              ? { key: o.id, label: o.de }
              : { key: o.id, label: o.target, sub: settings.showReading ? o.reading : undefined, hanzi: true },
          )}
        />
      </div>

      {result !== null && (
        <div
          className={cx(
            "animate-fade-in mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4",
            result ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-rose-50 dark:bg-rose-900/30",
          )}
        >
          <div className="text-sm">
            <span className="hanzi text-lg">{q.word.target}</span>{" "}
            <span className="text-brand-700 dark:text-brand-300">{q.word.reading}</span> – {q.word.de}
          </div>
          <button
            type="button"
            className={result ? "btn-primary" : "btn-accent"}
            onClick={() => {
              setResult(null);
              setIndex((i) => i + 1);
            }}
          >
            Weiter
          </button>
        </div>
      )}
    </div>
  );
}
