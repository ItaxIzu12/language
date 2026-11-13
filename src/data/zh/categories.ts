import type { Category } from "../../types";

/**
 * Thematic categories for Mandarin vocabulary.
 * Add a new category here, then tag words with its `id` in vocab.ts.
 */
export const categories: Category[] = [
  { id: "basics", name: "Grundlagen & Begrüßung", icon: "👋", description: "Die allerersten Wörter: Pronomen, Höflichkeit, Ja/Nein." },
  { id: "people", name: "Menschen & Familie", icon: "👨‍👩‍👧", description: "Familie, Freunde, Beziehungen." },
  { id: "numbers", name: "Zahlen & Mengen", icon: "🔢", description: "Zahlen, Zählwörter, Mengenangaben." },
  { id: "time", name: "Zeit & Datum", icon: "🕒", description: "Uhrzeit, Tage, Wochen, Zeitangaben." },
  { id: "food", name: "Essen & Trinken", icon: "🍜", description: "Gerichte, Getränke, Geschmack, Restaurant." },
  { id: "shopping", name: "Einkaufen & Geld", icon: "🛍️", description: "Geschäfte, Kleidung, Preise, Bezahlen." },
  { id: "travel", name: "Reisen & Verkehr", icon: "✈️", description: "Wege, Verkehrsmittel, Urlaub, Hotel." },
  { id: "directions", name: "Wege & Orte", icon: "🧭", description: "Richtungen, Orte, Orientierung." },
  { id: "home", name: "Zuhause & Alltag", icon: "🏠", description: "Wohnen, Alltagsroutine, Haushalt." },
  { id: "work", name: "Arbeit & Studium", icon: "💼", description: "Beruf, Büro, Lernen, Termine." },
  { id: "education", name: "Schule & Lernen", icon: "🎓", description: "Schule, Uni, Sprache, Lesen und Schreiben." },
  { id: "hobbies", name: "Hobbys & Freizeit", icon: "⚽", description: "Sport, Spiele, Aktivitäten." },
  { id: "media", name: "Medien & Internet", icon: "📱", description: "Handy, Social Media, Filme, Chat." },
  { id: "feelings", name: "Gefühle & Meinungen", icon: "💭", description: "Emotionen, Meinungen, Vorschläge." },
  { id: "health", name: "Gesundheit & Körper", icon: "🩺", description: "Körper, Krankheit, Arzt, Wohlbefinden." },
  { id: "weather", name: "Wetter & Natur", icon: "🌦️", description: "Wetter, Jahreszeiten, Natur." },
  { id: "verbs", name: "Häufige Verben", icon: "🏃", description: "Die wichtigsten Alltagsverben." },
  { id: "adjectives", name: "Adjektive & Eigenschaften", icon: "🎨", description: "Beschreibungen, Farben, Eigenschaften." },
  { id: "connectors", name: "Konnektoren & Grammatik", icon: "🔗", description: "Verbindungswörter, Partikel, Strukturen." },
  { id: "society", name: "Gesellschaft & Abstraktes", icon: "🌏", description: "Themen Richtung B1/B2: Bildung, Umwelt, Wirtschaft." },
];
