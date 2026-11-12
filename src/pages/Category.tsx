import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import WordRow from "../components/WordRow";
import { PageHeader, ProgressBar, Segmented } from "../components/ui";
import { useStore } from "../lib/store";

type Filter = "all" | "new" | "learning" | "mastered" | "course";

export default function Category() {
  const { categoryId } = useParams();
  const { lang, status } = useStore();
  const [filter, setFilter] = useState<Filter>("all");

  const category = lang.categories.find((c) => c.id === categoryId);
  if (!category) return <Navigate to="/learn" replace />;

  const words = lang.vocab.filter((w) => w.category === category.id);
  const done = words.filter((w) => status(w.id) !== "new").length;
  const shown = words.filter((w) =>
    filter === "all" ? true : filter === "course" ? w.learned : status(w.id) === filter,
  );

  return (
    <div>
      <Link to="/learn" className="muted mb-3 inline-block text-sm font-semibold hover:text-brand-600">
        ← Alle Kategorien
      </Link>
      <PageHeader
        title={`${category.icon} ${category.name}`}
        subtitle={category.description}
        action={
          <Link to={`/lesson/${category.id}`} className="btn-primary">
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

      <div className="mb-4">
        <Segmented<Filter>
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "Alle" },
            { value: "new", label: "Neu" },
            { value: "learning", label: "Am Lernen" },
            { value: "mastered", label: "Sicher" },
            { value: "course", label: "★ Kurs" },
          ]}
        />
      </div>

      <div className="card overflow-hidden">
        {shown.length ? (
          <ul>
            {shown.map((w) => (
              <WordRow key={w.id} word={w} />
            ))}
          </ul>
        ) : (
          <p className="muted p-6 text-center text-sm">Keine Wörter in dieser Ansicht.</p>
        )}
      </div>
    </div>
  );
}
