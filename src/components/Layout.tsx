import CourseSwitcher from "./CourseSwitcher";
import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../lib/store";
import { stopSpeaking } from "../lib/tts";
import { cx } from "../lib/utils";
import { ARCHIVE, HOME, LEARN, MOBILE, practiceItems, mobileOwner } from "./nav";
import type { NavItem } from "./nav";

function RailLink({ item, badge }: { item: NavItem; badge?: number }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        cx(
          "flex min-h-[40px] items-center gap-3 rounded px-3 text-sm font-semibold transition-colors",
          isActive ? "bg-ink text-paper" : "text-ink hover:bg-wash",
        )
      }
    >
      <Icon size={18} strokeWidth={1.75} aria-hidden />
      {item.label}
      {!!badge && (
        <span className="ml-auto rounded-sm bg-cinnabar px-1.5 text-xs font-bold text-on-cinnabar" title="Fällige Wiederholungen">
          {badge}
        </span>
      )}
    </NavLink>
  );
}

function RailGroup({ title, items, dueBadge }: { title: string; items: NavItem[]; dueBadge?: number }) {
  return (
    <div>
      <div className="caption mb-1.5 px-3">{title}</div>
      <div className="space-y-0.5">
        {items.map((n) => (
          <RailLink key={n.to} item={n} badge={n.to === "/review" ? dueBadge : undefined} />
        ))}
      </div>
    </div>
  );
}

export default function Layout() {
  const { lang, streak, progress, dueWords, sync } = useStore();
  const location = useLocation();

  // Stop any running speech and scroll up when changing pages.
  useEffect(() => {
    stopSpeaking();
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const owner = mobileOwner(location.pathname);

  return (
    <div className="min-h-[100dvh]">
      {/* The calendar's binding: red band with a row of punched holes. */}
      <header className="sticky top-0 z-30 bg-band text-white">
        <div className="mx-auto flex h-12 max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-6">
          <CourseSwitcher className="generic-course-switch"/>
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-extrabold uppercase leading-none tracking-wide">LinguaFlow</span>
            <span className="hanzi hidden text-sm font-bold opacity-90 sm:inline">{lang.nativeName}</span>
          </Link>
          <dl className="flex items-center gap-4 text-sm font-semibold">
            <div className="flex items-baseline gap-1.5" title="Tage in Folge">
              <dt className="opacity-80">Serie</dt>
              <dd className="font-display text-xl font-extrabold leading-none">{streak}</dd>
            </div>
            <div className="flex items-baseline gap-1.5" title="Erfahrungspunkte">
              <dt className="opacity-80">XP</dt>
              <dd className="font-display text-xl font-extrabold leading-none">{progress.xp}</dd>
            </div>
          </dl>
        </div>
        <div className="perforation" aria-hidden />
      </header>

      <div className="mx-auto max-w-[1180px] lg:grid lg:grid-cols-[232px_minmax(0,1fr)]">
        {/* Rail (desktop) */}
        <aside className="hidden lg:block">
          <nav aria-label="Hauptnavigation" className="sticky top-[58px] space-y-6 px-3 py-8">
            <RailLink item={HOME} />
            <RailGroup title="Lernen" items={LEARN} dueBadge={dueWords.length} />
            <RailGroup title="Üben" items={practiceItems(lang.tonePractice)} />
            <RailGroup title="Verlauf" items={ARCHIVE} />
          </nav>
        </aside>

        <main className="min-w-0 px-4 pb-28 pt-8 sm:px-6 lg:border-l lg:border-rule lg:pb-16 lg:pl-10 lg:pt-10">
          <div key={location.pathname} className="animate-enter">
            {sync.pending && sync.status !== "Speichert …" && location.pathname !== "/settings" && (
              <p role="status" className="mb-4 border-b border-rule pb-3">{sync.status} <Link className="underline" to="/settings">Zum Lernkonto</Link></p>
            )}
            <Outlet />
          </div>
        </main>
      </div>

      {/* Bottom bar (mobile): five destinations */}
      <nav
        aria-label="Hauptnavigation"
        className="fixed inset-x-0 bottom-0 z-30 flex border-t-2 border-ink bg-sheet pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        {MOBILE.map((n) => {
          const Icon = n.icon;
          const active = owner === n.to;
          return (
            <Link
              key={n.to}
              to={n.to}
              aria-current={active ? "page" : undefined}
              className={cx(
                "relative flex min-h-[56px] min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[11px] font-semibold",
                active ? "bg-ink text-paper" : "text-ink",
              )}
            >
              <Icon size={20} strokeWidth={1.75} aria-hidden />
              {n.label}
              {n.to === "/review" && dueWords.length > 0 && (
                <span className="absolute right-[18%] top-1.5 rounded-sm bg-cinnabar px-1 text-[10px] font-bold text-on-cinnabar">
                  {dueWords.length}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
