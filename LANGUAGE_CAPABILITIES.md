# LinguaFlow · Language Capability System

Ein Sprachpaket deklariert, was seine Sprache ausmacht und welche besonderen Übungen es mitbringt. Gemeinsame Lernfunktionen lesen diese Deklaration, statt Sprachcodes abzufragen. Das Dokument beschreibt das Konzept (Abschnitte 1–5) und den Plan für die Integration weiterer Sprachen (Abschnitt 6). Es baut auf der Sprachregistrierung in `src/languages/registry.ts` und der Paketbeschreibung in `docs/ARCHITEKTUR.md` („Lern-Engine und Sprachpakete“) auf. Gesamtarchitektur und priorisierter Plan: [ARCHITECTURE.md](ARCHITECTURE.md).

Alle Typen und Dateinamen in diesem Dokument sind Entwürfe. Implementiert ist nur, was als „heute“ gekennzeichnet ist.

---

## 1. Ausgangslage

Heute sind Sprachfähigkeiten verstreute, optionale Felder im Interface `Language` (`src/languages/types.ts`):

| Heutiges Feld                            | Verwendung                                                                                                  |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `ttsLang`                                | Sprachausgabe und Spracherkennung (`shared/audio/tts.ts`, `speech.ts`)                                      |
| `readingName`, `readingHint`             | Beschriftungen in Einstellungen, Fundstücken, Rollenspiel                                                   |
| `normalizeReading`                       | Fundstücke: Tonzahlen zu Tonzeichen (`zh/linguistics/pinyin.ts`, `numbersToMarks`)                          |
| `tonePractice`, `toneModule: "mandarin"` | Tonlabor in Navigation (`app/navigation.ts`), Route (`app/routes.tsx`) und Abendplan (`shared/lib/plan.ts`) |
| `culture`                                | Lernwelt: Theme, Almanach-Motive, Datum in der Lernsprache                                                  |

Daneben gibt es Annahmen ohne Feld: Zerlegung in Einzelzeichen (`sentenceTiles`), die CSS-Klasse `hanzi`, feste CEFR-Stufen und die Glosse `de`. Die vollständige Befundliste steht in [ARCHITECTURE.md](ARCHITECTURE.md), Abschnitt 1.6.

`docs/ARCHITEKTUR.md` hält bereits fest: Eine Tonsprache bekommt das Tonlabor nicht allein dadurch, dass sie Töne besitzt. Diese Regel bleibt der Kern des Konzepts: **Merkmal** und **Modul** sind getrennt.

---

## 2. Begriffe

| Begriff          | Bedeutung                                                                                                                           | Beispiel                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Merkmal**      | Serialisierbare Aussage über die Sprache. Bestimmt, welche Inhaltsfelder Pflicht sind und wie gemeinsame Funktionen sich verhalten. | „hat vier Töne plus neutralen Ton“, „Nomen haben ein Genus“ |
| **Sprachhilfe**  | Reine Funktion ohne UI und ohne Netzwerk, im Paket unter `linguistics/`. Wird nicht exportiert.                                     | `numbersToMarks`, `tonesOf`, künftige Segmentierung         |
| **Spezialmodul** | Übung mit eigener UI, die sich nicht als Parametrisierung einer gemeinsamen Übung beschreiben lässt. Wird mit einer ID deklariert.  | Tonlabor `zh.tones`, später Strichreihenfolge               |
| **Lernwelt**     | Kulturelle Gestaltung innerhalb des Kurses (`culture`, `presentation`, `theme.css`). Kein Einfluss auf Lernlogik.                   | Abreißkalender 黄历 für Mandarin                            |

Merkmale sind Daten, Sprachhilfen sind Code, Spezialmodule sind UI. Diese Trennung hält den Export für Django frei von Funktionen und Komponenten, wie es `scripts/test-architecture.mjs` heute schon prüft.

---

## 3. Entwurf der Deklaration

### 3.1 Typen

```ts
// src/languages/types.ts (Entwurf, additiv)
export interface LanguageCapabilities {
  /** Schriftsysteme in Lernreihenfolge. Das erste ist die Hauptschrift von VocabItem.target. */
  scripts: ScriptCapability[];
  /** Lesungs- bzw. Umschriftsystem, falls die Schrift die Aussprache nicht direkt zeigt. */
  reading?: {
    id: "pinyin" | "kana" | "romaja" | "ipa";
    label: string; // UI-Beschriftung, ersetzt readingName
    hint?: string; // ersetzt readingHint
    requiredForVocab: boolean;
  };
  tones?: {
    inventory: Array<{ id: string; label: string }>; // z. B. "1".."5" oder "ngang".."nang"
    marking: "diacritic" | "number";
  };
  grammaticalGender?: { values: Array<"m" | "f" | "n">; withArticle: boolean };
  registers?: { values: string[] }; // Höflichkeits- bzw. Anredestufen
  varieties?: Array<{ tag: string; label: string; default?: boolean }>; // regionale Varianten
  levelSystems: Array<{ id: "cefr" | "hsk3" | "jlpt" | "topik" | string; levels: string[]; sourceNote: string }>;
  /** Installierte Spezialmodule, z. B. "zh.tones". */
  modules: string[];
}

export interface ScriptCapability {
  id: "hanzi" | "kana" | "kanji" | "hangul" | "latin";
  /** Wie Sätze für Satzbau-Übungen zerlegt werden. "none" deaktiviert sie. */
  segmentation: "character" | "space" | "helper" | "none";
}

/** Reine Funktionen. Werden nicht exportiert und nicht an Django übergeben. */
export interface LanguageLinguistics {
  normalizeReading?(input: string): string;
  segment?(sentence: string): string[] | null;
  searchKey?(text: string): string; // z. B. Tonzeichen entfernen
  comparable?(text: string): string; // Vorverarbeitung für SpeakCheck
}
```

`Language` erhält `capabilities: LanguageCapabilities` (Pflicht) und `linguistics?: LanguageLinguistics`. `scripts/export-courses.ts` entfernt `linguistics` ausdrücklich, statt sich darauf zu verlassen, dass `JSON.stringify` Funktionen verwirft.

**Warum diese Felder und keine weiteren.** Jedes Merkmal hat eine konkrete Wirkung in vorhandenen Funktionen (Abschnitt 4) oder ist Pflichtvoraussetzung für eine geplante Sprache (Abschnitt 6). Strichreihenfolge oder Kasus sind bewusst **keine** Merkmale: Sie verändern keine gemeinsame Funktion, sondern sind Inhalte des Knowledge Tree bzw. künftige Spezialmodule.

### 3.2 Mandarin nach der Umstellung

```ts
// src/languages/zh/config.ts (Entwurf)
capabilities: {
  scripts: [{ id: "hanzi", segmentation: "character" }],
  reading: { id: "pinyin", label: "Pinyin", hint: "Tonzahlen werden umgewandelt: ni3 hao3 wird zu nǐ hǎo.", requiredForVocab: true },
  tones: { inventory: [{ id: "1", label: "1. Ton" }, /* … */ { id: "5", label: "Neutraler Ton" }], marking: "diacritic" },
  varieties: [{ tag: "zh-CN", label: "Hochchinesisch (Festland)", default: true }],
  levelSystems: [{ id: "cefr", levels: ["A1", "A2", "B1", "B2"], sourceNote: "Näherung aus HSK 3.0, siehe README" }],
  modules: ["zh.tones"],
},
```

Die Labels der Töne kommen aus dem vorhandenen `TONE_NAMES` in `zh/linguistics/pinyin.ts`. Die CEFR-Zuordnung bleibt als Näherung gekennzeichnet, wie es README („Abdeckung bis B2“) beschreibt.

### 3.3 Abbildung bestehender Felder

| Heute                                          | Ziel                                                     | Übergang                                                                         |
| ---------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `tonePractice: true`, `toneModule: "mandarin"` | `capabilities.tones` (Merkmal) + `modules: ["zh.tones"]` | Alte Felder eine Version lang aus Capabilities ableiten, dann entfernen.         |
| `readingName`, `readingHint`                   | `capabilities.reading.label`, `.hint`                    | Getter im Store, bis alle Features umgestellt sind.                              |
| `normalizeReading`                             | `linguistics.normalizeReading`                           | Direkte Umstellung in `Notebook.tsx`.                                            |
| `sentenceTiles()` in `shared/lib/exercises.ts` | `scripts[0].segmentation` + `linguistics.segment`        | `"character"` übernimmt die heutige Logik als Standard.                          |
| `toneViews` in `app/languageViews.ts`          | `moduleViews["zh.tones"]`                                | Gleiche Komponente, neuer Schlüssel.                                             |
| `upcomingLanguages`                            | Manifest mit `available: false`                          | Landing (`features/welcome/Landing.tsx`) und `CoursePicker.tsx` lesen Manifeste. |
| `Level` (fest)                                 | `levelSystems` je Kurs, `Level` wird `string`            | CEFR bleibt Standard; Typ wird erst mit der zweiten Sprache geöffnet.            |

---

## 4. Wie gemeinsame Funktionen Capabilities nutzen

Jede Zeile ersetzt eine heutige Mandarin-Annahme durch eine Abfrage. Keine Lernfunktion wird pro Sprache kopiert.

| Gemeinsame Funktion                                      | Liest                                                                           | Verhalten                                                                                                                             |
| -------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Satzbau in `features/lessons/Lesson.tsx`                 | `scripts[0].segmentation`, `linguistics.segment`                                | `character`: wie heute. `space`: Wortbausteine. `helper`: Paketfunktion (z. B. Japanisch ohne Leerzeichen). `none`: Schritt entfällt. |
| Suche in `features/vocabulary/Learn.tsx`, `Category.tsx` | `linguistics.searchKey`, `reading.label`                                        | Suchschlüssel je Sprache; Platzhalter nennt das tatsächliche Lesungssystem.                                                           |
| Lesung anzeigen (`Settings.tsx`, `WordRow.tsx`, Quiz)    | `reading`                                                                       | Ohne Lesungssystem entfallen Schalter und Zeile; `showReading` bleibt im Lernstand gültig.                                            |
| Wortdetails (`shared/learning/WordRow.tsx`)              | `grammaticalGender`, `registers`, `varieties`                                   | Zeigt Artikel/Genus, Register oder Variante, wenn das Wort die Felder trägt.                                                          |
| Fundstücke (`features/notebook/Notebook.tsx`)            | `reading.requiredForVocab`, `grammaticalGender`, `linguistics.normalizeReading` | Pflichtfelder des Formulars und Validierung folgen der Deklaration.                                                                   |
| SpeakCheck (`shared/learning/SpeakCheck.tsx`)            | `linguistics.comparable`                                                        | Sprachspezifische Vorverarbeitung vor `similarity()`; die Bewertungslogik bleibt eine.                                                |
| Navigation und Guard (`app/navigation.ts`)               | `modules`                                                                       | `isModuleAvailable` prüft `modules.includes(id)` und `moduleViews[id]` statt `toneModule === "mandarin"`.                             |
| Abendplan (`shared/lib/plan.ts`)                         | `modules` + `moduleViews[id].planSlot`                                          | Module tragen sich selbst in die Rotation ein; `plan.ts` kennt keinen Modulpfad mehr.                                                 |
| Stufenanzeige (`shared/lib/sets.ts`, `LevelTag`)         | `levelSystems`                                                                  | Stufenfilter und Beschriftungen aus dem Kurs.                                                                                         |

### 4.1 Spezialmodule

```ts
// src/app/languageViews.ts (Entwurf)
export const moduleViews: Record<string, ModuleView> = {
  "zh.tones": {
    route: "/tones",
    nav: { title: "Tonlabor", hint: "Töne nach Gehör erkennen", icon: AudioWaveform },
    view: TonePractice,
    planSlot: { detail: "Eine Runde im Tonlabor" },
    requires: (lang) => lang.vocab.length > 0,
  },
};
```

Regeln:

1. Ein Modul lebt im Paketordner seiner ersten Sprache (`src/languages/zh/exercises/tones/`). Die ID trägt das Sprachpräfix, solange es nur dort sinnvoll ist.
2. **Generalisieren statt kopieren.** Braucht eine zweite Sprache dieselbe Übungsform (z. B. Vietnamesisch eine Tonunterscheidung), wird das Modul nach `src/shared/learning/` verschoben und über `capabilities.tones.inventory` sowie eine Sprachhilfe `tonesOf` parametrisiert. Die ID wird dann `tones`. Der Auslöser ist die zweite tatsächliche Nutzung, nicht eine Vermutung.
3. Ein Modul liefert keinen eigenen Lernstand. Es meldet Ergebnisse über die gemeinsamen Store-Funktionen (heute `addXp`, `logActivity`, später Evidenz nach [KNOWLEDGE_TREE.md](KNOWLEDGE_TREE.md)).

### 4.2 Inhaltsfelder abhängig von Capabilities

Additive, optionale Felder an `VocabItem` (und analog `Example`):

| Feld                             | Pflicht, wenn …                                     | Zweck                                                            |
| -------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| `glosses: { [locale]: string }`  | nie (bis zur Oberflächenentscheidung)               | Bedeutung in weiteren Sprachen; `de` bleibt erhalten (API v1).   |
| `gender: "m" \| "f" \| "n"`      | `grammaticalGender` deklariert und `pos === "noun"` | Artikel und Genus für Deutsch                                    |
| `register`                       | nie; empfohlen bei `registers`                      | Höflichkeitsform (Japanisch), Anrede (Vietnamesisch)             |
| `variety`                        | nie; nur bei abweichender Form                      | Regionale Variante (z. B. Nord-/Südvietnamesisch)                |
| `forms: Array<{ script, text }>` | nie; empfohlen bei mehreren `scripts`               | Japanisch: Kanji-Schreibung und Kana-Schreibung desselben Wortes |

Diese Felder entsprechen den Spalten `register`, `variety` und `sense_variant` im relationalen Zielmodell von `docs/ARCHITEKTUR.md` und lassen sich später dorthin überführen.

---

## 5. Validierung

Ein Paketvalidator (`scripts/validate-packages.ts`, geplant) und `backend/catalog/management/commands/import_courses.py` prüfen dieselben Regeln:

1. `capabilities` vorhanden und serialisierbar; jedes Modul in `modules` ist in `moduleViews` registriert (nur im Frontend-Test prüfbar).
2. Jedes `level` eines Wortes stammt aus einem deklarierten `levelSystems`-Eintrag.
3. `reading.requiredForVocab` ⇒ jedes Wort hat eine nichtleere Lesung.
4. `tones` mit `marking: "diacritic"` ⇒ die Sprachhilfe `tonesOf` liefert für jede Lesung ein Ergebnis (nur Frontend; Testlauf über alle Wörter).
5. `grammaticalGender` ⇒ jedes Nomen trägt `gender`.
6. `register`, `variety` und `forms[].script` verwenden nur deklarierte Werte.
7. Inhalte mit `understanding.status` oder Knowledge-Knoten mit `status` haben eine `sourceNote`; `reviewed` ist nur mit Quelle zulässig.

Für Fundstücke im Lernstand prüft `backend/learning/validation.py` künftig Stufen gegen den Kurs statt gegen die feste Liste `("A1", "A2", "B1", "B2")`.

---

## 6. Plan für die Integration weiterer Sprachen

### 6.1 Merkmalsmatrix (Planungsstand)

Einträge außer Mandarin sind fachliche Annahmen für die Planung und vor Umsetzung mit Muttersprachlern bzw. Quellen zu prüfen.

| Merkmal                            | Mandarin (zh, vorhanden)                                 | Japanisch (ja)                        | Vietnamesisch (vi)                                 | Koreanisch (ko)                 | Deutsch (de)                                   | Englisch (en)  |
| ---------------------------------- | -------------------------------------------------------- | ------------------------------------- | -------------------------------------------------- | ------------------------------- | ---------------------------------------------- | -------------- |
| Schriften                          | Hanzi                                                    | Kana, Kanji                           | Latein mit Diakritika                              | Hangul                          | Latein                                         | Latein         |
| Segmentierung                      | Zeichen                                                  | Sprachhilfe (keine Leerzeichen)       | Leerzeichen (Silben; Wörter oft mehrsilbig)        | Leerzeichen                     | Leerzeichen                                    | Leerzeichen    |
| Lesung                             | Pinyin, Pflicht                                          | Kana als Lesung für Kanji             | keine (Schrift zeigt Aussprache)                   | optional Umschrift              | keine                                          | optional IPA   |
| Töne                               | 4 + neutral, Diakritika                                  | –                                     | 6 Töne (nördl. Norm), Diakritika                   | –                               | –                                              | –              |
| Genus/Artikel                      | –                                                        | –                                     | –                                                  | –                               | m/f/n mit Artikel                              | –              |
| Register                           | wenige (您/你)                                           | Höflichkeitsformen                    | Anredeformen nach Alter und Beziehung              | Höflichkeitsstufen              | du/Sie                                         | –              |
| Varianten                          | zh-CN (Standard)                                         | –                                     | Nord/Süd                                           | –                               | DE/AT/CH optional                              | US/GB optional |
| Stufensystem                       | CEFR (HSK-Näherung)                                      | CEFR, JLPT-Näherung mit Quellenangabe | CEFR                                               | CEFR, TOPIK-Näherung mit Quelle | CEFR                                           | CEFR           |
| Kandidat Spezialmodul              | Tonlabor (vorhanden), Strichreihenfolge (Idee im README) | Kana-Training                         | Tonunterscheidung → Generalisierung von `zh.tones` | Hangul-Aufbau                   | Artikel-Training als Parametrisierung des Quiz | –              |
| Gemeinsame Funktionen ausreichend? | ja                                                       | ja, mit Segmentierungshilfe           | ja, mit Suchschlüssel ohne Tonzeichen              | ja                              | ja, mit Glossensprache ≠ Deutsch               | wie Deutsch    |

Das Artikel-Training für Deutsch braucht kein Spezialmodul: Es ist ein Quiz mit drei Optionen (der/die/das), das `makeOptions` in `shared/lib/exercises.ts` um einen Modus „Merkmal wählen“ erweitert. Das ist ein Beispiel für Regel 4 der Leitprinzipien in ARCHITECTURE.md.

### 6.2 Empfohlene Reihenfolge

| Schritt | Sprache                                  | Begründung                                                                                                                                                                                                                                                                                                                                |
| ------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1       | **Vietnamesisch** (Pilot, A1-Ausschnitt) | Weicht im gemeinsamen Code am stärksten von Mandarin ab: lateinische Schrift (B1: kein Satzbau heute), keine separate Lesung, Töne als Diakritika (Suche, SpeakCheck), Anredeformen. Damit werden die meisten Annahmen früh sichtbar. Der Pilot erfüllt zugleich die Vorgabe „zweites vollständiges Testpaket“ aus `docs/ARCHITEKTUR.md`. |
| 2       | **Japanisch**                            | Prüft mehrere Schriften pro Wort (`forms`), Segmentierung ohne Leerzeichen und Register.                                                                                                                                                                                                                                                  |
| 3       | **Koreanisch**                           | Nutzt danach überwiegend Vorhandenes (Leerzeichen, Register); geringes Zusatzrisiko.                                                                                                                                                                                                                                                      |
| 4       | **Deutsch, Englisch**                    | Erst nach Entscheidung zu Oberflächen- und Glossensprache (ARCHITECTURE.md, Abschnitt 5). Deutsch prüft Genus, Artikel und die Regeln aus dem Knowledge Tree (Kasus, Satzstellung).                                                                                                                                                       |

Die Reihenfolge ist ein technischer Vorschlag. Wenn der Betreiber Japanisch zuerst lernen möchte, funktioniert der Plan ebenso; dann werden die lateinischen Schriftannahmen später geprüft.

### 6.3 Ablauf je Sprache (Definition of Done)

Die bestehende Anleitung in README („Neue Sprache“) bleibt die Grundlage. Ergänzt werden:

1. **Quellen und Rechte klären.** Für jede Wortliste, jeden Text und jedes Bild Herkunft und Lizenz festhalten (`sourceNote` am Inhalt, Nachweis im Paket-README). Listenstufen nur mit konkreter Quelle und Ausgabe eintragen (`docs/ARCHITEKTUR.md`, „Kategorien und Stufen“).
2. **Manifest anlegen** (`available: false`), Capabilities deklarieren, Lernwelt (`culture`, `theme.css`) dezent und ohne Länderklischees gestalten (AGENTS.md).
3. **Sprachhilfen schreiben und testen** (`linguistics/`), z. B. Suchschlüssel, Segmentierung, Lesungsnormalisierung.
4. **Pilotinhalt**: ein kleiner A1-Ausschnitt mit Kategorien, Wortschatz mit Beispielsätzen, mindestens einer Dialogszene und Knowledge-Knoten für diese Szene. Status `draft`.
5. **Validator und Import grün**, Architekturtest grün, `npm run build` ohne neuen großen Haupt-Chunk.
6. **Browserprüfung**: Sprachwechsel als Gast und mit Konto, alle sichtbaren Bereiche, Tastatur, mobile Ansicht, Sprachausgabe mit installierter Stimme.
7. **Muttersprachliche Prüfung** der Inhalte, danach `reviewed` mit Quelle.
8. **Freischalten** (`available: true`). Erst jetzt erscheint der Kurs auf der Startseite als verfügbar; vorher als geplant.

### 6.4 Tests für Sprachpakete

| Test                              | Ort                                                             | Prüft                                                                                                    |
| --------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Paketschema und Capability-Regeln | `scripts/validate-packages.ts`, Fixtures                        | Regeln 1–7 aus Abschnitt 5 mit je einem negativen Fixture                                                |
| Import-Parität                    | `backend/catalog/tests/`                                        | Dieselben Fixtures liefern in Django dasselbe Ergebnis wie im Node-Validator                             |
| Sprachhilfen                      | `scripts/test-languages.mjs` (neu) oder `test-architecture.mjs` | Tabellentests je Sprache, z. B. `numbersToMarks("ni3 hao3") === "nǐ hǎo"`, Suchschlüssel ohne Tonzeichen |
| Synthetische Testsprache          | `test-architecture.mjs`                                         | Lateinische Schrift ohne Lesung und ohne Module: Navigation, Lektion ohne Satzbau, Quiz, Fundstücke      |
| ID-Stabilität                     | Snapshot je veröffentlichtem Paket                              | Keine ID entfällt oder ändert sich ohne Alias                                                            |
| Modulregistrierung                | `test-architecture.mjs`                                         | Deklarierte Module ⇔ `moduleViews`                                                                       |
