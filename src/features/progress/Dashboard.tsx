import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bar, Glyph, ICON, Seal, SpeakButton, levelTone } from "../../components/ui";
import { LEVELS } from "../../data/languages";
import { mistakeWords } from "../../lib/mistakes";
import { dayPlan } from "../../lib/plan";
import { useStore } from "../../lib/store";
import { addDays, cx } from "../../lib/utils";
import type { Culture } from "../../types";

const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const WEEKDAYS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const WEEKDAYS_SHORT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

function parseDay(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Home: today's calendar sheet with the day plan (宜) and stumbling words (忌). */
export default function Dashboard() {
  const { lang, progress, settings, today, todayXp, todayActivity, dueWords, status, tearToday } = useStore();
  const [tearing, setTearing] = useState(false);

  const date = parseDay(today);
  const torn = !!progress.torn[today];

  // Next category that still has new words.
  const next =
    lang.categories.find((c) => lang.vocab.some((w) => w.category === c.id && status(w.id) === "new")) ??
    lang.categories[0];
  const nextWords = lang.vocab.filter((w) => w.category === next.id);
  const nextDone = nextWords.filter((w) => status(w.id) !== "new").length;

  const blocks = dayPlan({
    activity: todayActivity,
    nextSetId: next.id,
    nextSetName: next.name,
    dueCount: dueWords.length,
    hasCards: Object.keys(progress.cards).length > 0,
    weekday: date.getDay(),
    tonePractice: lang.tonePractice,
  });
  const blocksDone = blocks.filter((b) => b.done).length;
  const goalReached = todayXp >= settings.dailyGoal;
  const canTear = goalReached || blocksDone === blocks.length;
  const stumbling = mistakeWords(lang.vocab, progress).slice(0, 4);
  const tornTotal = Object.keys(progress.torn).length;

  const fortnight = Array.from({ length: 14 }, (_, i) => {
    const key = addDays(today, i - 13);
    return { key, xp: progress.days[key] ?? 0, torn: !!progress.torn[key], date: parseDay(key) };
  });

  const tear = () => {
    setTearing(true);
    window.setTimeout(() => {
      tearToday();
      setTearing(false);
    }, 880);
  };

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
      {/* The sheet(s): today's on top, tomorrow's underneath. */}
      <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
        {(torn || tearing) && <NextSheet date={parseDay(addDays(today, 1))} tornTotal={tornTotal + (tearing ? 1 : 0)} culture={lang.culture} />}
        {!torn && (
          <article className={cx("sheet overflow-hidden", tearing && "pointer-events-none origin-top-left animate-tear")}>
            <SheetHead date={date} culture={lang.culture} />

            <div className="grid sm:grid-cols-2">
              {/* 宜 – favourable today: the three blocks */}
              <section className="border-t-2 border-ink p-5 sm:border-r sm:border-r-rule">
                <h2 className="flex items-baseline gap-3">
                  <span className="hanzi text-3xl font-black text-jade">{lang.culture.favourable}</span>
                  <span className="font-bold">Günstig heute</span>
                  <span className="ml-auto text-sm text-dim">
                    {blocksDone}/{blocks.length}
                  </span>
                </h2>
                <ol className="rows mt-3">
                  {blocks.map((b) => (
                    <li key={b.id}>
                      <Link to={b.to} className="group flex items-start gap-3 py-3">
                        <span
                          className={cx(
                            "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border",
                            b.done ? "border-jade bg-jade text-paper" : "border-ink/60",
                          )}
                          aria-label={b.done ? "erledigt" : "offen"}
                        >
                          {b.done && <Check size={16} strokeWidth={2.5} aria-hidden />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={cx("block font-semibold", b.done && "text-dim line-through")}>{b.title}</span>
                          <span className="block text-sm text-dim">{b.when}</span>
                          <span className="block text-sm">{b.detail}</span>
                          {!b.done && b.progress > 0 && <Bar value={b.progress} tone="jade" className="mt-2" />}
                        </span>
                        <ArrowRight {...ICON} aria-hidden className="mt-1 shrink-0 text-dim transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>

              {/* 忌 – avoid: stumbling words */}
              <section className="border-t-2 border-ink p-5">
                <h2 className="flex items-baseline gap-3">
                  <span className="hanzi text-3xl font-black text-cinnabar">{lang.culture.avoid}</span>
                  <span className="font-bold">Stolpersteine</span>
                </h2>
                {stumbling.length ? (
                  <>
                    <ul className="rows mt-3">
                      {stumbling.map((w) => (
                        <li key={w.id} className="flex items-center gap-3 py-2.5">
                          <span className="hanzi w-16 shrink-0 text-xl font-bold">{w.target}</span>
                          <span className="min-w-0 flex-1">
                            {settings.showReading && <span className="reading block text-sm">{w.reading}</span>}
                            <span className="block truncate text-sm text-dim">{w.de}</span>
                          </span>
                          <span className="text-sm text-dim" title="so oft falsch beantwortet">
                            {progress.cards[w.id].wrong}×
                          </span>
                          <SpeakButton text={w.target} size="sm" />
                        </li>
                      ))}
                    </ul>
                    <Link to="/review?tab=mistakes" className="btn-line mt-3 w-full">
                      Fehlerheft öffnen
                    </Link>
                  </>
                ) : (
                  <p className="mt-3 text-sm text-dim">
                    Noch keine. Wörter, die du falsch beantwortest, sammeln sich hier – damit du weißt, worauf du heute achten
                    solltest.
                  </p>
                )}
              </section>
            </div>

            {/* Tear-off strip */}
            <footer className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t-2 border-ink p-5">
              <div className="min-w-[10rem] flex-1">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-semibold">Tagesziel</span>
                  <span className="text-dim">
                    {todayXp} / {settings.dailyGoal} XP
                  </span>
                </div>
                <Bar value={todayXp / settings.dailyGoal} tone="red" className="mt-1.5" />
              </div>
              <button type="button" className="btn-red" disabled={!canTear || tearing} onClick={tear}>
                Blatt abreißen
              </button>
              {!canTear && (
                <p className="w-full text-sm text-dim">
                  Noch {settings.dailyGoal - todayXp} XP oder alle drei Blöcke – dann darfst du das Blatt abreißen.
                </p>
              )}
            </footer>
          </article>
        )}
      </div>

      {/* Beside the sheet */}
      <aside className="space-y-10">
        <section>
          <h2 className="flex items-baseline justify-between border-b-2 border-ink pb-2">
            <span className="font-bold">Abgerissene Blätter</span>
            <span className="font-display text-4xl font-extrabold leading-none">{tornTotal}</span>
          </h2>
          <ol className="mt-3 grid grid-cols-7 gap-1.5" aria-label="Die letzten 14 Tage">
            {fortnight.map((d) => (
              <li
                key={d.key}
                title={`${d.date.getDate()}. ${MONTHS[d.date.getMonth()]}: ${d.xp} XP${d.torn ? ", abgerissen" : ""}`}
                className={cx(
                  "flex aspect-[4/5] flex-col items-center justify-center rounded-sm border text-center",
                  d.torn
                    ? "border-cinnabar bg-cinnabar text-on-cinnabar"
                    : d.xp > 0
                      ? "border-ink/60 bg-wash"
                      : "border-rule text-dim",
                  d.key === today && "outline outline-2 outline-offset-2 outline-ink",
                )}
              >
                <span className="font-display text-lg font-extrabold leading-none">{d.date.getDate()}</span>
                <span className="text-[10px] font-semibold uppercase">{WEEKDAYS_SHORT[d.date.getDay()]}</span>
              </li>
            ))}
          </ol>
          <p className="mt-2 text-sm text-dim">Rot: Blatt abgerissen. Grau: gelernt, Blatt hängt noch.</p>
        </section>

        <section>
          <h2 className="border-b-2 border-ink pb-2 font-bold">Weiter im Wortschatz</h2>
          <Link to={`/learn/${next.id}`} className="group mt-3 flex items-center gap-4">
            <Glyph char={next.glyph} />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">{next.name}</span>
              <span className="block text-sm text-dim">
                {nextDone} von {nextWords.length} Wörtern begonnen
              </span>
              <Bar value={nextWords.length ? nextDone / nextWords.length : 0} className="mt-2" />
            </span>
            <ArrowRight {...ICON} aria-hidden className="shrink-0 text-dim transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

        <section>
          <h2 className="border-b-2 border-ink pb-2 font-bold">Stand je Stufe</h2>
          <ul className="rows">
            {LEVELS.map((lv) => {
              const words = lang.vocab.filter((w) => w.level === lv);
              const done = words.filter((w) => status(w.id) !== "new").length;
              return (
                <li key={lv} className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-2.5">
                  <span className={cx("font-display text-2xl font-extrabold leading-none", levelTone(lv))}>{lv}</span>
                  <Bar value={words.length ? done / words.length : 0} />
                  <span className="text-sm text-dim">
                    {done} / {words.length}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </aside>
    </div>
  );
}

function SheetHead({ date, culture, quiet }: { date: Date; culture: Culture; quiet?: boolean }) {
  const zh = culture.localDate(date);
  const weekend = date.getDay() === 0 || date.getDay() === 6;
  return (
    <header>
      <div className="bg-band text-white">
        <div className="perforation" aria-hidden />
        <div className="flex items-baseline justify-between gap-3 px-5 pb-2 pt-1">
          <span className="font-display text-2xl font-extrabold uppercase leading-none">
            {MONTHS[date.getMonth()]} {date.getFullYear()}
          </span>
          {zh && <span className="hanzi text-xl font-bold">{zh.month}</span>}
        </div>
      </div>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-end gap-x-5 gap-y-2 p-5">
        <div
          className={cx("font-display font-black leading-[0.8]", weekend ? "text-cinnabar" : "text-ink", quiet && "opacity-40")}
          style={{ fontSize: "clamp(7.5rem, 24vw, 13rem)" }}
        >
          {date.getDate()}
        </div>
        <div className="min-w-0 pb-2">
          <h1 className="font-display text-4xl font-extrabold uppercase leading-none sm:text-5xl">{WEEKDAYS[date.getDay()]}</h1>
          {zh && (
            <>
              <p className="hanzi mt-2 text-3xl font-bold leading-tight">{zh.weekday}</p>
              {zh.traditional && (
                <p className="mt-1 text-sm text-dim">
                  {culture.traditionalLabel} <span className="hanzi text-base text-ink">{zh.traditional}</span>
                </p>
              )}
            </>
          )}
        </div>
        {zh && !quiet && (
          <div className="col-span-2 flex items-center gap-3 border-t border-rule pt-3">
            <SpeakButton text={zh.sentence} size="sm" />
            <p className="min-w-0">
              <span className="hanzi block text-lg font-medium">{zh.sentence}</span>
              <span className="reading block text-sm">{zh.sentenceReading}</span>
            </p>
          </div>
        )}
      </div>
    </header>
  );
}

/** The sheet under today's: shown once today's has been torn off. */
function NextSheet({ date, tornTotal, culture }: { date: Date; tornTotal: number; culture: Culture }) {
  return (
    <article className="sheet overflow-hidden">
      <SheetHead date={date} culture={culture} quiet />
      <div className="flex flex-wrap items-center gap-6 border-t-2 border-ink p-5">
        <Seal text={culture.seal} />
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold">Das Blatt von heute ist abgerissen.</h2>
          <p className="mt-1 max-w-[52ch] text-dim">
            Blatt Nummer {tornTotal}. Das nächste wartet morgen – wer mag, lernt einfach weiter, die Punkte zählen trotzdem.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/review" className="btn-ink">
              Karten wiederholen
            </Link>
            <Link to="/quiz" className="btn-line">
              Quiz starten
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
