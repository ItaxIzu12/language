import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import WordRow from "../components/WordRow";
import { LevelBadge, PageHeader, ProgressBar, Segmented } from "../components/ui";
import { LEVELS } from "../data/languages";
import { LEVEL_INFO, levelSetId } from "../lib/sets";
import { useStore } from "../lib/store";

type View = "categories" | "levels";

export default function Learn() {
  const { lang, status } = useStore();
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("categories");

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
      .slice(0, 80);
  }, [q, lang.vocab]);

  return (
    <div>
      <PageHeader
        title="Lernen"
        subtitle={`${lang.vocab.length} Wörter in ${lang.categories.length} Kategorien und ${LEVELS.length} Stufen.`}
      />

      <input
        className="input mb-5"
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
        <>
          <div className="mb-5">
            <Segmented<View>
              value={view}
              onChange={setView}
              options={[
                { value: "categories", label: "📚 Nach Kategorie" },
                { value: "levels", label: "📈 Nach Stufe" },
              ]}
            />
          </div>

          {view === "levels" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {LEVELS.map((lv) => {
                const words = lang.vocab.filter((w) => w.level === lv);
                const done = words.filter((w) => status(w.id) !== "new").length;
                const mastered = words.filter((w) => status(w.id) === "mastered").length;
                const info = LEVEL_INFO[lv];
                return (
                  <Link
                    key={lv}
                    to={`/learn/${levelSetId(lv)}`}
                    className="card group flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-3xl transition group-hover:scale-110 dark:bg-brand-900/40">
                        {info.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-extrabold">Stufe {lv}</span>
                          <LevelBadge level={lv} />
                        </div>
                        <div className="muted text-sm font-semibold">{info.title}</div>
                      </div>
                    </div>
                    <p className="muted mt-3 flex-1 text-sm">{info.description}</p>
                    <div className="muted mt-3 flex justify-between text-xs font-medium">
                      <span>
                        {done} / {words.length} Wörter
                      </span>
                      <span>🏆 {mastered}</span>
                    </div>
                    <ProgressBar value={words.length ? done / words.length : 0} className="mt-1.5" />
                  </Link>
                );
              })}
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
                    <div className="mt-2 flex flex-wrap gap-1">
                      {LEVELS.map((lv) => {
                        const n = words.filter((w) => w.level === lv).length;
                        return n ? (
                          <span key={lv} className="chip bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            {lv} · {n}
                          </span>
                        ) : null;
                      })}
                    </div>
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
        </>
      )}
    </div>
  );
}
