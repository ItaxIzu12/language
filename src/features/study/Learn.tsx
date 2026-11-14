import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import WordRow from "../../components/WordRow";
import { Bar, Glyph, ICON, PageHeader, Segmented, levelTone } from "../../components/ui";
import { LEVELS } from "../../data/languages";
import { LEVEL_INFO, levelSetId } from "../../lib/sets";
import { useStore } from "../../lib/store";
import { cx } from "../../lib/utils";

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
        title="Wortschatz"
        subtitle={`${lang.vocab.length} Wörter in ${lang.categories.length} Kategorien und ${LEVELS.length} Stufen.`}
      />

      <label className="relative mb-8 block">
        <span className="sr-only">Wörterbuch durchsuchen</span>
        <Search {...ICON} aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
        <input
          className="field pl-10"
          type="search"
          placeholder={`Suchen: Deutsch, ${lang.nativeName} oder ${lang.readingName} (auch ohne Tonzeichen)`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      {q ? (
        results.length ? (
          <>
            <p className="caption mb-2">{results.length === 80 ? "Die ersten 80 Treffer" : `${results.length} Treffer`}</p>
            <ul className="rows border-y border-rule">
              {results.map((w) => (
                <WordRow key={w.id} word={w} />
              ))}
            </ul>
          </>
        ) : (
          <p className="text-dim">Kein Wort gefunden für „{query}“. Versuch es mit einem kürzeren Suchwort.</p>
        )
      ) : (
        <>
          <div className="mb-6">
            <Segmented<View>
              label="Ansicht"
              value={view}
              onChange={setView}
              options={[
                { value: "categories", label: "Nach Kategorie" },
                { value: "levels", label: "Nach Stufe" },
              ]}
            />
          </div>

          {view === "levels" ? (
            <ul className="rows border-y-2 border-ink">
              {LEVELS.map((lv) => {
                const words = lang.vocab.filter((w) => w.level === lv);
                const done = words.filter((w) => status(w.id) !== "new").length;
                const mastered = words.filter((w) => status(w.id) === "mastered").length;
                const info = LEVEL_INFO[lv];
                return (
                  <li key={lv}>
                    <Link
                      to={`/learn/${levelSetId(lv)}`}
                      className="group grid grid-cols-[5rem_minmax(0,1fr)_auto] items-center gap-x-5 py-5 sm:grid-cols-[7rem_minmax(0,1fr)_14rem_auto]"
                    >
                      <span className={cx("font-display text-6xl font-black leading-none sm:text-7xl", levelTone(lv))}>{lv}</span>
                      <span className="min-w-0">
                        <span className="block text-lg font-bold">{info.title}</span>
                        <span className="block text-sm text-dim">{info.description}</span>
                      </span>
                      <span className="col-span-2 col-start-2 mt-3 sm:col-span-1 sm:col-start-3 sm:mt-0">
                        <span className="flex justify-between text-sm text-dim">
                          <span>
                            {done} / {words.length}
                          </span>
                          <span>{mastered} sicher</span>
                        </span>
                        <Bar value={words.length ? done / words.length : 0} className="mt-1.5" />
                      </span>
                      <ArrowRight
                        {...ICON}
                        aria-hidden
                        className="col-start-3 row-start-1 shrink-0 text-dim transition-transform group-hover:translate-x-1 sm:col-start-4"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="grid grid-cols-1 gap-x-10 border-t-2 border-ink md:grid-cols-2">
              {lang.categories.map((c) => {
                const words = lang.vocab.filter((w) => w.category === c.id);
                if (!words.length) return null;
                const done = words.filter((w) => status(w.id) !== "new").length;
                return (
                  <li key={c.id} className="min-w-0 border-b border-rule">
                    <Link to={`/learn/${c.id}`} className="group flex items-center gap-4 py-4">
                      <Glyph char={c.glyph} tone={done === words.length ? "red" : "ink"} />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="truncate font-semibold">{c.name}</span>
                          <span className="shrink-0 text-sm text-dim">
                            {done} / {words.length}
                          </span>
                        </span>
                        <span className="block truncate text-sm text-dim">{c.description}</span>
                        <Bar value={done / words.length} className="mt-2" />
                      </span>
                      <ArrowRight {...ICON} aria-hidden className="shrink-0 text-dim transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
