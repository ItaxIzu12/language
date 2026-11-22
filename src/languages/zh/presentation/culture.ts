import type { Culture } from "../../types";
import { zhDate } from "./calendar";

/**
 * Chinese: the tear-off wall calendar 黄历.
 * Songti print type (Song dynasty), cinnabar seals and the almanac's
 * "favourable / avoid" columns meet tall modern numerals and a strict grid.
 */
export const culture: Culture = {
  theme: "almanac",
  themeName: "Abreißkalender 黄历",
  favourable: "宜",
  avoid: "忌",
  seal: "完",
  traditionalLabel: "Mondkalender",
  blockGlyphs: ["学", "忆", "用"],
  levelGlyphs: ["初", "基", "中", "高"],
  customGlyph: "拾",
  localDate: (date) => {
    const d = zhDate(date);
    return {
      month: d.month,
      weekday: d.weekday,
      sentence: d.sentence,
      sentenceReading: d.sentenceReading,
      traditional: d.lunar,
    };
  },
};
