import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getLanguage } from "../data/languages";
import type { Language, VocabItem } from "../types";
import { addDays, dayKey } from "./utils";

// ---------------------------------------------------------------------------
// Spaced repetition (Leitner boxes). A correct answer moves a card up one box
// and schedules it further in the future; a mistake sends it back.
// ---------------------------------------------------------------------------
export const BOX_INTERVALS = [0, 1, 3, 7, 14, 30, 60]; // days per box
export const MASTERED_BOX = 4;

export interface CardState {
  box: number;
  due: string; // YYYY-MM-DD
  right: number;
  wrong: number;
}

export interface Progress {
  cards: Record<string, CardState>;
  xp: number;
  /** XP earned per day (YYYY-MM-DD). */
  days: Record<string, number>;
  lessonsDone: number;
}

export interface Settings {
  theme: "light" | "dark";
  dailyGoal: number;
  rate: number;
  showReading: boolean;
  lang: string;
}

export type WordStatus = "new" | "learning" | "mastered";

const emptyProgress = (): Progress => ({ cards: {}, xp: 0, days: {}, lessonsDone: 0 });

const defaultSettings = (): Settings => ({
  theme:
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light",
  dailyGoal: 50,
  rate: 0.9,
  showReading: true,
  lang: "zh",
});

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable – the app still works for this session */
  }
}

export const XP_PER_LEVEL = 200;

interface Store {
  lang: Language;
  settings: Settings;
  progress: Progress;
  today: string;
  todayXp: number;
  streak: number;
  level: number;
  dueWords: VocabItem[];
  status: (id: string) => WordStatus;
  /** Records an answer for a word: updates SRS + XP. */
  answer: (id: string, correct: boolean, xp?: number) => void;
  addXp: (n: number) => void;
  finishLesson: () => void;
  updateSettings: (patch: Partial<Settings>) => void;
  resetProgress: () => void;
  exportProgress: () => string;
  importProgress: (json: string) => boolean;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() =>
    load("linguaflow.settings", defaultSettings()),
  );
  const progressKey = `linguaflow.progress.${settings.lang}`;
  const [progress, setProgress] = useState<Progress>(() => load(progressKey, emptyProgress()));
  const [today, setToday] = useState(dayKey());

  // Keep "today" fresh if the app stays open overnight.
  useEffect(() => {
    const t = setInterval(() => setToday(dayKey()), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => save("linguaflow.settings", settings), [settings]);
  useEffect(() => save(progressKey, progress), [progressKey, progress]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.theme === "dark");
    try {
      localStorage.setItem("linguaflow.theme", settings.theme);
    } catch {
      /* ignore */
    }
  }, [settings.theme]);

  const lang = useMemo(() => getLanguage(settings.lang), [settings.lang]);

  const addXp = useCallback((n: number) => {
    if (n <= 0) return;
    const day = dayKey();
    setProgress((p) => ({
      ...p,
      xp: p.xp + n,
      days: { ...p.days, [day]: (p.days[day] ?? 0) + n },
    }));
  }, []);

  const answer = useCallback((id: string, correct: boolean, xp = 10) => {
    const day = dayKey();
    setProgress((p) => {
      const prev = p.cards[id] ?? { box: 0, due: day, right: 0, wrong: 0 };
      const box = correct ? Math.min(prev.box + 1, BOX_INTERVALS.length - 1) : Math.max(prev.box - 2, 1);
      const card: CardState = {
        box,
        due: correct ? addDays(day, BOX_INTERVALS[box]) : day,
        right: prev.right + (correct ? 1 : 0),
        wrong: prev.wrong + (correct ? 0 : 1),
      };
      const gained = correct ? xp : 0;
      return {
        ...p,
        cards: { ...p.cards, [id]: card },
        xp: p.xp + gained,
        days: gained ? { ...p.days, [day]: (p.days[day] ?? 0) + gained } : p.days,
      };
    });
  }, []);

  const finishLesson = useCallback(() => {
    setProgress((p) => ({ ...p, lessonsDone: p.lessonsDone + 1 }));
  }, []);

  const status = useCallback(
    (id: string): WordStatus => {
      const c = progress.cards[id];
      if (!c) return "new";
      return c.box >= MASTERED_BOX ? "mastered" : "learning";
    },
    [progress.cards],
  );

  const dueWords = useMemo(
    () => lang.vocab.filter((w) => progress.cards[w.id] && progress.cards[w.id].due <= today),
    [lang.vocab, progress.cards, today],
  );

  const streak = useMemo(() => {
    let n = 0;
    let d = today;
    if (!progress.days[d]) d = addDays(d, -1); // today not yet done: streak still alive
    while (progress.days[d]) {
      n++;
      d = addDays(d, -1);
    }
    return n;
  }, [progress.days, today]);

  const store: Store = {
    lang,
    settings,
    progress,
    today,
    todayXp: progress.days[today] ?? 0,
    streak,
    level: Math.floor(progress.xp / XP_PER_LEVEL) + 1,
    dueWords,
    status,
    answer,
    addXp,
    finishLesson,
    updateSettings: (patch) => {
      // Each language keeps its own progress: swap it together with the setting.
      if (patch.lang && patch.lang !== settings.lang) {
        setProgress(load(`linguaflow.progress.${patch.lang}`, emptyProgress()));
      }
      setSettings((s) => ({ ...s, ...patch }));
    },
    resetProgress: () => setProgress(emptyProgress()),
    exportProgress: () => JSON.stringify({ app: "linguaflow", lang: settings.lang, progress }, null, 2),
    importProgress: (json) => {
      try {
        const data = JSON.parse(json);
        const p = data.progress ?? data;
        if (!p || typeof p !== "object" || typeof p.cards !== "object") return false;
        setProgress({ ...emptyProgress(), ...p });
        return true;
      } catch {
        return false;
      }
    },
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside <StoreProvider>");
  return s;
}
