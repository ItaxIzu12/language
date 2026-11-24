# LinguaFlow · KI-Integration nach dem Personal-AI-Integrationsstandard

Dieses Dokument legt fest, wie LinguaFlow KI-Funktionen nutzt: ausschließlich über den gemeinsamen Personal AI Core und über einen zentralen AI Service Adapter im Django-Backend. LinguaFlow bindet keine Modelle ein und funktioniert in allen Kernfunktionen ohne KI. Der Core wird separat entwickelt. Bis er verfügbar ist, ersetzt ihn ein Mock-Provider.

Grundlage sind `docs/ARCHITEKTUR.md` (Abschnitte „API v1“, „Datenschutz und Betrieb“, Schritt 5 der Migrationsreihenfolge) und der gemeinsame Integrationsstandard des Nutzers. Einordnung in den Gesamtplan: [ARCHITECTURE.md](ARCHITECTURE.md), Phase P6. Alle Typen, Pfade und Variablennamen sind Entwürfe. Es wird keine KI-Infrastruktur vorgebaut, bevor eine konkrete Funktion sie braucht.

---

## 1. Verbindliche Grundsätze

| #   | Grundsatz (Integrationsstandard)                                                              | Umsetzung in LinguaFlow                                                                                                                                   |
| --- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| G1  | Alle KI-Funktionen sind mit der gemeinsamen Personal-AI-Core-Architektur kompatibel.          | Jede KI-Funktion ruft eine Core-Fähigkeit auf. Es gibt keinen zweiten, app-eigenen KI-Weg.                                                                |
| G2  | Standardisierte, versionierte REST-Schnittstellen                                             | Browser → Django über `/api/v1/…` (bestehende Versionierung); Django → Core über die versionierte Core-API.                                               |
| G3  | Ein zentraler AI Service Adapter im Backend, kein direkter Core-Zugriff aus dem Frontend      | Django-App `backend/ai_service/` ist die einzige Stelle mit Core-Adresse und Zugangsdaten.                                                                |
| G4  | Fachlogik strikt getrennt von Modellen; keine eingebundenen Modelle                           | Lernlogik (`src/shared/lib/`, `backend/learning/`) kennt weder Adapter noch Modelle. Keine Modell-Bibliotheken in `package.json` oder `requirements.txt`. |
| G5  | Modelle austauschbar ohne Änderung der Anwendungslogik                                        | Modellwahl liegt im Core. LinguaFlow adressiert Fähigkeiten, nie Modelle. Modellkennungen werden nur protokolliert und angezeigt.                         |
| G6  | Konfigurierbar: Endpunkte, Authentifizierung, Timeouts, Retries, Fallback, degradierter Modus | Abschnitt 5                                                                                                                                               |
| G7  | Dynamische Fähigkeiten über die Capability API des Core                                       | Abschnitt 4, inklusive Zusammenspiel mit den Language Capabilities                                                                                        |
| G8  | Benutzerdaten, Berechtigungen und Anwendungskontext getrennt; Datenminimierung                | Abschnitt 6                                                                                                                                               |
| G9  | Mock-Provider für die Entwicklung                                                             | Abschnitt 7                                                                                                                                               |
| G10 | Alle Kernfunktionen ohne KI                                                                   | Abschnitt 8                                                                                                                                               |
| G11 | Neue KI-Fähigkeiten als Erweiterung der gemeinsamen Infrastruktur                             | Abschnitt 3.3: Bedarf an den Core, generisch formuliert                                                                                                   |
| G12 | Bestehende Schnittstellen wiederverwenden                                                     | Sitzung, CSRF, `/api/v1`-Konventionen, geplante Tutor-Pfade aus `docs/ARCHITEKTUR.md` und die heutigen Audio-Funktionen bleiben die Basis.                |

Zusätzlich gilt weiter aus `docs/ARCHITEKTUR.md`: kein automatischer Wechsel zu einem externen Anbieter, wenn ein lokaler ausfällt, und keine Prompts, Lernertexte oder Audiodaten in Logs.

---

## 2. Ist-Zustand

| Funktion            | Umsetzung heute                                                                                                            | Einordnung nach dem Standard                                                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sprachausgabe       | `src/shared/audio/tts.ts`: Web Speech Synthesis mit Gerätestimmen, offline nutzbar                                         | **Gerätefunktion**, kein in die App eingebundenes Modell. Bleibt die KI-freie Basis (G10).                                                                                                                    |
| Spracherkennung     | `src/shared/audio/speech.ts`: Web Speech Recognition des Browsers                                                          | **Gerätefunktion** des Browsers. Der Browseranbieter kann Audio verarbeiten (`docs/ARCHITEKTUR.md`). Nicht Core-kompatibel, daher als Plattformfunktion gekennzeichnet, nicht als KI-Funktion von LinguaFlow. |
| Sprechbewertung     | `src/shared/learning/SpeakCheck.tsx`: Levenshtein-Ähnlichkeit des Transkripts                                              | Deterministische Fachlogik, keine KI. Prüft Erkennbarkeit, nicht Aussprache.                                                                                                                                  |
| Tutor, Feedback     | nicht vorhanden; geplant als `TutorService` mit Tabellen `tutor_session`, `turn`, `feedback` (`docs/ARCHITEKTUR.md`)       | Wird Core-Fähigkeit hinter dem Adapter (Abschnitt 3)                                                                                                                                                          |
| KI-erzeugte Inhalte | HSK-Ergänzung automatisch erzeugt (README), Worterklärungen als Entwürfe, Illustrationen als „KI-generiert“ gekennzeichnet | Redaktionsprozess, Abschnitt 9                                                                                                                                                                                |

---

## 3. Architektur der KI-Anbindung

### 3.1 Schichten

```text
Browser (React)
  features/*  ──►  Fachendpunkte /api/v1/… (Tutor, Aussprache, Sprache, Fähigkeiten)
  shared/audio ──► Fassade: Gerät (Web Speech)  oder  Server (/api/v1/…)       ✗ nie direkt zum Core
                         │
Django ────────────────▼──────────────────────────────────────────────────────────────
  Fachlogik (learning/, später tutor-Ablauf): Berechtigung, Zustimmung, Kontext, Speicherung
                         │  ruft nur Fähigkeitsverträge auf
  backend/ai_service/  = AI Service Adapter
     ├─ Fähigkeitsverträge: SpeechRecognition, SpeechSynthesis, PronunciationAnalysis, LanguageTutor
     ├─ CapabilityRegistry (Core-Abfrage, Cache, Abgleich mit Language Capabilities)
     ├─ Resilienz: Timeouts, Retries, Circuit Breaker, degradierter Modus
     ├─ Kontext-Builder: Datenminimierung, App-/Instanzkontext, pseudonymer Subject
     └─ Backends:  CoreBackend (HTTP, versioniert) │ MockBackend │ DisabledBackend (Standard)
                         │
Personal AI Core (eigenes Compose-Projekt): Fähigkeiten, Modellwahl, Modelle
```

**Warum Django und nicht das Frontend.** Nur das Backend kann Zugangsdaten geheim halten, Berechtigungen und Zustimmungen prüfen, Daten minimieren und für Web, PWA und GitHub-Pages-Gastmodus dieselbe Regel durchsetzen. Der Gastmodus ohne Backend hat folgerichtig keine KI-Funktionen.

### 3.2 Neueinordnung der bisherigen Provider-Interfaces

Die erste Fassung dieses Dokuments sah `SpeechSynthesisProvider`, `SpeechRecognitionProvider`, `PronunciationAnalysisProvider` und `LanguageTutorProvider` als direkt austauschbare Provider vor, die beiden Sprach-Provider davon im Frontend. Das widerspricht G3 und G5: Ein Frontend-Provider für eine KI-Spracherkennung müsste den Core oder einen Anbieter direkt ansprechen, und austauschbare Provider in der App würden Modellwahl in die App holen. Neue Einordnung:

| Bisher                                                    | Neu                                                                                                                                                                                                                        | Begründung                                                                                                                                    |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `SpeechSynthesisProvider` (Frontend)                      | **Frontend-Fassade** `speechOutput` mit zwei Quellen: `device` (heutiges `tts.ts`) und `server` (ruft `POST /api/v1/courses/{code}/speech/synthesis/` bei Django). Im Adapter: Fähigkeitsvertrag `SpeechSynthesis` → Core. | Features behalten einen einzigen Aufruf. Die Fassade wählt die Quelle, kennt aber weder Core noch Modell.                                     |
| `SpeechRecognitionProvider` (Frontend)                    | Ebenso: Fassade `speechInput` mit `device` (heutiges `speech.ts`) und `server` (Audio an Django, Adapter → Core).                                                                                                          | Wie oben; zusätzlich steuert Django Zustimmung und Größenlimits für Audio.                                                                    |
| `PronunciationAnalysisProvider` (Server)                  | Fähigkeitsvertrag `PronunciationAnalysis` **im Adapter**; Frontend ruft nur den Fachendpunkt `POST /api/v1/courses/{code}/pronunciation/checks/`.                                                                          | Kein Frontend-Interface nötig; das Ergebnis wird fachlich als schwache bzw. starke Evidenz bewertet ([KNOWLEDGE_TREE.md](KNOWLEDGE_TREE.md)). |
| `LanguageTutorProvider` (Server)                          | Fähigkeitsvertrag `LanguageTutor` im Adapter; Fachendpunkte bleiben die in `docs/ARCHITEKTUR.md` geplanten `POST /api/v1/courses/{code}/tutor/sessions/` und `POST /api/v1/tutor/sessions/{id}/turns/`.                    | Wiederverwendung der geplanten Schnittstellen (G12).                                                                                          |
| Austausch eines Providers = Austausch der Implementierung | Austausch des **Modells** geschieht im Core. LinguaFlow tauscht nur das Backend des Adapters (`core`, `mock`, `disabled`).                                                                                                 | G5: Anwendungslogik bleibt bei Modellwechseln unverändert.                                                                                    |

Die Namen der vier Verträge bleiben erhalten, damit Plan, Knowledge Tree und Tests weiter darauf verweisen können. Sie bezeichnen jetzt Verträge des Adapters, keine austauschbaren App-Provider.

**Gerätequelle und Standard.** Web Speech ist eine Plattformfunktion des Browsers, kein eingebundenes Modell. Sie bleibt die KI-freie Basis für Sprachausgabe und einfache Erkennung (G10). Weil die Erkennung je nach Browser beim Browseranbieter laufen kann, wird sie weiterhin entsprechend gekennzeichnet und kann in den Einstellungen abgeschaltet werden. Ob sie langfristig durch die Server-Quelle ersetzt wird, ist eine offene Entscheidung (Abschnitt 11).

### 3.3 Fähigkeitsverträge und Bedarf an die gemeinsame Infrastruktur

LinguaFlow fordert keine app-eigenen Endpunkte vom Core, sondern generische Fähigkeiten mit sprachbezogenen Parametern. Die Fähigkeits-IDs sind Vorschläge an den gemeinsamen Standard; maßgeblich sind die IDs, die der Core festlegt.

| Vertrag im Adapter      | Benötigte Core-Fähigkeit (Vorschlag)      | Parameter, die LinguaFlow braucht                                                                                 | Status in LinguaFlow                              |
| ----------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `SpeechSynthesis`       | `speech.synthesize`                       | Text, BCP-47-Tag (`ttsLang`), optional Variante und Sprechtempo                                                   | Funktion vorhanden (Gerät); Server-Quelle geplant |
| `SpeechRecognition`     | `speech.transcribe`                       | Audio, BCP-47-Tag, Anzahl Alternativen                                                                            | Funktion vorhanden (Gerät); Server-Quelle geplant |
| `PronunciationAnalysis` | `speech.pronunciation-assess`             | Audio, erwarteter Text, optional Lesung (Pinyin), optional Toninventar; Ergebnis je Silbe inklusive erkanntem Ton | Unmittelbar geplant                               |
| `LanguageTutor`         | `chat.respond` mit strukturierter Ausgabe | Nachrichten, Sprache, Stufe, Register, Zielwörter; Ausgabe: Antwort plus Korrekturhinweise nach Schema            | Unmittelbar geplant                               |

Neu benötigte Fähigkeiten werden in dieser Tabelle ergänzt und als Erweiterungswunsch an den gemeinsamen Core formuliert, bevor in LinguaFlow Code entsteht. Bild- und Texterkennung (`VisionRecognition`, `TextRecognition`) und Übersetzung werden **nicht** angefordert, weil es dafür in LinguaFlow weder Funktion noch Plan gibt.

### 3.4 Vertrag des Adapters (Python-Entwurf)

```python
# backend/ai_service/contracts.py (Entwurf)
class AIService(Protocol):
    def capabilities(self, course: CourseContext) -> EffectiveCapabilities: ...
    def synthesize(self, req: SynthesisRequest, ctx: AppContext) -> AIResult[AudioOut]: ...
    def transcribe(self, req: TranscriptionRequest, ctx: AppContext) -> AIResult[Transcript]: ...
    def assess_pronunciation(self, req: PronunciationRequest, ctx: AppContext) -> AIResult[PronunciationOut]: ...
    def tutor_reply(self, req: TutorRequest, ctx: AppContext) -> AIResult[TutorOut]: ...

@dataclass
class AIResult(Generic[T]):
    status: Literal["ok", "unavailable", "timeout", "rejected", "error"]
    value: T | None
    capability: str          # z. B. "speech.pronunciation-assess"
    capability_version: str
    model: str | None        # nur zur Anzeige und Protokollierung
    origin: Literal["self-hosted", "external", "mock"] | None
```

Fachcode prüft `status` und behandelt alles außer `ok` als „KI nicht verfügbar“. Er liest `model` nie zur Steuerung.

---

## 4. Capability API und Language Capabilities

### 4.1 Zwei Arten von Capabilities

| Art                       | Quelle                                                                       | Frage, die sie beantwortet                                            | Beispiel                                                 |
| ------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------- |
| **Language Capabilities** | Sprachpaket, statisch ([LANGUAGE_CAPABILITIES.md](LANGUAGE_CAPABILITIES.md)) | Was zeichnet die Sprache aus, welche Inhalte und Module hat der Kurs? | zh: `tones` (5), `reading: pinyin`, Modul `zh.tones`     |
| **AI Capabilities**       | Capability API des Core, dynamisch                                           | Was kann der Core gerade, für welche Sprachen und Versionen?          | `speech.pronunciation-assess` für `zh-CN` mit Tonausgabe |

### 4.2 Abgleich

Der Adapter berechnet pro Kurs die **effektiven KI-Fähigkeiten** und stellt sie über `GET /api/v1/courses/{code}/ai-capabilities/` bereit. Eine KI-Funktion ist nur verfügbar, wenn alle Bedingungen erfüllt sind:

1. **Konfiguration:** Funktion in `AI_FEATURES` aktiviert, Backend nicht `disabled`.
2. **Core:** Fähigkeit gemeldet, Version kompatibel, Sprache unterstützt (Abgleich über `ttsLang` bzw. `varieties` des Pakets).
3. **Sprachpaket:** fachliche Voraussetzung deklariert. Beispiele:
   - Tonrückmeldung in der Ausspracheanalyse nur bei `capabilities.tones` **und** wenn der Core Tonsegmente für diese Sprache liefert. Liefert er nur Gesamtwerte, gibt es Ausspracheanalyse ohne Tondetails.
   - Erwartete Lesung wird nur bei `capabilities.reading` mitgesendet.
   - Tutor-Register nur aus `capabilities.registers`.
4. **Konto:** angemeldet, Zustimmung für die Funktion erteilt (Abschnitt 6).

Das Ergebnis enthält je Funktion `available`, `reason` bei Nichtverfügbarkeit und `origin`. Das Frontend blendet Bedienelemente analog zu `isModuleAvailable` (`src/app/navigation.ts`) ein oder aus. Language Capabilities werden nie von der Core-Antwort verändert: Fehlt eine Core-Fähigkeit, bleibt der Kurs vollständig nutzbar.

### 4.3 Abfrage und Cache

- Der Adapter fragt die Core-Capability-API beim ersten Bedarf und danach nach Ablauf einer konfigurierbaren Frist ab (`AI_CAPABILITY_TTL`).
- Ist der Core nicht erreichbar, gelten alle KI-Fähigkeiten als nicht verfügbar (degradierter Modus), bis eine erneute Abfrage gelingt.
- Bei unbekannter Hauptversion einer Fähigkeit wird sie ignoriert und protokolliert (ohne Inhalte).

---

## 5. Konfiguration und Fehlerbehandlung

Variablen (geplant; sie kommen erst mit dem Adapter in `.env.example`):

| Variable                                       | Zweck                                                                  | Standard                            |
| ---------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------- |
| `AI_BACKEND`                                   | `disabled`, `mock` oder `core`                                         | `disabled`                          |
| `AI_CORE_BASE_URL`                             | Basisadresse des Core                                                  | leer                                |
| `AI_CORE_API_VERSION`                          | erwartete Hauptversion der Core-API                                    | vom Standard vorgegeben             |
| `AI_CORE_AUTH`, `AI_CORE_TOKEN`                | Authentifizierungsart nach Standard (z. B. Dienst-Token) und Geheimnis | leer                                |
| `AI_APP_ID`, `AI_INSTANCE_ID`                  | Anwendungs- und Instanzkontext (Abschnitt 6)                           | `linguaflow`, leer                  |
| `AI_FEATURES`                                  | aktivierte Funktionen, z. B. `pronunciation,tutor`                     | leer                                |
| `AI_TIMEOUT_CONNECT`, `AI_TIMEOUT_<FÄHIGKEIT>` | Verbindungs- und Antwortzeitlimits je Fähigkeit                        | kurz für Synthese, länger für Tutor |
| `AI_RETRIES`                                   | Wiederholungen nur für idempotente Aufrufe                             | 1                                   |
| `AI_CIRCUIT_THRESHOLD`, `AI_CIRCUIT_COOLDOWN`  | Schwelle und Pause des Circuit Breakers                                | konservativ                         |
| `AI_CAPABILITY_TTL`                            | Gültigkeit der Fähigkeitsabfrage                                       | einige Minuten                      |
| `AI_MAX_AUDIO_SECONDS`, `AI_MAX_TEXT_CHARS`    | Größenlimits vor dem Senden                                            | knapp                               |

Verhalten:

| Situation                  | Reaktion                                                                                                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Timeout, Verbindungsfehler | Retry nur bei idempotenten Aufrufen (Capability-Abfrage, Synthese, Transkription mit Idempotenzschlüssel). Tutor-Züge nur mit Idempotenzschlüssel wiederholen.                       |
| Wiederholte Fehler         | Circuit Breaker öffnet; alle betroffenen Fähigkeiten gelten bis zur Pause als nicht verfügbar.                                                                                       |
| Ungültige Antwort (Schema) | Verwerfen, `status="error"`; nie eine halbe Antwort anzeigen.                                                                                                                        |
| Fallback                   | Nur auf die KI-freie Variante derselben Aufgabe (Abschnitt 8), **nie** auf ein anderes Modell oder einen externen Anbieter außerhalb des Core. `mock` ist kein Produktions-Fallback. |
| Degradierter Modus         | Fachendpunkte antworten mit `503` und maschinenlesbarem Grund; die Oberfläche zeigt die KI-freie Variante und einen ruhigen Hinweis. Lernstand bleibt unberührt.                     |

---

## 6. Benutzerdaten, Berechtigungen und Anwendungskontext

**Trennung der Verantwortung**

| Bereich           | Verantwortlich          | Inhalt                                                                                                                         |
| ----------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Benutzerdaten     | LinguaFlow (PostgreSQL) | Konto, Lernstand, Fundstücke, gegebenenfalls gespeicherte Tutor-Verläufe. Verlassen die App nur minimiert.                     |
| Berechtigungen    | LinguaFlow              | Sitzung, CSRF, Zustimmung je KI-Funktion, Rate-Limit pro Konto. Der Core prüft nur das App-Token und dessen Fähigkeits-Scopes. |
| Anwendungskontext | Adapter → Core          | `app_id`, `instance_id`, `purpose` (z. B. `language-learning.tutor`), Kurscode, pseudonymer `subject`.                         |

**Was an den Core geht (Datenminimierung)**

- Gesendet: Fähigkeits-ID, Sprach-Tag, Kurscode, Stufe, Szenen-ID, Wort-IDs und Formen aus dem Katalog, Register, der eingegebene Text bzw. die Aufnahme, Zeitlimit.
- Pseudonym: `subject` = HMAC aus Konto-ID und einem app-eigenen Geheimnis. Er erlaubt dem Core Kontingente und Verlaufszuordnung, ohne die Identität zu kennen, und ist zwischen Apps nicht verknüpfbar.
- Nicht gesendet: Benutzername, E-Mail-Adresse, Konto-ID, Passwort-Hashes, vollständiger Lernstand, private Fundstücke (nur mit ausdrücklicher Zustimmung, dann einzeln).
- Aufbewahrung: LinguaFlow fordert pro Anfrage „keine Speicherung“ bzw. die vereinbarte Frist an; gespeicherte Verläufe in LinguaFlow nur per Opt-in mit Frist. Export (`GET /api/v1/me/`) und Kontolöschung (`DELETE /api/v1/me/`) umfassen dann auch diese Daten (`docs/ARCHITEKTUR.md`).
- Audio wird im Arbeitsspeicher verarbeitet und nicht in LinguaFlow gespeichert.

---

## 7. Mock-Provider für die Entwicklung

Solange der Core fehlt, gibt es zwei Ebenen, beide deterministisch und ohne Modell:

1. **`MockBackend` im Adapter** (Unit- und Integrationstests): feste Antworten je Fähigkeit, konfigurierbare Fehler (Timeout, Schemafehler, `unavailable`) für Resilienztests, Fähigkeitsliste aus einer Datei.
2. **Mock-Core als HTTP-Dienst** (optional, Compose-Profil `ai-mock`): implementiert die versionierte Core-API mit denselben festen Antworten. So wird auch `CoreBackend` mit HTTP, Authentifizierung und Timeouts geprüft. Sobald der Core eine OpenAPI-Spezifikation veröffentlicht, wird der Mock daraus abgeleitet oder durch den offiziellen Mock des Standards ersetzt.

Mock-Antworten tragen `origin="mock"` und werden in der Oberfläche als „Testantwort“ gekennzeichnet. `AI_BACKEND=mock` ist in Produktionskonfigurationen unzulässig; der Adapter verweigert den Start mit `mock`, wenn `DJANGO_HTTPS=1` gesetzt ist.

---

## 8. Funktionen mit und ohne KI

| Funktion                                        | Ohne KI (immer verfügbar)                                              | Mit Core (optional)                                                              |
| ----------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Hören, Sprachausgabe                            | Gerätestimme über Web Speech                                           | Server-Synthese, z. B. wenn keine Gerätestimme für die Sprache installiert ist   |
| Sprechen üben                                   | SpeakCheck mit Browser-Erkennung, gekennzeichnet „vom Browser erkannt“ | Ausspracheanalyse mit Silben- und gegebenenfalls Tonrückmeldung                  |
| Töne (Mandarin)                                 | Tonlabor: Töne nach Gehör unterscheiden                                | Rückmeldung zur eigenen Tonproduktion                                            |
| Gespräche                                       | Kuratierte Szenen und Rollenspiele                                     | Freies Gespräch zu einer Szene; Knowledge-Knoten liefern Zielwörter und Register |
| Worterklärung                                   | Redaktionelle Erklärungen (`understanding`) mit Status                 | Kein Live-Ersatz; nur Entwürfe für die Redaktion (Abschnitt 9)                   |
| Wiederholung, Fortschritt, Plan, Knowledge Tree | vollständig                                                            | keine KI-Abhängigkeit vorgesehen                                                 |

---

## 9. KI-erzeugte Inhalte und Redaktion

1. **Einheitlicher Herkunftsstatus** für Worterklärungen und Knowledge-Knoten: `draft` (menschlicher Entwurf), `generated` (KI-Entwurf), `reviewed` (geprüft, mit Quelle), `retired`. Für `WordExplanation` wird `generated` additiv ergänzt (`backend/catalog/explanations.py`).
2. **Kein Weg von `generated` zu `reviewed` ohne Mensch.** Der Paketvalidator lehnt `reviewed` ohne `sourceNote` ab. Später hält `content_revision.reviewed_by` (`docs/ARCHITEKTUR.md`) den Prüfer fest.
3. **Kennzeichnung:** „Entwurf“ bzw. „KI-Entwurf, nicht geprüft“; Tutor-Antworten als „KI-Antwort“. Tutor-Antworten gelangen nie in den Katalog.
4. **Entwürfe entstehen offline** über denselben Adapter (z. B. Management-Kommando), Ausgabe nach `private/`. Ins Paket nur nach manueller Übernahme (README, „Git, Zugangsdaten und persönliche Inhalte“).
5. **Keine Verschleierung** der KI-Herkunft (AGENTS.md).

---

## 10. Tests

| Test                               | Prüft                                                                                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| „KI aus“ (`AI_BACKEND=disabled`)   | Alle Routen und Lernabläufe funktionieren; keine KI-Bedienelemente; Fähigkeitsendpunkt meldet alles als nicht verfügbar               |
| Kein Core-Zugriff aus dem Frontend | Architekturtest: keine Core-Adresse und keine `AI_CORE_*`-Variable im Frontend-Bundle; `VITE_`-Variablen enthalten keine KI-Endpunkte |
| Keine Modelle in der App           | Abhängigkeitsprüfung von `package.json` und `requirements.txt` gegen eine Liste von Modell- bzw. Inferenzbibliotheken                 |
| Fähigkeitsabgleich                 | Tabellentests: Core-Fähigkeiten × Language Capabilities × Konfiguration × Zustimmung → erwartete Verfügbarkeit und Grund              |
| Contract-Tests `CoreBackend`       | Gegen den Mock-Core: Versionierung, Authentifizierung, Schema, Fehlercodes                                                            |
| Resilienz                          | Timeout, Retry nur bei idempotenten Aufrufen, Circuit Breaker, degradierter Modus mit `503`, Lernstand unverändert                    |
| Datenminimierung                   | Die an den Core gesendete Nutzlast enthält keinen Benutzernamen, keine E-Mail, keine Konto-ID; `subject` ist pro App verschieden      |
| Herkunftsstatus                    | Validator lehnt `reviewed` ohne Quelle ab; `generated` und `mock` werden in der Oberfläche gekennzeichnet                             |

---

## 11. Offene Punkte

1. **Spezifikation des Core:** Fähigkeits-IDs, API-Version, Authentifizierungsart und Capability-Format legt der gemeinsame Standard fest. Die Angaben hier sind Erwartungen der LinguaFlow-Seite und werden nach dessen Veröffentlichung angeglichen.
2. **Web-Speech-Erkennung:** Beibehalten als gekennzeichnete Gerätefunktion oder schrittweise durch die Server-Quelle ersetzen, sobald der Core `speech.transcribe` anbietet.
3. **Compose-Anbindung:** gemeinsames externes Docker-Netz oder lokale Adresse zum Core auf dem Heimserver. Bei gemeinsamer Nutzung der 16 GB RAM begrenzt der Adapter Parallelität (z. B. eine laufende Tutor-Anfrage pro Konto); Modell- und Ressourcenplanung liegen im Core.
