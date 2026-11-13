import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { PageHeader, Segmented, SpeakButton } from "../components/ui";
import { languages, upcomingLanguages } from "../data/languages";
import { useStore } from "../lib/store";
import { cx } from "../lib/utils";

export default function Settings() {
  const { lang, settings, updateSettings, progress, resetProgress, exportProgress, importProgress } = useStore();
  const fileInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  const download = () => {
    const blob = new Blob([exportProgress()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `linguaflow-fortschritt-${lang.code}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Fortschritt exportiert.");
  };

  const upload = async (file: File | undefined) => {
    if (!file) return;
    const ok = importProgress(await file.text());
    setMessage(ok ? "Fortschritt importiert." : "Die Datei konnte nicht gelesen werden.");
  };

  return (
    <div>
      <PageHeader title="Einstellungen" subtitle="Passe LinguaFlow an dich an." />

      <div className="space-y-5">
        <Section title="Sprache">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => updateSettings({ lang: l.code })}
                className={cx(
                  "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition",
                  l.code === lang.code
                    ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30"
                    : "border-slate-200 hover:border-brand-300 dark:border-slate-700",
                )}
              >
                <span className="text-3xl">{l.flag}</span>
                <span>
                  <span className="block font-bold">{l.name}</span>
                  <span className="muted block text-sm">
                    {l.nativeName} · {l.vocab.length} Wörter
                  </span>
                </span>
                {l.code === lang.code && <span className="ml-auto">✅</span>}
              </button>
            ))}
            {upcomingLanguages.map((l) => (
              <div key={l.code} className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 p-4 opacity-60 dark:border-slate-700">
                <span className="text-3xl">{l.flag}</span>
                <span>
                  <span className="block font-bold">{l.name}</span>
                  <span className="muted block text-sm">{l.nativeName} · bald verfügbar</span>
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Darstellung">
          <Row label="Design">
            <Segmented<"light" | "dark">
              value={settings.theme}
              onChange={(theme) => updateSettings({ theme })}
              options={[
                { value: "light", label: "☀️ Hell" },
                { value: "dark", label: "🌙 Dunkel" },
              ]}
            />
          </Row>
          <Row label={`${lang.readingName} anzeigen`} hint="Ausschalten, um das Lesen der Schriftzeichen zu trainieren.">
            <Segmented<"on" | "off">
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
          <Row label="Tagesziel" hint="Eine Lektion bringt etwa 100–170 XP.">
            <Segmented<string>
              value={String(settings.dailyGoal)}
              onChange={(v) => updateSettings({ dailyGoal: Number(v) })}
              options={[
                { value: "30", label: "Locker · 30" },
                { value: "50", label: "Normal · 50" },
                { value: "100", label: "Ernsthaft · 100" },
                { value: "200", label: "Intensiv · 200" },
              ]}
            />
          </Row>
          <Row label="Sprechtempo" hint={`${Math.round(settings.rate * 100)} % – 🐢 liest immer extra langsam.`}>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0.5}
                max={1.2}
                step={0.05}
                value={settings.rate}
                onChange={(e) => updateSettings({ rate: Number(e.target.value) })}
                className="w-40 accent-brand-600"
                aria-label="Sprechtempo"
              />
              <SpeakButton text={lang.listening[0]?.target ?? lang.vocab[0].target} size="sm" />
            </div>
          </Row>
        </Section>

        <Section title="Daten">
          <p className="muted text-sm">
            Dein Fortschritt ({Object.keys(progress.cards).length} Wörter, {progress.xp} XP) wird nur in diesem Browser
            gespeichert. Exportiere ihn als Sicherung oder um auf ein anderes Gerät umzuziehen.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className="btn-ghost" onClick={download}>
              ⬇ Exportieren
            </button>
            <button type="button" className="btn-ghost" onClick={() => fileInput.current?.click()}>
              ⬆ Importieren
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
            <button
              type="button"
              className="btn border border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-900/30"
              onClick={() => {
                if (window.confirm("Wirklich den gesamten Fortschritt für diese Sprache löschen?")) {
                  resetProgress();
                  setMessage("Fortschritt zurückgesetzt.");
                }
              }}
            >
              Fortschritt zurücksetzen
            </button>
          </div>
          {message && <p className="mt-3 text-sm font-semibold text-brand-600 dark:text-brand-300">{message}</p>}
        </Section>

        <p className="muted text-center text-xs">LinguaFlow v0.2 · Sprachausgabe nutzt die Stimmen deines Geräts.</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 py-3 first:pt-0 last:border-0 last:pb-0 dark:border-slate-800">
      <div>
        <div className="font-semibold">{label}</div>
        {hint && <div className="muted text-sm">{hint}</div>}
      </div>
      {children}
    </div>
  );
}
