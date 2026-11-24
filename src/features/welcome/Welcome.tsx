import { ArrowLeft, ArrowRight, BookOpen, Bookmark } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { languages } from "../../languages/registry";
import { useStore } from "../../state/learningStore";
import AccountPanel from "../account/AccountPanel";
export { default as Welcome } from "./Landing";

export function AccountEntry() {
  const { course } = useParams();
  const { username, updateSettings, lang } = useStore();
  if (course && !languages.some((l) => l.code === course && l.available)) return <Navigate to="/sprachwahl" replace />;
  const chosen = languages.find((item) => item.code === course);
  const next = course ? "/heute" : "/sprachwahl";
  if (username) return <Navigate to={course === lang.code ? "/heute" : "/sprachwahl"} replace />;
  return (
    <div className="lf-landing lf-account">
      <header className="auth-header">
        <Link className="auth-brand" to="/" aria-label="LinguaFlow Startseite">
          <img src={import.meta.env.BASE_URL + "linguaflow-logo.svg"} width="36" height="36" alt="" />
          LinguaFlow
        </Link>
        <Link className="account-back" to="/">
          <ArrowLeft size={16} aria-hidden />
          Zur Startseite
        </Link>
      </header>
      <main className="account-entry">
        <aside className="account-story" aria-label="Dein Lernen mit LinguaFlow">
          <p className="auth-eyebrow">Dein Lernkonto</p>
          <h2>
            Deine Sprachen.
            <br />
            <em>Dein Fortschritt.</em>
          </h2>
          <p className="account-story-lead">
            Wörter lernen, Gespräche üben und dort weitermachen, wo du aufgehört hast.
          </p>
          <ul className="account-benefits">
            <li>
              <BookOpen size={20} aria-hidden />
              <div>
                <strong>Deinen Lernweg fortsetzen</strong>
                <span>Behalte Lektionen und Wiederholungen im Blick.</span>
              </div>
            </li>
            <li>
              <Bookmark size={20} aria-hidden />
              <div>
                <strong>Deinen Wortschatz erweitern</strong>
                <span>Sammle eigene Ausdrücke als Fundstücke.</span>
              </div>
            </li>
          </ul>
          <div className="account-story-footer">
            Schritt für Schritt weiterlernen.<span>LinguaFlow</span>
          </div>
        </aside>
        <section className="account-paper" aria-label="Lernkonto">
          {chosen && (
            <p className="account-course-label">
              Dein gewählter Kurs: <strong>{chosen.name}</strong>
            </p>
          )}
          <AccountPanel
            headingLevel={1}
            afterAuth={course ? "?lang=" + encodeURIComponent(course) + "#/heute" : "#/sprachwahl"}
          />
          <div className="account-guest-section">
            <p>Erst einmal ausprobieren?</p>
            <Link
              className="account-guest"
              to={next}
              onClick={() => {
                if (course && lang.code !== course) updateSettings({ lang: course });
              }}
            >
              Ohne Konto starten <ArrowRight size={16} aria-hidden />
            </Link>
            <small>Als Gast bleibt dein Lernstand in diesem Browser.</small>
          </div>
        </section>
      </main>
      <footer className="auth-footer">LinguaFlow · Sprachen lernen, Schritt für Schritt.</footer>
    </div>
  );
}
