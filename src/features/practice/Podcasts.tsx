import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Glyph, ICON, LevelTag, PageHeader } from "../../components/ui";
import { useStore } from "../../lib/store";
import { speak, stopSpeaking } from "../../lib/tts";
import { cx } from "../../lib/utils";
import type { Episode } from "../../types";
import { VoiceNotice } from "./Listen";
import { Toggle } from "./Read";

export default function Podcasts() {
  const { lang } = useStore();
  const [episode, setEpisode] = useState<Episode | null>(null);

  if (episode) return <Player key={episode.id} episode={episode} onBack={() => setEpisode(null)} />;

  return (
    <div className="max-w-3xl">
      <PageHeader title="Hördialoge" subtitle="Dialoge zum Mithören. Das Transkript läuft mit, Pinyin und Übersetzung lassen sich ausblenden." />
      <VoiceNotice />

      <ol className="rows border-y border-rule">
        {lang.episodes.map((ep, i) => (
          <li key={ep.id}>
            <button type="button" onClick={() => setEpisode(ep)} className="group flex w-full items-center gap-4 py-4 text-left">
              <span className="w-8 shrink-0 text-center font-display text-3xl font-extrabold leading-none text-dim">{i + 1}</span>
              <Glyph char={ep.glyph} />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="hanzi text-lg font-bold">{ep.title}</span>
                  <span className="font-semibold">{ep.titleDe}</span>
                </span>
                <span className="block text-sm text-dim">{ep.description}</span>
                <span className="mt-1 flex items-center gap-2 text-sm text-dim">
                  <LevelTag level={ep.level} /> {ep.lines.length} Sätze
                </span>
              </span>
              <ArrowRight {...ICON} aria-hidden className="shrink-0 text-dim transition-transform group-hover:translate-x-1" />
            </button>
          </li>
        ))}
      </ol>

      <h2 className="mb-1 mt-12 border-b-2 border-ink pb-2 text-lg font-bold">Echte Podcasts zum Weiterhören</h2>
      <p className="mb-2 text-sm text-dim">Externe Seiten. Die Adressen können sich ändern.</p>
      <ul className="rows border-b border-rule">
        {lang.podcasts.map((p) => (
          <li key={p.url}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-3">
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{p.title}</span>
                <span className="block text-sm text-dim">{p.description}</span>
              </span>
              <span className="tag shrink-0 text-dim">{p.level}</span>
              <ArrowUpRight {...ICON} aria-label="öffnet in neuem Tab" className="shrink-0 text-dim" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Player({ episode, onBack }: { episode: Episode; onBack: () => void }) {
  const { lang, settings, addXp, logActivity } = useStore();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [slow, setSlow] = useState(false);
  const [showReading, setShowReading] = useState(settings.showReading);
  const [showDe, setShowDe] = useState(true);
  const [finished, setFinished] = useState(false);
  const token = useRef(0);
  const rewarded = useRef(false);
  const lineRefs = useRef<Array<HTMLLIElement | null>>([]);

  // Play the current line, then advance automatically while "playing".
  useEffect(() => {
    if (!playing) return;
    const my = ++token.current;
    const line = episode.lines[index];
    lineRefs.current[index]?.scrollIntoView({ block: "center", behavior: "smooth" });
    void speak(line.target, lang.ttsLang, slow ? 0.6 : settings.rate).then(() => {
      if (token.current !== my) return; // paused, skipped or left the page
      setTimeout(() => {
        if (token.current !== my) return;
        if (index + 1 < episode.lines.length) {
          setIndex(index + 1);
        } else {
          setPlaying(false);
          setFinished(true);
          if (!rewarded.current) {
            rewarded.current = true;
            addXp(15);
            logActivity("apply");
          }
        }
      }, 450);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index, slow]);

  const halt = () => {
    token.current++;
    stopSpeaking();
  };

  useEffect(() => halt, []);

  const jump = (i: number) => {
    halt();
    setFinished(false);
    setIndex(Math.max(0, Math.min(episode.lines.length - 1, i)));
    setPlaying(true);
  };

  const toggle = () => {
    if (playing) {
      halt();
      setPlaying(false);
    } else {
      if (finished) setIndex(0);
      setFinished(false);
      setPlaying(true);
    }
  };

  const started = playing || finished || index > 0;

  return (
    <div className="mx-auto max-w-2xl">
      <button type="button" onClick={onBack} className="mb-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-dim hover:text-ink">
        <ArrowLeft {...ICON} aria-hidden /> Alle Episoden
      </button>

      {/* Player: sticks below the app header while the transcript scrolls */}
      <div className="sticky top-[58px] z-10 -mx-4 border-b-2 border-ink bg-paper px-4 pb-4 pt-1 sm:mx-0 sm:px-0">
        <h1 className="flex flex-wrap items-baseline gap-x-3">
          <span className="hanzi text-3xl font-black">{episode.title}</span>
          <span className="text-dim">{episode.titleDe}</span>
        </h1>
        <div className="mt-3 h-1.5 bg-wash" role="progressbar" aria-valuemin={0} aria-valuemax={episode.lines.length} aria-valuenow={index + (finished ? 1 : 0)}>
          <div
            className="h-full origin-left bg-cinnabar transition-transform duration-500"
            style={{ transform: `scaleX(${(index + (finished ? 1 : 0)) / episode.lines.length})` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button type="button" aria-label="Vorheriger Satz" onClick={() => jump(index - 1)} className="btn-line w-11 px-0">
            <SkipBack {...ICON} aria-hidden />
          </button>
          <button type="button" onClick={toggle} className="btn-ink min-w-[8.5rem]">
            {playing ? <Pause {...ICON} aria-hidden /> : <Play {...ICON} aria-hidden />}
            {playing ? "Anhalten" : finished ? "Nochmal" : "Abspielen"}
          </button>
          <button type="button" aria-label="Nächster Satz" onClick={() => jump(index + 1)} className="btn-line w-11 px-0">
            <SkipForward {...ICON} aria-hidden />
          </button>
          <span className="mx-1 hidden h-6 w-px bg-rule sm:block" aria-hidden />
          <Toggle on={slow} onClick={() => setSlow((s) => !s)}>
            Langsam
          </Toggle>
          <Toggle on={showReading} onClick={() => setShowReading((s) => !s)}>
            {lang.readingName}
          </Toggle>
          <Toggle on={showDe} onClick={() => setShowDe((s) => !s)}>
            Übersetzung
          </Toggle>
        </div>
      </div>

      {finished && (
        <p role="status" className="animate-enter border-b border-rule py-4 font-semibold text-jade">
          Episode gehört. +15 XP – hör sie jetzt noch einmal ohne Übersetzung.
        </p>
      )}

      <ol className="rows">
        {episode.lines.map((line, i) => (
          <li
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
          >
            <button
              type="button"
              onClick={() => jump(i)}
              aria-current={started && i === index ? "true" : undefined}
              className={cx("flex w-full items-start gap-3 py-3.5 pl-3 text-left transition-colors", started && i === index ? "bg-wash" : "hover:bg-wash/60")}
            >
              <span className={cx("hanzi mt-1 w-10 shrink-0 text-sm font-bold", started && i === index ? "text-cinnabar" : "text-dim")}>
                {line.speaker}
              </span>
              <span className="min-w-0">
                <span className="hanzi block text-xl font-medium">{line.target}</span>
                {showReading && <span className="reading block text-sm">{line.reading}</span>}
                {showDe && <span className="block text-sm text-dim">{line.de}</span>}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
