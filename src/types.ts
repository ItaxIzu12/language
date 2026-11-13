// ---------------------------------------------------------------------------
// Core data model for LinguaFlow.
// The app is multi-language by design: every language plugs in the same shapes.
// ---------------------------------------------------------------------------

/** CEFR level used to roughly order content from beginner to upper-intermediate. */
export type Level = "A1" | "A2" | "B1" | "B2";

/** Part of speech (German labels are provided via POS_LABELS in data). */
export type Pos =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "pronoun"
  | "number"
  | "measure"
  | "conjunction"
  | "preposition"
  | "particle"
  | "phrase"
  | "interjection";

export interface Example {
  /** Target-language sentence (e.g. 汉字). */
  target: string;
  /** Romanisation / reading (e.g. Pinyin with tone marks). */
  reading: string;
  /** Translation into the UI language (German). */
  de: string;
}

export interface VocabItem {
  /** Stable unique id (used for progress + SRS). Never reuse an id. */
  id: string;
  /** Word in the target script (e.g. 朋友). */
  target: string;
  /** Reading (e.g. Pinyin: péngyou). */
  reading: string;
  /** German translation. */
  de: string;
  /** Part of speech. */
  pos: Pos;
  /** Category id this word belongs to. */
  category: string;
  /** Rough CEFR level. */
  level: Level;
  /** Example sentence. */
  example?: Example;
  /** True if this word was part of the user's earlier tutoring sessions. */
  learned?: boolean;
  /** Optional free-form notes / usage hints (German). */
  note?: string;
}

export interface Category {
  id: string;
  /** German display name. */
  name: string;
  /** Emoji icon. */
  icon: string;
  /** Short German description. */
  description: string;
}

export interface ListeningSentence {
  id: string;
  target: string;
  reading: string;
  de: string;
  level: Level;
}

export interface Podcast {
  title: string;
  author: string;
  /** German one-line description. */
  description: string;
  /** Rough level range, e.g. "A1–A2". */
  level: string;
  url: string;
}

/** One spoken line of an in-app podcast episode (read aloud via speech synthesis). */
export interface EpisodeLine {
  speaker: string;
  target: string;
  reading: string;
  de: string;
}

/** In-app mini podcast: a dialogue or short story with transcript. */
export interface Episode {
  id: string;
  title: string;
  titleDe: string;
  level: Level;
  description: string;
  icon: string;
  lines: EpisodeLine[];
}

/** A reading text with comprehension questions. */
export interface ReadingText {
  id: string;
  title: string;
  titleDe: string;
  level: Level;
  icon: string;
  sentences: Array<{ target: string; reading: string; de: string }>;
  questions: Array<{ question: string; answer: string; wrong: string[] }>;
}

export interface Language {
  /** Reading texts. */
  texts: ReadingText[];
  /** Name of the reading system, e.g. "Pinyin". */
  readingName: string;
  /** In-app mini podcast episodes. */
  episodes: Episode[];
  /** BCP-47-ish code, e.g. "zh". */
  code: string;
  /** Name in the UI language (German), e.g. "Chinesisch". */
  name: string;
  /** Endonym, e.g. "中文". */
  nativeName: string;
  /** Emoji flag. */
  flag: string;
  /** Speech-synthesis language tag, e.g. "zh-CN". */
  ttsLang: string;
  /** Whether content is ready. Future languages can be listed as not available. */
  available: boolean;
  categories: Category[];
  vocab: VocabItem[];
  listening: ListeningSentence[];
  podcasts: Podcast[];
}
