import { useEffect, useMemo, useState } from "react";
import Choice from "../components/Choice";
import { PageHeader, Segmented, SpeakButton } from "../components/ui";
import { LEVELS } from "../data/languages";
import { useStore } from "../lib/store";
import { hasVoice, speak } from "../lib/tts";
import { cx, shuffle } from "../lib/utils";
import type { Level, ListeningSentence } from "../types";

interface Item {
  id: string;
  target: string;
  reading: string;
  de: string;
  level: Level;
}

const ROUND = 8;

/** Listening comprehension: hear a sentence, pick its meaning. */
export default function Listen() {
  const { lang } = useStore();
  const [level, setLevel] = useState<Level | "all">("all");
  const [round, setRound] = useState<Item[] | null>(null);
  const [voiceOk, setVoiceOk] = useState(true);

  useEffect(() => {
    // Voices may load late; check twice.
    const check = () => setVoiceOk(hasVoice(lang.ttsLang));
    check();
    const t = setTimeout(check, 800);
    return () => clearTimeout(t);
  }, [lang.ttsLang]);

  // Sentences = curated listening set + all vocabulary example sentences.
  const pool = useMemo<Item[]>(() => {
    const fromVocab: Item[] = lang.vocab
      .filter((w) => w.example)
      .map((w) => ({ id: `ex:${w.id}`, ...w.example!, level: w.level }));
    const curated: Item[] = lang.listening.map((s: ListeningSentence) => ({ ...s }));
    const seen = new Set<string>();
    return [...curated, ...fromVocab].filter((s) => {
      if (seen.has(s.target)) return false;
      seen.add(s.target);
      return level === "all" || s.level === level;
    });
  }, [lang, level]);

  if (round) return <Round items={round} pool={pool} onExit={() => setRound(null)} />;

  return (
    <div>
      <PageHeader title="Hörverstehen" subtitle="Höre einen Satz und wähle die richtige Bedeutung." />
      {!voiceOk && (
        <div className="mb-5 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
          <strong>Keine {lang.name}-Stimme gefunden.</strong> Die Sprachausgabe nutzt die Stimmen deines Geräts. Installiere
          in den System-Einstellungen (Sprache / Text-zu-Sprache) eine Stimme für {lang.name} oder öffne die App in Chrome,
          Edge oder Safari.
        </div>
      )}
      <div className="card space-y-5 p-5 sm:p-6">
        <div>
          <div className="muted mb-2 text-xs font-bold uppercase tracking-wide">Niveau</div>
          <Segmented<Level | "all">
            value={level}
            onChange={setLevel}
            options={[{ value: "all", label: "Alle" }, ...LEVELS.map((l) => ({ value: l, label: l }))]}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <span className="muted text-sm">{pool.length} Sätze verfügbar</span>
          <button
            type="button"
            className="btn-primary"
            disabled={pool.length < 4}
            onClick={() => setRound(shuffle(pool).slice(0, ROUND))}
          >
            🎧 Runde starten
          </button>
        </div>
      </div>
    </div>
  );
}

function Round({ items, pool, onExit }: { items: Item[]; pool: Item[]; onExit: () => void }) {
  const { lang, settings, addXp } = useStore();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);

  const questions = useMemo(
    () =>
      items.map((item) => ({
        item,
        options: shuffle([item, ...shuffle(pool.filter((p) => p.id !== item.id && p.de !== item.de)).slice(0, 3)]),
      })),
    [items, pool],
  );

  const current = questions[index];

  useEffect(() => {
    if (current) speak(current.item.target, lang.ttsLang, settings.rate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  if (!current) {
    return (
      <div className="mx-auto max-w-md text-center">
        <div className="card p-8">
          <p className="text-6xl">🎧</p>
          <h1 className="mt-4 text-3xl font-extrabold">
            {score} / {questions.length}
          </h1>
          <p className="muted mt-1">Sätze richtig verstanden</p>
          <button type="button" className="btn-primary mt-6" onClick={onExit}>
            Neue Runde
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex items-center justify-between text-sm font-bold">
        <button type="button" onClick={onExit} className="muted hover:text-slate-900 dark:hover:text-white">
          ✕ Beenden
        </button>
        <span className="muted">
          Satz {index + 1} / {questions.length}
        </span>
        <span className="chip bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">✅ {score}</span>
      </div>

      <div key={index} className="animate-fade-in">
        <div className="card mb-5 flex flex-col items-center gap-4 p-6">
          <div className="flex gap-4">
            <SpeakButton text={current.item.target} size="lg" />
            <SpeakButton text={current.item.target} size="lg" slow />
          </div>
          {result === null ? (
            <p className="muted text-sm">Nochmal hören? Tippe auf 🔊 oder 🐢 für langsam.</p>
          ) : (
            <div className="text-center">
              <div className="hanzi text-2xl">{current.item.target}</div>
              <div className="mt-1 text-brand-700 dark:text-brand-300">{current.item.reading}</div>
            </div>
          )}
        </div>
        <Choice
          correctKey={current.item.id}
          options={current.options.map((o) => ({ key: o.id, label: o.de }))}
          onPick={(correct) => {
            setResult(correct);
            if (correct) {
              setScore((s) => s + 1);
              addXp(10);
            }
          }}
        />
      </div>

      {result !== null && (
        <div
          className={cx(
            "animate-fade-in mt-5 flex items-center justify-between gap-3 rounded-2xl p-4",
            result ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-rose-50 dark:bg-rose-900/30",
          )}
        >
          <span className="font-extrabold">{result ? "Richtig! +10 XP" : "Leider falsch"}</span>
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
