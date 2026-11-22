// Today's date written and read the Chinese way – real content on the daily sheet.

const DIGITS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const DIGIT_READING = ["líng", "yī", "èr", "sān", "sì", "wǔ", "liù", "qī", "bā", "jiǔ"];

/** 1–99 as Chinese numerals with Pinyin, e.g. 14 → 十四 / shísì. */
export function zhNumber(n: number): { target: string; reading: string } {
  if (n < 10) return { target: DIGITS[n], reading: DIGIT_READING[n] };
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return {
    target: (tens > 1 ? DIGITS[tens] : "") + "十" + (ones ? DIGITS[ones] : ""),
    reading: (tens > 1 ? DIGIT_READING[tens] : "") + "shí" + (ones ? DIGIT_READING[ones] : ""),
  };
}

const WEEKDAY = ["日", "一", "二", "三", "四", "五", "六"];
const WEEKDAY_READING = ["rì", "yī", "èr", "sān", "sì", "wǔ", "liù"];

export interface ZhDate {
  month: string; // 十一月
  weekday: string; // 星期六
  /** Full sentence for reading aloud. */
  sentence: string;
  sentenceReading: string;
  /** Traditional lunar date, when the browser can compute it. */
  lunar?: string;
}

export function zhDate(date: Date): ZhDate {
  const m = zhNumber(date.getMonth() + 1);
  const d = zhNumber(date.getDate());
  const wd = date.getDay();
  const month = `${m.target}月`;
  const weekday = `星期${WEEKDAY[wd]}`;

  let lunar: string | undefined;
  try {
    const parts = new Intl.DateTimeFormat("zh-CN-u-ca-chinese", { month: "long", day: "numeric" }).formatToParts(date);
    const lm = parts.find((p) => p.type === "month")?.value;
    const ld = Number(parts.find((p) => p.type === "day")?.value);
    if (lm && ld >= 1 && ld <= 30) {
      // Lunar days are written 初一 … 初十, 十一 … 二十, 廿一 … 三十.
      const day =
        ld <= 10
          ? `初${ld === 10 ? "十" : DIGITS[ld]}`
          : ld < 20
            ? `十${DIGITS[ld - 10]}`
            : ld === 20
              ? "二十"
              : ld < 30
                ? `廿${DIGITS[ld - 20]}`
                : "三十";
      lunar = `${lm}${day}`;
    }
  } catch {
    lunar = undefined;
  }

  return {
    month,
    weekday,
    sentence: `今天是${m.target}月${d.target}日，${weekday}。`,
    sentenceReading: `Jīntiān shì ${m.reading} yuè ${d.reading} rì, xīngqī${WEEKDAY_READING[wd]}.`,
    lunar,
  };
}
