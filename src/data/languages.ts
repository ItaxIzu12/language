import type { Language, Level, Pos } from "../types";
import { zh } from "./zh";

/**
 * Language registry. To add a language:
 *  1. create src/data/<code>/ with the same structure as src/data/zh/
 *  2. import it here and add it to `languages`
 */
export const languages: Language[] = [zh];

/** Shown as "coming soon" in the language picker. */
export const upcomingLanguages = [
  { code: "ja", name: "Japanisch", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Koreanisch", nativeName: "한국어", flag: "🇰🇷" },
  { code: "vi", name: "Vietnamesisch", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  { code: "es", name: "Spanisch", nativeName: "Español", flag: "🇪🇸" },
];

export function getLanguage(code: string): Language {
  return languages.find((l) => l.code === code) ?? languages[0];
}

export const POS_LABELS: Record<Pos, string> = {
  noun: "Nomen",
  verb: "Verb",
  adjective: "Adjektiv",
  adverb: "Adverb",
  pronoun: "Pronomen",
  number: "Zahl/Menge",
  measure: "Zählwort",
  conjunction: "Konjunktion",
  preposition: "Präposition",
  particle: "Partikel",
  phrase: "Wendung",
  interjection: "Ausruf",
};

export const LEVELS: Level[] = ["A1", "A2", "B1", "B2"];
