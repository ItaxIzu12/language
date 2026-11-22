import { config } from "./config";
import scenarios from "./content/dialogues/scenes.json";
import { numbersToMarks } from "./linguistics/pinyin";
import wordExplanations from "./content/word-explanations.json";
import type { WordExplanation } from "../types";
import type { Language } from "../types";
import { culture } from "./presentation/culture";
import categories from "./content/categories.json";
import listening from "./content/listening/sentences.json";
import episodes from "./content/listening/episodes.json";
import podcasts from "./content/listening/podcasts.json";
import texts from "./content/reading/texts.json";
import a1 from "./content/vocabulary/A1.json";
import a2 from "./content/vocabulary/A2.json";
import b1 from "./content/vocabulary/B1.json";
import b2 from "./content/vocabulary/B2.json";

export const zh: Language = {
  ...config,
  normalizeReading: numbersToMarks,
  scenarios,
  culture,
  categories,
  vocab: [...a1, ...a2, ...b1, ...b2].map((word) => ({
    ...word,
    understanding: (wordExplanations as Record<string, WordExplanation>)[word.id],
  })) as Language["vocab"],
  listening: listening as Language["listening"],
  podcasts,
  episodes: episodes as Language["episodes"],
  texts: texts as Language["texts"],
};
