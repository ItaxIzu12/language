import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useStore } from "../lib/store";
import { Bar, ICON, Seal } from "./ui";

/** Top line of a running round: quit, progress, a counter on the right. */
export function RoundBar({
  onExit,
  value,
  right,
}: {
  onExit: () => void;
  value: number;
  right: ReactNode;
}) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <button
        type="button"
        onClick={onExit}
        aria-label="Runde beenden"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded border border-ink/60 hover:bg-wash"
      >
        <X {...ICON} aria-hidden />
      </button>
      <Bar value={value} tone="red" className="h-2" />
      <span className="shrink-0 text-sm font-semibold text-dim">{right}</span>
    </div>
  );
}

/** Result of a finished round. */
export function RoundEnd({
  score,
  total,
  line,
  perfect,
  onExit,
  exitLabel = "Neue Runde",
  children,
}: {
  score: number;
  total: number;
  line: string;
  perfect: boolean;
  onExit: () => void;
  exitLabel?: string;
  children?: ReactNode;
}) {
  const { lang } = useStore();
  return (
    <div className="mx-auto max-w-md">
      <div className="flex items-center gap-6 border-b-2 border-ink pb-6">
        {perfect && <Seal text={lang.culture.seal} />}
        <div>
          <h1 className="font-display text-8xl font-black leading-none">
            {score}
            <span className="text-dim"> / {total}</span>
          </h1>
          <p className="mt-2 text-dim">{line}</p>
        </div>
      </div>
      {children}
      <button type="button" className="btn-ink mt-6" onClick={onExit}>
        {exitLabel}
      </button>
    </div>
  );
}

/** Labelled form row for round setup screens. */
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 border-t border-rule py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center">
      <div className="caption">{label}</div>
      <div>{children}</div>
    </div>
  );
}
