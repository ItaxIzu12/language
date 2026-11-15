import { Check, RotateCcw, X } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Bar, Empty, ICON, LevelTag, PageHeader, Seal, Segmented, SpeakButton } from "../../components/ui";
import { POS_LABELS } from "../../data/languages";
import { mistakeWords } from "../../lib/mistakes";
import { useStore } from "../../lib/store";
import { cx, shuffle } from "../../lib/utils";
import type { VocabItem } from "../../types";

const SESSION_SIZE = 20;

type Tab = "cards" | "mistakes";

/** Flashcards with spaced repetition, plus the notebook of stumbling words. */
export default function Review() {
  const { lang, dueWords, progress, settings } = useStore();
  const [params, setParams] = useSearchParams();
  const [deck, setDeck] = useState<VocabItem[] | null>(null);

  const tab: Tab = params.get("tab") === "mistakes" ? "mistakes" : "cards";
  const learning = lang.vocab.filter((w) => progress.cards[w.id]);
  const mistakes = mistakeWords(lang.vocab, progress);

  if (deck) return <Session deck={deck} onExit={() => setDeck(null)} />;

  return (
    <div>
      <PageHeader title="Wiederholen" subtitle="Schwierige Wörter kommen öfter, sichere seltener." />

      <div className="mb-8">
        <Segmented<Tab>
          label="Bereich"
          value={tab}
          onChange={(t) => setParams(t === "mistakes" ? { tab: "mistakes" } : {})}
          options={[
            { value: "cards", label: "Wiederholen" },
            { value: "mistakes", label: `Fehlerheft (${mistakes.length})` },
          ]}
        />
      </div>

      {tab === "cards" ? (
        learning.length ? (
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <section className="border-t-2 border-ink pt-4">
              <h2 className="font-bold">Heute fällig</h2>
              <p className="font-display text-8xl font-black leading-none text-cinnabar">{dueWords.length}</p>
              <p className="mt-2 max-w-[40ch] text-dim">
                {dueWords.length
                  ? "Diese Karten sind jetzt dran. Je pünktlicher du sie wiederholst, desto länger bleiben sie."
                  : "Alles erledigt. Die nächsten Karten werden in den kommenden Tagen fällig."}
              </p>
              <button
                type="button"
                className="btn-ink mt-5"
                disabled={!dueWords.length}
                onClick={() => setDeck(shuffle(dueWords).slice(0, SESSION_SIZE))}
              >
                Fällige wiederholen
              </button>
            </section>
            <section className="border-t-2 border-ink pt-4">
              <h2 className="font-bold">Ohne Termin üben</h2>
              <p className="mt-2 text-dim">
                Du hast {learning.length} Wörter begonnen. Die zwanzig schwächsten davon lassen sich jederzeit üben.
              </p>
              <button
                type="button"
                className="btn-line mt-5"
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
            </section>
          </div>
        ) : (
          <Empty
            action={
              <Link to="/learn" className="btn-ink">
                Erste Lektion wählen
              </Link>
            }
          >
            Noch keine Karten. Nach deiner ersten Lektion erscheinen die Wörter hier von selbst.
          </Empty>
        )
      ) : mistakes.length ? (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-[60ch] text-dim">
              Wörter, die du falsch beantwortet hast und die noch nicht sitzen – die schwierigsten zuerst. Sicher gelernte
              verschwinden von selbst.
            </p>
            <button type="button" className="btn-ink" onClick={() => setDeck(mistakes.slice(0, SESSION_SIZE))}>
              Fehlerheft üben
            </button>
          </div>
          <ul className="rows border-y border-rule">
            {mistakes.map((w) => {
              const c = progress.cards[w.id];
              return (
                <li key={w.id} className="grid grid-cols-[minmax(4.5rem,auto)_minmax(0,1fr)_auto_auto] items-center gap-x-4 py-2.5">
                  <span className="hanzi text-2xl font-bold">{w.target}</span>
                  <span className="min-w-0">
                    {settings.showReading && <span className="reading block text-sm">{w.reading}</span>}
                    <span className="block truncate">{w.de}</span>
                  </span>
                  <span className="text-right text-sm text-dim">
                    <span className="font-semibold text-cinnabar">{c.wrong}× falsch</span>
                    <span className="block">{c.right}× richtig</span>
                  </span>
                  <SpeakButton text={w.target} size="sm" />
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <Empty>Dein Fehlerheft ist leer. Sobald du ein Wort falsch beantwortest, wird es hier gesammelt.</Empty>
      )}
    </div>
  );
}

function Session({ deck, onExit }: { deck: VocabItem[]; onExit: () => void }) {
  const { lang, answer, settings, logActivity } = useStore();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (index >= deck.length) {
    return (
      <div className="mx-auto max-w-md">
        <div className="flex items-center gap-6 border-b-2 border-ink pb-6">
          <Seal text={lang.culture.seal} />
          <div>
            <h1 className="title">Runde fertig</h1>
            <p className="mt-2 text-dim">
              {known} von {deck.length} gewusst
            </p>
          </div>
        </div>
        <button type="button" className="btn-ink mt-6" onClick={onExit}>
          Zurück zu den Karten
        </button>
      </div>
    );
  }

  const word = deck[index];
  const rate = (ok: boolean) => {
    answer(word.id, ok, 5);
    logActivity("review");
    if (ok) setKnown((k) => k + 1);
    setFlipped(false);
    setIndex((i) => i + 1);
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={onExit}
          aria-label="Runde beenden"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded border border-ink/60 hover:bg-wash"
        >
          <X {...ICON} aria-hidden />
        </button>
        <Bar value={index / deck.length} tone="red" className="h-2" />
        <span className="shrink-0 text-sm font-semibold text-dim">
          {index + 1} / {deck.length}
        </span>
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label="Karte umdrehen"
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => (e.key === " " || e.key === "Enter") && setFlipped((f) => !f)}
        className={cx("flip h-[22rem] select-none", flipped && "flipped")}
      >
        <div className="flip-inner relative h-full w-full">
          <div className="flip-face sheet absolute inset-0 flex flex-col overflow-hidden">
            <div className="bg-band">
              <div className="perforation" aria-hidden />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
              <div className="hanzi text-7xl font-black leading-none">{word.target}</div>
              <SpeakButton text={word.target} className="mt-8" />
            </div>
            <p className="border-t border-rule py-2 text-center text-sm text-dim">Antippen zum Umdrehen</p>
          </div>
          <div className="flip-face flip-back sheet absolute inset-0 flex flex-col justify-center p-6">
            <p className="flex items-center gap-2 text-sm">
              <LevelTag level={word.level} />
              <span className="text-dim">{POS_LABELS[word.pos]}</span>
            </p>
            <div className="hanzi mt-3 text-4xl font-black">{word.target}</div>
            {settings.showReading && <div className="reading mt-1 text-xl font-semibold">{word.reading}</div>}
            <div className="mt-2 text-2xl font-bold">{word.de}</div>
            {word.example && (
              <p className="mt-5 border-t border-rule pt-4">
                <span className="hanzi block text-lg font-medium">{word.example.target}</span>
                <span className="block text-sm text-dim">{word.example.de}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {flipped ? (
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" className="btn-line" onClick={() => rate(false)}>
            <RotateCcw {...ICON} aria-hidden /> Nochmal
          </button>
          <button type="button" className="btn-ink" onClick={() => rate(true)}>
            <Check {...ICON} aria-hidden /> Gewusst
          </button>
        </div>
      ) : (
        <button type="button" className="btn-line mt-5 w-full" onClick={() => setFlipped(true)}>
          Antwort zeigen
        </button>
      )}
    </div>
  );
}
