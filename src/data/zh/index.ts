import type { Example, Language, Level, Pos, VocabItem } from "../../types";
import { categories } from "./categories";
import { culture } from "./culture";
import { listening } from "./listening";
import { episodes, podcasts } from "./podcasts";
import { texts } from "./reading";
import part1 from "./vocab/part1";
import part2 from "./vocab/part2";
import part3 from "./vocab/part3";
import part4 from "./vocab/part4";
import part5 from "./vocab/part5";
import part6 from "./vocab/part6";
import part7 from "./vocab/part7";
import part8 from "./vocab/part8";
import part9 from "./vocab/part9";

const POS: Record<string, Pos> = {
  n: "noun",
  v: "verb",
  adj: "adjective",
  adv: "adverb",
  pron: "pronoun",
  num: "number",
  mw: "measure",
  conj: "conjunction",
  prep: "preposition",
  part: "particle",
  phr: "phrase",
  int: "interjection",
};

const LEVELS: Level[] = ["A1", "A2", "B1", "B2"];

/**
 * Parses the compact line format used in ./vocab/*.ts:
 *   Wort | Lesung | Deutsch | Wortart | Niveau | Beispiel | Beispiel-Lesung | Beispiel-Deutsch | L
 */
function parseBlocks(blocks: Record<string, string>, seen: Set<string>): VocabItem[] {
  const out: VocabItem[] = [];
  for (const [category, block] of Object.entries(blocks)) {
    for (const raw of block.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const f = line.split("|").map((s) => s.trim());
      const [target, reading, de, posCode, levelCode] = f;
      if (!target || !reading || !de) continue;
      const pos = POS[posCode] ?? "phrase";
      const level = (LEVELS.includes(levelCode as Level) ? levelCode : "A2") as Level;
      const id = `zh:${target}:${reading}:${posCode}`;
      if (seen.has(id)) {
        if (import.meta.env.DEV) console.warn("[LinguaFlow] Doppeltes Wort übersprungen:", id);
        continue;
      }
      seen.add(id);
      let example: Example | undefined;
      if (f[5] && f[6] && f[7]) example = { target: f[5], reading: f[6], de: f[7] };
      out.push({
        id,
        target,
        reading,
        de,
        pos,
        category,
        level,
        example,
        learned: f[8] === "L" || undefined,
      });
    }
  }
  return out;
}

const seen = new Set<string>();
// Stable sort by level, so lessons in every category run from A1 up to B2.
const vocab: VocabItem[] = [part1, part2, part3, part4, part5, part6, part7, part8, part9]
  .flatMap((p) => parseBlocks(p, seen))
  .map((w, i) => ({ w, i }))
  .sort((a, b) => LEVELS.indexOf(a.w.level) - LEVELS.indexOf(b.w.level) || a.i - b.i)
  .map((x) => x.w);

export const zh: Language = {
  code: "zh",
  name: "Chinesisch",
  nativeName: "中文",
  ttsLang: "zh-CN",
  readingName: "Pinyin",
  available: true,
  culture,
  categories,
  vocab,
  listening,
  podcasts,
  episodes,
  texts,
};
