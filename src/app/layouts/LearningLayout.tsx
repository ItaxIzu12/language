import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CourseSwitcher from "../../shared/ui/CourseSwitcher";
import { BrandLink } from "../../shared/ui/SiteShell";
import { useStore } from "../../state/learningStore";
import { stopSpeaking } from "../../shared/audio/tts";
import { primaryNavigation, workspaceSection, navigationFor } from "../navigation";

export default function LearningLayout() {
  const { pathname, search } = useLocation();
  const { lang, sync, username } = useStore();
  const section = workspaceSection(pathname);
  const wordArea = section === "/learn";
  const subLinks = wordArea ? navigationFor(lang).filter((n) => ["/learn", "/review", "/notebook"].includes(n.to)) : [];
  const focusMode =
    pathname.startsWith("/lesson/") ||
    pathname.startsWith("/dialoge/") ||
    pathname.startsWith("/read/") ||
    pathname.startsWith("/podcasts/");
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("learning-content")?.focus({ preventScroll: true });
    return stopSpeaking;
  }, [pathname]);
  return (
    <div className="study-app">
      <a
        href="#learning-content"
        className="study-skip"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("learning-content")?.focus();
        }}
      >
        Zum Lernbereich
      </a>
      <aside className="study-sidebar">
        <BrandLink to="/heute" label="LinguaFlow – Heute" />
        <div className="study-course">
          <span className="study-caption">Dein Kurs</span>
          <strong>{lang.name}</strong>
          <span lang={lang.code}>{lang.nativeName}</span>
        </div>
        <nav aria-label="Hauptnavigation">
          {primaryNavigation.map(({ to, title, icon: Icon }) => (
            <Link key={to} to={to} aria-current={section === to ? "page" : undefined}>
              <Icon size={20} aria-hidden />
              {title}
            </Link>
          ))}
        </nav>
        <div className="study-sidebar-bottom">
          <CourseSwitcher />
          <span>{username ? "Mit Lernkonto" : "Gast · auf diesem Gerät"}</span>
          <Link to="/">Über LinguaFlow</Link>
        </div>
      </aside>
      <div className="study-workspace">
        <header className="study-topbar">
          <BrandLink to="/heute" label="LinguaFlow – Heute" compact />
          <span>
            {lang.name}
            <span className="study-topbar-separator">/</span>
            {primaryNavigation.find((n) => n.to === section)?.title}
          </span>
          <CourseSwitcher />
        </header>
        {sync.pending && (
          <div className="study-sync" role="status">
            {sync.status || "Änderungen werden gespeichert …"}
            {sync.blocked && <Link to="/settings">Im Profil klären</Link>}
          </div>
        )}
        <main
          id="learning-content"
          tabIndex={-1}
          className={"study-page" + (focusMode ? " study-focus" : "")}
          key={pathname + search}
        >
          {section === "/practice" && pathname !== "/practice" && (
            <Link className="study-back" to="/practice">
              <ArrowLeft size={17} aria-hidden />
              Alle Übungen
            </Link>
          )}
          {subLinks.length > 0 && !focusMode && (
            <nav className="study-subnav" aria-label="Wortschatz">
              {subLinks.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  aria-current={
                    pathname === n.to || (n.to === "/learn" && pathname.startsWith("/learn/")) ? "page" : undefined
                  }
                >
                  {n.title}
                </Link>
              ))}
            </nav>
          )}
          <Outlet />
        </main>
        <nav className="study-mobile" aria-label="Hauptnavigation mobil">
          {primaryNavigation.map(({ to, title, icon: Icon }) => (
            <Link key={to} to={to} aria-current={section === to ? "page" : undefined}>
              <Icon size={20} aria-hidden />
              <span>{title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
