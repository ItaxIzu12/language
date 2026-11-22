// Pinyin helpers: reading tones off tone marks, and typing tone marks via numbers.

const MARKS: Record<string, [string, number]> = {
  ā: ["a", 1],
  á: ["a", 2],
  ǎ: ["a", 3],
  à: ["a", 4],
  ē: ["e", 1],
  é: ["e", 2],
  ě: ["e", 3],
  è: ["e", 4],
  ī: ["i", 1],
  í: ["i", 2],
  ǐ: ["i", 3],
  ì: ["i", 4],
  ō: ["o", 1],
  ó: ["o", 2],
  ǒ: ["o", 3],
  ò: ["o", 4],
  ū: ["u", 1],
  ú: ["u", 2],
  ǔ: ["u", 3],
  ù: ["u", 4],
  ǖ: ["ü", 1],
  ǘ: ["ü", 2],
  ǚ: ["ü", 3],
  ǜ: ["ü", 4],
};

const VOWELS = "aeiouü";

/** Tone of a syllable: 1–4, or 5 for the neutral tone. */
export type Tone = 1 | 2 | 3 | 4 | 5;

/**
 * Tones of each syllable in a reading, e.g. "péngyou" → [2, 5].
 * Works on vowel groups: every Pinyin syllable has exactly one.
 */
export function tonesOf(reading: string): Tone[] {
  const tones: Tone[] = [];
  let inGroup = false;
  let tone: Tone = 5;
  for (const ch of reading.toLowerCase()) {
    const mark = MARKS[ch];
    const isVowel = !!mark || VOWELS.includes(ch);
    if (isVowel) {
      inGroup = true;
      if (mark) tone = mark[1] as Tone;
    } else if (inGroup) {
      tones.push(tone);
      inGroup = false;
      tone = 5;
    }
  }
  if (inGroup) tones.push(tone);
  return tones;
}

/** Reading without tone marks, e.g. "péngyou" → "pengyou". */
export function stripTones(reading: string): string {
  return [...reading].map((ch) => MARKS[ch]?.[0] ?? MARKS[ch.toLowerCase()]?.[0] ?? ch).join("");
}

const TONE_FORMS: Record<string, string[]> = {
  a: ["ā", "á", "ǎ", "à"],
  e: ["ē", "é", "ě", "è"],
  i: ["ī", "í", "ǐ", "ì"],
  o: ["ō", "ó", "ǒ", "ò"],
  u: ["ū", "ú", "ǔ", "ù"],
  ü: ["ǖ", "ǘ", "ǚ", "ǜ"],
};

function markSyllable(syllable: string, tone: number): string {
  const s = syllable.replace(/v/g, "ü").replace(/u:/g, "ü");
  if (tone < 1 || tone > 4) return s;
  // Placement rule: a or e takes the mark; in "ou" the o; otherwise the last vowel.
  let index = s.search(/[ae]/);
  if (index < 0) index = s.indexOf("ou");
  if (index < 0) {
    for (let i = s.length - 1; i >= 0; i--) {
      if (VOWELS.includes(s[i])) {
        index = i;
        break;
      }
    }
  }
  if (index < 0) return s;
  return s.slice(0, index) + TONE_FORMS[s[index]][tone - 1] + s.slice(index + 1);
}

/**
 * Converts numbered Pinyin to tone marks while typing:
 * "ni3 hao3" → "nǐ hǎo", "peng2you5" → "péngyou", "lv4" → "lǜ".
 */
export function numbersToMarks(input: string): string {
  return input.replace(/([a-zA-ZüÜ:]+?)([1-5])/g, (_, syllable: string, tone: string) =>
    markSyllable(syllable, Number(tone)),
  );
}

export const TONE_NAMES: Record<Tone, string> = {
  1: "1. Ton – hoch und eben",
  2: "2. Ton – steigend",
  3: "3. Ton – tief, fallend-steigend",
  4: "4. Ton – fallend",
  5: "Neutraler Ton – kurz und leicht",
};
