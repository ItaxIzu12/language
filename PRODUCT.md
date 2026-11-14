# Product

LinguaFlow – eine Web-App zum Sprachenlernen. Erste Sprache: Chinesisch (Mandarin) für Deutschsprachige.

## Platform

web (responsive, als PWA auf dem Handy installierbar)

## Stack

React 18, TypeScript, Vite, Tailwind CSS, React Router (HashRouter). GitHub Pages bietet den Gastmodus. Der Docker-Betrieb ergänzt Django, PostgreSQL und persönliche Lernkonten.

## Users

- Zuerst der Entwickler selbst: deutschsprachiger Erwachsener, lernt Mandarin im Selbststudium neben Beruf und
  eigenem App-Projekt, Niveau etwa A2, Ziel B2. Lernt in kurzen Einheiten über den Tag verteilt (mittags eine
  Hauptlektion, nachmittags kurzes Abrufen, abends Anwenden und Hören), oft am Handy.
- Später möglicherweise zahlende Lernende (Verkauf und Marketing sind eine Option, noch keine Entscheidung).

## Product Purpose

Natürliches Alltags- und Chat-Mandarin lernen und langfristig behalten: Wortschatz nach Kategorien und Stufen,
Lektionen, Wiederholung mit Spaced Repetition, Lesen, Hören, Sprechen, Dialoge. Die App soll über Jahre nutzbar
bleiben und um weitere Sprachen und Inhalte wachsen können.

## Positioning

Kein Nachbau bestehender Sprachlern-Apps. Eigenständiger Auftritt und eigene Funktionen; hochwertig, modern,
extravagant. Lernen soll Spaß machen, ohne kindlich zu wirken.

## Operating Context

- Tägliche Nutzung in Sitzungen von 10 bis 30 Minuten, häufig mobil, auch am Desktop.
- Chinesische Schriftzeichen, Pinyin mit Tonzeichen und deutsche Übersetzung stehen fast überall nebeneinander;
  die Schriftzeichen sind der eigentliche Lerngegenstand.
- Sprachausgabe über die Stimmen des Geräts, Spracherkennung nur in Chrome, Edge und Safari.

## Capabilities and Constraints

- 2.647 Wörter (A1 bis B1 vollständig nach HSK-Listen, B2 im Aufbau), 20 Kategorien, 4 Stufen.
- Lektionen, Karteikarten (Leitner, 7 Stufen), Quiz, 10 Lesetexte, Hörverstehen, Sprechübungen, 6 Dialoge
  (als Podcast und als Rollenspiel), XP, Tagesziel, Tages-Serie.
- Ohne Login und Registrierung. Fortschritt liegt im Browser (localStorage), Export und Import als Datei.
- Inhalte sind reine Textdateien; neue Wörter, Texte, Dialoge und Sprachen müssen ohne Code-Umbau ergänzbar bleiben.
- Hell und Dunkel. Muss offline-tauglich bleiben (keine Abhängigkeit von fremden Diensten zur Laufzeit außer Schriften).

## Brand Commitments

- Name: LinguaFlow.
- Deutsche Oberfläche.
- Extravagant und eigenständig; keine typische Sprachlern-App-Optik (keine Maskottchen-, Comic- oder
  Bonbon-Ästhetik).

## Evidence on Hand

- Lerninhalte wie oben. Keine Nutzerzahlen, Bewertungen, Preise oder Kundenstimmen – nichts davon darf erfunden werden.

## Product Principles

- Der Lerngegenstand (Schriftzeichen, Klang, Bedeutung) steht im Mittelpunkt, nicht die Dekoration.
- Jede Sitzung soll in unter einer Minute zum ersten sinnvollen Lernschritt führen.
- Langfristigkeit vor Effekten: was heute gelernt wird, muss in Monaten noch auffindbar und wiederholbar sein.
- Verständlichkeit vor Vollständigkeit; kein Perfektionsdruck.

## Accessibility & Inclusion

- Tastaturbedienung, sichtbarer Fokus, ausreichender Kontrast in Hell und Dunkel.
- Bewegung respektiert `prefers-reduced-motion`.
- Schriftzeichen groß genug zum Erkennen feiner Striche; Pinyin abschaltbar.
