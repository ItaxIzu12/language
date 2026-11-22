import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { PageHeader } from "../../shared/ui/ui";
import { useDailyPlan } from "../../shared/lib/useDailyPlan";
export default function Dashboard() {
  const { plan, completed, settings } = useDailyPlan();
  return (
    <div>
      <PageHeader
        title="Dein Lernplan"
        subtitle={`Etwa ${settings.dailyMinutes ?? 10} Minuten am Tag. Die Reihenfolge ist eine Empfehlung, kein Zeitplan.`}
        action={
          <Link className="btn-line" to="/settings">
            Lernzeit ändern
          </Link>
        }
      />
      <p className="mb-6 text-dim">
        {completed} von {plan.length} Aufgaben erledigt
      </p>
      <ol className="study-plan-list">
        {plan.map((b, index) => (
          <li key={b.id}>
            <span className={"study-step" + (b.done ? " done" : "")}>
              {b.done ? <Check size={18} aria-label="Erledigt" /> : index + 1}
            </span>
            <div>
              <h2>{b.title}</h2>
              <p>{b.detail}</p>
              <small>{b.done ? "Heute erledigt" : "Noch offen"}</small>
            </div>
            <Link className={b.done ? "btn-line" : "btn-ink"} to={b.to}>
              {b.done ? "Noch einmal" : "Starten"}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </li>
        ))}
      </ol>
      <div className="study-footnote">
        <Link to="/heute">Zurück zu Heute</Link>
        <Link to="/lernkalender">Optional: Lernkalender entdecken</Link>
      </div>
    </div>
  );
}
