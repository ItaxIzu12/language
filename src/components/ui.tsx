import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useStore } from "../lib/store";
import type { WordStatus } from "../lib/store";
import { speak } from "../lib/tts";
import { cx } from "../lib/utils";
import type { Level } from "../types";

/** Round button that reads text aloud in the current learning language. */
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
  const dims = size === "lg" ? "h-14 w-14 text-2xl" : size === "sm" ? "h-8 w-8 text-sm" : "h-10 w-10 text-lg";
  return (
    <button
      type="button"
      aria-label={slow ? "Langsam vorlesen" : "Vorlesen"}
      title={slow ? "Langsam vorlesen" : "Vorlesen"}
      onClick={(e) => {
        e.stopPropagation();
        setActive(true);
        speak(text, lang.ttsLang, slow ? 0.6 : settings.rate).then(() => setActive(false));
      }}
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-full transition active:scale-95",
        active
          ? "bg-brand-600 text-white"
          : "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-900/40 dark:text-brand-200 dark:hover:bg-brand-900/70",
        dims,
        className,
      )}
    >
      {slow ? "🐢" : "🔊"}
    </button>
  );
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cx("h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800", className)}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Ring({ value, size = 120, children }: { value: number; size?: number; children?: ReactNode }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} fill="none" className="stroke-slate-200 dark:stroke-slate-800" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          className="stroke-accent-500 transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

const LEVEL_STYLE: Record<Level, string> = {
  A1: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  A2: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  B1: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  B2: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
};

export function LevelBadge({ level }: { level: Level }) {
  return <span className={cx("chip", LEVEL_STYLE[level])}>{level}</span>;
}

export function StatusDot({ status }: { status: WordStatus }) {
  const map: Record<WordStatus, [string, string]> = {
    new: ["bg-slate-300 dark:bg-slate-600", "Neu"],
    learning: ["bg-amber-400", "Am Lernen"],
    mastered: ["bg-emerald-500", "Sicher"],
  };
  const [color, label] = map[status];
  return <span title={label} aria-label={label} className={cx("inline-block h-2.5 w-2.5 shrink-0 rounded-full", color)} />;
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="muted mt-1 text-sm sm:text-base">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cx(
            "rounded-lg px-3 py-1.5 text-sm font-semibold transition",
            value === o.value
              ? "bg-white text-brand-700 shadow-sm dark:bg-slate-950 dark:text-brand-300"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const CONFETTI_COLORS = ["#3377ff", "#ff6b35", "#22c55e", "#facc15", "#a855f7", "#ec4899"];

/** Lightweight celebratory confetti (pure CSS animation). */
export function Confetti({ count = 70 }: { count?: number }) {
  const [show, setShow] = useState(true);
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2 + Math.random() * 1.8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      })),
    [count],
  );
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 4500);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}vw`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
