import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Headphones, MessageCircle, Repeat2 } from "lucide-react";
import { languages, upcomingLanguages } from "../../languages/registry";

const steps = [
  {
    icon: Headphones,
    title: "Im Alltag entdecken",
    text: "Höre zu und entdecke neue Wörter in Dialogen und Lesetexten. Ein Zusammenhang macht aus Vokabeln Bedeutung.",
  },
  {
    icon: MessageCircle,
    title: "Selbst ausdrücken",
    text: "Übe die Aussprache und finde Worte für Situationen, die dir begegnen – beim Kennenlernen, unterwegs oder beim Essen.",
  },
  {
    icon: Repeat2,
    title: "Vertraut werden",
    text: "Wiederhole mit Lernkarten und sammle eigene Ausdrücke als Fundstücke. So wächst dein persönlicher Wortschatz.",
  },
];
function jumpTo(id: string) {
  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior: "instant", block: "start" });
  target?.focus({ preventScroll: true });
}

function LearningPreview() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="home-demo">
      <div className="home-demo-bar">
        <span className="home-demo-brand">
          LinguaFlow <span>/ Lernkarten</span>
        </span>
        <span className="home-demo-tag">Vorschau</span>
      </div>
      <div className="home-demo-content">
        <div className="home-demo-meta">
          <span>Mandarin · Erste Begegnungen</span>
          <span>01</span>
        </div>
        <p className="home-demo-question">Ein kleines Wort. Ein guter Anfang.</p>
        <div className="home-demo-word" lang="zh">
          你好
        </div>
        <p className="home-demo-pinyin">nǐ hǎo</p>
        <div className="home-demo-answer" id="preview-answer" aria-live="polite">
          {revealed ? (
            <>
              <strong>Hallo</strong>
              <p>Eine Begrüßung, mit der du ein Gespräch beginnen kannst.</p>
            </>
          ) : (
            <p>Weißt du schon, was dieser Ausdruck bedeutet?</p>
          )}
        </div>
        <button
          className="home-demo-button"
          type="button"
          aria-expanded={revealed}
          aria-controls="preview-answer"
          onClick={() => setRevealed(!revealed)}
        >
          {revealed ? "Noch einmal üben" : "Bedeutung aufdecken"}
          {revealed ? <Repeat2 size={17} aria-hidden /> : <ArrowRight size={17} aria-hidden />}
        </button>
      </div>
      <div className="home-demo-caption">
        <span className="home-demo-dot" aria-hidden />
        Vereinfachtes Lernbeispiel · kein Fortschritt gespeichert
      </div>
    </div>
  );
}

export default function Landing() {
  const available = languages.filter((language) => language.available);
  const planned = upcomingLanguages.filter((language) => !available.some((course) => course.code === language.code));
  return (
    <div className="lf-landing lf-home">
      <button type="button" className="home-skip" onClick={() => jumpTo("home-main")}>
        Zum Inhalt
      </button>
      <header className="lf-top">
        <div className="lf-inner lf-bar">
          <Link className="lf-logo" to="/" aria-label="LinguaFlow Startseite">
            <img
              className="lf-brand-mark"
              src={import.meta.env.BASE_URL + "linguaflow-logo.svg"}
              width="40"
              height="40"
              alt=""
            />
            LinguaFlow
          </Link>
          <nav className="home-nav" aria-label="Hauptnavigation">
            <button type="button" className="home-section-link" onClick={() => jumpTo("lernweise")}>
              So lernst du
            </button>
            <Link className="home-signin" to="/anmelden">
              Anmelden
            </Link>
          </nav>
        </div>
      </header>
      <main id="home-main" tabIndex={-1}>
        <section className="lf-inner home-hero" aria-labelledby="home-title">
          <div className="home-intro">
            <p className="home-kicker">Sprache verbindet.</p>
            <h1 id="home-title">
              Sprachen lernen.
              <br />
              <em>Menschen verstehen.</em>
            </h1>
            <p className="home-lead">
              Entdecke neue Wörter in echten Zusammenhängen. Übe für Gespräche im Alltag und lerne die Kultur hinter
              einer Sprache kennen – Schritt für Schritt, in deinem Tempo.
            </p>
            <button type="button" className="lf-primary home-start" onClick={() => jumpTo("sprachen")}>
              Sprache wählen <ArrowRight size={18} aria-hidden />
            </button>
            <p className="home-note">Kostenlos ausprobieren · Auch ohne Konto</p>
          </div>
          <LearningPreview />
        </section>
        <div className="home-topics lf-inner" aria-label="Lernen im Alltag">
          <span>Für die kleinen Momente, die verbinden.</span>
          <ul>
            <li>Menschen kennenlernen</li>
            <li>Gemeinsam essen</li>
            <li>Unterwegs sein</li>
          </ul>
        </div>
        <section className="home-method" id="lernweise" tabIndex={-1} aria-labelledby="method-title">
          <div className="lf-inner">
            <div className="home-section-heading">
              <p className="home-kicker">Dein Weg ins Gespräch</p>
              <h2 id="method-title">Verstehen. Ausprobieren. Behalten.</h2>
              <p>Kleine Schritte, die zusammengehören – in deinem eigenen Tempo.</p>
            </div>
            <div className="home-steps">
              {steps.map(({ icon: Icon, title, text }, index) => (
                <article key={title}>
                  <div className="home-step-label">
                    <Icon size={23} aria-hidden />
                    <span>0{index + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="lf-inner home-languages" id="sprachen" tabIndex={-1} aria-labelledby="languages-title">
          <div className="home-section-heading">
            <p className="home-kicker">Deine nächste Sprache</p>
            <h2 id="languages-title">Welche Sprache macht dich neugierig?</h2>
            <p>LinguaFlow wächst Sprache für Sprache. Diese Kurse kannst du bereits entdecken.</p>
          </div>
          <div className="home-available">
            {available.map((language) => (
              <Link className="home-course" key={language.code} to={"/sprachen/" + language.code}>
                <div>
                  <span className="home-status">Jetzt verfügbar</span>
                  <h3>{language.name}</h3>
                  <p>Dialoge, Wortschatz und Kultur entdecken</p>
                </div>
                <span className="home-course-native" lang={language.code}>
                  {language.nativeName}
                </span>
                <ArrowRight size={24} aria-hidden />
              </Link>
            ))}
          </div>
          {planned.length > 0 && (
            <div className="home-planned">
              <p>Weitere Sprachen sind geplant</p>
              <ul>
                {planned.map((language) => (
                  <li key={language.code}>
                    {language.name}
                    <span lang={language.code}>{language.nativeName}</span>
                  </li>
                ))}
              </ul>
              <small>Diese Kurse sind noch nicht verfügbar.</small>
            </div>
          )}
        </section>
        <section className="lf-inner home-culture" aria-labelledby="culture-title">
          <div>
            <p className="home-kicker">Sprache & Kultur</p>
            <h2 id="culture-title">
              Worte gehören
              <br />
              <em>mitten ins Leben.</em>
            </h2>
          </div>
          <div>
            <p className="home-culture-lead">Beim Kennenlernen. Unterwegs. Am gemeinsamen Tisch.</p>
            <p>
              Eine Begrüßung, eine Einladung, ein gemeinsames Essen: Sprache gehört zum Leben. Deshalb stehen bei
              LinguaFlow Wörter und Grammatik im Zusammenhang mit Menschen und Alltagssituationen.
            </p>
            <p>Jede Sprache bekommt ihre eigene Lernwelt. Was sie verbindet: die Neugier auf andere Perspektiven.</p>
          </div>
        </section>
      </main>
      <footer className="lf-inner home-footer">
        <span>LinguaFlow · Sprache verbindet.</span>
      </footer>
    </div>
  );
}
