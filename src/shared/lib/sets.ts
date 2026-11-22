import { LEVELS } from "../../languages/registry";
import type { Language, Level, VocabItem } from "../../languages/types";

/** A group of words that can be browsed and learned: a category or a level. */
export interface WordSet {
  id: string;
  kind: "category" | "level";
  name: string;
  glyph: string;
  description: string;
  words: VocabItem[];
}

export const LEVEL_INFO: Record<Level, { title: string; description: string }> = {
  A1: { title: "Einstieg", description: "Die ersten Wörter: begrüßen, bestellen, sich vorstellen." },
  A2: { title: "Grundlagen", description: "Alltag meistern: einkaufen, verabreden, erzählen." },
  B1: { title: "Mittelstufe", description: "Frei sprechen über Arbeit, Reisen, Meinungen und Pläne." },
  B2: { title: "Obere Mittelstufe", description: "Abstrakte Themen, Gesellschaft, feinere Ausdrucksweise." },
};

export function levelSetId(level: Level): string {
  return `level-${level}`;
}

export function getSet(lang: Language, id: string | undefined): WordSet | undefined {
  if (!id) return undefined;
  const level = LEVELS.find((l) => levelSetId(l) === id);
  if (level) {
    const info = LEVEL_INFO[level];
    return {
      id,
      kind: "level",
      name: `Stufe ${level} – ${info.title}`,
      glyph: lang.culture.levelGlyphs[LEVELS.indexOf(level)],
      description: info.description,
      words: lang.vocab.filter((w) => w.level === level),
    };
  }
  const category = lang.categories.find((c) => c.id === id);
  if (!category) return undefined;
  return {
    id,
    kind: "category",
    name: category.name,
    glyph: category.glyph,
    description: category.description,
    words: lang.vocab.filter((w) => w.category === category.id),
  };
}
