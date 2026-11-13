import { useMemo, useState } from "react";
import RolePlay, { LEARNER } from "../components/RolePlay";
import SpeakCheck, { PASS_SCORE } from "../components/SpeakCheck";
import { LevelBadge, PageHeader, Segmented, SpeakButton } from "../components/ui";
import { useStore } from "../lib/store";
import { shuffle } from "../lib/utils";
import type { Episode } from "../types";

interface Prompt {
  id: string;
  target: string;
  reading: string;
  de: string;
}

type Mode = "words" | "sentences" | "translate" | "roleplay";

/**
 * Speaking practice in four modes:
 *  - repeat words / sentences after the voice
 *  - translate: only the German cue is shown, say it in the target language
 *  - role play: take a part in a dialogue
 */
export default function Speak() {
  const { lang, progress, addXp } = useStore();
  const [mode, setMode] = useState<Mode>("words");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [rewarded, setRewarded] = useState(false);
  const [episode, setEpisode] = useState<Episode | null>(null);

  const prompts = useMemo<Prompt[]>(() => {
    if (mode === "sentences" || mode === "translate") {
      const examples = lang.vocab
        .filter((w) => w.example && (w.level === "A1" || w.level === "A2" || progress.cards[w.id]))
        .map((w) => ({ id: `ex:${w.id}`, ...w.example! }));
      const all = [...lang.listening, ...examples].filter((s) => s.target.length <= 14 && !/[A-Za-z]/.test(s.target));
      return shuffle(all).slice(0, 60);
    }
    // Prefer words the learner has already started.
    const started = lang.vocab.filter((w) => progress.cards[w.id]);
    const source = started.length >= 10 ? started : lang.vocab.filter((w) => w.level === "A1");
    return shuffle(source).slice(0, 60);
    // Build the deck once per mode; progress changes must not reshuffle it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, lang]);

  if (episode) return <RolePlay episode={episode} onExit={() => setEpisode(null)} />;

  const prompt = prompts[index % Math.max(prompts.length, 1)];
  const hidden = mode === "translate" && !revealed;

  const next = () => {
    setRevealed(false);
    setRewarded(false);
    setIndex((i) => i + 1);
  };

  return (
    <div>
      <PageHeader title="Sprechen" subtitle="Nachsprechen, frei übersetzen oder im Rollenspiel antworten – mit Sofort-Feedback." />

      <div className="mb-5">
        <Segmented<Mode>
          value={mode}
          onChange={(m) => {
            setMode(m);
            setIndex(0);
            setRevealed(false);
            setRewarded(false);
          }}
          options={[
            { value: "words", label: "Wörter nachsprechen" },
            { value: "sentences", label: "Sätze nachsprechen" },
            { value: "translate", label: "Sag es auf Chinesisch" },
            { value: "roleplay", label: "🎭 Rollenspiel" },
          ]}
        />
      </div>

      {mode === "roleplay" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {lang.episodes
            .filter((ep) => ep.lines.some((l) => l.speaker === LEARNER))
            .map((ep) => (
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
                  <div className="hanzi text-lg font-medium">{ep.title}</div>
                  <div className="font-semibold">{ep.titleDe}</div>
                  <p className="muted mt-1 text-sm">{ep.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <LevelBadge level={ep.level} />
                    <span className="muted text-xs">
                      {ep.lines.filter((l) => l.speaker === LEARNER).length} Sätze für dich
                    </span>
                  </div>
                </div>
                {progress.done[`roleplay:${ep.id}`] && <span title="Schon gespielt">✅</span>}
              </button>
            ))}
        </div>
      ) : (
        prompt && (
          <div className="mx-auto max-w-xl">
            <div className="card p-6 text-center sm:p-8">
              {mode === "translate" && (
                <>
                  <div className="muted text-xs font-bold uppercase tracking-wide">Sag auf Chinesisch</div>
                  <div className="mt-1 text-2xl font-bold">{prompt.de}</div>
                </>
              )}
              {hidden ? (
                <button type="button" className="btn-ghost mt-4" onClick={() => setRevealed(true)}>
                  👀 Lösung zeigen
                </button>
              ) : (
                <div className={mode === "translate" ? "animate-fade-in mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60" : ""}>
                  <div className="hanzi text-4xl font-medium leading-tight sm:text-5xl">{prompt.target}</div>
                  <div className="mt-3 text-lg font-semibold text-brand-700 dark:text-brand-300">{prompt.reading}</div>
                  {mode !== "translate" && <div className="muted mt-1">{prompt.de}</div>}
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <SpeakButton text={prompt.target} size="lg" />
                    <SpeakButton text={prompt.target} size="lg" slow />
                  </div>
                </div>
              )}

              <div className="mt-6">
                <SpeakCheck
                  key={`${mode}-${index}`}
                  target={prompt.target}
                  onResult={(score) => {
                    if (mode === "translate") setRevealed(true);
                    if (score >= PASS_SCORE && !rewarded) {
                      setRewarded(true);
                      addXp(mode === "translate" ? 15 : 10);
                    }
                  }}
                />
              </div>
              {rewarded && (
                <p className="mt-3 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  +{mode === "translate" ? 15 : 10} XP
                </p>
              )}
            </div>

            <button type="button" className="btn-primary mt-5 w-full py-3.5 text-base" onClick={next}>
              Nächstes →
            </button>
          </div>
        )
      )}
    </div>
  );
}
