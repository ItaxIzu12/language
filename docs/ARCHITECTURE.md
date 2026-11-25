# LinguaFlow · Modulare Zielarchitektur für mehrere Sprachen

Dieses Dokument beschreibt, wie LinguaFlow vom heute einzigen vollständigen Mandarin-Kurs zu einer mehrsprachigen Plattform wächst. Es ergänzt das bestehende [Architekturhandbuch](ARCHITEKTUR.md) und wiederholt dessen Inhalte nicht. Dort stehen Datenbankmodell, relationales Zielmodell, API v1, Datenschutz, Backups und die bisherige Migrationsreihenfolge. Hier stehen die Ist-Analyse aus Sicht der Mehrsprachigkeit, die modulare Zielarchitektur und der priorisierte Implementierungsplan.

| Dokument                                             | Inhalt                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| `ARCHITECTURE.md` (dieses)                           | Ist-Analyse, Zielarchitektur, Architekturregeln, priorisierter Plan mit Tests  |
| [LANGUAGE_CAPABILITIES.md](LANGUAGE_CAPABILITIES.md) | Capability-System der Sprachpakete und Plan für die Integration neuer Sprachen |
| [KNOWLEDGE_TREE.md](KNOWLEDGE_TREE.md)               | Didaktisch begründeter, sprachspezifischer Wissensgraph                        |
| [AI_INTEGRATION.md](AI_INTEGRATION.md)               | KI nur über den Personal AI Core und den AI Service Adapter im Backend         |
| [ARCHITEKTUR.md](ARCHITEKTUR.md)                     | Bestehende Entscheidungen, Datenmodell, API v1, Betrieb (verbindlich)          |

Alle Vorschläge sind Planung. Bis auf die genannten Ist-Befunde ist nichts davon implementiert. Bei Widersprüchen gilt `ARCHITEKTUR.md` für bestehende Entscheidungen; dieses Dokument wird dann angepasst.

---

## 1. Ist-Analyse

### 1.1 Laufzeit und Betrieb

- **Ein Frontend, ein Backend, eine Datenbank.** `docker-compose.yml` startet `db` (PostgreSQL 17, Volume `pgdata`), `backend` (Django/Gunicorn mit zwei Workern) und `linguaflow` (nginx mit dem gebauten React-Frontend, Port nur an Loopback gebunden). `nginx.conf` leitet `/api/` an das Backend weiter.
- **Inhalte werden zur Build-Zeit exportiert.** `backend/Dockerfile` bündelt in einer Node-Stufe `scripts/export-courses.ts` mit esbuild. Das Skript liest `src/languages/registry.ts` und schreibt `courses.json`. Beim Containerstart laufen `migrate` und `import_courses courses.json`. Browser und Datenbank nutzen damit dieselbe Quelle.
- **Gastmodus ohne Backend.** `.github/workflows/deploy.yml` baut dieselbe App für GitHub Pages. Ohne `VITE_ACCOUNT_BACKEND=1` speichert der Store im `localStorage`.
- **Zielhardware.** Für den Heimserver (GEEKOM GT1 Mega, 16 GB RAM) ist der heutige Stack klein. Kritisch wird der Speicher erst, wenn derselbe Rechner später lokale KI-Modelle des Personal AI Core betreibt. Das ist in [AI_INTEGRATION.md](AI_INTEGRATION.md) berücksichtigt.

### 1.2 Frontend-Schichten

Die Zuständigkeiten pro Ordner stehen in `docs/ARCHITEKTUR.md`, Abschnitt „Projektstruktur“. Für die Mehrsprachigkeit sind diese Stellen entscheidend:

| Stelle                                   | Heutige Rolle                                                                                                                                                                                         |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/languages/types.ts`                 | Inhaltsverträge: `Language`, `VocabItem`, `Category`, `Scenario`, `ReadingText`, `Episode`, `Culture`, `WordExplanation`. `Level` ist fest `A1`–`B2`, `Pos` eine geschlossene Liste.                  |
| `src/languages/registry.ts`              | `languages = [zh]`, `upcomingLanguages` (ja, ko, vi, es), `getLanguage()` mit stillem Rückfall auf `languages[0]`, `POS_LABELS`, `LEVELS`.                                                            |
| `src/languages/zh/config.ts`, `index.ts` | Metadaten (`ttsLang`, `readingName`, `tonePractice`, `toneModule: "mandarin"`, `presentation`) und Zusammenbau der JSON-Inhalte. `normalizeReading` kommt aus `linguistics/pinyin.ts`.                |
| `src/app/languageViews.ts`               | UI-Erweiterungen getrennt von den Daten: `languageViews.zh.Home = MandarinHome`, `toneViews.mandarin = TonePractice`.                                                                                 |
| `src/app/navigation.ts`                  | `isModuleAvailable(lang, path)` entscheidet für Menüs und Routen-Guard gleichermaßen. Das Tonlabor ist an `tonePractice && toneModule === "mandarin"` gebunden.                                       |
| `src/state/learningStore.tsx`            | Lernzustand, Leitner-Wiederholung (`BOX_INTERVALS`, `answer()`), XP, Serie, Fundstücke, Sprachwechsel. Pro Sprache eigene `localStorage`-Schlüssel bzw. ein Serverdokument.                           |
| `src/shared/lib/`                        | Reine Lernlogik: `plan.ts` (Tagesplan in drei Blöcken), `sets.ts` (Wortgruppen nach Kategorie/Stufe), `exercises.ts` (Distraktoren, Satzbausteine), `mistakes.ts` (Stolperwörter), `useDailyPlan.ts`. |
| `src/shared/audio/`                      | `tts.ts` (Web Speech Synthesis) und `speech.ts` (Web Speech Recognition). Beide sind direkt an Browser-APIs gebunden.                                                                                 |
| `src/features/*`                         | Sprachübergreifende Lernbereiche. `scripts/test-architecture.mjs` stellt sicher, dass kein Feature `src/languages/zh/` importiert.                                                                    |

### 1.3 Lernlogik heute

Die Wiederholung ist ein Leitner-System mit sieben Boxen (`BOX_INTERVALS = [0, 1, 3, 7, 14, 30, 60]`). Eine richtige Antwort hebt die Box um eins, eine falsche senkt sie um zwei, mindestens auf Box 1. Ab `MASTERED_BOX = 4` gilt ein Wort als gefestigt. Pro Wort-ID gibt es genau **eine** Karte (`Progress.cards[wordId]`).

Welche Übung welchen Lernstand schreibt (geprüft an den Aufrufen von `answer`, `logActivity`, `markDone`, `addXp`):

| Übung                                                                      | Schreibt Wortkarte? | Weitere Wirkung         | Beobachtung                                                                                                                               |
| -------------------------------------------------------------------------- | ------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Lektion (`features/lessons/Lesson.tsx`)                                    | ja, am Ende je Wort | XP, `finishLesson`      | Erkennen (`toDe`), Abrufen (`toTarget`), Hören (`listen`) und Satzbau fließen in eine Karte.                                              |
| Wiederholen (`features/review/Review.tsx`)                                 | ja                  | `logActivity("review")` | Schriftbild vorne, Bedeutung nach dem Umdrehen, Selbstbewertung                                                                           |
| Quiz (`features/quizzes/Quiz.tsx`)                                         | ja                  | `logActivity("review")` | Richtungen `toDe`, `toTarget`, gemischt, alle auf dieselbe Karte                                                                          |
| Hörverstehen (`features/listening/Listen.tsx`)                             | nein                | XP, `apply`             | `ListeningSentence` hat keinen Bezug zu Wort-IDs                                                                                          |
| Sprechen (`features/speaking/Speak.tsx`, `shared/learning/SpeakCheck.tsx`) | nein                | XP, `apply`             | Vergleicht das Browser-Transkript per Levenshtein (`similarity`, `PASS_SCORE = 0.75`). Das prüft Erkennbarkeit, keine Aussprachequalität. |
| Lesen, Hördialoge, Dialoge, Rollenspiel                                    | nein                | `markDone`, XP, `apply` | Abschluss auf Text- bzw. Szenenebene                                                                                                      |
| Tonlabor (`languages/zh/exercises/tones/`)                                 | nein                | XP, `apply`             | Mandarin-Spezialmodul                                                                                                                     |

Der Tagesplan (`shared/lib/plan.ts`) wählt die nächste Lektion als erste Kategorie mit neuen Wörtern (`useDailyPlan.ts`). Die Abendübung rotiert über einen festen Wochenplan, der `/tones` enthält und für Sprachen ohne Tonlabor auf `/listen` ausweicht.

### 1.4 Backend heute

| App                 | Inhalt                                                                                                                                                                                                                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `backend/accounts/` | Sitzung, Registrierung, Anmeldung, Passwort-Wiederherstellung, optional Google/Apple über allauth                                                                                                                                                                                      |
| `backend/catalog/`  | `Course` (Code, Name, `content` JSONB) und `Word` (`key`, `category`, `level` mit `max_length=2`, `position`, `active`, `content` JSONB). `import_courses` importiert atomar, prüft Wort-ID-Präfix und Kategorie, validiert `understanding` sprachneutral (`catalog/explanations.py`). |
| `backend/learning/` | `LearningState` je Konto und Kurs mit `revision` und `document`. `validation.py` prüft das Dokument; Stufen (`A1`–`B2`) und Wortarten sind dort fest kodiert. Die Wortsuche in `catalog/views.py` durchsucht `target`, `reading` und `de`.                                             |

Tests: `backend/learning/tests.py` (Sync, Konflikte, Kontoisolation, zwei Sprachstände), `backend/catalog/tests/test_import.py` (Import, Rückbau, Erklärungen inklusive einer deutschen Testsprache), `backend/accounts/tests.py`. Im Frontend: `npm run test:architecture`, `test:learning`, `test:routes`, `lint` (TypeScript) und `format:check` (Prettier).

### 1.5 Stärken, auf denen die Zielarchitektur aufbaut

1. **Daten und UI sind getrennt.** Die Registry importiert keine React-Komponenten, UI-Erweiterungen liegen in `app/languageViews.ts`. Der Test prüft, dass das serialisierte Paket keine Funktionen enthält.
2. **Verfügbarkeit wird aus Inhalten abgeleitet.** `isModuleAvailable` blendet Bereiche ohne Inhalte aus und schützt direkte Routen.
3. **Stabile Wort-IDs mit Sprachpräfix** (`zh:茶:chá:n`), atomarer Import mit Deaktivierung statt Löschung.
4. **Sprachneutrale Worterklärung mit Redaktionsstatus** (`WordExplanation.status: "draft" | "reviewed"`, `sourceNote`). Dieses Muster wird auf Knowledge Tree und KI-Inhalte übertragen.
5. **Lernstand pro Konto und Sprache**, versioniert und konfliktsicher.

### 1.6 Befunde: implizite Mandarin-Annahmen und Engpässe

Diese Stellen sind heute korrekt für Mandarin, blockieren oder verfälschen aber weitere Sprachen. Jede Zeile begründet eine Änderung in Abschnitt 2 bzw. im Plan.

| #   | Befund                                                                                                                                                                                                                                 | Folge für weitere Sprachen                                                                                                                                                                |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B1  | `sentenceTiles()` in `src/shared/lib/exercises.ts` zerlegt Sätze in Einzelzeichen und gibt bei lateinischen Buchstaben `null` zurück.                                                                                                  | Vietnamesisch, Deutsch, Englisch erhalten keine Satzbau-Übung. Koreanisch würde in Silbenblöcke statt Wörter zerlegt.                                                                     |
| B2  | Die CSS-Klasse `hanzi` steht in rund 15 gemeinsamen Komponenten (z. B. `Lesson.tsx`, `Review.tsx`, `WordRow.tsx`, `Choice.tsx`).                                                                                                       | Funktioniert über Themen-Schriften, ist aber irreführend benannt und koppelt Typografie an Mandarin.                                                                                      |
| B3  | Fest kodiertes „Pinyin“ in gemeinsamen Features: `features/vocabulary/Category.tsx` (Suchfeld-Platzhalter) und `features/listening/Podcasts.tsx` (Untertitel).                                                                         | Falsche Beschriftung in jedem anderen Kurs.                                                                                                                                               |
| B4  | `Level = "A1" \| "A2" \| "B1" \| "B2"` global, `Culture.levelGlyphs` als 4-Tupel, `LEVEL_INFO` in `sets.ts`, Stufenprüfung in `backend/learning/validation.py`, `Word.level max_length=2`.                                             | Keine C-Stufen; Listenstufen (HSK, JLPT, TOPIK) können nur als CEFR-Näherung geführt werden.                                                                                              |
| B5  | Die Glosse heißt überall `de` (Typen, Suche in `catalog/views.py`, `validation.py`).                                                                                                                                                   | Deutsch als Lernsprache ist mit deutscher Oberfläche und deutscher Glosse didaktisch nicht sinnvoll. Englisch als Glossensprache fehlt.                                                   |
| B6  | `Pos` ist geschlossen und doppelt gepflegt (`types.ts`, `validation.py`). Genus, Artikel, Höflichkeitsstufe oder Variante haben kein Feld.                                                                                             | Deutsche Nomen ohne Genus, japanische Formen ohne Register sind didaktisch unvollständig.                                                                                                 |
| B7  | Tonlabor über das Paar `tonePractice` + `toneModule: "mandarin"`; `plan.ts` kennt `/tones` direkt.                                                                                                                                     | Jede weitere Spezialübung bräuchte neue Sonderfelder und neue Bedingungen in Navigation und Tagesplan.                                                                                    |
| B8  | `Culture` verlangt Almanach-Felder (`favourable`, `avoid`, `seal`, `traditionalLabel`) von jeder Sprache.                                                                                                                              | Neue Lernwelten müssen Mandarin-Motive nachbilden oder Platzhalter erfinden.                                                                                                              |
| B9  | `registry.ts` importiert alle Inhalte statisch. Der Build meldet bereits mit einer Sprache einen großen Inhalts-Chunk (`docs/ARCHITEKTUR.md`, letzter Abschnitt).                                                                      | Mit sechs Sprachen lädt jeder Besuch alle Kurse.                                                                                                                                          |
| B10 | Eine Leitner-Karte pro Wort mischt Erkennen, Abrufen und Hören. Hören, Sprechen, Lesen und Dialoge erzeugen keine wortbezogene Evidenz.                                                                                                | Aktiver und passiver Wortschatz sind nicht unterscheidbar; ein Knowledge Tree hätte keine belastbare Grundlage.                                                                           |
| B11 | `upcomingLanguages` nennt Spanisch, aber weder Deutsch noch Englisch. `getLanguage()` fällt bei unbekanntem Code still auf Mandarin zurück.                                                                                            | Abweichung vom aktuellen Sprachplan; ein fehlerhafter Code zeigt unbemerkt den falschen Kurs.                                                                                             |
| B12 | Kein Service Worker; „Offline-Kaltstart“ ist in `docs/ARCHITEKTUR.md` als Voraussetzung vor der zweiten Sprache genannt.                                                                                                               | Mit Lazy Loading (B9) müssen Sprachpakete gezielt gecacht werden.                                                                                                                         |
| B13 | `src/styles/styles.css` importiert global `languages/zh/presentation/theme.css` samt Noto-Serif-SC-Schriften; `test-architecture.mjs` verlangt diesen Import sogar. Die Regeln selbst sind über `[data-theme="almanac"]` begrenzt.     | Jede weitere Lernwelt würde ihr Thema und ihre Schriften für alle Besucher mitladen, auch auf der sprachneutralen Startseite.                                                             |
| B14 | `nginx.conf` begrenzt Anmeldung, Registrierung und Passwort-Wiederherstellung bereits pro IP (`limit_req`, 6/min, Burst 8, Status 429). Es fehlt eine Sperre pro Konto nach wiederholten Fehlversuchen; Django selbst begrenzt nichts. | Verteilte Versuche gegen ein einzelnes Konto über viele IPs werden nicht gebremst. Sitzt später ein weiterer Reverse Proxy davor, teilen sich alle Clients dessen IP und damit ein Limit. |

---

## 2. Modulare Zielarchitektur

### 2.1 Leitprinzipien

1. **Modularer Monolith bleibt.** React/Vite/TypeScript, Django/DRF, PostgreSQL und Docker Compose bleiben. Keine Microservices, kein Framework- oder State-Library-Wechsel. Begründung: Ein Betreiber, ein Heimserver und ein gemeinsamer Lernstand profitieren nicht von verteilten Diensten. `docs/ARCHITEKTUR.md` hat diese Entscheidung bereits getroffen.
2. **Drei getrennte Ebenen:** _Lerninhalte_ (Sprachpakete, redaktionell geprüft), _Lernlogik_ (sprachneutral, deterministisch, ohne Netzwerk) und _Dienste_ (Sprachausgabe, Spracherkennung, später KI) hinter Schnittstellen. Die Lernlogik hängt nie von einem Dienst ab.
3. **Sprachspezifisches gehört ins Paket und wird deklariert.** Gemeinsame Features fragen deklarierte Capabilities ab, nie den Sprachcode. Details: [LANGUAGE_CAPABILITIES.md](LANGUAGE_CAPABILITIES.md).
4. **Eine Lernfunktion existiert einmal.** Eine Sprache parametrisiert sie über Capabilities und reine Hilfsfunktionen. Ein Spezialmodul ist nur zulässig, wenn die Übung didaktisch nicht als Parametrisierung einer gemeinsamen Übung beschreibbar ist (z. B. Strichreihenfolge).
5. **Kernfunktionen ohne KI.** Lektion, Wiederholung, Fortschritt, Tagesplan, Dialoge und Knowledge Tree funktionieren vollständig ohne KI-Dienst.
6. **KI nur über den gemeinsamen Personal AI Core.** Alle KI-Funktionen laufen über einen zentralen AI Service Adapter im Django-Backend und die versionierte REST-API des Core. Das Frontend spricht den Core nie direkt an, und die App bindet keine Modelle ein. Details: [AI_INTEGRATION.md](AI_INTEGRATION.md).
7. **Additiv und v1-kompatibel.** Neue Felder in Paketen und Lernstand sind optional. Bestehende Wort-IDs, API-v1-Verträge und `localStorage`-Schlüssel bleiben stabil (vgl. `docs/ARCHITEKTUR.md`, „API v1“).

### 2.2 Schichtenbild

```text
┌──────────────────────────────── Browser (React) ────────────────────────────────┐
│ app/          Routen, Navigation, LearningLayout, moduleViews (Spezial-UI)       │
│ features/     Gemeinsame Lernbereiche (Lektion, Wiederholen, Dialoge, Lernweg …) │
│ shared/learning, shared/ui    Gemeinsame Bausteine                               │
├──────────────────────────────────────────────────────────────────────────────────┤
│ shared/lib    Lernlogik, rein und testbar: srs, plan, evidence, knowledge, sets  │
│ state/        learningStore: Zustand, Persistenz, Sync (nutzt shared/lib)        │
├──────────────────────────────────────────────────────────────────────────────────┤
│ languages/registry.ts   Manifeste (eager) + loadLanguage(code) (lazy)           │
│ languages/<code>/       config + capabilities │ content/*.json │ knowledge/*.json│
│                         linguistics/ (reine Hilfen) │ presentation/ │ exercises/ │
├──────────────────────────────────────────────────────────────────────────────────┤
│ shared/audio → Fassade: Gerät (Web Speech) oder Server (/api/v1), nie Core direkt│
└──────────────────────────────────────────────────────────────────────────────────┘
          │ /api/v1 (Sitzung, Katalog, Lernstand)   │ später /api/v1 Fachendpunkte mit KI
┌─────────▼───────────── Django (ein Prozess) ──────▼──────────────────────────────┐
│ accounts/   catalog/ (Pakete, Wörter, Knowledge-Knoten)   learning/ (Lernstand)  │
│ ai_service/ (erst mit erster KI-Funktion) = AI Service Adapter:                  │
│   Fähigkeitsverträge, Capability-Abgleich, Resilienz, Datenminimierung,          │
│   Backends core │ mock │ disabled                                                │
└─────────┬────────────────────────────────────────────────────────────────────────┘
          │                                      │ versionierte REST-API, eigenes Compose-Projekt
     PostgreSQL 17                          Personal AI Core (separat, wählt die Modelle)
```

### 2.3 Änderungen im Frontend und ihre Begründung

| Änderung                                                                                                                                                         | Begründung (Befund)                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Language.capabilities`** als serialisierbare Deklaration; reine Funktionen gebündelt in `Language.linguistics` (nicht exportiert).                            | Ersetzt Sonderfelder (B7), macht Paketfähigkeiten validierbar und für Backend-Import lesbar. Funktionen bleiben aus dem JSON-Export heraus, wie es `test-architecture.mjs` bereits verlangt.                                                             |
| **`moduleViews` statt `toneViews`** in `src/app/languageViews.ts`, geschlüsselt nach Modul-ID (z. B. `"zh.tones"`).                                              | Navigation, Route und Tagesplan lesen Spezialmodule aus einer Liste statt aus Einzelbedingungen (B7). Bestehendes Muster der UI-Registrierung wird fortgesetzt.                                                                                          |
| **Manifest und Inhalt trennen:** `registry.ts` hält leichte Manifeste aller Sprachen; `loadLanguage(code)` lädt Inhalte per dynamischem `import()`.              | Behebt B9. Landingpage und Kurswahl brauchen nur Manifeste. `AccountRoot.tsx` lädt bereits asynchron (`readState`), dort lässt sich das Paketladen einhängen.                                                                                            |
| **`upcomingLanguages` in Manifeste überführen** (`available: false`). `getLanguage()` wirft bei unbekanntem Code bzw. meldet ihn sichtbar.                       | Eine Quelle für verfügbare und geplante Kurse (AGENTS.md: Verfügbarkeit aus der Registrierung ableiten), behebt B11.                                                                                                                                     |
| **Sprachneutrale Benennung:** CSS-Klasse `target-text` mit Übergangsalias `hanzi`; Beschriftungen aus `capabilities.reading.label` statt „Pinyin“.               | B2, B3. Kein Layoutwechsel, nur Benennung und Textquelle.                                                                                                                                                                                                |
| **Segmentierung als Capability:** `linguistics.segment(sentence)` ersetzt die feste Logik in `sentenceTiles()`. Fehlt sie, entfällt die Satzbau-Übung wie heute. | B1. Eine Übung, sprachspezifische Zerlegung.                                                                                                                                                                                                             |
| **`Culture` aufteilen** in Pflichtteil (`theme`, `themeName`, `localDate`, `customGlyph`) und optionale `dailySheet`-Motive.                                     | B8. Mandarin behält seine Almanach-Gestaltung vollständig.                                                                                                                                                                                               |
| **Leitner-Berechnung als reine Funktion** `nextCard(prev, correct, day)` in `src/shared/lib/srs.ts`; der Store ruft sie auf.                                     | Testbar ohne React, Grundlage für zusätzliche Kartendimensionen (B10). Kein Verhaltenswechsel.                                                                                                                                                           |
| **Evidenz je Kompetenz** (`progress.evidence`, optional) und eine zweite Kartendimension für aktives Abrufen.                                                    | B10, Voraussetzung für den Knowledge Tree. Details in [KNOWLEDGE_TREE.md](KNOWLEDGE_TREE.md).                                                                                                                                                            |
| **Audio-Fassade** `speechOutput`/`speechInput` um `shared/audio/tts.ts` und `speech.ts` mit den Quellen „Gerät“ (Web Speech) und „Server“ (Django-Endpunkt).     | Features behalten einen Aufruf; eine Server-Quelle führt immer über den AI Service Adapter, nie direkt zum Core. Details in [AI_INTEGRATION.md](AI_INTEGRATION.md), Abschnitt 3.2. Kein `providers/`-Ordner (wie in `docs/ARCHITEKTUR.md` festgehalten). |

Bewusst **nicht** vorgesehen: eine neue Top-Level-Schicht für „Engine“ oder „Core“. Die Lernlogik bleibt in `src/shared/lib/`, weil dort Tagesplan, Wortgruppen und Übungserzeugung bereits liegen und die Tests sie von dort bündeln.

### 2.4 Änderungen im Backend und ihre Begründung

| Änderung                                                                                                                                               | Begründung                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `import_courses` validiert `capabilities` und capability-abhängige Pflichtfelder (z. B. Genus bei deutschen Nomen) sowie Knowledge-Knoten.             | Der Import ist die einzige Schreibstelle für Katalogdaten. Fehler sollen den Containerstart abbrechen, nicht im Browser auffallen.                                                                                                           |
| Stufen und Wortarten in `validation.py` aus dem Kurs lesen statt fest kodieren; `Word.level` auf `max_length=16` erweitern (Migration).                | B4, B6. Fundstücke eines japanischen Kurses dürfen dieselben Stufen tragen wie das Paket.                                                                                                                                                    |
| Knowledge-Knoten zunächst in `Course.content` (JSONB) ausliefern; relationale Tabellen erst nach dem in `docs/ARCHITEKTUR.md` beschriebenen Kriterium. | Kein Schema-Umbau ohne gemessenen Bedarf; deckt sich mit der dortigen Reihenfolge („Vor redaktioneller Pflege“).                                                                                                                             |
| `validation.py` akzeptiert und prüft die optionalen Lernstandfelder `evidence` und `recall`.                                                           | Heute würde `obj()` unbekannte Felder ungeprüft durchlassen. Neue Felder müssen ausdrücklich validiert werden.                                                                                                                               |
| Neue App `backend/ai_service/` (AI Service Adapter) erst mit der ersten KI-Funktion.                                                                   | Integrationsstandard: ein zentraler Adapter mit Konfiguration, Capability-Abgleich, Resilienz und Datenminimierung. Kein leeres Gerüst. Fachtabellen wie `tutor_session` (`docs/ARCHITEKTUR.md`) bleiben in der Fachlogik, nicht im Adapter. |
| Glossen additiv als `glosses: {"de": …, "en": …}` neben dem bestehenden `de`; Suche berücksichtigt beide.                                              | B5. v1 bleibt gültig, weil `de` erhalten bleibt. Voraussetzung für Deutsch als Lernsprache.                                                                                                                                                  |

### 2.5 Datenfluss eines Sprachpakets

```text
src/languages/<code>/content/*.json ─┐
src/languages/<code>/knowledge/*.json ├─► registry.ts ─► Browser (Gastmodus, lazy)
src/languages/<code>/config.ts ───────┘        │
                                               └─► scripts/export-courses.ts ─► courses.json
                                                        └─► import_courses (Validierung, atomar) ─► PostgreSQL
```

Eine Validierungsfunktion für Pakete (`scripts/validate-packages.ts`, geplant) prüft dieselben Regeln vor dem Export, die `import_courses` beim Import prüft. Die Parität wird über gemeinsame Fixture-Pakete getestet (Abschnitt 4).

### 2.6 Architekturregeln (automatisch prüfbar)

Diese Regeln ergänzen `scripts/test-architecture.mjs`:

1. Kein Modul unter `src/features/`, `src/shared/` oder `src/state/` importiert `src/languages/<code>/`. **Geprüft** (Laufzeit-Importgraph; reine Typimporte sieht der Graph nicht).
2. Kein gemeinsames Modul vergleicht mit einem Sprachcode-Literal (`lang.code === "zh"`, `case "zh":`). **Geprüft** per Quelltextsuche, nur für Codes aus der Registrierung. HTML-Attribute wie `lang="zh"` an gekennzeichneten Beispielen sind erlaubt.
3. Jedes in `capabilities.modules` deklarierte Modul hat einen Eintrag in `moduleViews`, und umgekehrt gehört jeder Eintrag zu mindestens einer Sprache.
4. Serialisierte Pakete enthalten keine Funktionen; `linguistics` erscheint nicht im Export. **Geprüft** ist der erste Teil (bestand schon); der zweite folgt mit `linguistics` in P1.
5. Wort-IDs sind eindeutig und beginnen mit `<code>:`; die Liste der Mandarin-IDs bleibt gegenüber dem letzten Release vollständig erhalten. **Geprüft** für alle registrierten Sprachen, dazu Snapshot.
6. Für jedes Manifest mit `available: true` existiert ein ladbares Paket mit Wortschatz.

---

## 3. Abgrenzung zu bestehenden Plänen

- Die **Migrationsreihenfolge** in `docs/ARCHITEKTUR.md` (Schritte 1–5) bleibt gültig. Der Plan unten ordnet die mehrsprachigen Arbeiten in sie ein: P1–P3 entsprechen dort Schritt 2 („Vor der zweiten Sprache“), P5 Schritt 3, P6 Schritt 5.
- Das **relationale Zielmodell** (Bedeutungen, Varianten, Stufensysteme, Grammatik, Szenarien) wird hier nicht neu entworfen. Capabilities und Knowledge-Knoten sind so geschnitten, dass sie später auf `variety`, `level_system`, `grammar_lesson` und `scenario` abbildbar sind.
- Die **Trennung von Spracherkennung, Sprachmodell und Aussprachebewertung** aus `docs/ARCHITEKTUR.md` wird in [AI_INTEGRATION.md](AI_INTEGRATION.md) als getrennte Fähigkeitsverträge des AI Service Adapters umgesetzt, die getrennte Core-Fähigkeiten aufrufen.

---

## 4. Priorisierter Implementierungsplan

Reihenfolge nach Risiko und Abhängigkeit: zuerst absichern, dann Deklaration, dann Laden und Schema, dann didaktische Erweiterungen, dann Sprachen, zuletzt KI. Jede Phase ist einzeln auslieferbar und ändert das Mandarin-Verhalten nicht ohne ausdrückliche Entscheidung.

**Status: Maßnahmenplan, wartet auf Freigabe.** Mit der Umsetzung einer Phase wird erst nach ausdrücklicher Freigabe durch den Betreiber begonnen. Freigegebene und abgeschlossene Phasen werden hier vermerkt. Freigegeben wird schrittweise: einzelne Aufgaben einer Phase, nicht ganze Phasen auf einmal. Nach jedem Schritt läuft die Prüfroutine aus `AGENTS.md`.

Abschnitt 6 enthält die kritische Überprüfung dieses Plans. Seine Korrekturen sind unten bereits eingearbeitet.

Umgesetzt:

- 25.11.2026 · P0 Kontosperre nach Fehlanmeldungen (B14): `backend/accounts/lockout.py`. Nach 5 Fehlversuchen pro Benutzername ist `login` 15 Minuten lang gesperrt (429). Tests in `backend/accounts/tests.py`, `LoginLockoutTests`. Nicht umgesetzt ist die optionale Weitergabe von `X-Real-IP`.
- 25.11.2026 · P0 Leitner-Logik als reine Funktion: `src/shared/lib/srs.ts` (`nextCard`, `scheduledCard`, `BOX_INTERVALS`, `MASTERED_BOX`, `CardState`). Der Store ruft sie auf und exportiert die Konstanten weiter. Das Verhalten ist unverändert. Tabellentests aller Boxübergänge sowie Fälligkeiten über Monats-, Schaltjahr-, Jahres- und Zeitumstellungsgrenzen stehen in `scripts/test-learning.mjs`.
- 25.11.2026 · P0 Snapshot der Mandarin-Wort-IDs: `scripts/fixtures/zh-word-ids.txt` enthält 4691 IDs, nur IDs, keine Inhalte. `test-architecture.mjs` bricht ab, wenn eine davon fehlt. Neue IDs sind erlaubt und werden mit `UPDATE_WORD_IDS=1` ergänzt, nie entfernt.
- 25.11.2026 · P0 Architekturregeln 1, 2, 4 und 5 (Abschnitt 2.6) in `scripts/test-architecture.mjs`. Jede Regel hat einmal mit einem absichtlichen Verstoß gezeigt, dass sie anschlägt; die Verstöße wurden nicht eingecheckt. **P0 ist damit abgeschlossen.**

### P0 · Absicherung ohne Verhaltensänderung

| Aufgabe                                                                                                                                                                                                                                  | Test bzw. Nachweis                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `nextCard()` aus `learningStore.tsx` nach `src/shared/lib/srs.ts` extrahieren.                                                                                                                                                           | Tabellentest aller Boxübergänge (richtig: +1 bis 6; falsch: −2, mindestens 1; neue Karte), Fälligkeit über Monats- und Zeitumstellungsgrenzen mit `addDays`. |
| Architekturregeln 1, 2, 4, 5 aus Abschnitt 2.6 in `test-architecture.mjs` ergänzen.                                                                                                                                                      | Test schlägt bei einem absichtlichen Verstoß fehl (lokal einmal geprüft, nicht eingecheckt).                                                                 |
| Snapshot der Mandarin-Wort-IDs als Testdaten (nur IDs, keine Inhalte).                                                                                                                                                                   | Verlust oder Umbenennung einer ID bricht den Test.                                                                                                           |
| Ergänzend zum IP-Limit in `nginx.conf`: Sperre pro Benutzername nach wiederholten Fehlanmeldungen, mit Django-Cache, ohne neuen Dienst (B14). Optional: `X-Real-IP` von nginx weiterreichen, falls später ein weiterer Proxy davorsitzt. | Django-Test: Nach N Fehlversuchen antwortet `login` für diesen Benutzernamen mit 429, andere Konten bleiben unberührt, die Sperre läuft ab.                  |

### P1 · Capability-Deklaration

| Aufgabe                                                                                                           | Test bzw. Nachweis                                                                                  |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `LanguageCapabilities` in `types.ts`; Mandarin deklariert Schrift, Lesung, Töne, Stufensystem, Modul `zh.tones`.  | Architekturtest: Mandarin-Navigation und -Routen unverändert (bestehende Assertions bleiben grün).  |
| `tonePractice`/`toneModule`/`readingName` während einer Übergangsphase aus Capabilities ableiten, dann entfernen. | `test:routes` und `test:architecture`; Typprüfung `npm run lint`.                                   |
| `moduleViews` in `languageViews.ts`; `isModuleAvailable` und `plan.ts` lesen Module aus Capabilities.             | Testsprache ohne Module zeigt kein Tonlabor und keinen Tonlabor-Abend (bestehender Test erweitert). |
| „Pinyin“-Literale ersetzen, CSS-Klasse `target-text` mit Alias `hanzi`.                                           | Visuelle Prüfung der Mandarin-Seiten im Browser (Desktop und schmale Ansicht): keine Abweichung.    |

### P2 · Paketladen und Pilotsprache

Die Aufgaben sind einzeln freizugeben. Sie in einer Phase zu bündeln würde einen großen, schwer prüfbaren Schritt erzeugen.

| Aufgabe                                                                                                                                                                                                                                                                                                                                                                   | Test bzw. Nachweis                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P2a · Manifeste und `loadLanguage()`; `upcomingLanguages` in Manifeste überführen; Lernwelt-Themen und -Schriften mit dem Paket laden statt global (B9, B13).                                                                                                                                                                                                             | Build-Ausgabe: je Sprache ein eigener Chunk; Landingpage lädt weder Kursinhalt noch Mandarin-Schriften (Netzwerkprüfung im Browser).                                                                   |
| P2b · `import_courses` bleibt die maßgebliche Paketprüfung. Der Export ruft dieselbe Prüfung auf, statt einen zweiten Validator in TypeScript zu pflegen.                                                                                                                                                                                                                 | Fixture-Pakete (gültig, ungültig je Regel) im Django-Test; Export bricht bei ungültigem Paket ab.                                                                                                      |
| P2c · Pilotpaket der zweiten Sprache mit kleinem A1-Ausschnitt (Vorschlag in [LANGUAGE_CAPABILITIES.md](LANGUAGE_CAPABILITIES.md), Abschnitt 6). Nur die Felder, die diese Sprache tatsächlich braucht (z. B. Stufensystem je Kurs, Migration `Word.level`), kommen mit ihr. `gender`, `register`, `variety` und `glosses` folgen erst mit der Sprache, die sie verlangt. | Django-Test: alter und neuer Paketstand importierbar; v1-Antwort von `/courses/zh/words/` unverändert. Echter Sprachwechsel im Docker-Stack mit Konto: getrennte Lernstände, Export/Import je Sprache. |
| P2d · Service Worker für App-Shell und versionierte Sprachpakete (Vorgabe aus `docs/ARCHITEKTUR.md`), sobald P2a umgesetzt ist.                                                                                                                                                                                                                                           | Browser: Kaltstart offline im Gastmodus mit bereits besuchter Sprache; private API-Antworten nicht im Cache.                                                                                           |

### P3 · Knowledge Tree, Stufe 1 (abgeleitet)

| Aufgabe                                                                                                           | Test bzw. Nachweis                                                                         |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Knotenformat, Mandarin-Knoten für die drei Teehaus-Szenen und A1-Grundlagen, Validierung (azyklisch, Referenzen). | Graphtests: Zyklus, unbekannte Wort-ID, verwaister Knoten brechen Validator und Import ab. |
| Knotenstatus rein aus bestehenden Karten und `done`-Einträgen ableiten; kein neues Lernstandfeld.                 | Reine Funktionstests mit konstruierten `Progress`-Objekten.                                |
| Tagesplan wählt die nächste Lektion aus Knoten mit erfüllten Voraussetzungen, Rückfall auf heutige Logik.         | `test:learning` erweitert; ohne Knowledge-Daten identisches Ergebnis wie heute.            |
| Ansicht „Lernweg“ mit Begründung („weil …“), ohne Sperren und Punkte.                                             | Browserprüfung, Tastatur, Screenreader-Beschriftung, mobile Ansicht.                       |

### P4 · Kompetenz-Evidenz und aktiver Wortschatz

| Aufgabe                                                                                                 | Test bzw. Nachweis                                                                                                   |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Optionale Felder `progress.evidence` und `progress.recall` (zweite Leitner-Dimension) im Store.         | Alte Dokumente laden unverändert (Erweiterung von `test_redesigned_workspace_preserves_existing_learning_document`). |
| Übungen melden Evidenz je Kompetenz (Zuordnung in [KNOWLEDGE_TREE.md](KNOWLEDGE_TREE.md), Abschnitt 3). | Tests der Zuordnung Übung → Kompetenz als reine Funktion; Sync-Test mit neuen Feldern, Größenlimit des Dokuments.    |
| `validation.py` prüft die neuen Felder.                                                                 | Django-Tests für gültige, ungültige und fehlende Felder.                                                             |

### P5 · Weitere Sprachen

Nacheinander nach dem Integrationsplan in [LANGUAGE_CAPABILITIES.md](LANGUAGE_CAPABILITIES.md). Jede Sprache durchläuft dieselbe Definition of Done. Deutsch und Englisch setzen eine Entscheidung zur Oberflächen- und Glossensprache voraus.

### P6 · KI über den Personal AI Core

| Aufgabe                                                                                                                                                                                                           | Test bzw. Nachweis                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Benötigte Core-Fähigkeiten als Erweiterungswunsch an den gemeinsamen Standard abstimmen (AI_INTEGRATION.md, Abschnitt 3.3), bevor Code entsteht.                                                                  | Abgestimmte Fähigkeits-IDs und API-Version liegen vor.                                                                    |
| Audio-Fassade um die bestehenden Browser-Funktionen legen, zunächst nur mit Quelle „Gerät“ (vorziehbar, gering).                                                                                                  | Bestehende Sprech- und Hörübungen unverändert; Fake-Quelle im Test.                                                       |
| `backend/ai_service/`: Fähigkeitsverträge, Konfiguration, Capability-Abgleich mit Language Capabilities, Resilienz, Kontext-Builder; Backends `disabled` (Standard) und `mock` (im Prozess, kein eigener Dienst). | „KI aus“-Test aller Routen, Tabellentests des Capability-Abgleichs, Resilienztests, Datenminimierungstest der Nutzlast.   |
| `CoreBackend` erst, wenn eine Spezifikation des Personal AI Core vorliegt. Ein Mock-Core als eigener HTTP-Dienst entfällt bis dahin: Er würde nur eine erfundene API absichern.                                   | Contract-Tests gegen die veröffentlichte Spezifikation; Architekturtest: keine Core-Adresse im Frontend-Bundle.           |
| Erste Fachfunktion (Ausspracheanalyse oder Tutor) über Fachendpunkte mit degradiertem Modus.                                                                                                                      | Browser: Funktion erscheint nur bei effektiver Verfügbarkeit; bei Core-Ausfall KI-freie Variante, Lernstand unverändert.  |
| Umstellung von `mock` auf den echten Core, sobald dessen Spezifikation veröffentlicht ist.                                                                                                                        | Contract-Test gegen die veröffentlichte Spezifikation; keine Änderung an Fachlogik nötig (Nachweis für Austauschbarkeit). |

### Testansätze im Überblick

**Sprachpakete**

- Schema- und Capability-Validierung pro Paket mit positiven und negativen Fixtures; dieselben Fixtures im Node-Validator und in `catalog/tests/`.
- Eine synthetische Testsprache mit lateinischer Schrift und ohne Lesungssystem im Testcode (nicht in der Registry) prüft, dass gemeinsame Features keine Hanzi, kein Pinyin und keine Töne voraussetzen.
- Unit-Tests der reinen Sprachhilfen je Paket (`numbersToMarks`, `tonesOf`, später Segmentierung, Suchschlüssel).
- ID-Stabilität per Snapshot, Mindestinhalte für jedes freigeschaltete Modul, Serialisierbarkeit.

**Lernlogik**

- Reine Funktionen (`nextCard`, `dayPlan`, Knotenstatus, Empfehlung, Evidenz-Zuordnung) mit Tabellentests und festen Daten; keine Zufallsabhängigkeit in Assertions.
- Rückwärtskompatibilität alter Lernstanddokumente im Browser-Store und in `validation.py`.
- Django-Tests gegen PostgreSQL für Nebenläufigkeit, wie in README und `docs/ARCHITEKTUR.md` beschrieben.
- Browserprüfung der sichtbaren Abläufe; Tests, die nur Gestaltungsvorgaben duplizieren, entfallen (AGENTS.md).

---

## 5. Offene Annahmen und Entscheidungen

1. **Oberflächensprache.** Die App ist durchgehend deutsch. Ob Deutsch als Lernsprache für Lernende mit anderer Erstsprache gedacht ist (und damit eine englische Oberfläche und englische Glossen braucht), ist offen. Davon hängen P5 für Deutsch und Englisch ab.
2. **Reihenfolge der Sprachen.** Der Vorschlag in LANGUAGE_CAPABILITIES.md ist technisch begründet; die tatsächliche Priorität legt der Betreiber fest.
3. **Spanisch** steht heute in `upcomingLanguages`, aber nicht im aktuellen Sprachplan. Behalten oder entfernen ist zu entscheiden.
4. **Schnittstelle des Personal AI Core** existiert noch nicht. AI_INTEGRATION.md beschreibt daher die LinguaFlow-Seite (Port) und die Erwartungen an den Core, nicht dessen API.
5. **Redaktion.** Wer Inhalte muttersprachlich prüft und `reviewed` setzt, ist nicht festgelegt. Ohne diese Rolle bleiben neue Inhalte `draft`.

---

## 6. Kritische Überprüfung (25.11.2026)

Die Analyse wurde gegen den Code geprüft. Ergebnis:

**Bestätigt.** Die Befunde B1–B12 und die Angaben zu Laufzeit, Leitner-Logik (`BOX_INTERVALS`, +1/−2, Box ≥ 1, `MASTERED_BOX = 4`), Compose (Loopback-Port, zwei Gunicorn-Worker, Pflicht-Secret), `getLanguage()`-Rückfall, `Word.level max_length=2`, „Pinyin“-Literalen und den 15 gemeinsamen Komponenten mit `hanzi` stimmen. Der in P4 genannte Test `test_redesigned_workspace_preserves_existing_learning_document` existiert.

**Ergänzt.** Zwei Befunde fehlten: das global geladene Mandarin-Thema mit seinen Schriften (B13) und die fehlende Sperre pro Konto nach Fehlanmeldungen (B14). B14 steht jetzt in P0, B13 in P2a. Korrektur vom selben Tag: B14 nannte zunächst überhaupt keine Anfragebegrenzung. Das war falsch, denn `nginx.conf` begrenzt die Konto-Endpunkte bereits pro IP. Offen ist nur die Sperre pro Konto.

**Korrigiert (Overengineering).**

- P2 bündelte fünf unabhängige Vorhaben. Sie sind jetzt als P2a–P2d einzeln freizugeben.
- Neue Inhaltsfelder (`gender`, `register`, `variety`, `glosses`) sollten vorsorglich eingeführt werden. Jetzt kommen sie erst mit der Sprache, die sie braucht.
- Zwei gleichwertige Paketvalidatoren (TypeScript und Python) hätten dieselben Regeln doppelt gepflegt. `import_courses` bleibt die einzige maßgebliche Prüfung.
- Ein Mock-Core als eigener HTTP-Dienst hätte eine noch nicht existierende API nachgebaut. Bis zur Core-Spezifikation genügt der Mock im Prozess.

**Weiterhin abzuwägen.**

- P4 (zweite Leitner-Dimension und Evidenz) ist die größte Datenmodelländerung des Plans. Vor der Freigabe sollte geklärt sein, ob die Trennung von aktivem und passivem Wortschatz im Alltag tatsächlich gebraucht wird.
- Regel 2 in Abschnitt 2.6 (keine Sprachcode-Literale) ist per Textsuche nur grob prüfbar und kann Fehlalarme erzeugen.

**Grenzen dieser Prüfung.** Frontend-Prüfungen (`lint`, `test:learning`, `test:routes`, `test:architecture`) liefen grün. Die Django-Tests brauchen PostgreSQL aus dem Docker-Stack und wurden nicht ausgeführt, weil der Stack nicht lief. `KNOWLEDGE_TREE.md`, `LANGUAGE_CAPABILITIES.md` und `AI_INTEGRATION.md` wurden auf Widersprüche zu diesen Korrekturen durchgesehen, nicht Zeile für Zeile neu geprüft.
