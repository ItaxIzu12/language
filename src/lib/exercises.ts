import type { VocabItem } from "../types";
import { shuffle } from "./utils";

/** Returns the word plus (n-1) plausible distractors, shuffled. */
export function makeOptions(word: VocabItem, pool: readonly VocabItem[], n = 4): VocabItem[] {
  const usable = pool.filter((w) => w.id !== word.id && w.de !== word.de && w.target !== word.target);
  const samePos = shuffle(usable.filter((w) => w.pos === word.pos));
  const others = shuffle(usable.filter((w) => w.pos !== word.pos));
  const picked: VocabItem[] = [];
  const seenDe = new Set<string>([word.de]);
  const seenTarget = new Set<string>([word.target]);
  for (const w of [...samePos, ...others]) {
    if (picked.length >= n - 1) break;
    if (seenDe.has(w.de) || seenTarget.has(w.target)) continue;
    seenDe.add(w.de);
    seenTarget.add(w.target);
    picked.push(w);
  }
  return shuffle([word, ...picked]);
}

const PUNCT = /[\s.,!?;:'"“”‘’。，！？；：、…·()（）\-—]/g;

/**
 * Splits an example sentence into tappable tiles (one per character).
 * Returns null when the sentence is unsuitable (too long, contains Latin text).
 */
export function sentenceTiles(sentence: string): string[] | null {
  const clean = sentence.replace(PUNCT, "");
  if (clean.length < 3 || clean.length > 9) return null;
  if (/[A-Za-z0-9]/.test(clean)) return null;
  return [...clean];
}

export function stripPunct(sentence: string): string {
  return sentence.replace(PUNCT, "");
}
