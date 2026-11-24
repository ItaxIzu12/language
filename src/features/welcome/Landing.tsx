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
          <span>Lernkarten</span>
        </span>
        <span className="home-demo-tag">Vorschau</span>
      </div>
      <ol className="home-demo-stages" aria-label="Ablauf des Lernbeispiels">
        <li aria-current={!revealed ? "step" : undefined}>1 · Entdecken</li>
        <li aria-current={revealed ? "step" : undefined}>2 · Verstehen</li>
        <li>3 · Wiederholen</li>
      </ol>
      <div className="home-demo-content">
        <div className="home-demo-meta">
          <span>Mandarin · Erste Begegnungen</span>
          <span>01</span>
        </div>
        <p className="home-demo-question">Wie begrüßt du jemanden?</p>
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
            <p className="home-kicker">Deine App zum Sprachenlernen</p>
            <h1 id="home-title">
              Eine neue Sprache.
              <br />
              <em>Ein Schritt am Tag.</em>
            </h1>
            <p className="home-lead">
              Baue deinen Wortschatz auf, übe Gespräche und wiederhole, was du gelernt hast. Alles an einem Ort. In
              deinem Tempo.
            </p>
            <button type="button" className="lf-primary home-start" onClick={() => jumpTo("sprachen")}>
              Sprache wählen <ArrowRight size={18} aria-hidden />
            </button>
            <p className="home-note">Kostenlos ausprobieren · Auch ohne Konto</p>
          </div>
          <LearningPreview />
        </section>
        <div className="home-topics lf-inner" aria-label="Lernen im Alltag">
          <span>Ein Lernweg. Mehrere Möglichkeiten.</span>
          <ul>
            <li>Wortschatz aufbauen</li>
            <li>Gespräche üben</li>
            <li>Gezielt wiederholen</li>
          </ul>
        </div>
        <section className="home-method" id="lernweise" tabIndex={-1} aria-labelledby="method-title">
          <div className="lf-inner">
            <div className="home-section-heading">
              <p className="home-kicker">So funktioniert LinguaFlow</p>
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
            <h2 id="languages-title">Mit welcher Sprache startest du?</h2>
            <p>LinguaFlow wächst Sprache für Sprache. Diese Kurse kannst du bereits entdecken.</p>
          </div>
          <div className="home-available">
            {available.map((language) => (
              <Link className="home-course" key={language.code} to={"/sprachen/" + language.code}>
                <div>
                  <span className="home-status">Jetzt verfügbar</span>
                  <h3>{language.name}</h3>
                  <p>Lernkarten, Dialoge und Hörübungen</p>
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
        <section className="lf-inner home-routine" aria-labelledby="routine-title">
          <div>
            <p className="home-kicker">Dein persönlicher Lernweg</p>
            <h2 id="routine-title">
              Heute etwas lernen.
              <br />
              Morgen daran anknüpfen.
            </h2>
          </div>
          <div className="home-routine-details">
            <article>
              <h3>Dein Fortschritt bleibt sichtbar</h3>
              <p>
                Behalte deine Übungen und Wiederholungen im Blick. Mit einem Konto kannst du auf anderen Geräten
                weiterlernen.
              </p>
            </article>
            <article>
              <h3>Platz für deine eigenen Wörter</h3>
              <p>Speichere Ausdrücke, die dir begegnen, als Fundstücke. So ergänzt dein Alltag den Kurs.</p>
            </article>
          </div>
        </section>
      </main>
      <footer className="lf-inner home-footer">
        <span>LinguaFlow · Sprachen lernen, Schritt für Schritt.</span>
      </footer>
    </div>
  );
}
