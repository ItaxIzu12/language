# LinguaFlow · Architektur und Datenmodell

## Entscheidung

Eine React-Anwendung, ein Django-Prozess und eine PostgreSQL-Datenbank bedienen alle Lernsprachen. nginx liefert das gebaute Frontend aus und leitet die API derselben Origin an Gunicorn weiter. Das Paket für GitHub Pages verwendet dieselbe Lernoberfläche im Gastmodus. React/Vite, TypeScript und Compose sind bereits in den Build-, Styling- und Veröffentlichungsablauf integriert. DRF ergänzt die öffentliche Katalog-API um typisierte Abfrageparameter. Die vorhandenen Sitzungs- und Synchronisierungsendpunkte behalten ihre Django-Implementierung und ihre v1-Verträge.

Der wichtigste Kompromiss ist der vollständige Lernstand pro Konto und Sprache. Er ermöglicht den Import älterer Sicherungen und atomare Schreibvorgänge mit Versionsprüfung. Dafür wird bei einer Änderung der ganze Stand übertragen, und zwei Geräte können unabhängig geänderte Karten noch nicht zusammenführen. Erst wenn gemessene Dokumentgrößen, häufige Konflikte oder eine serverseitige Fälligkeitsliste das rechtfertigen, werden Karten und Tagesaktivitäten relational. Die Spracherkennung im Browser, die Sprachmodell-Anbindung und die Aussprachebewertung sind drei verschiedene Aufgaben.

Das Web-Manifest und das responsive Layout bilden die mobile Basis. Der Gastmodus kann nach dem Laden lokal arbeiten. Ein Kaltstart ohne Netzwerk braucht zusätzlich einen getesteten Service Worker für App-Shell, Schriften und versionierte Sprachpakete. Private API-Antworten gehören nicht in diesen Cache. Capacitor kommt erst bei einem konkreten Bedarf an nativen Funktionen hinzu.

## Projektstruktur und Zuständigkeiten

| Pfad ab Projektwurzel | Verantwortung |
|---|---|
| src/main.tsx, src/App.tsx, src/types.ts | Einstieg, Routen, öffentliche Lern- und Sprachtypen |
| src/features/account/ | Konto, Einstellungen, Sitzungsaufbau, API-Client und Synchronisierung |
| src/features/study/ | Wortschatz, Lektion, Quiz, Fundstücke, Wiederholen |
| src/features/practice/ | Hören, Lesen, Sprechen, Podcast und sprachabhängiges Tonlabor |
| src/features/progress/ | Tagesblatt und Chronik |
| src/components/ | Gemeinsame Navigation, Layout, Rückmeldungen und Übungsbausteine |
| src/lib/ | Store, SRS, Tagesplan, Übungserzeugung, Pinyin, Audio-Hilfen |
| src/data/languages.ts | Registrierung und Auswahl der verfügbaren Pakete |
| src/data/zh/, src/data/zh/vocab/ | Mandarin-Konfiguration und versionierte Lerninhalte |
| src/themes/zh/, src/index.css | Kulturspezifische Datumsanzeige, Schriftzeichen und Gestaltung |
| public/ | Manifest und App-Icon. Künftige Kulturbilder unter public/themes/&lt;code&gt;/ mit Alt-Text, Lizenz bzw. KI-Kennzeichnung im Paket |
| scripts/ | Export derselben Lerninhalte für Django, lokale Initialisierung |
| backend/config/ | URL-Konfiguration, Einstellungen, WSGI, gemeinsame HTTP-Helfer |
| backend/accounts/ | Anmeldung, Sitzung, persönlicher Export und Kontolöschung |
| backend/catalog/ | Globale Kurse und Wörter, DRF-Abfragen |
| backend/catalog/management/commands/ | Transaktionaler Paketimport |
| backend/learning/ | Private Lernstände, Validierung und Synchronisierung |
| backend/{catalog,learning}/migrations/ | Versionierte Schema- und Datenmigrationen |
| backend/catalog/tests/, backend/learning/tests.py | Unit- und API-Integrationstests |
| backend/manage.py, backend/requirements.txt, backend/Dockerfile | Django-CLI, Python-Abhängigkeiten und API-Image |
| Dockerfile, nginx.conf, docker-compose.yml | Frontend-Image, Proxy und lokaler Betrieb |
| package*.json, vite.config.ts, tsconfig.json, tailwind.config.js, postcss.config.js, index.html | Frontend-Build im bestehenden Repository-Root |
| .github/workflows/ | Pages-Veröffentlichung und Full-Stack-Test mit PostgreSQL |
| docs/, README.md, PRODUCT.md, DESIGN.md | Architektur, Einstieg, Produkt und Gestaltung |

Geplante Fachmodule werden mit ihrer ersten Funktion angelegt. Dazu gehören backend/curriculum/ für Grammatik und Szenarien, backend/tutor/ für Gespräche, backend/translation/ für Übersetzungen und backend/integrations/ai/ für Anbieter. Integrationstests bleiben bei der jeweiligen Fach-App.

**Abhängigkeiten.** Der Katalog kennt keine Benutzer. Private Lernstände referenzieren den Katalog. Die Kontoverwaltung darf private Daten für den Export lesen. Fachmodule greifen über schmale Funktionen auf KI-Anbieter zu. Anbieter importieren keine Django-Views. React-Routen importieren Features, UI-Bausteine verwenden gemeinsame Datentypen. Der Store und der Sync-Client teilen TS-Typen über reine Typimporte. Paket-IDs sind stabile technische Schlüssel, Anzeigenamen sind übersetzbar. Python verwendet snake_case, Modell- und React-Komponentennamen PascalCase, bestehende JSON-v1-Felder camelCase. Schemaänderungen am API-Vertrag bekommen explizite Adapter.

## Datenbank im MVP

```mermaid
erDiagram
    USER ||--o{ LEARNING_STATE : besitzt
    COURSE ||--o{ LEARNING_STATE : begrenzt
    COURSE ||--o{ WORD : enthaelt
```

| Physische Tabelle | Schlüssel, Beziehungen und Regeln |
|---|---|
| auth_user, auth_group, auth_permission und Django-Zuordnungstabellen | Django-Primärschlüssel, eindeutiger Benutzername, Passwort-Hash und Gruppenrechte |
| django_session | Sitzungsschlüssel als PK, Ablaufzeit indexiert; Cookie enthält den Sitzungsschlüssel |
| learning_course | code als PK, name und content JSONB für das ausgelieferte Paket |
| learning_word | id als PK, course_id als FK, UNIQUE(course_id,key), Index über (course_id,category,level), position bestimmt die Reihenfolge, active steuert Sichtbarkeit |
| learning_learningstate | id als PK, user_id als FK mit Kaskade, language als FK auf Kurscode mit Löschschutz, UNIQUE(user_id,language), revision, updated_at, document JSONB |

Ein Wort kann im aktuellen Austauschformat eine deutsche Glosse, ein Beispiel und eine Hauptkategorie tragen. Die Lernstand-Revision ist pro Konto **und** Kurs. Anwendungsvalidierung kontrolliert Box, Fälligkeit, Zähler, Einstellungen und eigene Wörter. Der Client berechnet XP für die persönliche Lernhilfe. Ein Wettbewerbsranking bräuchte eine serverseitige Bewertung. Private Fundstücke liegen im Lernstand und erscheinen nie im öffentlichen Wörter-Endpunkt.

## Relationales Zielmodell nach Bedarf

Die folgenden Tabellen sind der Ausbauentwurf. Die Namen bezeichnen logische Tabellen, bis eine App-Migration sie tatsächlich einführt. Jede Tabelle erhält einen bigint-PK, sofern unten ein anderer Schlüssel genannt ist. Alle genannten Verweise sind Fremdschlüssel. Zuordnungstabellen haben einen zusammengesetzten UNIQUE-Schlüssel bzw. PK. Für die konkrete PostgreSQL-Migration gelten zusätzlich die unten genannten sprachübergreifenden Integritätsregeln.

| Bereich | Tabellen und Integrität |
|---|---|
| Pakete und Herkunft | package_release(course_id, version, digest, imported_at), UNIQUE(course_id,version). source(id, title, locator, license). content_revision(release_id, source_id, quality_status, reviewed_by, reviewed_at), mit Status draft, generated, reviewed, retired. Wortbedeutungen, Beispiele und Lektionen referenzieren ihre Revision. Prüfer ist optional und wird bei Kontolöschung auf NULL gesetzt. |
| Bedeutungen und Übersetzungen | word_sense(word_id, stable_key, register, revision_id), UNIQUE(word_id,stable_key). gloss(sense_id, locale, text), UNIQUE(sense_id,locale,text). example(sense_id, text, reading, revision_id) und example_translation(example_id, locale, text). Register liegt an der Bedeutung und erlaubt neutral, formal, informal, unspecified. |
| Sprachvarianten | variety(course_id, tag, label), UNIQUE(course_id,tag). sense_variant(sense_id,variety_id,surface,reading), UNIQUE(sense_id,variety_id,surface). Ein Mandarin-Eintrag kann etwa Formen aus zh-CN und zh-TW verbinden. |
| Kategorien und Stufen | category(course_id,slug,label), UNIQUE(course_id,slug). word_category(word_id,category_id). level_system(code,edition), UNIQUE(code,edition). level(system_id,code,rank), UNIQUE(system_id,code). course_level(course_id,level_id). word_level(word_id,level_id,source_id). Ohne Zuordnung bleibt ein Wort normal trainierbar. CEFR-Einschätzungen separat von belegten HSK- oder JLPT-Listeneinträgen führen. |
| Grammatik und Übungen | grammar_lesson(course_id,slug,title,revision_id), UNIQUE(course_id,slug). exercise(lesson_id,position,kind,prompt,answer_spec), UNIQUE(lesson_id,position). Antwortschema pro kind validieren. Übungsversuche gehören zum Lernkonto. |
| Szenarien | scenario(course_id,slug,title,revision_id), UNIQUE(course_id,slug). scenario_line(scenario_id,position,role,text,reading), UNIQUE(scenario_id,position). Kuratierte Beispieldialoge bleiben für alle Lernenden gleich. |
| Persönliche Karten | Der bestehende LearningState bildet die Einschreibung. personal_word(enrollment_id,key,surface,reading), UNIQUE(enrollment_id,key). review_card(enrollment_id,word_id NULL,personal_word_id NULL,box,due_on,right_count,wrong_count). CHECK genau ein Wortbezug, nichtnegative Zähler, Box 0–6. Zwei partielle UNIQUE-Indizes je Einschreibung und Wortbezug, Index (enrollment_id,due_on). |
| Fortschritt | daily_activity(enrollment_id,local_date,xp,lesson_count,review_count,apply_count), UNIQUE(enrollment_id,local_date). exercise_attempt(enrollment_id,exercise_id,client_event_id,result,occurred_at), UNIQUE(enrollment_id,client_event_id) für idempotente Wiederholungen. |
| Gespräche und KI-Feedback | tutor_session(enrollment_id,scenario_id NULL,provider,model,created_at,expires_at). turn(session_id,position,role,text), UNIQUE(session_id,position). feedback(turn_id,kind,original_span,suggestion,explanation). Ein Szenario ist optional, der Eigentümer ergibt sich aus der Einschreibung. |
| Übersetzungen | translation_entry(enrollment_id,source_locale,target_locale,input,output,provider,created_at,expires_at). Index (enrollment_id,created_at). Nur bei aktiviertem Verlauf persistieren. |
| Aufnahmen | Bei einem Bedarf an gespeichertem Audio recording(turn_id,object_key,expires_at,deleted_at) mit Index auf expires_at. Audio selbst liegt in privatem Objektspeicher. |

**Sprachgrenzen in PostgreSQL.** Wo zwei FKs dieselbe Sprache haben müssen, auf beiden Eltern UNIQUE(id,course_id) und auf der Zuordnung zusammengesetzte FKs (word_id,course_id) und (category_id,course_id) setzen. Entsprechend für Einschreibung/Katalogwort, Szenario/Einschreibung und Übung/Versuch. Für Privatwörter mit UNIQUE(id,enrollment_id) Eigentum bis zur Karte erzwingen. Diese Regeln gehören in dieselbe Migration wie die neuen Tabellen. Die Anwendung beschränkt zusätzlich jede private Abfrage auf request.user. Katalogeinträge mit Lernhistorie werden deaktiviert. Ein gelöschtes Lernkonto kaskadiert nur in private Tabellen.

```mermaid
erDiagram
    WORD ||--o{ SENSE : bedeutet
    SENSE ||--o{ GLOSS : uebersetzt
    SENSE ||--o{ EXAMPLE : belegt
    WORD ||--o{ WORD_LEVEL : klassifiziert
    LEVEL ||--o{ WORD_LEVEL : zugeordnet
    SENSE ||--o{ SENSE_VARIANT : variiert
```

```mermaid
erDiagram
    ENROLLMENT ||--o{ REVIEW_CARD : plant
    ENROLLMENT ||--o{ TUTOR_SESSION : besitzt
    SCENARIO o|--o{ TUTOR_SESSION : inspiriert
    TUTOR_SESSION ||--o{ TURN : enthaelt
    TURN ||--o{ FEEDBACK : erhaelt
    ENROLLMENT ||--o{ TRANSLATION_ENTRY : speichert
```

## Lern-Engine und Sprachpakete

Ein neues Paket implementiert Language mit Code, Lerninhalten, TTS-Locale, Lesungsbezeichnung, Kulturdarstellung und optionaler Normalisierung der Lesung. tonePractice aktiviert das Mandarin-Tonlabor in Navigation und Tagesplan. Andere Sprachen erhalten den gemeinsamen Lernablauf. Für eine weitere Tonsprache mit anderer Tonzahl ist ein eigener Übungstyp bzw. eine konfigurierbare Toninventarliste nötig. Die heutigen deutschen Glossen und die CEFR-Auswahl sind bewusst Teil des MVP.

Beispiel eines Mandarin-Paketausschnitts für den Import-Test:

```json
[{"code":"zh","name":"Mandarin","categories":[{"id":"food"}],"vocab":[
  {"id":"zh:茶:chá:n","target":"茶","reading":"chá","de":"Tee","category":"food","pos":"noun","level":"A1"},
  {"id":"zh:水:shuǐ:n","target":"水","reading":"shuǐ","de":"Wasser","category":"food","pos":"noun","level":"A1"}
]}]
```

Im Zielmodell könnte eine Bedeutung von 您 (nín) das Register formal und die deutsche Glosse „Sie“ erhalten. Dieselbe Bedeutung darf den Kategorien „Anrede“ und „Höflichkeit“ angehören. Eine Prüfungsstufe wird erst mit Quelle und Listenausgabe eingetragen.

Die Autoren pflegen Paketquellen im Repository. Der Build exportiert sie über dieselbe Registry wie der Browser. Der Django-Import läuft in einer Transaktion, aktualisiert anhand (course,key), erhält Wort-PKs und deaktiviert entfernte Wörter. Ein doppelter Schlüssel im exportierten Paket oder eine unbekannte Kategorie bricht die Transaktion ab. Der historische TS-Parser dedupliziert Rohzeilen bereits vorher. Für Fremdpakete vor Freigabe Rohdaten, Lizenz, ID-Kollisionen und Sprachqualität gesondert prüfen. Neue Schlüssel sollten als unveränderliche IDs vergeben werden. Bei alten, aus Schrift und Lesung gebildeten IDs erfordert eine Korrektur einen expliziten Alias samt Lernstandmigration.

## API v1

| Ressource | Zugriff und Vertrag |
|---|---|
| GET /api/v1/courses/ und /courses/{code}/ | Öffentlich. Paketübersicht bzw. Sprachkonfiguration einschließlich Lesetexten und Dialogen |
| GET /api/v1/courses/{code}/words/ | Öffentlich. q durchsucht Schrift, Lesung und deutsche Bedeutung. category und level filtern exakt. offset ≥ 0, limit 1–200, Standard 50 |
| GET /api/v1/session/ | Aktuelle Sitzung und CSRF-Token |
| POST /api/v1/register/, /login/, /logout/ | Anmeldung/Registrierung mit username und password, CSRF für alle drei Endpunkte |
| GET, PUT /api/v1/state/{code}/ | Eigentümer aus der Sitzung. X-Learner schützt vor versehentlichem Schreiben nach Kontowechsel. PUT enthält revision und document |
| GET, DELETE /api/v1/me/ | Export aller Sprachstände bzw. Kontolöschung nach Passwortbestätigung per JSON. Beides erfordert eine Sitzung, DELETE zusätzlich CSRF |
| GET /api/v1/health/ | Prüft die Datenbankverbindung |

Beispiel: GET /api/v1/courses/zh/words/?q=chá&limit=1 liefert {"count":N,"results":[…]}. Ein neuer Lernstand liefert {"revision":0,"document":null}. Beim Speichern folgt {"revision":1}. HTTP 400 kennzeichnet ungültige Daten, 401 eine fehlende Sitzung bei privaten Ressourcen, 403 abgewiesenes CSRF/Passwort, 404 einen unbekannten Kurs, 409 eine veraltete Revision oder einen Kontowechsel und 429 zu viele Anmeldeversuche. DRF liefert Validierungsfehler nach Feld und 404 mit detail; die bisherigen JSON-Views verwenden error, die Django-CSRF-Middleware kann HTML zurückgeben. Clients behandeln zuerst den Status. Additive Felder sind mit v1 vereinbar, eine Umdeutung bestehender Felder benötigt v2 und eine dokumentierte Übergangsfrist.

Spätere APIs folgen dem Fachablauf: GET /courses/{code}/grammar/, POST /state/{code}/attempts/, POST /courses/{code}/tutor/sessions/, POST /tutor/sessions/{id}/turns/ und POST /courses/{code}/translations/. Ein TutorService lädt die eigene Sitzung, minimiert Kontext und ruft einen serverseitig ausgewählten Provider über eine kleine Schnittstelle generate(messages, language, timeout) auf. Der Adapter liefert Text, Modellkennung und optional strukturiertes Feedback zurück. Schema und Größenlimits prüfen, Timeouts behandeln; ein fehlgeschlagener Aufruf erzeugt keine fertige Antwort. Lokales Ollama und eine externe API implementieren dieselbe Schnittstelle. Keine automatische Weitergabe an externe Anbieter bei Ausfall des lokalen Modells. Zugangsdaten werden nur im gewählten Prozess injiziert.

## Datenschutz und Betrieb

- Im MVP dient der Browser per Sitzungs-Cookie und CSRF als einziger schreibender Client. Lernende dürfen eigene Daten lesen und ändern. Kursinhalte sind über HTTP schreibgeschützt. Der Import ist ein Betreiberkommando. Künftige Redaktion erhält Django-Gruppen mit einzelnen Katalogrechten. Zugriff auf private Gespräche ist eine eigene Berechtigung.
- Der Standardbetrieb bindet nginx an Loopback. Für LAN oder Internet vor Freigabe TLS an einem vertrauenswürdigen Reverse Proxy terminieren, Host-Allowlist setzen, Secure-Cookies per DJANGO_HTTPS=1 aktivieren und die HTTPS-Origin für CSRF exakt konfigurieren. Forwarded-Header nur vom eigenen Proxy akzeptieren. Keine Datenbankports veröffentlichen. Keine Passwörter, Sprachtexte oder Prompts in Anfragelogs.
- Django hasht Passwörter. Lokale Secrets liegen in der ignorierten .env mit restriktiven Dateirechten. Externe KI bleibt ausgeschaltet, bis der Benutzer Anbieter, gesendete Daten und Speicherverhalten gewählt hat. Browser-Spracherkennung kann vom Browseranbieter verarbeitet werden; selbst gehostete Django-Endpunkte speichern derzeit keine Audiodateien.
- Für die erste eigene Sprachaufnahme als Standard Verarbeitung im Arbeitsspeicher wählen. Falls ein Job eine Datei braucht, nach Verarbeitung entfernen und höchstens 24 Stunden als festgelegtes Produktlimit zulassen. Löschjob und Monitoring vor Aktivierung testen. Gesprächs- und Übersetzungsverlauf per Opt-in mit konfigurierbarer Frist. Export und Kaskadenlöschung um jede private Tabelle erweitern. Backups altern nach ihrer eigenen Frist aus.
- Der vorhandene UI-Export gilt für eine Sprache. GET /me/ exportiert alle Serverstände. DELETE /me/ entfernt das Konto. Gastdaten, heruntergeladene Exporte und lokale Tab-Entwürfe sind eigene Kopien.
- Vor Migrationen und regelmäßig mit pg_dump sichern. Archive verschlüsselt außerhalb des Docker-Volumes halten und mit Datum, App-Version und Schema-Version versehen. Beispiel für einen Wiederherstellungstest in einer separaten, leeren Datenbank im lokalen Compose-Stack:

```bash
mkdir -p backups
(umask 077 && docker compose exec -T db sh -ec 'exec pg_dump -Fc -U "$POSTGRES_USER" "$POSTGRES_DB"' > backups/restore-test.dump)
docker compose exec -T db sh -ec 'createdb -U "$POSTGRES_USER" linguaflow_restore_test'
docker compose exec -T db sh -ec 'pg_restore -U "$POSTGRES_USER" --exit-on-error --no-owner -d linguaflow_restore_test' < backups/restore-test.dump
docker compose exec -T db sh -ec 'psql -U "$POSTGRES_USER" -d linguaflow_restore_test -c "SELECT count(*) FROM learning_word"'
```

Prüfe zusätzlich Benutzerzahl, Lernstandrevisionen und eine stichprobenartige Anmeldung an einer isolierten Wiederherstellungsinstanz. Die Frist für Backup-Aufbewahrung muss zur gewählten Löschfrist passen.

## Migrations- und Implementierungsreihenfolge

1. **MVP-Grundlage, umgesetzt.** Bestehende URLs und Tabellen beibehalten, Katalog über migrations.SeparateDatabaseAndState der neuen App zuordnen. Aktive Wörter kennzeichnen. Bereits gespeicherte Sprachcodes vor Anlegen des FK durch Kurszeilen abdecken. So bleiben Benutzer, Wort-PKs und Lernstandrevisionen erhalten.
2. **Vor der zweiten Sprache.** Zweites vollständiges Testpaket durch Build, Katalog und Lern-UI führen. Offline-Kaltstart, Sprachwechsel mit ausstehendem Entwurf und Gerätekonflikte im Browser testen. Der API-Integrationstest prüft bereits zwei getrennte Sprachstände. Für serverübergreifende automatische Konfliktauflösung wären einzelne Lernereignisse nötig.
3. **Vor redaktioneller Pflege.** Releases und Provenienz einführen, danach Bedeutungen, Glossen und Mehrfachzuordnungen. Bestehende JSON-Nutzdaten zunächst mit stabilen IDs zurückfüllen. Alte und neue Repräsentation anhand von Anzahl, Schlüsseln und Beispielen vergleichen. v1-Ausgabe aus den neuen Daten erzeugen. Erst nach erfolgreicher Übergangsphase redundante Spalten entfernen.
4. **Wenn serverseitige Wiederholung nötig wird.** Kartentabellen additiv anlegen, Lernstände nach Konto und Sprache in kleinen, wiederholbaren Batches migrieren, Unbekanntes zur Klärung protokollieren. Während des Übergangs pro Transaktion konsistent schreiben oder ein Wartungsfenster nutzen. Umschalten nach vollständigem Abgleich. Ein Rollback nach neuen Schreibvorgängen benötigt Rückmigration oder Wiederherstellung samt Nachführung.
5. **Neue Lernmodule.** Eine Grammatiklektion samt auswertbarer Übung und einen Dialog zuerst vertikal liefern. Dann lokalen KI-Adapter anbinden und mit einem deterministischen Testadapter prüfen. Externen Anbieter und freiwilligen Verlauf erst nach Löschen, Export, Timeout- und Datenschutztests aktivieren.

Für jede Schemaänderung Migration ins Repository legen, gegen ein leeres Schema und gegen eine Kopie des vorherigen Releases prüfen. CI baut beide Images, startet PostgreSQL, führt Django-Tests aus und prüft die Wort-API über nginx. Vor einem produktiven Rollout zusätzlich Backup-Wiederherstellung und Browser-Lernablauf verifizieren.
