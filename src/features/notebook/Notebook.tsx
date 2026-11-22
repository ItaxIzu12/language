import { Pencil, Play, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import ConfirmDialog from "../../shared/ui/ConfirmDialog";
import { Empty, ICON, PageHeader, SpeakButton } from "../../shared/ui/ui";
import { LEVELS, POS_LABELS } from "../../languages/registry";
import { CUSTOM_ID, useStore } from "../../state/learningStore";
import type { Level, Pos, VocabItem } from "../../languages/types";

const EMPTY = {
  target: "",
  reading: "",
  de: "",
  exTarget: "",
  exReading: "",
  exDe: "",
  pos: "phrase" as Pos,
  level: "A2" as Level,
};

/** The learner's own words: found in chats, series, conversations. */
export default function Notebook() {
  const { lang, customWords, addCustomWord, updateCustomWord, removeCustomWord, settings, username } = useStore();
  const draftStorageKey = "linguaflow.notebook-draft." + JSON.stringify([username ?? "guest", lang.code]);
  const [form, setForm] = useState<typeof EMPTY>(() => {
    try {
      return { ...EMPTY, ...JSON.parse(localStorage.getItem(draftStorageKey) ?? "{}") };
    } catch {
      return EMPTY;
    }
  });
  const [touched, setTouched] = useState(false);

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const pendingWord = customWords.find((word) => word.id === deleteId);
  const [editing, setEditing] = useState<string | null>(null);
  const newWordDraft = useRef(form);
  const firstInput = useRef<HTMLInputElement>(null);
  const extra = useRef<HTMLDetailsElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [notice, setNotice] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);
  useEffect(() => {
    if (editing) return;
    try {
      if (form.target || form.reading || form.de) {
        localStorage.setItem(draftStorageKey, JSON.stringify(form));
        setDraftSaved(true);
      } else {
        localStorage.removeItem(draftStorageKey);
        setDraftSaved(false);
      }
    } catch {
      setDraftSaved(false);
    }
  }, [form, editing, draftStorageKey]);

  const set = (patch: Partial<typeof EMPTY>) => setForm((f) => ({ ...f, ...patch }));
  const missing = {
    target: !form.target.trim(),
    reading: !form.reading.trim(),
    de: !form.de.trim(),
  };
  const duplicate = customWords.some(
    (w) => w.id !== editing && w.target === form.target.trim() && w.reading === form.reading.trim(),
  );
  const exampleIncomplete =
    [form.exTarget, form.exReading, form.exDe].some((v) => v.trim()) &&
    ![form.exTarget, form.exReading, form.exDe].every((v) => v.trim());
  const valid = !missing.target && !missing.reading && !missing.de && !duplicate && !exampleIncomplete;

  const close = () => {
    setOpen(false);
    setEditing(null);
    if (editing) setForm(newWordDraft.current);
    setTouched(false);
    toggle.current?.focus();
  };

  const edit = (word: VocabItem) => {
    if (!editing) newWordDraft.current = form;
    setForm({
      target: word.target,
      reading: word.reading,
      de: word.de,
      level: word.level,
      pos: word.pos,
      exTarget: word.example?.target ?? "",
      exReading: word.example?.reading ?? "",
      exDe: word.example?.de ?? "",
    });
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
    setForm(EMPTY);
    close();
  };

  return (
    <div>
      <PageHeader
        title="Fundstücke"
        subtitle="Sammle Wörter und Ausdrücke aus deinem Alltag und übe sie später als eigene Lektion."
      />

      {pendingWord && (
        <ConfirmDialog
          title="Fundstück löschen?"
          confirmLabel="Wort löschen"
          onCancel={() => setDeleteId(null)}
          onConfirm={() => {
            removeCustomWord(pendingWord.id);
            if (editing === pendingWord.id) close();
            setNotice(pendingWord.target + " wurde gelöscht.");
            setDeleteId(null);
            requestAnimationFrame(() => toggle.current?.focus());
          }}
        >
          Möchtest du „<span lang={lang.code}>{pendingWord.target}</span>“ ({pendingWord.de}) wirklich aus deinen
          Fundstücken löschen?
        </ConfirmDialog>
      )}
      <div className="mh-collection">
        <section>
          <h2 className="mb-3 text-xl font-bold">Meine Sammlung ({customWords.length})</h2>
          <div className="mh-editor">
            <button
              type="button"
              ref={toggle}
              className="btn-ink"
              aria-expanded={open}
              onClick={() => {
                if (open) close();
                else {
                  setOpen(true);
                  setNotice("");
                }
              }}
            >
              {editing ? <Pencil size={18} aria-hidden /> : <Plus size={18} aria-hidden />}{" "}
              {editing ? "Fundstück bearbeiten" : "Fundstück hinzufügen"}
            </button>
            {draftSaved && !editing && (
              <p className="my-2 text-sm">Ein unvollständiger Entwurf ist auf diesem Gerät gespeichert.</p>
            )}
            {open && (
              <form onSubmit={submit} noValidate className="space-y-4">
                <Input
                  inputRef={firstInput}
                  label={`Wort (${lang.nativeName})`}
                  value={form.target}
                  onChange={(v) => set({ target: v })}
                  error={
                    touched && missing.target
                      ? "Trag das Wort in Schriftzeichen ein."
                      : touched && duplicate
                        ? "Dieses Wort ist bereits in deinen Fundstücken."
                        : undefined
                  }
                  hanzi
                />
                <Input
                  label={lang.readingName}
                  hint={lang.readingHint}
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
                <details ref={extra} className="mh-extra">
                  <summary>Weitere Angaben</summary>
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
                      <select
                        className="field"
                        value={form.level}
                        onChange={(e) => set({ level: e.target.value as Level })}
                      >
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
                    <Input
                      label={`Satz in ${lang.readingName}`}
                      value={form.exReading}
                      onChange={(v) => set({ exReading: lang.normalizeReading?.(v) ?? v })}
                    />
                    <Input
                      label="Satz auf Deutsch"
                      value={form.exDe}
                      onChange={(v) => set({ exDe: v })}
                      error={
                        touched && exampleIncomplete
                          ? "Für einen Beispielsatz werden alle drei Felder gebraucht – oder lass alle drei leer."
                          : undefined
                      }
                    />
                  </fieldset>
                </details>

                <button type="submit" className="btn-ink">
                  {editing ? "Änderungen speichern" : "Wort aufnehmen"}
                </button>
                <button type="button" className="btn-line ml-2" onClick={close}>
                  Abbrechen
                </button>
              </form>
            )}
          </div>
          <p role="status" className="text-sm text-dim">
            {notice}
          </p>
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
                  <button
                    type="button"
                    aria-label={`${w.target} bearbeiten`}
                    title="Bearbeiten"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded hover:bg-wash"
                    onClick={() => edit(w)}
                  >
                    <Pencil size={17} aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label={`${w.target} löschen`}
                    aria-haspopup="dialog"
                    onClick={() => setDeleteId(w.id)}
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
      <input
        ref={inputRef}
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
