import { Check, Turtle, Volume2, X } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { useStore } from "../../state/learningStore";
import type { WordStatus } from "../../state/learningStore";
import { speak } from "../audio/tts";
import { cx } from "../lib/utils";
import type { Level } from "../../languages/types";

export const ICON = { size: 18, strokeWidth: 1.75 } as const;

/** Square button that reads text aloud in the current learning language. */
export function SpeakButton({
  text,
  size = "md",
  slow = false,
  className,
}: {
  text: string;
  size?: "sm" | "md" | "lg";
  slow?: boolean;
  className?: string;
}) {
  const { lang, settings } = useStore();
  const [active, setActive] = useState(false);
  const dims = size === "lg" ? "h-14 w-14" : size === "sm" ? "h-11 w-11" : "h-11 w-11";
  const Icon = slow ? Turtle : Volume2;
  return (
    <button
      type="button"
      aria-label={slow ? "Langsam vorlesen" : "Vorlesen"}
      title={slow ? "Langsam vorlesen" : "Vorlesen"}
      onClick={(e) => {
        e.stopPropagation();
        setActive(true);
        void speak(text, lang.ttsLang, slow ? 0.6 : settings.rate).then(() => setActive(false));
      }}
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded border transition-transform duration-150 active:translate-y-px",
        active ? "border-cinnabar bg-cinnabar text-on-cinnabar" : "border-ink/60 text-ink hover:bg-wash",
        dims,
        className,
      )}
    >
      <Icon size={size === "lg" ? 24 : size === "sm" ? 16 : 20} strokeWidth={1.75} aria-hidden />
    </button>
  );
}

/** Flat progress bar with a hard edge. */
export function Bar({
  value,
  className,
  tone = "ink",
}: {
  value: number;
  className?: string;
  tone?: "ink" | "red" | "jade";
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  const fill = tone === "red" ? "bg-cinnabar" : tone === "jade" ? "bg-jade" : "bg-ink";
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cx("h-1.5 w-full overflow-hidden bg-wash", className)}
    >
      <div
        className={cx("h-full origin-left transition-transform duration-500", fill)}
        style={{ transform: `scaleX(${pct / 100})` }}
      />
    </div>
  );
}

const LEVEL_TONE: Record<Level, string> = {
  A1: "text-jade",
  A2: "text-blue",
  B1: "text-ochre",
  B2: "text-cinnabar",
};

export function levelTone(level: Level): string {
  return LEVEL_TONE[level];
}

export function LevelTag({ level }: { level: Level }) {
  return <span className={cx("tag", LEVEL_TONE[level])}>{level}</span>;
}

/** Word status as a small printed box: empty, half, full – never colour alone. */
export function StatusMark({ status }: { status: WordStatus }) {
  const label = status === "new" ? "Neu" : status === "learning" ? "Am Lernen" : "Sicher";
  return (
    <span
      title={label}
      aria-label={label}
      className={cx(
        "relative inline-block h-3 w-3 shrink-0 border",
        status === "new" && "border-dim/60",
        status === "learning" && "border-ochre",
        status === "mastered" && "border-jade bg-jade",
      )}
    >
      {status === "learning" && <span className="absolute inset-y-0 left-0 w-1/2 bg-ochre" />}
    </span>
  );
}

/** A single character in a square field: the mark of a category, level, text or episode. */
export function Glyph({
  char,
  size = "md",
  tone = "ink",
}: {
  char: string;
  size?: "sm" | "md" | "lg";
  tone?: "ink" | "red" | "line";
}) {
  const dims = size === "lg" ? "h-16 w-16 text-4xl" : size === "sm" ? "h-9 w-9 text-xl" : "h-12 w-12 text-[1.7rem]";
  return (
    <span
      aria-hidden
      className={cx(
        "hanzi inline-flex shrink-0 items-center justify-center rounded-sm font-bold leading-none",
        tone === "ink" && "bg-ink text-paper",
        tone === "red" && "bg-cinnabar text-on-cinnabar",
        tone === "line" && "border border-ink/70 text-ink",
        dims,
      )}
    >
      {char}
    </span>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <header className="mh-section-title mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
      <div className="min-w-0">
        <h1 className="title">{title}</h1>
        {subtitle && <p className="mt-2 max-w-[65ch] text-dim">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (v: T) => void;
  label?: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex flex-wrap border border-ink/70">
      {options.map((o, i) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cx(
            "min-h-[40px] px-3 text-sm font-semibold transition-colors",
            i > 0 && "border-l border-ink/70",
            value === o.value ? "bg-ink text-paper" : "text-ink hover:bg-wash",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Red seal impression – the app's one celebration. */
export function Seal({ text = "完", size = 96 }: { text?: string; size?: number }) {
  return (
    <span
      role="img"
      aria-label="Siegel: fertig"
      className="hanzi inline-flex animate-stamp items-center justify-center rounded-sm border-[3px] border-cinnabar font-black leading-none text-cinnabar"
      style={{ width: size, height: size, fontSize: size * 0.6 }}
    >
      {text}
    </span>
  );
}

/** Result strip after an answer: icon + text, never colour alone. */
export function Verdict({
  ok,
  title,
  children,
  action,
}: {
  ok: boolean;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div
      role="status"
      className={cx(
        "flex animate-enter flex-wrap items-center justify-between gap-3 border-t-2 py-4",
        ok ? "border-jade" : "border-cinnabar",
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        <span
          className={cx(
            "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-sm",
            ok ? "bg-jade text-paper" : "bg-cinnabar text-on-cinnabar",
          )}
        >
          {ok ? <Check {...ICON} aria-hidden /> : <X {...ICON} aria-hidden />}
        </span>
        <div className="min-w-0">
          <div className="font-bold">{title}</div>
          {children && <div className="mt-0.5 text-sm">{children}</div>}
        </div>
      </div>
      {action}
    </div>
  );
}

/** Word shown as target + reading + meaning on one line. */
export function WordLine({ target, reading, de }: { target?: string; reading?: string; de?: string }) {
  const { settings } = useStore();
  return (
    <span>
      <span className="hanzi text-lg font-medium">{target}</span>
      {settings.showReading && reading && <span className="reading ml-2">{reading}</span>}
      {de && <span className="text-dim"> – {de}</span>}
    </span>
  );
}

/** One line telling what is missing and the control that fixes it. */
export function Empty({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border border-dashed border-rule p-5">
      <p className="max-w-[60ch] text-dim">{children}</p>
      {action}
    </div>
  );
}
