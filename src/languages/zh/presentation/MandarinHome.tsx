import { moduleArt } from "./assets";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Check,
  ChevronRight,
  Flame,
  NotebookPen,
  Target,
} from "lucide-react";
import { modules } from "../../../app/navigation";
import { SpeakButton } from "../../../shared/ui/ui";
import { dayPlan } from "../../../shared/lib/plan";
import { useStore, XP_PER_LEVEL } from "../../../state/learningStore";
export default function MandarinHome() {
  const { lang, today, progress, status, streak, level, dueWords, todayActivity, settings } = useStore();
  const next =
    lang.categories.find((c) => lang.vocab.some((w) => w.category === c.id && status(w.id) === "new")) ??
    lang.categories[0];
  const date = new Date(today + "T12:00:00");
  const word = lang.vocab[Math.floor(Date.parse(today) / 86400000) % lang.vocab.length];
  const plan = dayPlan({
    activity: todayActivity,
    nextSetId: next.id,
    nextSetName: next.name,
    dueCount: dueWords.length,
    hasCards: Object.keys(progress.cards).length > 0,
    weekday: date.getDay(),
    dailyMinutes: settings.dailyMinutes,
    tonePractice: lang.tonePractice,
  });
  const done = plan.filter((item) => item.done).length;
  const xp = progress.xp % XP_PER_LEVEL;
  const percent = Math.floor((xp * 100) / XP_PER_LEVEL);

  return (
    <>
      <div className="mh-main">
        <section className="mh-hero">
          <div>
            <span className="mh-greeting" lang="zh">
              你好！
              <small aria-hidden="true">
                学<br />习
              </small>
            </span>
            <h1>{progress.xp ? "Willkommen zurück!" : "Willkommen im Mandarin-Kurs!"}</h1>
            <Link className="mh-start-lesson" to={"/lesson/" + next.id}>
              {Object.keys(progress.cards).length ? "Nächste Lektion starten" : "Erste Lektion starten"}{" "}
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
        <section className="mh-study">
          <div className="mh-heading">
            <h2>
              <CalendarDays />
              Heute lernen
            </h2>
            <Link to="/lernplan">
              Mein Lernplan <ChevronRight size={16} />
            </Link>
          </div>
          <div className="mh-cards">
            {modules.map((m) => (
              <Link to={m.to} key={m.to}>
                <img src={`${import.meta.env.BASE_URL}mandarin/${moduleArt[m.to]}.webp`} alt="" />
                <div>
                  <strong>{m.title}</strong>
                  <span>{m.hint}</span>
                  <ArrowRight size={19} />
                </div>
              </Link>
            ))}
          </div>
        </section>
        <div className="mh-bottom">
          <section>
            <h2>
              <NotebookPen />
              Wort des Tages
            </h2>
            <div className="mh-word">
              <strong lang="zh">{word.target}</strong>
              <div>
                {settings.showReading && <b>{word.reading}</b>} <SpeakButton text={word.target} />
                <p>{word.de}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <aside className="mh-stats" aria-label="Dein Lernstand">
        <section>
          <h2>
            <ChartNoAxesColumnIncreasing />
            Mein Fortschritt
          </h2>
          <Link className="mh-level" to="/chronicle">
            <span className="mh-ring" style={{ background: `conic-gradient(#f4cf91 ${percent}%, #594842 0)` }}>
              <b>{percent}%</b>
            </span>
            <span>
              <strong>Stufe {level}</strong>
              <small>Dein Lernlevel</small>
            </span>
          </Link>
          <progress aria-label="Fortschritt zur nächsten Stufe" value={xp} max={XP_PER_LEVEL} />
          <small>
            {xp} / {XP_PER_LEVEL} XP zur nächsten Stufe
          </small>
        </section>
        <section className="mh-streak">
          <h2>
            <Flame />
            Lernserie
          </h2>
          <strong>
            {streak} {streak === 1 ? "Tag" : "Tage"}
          </strong>
          <p>{streak ? "in Folge gelernt" : "Heute kannst du starten."}</p>
        </section>
        <section>
          <h2>
            <Target />
            Tagesziel
          </h2>
          <p>
            {done} / {plan.length} Aufgaben
          </p>
          <progress aria-label="Erledigte Aufgaben" value={done} max={plan.length} />
          <ul>
            {plan.map((b) => (
              <li key={b.id}>
                <Link to={b.to}>
                  <span className="mh-check" aria-label={b.done ? "erledigt" : "offen"}>
                    {b.done && <Check size={15} />}
                  </span>
                  {b.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </>
  );
}
