import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, CalendarCheck, Menu, Search, UserRound } from "lucide-react";
import CourseSwitcher from "../../shared/ui/CourseSwitcher";
import { useStore } from "../../state/learningStore";
import { stopSpeaking } from "../../shared/audio/tts";
import { navigationFor, quickLinks, isModuleAvailable, sectionFor } from "../navigation";

export default function LearningLayout() {
  const { pathname, search } = useLocation();
  const { lang, dueWords, sync } = useStore();
  const links = navigationFor(lang).filter((item) => item.to !== "/settings");
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const home = pathname === "/heute";
  const section = sectionFor(pathname);
  useEffect(() => {
    setMenu(false);
    window.scrollTo(0, 0);
    return stopSpeaking;
  }, [pathname]);
  return (
    <div className={home ? "learning-layout" : "learning-layout mh-course"}>
      <a
        href="#learning-content"
        className="mh-skip"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("learning-content")?.focus();
        }}
      >
        Zum Lernbereich
      </a>
      <aside className="mh-side">
        <Link className="mh-brand" to={"/sprachen/" + lang.code}>
          <strong lang={lang.code}>{lang.nativeName}</strong>
          <span>{lang.presentation?.brandLabel ?? lang.name + " lernen"}</span>
        </Link>
        <button className="mh-menu" aria-expanded={menu} aria-controls="learning-nav" onClick={() => setMenu(!menu)}>
          <Menu size={20} /> Menü
        </button>
        <nav id="learning-nav" aria-label={lang.name} className={menu ? "is-open" : ""}>
          <CourseSwitcher />
          {links.map(({ title, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              aria-current={to === pathname ? "page" : to === section ? "location" : undefined}
              onClick={() => setMenu(false)}
            >
              <Icon size={21} />
              {title}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="mh-workspace">
        <header className="mh-tools">
          <CourseSwitcher />
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
              navigate("/learn?q=" + encodeURIComponent(q));
            }}
          >
            <button aria-label="Suche starten">
              <Search size={20} />
            </button>
            <input type="search" name="q" aria-label="Wortschatz durchsuchen" placeholder="Wort suchen …" />
          </form>
          <Link to="/review" aria-label={dueWords.length + " fällige Karten"} title="Wiederholungen">
            <Bell />
            {dueWords.length > 0 && <i />}
          </Link>
          <Link to="/lernplan" aria-label="Lernplan öffnen" title="Lernplan">
            <CalendarCheck />
          </Link>
          <Link to="/settings" aria-label="Konto und Einstellungen" title="Konto und Einstellungen">
            <UserRound />
          </Link>
        </header>
        {pathname !== "/settings" && sync.pending && sync.status !== "Speichert …" && (
          <p className="mh-sync" role="status">
            {sync.status} <Link to="/settings">Zum Lernkonto</Link>
          </p>
        )}
        <main
          id="learning-content"
          tabIndex={-1}
          data-area={pathname.split("/")[1]}
          className={home ? "mh-content" : "mh-course-page"}
          key={pathname + search}
        >
          <Outlet />
        </main>
        <footer>
          {lang.presentation?.illustrationCredit && <p className="mh-credit">{lang.presentation.illustrationCredit}</p>}
          <nav className="mh-mobile-links" aria-label="Schnellzugriff">
            {quickLinks
              .filter((item) => isModuleAvailable(lang, item.to))
              .map(({ title, to, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenu(false)}
                  aria-current={to === pathname ? "page" : to === section ? "location" : undefined}
                >
                  <Icon size={20} aria-hidden />
                  {title}
                </Link>
              ))}
          </nav>
        </footer>
      </div>
    </div>
  );
}
