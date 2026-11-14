import { Check, X } from "lucide-react";
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
 * Multiple-choice answers as a ruled list. Locks after the first pick and reports it.
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
    <div className="grid gap-2 sm:grid-cols-2" data-choice>
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
              "flex min-h-[60px] items-center gap-3 rounded border px-4 py-3 text-left transition-transform duration-150",
              !picked && "border-ink/60 bg-sheet hover:bg-wash active:translate-y-px",
              picked && isCorrect && "border-jade bg-jade text-paper",
              picked && isPicked && !isCorrect && "border-cinnabar bg-cinnabar text-on-cinnabar",
              picked && !isPicked && !isCorrect && "border-rule text-dim",
            )}
          >
            <span className={cx("font-display text-xl font-extrabold leading-none", !picked && "text-dim")} aria-hidden>
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className={cx("block font-semibold", o.hanzi && "hanzi text-2xl font-bold leading-tight")}>{o.label}</span>
              {o.sub && <span className={cx("block text-sm", !picked && "reading")}>{o.sub}</span>}
            </span>
            {picked && isCorrect && <Check size={20} strokeWidth={2.25} aria-label="richtig" />}
            {picked && isPicked && !isCorrect && <X size={20} strokeWidth={2.25} aria-label="falsch" />}
          </button>
        );
      })}
    </div>
  );
}
