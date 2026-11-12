import { useEffect, useState } from "react";
import { cx } from "../lib/utils";

export interface ChoiceOption {
  key: string;
  label: string;
  sub?: string;
  /** Render label in the target-script font. */
  hanzi?: boolean;
}

/**
 * Multiple-choice answer grid. Locks after the first pick and reports it.
 * Remount with a new `key` for each question. Number keys 1–4 also work.
 */
export default function Choice({
  options,
  correctKey,
  onPick,
}: {
  options: ChoiceOption[];
  correctKey: string;
  onPick: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);

  const pick = (key: string) => {
    if (picked) return;
    setPicked(key);
    onPick(key === correctKey);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const i = Number(e.key) - 1;
      if (!picked && i >= 0 && i < options.length) pick(options[i].key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((o, i) => {
        const isCorrect = o.key === correctKey;
        const isPicked = o.key === picked;
        return (
          <button
            key={o.key}
            type="button"
            disabled={!!picked}
            onClick={() => pick(o.key)}
            className={cx(
              "flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition",
              !picked &&
                "border-slate-200 bg-white hover:border-brand-400 hover:bg-brand-50 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-500 dark:hover:bg-brand-900/20",
              picked && isCorrect && "animate-pop border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30",
              picked && isPicked && !isCorrect && "border-rose-500 bg-rose-50 dark:bg-rose-900/30",
              picked && !isPicked && !isCorrect && "border-slate-200 opacity-50 dark:border-slate-700",
            )}
          >
            <span className="muted hidden h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 text-xs font-bold dark:border-slate-700 sm:flex">
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className={cx("block font-semibold", o.hanzi && "hanzi text-xl font-medium")}>{o.label}</span>
              {o.sub && <span className="block text-sm text-brand-700 dark:text-brand-300">{o.sub}</span>}
            </span>
            {picked && isCorrect && <span className="ml-auto">✅</span>}
            {picked && isPicked && !isCorrect && <span className="ml-auto">❌</span>}
          </button>
        );
      })}
    </div>
  );
}
