import { numbersToMarks } from "../../lib/pinyin";
import type { Language } from "../../types";
import { culture } from "../../themes/zh/culture";
import categories from "./categories.json";
import listening from "./listening.json";
import episodes from "./episodes.json";
import podcasts from "./podcasts.json";
import texts from "./texts.json";
import a1 from "./vocab/A1.json";
import a2 from "./vocab/A2.json";
import b1 from "./vocab/B1.json";
import b2 from "./vocab/B2.json";

export const zh: Language = {
  code: "zh",
  tonePractice: true,
  normalizeReading: numbersToMarks,
  name: "Chinesisch",
  nativeName: "中文",
  ttsLang: "zh-CN",
  readingName: "Pinyin",
  available: true,
  culture,
  categories,
  vocab: [...a1, ...a2, ...b1, ...b2] as Language["vocab"],
  listening: listening as Language["listening"],
  podcasts,
  episodes: episodes as Language["episodes"],
  texts: texts as Language["texts"],
};
