import { useEffect, useRef, useState } from "react";
import { useStore } from "../lib/store";
import { speak } from "../lib/tts";
import { cx } from "../lib/utils";
import type { Episode } from "../types";
import SpeakCheck, { PASS_SCORE } from "./SpeakCheck";
import { Confetti, ProgressBar, SpeakButton } from "./ui";

/** The learner's role in every dialogue. */
export const LEARNER = "我";

/**
 * Role play: the app speaks the partner's lines, the learner answers aloud
 * (guided by a German cue) and gets feedback, line by line.
 */
export default function RolePlay({ episode, onExit }: { episode: Episode; onExit: () => void }) {
  const { lang, settings, addXp, markDone } = useStore();
  const [index, setIndex] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const [hint, setHint] = useState(false);
  const [good, setGood] = useState(0);
  const rewarded = useRef(false);
  const bottom = useRef<HTMLDivElement>(null);

  const line = episode.lines[index];
  const mine = line?.speaker === LEARNER;
  const myTotal = episode.lines.filter((l) => l.speaker === LEARNER).length;
  const done = index >= episode.lines.length;

  // Partner lines are spoken automatically.
  useEffect(() => {
    if (line && !mine) void speak(line.target, lang.ttsLang, settings.rate);
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (done && !rewarded.current) {
      rewarded.current = true;
      addXp(20);
      markDone(`roleplay:${episode.id}`);
    }
  }, [done, addXp, markDone, episode.id]);

  const next = () => {
    setAttempted(false);
    setHint(false);
    setIndex((i) => i + 1);
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5 flex items-center gap-3">
        <button type="button" onClick={onExit} aria-label="Beenden" className="muted text-xl hover:text-slate-900 dark:hover:text-white">
          ✕
        </button>
        <ProgressBar value={index / episode.lines.length} className="h-3.5" />
        <span className="text-2xl">{episode.icon}</span>
      </div>

      {/* Conversation so far */}
      <div className="space-y-3">
        {episode.lines.slice(0, index).map((l, i) => (
          <Bubble key={i} mine={l.speaker === LEARNER} speaker={l.speaker} target={l.target} reading={settings.showReading ? l.reading : undefined} de={l.de} />
        ))}

        {line && !mine && <Bubble mine={false} speaker={line.speaker} target={line.target} reading={settings.showReading ? line.reading : undefined} de={line.de} active />}
      </div>

      {line && !mine && (
        <button type="button" className="btn-primary mt-5 w-full py-3.5 text-base" onClick={next}>
          Weiter
        </button>
      )}

      {line && mine && (
        <div className="card mt-4 animate-fade-in p-5">
          <div className="muted text-xs font-bold uppercase tracking-wide">Du bist dran – sag auf Chinesisch:</div>
          <div className="mt-1 text-lg font-bold">{line.de}</div>

          {(hint || attempted) && (
            <div className="mt-3 flex items-start gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
              <SpeakButton text={line.target} size="sm" />
              <div>
                {attempted && <div className="hanzi text-lg">{line.target}</div>}
                <div className="text-sm text-brand-700 dark:text-brand-300">{line.reading}</div>
              </div>
            </div>
          )}

          <div className="mt-5">
            <SpeakCheck
              key={index}
              target={line.target}
              onResult={(score) => {
                if (!attempted && score >= PASS_SCORE) {
                  setGood((g) => g + 1);
                  addXp(10);
                }
                setAttempted(true);
              }}
            />
          </div>

          <div className="mt-5 flex flex-wrap justify-between gap-3">
            {!hint && !attempted ? (
              <button type="button" className="btn-ghost" onClick={() => setHint(true)}>
                💡 Tipp ({lang.readingName})
              </button>
            ) : (
              <span />
            )}
            <button type="button" className={attempted ? "btn-primary" : "btn-ghost"} onClick={next}>
              {attempted ? "Weiter" : "Überspringen"}
            </button>
          </div>
        </div>
      )}

      {done && (
        <div className="card mt-5 p-8 text-center">
          <Confetti count={40} />
          <p className="text-6xl">🎭</p>
          <h2 className="mt-4 text-2xl font-extrabold">Rollenspiel geschafft!</h2>
          <p className="muted mt-1">
            {good} von {myTotal} Sätzen gut getroffen · +20 XP
          </p>
          <button type="button" className="btn-primary mt-6" onClick={onExit}>
            Fertig
          </button>
        </div>
      )}
      <div ref={bottom} className="h-4" />
    </div>
  );
}

function Bubble({
  mine,
  speaker,
  target,
  reading,
  de,
  active,
}: {
  mine: boolean;
  speaker: string;
  target: string;
  reading?: string;
  de: string;
  active?: boolean;
}) {
  return (
    <div className={cx("flex", mine ? "justify-end" : "justify-start")}>
      <div
        className={cx(
          "max-w-[85%] rounded-2xl px-4 py-3",
          mine
            ? "rounded-br-md bg-brand-600 text-white"
            : "rounded-bl-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900",
          active && "animate-fade-in ring-2 ring-brand-400",
        )}
      >
        <div className={cx("text-xs font-bold", mine ? "text-brand-100" : "muted")}>{speaker}</div>
        <div className="flex items-start gap-2">
          <div className="min-w-0">
            <div className="hanzi text-lg">{target}</div>
            {reading && <div className={cx("text-sm", mine ? "text-brand-100" : "text-brand-700 dark:text-brand-300")}>{reading}</div>}
            <div className={cx("text-sm", mine ? "text-brand-100" : "muted")}>{de}</div>
          </div>
          {!mine && <SpeakButton text={target} size="sm" />}
        </div>
      </div>
    </div>
  );
}
