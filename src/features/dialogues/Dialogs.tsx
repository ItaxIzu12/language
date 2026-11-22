import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { PageHeader, SpeakButton } from "../../shared/ui/ui";
import SpeakCheck from "../../shared/learning/SpeakCheck";
import { useStore } from "../../state/learningStore";
import { getScenarios, scenarioKey } from "./scenarios";
import type { Scenario } from "./scenarios";

export default function Dialogs() {
  const { lang, progress } = useStore();
  const scenarios = getScenarios(lang.code);
  return (
    <div>
      <PageHeader title="Dialoge im Alltag" subtitle="Hören, antworten und einen Ausdruck für später mitnehmen." />
      <ol className="study-scene-list">
        {scenarios.map((scene) => (
          <li key={scene.id}>
            <div>
              <h2 className="text-xl font-bold">{scene.title}</h2>
              <p className="my-2">{scene.goal} · etwa 3 Minuten</p>
              {progress.done[scenarioKey(lang.code, scene.id)] && <small>Abschlussaufgabe gelöst</small>}
            </div>
            <Link className="btn-line" to={`/dialoge/${scene.id}`}>
              {progress.done[scenarioKey(lang.code, scene.id)] ? "Erneut üben" : "Szene starten"}
            </Link>
          </li>
        ))}
      </ol>
      {!scenarios.length && <p>Für diese Sprache sind noch keine Alltagsszenen verfügbar.</p>}
    </div>
  );
}

export function DialogScene() {
  const { sceneId } = useParams();
  const { lang } = useStore();
  const scene = getScenarios(lang.code).find((item) => item.id === sceneId);
  return scene ? <Scene key={lang.code + scene.id} scene={scene} /> : <Navigate to="/dialoge" replace />;
}

function Scene({ scene }: { scene: Scenario }) {
  const { lang, progress, markDone, logActivity, addXp, addCustomWord, customWords, username } = useStore();
  const [step, setStep] = useState<"listen" | "answer" | "check" | "done">("listen");
  const [feedback, setFeedback] = useState("");
  const key = scenarioKey(lang.code, scene.id);
  const saved = customWords.some(
    (word) => word.target === scene.phrase.target && word.reading === scene.phrase.reading,
  );
  const next = getScenarios(lang.code)[getScenarios(lang.code).findIndex((item) => item.id === scene.id) + 1];
  function check(index: number) {
    if (index !== scene.correct) {
      setFeedback("Diese Antwort passt noch nicht. Lies die Situation und versuche es erneut.");
      return;
    }
    if (!progress.done[key]) {
      markDone(key);
      logActivity("apply");
      addXp(20);
    }
    setStep("done");
  }
  return (
    <article className="mx-auto max-w-2xl">
      <Link to="/dialoge" className="underline">
        ← Alle Dialoge
      </Link>
      <PageHeader title={scene.title} subtitle={scene.goal} />
      <ol className="study-scene-steps" aria-label="Ablauf der Szene">
        {(
          [
            ["listen", "1 · Verstehen"],
            ["answer", "2 · Antworten"],
            ["check", "3 · Anwenden"],
            ["done", "4 · Abschluss"],
          ] as const
        ).map(([id, label]) => (
          <li key={id} aria-current={step === id ? "step" : undefined}>
            {label}
          </li>
        ))}
      </ol>
      {step === "listen" && (
        <>
          <h2 className="text-xl font-bold">Höre die Frage oder lies mit</h2>
          <p lang={lang.code} className="hanzi my-4 text-3xl">
            {scene.question.target}
          </p>
          <p>{scene.question.reading}</p>
          <p className="my-3">{scene.question.de}</p>
          <SpeakButton text={scene.question.target} />
          <button className="btn-ink ml-3" onClick={() => setStep("answer")}>
            Meine Antwort üben
          </button>
        </>
      )}
      {step === "answer" && (
        <>
          <p>{scene.prompt}</p>
          <p lang={lang.code} className="hanzi my-4 text-3xl">
            {scene.answer.target}
          </p>
          <p>{scene.answer.reading}</p>
          <p className="my-3">{scene.answer.de}</p>
          <SpeakButton text={scene.answer.target} />
          <div className="my-5">
            <SpeakCheck
              target={scene.answer.target}
              onResult={() => setFeedback("Du kannst deine Antwort jetzt in der Abschlussaufgabe prüfen.")}
            />
          </div>
          <aside className="study-culture-note">
            <strong>Im Gespräch</strong>
            <p>{scene.note}</p>
          </aside>
          <p role="status">{feedback}</p>
          <button
            className="btn-ink"
            onClick={() => {
              setFeedback("");
              setStep("check");
            }}
          >
            Zur Abschlussaufgabe – auch ohne Mikrofon
          </button>
        </>
      )}
      {step === "check" && (
        <>
          <h2 className="text-xl font-bold">Welche Antwort passt?</h2>
          <p className="my-3">{scene.prompt}</p>
          <p lang={lang.code} className="hanzi mb-4 text-xl">
            {scene.question.target}
          </p>
          <div className="grid gap-3">
            {scene.choices.map((choice, index) => (
              <button className="btn-line justify-start" key={choice} onClick={() => check(index)}>
                {choice}
              </button>
            ))}
          </div>
          <p role="status" className="my-3">
            {feedback}
          </p>
        </>
      )}
      {step === "done" && (
        <>
          <h2 className="text-xl font-bold">Abschlussaufgabe gelöst</h2>
          <p className="my-3">Du hast die passende Antwort ausgewählt. Übe die Szene später noch einmal laut.</p>
          <p lang={lang.code} className="hanzi text-2xl">
            {scene.phrase.target}
          </p>
          <p>
            {scene.phrase.reading} · {scene.phrase.de}
          </p>
          <button
            className="btn-line my-4"
            disabled={saved}
            onClick={() =>
              addCustomWord(
                {
                  ...scene.phrase,
                  example: scene.answer,
                  level: "A1",
                  pos: "phrase",
                  note: scene.title,
                },
                true,
              )
            }
          >
            {saved ? "In deinen Fundstücken" : "Als Fundstück merken und wiederholen"}
          </button>
          <div className="flex flex-wrap gap-3">
            {next && (
              <Link className="btn-ink" to={`/dialoge/${next.id}`}>
                Weiter: {next.title}
              </Link>
            )}
            <Link className="btn-line" to="/notebook">
              Meine Fundstücke
            </Link>
            {!username && (
              <Link className="btn-ink" to="/anmelden?mode=register">
                Lernstand im Konto behalten
              </Link>
            )}
          </div>
        </>
      )}
    </article>
  );
}
