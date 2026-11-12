import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "../lib/store";
import { stopSpeaking } from "../lib/tts";
import { cx } from "../lib/utils";

const NAV: Array<{ to: string; label: string; short?: string; icon: string; end?: boolean }> = [
  { to: "/", label: "Start", icon: "🏠", end: true },
  { to: "/learn", label: "Lernen", icon: "📚" },
  { to: "/review", label: "Wiederholen", short: "Karten", icon: "🃏" },
  { to: "/quiz", label: "Quiz", icon: "🎯" },
  { to: "/listen", label: "Hören", icon: "🎧" },
  { to: "/speak", label: "Sprechen", icon: "🎤" },
  { to: "/podcasts", label: "Podcast", icon: "📻" },
  { to: "/settings", label: "Einstellungen", short: "Mehr", icon: "⚙️" },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="hanzi flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-lg font-bold text-white shadow-soft">
        语
      </div>
      <span className="text-lg font-extrabold tracking-tight">
        Lingua<span className="text-brand-600 dark:text-brand-400">Flow</span>
      </span>
    </div>
  );
}

function Stats() {
  const { streak, progress, dueWords } = useStore();
  return (
    <div className="flex items-center gap-2 text-sm font-bold">
      <span className="chip bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" title="Tage in Folge">
        🔥 {streak}
      </span>
      <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200" title="Erfahrungspunkte">
        ⚡ {progress.xp}
      </span>
      {dueWords.length > 0 && (
        <span className="chip bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" title="Fällige Wiederholungen">
          🃏 {dueWords.length}
        </span>
      )}
    </div>
  );
}

export default function Layout() {
  const { lang, dueWords } = useStore();
  const location = useLocation();

  // Stop any running speech and scroll up when changing pages.
  useEffect(() => {
    stopSpeaking();
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen lg:flex">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-900 lg:flex">
        <div className="px-2">
          <Logo />
        </div>
        <div className="mx-2 mt-5 flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold dark:bg-slate-800">
          <span className="text-lg">{lang.flag}</span>
          <span>{lang.name}</span>
          <span className="hanzi muted ml-auto">{lang.nativeName}</span>
        </div>
        <nav className="mt-5 flex flex-1 flex-col gap-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cx(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                  isActive
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                )
              }
            >
              <span className="text-lg">{n.icon}</span>
              {n.label}
              {n.to === "/review" && dueWords.length > 0 && (
                <span className="ml-auto rounded-full bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">
                  {dueWords.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="px-2">
          <Stats />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar (mobile) */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 lg:hidden">
          <Logo />
          <Stats />
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:pb-12 lg:pt-10">
          <div key={location.pathname} className="animate-fade-in">
            <Outlet />
          </div>
        </main>

        {/* Bottom navigation (mobile) */}
        <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-slate-200 bg-white/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 lg:hidden">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cx(
                  "flex min-w-0 flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-semibold",
                  isActive ? "text-brand-600 dark:text-brand-300" : "text-slate-500 dark:text-slate-400",
                )
              }
            >
              <span className="text-xl leading-none">{n.icon}</span>
              {n.short ?? n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
