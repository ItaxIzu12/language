import { Lightbulb } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../../state/learningStore";
import { speak } from "../audio/tts";
import { cx } from "../lib/utils";
import type { Episode } from "../../languages/types";
import { RoundBar, RoundEnd } from "./Round";
import SpeakCheck, { PASS_SCORE } from "./SpeakCheck";
import { ICON, SpeakButton } from "../ui/ui";

/** The learner's role in every dialogue. */
export const LEARNER = "我";

/**
 * Role play: the app speaks the partner's lines, the learner answers aloud
 * (guided by a German cue) and gets feedback, line by line.
 */
export default function RolePlay({ episode, onExit }: { episode: Episode; onExit: () => void }) {
  const { lang, settings, addXp, markDone, logActivity } = useStore();
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
      logActivity("apply");
      markDone(`roleplay:${episode.id}`);
    }
  }, [done, addXp, logActivity, markDone, episode.id]);

  const next = () => {
    setAttempted(false);
    setHint(false);
    setIndex((i) => i + 1);
  };

  if (done) {
    return (
      <RoundEnd
        score={good}
        total={myTotal}
        perfect={good === myTotal}
        line={`Sätze im Rollenspiel „${episode.titleDe}“ gut getroffen. +20 XP`}
        onExit={onExit}
        exitLabel="Zurück zur Auswahl"
      />
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <RoundBar
        onExit={onExit}
        value={index / episode.lines.length}
        right={<span className="hanzi text-base text-ink">{episode.title}</span>}
      />

      {/* Conversation so far: a ruled transcript, own lines indented */}
      <ol className="rows border-y border-rule">
        {episode.lines.slice(0, index + (mine ? 0 : 1)).map((l, i) => {
          const own = l.speaker === LEARNER;
          const current = i === index;
          return (
            <li key={i} className={cx("flex items-start gap-3 py-3", own && "pl-8", current && "animate-enter")}>
              <span className={cx("hanzi mt-0.5 w-10 shrink-0 text-sm font-bold", own ? "text-cinnabar" : "text-dim")}>
                {l.speaker}
              </span>
              <p className="min-w-0 flex-1">
                <span className="hanzi block text-lg font-medium">{l.target}</span>
                {settings.showReading && <span className="reading block text-sm">{l.reading}</span>}
                <span className="block text-sm text-dim">{l.de}</span>
              </p>
              {!own && <SpeakButton text={l.target} size="sm" />}
            </li>
          );
        })}
      </ol>

      {!mine && (
        <button type="button" className="btn-ink mt-6 w-full" onClick={next}>
          Weiter
        </button>
      )}

      {mine && (
        <div className="mt-6 animate-enter border-t-2 border-ink pt-5">
          <h2 className="font-bold">Du bist dran. Sag auf {lang.name}:</h2>
          <p className="mt-1 text-2xl font-bold">{line.de}</p>

          {(hint || attempted) && (
            <div className="mt-4 flex items-start gap-3 bg-wash p-3">
              <SpeakButton text={line.target} size="sm" />
              <p className="min-w-0">
                {attempted && <span className="hanzi block text-lg font-medium">{line.target}</span>}
                <span className="reading block text-sm">{line.reading}</span>
              </p>
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

          <div className="mt-6 flex flex-wrap justify-between gap-3">
            {!hint && !attempted ? (
              <button type="button" className="btn-line" onClick={() => setHint(true)}>
                <Lightbulb {...ICON} aria-hidden /> {lang.readingName} als Hilfe
              </button>
            ) : (
              <span />
            )}
            <button type="button" className={attempted ? "btn-ink" : "btn-quiet"} onClick={next}>
              {attempted ? "Weiter" : "Überspringen"}
            </button>
          </div>
        </div>
      )}
      <div ref={bottom} className="h-4" />
    </div>
  );
}
