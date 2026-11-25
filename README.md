# LinguaFlow 语

Moderne Web-App zum Sprachenlernen – gebaut für langfristiges Lernen und einfach erweiterbar.
Erste Sprache: **Chinesisch (Mandarin)**, von A1 Richtung B2.

Das [Architekturhandbuch](docs/ARCHITEKTUR.md) enthält Datenmodell, Schnittstellen, Betrieb und Ausbauplan. Die mehrsprachige Zielarchitektur mit Maßnahmenplan steht in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), die KI-Anbindung in [docs/AI_INTEGRATION.md](docs/AI_INTEGRATION.md).

## Lokaler Start mit Docker Compose

Voraussetzungen sind Git und ein laufendes Docker Desktop oder Docker Engine mit Compose v2 oder neuer. Die Befehle laufen im Verzeichnis mit `docker-compose.yml`. Für diesen Start brauchst du auf dem Host weder Node.js noch PostgreSQL.

**Mit einem Befehl starten**

```sh
./scripts/init-env.sh
```

Beim ersten Start erzeugt das Skript mit OpenSSL die lokale Konfiguration. Weitere Aufrufe verwenden die vorhandene `.env`. Im Terminal siehst du die Compose-Prüfung, den Build, den Start und den Status der Dienste.

**Optionale manuelle Einrichtung.** Beim ersten Einrichten die Vorlage kopieren und nur die Kopie bearbeiten. Falls bereits eine `.env` vorhanden ist, behalte sie und ergänze bei Bedarf einzelne Felder.

```sh
(umask 077 && cp -n .env.example .env)
```

Öffne `.env` in deinem Editor. Erzeuge zwei unabhängige Zufallswerte und trage je einen in `POSTGRES_PASSWORD` und `DJANGO_SECRET_KEY` ein. Ein Passwortmanager kann beide Werte erstellen. Alternativ generiert `openssl rand -hex 48` bei jedem Aufruf einen neuen Wert.

| Variable                      | Zweck und lokaler Standard                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| `POSTGRES_DB`                 | Datenbankname, standardmäßig `linguaflow`                                                         |
| `POSTGRES_USER`               | Technische Datenbankrolle, standardmäßig `linguaflow`                                             |
| `POSTGRES_PASSWORD`           | Eigenes zufälliges Passwort für die Datenbankrolle                                                |
| `DJANGO_SECRET_KEY`           | Separater zufälliger Django-Signaturschlüssel                                                     |
| `WEB_PORT`                    | Port auf deinem Rechner, standardmäßig `8080`                                                     |
| `DJANGO_ALLOWED_HOSTS`        | Erlaubte Hostnamen, lokal `localhost,127.0.0.1,[::1]`. Der Container-Healthcheck nutzt localhost. |
| `DJANGO_HTTPS`                | Lokal `0`. Hinter eingerichtetem HTTPS aktiviert `1` Secure-Cookies.                              |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | Lokal leer. Bei Bedarf exakte HTTPS-Origins durch Kommas trennen.                                 |

**Docker-Befehle, die das Skript ausführt**

```sh
docker compose config --quiet
docker compose up --build --wait --wait-timeout 180
docker compose ps
```

Die App öffnet sich unter [localhost:8080](http://localhost:8080). Bei geändertem `WEB_PORT` verwende deinen gewählten Port. Unter **Einstellungen → Lernkonto → Neues Konto anlegen** erstellst du einen Lernzugang. Zur Übernahme eines Gaststands exportierst du im Gastmodus eine Sicherung und liest sie im gewünschten Konto wieder ein.

| Dienst       | Aufgabe                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `linguaflow` | nginx liefert das gebaute React-Frontend aus und leitet `/api/v1/` weiter. Nur dieser Dienst belegt einen Host-Port, gebunden an Loopback. |
| `backend`    | Django/Gunicorn, Migrationen und Import des Mandarin-Pakets beim Start                                                                     |
| `db`         | PostgreSQL 17, persistente Daten im benannten Volume `pgdata`                                                                              |

**Betrieb und Fehlersuche**

```sh
docker compose logs --tail=80 backend
docker compose exec backend python manage.py showmigrations
docker compose exec backend python manage.py test
docker compose down
```

`down` erhält das Datenvolume. Nach Änderungen am Code mit `docker compose up --build --wait` neu bauen. Bei belegtem Web-Port passe `WEB_PORT` an. Bei fehlendem Pflichtwert meldet bereits `config --quiet` den Variablennamen. Bei einem bestehenden Volume ändert das Bearbeiten der `.env` allein kein Datenbankpasswort. Eine Rotation erfolgt zuerst koordiniert an der vorhandenen Datenbankrolle, anschließend in der lokalen Konfiguration. `down -v` löscht das Volume und damit Konten und Lernstände.

**Sichern und Wiederherstellung prüfen.** Datenbankexporte enthalten private Lernstände und Passwort-Hashes. Lege sie im ignorierten Verzeichnis `backups/` ab. Der folgende Befehl verwendet die im Container konfigurierten Namen:

```sh
mkdir -p backups
(umask 077 && docker compose exec -T db sh -ec 'exec pg_dump -Fc -U "$POSTGRES_USER" "$POSTGRES_DB"' > "backups/linguaflow-$(date +%Y%m%d-%H%M%S).dump")
```

Eine zweite verschlüsselte Kopie außerhalb des Rechners schützt vor Verlust des Volumes und der lokalen Sicherung. Die Anleitung zur Wiederherstellung in einer separaten Testdatenbank steht im [Architekturhandbuch](docs/ARCHITEKTUR.md).

## Einstieg und Anbieter-Anmeldung

Die Startseite zeigt die verfügbaren Lernsprachen. **Chinesisch** öffnet den Mandarin-Einstieg. Dort führen Anmeldung, Registrierung oder Gastzugang zum Tagesblatt. GitHub Pages unterstützt den Gastzugang. Der Docker-Betrieb bietet zusätzlich Lernkonten.

Für Google eine OAuth-Webanwendung anlegen und die beiden GOOGLE-Werte in der lokalen `.env` setzen. Für Apple die Services ID, Team ID, Key ID und den privaten Signaturschlüssel im Backend konfigurieren. Die Return-URL des jeweiligen Anbieters lautet `https://<deine-domain>/api/oauth/google/login/callback/` bzw. `https://<deine-domain>/api/oauth/apple/login/callback/`. Für Google ist lokal auch `http://localhost:8080/api/oauth/google/login/callback/` eintragbar. Apple benötigt eine registrierte HTTPS-Domain. Für HTTPS Host, CSRF-Origin und DJANGO_HTTPS konfigurieren. Nach dem Setzen der Werte das Startskript erneut ausführen. Die Anmeldemaske zeigt Google und Apple in beiden Formularansichten. Ein Anbieter wird bei vollständigen Zugangsdaten freigeschaltet. Mit `GOOGLE_LOGIN_ENABLED=0` oder `APPLE_LOGIN_ENABLED=0` in der lokalen `.env` kannst du ihn pausieren. Übernimm Änderungen mit `docker compose up -d --build`.

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
- **Gastmodus und Lernkonto** – lokal im Browser lernen oder im Docker-Betrieb mit einem Konto
  Fortschritt, Fundstücke und Einstellungen in PostgreSQL speichern. JSON-Export und -Import sind in beiden Modi verfügbar.
- Hell und Dunkel, Tastaturbedienung, mobil nutzbar, als App installierbar.

## Gestaltung je Sprache

Die Oberfläche wechselt mit der Lernsprache ihre Welt: Schrift, Farben, Motive und das Markenzeichen der Startseite.
Navigation, Bedienelemente und Seitenaufbau bleiben in allen Sprachen gleich.

- **Chinesisch: „Abreißkalender 黄历"** – Songti-Druckschrift, Zinnoberrot, Siegel und die Almanach-Spalten
  宜 (günstig) und 忌 (meiden), kombiniert mit schmalen modernen Ziffern und strengem Raster.

Die Regeln stehen in `DESIGN.md`, die Produktbeschreibung in `PRODUCT.md`. Technisch besteht eine Welt aus zwei Teilen:

1. einem Farb- und Schriftsatz in `src/styles/styles.css` unter `[data-theme="<id>"]` (hell und dunkel),
2. einer `culture`-Beschreibung der Sprache (`src/languages/<code>/presentation/culture.ts`): Name der Welt, Zeichen für die
   Tagesblatt-Spalten, Siegel, Stufen-Marken und die Funktion, die das heutige Datum in der Sprache schreibt.

## Inhalt (Stand v0.4)

|                                   |                                           |
| --------------------------------- | ----------------------------------------- |
| Wörter gesamt                     | 4.691 in 20 Kategorien                    |
| nach Stufe                        | A1: 522 · A2: 883 · B1: 1.214 · B2: 2.072 |
| davon aus dem bisherigen Kurs (★) | 414                                       |
| Wörter mit Beispielsatz           | 4.527                                     |
| Lesetexte                         | 10 (A1–B2) mit je 3 Verständnisfragen     |
| Hörsätze                          | 48 kuratierte + alle Beispielsätze        |
| Podcast-Episoden / Rollenspiele   | 6 Dialoge (A1–B1)                         |

**Abdeckung bis B2:** Der Wortschatz enthält alle Wörter der offiziellen Listen HSK 3.0 Stufen 1–5 und HSK 2.0
Stufen 1–5 sowie die Chat- und Alltagswörter aus dem eigenen Kurs. Die Stufen-Zuordnung
(HSK 3.0 Stufe 1 = A1, 2 = A2, 3 = B1, 4–5 = B2) ist eine Näherung.

Die HSK-Ergänzung wurde automatisch erzeugt und maschinell geprüft (Format, Pinyin-Silben,
Dubletten), aber nicht Wort für Wort von einem Menschen gegengelesen. Fällt ein Fehler auf, lässt er sich in der
jeweiligen Zeile direkt korrigieren.

### API und Synchronisierung

| Pfad unter `/api/v1/`            | Methode  | Ergebnis                                                                                                                                                                                             |
| -------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `health/`                        | GET      | Datenbankverbindung                                                                                                                                                                                  |
| `session/`                       | GET      | Kontoname und CSRF-Token                                                                                                                                                                             |
| `register/`, `login/`, `logout/` | POST     | Django-Cookie-Sitzung; Registrierung und Anmeldung erwarten username und password. Nach 5 Fehlanmeldungen sperrt `login` den Benutzernamen 15 Minuten (429), zusätzlich zum IP-Limit in `nginx.conf` |
| `courses/`, `courses/zh/`        | GET      | Verfügbare Kurse bzw. Kursinhalte mit Kategorien, Lesetexten und Hörmaterial                                                                                                                         |
| `courses/zh/words/`              | GET      | Wörter, filterbar nach level und category, mit limit und offset                                                                                                                                      |
| `state/zh/`                      | GET, PUT | Persönlicher Lernstand mit Revision, Einstellungen, SRS, Tagesaktivität und Fundstücken                                                                                                              |

Schreibzugriffe verwenden `X-CSRFToken`. Lernstand-Anfragen senden zusätzlich den URL-kodierten
Kontonamen als `X-Learner`. Das Konto für den Datenzugriff stammt aus der Sitzung.
PUT erwartet `{revision, document}`; bei konkurrierenden Änderungen antwortet Django mit HTTP 409.
Die Oberfläche bietet in diesem Fall Export und Neuladen an. Ausstehende Änderungen werden
im aktuellen Tab zwischengespeichert. Beim Wechsel des Geräts zuerst den Speicherstatus prüfen.
Die Lernübungen und die Leitner-Berechnung laufen weiter im Browser. Das Backend validiert und
versioniert den gesamten Lernstand je Sprache. Die statische GitHub-Pages-Version läuft im Gastmodus.

Tests gegen das in Compose verwendete PostgreSQL:

```bash
docker compose exec backend python manage.py test
```

## Frontend separat starten

Voraussetzung: [Node.js](https://nodejs.org) 22 (wie im Docker-Build).

```bash
npm ci           # Abhängigkeiten aus package-lock.json
npm run dev      # Entwicklungsserver, meist http://localhost:5173
npm run build    # fertige Version nach dist/
npm run preview  # die gebaute Version lokal ansehen
```

## Git, Zugangsdaten und persönliche Inhalte

Die versionierte `.env.example` enthält leere Pflichtfelder und öffentliche Standardwerte. Zugangsdaten gehören in die lokale `.env`. Variablen mit Präfix `VITE_` sind für Browsercode bestimmt. Verwende sie ausschließlich für öffentliche Einstellungen.

| Daten                                                             | Lokaler Ablageort                                  |
| ----------------------------------------------------------------- | -------------------------------------------------- |
| Datenbankpasswort, Django-Schlüssel und spätere Anbieter-Tokens   | `.env` oder lokales `secrets/`                     |
| Rohimporte, Gesprächsmitschnitte, Screenshots und private Notizen | `private/`                                         |
| Browserexporte und Datenbanksicherungen                           | `exports/`, `backups/`                             |
| Aufnahmen und Uploads                                             | `recordings/`, `uploads/`                          |
| Öffentlich auslieferbare Kursinhalte und Beispiele                | `src/languages/*/content/` nach manueller Freigabe |

Diese privaten Verzeichnisse sind in Git und im Docker-Build-Kontext ausgeschlossen. Eine Datei unter `src/` oder `public/` kann im Browser und auf GitHub Pages sichtbar werden. Nutze dort nur freigegebene Lernbeispiele. Namen, private Gesprächsinhalte, Bilder und personenbezogene Freitexte erfordern eine inhaltliche Prüfung. Der Git-Verlauf enthält außerdem die in Git konfigurierte Commit-Identität. Für eine private Adresse kannst du die von GitHub bereitgestellte Noreply-Adresse als lokale `user.email` konfigurieren.

**Einmal pro Klon vor dem ersten Push** den lokalen Hook aktivieren. Auf macOS mit Homebrew:

```sh
brew install gitleaks
git config --local core.hooksPath .githooks
git config --get core.hooksPath
gitleaks git --redact --log-opts="--all" .
```

Unter Linux installiere Gitleaks ab Version 8.19 über die [offiziellen Releases](https://github.com/gitleaks/gitleaks/releases). Der Hook prüft ausgehende Commits einschließlich zwischenzeitlich entfernter Dateien auf ausgeschlossene Pfade und bekannte Secret-Muster. Bei fehlendem Scanner hält er den Push an. Vor jedem Commit zusätzlich `git diff --cached` lesen. Mit `git check-ignore -v .env` lässt sich die lokale Ausschlussregel prüfen. `git ls-files -- .env` sollte leer bleiben.

Bereits veröffentlichte Zugangsdaten beim Anbieter sperren oder rotieren. Danach die betroffenen Dateien aus der Versionierung nehmen und bei Bedarf den Verlauf koordiniert bereinigen. Ein Ignore-Muster entfernt keine frühere Veröffentlichung. Für weitere Mitwirkende kann der Repository-Inhaber zusätzlich GitHub Push Protection aktivieren, sofern für das Repository verfügbar.

### Kostenlos online stellen (GitHub Pages)

Im Repository unter **Settings → Pages → Source** „GitHub Actions" wählen. Danach baut und veröffentlicht der
mitgelieferte Workflow (`.github/workflows/deploy.yml`) die App bei jedem Push automatisch unter
`https://DEIN-NAME.github.io/linguaflow/`.

## Erweitern

### Mandarin-Inhalte bearbeiten

Der Wortschatz steht in [A1.json](src/languages/zh/content/vocabulary/A1.json), [A2.json](src/languages/zh/content/vocabulary/A2.json), [B1.json](src/languages/zh/content/vocabulary/B1.json) und [B2.json](src/languages/zh/content/vocabulary/B2.json). Bestehende Wort-IDs bleiben bei Textkorrekturen erhalten. Kategorien, Hörsätze, Lesetexte, Dialogepisoden und Podcast-Empfehlungen stehen in den JSON-Dateien in den Unterordnern von `src/languages/zh/content/`. Browser und Django-Import verwenden dieselbe Kursregistrierung.

### Neue Sprache

1. `src/languages/<code>/` mit `config.ts`, `index.ts` und passenden `content/`-Unterordnern anlegen.
2. `presentation/culture.ts` und bei Bedarf `presentation/theme.css` ergänzen. Das Theme ausschließlich über `src/styles/styles.css` laden.
3. Das Datenpaket in `src/languages/registry.ts` registrieren. Wort-IDs müssen dauerhaft sprachspezifisch bleiben.
4. Dialoge als `scenarios` im Paket liefern. Gemeinsame Funktionen brauchen keine Kopien.
5. Nur besondere Oberflächen oder Übungen in `src/app/languageViews.ts` registrieren; der gemeinsame Tagesplan funktioniert als Standardstartseite.
6. `npm run test:architecture`, `npm run test:learning`, `npm run build` sowie Inhaltsimport und Spracheinstellung prüfen.

Jede Sprache hat ihren eigenen Fortschritt und ihre eigenen Fundstücke.

## Aufbau

```
src/
  data/          Inhalte je Sprache: Vokabeln, Hörsätze, Lesetexte, Podcasts, Kultur
  lib/           Logik: store (Fortschritt, SRS, XP, Tagesplan), tts, speech, pinyin, exercises
  components/    Layout, Navigation, wiederverwendbare Bausteine
  features/         Heute, Wortschatz, Lektion, Karten, Fundstücke, Quiz, Hören, Sprechen, Tonlabor,
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
- **Gastfortschritt** liegt im `localStorage` des Browsers. Kontodaten liegen im Docker-Betrieb in PostgreSQL.
- Die externen Podcast-Links können sich ändern; sie stehen in `src/languages/zh/content/listening/podcasts.json`.

## Ideen für später

weitere Sprachen mit eigener Gestaltung, Schreibübungen mit Strichfolge, Grammatik-Lektionen, weitere Sprachen, eigene Audioaufnahmen
für den Podcast, Abzeichen und Ranglisten.

## Lizenz

MIT. Siehe [LICENSE](LICENSE).

## Alltagsszenen und kurze Lernpläne

Die Startseite führt direkt zur Probelektion. Im Bereich „Dialoge“ stehen drei
zusammenhängende Teehaus-Szenen bereit. Jede Szene endet mit einer Auswahlaufgabe.
„Abschlussaufgabe gelöst“ belegt diese Aufgabe, keine geprüfte freie Sprechkompetenz.
Die Inhalte liegen in `src/languages/zh/content/dialogues/scenes.json`, die gemeinsame Darstellung in
`src/features/dialogues`. Neue Sprachen registrieren ihre Szenen in `scenarios.ts`.
Die Texte sollten vor öffentlicher Veröffentlichung muttersprachlich geprüft werden.

Im Profil sind 5, 10 oder 20 Minuten als Richtwert wählbar. Kurze Pläne priorisieren
fällige Wiederholungen. Neue Lektionen enthalten entsprechend 2, 3 oder 5 Wörter.
Kurswörter lassen sich in den Wortdetails als Fundstück speichern. Unvollständige
Formulare werden pro Konto und Sprache auf dem Gerät zwischengespeichert.

## Konto und Wiederherstellung

Neue Registrierungen erfassen eine E-Mail-Adresse. Bestehende Passwortkonten
können ihre Wiederherstellungsadresse im Profil mit ihrem aktuellen Passwort setzen.
E-Mails werden über den in `.env` eingetragenen SMTP-Server versendet:
`EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`,
`EMAIL_USE_TLS`, `DEFAULT_FROM_EMAIL`. `PUBLIC_APP_URL` muss der tatsächlich
erreichbaren Adresse entsprechen, z. B. `https://lernen.example.com`.
Danach Container neu bauen/starten. Ohne SMTP-Konfiguration ist der Versand nicht
verfügbar. Rücksetzlinks laufen nach einer Stunde ab und werden nach Verwendung
ungültig. Die Serverprüfung verwendet die vorhandenen Django-Passwortregeln.

Google und Apple erscheinen nur bei vollständiger Provider-Konfiguration.
Die Zugangsdaten und Redirect-Adressen werden im jeweiligen Anbieter-Konto
eingerichtet. Die Anwendung erzeugt keine Anbieter-Zugangsdaten.

Beim Anmelden/Registrieren kann der Gastfortschritt übernommen werden. Ein leeres
Konto erhält den Gaststand. Bei bereits vorhandenem Kontostand steht der Gaststand
im Wiederherstellungsarchiv im Profil zum Download bereit. Diese Übernahme erfolgt
beim Passwortzugang. Für Social Login bleibt der Gaststand im Gastprofil erhalten.

Ausstehende Kontoänderungen werden pro Schreibsitzung im lokalen Gerätespeicher
gesichert und beim nächsten Kontostart wieder aufgenommen. Bei Versionskonflikten
zeigt das Profil Geräte- und Serverstand. Vor der bewussten Auswahl werden beide
im lokalen Wiederherstellungsarchiv gesichert. Die Auswahl wird erneut gegen
die Serverversion geprüft. Das Archiv gehört zum Browser und sollte auf gemeinsam
genutzten Geräten berücksichtigt werden. Browserdaten löschen entfernt diese
lokalen Sicherungen. Es gibt weiterhin keine vollständige Offline-PWA.

## Mini-PC und Datenbanksicherungen

Mit vorhandener `.env` startet `sh scripts/init-env.sh` die Compose-Dienste.
Der aktuelle Zugang ist auf den Server selbst beschränkt. Für Smartphone-Zugriff
im Heimnetz muss die Bind-Adresse im Compose-Portmapping bewusst angepasst und
der Host in `DJANGO_ALLOWED_HOSTS` aufgenommen werden. Für einen dauerhaft
verwendeten Zugang HTTPS über einen passenden Reverse Proxy einrichten, die
öffentliche URL und CSRF-Ursprünge angleichen. Die konkrete Einrichtung hängt
vom Heimnetz und Zugriffsweg ab.

Sicherung erstellen:

```sh
sh scripts/backup-db.sh
```

Die Dateien unter `backups/` sind von Git ausgeschlossen. Kopiere Sicherungen
zusätzlich auf ein zweites Gerät. Für einen Wiederherstellungstest eine separate
Compose-Installation mit eigener Datenbank verwenden. Der folgende Aufruf
**ersetzt deren Datenbankinhalt**:

```sh
sh scripts/restore-db.sh --replace backups/DATEI.dump
```

Der Restore läuft als einzelne Datenbanktransaktion und stoppt währenddessen
Backend-Schreibzugriffe. SMTP-Versand, OAuth-Anbieter, echter Gerätewechsel und
Restore müssen mit der tatsächlichen Betriebsumgebung geprüft werden.

## Regressionstests der neuen Lernabläufe

```sh
npm run build
node scripts/test-learning.mjs
# Im Backend mit installierten requirements.txt (Python 3.12 oder neuer):
python manage.py test --settings=config.test_settings
```

Den letzten Befehl im Verzeichnis `backend/` ausführen. Er verwendet eine isolierte
SQLite-Testdatenbank. Damit werden unter anderem Passwort-Rücksetzlinks,
Passwortvalidierung und Konto-Isolation geprüft; PostgreSQL-spezifische
Parallelzugriffe benötigen zusätzlich Tests gegen PostgreSQL. Das Node-Skript
prüft Zeitbudgets und die sichere Auswahl bzw. Entfernung lokaler Entwürfe.

## Wort verstehen (sprachübergreifend)

Wortdetails und neue Vokabeln zeigen optional den aufklappbaren Bereich
„Wort verstehen“. Beim Wiederholen erscheint er erst nach dem Aufdecken und
außerhalb der drehbaren Karte. Wörter ohne Erklärung haben keinen leeren Bereich.

Die ersten 20 Mandarin-Erklärungen stehen in
`src/languages/zh/content/word-explanations.json`, zugeordnet über unveränderte Wort-IDs.
Sie beschreiben die heutige Wortverwendung und sind ausdrücklich redaktionelle
Entwürfe, keine verifizierten historischen Zeichenherleitungen. Vor Veröffentlichung
muttersprachlich prüfen und Quellen ergänzen; erst dann `status: "reviewed"` setzen.

Das optionale Feld `VocabItem.understanding` enthält `parts` (geordnet mit
`target`, optional `reading`, `meaning`), `explanation`, optional `mnemonic`,
`status` und `sourceNote`. Andere Sprachen verwenden dieselbe Komponente und
liefern eigene Inhalte. Es findet keine automatische Zerlegung nach Zeichen statt.
Der deutsche Importtest belegt, dass keine chinesische Schrift vorausgesetzt wird.

Der bestehende Export nimmt diese Felder ins Sprachpaket auf. `import_courses`
validiert Erklärungen und speichert sie im vorhandenen globalen `Word.content`
JSONField (PostgreSQL JSONB). Der paginierte Wort-Endpunkt liefert sie mit zurück.
Keine Schema-Migration erforderlich. Eine normalisierte Bestandteiltabelle bleibt
für spätere Querverweise möglich, ist für diese Anzeige aber noch nicht nötig.
Bestehende Docker-Installationen benötigen einen Neubau samt erneutem Inhaltsimport
über den vorhandenen Startablauf, damit der Serverkatalog die Erklärungen enthält.
