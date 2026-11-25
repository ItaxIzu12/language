# LinguaFlow · Sprachspezifischer Knowledge Tree

Der Knowledge Tree beschreibt, **was** in einer Sprache gelernt wird, **in welcher Reihenfolge es sinnvoll ist** und **welche Kompetenz** dabei aufgebaut wird. Er ist ein Planungs- und Diagnosewerkzeug für Lernende und für den Tagesplan, kein Belohnungssystem. Technisch ist er ein gerichteter azyklischer Graph je Sprachpaket. Der Name „Tree“ bleibt als Projektbegriff.

Zusammenhang: Capabilities bestimmen, welche Knotentypen eine Sprache nutzt ([LANGUAGE_CAPABILITIES.md](LANGUAGE_CAPABILITIES.md)); Einordnung in die Architektur und Phasen P3/P4 in [ARCHITECTURE.md](ARCHITECTURE.md). Alle Formate sind Entwürfe.

---

## 1. Didaktische Begründung

| Prinzip                                   | Konsequenz für das Modell                                                                                                                                                                                                                                           |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Handlungsorientierung (GER/CEFR)**      | Oberste Knoten sind Alltagssituationen mit Kann-Beschreibung („Ein Getränk höflich bestellen“). Wörter, Grammatik und Aussprache sind Mittel dazu. Die drei Teehaus-Szenen in `src/languages/zh/content/dialogues/scenes.json` sind bereits so formuliert (`goal`). |
| **Rezeptiv vor produktiv**                | Ein Wort wird meist zuerst erkannt (passiv), später selbst abgerufen (aktiv). Beides wird getrennt erfasst, weil eine gemeinsame Karte (heute `Progress.cards`) falsche Sicherheit erzeugen kann.                                                                   |
| **Fertigkeiten getrennt sichtbar machen** | Hören, Lesen, Sprechen und Schreiben entwickeln sich unterschiedlich schnell. Wer Hanzi nur mit Pinyin liest, hat das Schriftbild noch nicht verankert.                                                                                                             |
| **Voraussetzungen statt Sperren**         | Abhängigkeiten ordnen Empfehlungen. Erwachsene Selbstlernende behalten freien Zugriff auf alle Inhalte, wie heute bei Kategorien und Stufen.                                                                                                                        |
| **Verteiltes Abrufen**                    | Die Wiederholung bleibt beim bestehenden Leitner-System. Der Graph entscheidet, _was_ neu dazukommt; das Leitner-System, _wann_ wiederholt wird.                                                                                                                    |
| **Erklärbarkeit**                         | Jede Empfehlung nennt ihren Grund („Voraussetzung für ‚Bezahlen‘: 钱 noch nicht abrufbar“). Ein Knoten ohne didaktischen Zweck kommt nicht in den Graphen.                                                                                                          |

**Abgrenzung zur Gamification.** Knoten erhalten keine Sterne, Punkte, Ränge oder Freischalt-Animationen. XP und Tages-Serie bleiben, wo sie heute sind (`learningStore.tsx`), und fließen nicht in den Knotenstatus ein. Der Status beschreibt beobachtete Leistung, nicht Fleiß.

---

## 2. Modell

### 2.1 Knotentypen

| Typ             | Inhalt                                        | Verweist auf vorhandene Daten                          | Beispiel                                      |
| --------------- | --------------------------------------------- | ------------------------------------------------------ | --------------------------------------------- |
| `situation`     | Alltagssituation mit Kann-Beschreibung        | `Scenario.id`, optional `Episode.id`, `ReadingText.id` | zh „Im Teehaus bestellen“ → Szene `bestellen` |
| `lexeme`        | Wortschatzgruppe oder einzelnes Schlüsselwort | Wort-IDs (`zh:茶:chá:n`) oder Kategorie-ID             | „Getränke bestellen“: 喝, 茶, 水, 杯          |
| `grammar`       | Struktur mit Erklärung und Beispielen         | Beispielsätze aus Paketinhalten                        | zh Zählwort-Konstruktion „一杯茶“             |
| `pronunciation` | Laut, Ton oder Tonkombination                 | Modul (z. B. `zh.tones`) oder Wortliste                | zh 3. Ton vor 3. Ton                          |
| `script`        | Schriftelement oder Schriftsystem             | Zeichenliste, Wort-IDs                                 | ja Hiragana-Reihe; zh häufige Komponenten     |
| `pragmatics`    | Register, Anrede, Höflichkeit                 | Wörter mit `register`                                  | zh 您 vs. 你; vi Anrede nach Alter            |

Welche Typen ein Paket nutzt, folgt aus seinen Capabilities: `pronunciation` mit Tönen nur bei `tones`, `script` nur bei Schriften mit eigenem Lernaufwand, `pragmatics` vor allem bei `registers`.

### 2.2 Kanten

| Kante      | Bedeutung                                                           | Wirkung                                                           |
| ---------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `requires` | Didaktisch notwendige Voraussetzung                                 | Empfehlung erst, wenn Voraussetzungen den Schwellenwert erreichen |
| `supports` | Hilfreich, aber nicht notwendig                                     | Erhöht Priorität, blockiert nicht                                 |
| `uses`     | Situation verwendet Wortschatz, Grammatik, Aussprache oder Register | Grundlage für „Was fehlt mir für diese Situation?“                |

`requires` darf keinen Zyklus bilden. `uses` zeigt immer von einer Situation weg.

### 2.3 Kompetenzdimensionen

| Dimension   | Bedeutung                                  | Wortschatz | Anmerkung                                                                      |
| ----------- | ------------------------------------------ | ---------- | ------------------------------------------------------------------------------ |
| `recognize` | Bedeutung beim Sehen erkennen              | passiv     | Mit eingeblendeter Lesung schwächer zu werten als ohne                         |
| `recall`    | Aus der Bedeutung die Form abrufen         | aktiv      |                                                                                |
| `listen`    | Beim Hören erkennen                        | passiv     |                                                                                |
| `read`      | Im Schriftbild ohne Lesungshilfe verstehen | passiv     | Nur relevant bei `capabilities.reading`; wird bei `showReading: false` erfasst |
| `speak`     | Verständlich produzieren                   | aktiv      | Heute nur über Browser-Spracherkennung messbar, siehe Abschnitt 3              |
| `write`     | Schriftlich produzieren                    | aktiv      | Heute keine Übung vorhanden; Dimension wird erst mit einer Übung aktiviert     |
| `use`       | In einer Situation passend anwenden        | aktiv      | Szenen-Abschlussaufgabe, Rollenspiel                                           |

---

## 3. Evidenz aus vorhandenen Übungen

Die Zuordnung zeigt, welche heutigen Übungen welche Dimension belegen. Sie ist die Grundlage für Phase P4 in ARCHITECTURE.md.

| Übung (Datei)                                          | Dimension                                     | Belastbarkeit und Einschränkung                                                                                |
| ------------------------------------------------------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Lektion `toDe` (`features/lessons/Lesson.tsx`)         | `recognize`                                   | Auswahl aus vier Optionen; Rateanteil                                                                          |
| Lektion `toTarget`                                     | `recall` (schwach)                            | Wiedererkennen der Form unter Optionen, kein freier Abruf                                                      |
| Lektion `listen`                                       | `listen`                                      | Abhängig von verfügbarer Gerätestimme                                                                          |
| Lektion Satzbau                                        | `grammar` des Beispielsatzes                  | Nur wenn das Beispiel einem Grammatikknoten zugeordnet ist                                                     |
| Wiederholen (`features/review/Review.tsx`)             | `recognize`; mit ausgeblendeter Lesung `read` | Selbstbewertung nach dem Umdrehen                                                                              |
| Quiz (`features/quizzes/Quiz.tsx`)                     | `recognize` bzw. `recall` (schwach) je Modus  | wie Lektion                                                                                                    |
| Hörverstehen (`features/listening/Listen.tsx`)         | `listen` auf Satzebene                        | Wortbezug fehlt; `ListeningSentence` braucht optional `words: string[]`                                        |
| Sprechen (`features/speaking/Speak.tsx`, `SpeakCheck`) | `speak` (schwach)                             | Bewertet die Ähnlichkeit des Browser-Transkripts, nicht Aussprache. Als „vom Browser erkannt“ zu kennzeichnen. |
| Lesetexte (`features/reading/Read.tsx`)                | `read` auf Textebene                          | Verständnisfragen; Textbezug zu Knoten über `ReadingText.id`                                                   |
| Dialoge (`features/dialogues/Dialogs.tsx`)             | `use` der Situation                           | Auswahlaufgabe; README hält fest, dass das keine geprüfte freie Sprechkompetenz belegt                         |
| Rollenspiel (`shared/learning/RolePlay.tsx`)           | `use`, `speak` (schwach)                      | wie Sprechen                                                                                                   |
| Tonlabor (`languages/zh/exercises/tones/`)             | `pronunciation` (Hören der Töne)              | Unterscheiden nach Gehör, keine Produktion                                                                     |

Für eine echte Ausspracheanalyse ist die Core-Fähigkeit hinter dem Vertrag `PronunciationAnalysis` des AI Service Adapters nötig ([AI_INTEGRATION.md](AI_INTEGRATION.md)). Ohne ihn bleibt `speak` als schwache Evidenz markiert und zählt nicht als Voraussetzung.

---

## 4. Status, Schwellenwerte und Empfehlung

### 4.1 Stufe 1: rein abgeleitet (Phase P3)

Ohne neues Lernstandfeld lässt sich der Status aus vorhandenen Daten berechnen:

- `lexeme`: Anteil der referenzierten Wörter mit Karte und `box ≥ 2` (bekannt) bzw. `box ≥ MASTERED_BOX` (gefestigt).
- `situation`: Szene in `progress.done` (`scenario:<sprache>:<id>`, siehe `features/dialogues/scenarios.ts`) und Status der verwendeten `lexeme`-Knoten.
- `grammar`, `pronunciation`, `script`, `pragmatics`: in Stufe 1 nur „gesehen“ oder „offen“, weil keine Evidenz existiert.

Status je Knoten: `offen` → `begonnen` → `bekannt` → `gefestigt`. Die Berechnung ist eine reine Funktion `nodeStatus(node, progress, lang)` in `src/shared/lib/knowledge.ts`.

**Grenze von Stufe 1:** Sie spiegelt nur die gemischte Karte. Die Oberfläche spricht deshalb von „bekannt“, nicht von „aktiv beherrscht“.

### 4.2 Stufe 2: mit Kompetenz-Evidenz (Phase P4)

Additive, optionale Felder im Lernstanddokument (`Progress` in `learningStore.tsx`, geprüft in `backend/learning/validation.py`):

```ts
interface Progress {
  // bestehende Felder unverändert
  /** Zweite Leitner-Dimension: aktives Abrufen je Wort-ID. */
  recall?: Record<string, CardState>;
  /** Zählende Evidenz je Knoten oder Wort und Dimension, ohne eigenen Wiederholungsplan. */
  evidence?: Record<string, Partial<Record<Skill, { right: number; wrong: number; last: string }>>>;
}
```

Begründung des Zuschnitts:

- **Nur `recall` erhält eigene Karten.** Die Unterscheidung von aktivem und passivem Wortschatz ist didaktisch am wichtigsten und braucht eigene Wiederholungsabstände. Für alle Dimensionen eigene Karten würde den Wiederholungsaufwand vervielfachen und das Dokument stark vergrößern; `docs/ARCHITEKTUR.md` nennt die Dokumentgröße ausdrücklich als Grenze des heutigen Modells.
- **`cards` bleibt die Erkennungskarte.** Bestehende Lernstände behalten ihre Bedeutung; es ist keine Migration nötig.
- **`evidence` zählt nur.** Hören, Lesen, Sprechen und Anwenden werden sichtbar, ohne eigene Fälligkeiten zu erzeugen.

Erst wenn gemessene Dokumentgrößen oder Konflikte es verlangen, wandert die Evidenz in die relationalen Tabellen `exercise_attempt` und `review_card` aus `docs/ARCHITEKTUR.md`.

### 4.3 Empfehlung der nächsten Lektion

Heute wählt `useDailyPlan.ts` die erste Kategorie mit neuen Wörtern. Künftig:

1. Kandidaten sind Knoten, deren `requires`-Voraussetzungen mindestens `bekannt` sind und die selbst noch nicht `bekannt` sind.
2. Priorität: Situationen, die der Lernende zuletzt begonnen hat; dann Knoten mit vielen eingehenden `uses`-Kanten (breiter Nutzen); dann Paketreihenfolge.
3. Fällige Wiederholungen haben weiterhin Vorrang (`recommendNext` in `shared/lib/plan.ts`).
4. Ohne Knowledge-Daten im Paket gilt die heutige Logik unverändert.

Die Empfehlung nennt immer ihren Grund. Alle Knoten bleiben direkt aufrufbar.

---

## 5. Datenformat

Knoten liegen im Paket unter `src/languages/<code>/knowledge/*.json` und werden über `index.ts` in das Paket aufgenommen. Damit gelangen sie wie alle Inhalte über `scripts/export-courses.ts` in `Course.content`.

```json
{
  "id": "zh:sit:bestellen",
  "type": "situation",
  "title": "Im Teehaus ein Getränk bestellen",
  "canDo": "Ich kann höflich ein Getränk bestellen.",
  "level": "A1",
  "refs": { "scenario": "bestellen" },
  "uses": ["zh:lex:getraenke", "zh:gram:zaehlwort-bei", "zh:prag:nin"],
  "status": "draft",
  "sourceNote": "Abgeleitet aus scenes.json; muttersprachliche Prüfung ausstehend."
}
```

```json
{
  "id": "zh:gram:zaehlwort-bei",
  "type": "grammar",
  "title": "Zahl + Zählwort + Nomen: 一杯茶",
  "skills": ["recognize", "use"],
  "requires": ["zh:lex:zahlen-1-10"],
  "refs": { "words": ["zh:一:yī:num", "zh:杯:bēi:mw", "zh:茶:chá:n"] },
  "status": "draft",
  "sourceNote": "Redaktioneller Entwurf."
}
```

Die verwendeten Wort-IDs und die Szene `bestellen` existieren im heutigen Mandarin-Paket. Der Knoten `zh:lex:zahlen-1-10` ist ein Beispiel und würde aus der Kategorie `numbers` gebildet.

Pflichtfelder: `id` (mit Sprachpräfix, dauerhaft stabil wie Wort-IDs), `type`, `title`, `status` (`draft` | `generated` | `reviewed` | `retired`), `sourceNote`. `generated` kennzeichnet KI-erzeugte Entwürfe und wird in der Oberfläche als solche markiert (siehe [AI_INTEGRATION.md](AI_INTEGRATION.md), Abschnitt 9).

### 5.1 Sprachspezifische Beispiele (Planungsskizzen)

Die folgenden Ketten zeigen, wie Capabilities die Knotentypen prägen. Sie sind didaktische Skizzen, keine geprüften Curricula.

| Sprache       | Beispielkette (`requires`)                                                                                                          | Besonderheit                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Mandarin      | Töne einzeln → Tonkombinationen → Getränke-Wortschatz + Zählwort 杯 → Situation „Bestellen“ → Situation „Bezahlen“                  | `pronunciation` über `zh.tones`; Strichreihenfolge erst als `script`-Knoten mit eigener Übung |
| Japanisch     | Hiragana → Katakana (Lehnwörter) → です/ます-Sätze → Situation „Sich vorstellen“; Kanji-Knoten jeweils nach dem Wort in Kana        | `script` ist eigener Lernstrang; `pragmatics` für Höflichkeitsformen früh                     |
| Vietnamesisch | Töne unterscheiden → Anredepronomen nach Alter/Beziehung → Situation „Auf dem Markt fragen“                                         | `pragmatics` (Anrede) ist Voraussetzung vieler Situationen; Variante Nord/Süd am Wort         |
| Koreanisch    | Hangul-Aufbau → Höflichkeitsstufe 해요 → Situation „Im Café bestellen“                                                              | `script` kurz, `pragmatics` früh                                                              |
| Deutsch       | Genus und Artikel im Nominativ → Akkusativ nach Verben wie „haben, möchten“ → Verbzweitstellung → Situation „Beim Bäcker bestellen“ | `grammar`-lastig; Genus als Merkmal jedes Nomens (`gender`)                                   |

---

## 6. Validierung und Redaktion

`import_courses` (die maßgebliche Paketprüfung, auch beim Export aufgerufen) prüft:

1. Eindeutige Knoten-IDs mit Sprachpräfix.
2. Alle `requires`, `supports`, `uses` verweisen auf existierende Knoten derselben Sprache.
3. `requires` ist azyklisch (topologische Sortierung).
4. Alle `refs` verweisen auf existierende Wort-IDs, Szenen, Episoden, Texte oder Module.
5. Knotentypen passen zu den Capabilities (kein Ton-Knoten ohne `tones`).
6. `reviewed` nur mit `sourceNote`; `generated` nie automatisch zu `reviewed`.

Die Redaktion folgt dem Muster der Worterklärungen (README, „Wort verstehen“): Entwurf im Repository, muttersprachliche Prüfung, dann Statuswechsel.

---

## 7. Darstellung

Die Ansicht „Lernweg“ zeigt je Situation, welche Wörter, Strukturen und Aussprachepunkte dazugehören und wie weit sie belegt sind, getrennt nach Erkennen, Abrufen, Hören und Lesen. Sie folgt `DESIGN.md` und `AGENTS.md`: klare Liste bzw. Gliederung statt dekorativer Baumgrafik, keine Belohnungsanimationen, wesentliche Informationen ohne Hover zugänglich, vollständig per Tastatur bedienbar. Ein visueller Graph ist nur sinnvoll, wenn er beim Verstehen der Abhängigkeiten hilft; das ist im Prototyp zu prüfen.

---

## 8. Tests

| Test                    | Art                                 | Prüft                                                                                      |
| ----------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------ |
| Graphvalidierung        | Validator, Fixtures, Django-Import  | Regeln 1–6 aus Abschnitt 6, je ein negatives Fixture                                       |
| `nodeStatus`            | reine Funktion, Tabellentest        | Statusgrenzen für konstruierte `Progress`-Objekte, inklusive leerem Lernstand              |
| Empfehlung              | reine Funktion                      | Voraussetzungen, Priorität, Vorrang fälliger Wiederholungen, Rückfall ohne Knowledge-Daten |
| Evidenz-Zuordnung       | reine Funktion                      | Jede Übungsart erzeugt genau die Dimensionen aus Abschnitt 3                               |
| `recall`-Karten         | reine Funktion `nextCard`           | Gleiche Leitner-Regeln wie `cards`, unabhängiger Zustand                                   |
| Rückwärtskompatibilität | Browser-Store und `validation.py`   | Dokumente ohne `recall`/`evidence` laden und speichern unverändert                         |
| Dokumentgröße           | Messung mit synthetischem Lernstand | Größe bei vollem Mandarin-Wortschatz mit beiden Kartendimensionen dokumentiert             |
