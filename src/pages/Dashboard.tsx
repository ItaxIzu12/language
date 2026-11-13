import { Link } from "react-router-dom";
import { ProgressBar, Ring } from "../components/ui";
import { LEVELS } from "../data/languages";
import { XP_PER_LEVEL, useStore } from "../lib/store";
import { addDays, cx } from "../lib/utils";

const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

function greeting(): string {
  const h = new Date().getHours();
  if (h < 11) return "Guten Morgen";
  if (h < 18) return "Hallo";
  return "Guten Abend";
}

export default function Dashboard() {
  const { lang, progress, settings, today, todayXp, streak, level, dueWords, status } = useStore();

  const total = lang.vocab.length;
  const started = lang.vocab.filter((w) => status(w.id) !== "new").length;
  const mastered = lang.vocab.filter((w) => status(w.id) === "mastered").length;
  const goalPct = todayXp / settings.dailyGoal;
  const levelXp = progress.xp % XP_PER_LEVEL;

  // Next category that still has new words.
  const next =
    lang.categories.find((c) => lang.vocab.some((w) => w.category === c.id && status(w.id) === "new")) ??
    lang.categories[0];
  const nextWords = lang.vocab.filter((w) => w.category === next.id);
  const nextDone = nextWords.filter((w) => status(w.id) !== "new").length;

  const week = Array.from({ length: 7 }, (_, i) => {
    const key = addDays(today, i - 6);
    const [y, m, d] = key.split("-").map(Number);
    return { key, xp: progress.days[key] ?? 0, label: WEEKDAYS[new Date(y, m - 1, d).getDay()] };
  });
  const weekMax = Math.max(settings.dailyGoal, ...week.map((d) => d.xp));

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 p-6 text-white shadow-soft sm:p-8">
        <div className="hanzi pointer-events-none absolute -right-4 -top-8 select-none text-[11rem] font-bold leading-none text-white/10">
          学
        </div>
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-md">
            <p className="text-sm font-semibold text-brand-100">
              {lang.flag} {lang.name} · Level {level}
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">{greeting()}! 加油 💪</h1>
            <p className="mt-2 text-brand-100">
              {todayXp >= settings.dailyGoal
                ? "Tagesziel geschafft – stark! Jede Extra-Runde bringt dich schneller zu B2."
                : `Noch ${settings.dailyGoal - todayXp} XP bis zu deinem Tagesziel.`}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to={`/lesson/${next.id}`} className="btn bg-white text-brand-700 hover:bg-brand-50">
                ▶ Lektion starten
              </Link>
              {dueWords.length > 0 && (
                <Link to="/review" className="btn bg-accent-500 text-white hover:bg-accent-600">
                  🃏 {dueWords.length} wiederholen
                </Link>
              )}
            </div>
          </div>
          <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
            <Ring value={goalPct} size={132}>
              <span className="text-2xl font-extrabold">{todayXp}</span>
              <span className="text-xs text-brand-100">/ {settings.dailyGoal} XP</span>
            </Ring>
          </div>
        </div>
      </section>

      {/* Key numbers */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: "🔥", value: streak, label: streak === 1 ? "Tag in Folge" : "Tage in Folge" },
          { icon: "⚡", value: progress.xp, label: "XP gesamt" },
          { icon: "📖", value: started, label: `von ${total} Wörtern begonnen` },
          { icon: "🏆", value: mastered, label: "Wörter sicher" },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <div className="text-2xl">{s.icon}</div>
            <div className="mt-2 text-2xl font-extrabold">{s.value}</div>
            <div className="muted text-xs font-medium">{s.label}</div>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Continue */}
        <section className="card p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Weiterlernen</h2>
          <div className="mt-3 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-3xl dark:bg-brand-900/40">
              {next.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-bold">{next.name}</div>
              <div className="muted text-sm">
                {nextDone} / {nextWords.length} Wörter
              </div>
              <ProgressBar value={nextWords.length ? nextDone / nextWords.length : 0} className="mt-2" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Link to={`/lesson/${next.id}`} className="btn-primary flex-1">
              Lektion starten
            </Link>
            <Link to={`/learn/${next.id}`} className="btn-ghost">
              Wörter ansehen
            </Link>
          </div>
        </section>

        {/* Week */}
        <section className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Diese Woche</h2>
            <span className="muted text-xs">
              Level {level} · {levelXp}/{XP_PER_LEVEL} XP
            </span>
          </div>
          <div className="mt-4 flex items-end gap-2">
            {week.map((d) => (
              <div key={d.key} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex h-24 w-full items-end">
                  <div
                    title={`${d.xp} XP`}
                    className={cx(
                      "w-full rounded-t-lg transition-all",
                      d.xp >= settings.dailyGoal
                        ? "bg-gradient-to-t from-brand-600 to-accent-500"
                        : d.xp > 0
                          ? "bg-brand-300 dark:bg-brand-700"
                          : "bg-slate-200 dark:bg-slate-800",
                    )}
                    style={{ height: `${Math.max(6, (d.xp / weekMax) * 100)}%` }}
                  />
                </div>
                <span className={cx("text-xs font-semibold", d.key === today ? "text-brand-600 dark:text-brand-300" : "muted")}>
                  {d.label}
                </span>
              </div>
            ))}
          </div>
          <ProgressBar value={levelXp / XP_PER_LEVEL} className="mt-4" />
        </section>
      </div>

      {/* Path to B2 */}
      <section className="card p-5">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Dein Weg zu B2</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LEVELS.map((lv) => {
            const words = lang.vocab.filter((w) => w.level === lv);
            const done = words.filter((w) => status(w.id) !== "new").length;
            return (
              <div key={lv}>
                <div className="flex items-baseline justify-between">
                  <span className="font-extrabold">{lv}</span>
                  <span className="muted text-xs">
                    {done} / {words.length}
                  </span>
                </div>
                <ProgressBar value={words.length ? done / words.length : 0} className="mt-2" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Modes */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { to: "/read", icon: "📖", title: "Lesen", text: "Texte mit Fragen" },
          { to: "/listen", icon: "🎧", title: "Hören", text: "Sätze verstehen" },
          { to: "/speak", icon: "🎤", title: "Sprechen", text: "Rollenspiele & Aussprache" },
          { to: "/podcasts", icon: "📻", title: "Podcast", text: "Dialoge mit Transkript" },
        ].map((m) => (
          <Link key={m.to} to={m.to} className="card group p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
            <div className="text-3xl transition group-hover:scale-110">{m.icon}</div>
            <div className="mt-2 font-bold">{m.title}</div>
            <div className="muted text-xs">{m.text}</div>
          </Link>
        ))}
      </section>
    </div>
  );
}
