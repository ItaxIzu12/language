import { Play, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Empty, ICON, PageHeader, SpeakButton } from "../../components/ui";
import { LEVELS, POS_LABELS } from "../../data/languages";
import { CUSTOM_ID, useStore } from "../../lib/store";
import type { Level, Pos } from "../../types";

const EMPTY = { target: "", reading: "", de: "", exTarget: "", exReading: "", exDe: "", pos: "phrase" as Pos, level: "A2" as Level };

/** The learner's own words: found in chats, series, conversations. */
export default function Notebook() {
  const { lang, customWords, addCustomWord, removeCustomWord, settings } = useStore();
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState(false);

  const set = (patch: Partial<typeof EMPTY>) => setForm((f) => ({ ...f, ...patch }));
  const missing = {
    target: !form.target.trim(),
    reading: !form.reading.trim(),
    de: !form.de.trim(),
  };
  const duplicate = lang.vocab.some((w) => w.target === form.target.trim() && w.reading === form.reading.trim());
  const exampleIncomplete =
    [form.exTarget, form.exReading, form.exDe].some((v) => v.trim()) && ![form.exTarget, form.exReading, form.exDe].every((v) => v.trim());
  const valid = !missing.target && !missing.reading && !missing.de && !duplicate && !exampleIncomplete;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    addCustomWord({
      target: form.target.trim(),
      reading: form.reading.trim(),
      de: form.de.trim(),
      pos: form.pos,
      level: form.level,
      example: form.exTarget.trim()
        ? { target: form.exTarget.trim(), reading: form.exReading.trim(), de: form.exDe.trim() }
        : undefined,
    });
    setForm(EMPTY);
    setTouched(false);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div>
        <PageHeader title="Fundstücke" subtitle="Wörter, die dir im echten Leben begegnen. Sie laufen danach in Lektionen, Karten und Quiz mit." />

        <form onSubmit={submit} noValidate className="space-y-4">
          <Input
            label={`Wort (${lang.nativeName})`}
            value={form.target}
            onChange={(v) => set({ target: v })}
            error={touched && missing.target ? "Trag das Wort in Schriftzeichen ein." : touched && duplicate ? "Dieses Wort gibt es schon im Wortschatz." : undefined}
            hanzi
          />
          <Input
            label={lang.readingName}
            hint="Tonzahlen werden umgewandelt: ni3 hao3 wird zu nǐ hǎo."
            value={form.reading}
            onChange={(v) => set({ reading: lang.normalizeReading?.(v) ?? v })}
            error={touched && missing.reading ? `Trag die Lesung in ${lang.readingName} ein.` : undefined}
          />
          <Input
            label="Deutsch"
            value={form.de}
            onChange={(v) => set({ de: v })}
            error={touched && missing.de ? "Trag die deutsche Bedeutung ein." : undefined}
          />
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="caption mb-1.5 block">Wortart</span>
              <select className="field" value={form.pos} onChange={(e) => set({ pos: e.target.value as Pos })}>
                {(Object.keys(POS_LABELS) as Pos[]).map((p) => (
                  <option key={p} value={p}>
                    {POS_LABELS[p]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="caption mb-1.5 block">Stufe</span>
              <select className="field" value={form.level} onChange={(e) => set({ level: e.target.value as Level })}>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <fieldset className="space-y-4 border-t border-rule pt-4">
            <legend className="float-left mb-3 w-full font-semibold">Beispielsatz (freiwillig)</legend>
            <Input label="Satz" value={form.exTarget} onChange={(v) => set({ exTarget: v })} hanzi />
            <Input label={`Satz in ${lang.readingName}`} value={form.exReading} onChange={(v) => set({ exReading: lang.normalizeReading?.(v) ?? v })} />
            <Input
              label="Satz auf Deutsch"
              value={form.exDe}
              onChange={(v) => set({ exDe: v })}
              error={touched && exampleIncomplete ? "Für einen Beispielsatz werden alle drei Felder gebraucht – oder lass alle drei leer." : undefined}
            />
          </fieldset>

          <button type="submit" className="btn-ink">
            <Plus {...ICON} aria-hidden /> Wort aufnehmen
          </button>
        </form>
      </div>

      <section className="lg:pt-2">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-2">
          <h2 className="text-lg font-bold">
            Gesammelt <span className="text-dim">({customWords.length})</span>
          </h2>
          {customWords.length > 0 && (
            <Link to={`/lesson/${CUSTOM_ID}`} className="btn-line">
              <Play {...ICON} aria-hidden /> Als Lektion lernen
            </Link>
          )}
        </div>
        {customWords.length ? (
          <ul className="rows border-b border-rule">
            {[...customWords].reverse().map((w) => (
              <li key={w.id} className="flex items-center gap-3 py-3">
                <span className="hanzi w-20 shrink-0 text-2xl font-bold">{w.target}</span>
                <span className="min-w-0 flex-1">
                  {settings.showReading && <span className="reading block text-sm">{w.reading}</span>}
                  <span className="block truncate">{w.de}</span>
                  {w.example && <span className="hanzi block truncate text-sm text-dim">{w.example.target}</span>}
                </span>
                <SpeakButton text={w.target} size="sm" />
                <button
                  type="button"
                  aria-label={`${w.target} löschen`}
                  onClick={() => {
                    if (window.confirm(`„${w.target}“ aus den Fundstücken löschen?`)) removeCustomWord(w.id);
                  }}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded text-dim hover:bg-wash hover:text-cinnabar"
                >
                  <Trash2 size={16} strokeWidth={1.75} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>Noch nichts gesammelt. Trag links dein erstes Wort ein – zum Beispiel eines aus einer echten Chatnachricht.</Empty>
        )}
      </section>
    </div>
  );
}

function Input({
  label,
  hint,
  value,
  onChange,
  error,
  hanzi,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hanzi?: boolean;
}) {
  return (
    <label className="block">
      <span className="caption mb-1.5 block">{label}</span>
      <input
        className={`field ${hanzi ? "hanzi text-xl" : ""} ${error ? "border-cinnabar" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        autoComplete="off"
      />
      {hint && !error && <span className="mt-1 block text-sm text-dim">{hint}</span>}
      {error && (
        <span role="alert" className="mt-1 block text-sm font-semibold text-cinnabar">
          {error}
        </span>
      )}
    </label>
  );
}
