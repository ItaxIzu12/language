import { ArrowRight, Check, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import RolePlay, { LEARNER } from "../../shared/learning/RolePlay";
import SpeakCheck, { PASS_SCORE } from "../../shared/learning/SpeakCheck";
import { Glyph, ICON, LevelTag, PageHeader, Segmented, SpeakButton } from "../../shared/ui/ui";
import { useStore } from "../../state/learningStore";
import { shuffle } from "../../shared/lib/utils";
import type { Episode } from "../../languages/types";
import { VoiceNotice } from "../listening/Listen";

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
  const { lang, progress, settings, addXp, logActivity } = useStore();
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
  const reward = mode === "translate" ? 15 : 10;

  const next = () => {
    setRevealed(false);
    setRewarded(false);
    setIndex((i) => i + 1);
  };

  return (
    <div>
      <PageHeader title="Sprechtraining" subtitle="Nachsprechen, frei übersetzen oder im Rollenspiel antworten." />
      <VoiceNotice />

      <div className="mb-8">
        <Segmented<Mode>
          label="Übungsart"
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
            { value: "translate", label: `Sag es auf ${lang.name}` },
            { value: "roleplay", label: "Rollenspiel" },
          ]}
        />
      </div>

      {mode === "roleplay" ? (
        <ul className="rows max-w-3xl border-y border-rule">
          {lang.episodes
            .filter((ep) => ep.lines.some((l) => l.speaker === LEARNER))
            .map((ep) => (
              <li key={ep.id}>
                <button
                  type="button"
                  onClick={() => setEpisode(ep)}
                  className="group flex w-full items-center gap-4 py-4 text-left"
                >
                  <Glyph char={ep.glyph} tone={progress.done[`roleplay:${ep.id}`] ? "red" : "ink"} />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-3">
                      <span className="hanzi text-lg font-bold">{ep.title}</span>
                      <span className="font-semibold">{ep.titleDe}</span>
                    </span>
                    <span className="block text-sm text-dim">{ep.description}</span>
                    <span className="mt-1 flex items-center gap-2 text-sm text-dim">
                      <LevelTag level={ep.level} />
                      {ep.lines.filter((l) => l.speaker === LEARNER).length} Sätze für dich
                      {progress.done[`roleplay:${ep.id}`] && (
                        <span className="inline-flex items-center gap-1 text-jade">
                          <Check size={14} strokeWidth={2.5} aria-hidden /> gespielt
                        </span>
                      )}
                    </span>
                  </span>
                  <ArrowRight
                    {...ICON}
                    aria-hidden
                    className="shrink-0 text-dim transition-transform group-hover:translate-x-1"
                  />
                </button>
              </li>
            ))}
        </ul>
      ) : (
        prompt && (
          <div className="max-w-2xl">
            <div key={`${mode}-${index}`} className="animate-enter border-y-2 border-ink py-6">
              {mode === "translate" && (
                <>
                  <h2 className="text-sm font-semibold text-dim">Sag auf {lang.name}:</h2>
                  <p className="mt-1 text-3xl font-bold">{prompt.de}</p>
                </>
              )}
              {hidden ? (
                <button type="button" className="btn-line mt-4" onClick={() => setRevealed(true)}>
                  <Eye {...ICON} aria-hidden /> Lösung zeigen
                </button>
              ) : (
                <div className={mode === "translate" ? "mt-4 animate-enter bg-wash p-4" : ""}>
                  <div className="hanzi text-5xl font-black leading-tight sm:text-6xl">{prompt.target}</div>
                  {settings.showReading && <div className="reading mt-2 text-xl font-semibold">{prompt.reading}</div>}
                  {mode !== "translate" && <div className="mt-1 text-lg text-dim">{prompt.de}</div>}
                  <div className="mt-4 flex gap-2">
                    <SpeakButton text={prompt.target} />
                    <SpeakButton text={prompt.target} slow />
                  </div>
                </div>
              )}
            </div>

            <div className="py-6">
              <SpeakCheck
                key={`${mode}-${index}`}
                target={prompt.target}
                onResult={(score) => {
                  if (mode === "translate") setRevealed(true);
                  if (score >= PASS_SCORE && !rewarded) {
                    setRewarded(true);
                    addXp(reward);
                    logActivity("apply");
                  }
                }}
              />
              {rewarded && <p className="mt-3 text-sm font-bold text-jade">+{reward} XP</p>}
            </div>

            <button type="button" className="btn-ink w-full" onClick={next}>
              Nächstes <ArrowRight {...ICON} aria-hidden />
            </button>
          </div>
        )
      )}
    </div>
  );
}
