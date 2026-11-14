# LinguaFlow 语

Moderne Web-App zum Sprachenlernen – gebaut für langfristiges Lernen und einfach erweiterbar.
Erste Sprache: **Chinesisch (Mandarin)**, von A1 Richtung B2.

## Funktionen

- **Tagesblatt** – die Startseite ist das Kalenderblatt von heute: Datum auf Deutsch und in der Lernsprache (zum
  Anhören), der Tagesplan in drei Blöcken (mittags Hauptlektion, nachmittags Abruf, abends Anwenden und Hören) und
  die eigenen Stolperwörter. Ist das Tagesziel erreicht, wird das Blatt abgerissen.
- **Wortschatz** – nach Kategorie und nach Stufe, mit Suche (Deutsch, Schriftzeichen, Pinyin auch ohne Tonzeichen).
- **Lektionen** – neue Wörter kennenlernen, dann gemischte Übungen; Fehler kommen am Ende noch einmal.
- **Karten** – Wiederholung mit Spaced Repetition (Leitner, 7 Stufen) und ein **Fehlerheft**, das falsch
  beantwortete Wörter automatisch sammelt.
- **Fundstücke** – eigene Wörter eintragen (Tonzahlen wie `ni3 hao3` werden zu Tonzeichen); sie laufen in Lektionen,
  Karten und Quiz mit.
- **Üben** – Quiz, Hörverstehen, Sprechen (nachsprechen, „Sag es auf …", Rollenspiel), **Tonlabor** (Töne nach
  Gehör erkennen), Lesetexte mit Fragen, Podcast-Dialoge mit Transkript.
- **Chronik** – das Lernjahr als zwölf kleine Kalenderblätter, dazu die Summen seit Beginn.
- **Gestaltung je Sprache** – jede Sprache bringt ihre eigene visuelle Welt mit (siehe unten).
- **Ohne Konto** – kein Login, keine Registrierung, kein Server. Der Fortschritt liegt im Browser und lässt sich als
  Datei sichern und wieder einlesen. Alle Schriften sind mitgeliefert; zur Laufzeit wird nichts von fremden Servern geladen.
- Hell und Dunkel, Tastaturbedienung, mobil nutzbar, als App installierbar.

## Gestaltung je Sprache

Die Oberfläche wechselt mit der Lernsprache ihre Welt: Schrift, Farben, Motive und das Markenzeichen der Startseite.
Navigation, Bedienelemente und Seitenaufbau bleiben in allen Sprachen gleich.

- **Chinesisch: „Abreißkalender 黄历"** – Songti-Druckschrift, Zinnoberrot, Siegel und die Almanach-Spalten
  宜 (günstig) und 忌 (meiden), kombiniert mit schmalen modernen Ziffern und strengem Raster.

Die Regeln stehen in `DESIGN.md`, die Produktbeschreibung in `PRODUCT.md`. Technisch besteht eine Welt aus zwei Teilen:

1. einem Farb- und Schriftsatz in `src/index.css` unter `[data-theme="<id>"]` (hell und dunkel),
2. einer `culture`-Beschreibung der Sprache (`src/data/<code>/culture.ts`): Name der Welt, Zeichen für die
   Tagesblatt-Spalten, Siegel, Stufen-Marken und die Funktion, die das heutige Datum in der Sprache schreibt.

## Inhalt (Stand v0.3)

| | |
|---|---|
| Wörter gesamt | 2.647 in 20 Kategorien |
| nach Stufe | A1: 522 · A2: 883 · B1: 1.214 · B2: 28 |
| davon aus dem bisherigen Kurs (★) | 414 |
| Wörter mit Beispielsatz | 2.483 |
| Lesetexte | 10 (A1–B2) mit je 3 Verständnisfragen |
| Hörsätze | 48 kuratierte + alle Beispielsätze |
| Podcast-Episoden / Rollenspiele | 6 Dialoge (A1–B1) |

**Abdeckung bis B1:** Der Wortschatz enthält alle Wörter der offiziellen Listen HSK 3.0 Stufen 1–3 und HSK 2.0
Stufen 1–4 (zusammen 2.510 Wörter) plus die Chat- und Alltagswörter aus dem eigenen Kurs. Die Stufen-Zuordnung
(HSK 3.0 Stufe 1 = A1, 2 = A2, 3 = B1) ist eine Näherung. **B2 ist erst angelegt** (28 Wörter); dafür kämen
die HSK-3.0-Stufen 4–5 mit rund 2.000 weiteren Wörtern dazu.

Die HSK-Ergänzung (`part5.ts`–`part8.ts`) wurde automatisch erzeugt und maschinell geprüft (Format, Pinyin-Silben,
Dubletten), aber nicht Wort für Wort von einem Menschen gegengelesen. Fällt ein Fehler auf, lässt er sich in der
jeweiligen Zeile direkt korrigieren.

## Starten

Voraussetzung: [Node.js](https://nodejs.org) 18 oder neuer.

```bash
npm install      # einmalig
npm run dev      # Entwicklungsserver, meist http://localhost:5173
npm run build    # fertige Version nach dist/
npm run preview  # die gebaute Version lokal ansehen
```

## Auf GitHub hochladen

1. Auf github.com ein neues, leeres Repository anlegen (z. B. `linguaflow`), ohne README.
2. Im Projektordner:

```bash
git remote add origin https://github.com/DEIN-NAME/linguaflow.git
git push -u origin main
```

(Der Ordner ist bereits ein Git-Repository mit einem ersten Commit. Falls nicht: vorher `git init -b main`,
`git add .`, `git commit -m "LinguaFlow"`.)

### Kostenlos online stellen (GitHub Pages)

Im Repository unter **Settings → Pages → Source** „GitHub Actions" wählen. Danach baut und veröffentlicht der
mitgelieferte Workflow (`.github/workflows/deploy.yml`) die App bei jedem Push automatisch unter
`https://DEIN-NAME.github.io/linguaflow/`.

## Erweitern

### Neue Wörter

Die Vokabeln stehen in `src/data/zh/vocab/part1.ts` bis `part8.ts`, gruppiert nach Kategorie (1–4: Kurs- und Alltagswortschatz, 5–8: HSK-Ergänzung). Eine Zeile = ein Wort:

```
Wort | Pinyin | Deutsch | Wortart | Niveau | Beispielsatz | Beispiel-Pinyin | Beispiel-Deutsch | L
朋友 | péngyou | Freund/in | n | A1 | 我跟朋友去吃饭。 | Wǒ gēn péngyou qù chīfàn. | Ich gehe mit Freunden essen. | L
```

- Wortart: `n v adj adv pron num mw conj prep part phr int`
- Niveau: `A1 A2 B1 B2`
- Die drei Beispiel-Felder und das `L` (= Wort aus dem eigenen Kurs) sind optional.
- Ein Wort nachträglich nicht umbenennen (Wort, Pinyin, Wortart bilden die ID, an der der Lernfortschritt hängt).

### Neue Kategorie

In `src/data/zh/categories.ts` einen Eintrag ergänzen und in einer `part*.ts`-Datei einen Block mit derselben `id` anlegen.

### Neue Lesetexte

`src/data/zh/reading.ts`: pro Text die Sätze als `Satz | Pinyin | Deutsch` und die Fragen als
`Frage | richtige Antwort | falsche Antwort | falsche Antwort`.

### Neue Hörsätze, Podcast-Episoden und Rollenspiele

- `src/data/zh/listening.ts`: `Satz | Pinyin | Deutsch | Niveau`
- `src/data/zh/podcasts.ts`: Episode mit Zeilen `Sprecher | Satz | Pinyin | Deutsch`. Die Episoden werden von der
  Sprachausgabe des Geräts vorgelesen – es sind also keine Audiodateien nötig. Jede Episode mit einem Sprecher
  `我` erscheint automatisch auch als Rollenspiel unter „Sprechen".

### Neue Sprache

1. Ordner `src/data/<code>/` nach dem Vorbild von `src/data/zh/` anlegen (Kategorien, Vokabeln, Hörsätze,
   Lesetexte, Podcasts, `culture.ts`).
2. In `src/index.css` die Welt der Sprache als `[data-theme="<id>"]` anlegen (Kopie des Blocks „almanac" anpassen).
3. In `src/data/languages.ts` importieren und in `languages` eintragen.

Jede Sprache hat ihren eigenen Fortschritt und ihre eigenen Fundstücke.

## Aufbau

```
src/
  data/          Inhalte je Sprache: Vokabeln, Hörsätze, Lesetexte, Podcasts, Kultur
  lib/           Logik: store (Fortschritt, SRS, XP, Tagesplan), tts, speech, pinyin, exercises
  components/    Layout, Navigation, wiederverwendbare Bausteine
  pages/         Heute, Wortschatz, Lektion, Karten, Fundstücke, Quiz, Hören, Sprechen, Tonlabor,
                 Lesen, Podcast, Chronik, Einstellungen
DESIGN.md        Gestaltungsregeln
PRODUCT.md       Produktbeschreibung
```

Technik: React 18, TypeScript, Vite, Tailwind CSS, React Router, Lucide-Icons. Schriften (Archivo, Big Shoulders
Display, Noto Serif SC; alle unter der SIL Open Font License) werden über Fontsource mitgeliefert.

## Hinweise

- **Sprachausgabe** nutzt die Stimmen des Geräts (Web Speech API). Fehlt eine chinesische Stimme, in den
  Systemeinstellungen eine installieren.
- **Spracherkennung** funktioniert in Chrome, Edge und Safari und benötigt Mikrofon-Freigabe sowie meist Internet.
- **Fortschritt** liegt im `localStorage` des Browsers – regelmäßig exportieren, wenn er wichtig ist.
- Die externen Podcast-Links können sich ändern; sie stehen in `src/data/zh/podcasts.ts`.

## Ideen für später

B2-Wortschatz (HSK 3.0 Stufen 4–5), weitere Sprachen mit eigener Gestaltung, Konten und Cloud-Sync, Schreibübungen mit Strichfolge, Grammatik-Lektionen, weitere Sprachen, eigene Audioaufnahmen
für den Podcast, Abzeichen und Ranglisten.

## Lizenz

MIT – siehe [LICENSE](LICENSE). Für eine kommerzielle Nutzung die Lizenz nach Bedarf anpassen.
