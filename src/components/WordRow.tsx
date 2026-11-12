import { useState } from "react";
import { POS_LABELS } from "../data/languages";
import { useStore } from "../lib/store";
import type { VocabItem } from "../types";
import { LevelBadge, SpeakButton, StatusDot } from "./ui";

/** One vocabulary entry in a list; tap to expand the example sentence. */
export default function WordRow({ word }: { word: VocabItem }) {
  const { status, settings } = useStore();
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-slate-100 last:border-0 dark:border-slate-800">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen((o) => !o)}
        className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50"
      >
        <StatusDot status={status(word.id)} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <span className="hanzi text-xl font-medium">{word.target}</span>
            {settings.showReading && <span className="text-sm text-brand-700 dark:text-brand-300">{word.reading}</span>}
          </div>
          <div className="truncate text-sm text-slate-600 dark:text-slate-300">{word.de}</div>
        </div>
        <div className="hidden items-center gap-1.5 sm:flex">
          {word.learned && (
            <span className="chip bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" title="Aus deinem Kurs">
              ★ Kurs
            </span>
          )}
          <LevelBadge level={word.level} />
        </div>
        <SpeakButton text={word.target} size="sm" />
      </div>
      {open && (
        <div className="animate-fade-in space-y-2 bg-slate-50 px-4 pb-4 pt-1 text-sm dark:bg-slate-800/40">
          <div className="muted flex flex-wrap gap-2 text-xs">
            <span>{POS_LABELS[word.pos]}</span>
            <span>·</span>
            <span>Niveau {word.level}</span>
            {word.learned && (
              <>
                <span>·</span>
                <span>aus deinem Kurs</span>
              </>
            )}
          </div>
          {word.example ? (
            <div className="flex items-start gap-3 rounded-xl bg-white p-3 dark:bg-slate-900">
              <SpeakButton text={word.example.target} size="sm" />
              <div>
                <div className="hanzi text-base">{word.example.target}</div>
                {settings.showReading && <div className="text-brand-700 dark:text-brand-300">{word.example.reading}</div>}
                <div className="muted">{word.example.de}</div>
              </div>
            </div>
          ) : (
            <div className="muted">Noch kein Beispielsatz hinterlegt.</div>
          )}
        </div>
      )}
    </li>
  );
}
