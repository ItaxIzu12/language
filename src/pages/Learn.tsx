import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import WordRow from "../components/WordRow";
import { PageHeader, ProgressBar } from "../components/ui";
import { useStore } from "../lib/store";

export default function Learn() {
  const { lang, status } = useStore();
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return [];
    // Also match readings typed without tone marks ("pengyou" finds "péngyou").
    const plain = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const pq = plain(q).replace(/\s/g, "");
    return lang.vocab
      .filter(
        (w) =>
          w.target.includes(q) ||
          w.de.toLowerCase().includes(q) ||
          plain(w.reading).replace(/\s/g, "").includes(pq),
      )
      .slice(0, 60);
  }, [q, lang.vocab]);

  return (
    <div>
      <PageHeader
        title="Lernen"
        subtitle={`${lang.vocab.length} Wörter in ${lang.categories.length} Kategorien – von A1 bis B2.`}
      />

      <input
        className="input mb-6"
        type="search"
        placeholder={`Wörterbuch durchsuchen: Deutsch, ${lang.nativeName} oder ${lang.readingName} …`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Wörterbuch durchsuchen"
      />

      {q ? (
        <div className="card overflow-hidden">
          {results.length ? (
            <ul>
              {results.map((w) => (
                <WordRow key={w.id} word={w} />
              ))}
            </ul>
          ) : (
            <p className="muted p-6 text-center text-sm">Kein Wort gefunden für „{query}“.</p>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lang.categories.map((c) => {
            const words = lang.vocab.filter((w) => w.category === c.id);
            if (!words.length) return null;
            const done = words.filter((w) => status(w.id) !== "new").length;
            const mastered = words.filter((w) => status(w.id) === "mastered").length;
            return (
              <Link
                key={c.id}
                to={`/learn/${c.id}`}
                className="card group flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-2xl transition group-hover:scale-110 dark:bg-brand-900/40">
                    {c.icon}
                  </div>
                  {done === words.length && <span title="Alle Wörter begonnen">✅</span>}
                </div>
                <div className="mt-3 font-bold">{c.name}</div>
                <p className="muted mt-0.5 flex-1 text-sm">{c.description}</p>
                <div className="muted mt-3 flex justify-between text-xs font-medium">
                  <span>
                    {done} / {words.length} Wörter
                  </span>
                  <span>🏆 {mastered}</span>
                </div>
                <ProgressBar value={done / words.length} className="mt-1.5" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
