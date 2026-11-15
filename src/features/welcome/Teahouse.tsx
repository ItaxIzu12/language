import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpeakCheck from "../../components/SpeakCheck";
import { SpeakButton } from "../../components/ui";
import lesson from "../../data/zh/teahouse.json";
import { useStore } from "../../lib/store";
import { stopSpeaking, ttsSupported } from "../../lib/tts";
import type { Example } from "../../types";

function Line({ line }: { line: Example }) {
  return <div className="my-4 border-l-2 border-cinnabar pl-4">
    <div className="flex items-center gap-4">
      <p className="hanzi text-3xl" lang="zh">{line.target}</p>
      {ttsSupported() && <SpeakButton text={line.target}/>}
    </div>
    <details className="mt-2"><summary>Pinyin und Übersetzung</summary>
      <p className="reading">{line.reading}</p><p>{line.de}</p>
    </details>
  </div>;
}

export default function Teahouse() {
  const { lang, username, customWords, progress, addCustomWord } = useStore();
  const [step, advance] = useState<"listen" | "order" | "done">("listen");
  const [attempted, setAttempted] = useState(false);
  useEffect(() => () => stopSpeaking(), [step]);
  const tea = lang.vocab.find(word => word.id === lesson.teaId);
  const saved = customWords.find(word => word.target === lesson.phrase.target && word.reading === lesson.phrase.reading);
  const due = saved && progress.cards[saved.id]?.due;

  return <article className="max-w-2xl">
    <Link to="/sprachen/zh" className="underline">← Zum Mandarin-Kurs</Link>
    <header className="mh-section-title my-6"><h1 className="title">Im Teehaus bestellen</h1></header>
    {step === "listen" && <>
      <h2 className="text-xl font-bold">Was möchtest du trinken?</h2>
      {tea && <p className="my-3"><span className="hanzi text-2xl" lang="zh">{tea.target}</span> · {tea.reading} · {tea.de}</p>}
      <p>Die Bedienung fragt dich nach deinem Getränk. Lies die Frage oder höre sie dir an.</p>
      <Line line={lesson.question}/>
      <button className="btn-ink" onClick={() => advance("order")}>Eine Tasse Tee bestellen</button>
    </>}
    {step === "order" && <>
      <h2 className="text-xl font-bold">Jetzt bestellst du</h2>
      <p className="mt-2">Höre dir die Bestellung an und sprich sie anschließend selbst.</p>
      <Line line={lesson.order}/>
      <SpeakCheck target={lesson.order.target} onResult={() => setAttempted(true)}/>
      <button className="btn-ink mt-5" onClick={() => advance("done")}>
        {attempted ? "Zum Fundstück" : "Ohne Mikrofon weiter"}
      </button>
    </>}
    {step === "done" && <>
      <h2 className="text-xl font-bold">Dein Fundstück aus dem Teehaus</h2>
      <Line line={lesson.phrase}/>
      <p>Merke dir den Ausdruck zusammen mit deiner Bestellung. So kannst du ihn später mit den Karten wiederholen.</p>
      {due ? <p role="status" className="my-4 font-semibold">Gespeichert · Nächste Wiederholung am {new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(due + "T12:00:00"))}.</p> :
        <button className="btn-ink my-4" onClick={() => addCustomWord({
          ...lesson.phrase, example: lesson.order, level: "A1", pos: "phrase",
        }, true)}>{saved ? "Zur Wiederholung einplanen" : "Als Fundstück merken"}</button>}
      {!username && <p className="text-sm text-dim">Als Gast speicherst du in diesem Browser.</p>}
      <div className="mt-6 flex flex-wrap gap-4"><Link className="btn-line" to="/heute">Zur Startseite</Link>
        {saved && <Link className="btn-line" to="/notebook">Fundstücke öffnen</Link>}
      </div>
    </>}
  </article>;
}
