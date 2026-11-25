import type { Progress } from "../../state/learningStore";
import { MASTERED_BOX } from "./srs";
import type { VocabItem } from "../../languages/types";

/**
 * The learner's stumbling words: answered wrong at least once and not yet
 * safely learned, hardest first.
 */
export function mistakeWords(vocab: readonly VocabItem[], progress: Progress): VocabItem[] {
  return vocab
    .filter((w) => {
      const c = progress.cards[w.id];
      return c && c.wrong > 0 && c.box < MASTERED_BOX;
    })
    .sort((a, b) => {
      const ca = progress.cards[a.id];
      const cb = progress.cards[b.id];
      return cb.wrong - ca.wrong || ca.box - cb.box;
    });
}
