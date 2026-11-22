import { useEffect, useMemo, useRef, useState } from "react";
import Choice from "../../shared/learning/Choice";
import { Field, RoundBar, RoundEnd } from "../../shared/learning/Round";
import { PageHeader, Segmented, SpeakButton, Verdict } from "../../shared/ui/ui";
import { LEVELS } from "../../languages/registry";
import { useStore } from "../../state/learningStore";
import { hasVoice, speak } from "../../shared/audio/tts";
import { shuffle } from "../../shared/lib/utils";
import type { Level, ListeningSentence } from "../../languages/types";

interface Item {
  id: string;
  target: string;
  reading: string;
  de: string;
  level: Level;
}

const ROUND = 8;

/** Shown wherever speech output is needed but the device has no voice for the language. */
export function VoiceNotice() {
  const { lang } = useStore();
  const [ok, setOk] = useState(true);
  useEffect(() => {
    // Voices may load late; check twice.
    const check = () => setOk(hasVoice(lang.ttsLang));
    check();
    const t = setTimeout(check, 800);
    return () => clearTimeout(t);
  }, [lang.ttsLang]);
  if (ok) return null;
  return (
    <p role="alert" className="mb-6 border-l-0 border-t-2 border-cinnabar bg-wash p-4 text-sm">
      <strong>Auf diesem Gerät fehlt eine Stimme für {lang.name}.</strong> Die Sprachausgabe nutzt die Stimmen deines
      Geräts. Installiere in den Systemeinstellungen unter „Sprache" oder „Text-zu-Sprache" eine Stimme für {lang.name},
      oder öffne die App in Chrome, Edge oder Safari.
    </p>
  );
}

/** Listening comprehension: hear a sentence, pick its meaning. */
export default function Listen() {
  const { lang } = useStore();
  const [level, setLevel] = useState<Level | "all">("all");
  const [round, setRound] = useState<Item[] | null>(null);

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
    <div className="max-w-3xl">
      <PageHeader
        title="Hörtraining"
        subtitle="Einen Satz hören und seine Bedeutung wählen – erst danach siehst du ihn geschrieben."
      />
      <VoiceNotice />
      <div className="border-b border-rule">
        <Field label="Stufe">
          <Segmented<Level | "all">
            label="Stufe"
            value={level}
            onChange={setLevel}
            options={[{ value: "all", label: "Alle" }, ...LEVELS.map((l) => ({ value: l, label: l }))]}
          />
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
        <span className="text-sm text-dim">{pool.length} Sätze auf dieser Stufe</span>
      </div>
    </div>
  );
}

function Round({ items, pool, onExit }: { items: Item[]; pool: Item[]; onExit: () => void }) {
  const { lang, settings, addXp, logActivity } = useStore();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);
  const logged = useRef(false);

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
    if (current) void speak(current.item.target, lang.ttsLang, settings.rate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (!current && !logged.current) {
      logged.current = true;
      logActivity("apply");
    }
  }, [current, logActivity]);

  if (!current) {
    return (
      <RoundEnd
        score={score}
        total={questions.length}
        perfect={score === questions.length}
        line="Sätze nach Gehör verstanden."
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
            Satz {index + 1} / {questions.length}
          </>
        }
      />

      <div key={index} className="animate-enter">
        <h2 className="mb-4 text-lg font-bold">Was bedeutet der Satz?</h2>
        <div className="mb-6 flex min-h-[7rem] flex-wrap items-center gap-5 border-y-2 border-ink py-5">
          <div className="flex gap-3">
            <SpeakButton text={current.item.target} size="lg" />
            <SpeakButton text={current.item.target} size="lg" slow />
          </div>
          {result === null ? (
            <p className="text-sm text-dim">Beliebig oft anhören – der rechte Knopf spricht langsam.</p>
          ) : (
            <p className="min-w-0">
              <span className="hanzi block text-2xl font-bold">{current.item.target}</span>
              <span className="reading block">{current.item.reading}</span>
            </p>
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
        <div className="mt-8">
          <Verdict
            ok={result}
            title={result ? "Richtig verstanden. +10 XP" : "Nicht richtig – hör ihn dir noch einmal an."}
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
            {current.item.de}
          </Verdict>
        </div>
      )}
    </div>
  );
}
