import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import WordRow from "../../components/WordRow";
import { Bar, Empty, Glyph, ICON, Segmented } from "../../components/ui";
import { LEVELS } from "../../data/languages";
import { getSet } from "../../lib/sets";
import { useStore } from "../../lib/store";

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
  const mastered = words.filter((w) => status(w.id) === "mastered").length;
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
            label: `${c.name} (${words.filter((w) => w.category === c.id).length})`,
          }));

  return (
    <div>
      <Link to="/learn" className="mb-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-dim hover:text-ink">
        <ArrowLeft {...ICON} aria-hidden /> Zurück zu den Vokabeln
      </Link>

      <header className="mh-section-title mb-8 grid gap-5 border-b-2 border-ink pb-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-end">
        <Glyph char={set.glyph} size="lg" tone="red" />
        <div className="min-w-0">
          <h1 className="title">{set.name}</h1>
          <p className="mt-2 text-dim">{set.description}</p>
        </div>
        <Link to={`/lesson/${set.id}`} className="btn-ink">
          <Play {...ICON} aria-hidden /> Lektion starten
        </Link>
      </header>

      <dl className="mb-8 grid grid-cols-3 gap-6 sm:max-w-md">
        {[
          ["Wörter", words.length],
          ["Begonnen", done],
          ["Sicher", mastered],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="caption">{label}</dt>
            <dd className="font-display text-4xl font-extrabold leading-tight">{value}</dd>
          </div>
        ))}
        <div className="col-span-3">
          <Bar value={words.length ? done / words.length : 0} />
        </div>
      </dl>

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <Segmented<Filter>
          label="Status"
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
            { value: "course", label: "Kurs" },
          ]}
        />
        <select
          className="field w-auto max-w-full"
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
        <span className="text-sm text-dim">{shown.length} Wörter</span>
      </div>

      {shown.length ? (
        <ul className="rows border-y border-rule">
          {shown.slice(0, limit).map((w) => (
            <WordRow key={w.id} word={w} />
          ))}
        </ul>
      ) : (
        <Empty
          action={
            <button
              type="button"
              className="btn-line"
              onClick={() => {
                setFilter("all");
                setSub("all");
              }}
            >
              Filter zurücksetzen
            </button>
          }
        >
          Mit dieser Auswahl gibt es keine Wörter.
        </Empty>
      )}
      {shown.length > limit && (
        <button type="button" className="btn-line mt-4 w-full" onClick={() => setLimit((l) => l + PAGE)}>
          Weitere {Math.min(PAGE, shown.length - limit)} anzeigen ({shown.length - limit} übrig)
        </button>
      )}
    </div>
  );
}
