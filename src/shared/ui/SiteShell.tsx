import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { languages } from "../../languages/registry";

/**
 * Shared platform shell: brand, header, footer and skip link.
 * Used by every page outside a language world (start page, course choice, account entry)
 * and by the learning area for its brand. Language worlds add their culture on top
 * through `data-theme`; they never replace this structure.
 */

const logoSrc = import.meta.env.BASE_URL + "linguaflow-logo.svg";

export function BrandLink({
  to = "/",
  label = "LinguaFlow Startseite",
  compact = false,
}: {
  to?: string;
  label?: string;
  /** Mark only, for narrow bars. The name stays available to assistive technology. */
  compact?: boolean;
}) {
  return (
    <Link className={"lf-brand" + (compact ? " lf-brand-compact" : "")} to={to} aria-label={label}>
      <img src={logoSrc} width="36" height="36" alt="" />
      {!compact && <span>LinguaFlow</span>}
    </Link>
  );
}

/** Moves focus to the main region; works with HashRouter, where #anchors are routes. */
export function focusRegion(id: string) {
  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior: "instant", block: "start" });
  target?.focus({ preventScroll: true });
}

export function SkipLink({ target, children = "Zum Inhalt springen" }: { target: string; children?: ReactNode }) {
  return (
    <a
      className="lf-skip"
      href={"#" + target}
      onClick={(event) => {
        event.preventDefault();
        focusRegion(target);
      }}
    >
      {children}
    </a>
  );
}

/** Sticky header. Gains a soft shadow once content scrolls beneath it. */
export function SiteHeader({ children, label = "Hauptnavigation" }: { children?: ReactNode; label?: string }) {
  const [raised, setRaised] = useState(false);
  useEffect(() => {
    const update = () => setRaised(window.scrollY > 4);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className="lf-site-header" data-raised={raised || undefined}>
      <div className="lf-container lf-site-bar">
        <BrandLink />
        {children && (
          <nav className="lf-site-nav" aria-label={label}>
            {children}
          </nav>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  const available = languages.filter((language) => language.available);
  return (
    <footer className="lf-site-footer">
      <div className="lf-container lf-site-footer-grid">
        <div className="lf-site-footer-brand">
          <BrandLink />
          <p>Sprache, Alltag und Kultur – Schritt für Schritt, in deinem Tempo.</p>
        </div>
        <nav aria-label="Kurse">
          <h2>Kurse</h2>
          <ul>
            {available.map((language) => (
              <li key={language.code}>
                <Link to={"/sprachen/" + language.code}>
                  {language.name} <span lang={language.code}>{language.nativeName}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link to="/sprachwahl">Alle Kurse</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Konto">
          <h2>Konto</h2>
          <ul>
            <li>
              <Link to="/anmelden">Anmelden</Link>
            </li>
            <li>
              <Link to="/sprachwahl">Ohne Konto starten</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="lf-container lf-site-footer-note">
        <span>LinguaFlow · Sprache verbindet.</span>
        <span>Im Gastmodus bleibt dein Lernstand in diesem Browser.</span>
      </div>
    </footer>
  );
}
