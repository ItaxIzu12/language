# Design System: LinguaFlow

Visuelle Welt: **Abreißkalender 黄历** – der chinesische Wandkalender, von dem man jeden Tag ein Blatt abreißt.
 test
## 1. Visual Theme & Atmosphere

Dünnes, warmes Kalenderpapier, Druckerschwärze und ein einziges Zinnoberrot. Riesige, schmale Tageszahlen, darunter
dichte, sauber linierte Spalten. Die Oberfläche wirkt gedruckt, nicht „gerendert": harte Kanten, Haarlinien, klare Raster und wenige,
ruhige Schatten nach festen Höhenstufen. Dichte 6 (ausgewogen, in Listen dicht), Varianz 8 (asymmetrische Raster, keine gleich großen
Kachelreihen), Bewegung 5 (ruhig, mit einem inszenierten Moment: dem Abreißen des Tagesblatts).

Die Welt leiht der App genau vier Dinge: Schrift, Palette, Dichte und **ein Markenzeichen**. Navigation, Bedienelemente
und Seitenaufbau bleiben die einer normalen Web-App.

**Markenzeichen – das Tagesblatt:** Die Startseite ist das Kalenderblatt von heute: Monat, große Tageszahl, Wochentag
(deutsch und chinesisch), Mondkalender-Datum. Darunter zwei Spalten wie im echten Almanach: **宜 „günstig heute"** (der
Tagesplan in drei Blöcken) und **忌 „meiden"** (die eigenen Stolperwörter). Ist das Tagesziel erreicht, wird das Blatt
abgerissen. Die abgerissenen Blätter sind die Serie.

## 2. Color Palette & Roles

Hell („Papier"):
- **Kalenderpapier** (#F3EEE3) – Seitengrund
- **Blatt** (#FBF8F1) – Fläche von Blättern, Listen, Eingabefeldern
- **Lavierung** (#EBE4D6) – zurückgenommene Füllung (Hover, Leerzustände, Balkengrund)
- **Druckschwarz** (#1B1917) – Text, starke Linien, Hauptaktion
- **Grauschleier** (#686157) – Sekundärtext, Metadaten
- **Falzlinie** (#D4CBBA) – Haarlinien und Tabellenlinien
- **Zinnober** (#BE2E1A) – der einzige Akzent: Kopfband, Tageszahl, aktive Navigation, Siegel, Fehler-Rückmeldung

Dunkel („Nachtblatt"): Grund #161412, Blatt #1F1C19, Lavierung #282420, Text #F0E9DC, Sekundär #AAA192,
Linie #3E3830, Zinnober #E86048 (Schrift darauf dunkel).

Zustands- und Datenfarben (nie als Schmuck):
- **Jade** (#1A694E, dunkel #62BE96) – richtig, erledigt, sicher gelernt; zugleich Stufe A1
- **Preußischblau** (#28588A, dunkel #78AADC) – Stufe A2
- **Ocker** (#8A5A10, dunkel #D6A454) – Stufe B1, „am Lernen"
- Stufe B2 trägt Zinnober.

Verboten: Farbverläufe, Neon, Glühen, reines Schwarz (#000000), Lila/Blau als Markenfarbe, ein zweiter Akzent.

## 3. Typography Rules

- **Display:** Big Shoulders Display (700–900) – schmal und hoch wie Kalenderziffern; für Tageszahl, Seitentitel,
  große Zahlen. Laufweite 0 bis -0.01em, maximal 6rem (die Tageszahl ist die einzige Ausnahme und das Markenzeichen).
- **Text und Bedienelemente:** Archivo (400–700) – Fließtext, Knöpfe, Tabellen; Zahlen tabellarisch.
- **Schriftzeichen:** Noto Serif SC (Songti-Stil, wie im gedruckten Kalender), Rückfall auf die Songti-Schrift des Geräts.
- **Pinyin:** Archivo, kursiv nie; Tonzeichen müssen vollständig sein (beide Schriften decken ā á ǎ à … ǚ ab).
- Spaltenköpfe in Kapitälchen-Optik (11px, gesperrt) nur als Tabellen- und Feldbeschriftung, nie als „Kicker" über
  einer Überschrift.
- Verboten: Inter, Systemschrift als Display, generische Serifen, Mono als Kostüm, Verlaufstext.

## 4. Component Stylings

- **Blatt (Fläche):** Ecken 3px, eine Haarlinie als Kante. Schatten nur nach der Höhenstufe unter
  „Gemeinsames Layout“. Blätter liegen nie ineinander.
- **Kopfband:** zinnoberrotes Band mit Lochreihe (die Bindung des Kalenders) als oberer Rand der App und des Tagesblatts.
- **Knöpfe:** rechteckig, mindestens 44px hoch. Hauptaktion in Druckschwarz, eine rote Aktion nur für das Abreißen;
  Nebenaktion als Linie. Beim Drücken 1px nach unten. Kein Glühen.
- **Marken (Glyphen):** Jede Kategorie, Stufe, Episode und jeder Text trägt ein einzelnes Schriftzeichen im
  quadratischen Feld – Inhalt statt Piktogramm. Bedien-Icons kommen einheitlich aus Lucide (1.75px Strich).
- **Listen statt Kachelreihen:** linierte Zeilen mit Zahlenspalte rechts; Raster sind asymmetrisch (z. B. 7/5).
- **Fortschritt:** flacher Balken mit harter Kante; keine Ringe.
- **Eingaben:** Beschriftung über dem Feld, Fehler darunter, Fokusrahmen in Druckschwarz.
- **Rückmeldung:** richtig = Jade mit Haken-Icon, falsch = Zinnober mit Kreuz-Icon; nie nur Farbe.
- **Erfolg:** ein roter Siegelabdruck (完 „fertig") statt Konfetti.
- **Leerzustände:** eine Zeile, was fehlt, und der Knopf, der es behebt.

## 5. Layout Principles

- Maximalbreite 1180px. Desktop: feste Seitenleiste links (gruppierte Navigation), Inhalt rechts.
- Mobil: Kopfband oben, untere Leiste mit fünf Zielen (Heute, Wortschatz, Karten, Üben, Mehr); alles einspaltig.
- CSS Grid für Seitenraster; keine überlappenden Elemente; kein horizontales Scrollen.
- Mehr Abstand über einer Überschrift als darunter; Gruppen eng, Abschnitte weit.

## 6. Motion & Interaction

- Ein inszenierter Moment: das **Abreißen** des Tagesblatts (kippt an der Perforation, fällt, das nächste Blatt liegt darunter).
- Sonst kurze, exponentiell auslaufende Übergänge (150–250ms) auf `transform` und `opacity`; Karte dreht sich um die Hochachse.
- Der Siegelabdruck setzt mit leichtem Nachfedern auf.
- `prefers-reduced-motion` schaltet alles auf sofortige Zustandswechsel.

## 7. Anti-Patterns (Banned)

Keine Emojis. Kein Inter. Kein reines Schwarz. Keine Verläufe, kein Glühen, kein Glas. Keine drei gleich großen
Kacheln nebeneinander. Keine Fortschrittsringe. Keine Maskottchen, keine Bonbonfarben, keine Herzen/Leben-Mechanik.
Keine erfundenen Zahlen, Bewertungen oder Stimmen. Keine „Kicker"-Zeile über Überschriften. Keine Papier-Textur aus
Rauschfiltern – das Papier ist eine Farbe, kein Effekt.


## 8. Gemeinsames Layout (alle Sprachen)

Das Layout besteht aus zwei Ebenen. Die **Plattform-Ebene** ist für alle Sprachen gleich. Die **Kultur-Ebene**
gehört der jeweiligen Lernwelt.

- **Plattform** (`src/styles/foundation.css`, `src/styles/shell.css`, `src/shared/ui/SiteShell.tsx`):
  Container 1200px mit Randabstand `clamp(16px, 4vw, 48px)`, Abstandsskala auf 4px-Basis, Radien 6/8/12px,
  Kopfleiste, Fußleiste, Sprunglink, Marke, Überschriftenschrift (Archivo, Breite 112 %).
- **Kultur** (`[data-theme]` und `languages/<code>/presentation/`): Farben, Schrift für die Schriftzeichen,
  Motive, Siegel und Tagesblatt. Die Plattform-Ebene liest diese Farben nur als Tokens und ersetzt sie nie.
- Startseite, Sprachwahl und Kurseinstieg nutzen dieselbe `SiteHeader`/`SiteFooter`. Der Lernbereich nutzt
  dieselbe Marke (`BrandLink`), auf dem Handy auch oben in der Leiste.
- **Höhenstufen** (Schatten immer mit Versatz und weicher Unschärfe, aus der warmen Tinte getönt;
  im Dunkelmodus neutral und tiefer):
  1. ablegbares Objekt, z. B. Kurszeile, Hauptknopf;
  2. Hauptobjekt einer Ansicht, z. B. nächster Lernschritt, Anmeldeformular, Kopfleiste beim Scrollen;
  3. schwebend über der Seite, z. B. Produktvorschau, Dialog, Menü.
  Pro Element entweder Rahmen oder Schatten als Höhenträger; keine farbigen Halos, keine harten Versatzschatten.
- Keine Kicker-Zeilen über Überschriften, auch nicht auf der Startseite.
