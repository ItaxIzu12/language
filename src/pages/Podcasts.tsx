import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { LevelBadge, PageHeader } from "../components/ui";
import { useStore } from "../lib/store";
import { speak, stopSpeaking } from "../lib/tts";
import { cx } from "../lib/utils";
import type { Episode } from "../types";

export default function Podcasts() {
  const { lang } = useStore();
  const [episode, setEpisode] = useState<Episode | null>(null);

  if (episode) return <Player episode={episode} onBack={() => setEpisode(null)} />;

  return (
    <div>
      <PageHeader
        title="Podcast"
        subtitle="Mini-Episoden mit Transkript direkt in der App – plus Empfehlungen für echte Podcasts."
      />

      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">LinguaFlow-Episoden</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {lang.episodes.map((ep, i) => (
          <button
            key={ep.id}
            type="button"
            onClick={() => setEpisode(ep)}
            className="card group flex items-start gap-4 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-2xl shadow-soft">
              {ep.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="muted text-xs font-bold">Episode {i + 1}</div>
              <div className="hanzi text-lg font-medium">{ep.title}</div>
              <div className="font-semibold">{ep.titleDe}</div>
              <p className="muted mt-1 text-sm">{ep.description}</p>
              <div className="mt-2 flex items-center gap-2">
                <LevelBadge level={ep.level} />
                <span className="muted text-xs">{ep.lines.length} Sätze</span>
              </div>
            </div>
            <span className="text-2xl text-brand-600 transition group-hover:scale-125">▶</span>
          </button>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Empfohlene Podcasts (extern)
      </h2>
      <div className="card divide-y divide-slate-100 dark:divide-slate-800">
        {lang.podcasts.map((p) => (
          <a
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <span className="text-2xl">📻</span>
            <div className="min-w-0 flex-1">
              <div className="font-bold">{p.title}</div>
              <div className="muted text-sm">{p.description}</div>
            </div>
            <span className="chip bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{p.level}</span>
            <span className="muted">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function Player({ episode, onBack }: { episode: Episode; onBack: () => void }) {
  const { lang, settings, addXp } = useStore();
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
    speak(line.target, lang.ttsLang, slow ? 0.6 : settings.rate).then(() => {
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

  return (
    <div className="mx-auto max-w-2xl">
      <button type="button" onClick={onBack} className="muted mb-3 text-sm font-semibold hover:text-brand-600">
        ← Alle Episoden
      </button>

      <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-900 p-6 text-white shadow-soft">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-3xl">{episode.icon}</div>
          <div>
            <div className="hanzi text-2xl font-medium">{episode.title}</div>
            <div className="font-semibold text-brand-100">{episode.titleDe}</div>
          </div>
        </div>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${((index + (finished ? 1 : 0)) / episode.lines.length) * 100}%` }}
          />
        </div>
        <div className="mt-5 flex items-center justify-center gap-5">
          <button type="button" aria-label="Vorheriger Satz" onClick={() => jump(index - 1)} className="text-2xl transition hover:scale-110">
            ⏮
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause" : "Abspielen"}
            onClick={toggle}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-brand-700 shadow-soft transition active:scale-95"
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button type="button" aria-label="Nächster Satz" onClick={() => jump(index + 1)} className="text-2xl transition hover:scale-110">
            ⏭
          </button>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm font-semibold">
          <Toggle on={slow} onClick={() => setSlow((s) => !s)}>
            🐢 Langsam
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
        <div className="animate-fade-in mt-4 rounded-2xl bg-emerald-50 p-4 text-center font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
          🎉 Episode gehört! +15 XP – Tipp: Jetzt nochmal ohne Übersetzung hören.
        </div>
      )}

      <ol className="mt-5 space-y-2">
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
              className={cx(
                "w-full rounded-2xl border-2 p-4 text-left transition",
                i === index && (playing || finished || index > 0)
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30"
                  : "border-transparent bg-white hover:border-slate-200 dark:bg-slate-900 dark:hover:border-slate-700",
              )}
            >
              <div className="muted text-xs font-bold">{line.speaker}</div>
              <div className="hanzi mt-0.5 text-lg">{line.target}</div>
              {showReading && <div className="text-sm text-brand-700 dark:text-brand-300">{line.reading}</div>}
              {showDe && <div className="muted text-sm">{line.de}</div>}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cx("rounded-full px-3.5 py-1.5 transition", on ? "bg-white text-brand-700" : "bg-white/15 text-white hover:bg-white/25")}
    >
      {children}
    </button>
  );
}
