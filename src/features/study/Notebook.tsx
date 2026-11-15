import { Pencil, Play, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Empty, ICON, PageHeader, SpeakButton } from "../../components/ui";
import { LEVELS, POS_LABELS } from "../../data/languages";
import { CUSTOM_ID, useStore } from "../../lib/store";
import type { Level, Pos, VocabItem } from "../../types";

const EMPTY = { target: "", reading: "", de: "", exTarget: "", exReading: "", exDe: "", pos: "phrase" as Pos, level: "A2" as Level };

/** The learner's own words: found in chats, series, conversations. */
export default function Notebook({ startAdding = false }: { startAdding?: boolean }) {
  const { lang, customWords, addCustomWord, updateCustomWord, removeCustomWord, settings } = useStore();
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState(false);

  const [open, setOpen] = useState(startAdding);
  const [editing, setEditing] = useState<string | null>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const extra = useRef<HTMLDetailsElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [notice, setNotice] = useState("");

  const set = (patch: Partial<typeof EMPTY>) => setForm((f) => ({ ...f, ...patch }));
  const missing = {
    target: !form.target.trim(),
    reading: !form.reading.trim(),
    de: !form.de.trim(),
  };
  const duplicate = lang.vocab.some((w) => w.id !== editing && w.target === form.target.trim() && w.reading === form.reading.trim());
  const exampleIncomplete =
    [form.exTarget, form.exReading, form.exDe].some((v) => v.trim()) && ![form.exTarget, form.exReading, form.exDe].every((v) => v.trim());
  const valid = !missing.target && !missing.reading && !missing.de && !duplicate && !exampleIncomplete;

  const close = () => {
    setOpen(false);
    setEditing(null);
    setForm(EMPTY);
    setTouched(false);
    toggle.current?.focus();
  };

  const edit = (word: VocabItem) => {
    setForm({ target: word.target, reading: word.reading, de: word.de, level: word.level, pos: word.pos,
      exTarget: word.example?.target ?? "", exReading: word.example?.reading ?? "", exDe: word.example?.de ?? "" });
    setTouched(false);
    setNotice("");
    setEditing(word.id);
    setOpen(true);
    requestAnimationFrame(() => {
      if (extra.current) extra.current.open = Boolean(word.example);
      firstInput.current?.focus();
      firstInput.current?.scrollIntoView({ block: "center" });
    });
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) {
      if (exampleIncomplete && extra.current) extra.current.open = true;
      return;
    }
    const word = {
      target: form.target.trim(),
      reading: form.reading.trim(),
      de: form.de.trim(),
      pos: form.pos,
      level: form.level,
      example: form.exTarget.trim()
        ? { target: form.exTarget.trim(), reading: form.exReading.trim(), de: form.exDe.trim() }
        : undefined,
    };
    if (editing) updateCustomWord(editing, word);
    else addCustomWord(word);
    setNotice(form.target.trim() + " wurde gespeichert.");
    close();
  };

  return (
    <div>
      <PageHeader title="Fundstücke" subtitle="Sammle Wörter und Ausdrücke aus deinem Alltag und übe sie später als eigene Lektion." />

      <div className="mh-collection">
        <section>
          <h2 className="mb-3 text-xl font-bold">Meine Sammlung ({customWords.length})</h2>
          <div className="mh-editor">
          <button type="button" ref={toggle} className="btn-ink" aria-expanded={open} onClick={() => {
            if (open) close();
            else { setOpen(true); setNotice(""); }
          }}>{editing ? <Pencil size={18} aria-hidden/> : <Plus size={18} aria-hidden/>} {editing ? "Fundstück bearbeiten" : "Fundstück hinzufügen"}</button>
          {open && <form onSubmit={submit} noValidate className="space-y-4">
            <Input
              inputRef={firstInput}
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
            <details ref={extra} className="mh-extra"><summary>Weitere Angaben</summary>
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
            </details>

            <button type="submit" className="btn-ink">
              {editing ? "Änderungen speichern" : "Wort aufnehmen"}
            </button>
            <button type="button" className="btn-line ml-2" onClick={close}>Abbrechen</button>
          </form>}
          </div>
          <p role="status" className="text-sm text-dim">{notice}</p>
          <div className="my-3">
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
                  <button type="button" aria-label={`${w.target} bearbeiten`} title="Bearbeiten"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded hover:bg-wash"
                    onClick={() => edit(w)}><Pencil size={17} aria-hidden /></button>
                  <button
                    type="button"
                    aria-label={`${w.target} löschen`}
                    onClick={() => {
                      if (!window.confirm(`„${w.target}“ aus den Fundstücken löschen?`)) return;
                      removeCustomWord(w.id);
                      if (editing === w.id) close();
                      setNotice(w.target + " wurde gelöscht.");
                    }}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded text-dim hover:bg-wash hover:text-cinnabar"
                  >
                    <Trash2 size={16} strokeWidth={1.75} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Hier erscheinen deine gespeicherten Wörter und Ausdrücke.</Empty>
          )}
        </section>
      </div>
    </div>
  );
}

function Input({
  label,
  inputRef,
  hint,
  value,
  onChange,
  error,
  hanzi,
}: {
  label: string;
  inputRef?: React.Ref<HTMLInputElement>;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hanzi?: boolean;
}) {
  return (
    <label className="block">
      <span className="caption mb-1.5 block">{label}</span>
      <input ref={inputRef}
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
