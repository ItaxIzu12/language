import { Link } from "react-router-dom";
import { ArrowRight, Check, BookOpen } from "lucide-react";
import { SpeakButton } from "../../../shared/ui/ui";
import { useDailyPlan } from "../../../shared/lib/useDailyPlan";

export default function MandarinHome() {
  const { lang, today, progress, settings, plan, recommended, completed, streak } = useDailyPlan();
  const word = lang.vocab.length ? lang.vocab[Math.floor(Date.parse(today) / 86400000) % lang.vocab.length] : undefined;
  const scene = lang.scenarios?.[0];
  return (
    <div className="study-home">
      <header className="study-welcome">
        <p className="study-caption">Mandarin · dein Lernalltag</p>
        <h1>{progress.xp ? "Schön, dass du wieder da bist." : "Dein erstes Gespräch beginnt hier."}</h1>
        <p>Ein Schritt nach dem anderen. In deinem Tempo.</p>
      </header>
      <div className="study-home-grid">
        <section className="study-next" aria-labelledby="next-title">
          <span className="study-caption">Dein nächster Schritt</span>
          <h2 id="next-title">{recommended?.title ?? "Dein Tagesplan ist erledigt."}</h2>
          <p>{recommended?.detail ?? "Du kannst für heute aufhören oder in Ruhe weitere Übungen entdecken."}</p>
          <Link className="btn-ink" to={recommended?.to ?? "/practice"}>
            {recommended ? "Jetzt üben" : "Frei üben"}
            <ArrowRight size={18} aria-hidden />
          </Link>
          <div className="study-next-note">
            Deine geplante Lernzeit: etwa {settings.dailyMinutes ?? 10} Minuten am Tag
          </div>
        </section>
        <section className="study-today" aria-labelledby="today-title">
          <div className="study-section-line">
            <h2 id="today-title">Heute vornehmen</h2>
            <span>
              {completed}/{plan.length}
            </span>
          </div>
          <ol>
            {plan.map((b, i) => (
              <li key={b.id}>
                <span className={b.done ? "study-step done" : "study-step"}>
                  {b.done ? <Check size={16} aria-label="Erledigt" /> : i + 1}
                </span>
                <div>
                  <span>{b.title}</span>
                  <small>{b.done ? "Für heute erledigt" : b.detail}</small>
                </div>
              </li>
            ))}
          </ol>
          <Link className="study-text-link" to="/lernplan">
            Lernplan ansehen <ArrowRight size={15} aria-hidden />
          </Link>
        </section>
      </div>
      <div className="study-summary" aria-label="Dein Lernstand">
        <div>
          <strong>{Object.keys(progress.cards).length}</strong>
          <span>Wörter begonnen</span>
        </div>
        <div>
          <strong>{progress.lessonsDone}</strong>
          <span>Lektionen abgeschlossen</span>
        </div>
        <div>
          <strong>{streak}</strong>
          <span>{streak === 1 ? "Tag" : "Tage"} in Folge</span>
        </div>
        <Link to="/chronicle">
          Fortschritt ansehen <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
      <div className="study-discover">
        <section>
          <p className="study-caption">Sprache im Alltag</p>
          <h2>{scene?.title ?? "Mit anderen ins Gespräch kommen"}</h2>
          <p>{scene?.goal ?? "Entdecke Wörter und ihre Bedeutung im Zusammenhang."}</p>
          {scene && (
            <Link className="study-text-link" to={"/dialoge/" + scene.id}>
              Situation entdecken <ArrowRight size={16} aria-hidden />
            </Link>
          )}
        </section>
        {word && (
          <section>
            <p className="study-caption">Ein Wort für heute</p>
            <div className="study-daily-word">
              <span className="hanzi" lang={lang.code}>
                {word.target}
              </span>
              <SpeakButton text={word.target} />
            </div>
            {settings.showReading && <p className="reading">{word.reading}</p>}
            <p>{word.de}</p>
            <Link className="study-text-link" to={"/learn?q=" + encodeURIComponent(word.target)}>
              <BookOpen size={16} aria-hidden />
              Im Wortschatz ansehen
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
