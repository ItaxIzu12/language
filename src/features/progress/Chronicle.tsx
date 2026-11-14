import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ICON, PageHeader } from "../../components/ui";
import { MASTERED_BOX, useStore } from "../../lib/store";
import { addDays, cx, dayKey } from "../../lib/utils";

const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

/** The learning year as twelve small calendar sheets, plus running totals. */
export default function Chronicle() {
  const { lang, progress, settings, today } = useStore();
  const thisYear = Number(today.slice(0, 4));
  const [year, setYear] = useState(thisYear);

  const stats = useMemo(() => {
    const days = Object.keys(progress.days).filter((d) => progress.days[d] > 0).sort();
    let longest = 0;
    let run = 0;
    let prev = "";
    for (const d of days) {
      run = prev && addDays(prev, 1) === d ? run + 1 : 1;
      longest = Math.max(longest, run);
      prev = d;
    }
    const cards = Object.values(progress.cards);
    const activity = Object.values(progress.activity);
    return {
      daysLearned: days.length,
      longest,
      torn: Object.keys(progress.torn).length,
      started: cards.length,
      mastered: cards.filter((c) => c.box >= MASTERED_BOX).length,
      answersRight: cards.reduce((n, c) => n + c.right, 0),
      answersWrong: cards.reduce((n, c) => n + c.wrong, 0),
      applied: activity.reduce((n, a) => n + a.apply, 0),
    };
  }, [progress]);

  const firstYear = Math.min(thisYear, ...Object.keys(progress.days).map((d) => Number(d.slice(0, 4))));

  return (
    <div>
      <PageHeader title="Chronik" subtitle="Jeder Lerntag hinterlässt eine Spur. Rot sind die Tage, an denen du das Blatt abgerissen hast." />

      <div className="grid gap-12 xl:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
        <section>
          <div className="mb-4 flex items-center justify-between border-b-2 border-ink pb-2">
            <h2 className="font-display text-4xl font-extrabold leading-none">{year}</h2>
            <div className="flex gap-2">
              <button type="button" className="btn-line w-11 px-0" aria-label="Vorheriges Jahr" disabled={year <= firstYear} onClick={() => setYear((y) => y - 1)}>
                <ChevronLeft {...ICON} aria-hidden />
              </button>
              <button type="button" className="btn-line w-11 px-0" aria-label="Nächstes Jahr" disabled={year >= thisYear} onClick={() => setYear((y) => y + 1)}>
                <ChevronRight {...ICON} aria-hidden />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {MONTHS.map((name, m) => {
              const first = new Date(year, m, 1);
              const offset = (first.getDay() + 6) % 7; // Monday first
              const length = new Date(year, m + 1, 0).getDate();
              return (
                <div key={name}>
                  <h3 className="mb-1.5 text-sm font-bold">{name}</h3>
                  <div className="grid grid-cols-7 gap-[3px]" role="img" aria-label={`${name} ${year}`}>
                    {WEEKDAYS.map((w) => (
                      <span key={w} className="text-center text-[9px] font-semibold text-dim" aria-hidden>
                        {w[0]}
                      </span>
                    ))}
                    {Array.from({ length: offset }, (_, i) => (
                      <span key={`o${i}`} />
                    ))}
                    {Array.from({ length }, (_, i) => {
                      const key = dayKey(new Date(year, m, i + 1));
                      const xp = progress.days[key] ?? 0;
                      const torn = !!progress.torn[key];
                      return (
                        <span
                          key={key}
                          title={`${i + 1}. ${name}: ${xp} XP${torn ? ", Blatt abgerissen" : ""}`}
                          className={cx(
                            "aspect-square rounded-[1px]",
                            torn ? "bg-cinnabar" : xp >= settings.dailyGoal ? "bg-ink" : xp > 0 ? "bg-ink/35" : "bg-wash",
                            key === today && "outline outline-2 outline-offset-1 outline-ink",
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-dim">
            {[
              ["bg-cinnabar", "Blatt abgerissen"],
              ["bg-ink", "Tagesziel erreicht"],
              ["bg-ink/35", "gelernt"],
              ["bg-wash", "kein Eintrag"],
            ].map(([c, label]) => (
              <li key={label} className="inline-flex items-center gap-2">
                <span className={cx("h-3 w-3 rounded-[1px]", c)} aria-hidden /> {label}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="border-b-2 border-ink pb-2 text-lg font-bold">Seit Beginn</h2>
          <dl className="rows">
            {[
              ["Lerntage", stats.daysLearned],
              ["Längste Serie", `${stats.longest} ${stats.longest === 1 ? "Tag" : "Tage"}`],
              ["Blätter abgerissen", stats.torn],
              ["Lektionen", progress.lessonsDone],
              ["Wörter begonnen", `${stats.started} von ${lang.vocab.length}`],
              ["Wörter sicher", stats.mastered],
              ["Antworten richtig", stats.answersRight],
              ["Antworten falsch", stats.answersWrong],
              ["Runden Anwenden", stats.applied],
              ["XP gesamt", progress.xp],
            ].map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-dim">{label}</dt>
                <dd className="font-display text-2xl font-extrabold leading-none">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
