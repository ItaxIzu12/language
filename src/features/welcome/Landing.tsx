import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Check, ChevronRight, Globe, Grid2X2, Headphones, Layers, MessageCircle, Mic, NotebookPen } from "lucide-react";
import { languages, upcomingLanguages } from "../../data/languages";
import "./landing.css";

const features = [
  { icon: Layers, title: "Vokabeltrainer", detail: "Wörter gezielt wiederholen" },
  { icon: BookOpen, title: "Lesetexte", detail: "Sprache im Kontext verstehen" },
  { icon: MessageCircle, title: "Dialoge", detail: "Alltagssituationen üben" },
  { icon: Mic, title: "Sprechtraining", detail: "Aussprache verbessern" },
  { icon: Headphones, title: "Hörtraining", detail: "Gesprochene Sprache verstehen" },
];
const art = import.meta.env.BASE_URL + "landing/";
export default function Landing() {
  const available = languages.filter(language => language.available);
  const planned = upcomingLanguages.filter(language => !available.some(course => course.code === language.code));
  return <div className="lf-landing">
    <header className="lf-top"><div className="lf-inner lf-bar">
      <Link className="lf-logo" to="/"><BookOpen aria-hidden/>LinguaFlow</Link>
      <Link className="lf-primary" to="/anmelden">Kostenlos starten</Link>
    </div></header>
    <main>
      <section className="lf-hero" aria-labelledby="lf-title">
        <img className="lf-hero-art" src={art+"welt.webp"} alt="" fetchPriority="high"/>
        <div className="lf-inner lf-copy">
          <p className="lf-eyebrow">Sprachen · Kultur · Verständnis</p>
          <h1 id="lf-title">Sprachen lernen,<br/><em>Kulturen erleben.</em></h1>
          <p className="lf-intro">Lerne die Wörter, mit denen ein Gespräch beginnt. Entdecke, wie Menschen sprechen und was ihren Alltag prägt.</p>
          <Link className="lf-primary lf-main-action" to="/anmelden">Kostenlos starten <ArrowRight size={20}/></Link>
          <ul className="lf-ticks">{["Flexibel lernen","Praxisnah","Mit Kulturbezug"].map(s => <li key={s}><Check size={17}/>{s}</li>)}</ul>
        </div>
      </section>
      <div className="lf-inner">
        <section aria-label="Funktionen" id="funktionen" tabIndex={-1} className="lf-features">
          {features.map(({icon: Icon,title,detail}) => <div key={title}><Icon aria-hidden/><span><strong>{title}</strong><small>{detail}</small></span></div>)}
        </section>
        <section className="lf-languages" aria-labelledby="kurse">
          <div><h2 id="kurse" tabIndex={-1}>Beliebte Sprachen</h2><p>Wähle deine erste Sprache und starte deine Lernreise.</p></div>
          <div className="lf-courses">
            {available.map(l => <Link key={l.code} className="lf-card" to={"/sprachen/"+l.code}><img src={art+(l.code === "zh" ? "zh" : "welt")+".webp"} alt=""/><span>{l.name}<ChevronRight size={17}/></span></Link>)}
            {planned.slice(0,3).map(l => <div key={l.code} className="lf-card"><img src={art+(["ja","ko","vi"].includes(l.code) ? l.code : "welt")+".webp"} alt=""/><span>{l.name}<small>Geplant</small></span></div>)}
            {planned.length > 3 && <details className="lf-more"><summary><Grid2X2/>Weitere Sprachen</summary><p>{planned.slice(3).map(l => l.name).join(", ")} · geplant</p></details>}
          </div>
        </section>
        <div className="lf-info">
          <section><NotebookPen aria-hidden/><h2 id="methode" tabIndex={-1}>Unsere Lernmethode</h2><p>Entdecke Wörter in einem Dialog, sprich sie laut aus und wiederhole sie später mit deinen Lernkarten. Eigene Ausdrücke sammelst du als Fundstücke.</p></section>
          <section><Globe aria-hidden/><h2 id="ueber" tabIndex={-1}>Über LinguaFlow</h2><p>Jede Sprache hat ihre eigene Lernwelt. Den Anfang macht Mandarin mit einer Bestellung im Teehaus – vom ersten gehörten Wort bis zur eigenen Antwort.</p></section>
        </div>
      </div>
    </main><footer className="lf-inner lf-credit">Illustrationen: KI-generiert</footer>
  </div>;
}
