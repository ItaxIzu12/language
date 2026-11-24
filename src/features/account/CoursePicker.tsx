import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { languages, upcomingLanguages } from "../../languages/registry";
import { useStore } from "../../state/learningStore";
import { SiteFooter, SiteHeader, SkipLink } from "../../shared/ui/SiteShell";

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
  return (
    <div className="lf-landing">
      <SkipLink target="course-main" />
      <SiteHeader label="Seitennavigation">
        <Link to="/">Zur Startseite</Link>
      </SiteHeader>
      <main className="course-picker" id="course-main" tabIndex={-1}>
        <h1>Welche Sprache möchtest du lernen?</h1>
        <p>
          {username
            ? "Dein Lernstand wird für jeden Kurs in deinem Konto gespeichert."
            : "Als Gast speicherst du deinen Lernstand in diesem Browser."}
        </p>
        {languages
          .filter((l) => l.available)
          .map((l) => (
            <button
              key={l.code}
              className="pick-course"
              disabled={sync.pending && l.code !== lang.code}
              onClick={() => choose(l.code)}
            >
              <span lang={l.code}>{l.nativeName}</span>
              <strong>{l.name}</strong>
              <ArrowRight size={20} aria-hidden />
            </button>
          ))}
        {sync.pending && (
          <p role="status">
            {sync.status} <Link to="/settings">Zum Lernkonto</Link>
          </p>
        )}
        <p className="course-planned">
          In Vorbereitung:{" "}
          {upcomingLanguages
            .filter((p) => !languages.some((l) => l.available && l.code === p.code))
            .map((l) => l.name)
            .join(", ")}
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
