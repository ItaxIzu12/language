import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import WordRow from "../components/WordRow";
import { PageHeader, ProgressBar, Segmented } from "../components/ui";
import { LEVELS } from "../data/languages";
import { getSet } from "../lib/sets";
import { useStore } from "../lib/store";

type Filter = "all" | "new" | "learning" | "mastered" | "course";

const PAGE = 100;

/** Word list of one set: a category (filterable by level) or a level (filterable by category). */
export default function Category() {
  const { categoryId } = useParams();
  const { lang, status } = useStore();
  const [filter, setFilter] = useState<Filter>("all");
  const [sub, setSub] = useState("all");
  const [limit, setLimit] = useState(PAGE);

  const set = getSet(lang, categoryId);
  if (!set) return <Navigate to="/learn" replace />;

  const words = set.words;
  const done = words.filter((w) => status(w.id) !== "new").length;
  const shown = words.filter(
    (w) =>
      (filter === "all" ? true : filter === "course" ? w.learned : status(w.id) === filter) &&
      (sub === "all" || (set.kind === "category" ? w.level === sub : w.category === sub)),
  );

  const subOptions =
    set.kind === "category"
      ? LEVELS.filter((l) => words.some((w) => w.level === l)).map((l) => ({
          value: l as string,
          label: `${l} (${words.filter((w) => w.level === l).length})`,
        }))
      : lang.categories
          .filter((c) => words.some((w) => w.category === c.id))
          .map((c) => ({
            value: c.id,
            label: `${c.icon} ${c.name} (${words.filter((w) => w.category === c.id).length})`,
          }));

  return (
    <div>
      <Link to="/learn" className="muted mb-3 inline-block text-sm font-semibold hover:text-brand-600">
        ← Zur Übersicht
      </Link>
      <PageHeader
        title={`${set.icon} ${set.name}`}
        subtitle={set.description}
        action={
          <Link to={`/lesson/${set.id}`} className="btn-primary">
            ▶ Lektion starten
          </Link>
        }
      />

      <div className="card mb-5 p-4">
        <div className="muted mb-1.5 flex justify-between text-sm font-medium">
          <span>Fortschritt</span>
          <span>
            {done} / {words.length} Wörter
          </span>
        </div>
        <ProgressBar value={words.length ? done / words.length : 0} />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Segmented<Filter>
          value={filter}
          onChange={(f) => {
            setFilter(f);
            setLimit(PAGE);
          }}
          options={[
            { value: "all", label: "Alle" },
            { value: "new", label: "Neu" },
            { value: "learning", label: "Am Lernen" },
            { value: "mastered", label: "Sicher" },
            { value: "course", label: "★ Kurs" },
          ]}
        />
        <select
          className="input w-auto max-w-full"
          value={sub}
          aria-label={set.kind === "category" ? "Nach Stufe filtern" : "Nach Kategorie filtern"}
          onChange={(e) => {
            setSub(e.target.value);
            setLimit(PAGE);
          }}
        >
          <option value="all">{set.kind === "category" ? "Alle Stufen" : "Alle Kategorien"}</option>
          {subOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="muted text-sm">{shown.length} Wörter</span>
      </div>

      <div className="card overflow-hidden">
        {shown.length ? (
          <ul>
            {shown.slice(0, limit).map((w) => (
              <WordRow key={w.id} word={w} />
            ))}
          </ul>
        ) : (
          <p className="muted p-6 text-center text-sm">Keine Wörter in dieser Ansicht.</p>
        )}
      </div>
      {shown.length > limit && (
        <button type="button" className="btn-ghost mt-4 w-full" onClick={() => setLimit((l) => l + PAGE)}>
          Weitere {Math.min(PAGE, shown.length - limit)} anzeigen ({shown.length - limit} übrig)
        </button>
      )}
    </div>
  );
}
