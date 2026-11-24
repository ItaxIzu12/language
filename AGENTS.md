# Projekt language / LinguaFlow

Dieses Projekt ist eine Sprachlern-App. Bewahre bestehende Funktionen und lokale
Änderungen. Lies vor Änderungen die betroffenen Komponenten und Projektkonventionen.

## Produktidentität

- Gestalte LinguaFlow als eigenständige, ruhige und verständliche Sprachlernsoftware.
- Der öffentliche Einstieg (Startseite, Anmeldung und Registrierung) verwendet eine
  gemeinsame, sprachübergreifende Produktgestaltung. Der Schwerpunkt liegt auf
  Wortschatz, Gesprächen und Wiederholungen. Kulturelle Gestaltung gehört dezent
  in die Lernwelt der jeweiligen Sprache, nicht in den öffentlichen Einstieg.
  Reduziere Kultur nicht auf Sehenswürdigkeiten, Flaggen oder stereotype Länderbilder.
- Die Startseite ist ein allgemeiner Einstieg in die mehrsprachige Plattform.
  Richte Überschrift, Nutzenversprechen und Hauptaktion nicht auf eine einzelne
  Sprache aus. Einzelne Sprachen dürfen als klar gekennzeichnete Lernbeispiele dienen.
- Trenne verfügbare Kurse sichtbar von geplanten Sprachen. Leite die Verfügbarkeit
  aus der Sprachregistrierung ab; versprich keine nicht vorhandenen Funktionen.
- Bewahre die jeweils eigene kulturelle Gestaltung der einzelnen Lernwelten.

## Gestaltung und Inhalte

Bevorzuge:

- klare visuelle Hierarchie, gut lesbare Schrift und konsistente Abstände;
- Layouts, die aus Inhalt und Nutzeraufgabe entstehen;
- das vorhandene Markenlogo und eine konsistente Farb- und Formensprache;
- konkrete Lernbeispiele und echte Produktansichten;
- wenige charakteristische Gestaltungselemente statt ständiger Dekoration;
- verständliche deutsche Texte und ehrliche Verfügbarkeitsangaben;
- authentische, passend lizenzierte Fotos, wenn sie dem Inhalt helfen.

Vermeide ohne konkreten funktionalen oder gestalterischen Grund:

- dekorative Glows, Glassmorphism und Farbverläufe;
- austauschbare Bento-Raster und Karten um jeden Inhalt;
- übermäßige Rundungen, Schatten und Animationen;
- KI-generierte Reisekulissen und stereotype Kulturcollagen;
- dekorative Emojis als Ersatz für konsistente Icons;
- generische Werbesprache und unbelegte Qualitätsversprechen;
- erfundene Bewertungen, Nutzerzahlen, Lernerfolge oder Produktfunktionen;
- identische Abschnittsmuster auf der gesamten Seite.

Serifenschriften, Karten und Farbverläufe sind nicht grundsätzlich verboten.
Entscheidend sind ihre begründete Verwendung und ihr Beitrag zur Markenidentität.
Prüfe jedes Element: Hilft es beim Verstehen, Benutzen oder Erkennen der Marke?
Wenn nicht, entferne es. Ersetze einen generischen Stil nicht durch sterile Beliebigkeit.

Kennzeichne KI-generierte Inhalte ehrlich. Verschleiere ihre Herkunft nicht durch
künstliche Fehler, Körnung oder andere Effekte. Dokumentiere bei neuen externen
Bildern Quelle und Nutzungsrechte; verwende keine ungeprüften Bildrechte.

## Design-Skills gezielt einsetzen

- Prüfe zuerst, welche Skills tatsächlich verfügbar sind, und lies deren aktuelle
  Anweisungen vor der Anwendung. Behaupte keine Verwendung nicht geladener Skills.
- Nutze Impeccable, sofern verfügbar, für die Verfeinerung von Typografie, Abständen,
  Hierarchie und konsistenten Oberflächen.
- Nutze einen UX-Audit, etwa `product-design:audit`, für Navigation, Verständlichkeit,
  Nutzerführung und eine kritische Gesamtprüfung.
- Nutze Stageshow, sofern verfügbar, gezielt für Produktvorschauen und kurze
  React-Demos. Es ist kein Ersatz für die Gestaltung und Prüfung der gesamten App.
- Kombiniere Skills nach Aufgabe statt mehrere vollständige Designsysteme zu mischen.
  Die Projektidentität und die ausdrücklichen Vorgaben des Nutzers haben Vorrang.
- Installiere keine Skills oder zusätzlichen Pakete allein aufgrund dieser Auflistung.
  Fehlt ein angeforderter Skill, benenne das, statt seine Nutzung vorzutäuschen.

## Stageshow und Produktvorschauen

- Zeige einen kleinen, verständlichen Ablauf, beispielsweise:
  Ausdruck entdecken → Bedeutung verstehen → wiederholen.
- Übernimm Farben, Typografie, Bedienelemente und Verhalten der tatsächlichen App.
  Erfinde keine Funktionen für einen überzeugenderen Werbeeffekt.
- Kennzeichne inszenierte oder vereinfachte Ansichten als Lernbeispiel bzw. Vorschau.
  Verwende Beispieldaten statt persönlicher Nutzerdaten.
- Jede Bewegung muss einen nachvollziehbaren Zusammenhang zeigen. Vermeide
  dauerhafte Ablenkung, unnötige Kameraeffekte und dekorative Cursorbewegungen.
- Beachte `prefers-reduced-motion`: biete eine verständliche statische Ansicht.
  Automatisch laufende längere Animationen müssen pausierbar sein.
- Halte Vorschauen leichtgewichtig; lade keine umfangreiche Animationsbibliothek
  für einen einfachen Effekt. Verhindere Layoutsprünge.
- Die Vorschau ergänzt den allgemeinen Einstieg. Sie darf die Startseite nicht
  auf eine einzelne Sprache verengen oder die Hauptaktion verdrängen.

## Bedienbarkeit und Prüfung

- Prüfe Tastaturbedienung, sichtbaren Fokus, verständliche Beschriftungen,
  ausreichende Kontraste und gut erreichbare Touch-Ziele.
- Verstecke wesentliche Informationen und Aktionen nicht hinter Hover-Effekten.
- Prüfe Desktop und schmale Mobilansichten auf Überläufe, abgeschnittene Inhalte,
  Lesbarkeit und sinnvolle Reihenfolge.
- Führe nach Codeänderungen den passenden Build bzw. vorhandene relevante Checks aus.
  Schreibe keine Tests, die lediglich statische Gestaltungsvorgaben duplizieren.
- Prüfe sichtbare Änderungen nach Möglichkeit im Browser. Ein erfolgreicher Build
  ersetzt keine visuelle Prüfung. Falls sie technisch nicht möglich ist, sage das klar.
- Berichte knapp, was umgesetzt wurde, wie es geprüft wurde und welche Einschränkungen
  noch bestehen. Garantien wie „kein KI-Look“ oder „perfektes Design“ sind unangebracht.
