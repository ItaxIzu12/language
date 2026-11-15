import { ArrowRight, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { languages, upcomingLanguages } from "../../data/languages";
import { useStore } from "../../lib/store";

export default function CoursePicker() {
  const { lang, username, sync, updateSettings } = useStore();
  const navigate = useNavigate();
  function choose(code: string) {
    if (code !== lang.code) {
      updateSettings({ lang: code });
      if (username) return;
    }
    navigate("/heute");
  }
  return <div className="lf-landing"><header className="lf-top"><div className="lf-inner lf-bar">
    <Link className="lf-logo" to="/"><BookOpen aria-hidden/>LinguaFlow</Link>
  </div></header><main className="course-picker">
    <h1>Welche Sprache möchtest du lernen?</h1>
    <p>{username ? "Dein Lernstand wird für jeden Kurs in deinem Konto gespeichert." : "Als Gast speicherst du deinen Lernstand in diesem Browser."}</p>
    {languages.filter(l => l.available).map(l => <button key={l.code} className="pick-course" disabled={sync.pending && l.code !== lang.code} onClick={() => choose(l.code)}>
      <span lang={l.code}>{l.nativeName}</span><strong>{l.name}</strong><ArrowRight size={20}/>
    </button>)}
    {sync.pending && <p role="status">{sync.status} <Link to="/settings">Zum Lernkonto</Link></p>}
    <p className="course-planned">In Vorbereitung: {upcomingLanguages.filter(p => !languages.some(l => l.available && l.code === p.code)).map(l => l.name).join(", ")}</p>
  </main></div>;
}
