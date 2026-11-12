import { useState } from "react";
import { Link } from "react-router-dom";
import { Confetti, LevelBadge, PageHeader, ProgressBar, SpeakButton } from "../components/ui";
import { POS_LABELS } from "../data/languages";
import { useStore } from "../lib/store";
import { cx, shuffle } from "../lib/utils";
import type { VocabItem } from "../types";

const SESSION_SIZE = 20;

/** Flashcards with spaced repetition: due words first. */
export default function Review() {
  const { lang, dueWords, progress } = useStore();
  const [deck, setDeck] = useState<VocabItem[] | null>(null);

  const learning = lang.vocab.filter((w) => progress.cards[w.id]);

  if (deck) return <Session deck={deck} onExit={() => setDeck(null)} />;

  return (
    <div>
      <PageHeader title="Wiederholen" subtitle="Karteikarten mit Spaced Repetition – schwierige Wörter kommen öfter." />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-6">
          <div className="text-4xl">🃏</div>
          <div className="mt-3 text-3xl font-extrabold">{dueWords.length}</div>
          <div className="muted text-sm font-medium">Wörter sind heute fällig</div>
          <button
            type="button"
            className="btn-primary mt-5 w-full"
            disabled={!dueWords.length}
            onClick={() => setDeck(shuffle(dueWords).slice(0, SESSION_SIZE))}
          >
            {dueWords.length ? "Fällige wiederholen" : "Alles erledigt 🎉"}
          </button>
        </div>
        <div className="card p-6">
          <div className="text-4xl">🔁</div>
          <div className="mt-3 text-3xl font-extrabold">{learning.length}</div>
          <div className="muted text-sm font-medium">Wörter hast du schon begonnen</div>
          <button
            type="button"
            className="btn-ghost mt-5 w-full"
            disabled={!learning.length}
            onClick={() =>
              setDeck(
                [...learning]
                  .sort((a, b) => progress.cards[a.id].box - progress.cards[b.id].box)
                  .slice(0, SESSION_SIZE),
              )
            }
          >
            Schwächste Wörter üben
          </button>
        </div>
      </div>
      {!learning.length && (
        <p className="muted mt-6 text-center text-sm">
          Noch keine Karten vorhanden.{" "}
          <Link to="/learn" className="font-semibold text-brand-600 hover:underline">
            Starte deine erste Lektion
          </Link>
          , dann tauchen die Wörter hier automatisch auf.
        </p>
      )}
    </div>
  );
}

function Session({ deck, onExit }: { deck: VocabItem[]; onExit: () => void }) {
  const { answer, settings } = useStore();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (index >= deck.length) {
    return (
      <div className="mx-auto max-w-md text-center">
        <Confetti count={40} />
        <div className="card p-8">
          <p className="text-6xl">🎉</p>
          <h1 className="mt-4 text-2xl font-extrabold">Runde geschafft!</h1>
          <p className="muted mt-1">
            {known} von {deck.length} gewusst
          </p>
          <button type="button" className="btn-primary mt-6" onClick={onExit}>
            Fertig
          </button>
        </div>
      </div>
    );
  }

  const word = deck[index];
  const rate = (ok: boolean) => {
    answer(word.id, ok, 5);
    if (ok) setKnown((k) => k + 1);
    setFlipped(false);
    setIndex((i) => i + 1);
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-5 flex items-center gap-3">
        <button type="button" onClick={onExit} aria-label="Beenden" className="muted text-xl hover:text-slate-900 dark:hover:text-white">
          ✕
        </button>
        <ProgressBar value={index / deck.length} className="h-3.5" />
        <span className="muted text-sm font-semibold">
          {index + 1}/{deck.length}
        </span>
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label="Karte umdrehen"
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => (e.key === " " || e.key === "Enter") && setFlipped((f) => !f)}
        className={cx("flip h-80 cursor-pointer select-none", flipped && "flipped")}
      >
        <div className="flip-inner relative h-full w-full">
          <div className="flip-face card absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="hanzi text-6xl font-medium">{word.target}</div>
            <SpeakButton text={word.target} className="mt-6" />
            <p className="muted mt-6 text-xs">Tippen zum Umdrehen</p>
          </div>
          <div className="flip-face flip-back card absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-2 flex gap-2">
              <LevelBadge level={word.level} />
              <span className="chip bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{POS_LABELS[word.pos]}</span>
            </div>
            <div className="hanzi text-3xl">{word.target}</div>
            {settings.showReading && <div className="mt-1 text-lg font-semibold text-brand-700 dark:text-brand-300">{word.reading}</div>}
            <div className="mt-2 text-xl font-bold">{word.de}</div>
            {word.example && (
              <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800/60">
                <div className="hanzi text-base">{word.example.target}</div>
                <div className="muted">{word.example.de}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {flipped ? (
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" className="btn-accent py-3.5 text-base" onClick={() => rate(false)}>
            🔁 Nochmal
          </button>
          <button type="button" className="btn-primary py-3.5 text-base" onClick={() => rate(true)}>
            ✅ Gewusst
          </button>
        </div>
      ) : (
        <button type="button" className="btn-ghost mt-5 w-full py-3.5 text-base" onClick={() => setFlipped(true)}>
          Antwort zeigen
        </button>
      )}
    </div>
  );
}
