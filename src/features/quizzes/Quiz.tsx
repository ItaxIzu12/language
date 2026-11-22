import { useMemo, useState } from "react";
import Choice from "../../shared/learning/Choice";
import { Field, RoundBar, RoundEnd } from "../../shared/learning/Round";
import { PageHeader, Segmented, SpeakButton, Verdict, WordLine } from "../../shared/ui/ui";
import { LEVELS } from "../../languages/registry";
import { makeOptions } from "../../shared/lib/exercises";
import { mistakeWords } from "../../shared/lib/mistakes";
import { useStore } from "../../state/learningStore";
import { speak } from "../../shared/audio/tts";
import { shuffle } from "../../shared/lib/utils";
import type { Level, VocabItem } from "../../languages/types";

type Direction = "toDe" | "toTarget" | "mixed";
type Scope = "all" | "course" | "started" | "mistakes";

const ROUND = 10;

export default function Quiz() {
  const { lang, progress } = useStore();
  const [direction, setDirection] = useState<Direction>("mixed");
  const [scope, setScope] = useState<Scope>("all");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState<Level | "all">("all");
  const [round, setRound] = useState<VocabItem[] | null>(null);

  const pool = useMemo(() => {
    const base = scope === "mistakes" ? mistakeWords(lang.vocab, progress) : lang.vocab;
    return base.filter(
      (w) =>
        (category === "all" || w.category === category) &&
        (level === "all" || w.level === level) &&
        (scope === "all" || scope === "mistakes" || (scope === "course" ? w.learned : !!progress.cards[w.id])),
    );
  }, [lang.vocab, category, level, scope, progress]);

  if (round) return <Round words={round} direction={direction} onExit={() => setRound(null)} />;

  return (
    <div className="max-w-3xl">
      <PageHeader title="Quiz" subtitle={`Runden mit ${ROUND} Fragen. Wähle, woraus gefragt wird.`} />
      <div className="border-b border-rule">
        <Field label="Richtung">
          <Segmented<Direction>
            label="Richtung"
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
            label="Wörter"
            value={scope}
            onChange={setScope}
            options={[
              { value: "all", label: "Alle" },
              { value: "course", label: "Aus meinem Kurs" },
              { value: "started", label: "Schon begonnen" },
              { value: "mistakes", label: "Fehlerheft" },
            ]}
          />
        </Field>
        <Field label="Stufe">
          <Segmented<Level | "all">
            label="Stufe"
            value={level}
            onChange={setLevel}
            options={[{ value: "all", label: "Alle" }, ...LEVELS.map((l) => ({ value: l, label: l }))]}
          />
        </Field>
        <Field label="Kategorie">
          <select
            className="field max-w-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Kategorie"
          >
            <option value="all">Alle Kategorien</option>
            {lang.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          className="btn-ink"
          disabled={pool.length < 4}
          onClick={() => setRound(shuffle(pool).slice(0, ROUND))}
        >
          Runde starten
        </button>
        <span className="text-sm text-dim">
          {pool.length < 4
            ? `Nur ${pool.length} Wörter passen – mindestens vier sind nötig. Lockere einen Filter.`
            : `${pool.length} Wörter passen zur Auswahl`}
        </span>
      </div>
    </div>
  );
}

function Round({ words, direction, onExit }: { words: VocabItem[]; direction: Direction; onExit: () => void }) {
  const { lang, settings, answer, logActivity } = useStore();
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
    const ratio = score / questions.length;
    return (
      <RoundEnd
        score={score}
        total={questions.length}
        perfect={ratio === 1}
        line={
          ratio === 1
            ? "Fehlerfrei."
            : ratio >= 0.7
              ? "Gute Runde."
              : "Die falschen Wörter stehen jetzt in deinem Fehlerheft."
        }
        onExit={onExit}
      >
        <p className="border-b border-rule py-3 text-sm">
          Längste Serie richtiger Antworten: <strong>{bestCombo}</strong>
        </p>
      </RoundEnd>
    );
  }

  const q = questions[index];
  const onPick = (correct: boolean) => {
    setResult(correct);
    answer(q.word.id, correct, 5);
    logActivity("review");
    void speak(q.word.target, lang.ttsLang, settings.rate);
    if (correct) {
      setScore((s) => s + 1);
      const c = combo + 1;
      setCombo(c);
      setBestCombo((b) => Math.max(b, c));
    } else {
      setCombo(0);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <RoundBar
        onExit={onExit}
        value={index / questions.length}
        right={
          <>
            Serie <span className="font-display text-2xl font-extrabold leading-none text-ink">{combo}</span>
          </>
        }
      />

      <div key={index} className="animate-enter">
        <h2 className="mb-4 text-lg font-bold">
          Frage {index + 1} von {questions.length}
        </h2>
        <div className="mb-6 flex min-h-[7rem] items-center gap-5 border-y-2 border-ink py-5">
          {q.mode === "toDe" ? (
            <>
              <div className="min-w-0 flex-1">
                <div className="hanzi text-6xl font-black leading-none">{q.word.target}</div>
                {settings.showReading && <div className="reading mt-2 text-lg">{q.word.reading}</div>}
              </div>
              <SpeakButton text={q.word.target} />
            </>
          ) : (
            <div className="text-3xl font-bold">{q.word.de}</div>
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
        <div className="mt-8">
          <Verdict
            ok={result}
            title={result ? "Richtig. +5 XP" : "Falsch – das Wort wandert ins Fehlerheft."}
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
