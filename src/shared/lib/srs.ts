import { addDays } from "./utils";

// ---------------------------------------------------------------------------
// Spaced repetition (Leitner boxes). A correct answer moves a card up one box
// and schedules it further in the future; a mistake moves it down two boxes
// (never below box 1) and makes it due again today.
// ---------------------------------------------------------------------------

export const BOX_INTERVALS = [0, 1, 3, 7, 14, 30, 60]; // days per box
export const MASTERED_BOX = 4;

export interface CardState {
  box: number;
  due: string; // YYYY-MM-DD
  right: number;
  wrong: number;
}

/** Card after one answer on `day` (YYYY-MM-DD). A missing card starts in box 0. */
export function nextCard(prev: CardState | undefined, correct: boolean, day: string): CardState {
  const card = prev ?? { box: 0, due: day, right: 0, wrong: 0 };
  const box = correct ? Math.min(card.box + 1, BOX_INTERVALS.length - 1) : Math.max(card.box - 2, 1);
  return {
    box,
    due: correct ? addDays(day, BOX_INTERVALS[box]) : day,
    right: card.right + (correct ? 1 : 0),
    wrong: card.wrong + (correct ? 0 : 1),
  };
}

/** New card scheduled for its first review, e.g. a saved personal word. */
export function scheduledCard(day: string): CardState {
  return { box: 1, due: addDays(day, BOX_INTERVALS[1]), right: 0, wrong: 0 };
}
