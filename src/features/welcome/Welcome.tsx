import { ArrowLeft, ArrowRight, BookOpen, Bookmark, Languages } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { languages } from "../../languages/registry";
import { useStore } from "../../state/learningStore";
import AccountPanel from "../account/AccountPanel";
import { SiteFooter, SiteHeader, SkipLink } from "../../shared/ui/SiteShell";
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
      <SkipLink target="account-main" />
      <SiteHeader label="Seitennavigation">
        <Link className="account-back" to="/">
          <ArrowLeft size={16} aria-hidden />
          Zur Startseite
        </Link>
      </SiteHeader>
      <main className="account-entry" id="account-main" tabIndex={-1}>
        <aside className="account-story" aria-label="Dein Lernen mit LinguaFlow">
          <h2>
            Ein Zugang.
            <br />
            <em>Deine ganze Lernwelt.</em>
          </h2>
          <p className="account-story-lead">
            Für die ersten Worte, neue Begegnungen und alles, was du noch verstehen möchtest.
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
                <strong>Eigene Wörter mitnehmen</strong>
                <span>Sammle Ausdrücke aus deinem Alltag als Fundstücke.</span>
              </div>
            </li>
            <li>
              <Languages size={20} aria-hidden />
              <div>
                <strong>Sprache im Zusammenhang lernen</strong>
                <span>Entdecke Gespräche und die Kultur dahinter.</span>
              </div>
            </li>
          </ul>
          <div className="account-story-footer">
            Sprache verbindet.<span>LinguaFlow</span>
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
      <SiteFooter />
    </div>
  );
}
