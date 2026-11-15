import AccountPanel from "./AccountPanel";
import { accountEnabled } from "./account";
import { Download, Moon, Sun, Upload } from "lucide-react";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { ICON, PageHeader, Segmented, SpeakButton } from "../../components/ui";
import CourseSwitcher from "../../components/CourseSwitcher";
import { useStore } from "../../lib/store";
import { cx } from "../../lib/utils";

export default function Settings() {
  const { username, lang, settings, updateSettings, progress, customWords, resetProgress, exportProgress, importProgress } = useStore();
  const fileInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const download = () => {
    const blob = new Blob([exportProgress()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `linguaflow-${lang.code}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage({ ok: true, text: "Sicherung gespeichert." });
  };

  const upload = async (file: File | undefined) => {
    if (!file) return;
    const ok = importProgress(await file.text());
    setMessage(
      ok
        ? { ok: true, text: "Sicherung eingelesen." }
        : { ok: false, text: "Die Datei ist keine LinguaFlow-Sicherung. Wähle eine Datei, die du hier exportiert hast." },
    );
  };

  return (
    <div className="max-w-3xl">
      <PageHeader title="Profil und Einstellungen" subtitle={username ? "Angemeldet als " + username : "Du lernst als Gast."} />

      {accountEnabled && <Section title="Lernkonto"><AccountPanel /></Section>}
      <Section title="Sprache">
        <p className="mb-3">Aktueller Kurs: {lang.name}</p>
        <CourseSwitcher/>
      </Section>

      <Section title="Darstellung">
        <Row label="Erscheinungsbild">
          <div role="group" aria-label="Erscheinungsbild" className="inline-flex border border-ink/70">
            {(
              [
                ["light", "Hell", Sun],
                ["dark", "Dunkel", Moon],
              ] as const
            ).map(([value, label, Icon], i) => (
              <button
                key={value}
                type="button"
                aria-pressed={settings.theme === value}
                onClick={() => updateSettings({ theme: value })}
                className={cx(
                  "inline-flex min-h-[40px] items-center gap-2 px-3 text-sm font-semibold",
                  i > 0 && "border-l border-ink/70",
                  settings.theme === value ? "bg-ink text-paper" : "hover:bg-wash",
                )}
              >
                <Icon size={16} strokeWidth={1.75} aria-hidden /> {label}
              </button>
            ))}
          </div>
        </Row>
        <Row label={`${lang.readingName} anzeigen`} hint="Ausschalten, um das Lesen der Schriftzeichen zu trainieren.">
          <Segmented<"on" | "off">
            label={`${lang.readingName} anzeigen`}
            value={settings.showReading ? "on" : "off"}
            onChange={(v) => updateSettings({ showReading: v === "on" })}
            options={[
              { value: "on", label: "An" },
              { value: "off", label: "Aus" },
            ]}
          />
        </Row>
      </Section>

      <Section title="Lernen">
        <Row label="Tagesziel" hint="Eine Lektion bringt etwa 100 bis 170 XP. Ab dem Tagesziel darfst du das Blatt abreißen.">
          <Segmented<string>
            label="Tagesziel"
            value={String(settings.dailyGoal)}
            onChange={(v) => updateSettings({ dailyGoal: Number(v) })}
            options={[
              { value: "30", label: "30" },
              { value: "50", label: "50" },
              { value: "100", label: "100" },
              { value: "200", label: "200" },
            ]}
          />
        </Row>
        <Row label="Sprechtempo" hint={`${Math.round(settings.rate * 100)} % – der Schildkröten-Knopf liest immer besonders langsam.`}>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0.5}
              max={1.2}
              step={0.05}
              value={settings.rate}
              onChange={(e) => updateSettings({ rate: Number(e.target.value) })}
              className="w-40 accent-[rgb(var(--cinnabar))]"
              aria-label="Sprechtempo"
            />
            <SpeakButton text={lang.listening[0]?.target ?? lang.vocab[0].target} size="sm" />
          </div>
        </Row>
      </Section>

      <Section title="Daten">
        <p className="max-w-[65ch] text-sm text-dim">
          Dein Fortschritt ({Object.keys(progress.cards).length} Wörter, {progress.xp} XP) und deine{" "}
          {customWords.length} Fundstücke {username ? "werden im Konto gespeichert" : "liegen in diesem Browser"}. Mit einer Sicherung ziehst
          du auch auf ein anderes Gerät um.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="btn-ink" onClick={download}>
            <Download {...ICON} aria-hidden /> Sicherung speichern
          </button>
          <button type="button" className="btn-line" onClick={() => fileInput.current?.click()}>
            <Upload {...ICON} aria-hidden /> Sicherung einlesen
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              void upload(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
        {message && (
          <p role="status" className={cx("mt-3 text-sm font-semibold", message.ok ? "text-jade" : "text-cinnabar")}>
            {message.text}
          </p>
        )}
        <div className="mt-8 border-t border-rule pt-4">
          <button
            type="button"
            className="btn border border-cinnabar text-cinnabar hover:bg-wash"
            onClick={() => {
              if (window.confirm(`Den gesamten Fortschritt für ${lang.name} löschen? Das lässt sich nur mit einer Sicherung rückgängig machen.`)) {
                resetProgress();
                setMessage({ ok: true, text: "Fortschritt gelöscht." });
              }
            }}
          >
            Fortschritt löschen
          </button>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-3 border-b-2 border-ink pb-2 text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule py-4">
      <div className="min-w-0 max-w-[40ch]">
        <div className="font-semibold">{label}</div>
        {hint && <div className="text-sm text-dim">{hint}</div>}
      </div>
      {children}
    </div>
  );
}
