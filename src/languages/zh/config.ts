import type { Language } from "../types";

export const config = {
  code: "zh",
  name: "Chinesisch",
  nativeName: "中文",
  ttsLang: "zh-CN",
  readingName: "Pinyin",
  readingHint: "Tonzahlen werden umgewandelt: ni3 hao3 wird zu nǐ hǎo.",
  tonePractice: true,
  toneModule: "mandarin",
  available: true,
  presentation: {
    brandLabel: "Mandarin Lernen",
    switchImage: "mandarin/palace.webp",
    accent: "#852e25",
    illustrationCredit: "Illustrationen: KI-generiert",
    trial: { path: "/sprachen/zh/teehaus", label: "Probelektion im Teehaus" },
  },
} satisfies Partial<Language>;
