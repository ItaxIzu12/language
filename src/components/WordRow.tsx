import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { POS_LABELS } from "../data/languages";
import { useStore } from "../lib/store";
import { cx } from "../lib/utils";
import type { VocabItem } from "../types";
import { LevelTag, SpeakButton, StatusMark } from "./ui";

/** One vocabulary entry in a ruled list; opens to show details and the example sentence. */
export default function WordRow({ word }: { word: VocabItem }) {
  const { status, settings, progress } = useStore();
  const [open, setOpen] = useState(false);
  const card = progress.cards[word.id];
  return (
    <li>
      <div className="flex items-center gap-3 py-2.5">
        <StatusMark status={status(word.id)} />
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="grid min-w-0 flex-1 grid-cols-[minmax(4.5rem,auto)_minmax(0,1fr)] items-baseline gap-x-4 text-left"
        >
          <span className="hanzi text-2xl font-bold leading-tight">{word.target}</span>
          <span className="min-w-0">
            {settings.showReading && <span className="reading block text-sm">{word.reading}</span>}
            <span className="block truncate">{word.de}</span>
          </span>
        </button>
        <span className="hidden items-center gap-2 sm:flex">
          {word.learned && <span className="tag text-dim">Kurs</span>}
          <LevelTag level={word.level} />
        </span>
        <SpeakButton text={word.target} size="sm" />
        <button
          type="button"
          aria-label={open ? "Details schließen" : "Details öffnen"}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-dim hover:text-ink"
        >
          <ChevronDown size={18} strokeWidth={1.75} aria-hidden className={cx("transition-transform", open && "rotate-180")} />
        </button>
      </div>
      {open && (
        <div className="animate-enter space-y-3 bg-wash/60 px-4 py-4 text-sm">
          <p className="text-dim">
            {POS_LABELS[word.pos]} · Stufe {word.level}
            {word.learned && " · aus deinem Kurs"}
            {card && ` · ${card.right}× richtig, ${card.wrong}× falsch`}
          </p>
          {word.example ? (
            <div className="flex items-start gap-3">
              <SpeakButton text={word.example.target} size="sm" />
              <p className="min-w-0">
                <span className="hanzi block text-lg font-medium">{word.example.target}</span>
                {settings.showReading && <span className="reading block">{word.example.reading}</span>}
                <span className="block text-dim">{word.example.de}</span>
              </p>
            </div>
          ) : (
            <p className="text-dim">Zu diesem Wort ist noch kein Beispielsatz hinterlegt.</p>
          )}
        </div>
      )}
    </li>
  );
}
