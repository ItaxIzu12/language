# LinguaFlow 语

Moderne Web-App zum Sprachenlernen – gebaut für langfristiges Lernen und einfach erweiterbar.
Erste Sprache: **Chinesisch (Mandarin)**, von A1 Richtung B2.

## Funktionen

- **Lektionen im Spielstil** – neue Wörter kennenlernen, dann gemischte Übungen (Bedeutung wählen, Wort wählen, Hören, Satz aus Zeichen bauen). Fehler kommen am Ende nochmal.
- **Karteikarten mit Spaced Repetition** – schwierige Wörter kommen öfter, sichere seltener (Leitner-System, 7 Stufen).
- **Quiz** – schnelle 10er-Runden, filterbar nach Kategorie, Niveau und „aus meinem Kurs".
- **Hörverstehen** – Sätze anhören (normal oder 🐢 langsam) und die Bedeutung wählen.
- **Sprechen** – nachsprechen mit Spracherkennung und Sofort-Feedback (Chrome, Edge, Safari).
- **Podcast** – Mini-Episoden (Dialoge) mit mitlaufendem Transkript, Pinyin und Übersetzung zum Ein-/Ausblenden, plus Links zu echten Lern-Podcasts.
- **Motivation** – XP, Level, Tagesziel, Tages-Serie (Streak), Wochenübersicht, Fortschritt je Niveau.
- **Wörterbuch** – alle Wörter nach Kategorien, Suche auf Deutsch, in Schriftzeichen oder Pinyin (auch ohne Tonzeichen).
- **Hell/Dunkel**, mobil nutzbar, als App auf dem Handy installierbar (PWA-Manifest).
- **Kein Server nötig** – der Fortschritt liegt im Browser und lässt sich in den Einstellungen exportieren/importieren.

## Inhalt (Stand v0.1)

| | |
|---|---|
| Wörter gesamt | 867 in 19 Kategorien |
| davon aus dem bisherigen Kurs (★) | 414 – alle mit Beispielsatz |
| Wörter mit Beispielsatz | 703 |
| Hörsätze | 48 kuratierte + alle Beispielsätze |
| Podcast-Episoden | 6 Dialoge (A1–B1) |

Für ein vollständiges B2-Niveau braucht man etwa 4.000–5.000 Wörter. Die App ist dafür ausgelegt, Schritt für Schritt
dorthin zu wachsen – neue Wörter sind eine Zeile Text (siehe unten).

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

Die Vokabeln stehen in `src/data/zh/vocab/part1.ts` bis `part4.ts`, gruppiert nach Kategorie. Eine Zeile = ein Wort:

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

### Neue Hörsätze und Podcast-Episoden

- `src/data/zh/listening.ts`: `Satz | Pinyin | Deutsch | Niveau`
- `src/data/zh/podcasts.ts`: Episode mit Zeilen `Sprecher | Satz | Pinyin | Deutsch`. Die Episoden werden von der
  Sprachausgabe des Geräts vorgelesen – es sind also keine Audiodateien nötig.

### Neue Sprache

1. Ordner `src/data/<code>/` nach dem Vorbild von `src/data/zh/` anlegen (Kategorien, Vokabeln, Hörsätze, Podcasts).
2. In `src/data/languages.ts` importieren und in `languages` eintragen.

Die gesamte Oberfläche (Lektionen, Quiz, Karteikarten, Sprachausgabe) arbeitet sprachunabhängig; jede Sprache hat
ihren eigenen Fortschritt.

## Aufbau

```
src/
  data/          Inhalte (Sprachen, Vokabeln, Hörsätze, Podcasts)
  lib/           Logik: store (Fortschritt, SRS, XP), tts, speech, exercises
  components/    Layout und wiederverwendbare Bausteine
  pages/         Start, Lernen, Lektion, Wiederholen, Quiz, Hören, Sprechen, Podcast, Einstellungen
```

Technik: React 18, TypeScript, Vite, Tailwind CSS, React Router. Keine weiteren Laufzeit-Abhängigkeiten.

## Hinweise

- **Sprachausgabe** nutzt die Stimmen des Geräts (Web Speech API). Fehlt eine chinesische Stimme, in den
  Systemeinstellungen eine installieren.
- **Spracherkennung** funktioniert in Chrome, Edge und Safari und benötigt Mikrofon-Freigabe sowie meist Internet.
- **Fortschritt** liegt im `localStorage` des Browsers – regelmäßig exportieren, wenn er wichtig ist.
- Die externen Podcast-Links können sich ändern; sie stehen in `src/data/zh/podcasts.ts`.

## Ideen für später

Konten und Cloud-Sync, Schreibübungen mit Strichfolge, Grammatik-Lektionen, weitere Sprachen, eigene Audioaufnahmen
für den Podcast, Abzeichen und Ranglisten.

## Lizenz

MIT – siehe [LICENSE](LICENSE). Für eine kommerzielle Nutzung die Lizenz nach Bedarf anpassen.
