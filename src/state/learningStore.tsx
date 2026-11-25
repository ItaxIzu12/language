import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getLanguage } from "../languages/registry";
import type { Category, Language, VocabItem } from "../languages/types";
import type { AccountState } from "../features/account/account";
import { draftKey, getDraft, useAccountSync } from "../features/account/useAccountSync";
import { addDays, dayKey } from "../shared/lib/utils";
import { MASTERED_BOX, nextCard, scheduledCard } from "../shared/lib/srs";
import type { CardState } from "../shared/lib/srs";

// The Leitner logic lives in shared/lib/srs.ts; re-exported for existing imports.
export { BOX_INTERVALS, MASTERED_BOX } from "../shared/lib/srs";
export type { CardState } from "../shared/lib/srs";
export const XP_PER_LEVEL = 200;

/** Id of the category that holds the learner's own words. */
export const CUSTOM_ID = "custom";

function customCategory(glyph: string): Category {
  return {
    id: CUSTOM_ID,
    name: "Fundstücke",
    glyph,
    description: "Deine eigenen Wörter – aus Chats, Serien, Gesprächen.",
  };
}

/** What was done on one day, used for the three-block day plan. */
export interface DayActivity {
  lesson: number;
  review: number;
  apply: number;
}

export type ActivityKind = keyof DayActivity;

export interface Progress {
  cards: Record<string, CardState>;
  xp: number;
  /** XP earned per day (YYYY-MM-DD). */
  days: Record<string, number>;
  lessonsDone: number;
  /** Completed one-off items (reading texts, role plays), by id. */
  done: Record<string, boolean>;
  /** Activity counters per day. */
  activity: Record<string, DayActivity>;
  /** Days whose calendar sheet has been torn off. */
  torn: Record<string, boolean>;
}

export interface Settings {
  theme: "light" | "dark";
  dailyGoal: number;
  dailyMinutes?: 5 | 10 | 20;
  rate: number;
  showReading: boolean;
  lang: string;
}

export type WordStatus = "new" | "learning" | "mastered";

const emptyProgress = (): Progress => ({
  cards: {},
  xp: 0,
  days: {},
  lessonsDone: 0,
  done: {},
  activity: {},
  torn: {},
});

const emptyActivity = (): DayActivity => ({ lesson: 0, review: 0, apply: 0 });

const defaultSettings = (): Settings => ({
  theme: typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light",
  dailyGoal: 50,
  dailyMinutes: 10,
  rate: 0.9,
  showReading: true,
  lang: "zh",
});

function load<T extends object>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

function loadList<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable – the app still works for this session */
  }
}

interface Store {
  username: string | null;
  sync: ReturnType<typeof useAccountSync>;
  lang: Language;
  settings: Settings;
  progress: Progress;
  today: string;
  todayXp: number;
  todayActivity: DayActivity;
  streak: number;
  level: number;
  dueWords: VocabItem[];
  customWords: VocabItem[];
  status: (id: string) => WordStatus;
  /** Records an answer for a word: updates SRS + XP. */
  answer: (id: string, correct: boolean, xp?: number) => void;
  addXp: (n: number) => void;
  /** Counts an activity towards today's three-block plan. */
  logActivity: (kind: ActivityKind, n?: number) => void;
  finishLesson: () => void;
  /** Marks a text / role play as completed. */
  markDone: (id: string) => void;
  /** Tears off today's calendar sheet. */
  tearToday: () => void;
  addCustomWord: (word: Omit<VocabItem, "id" | "category">, schedule?: boolean) => void;
  updateCustomWord: (id: string, word: Omit<VocabItem, "id" | "category">) => void;
  removeCustomWord: (id: string) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  resetProgress: () => void;
  exportProgress: () => string;
  importProgress: (json: string) => boolean;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children, account }: { children: ReactNode; account: AccountState | null }) {
  const [draft] = useState(() => (account ? getDraft(draftKey(account.username, account.language)) : null));
  const initial = draft?.document ?? account?.document;
  const [settings, setSettings] = useState<Settings>(() =>
    account
      ? (initial?.settings ?? { ...defaultSettings(), lang: account.language })
      : load("linguaflow.settings", defaultSettings()),
  );
  const progressKey = `linguaflow.progress.${settings.lang}`;
  const customKey = `linguaflow.custom.${settings.lang}`;
  const [progress, setProgress] = useState<Progress>(() =>
    account ? (initial?.progress ?? emptyProgress()) : load(progressKey, emptyProgress()),
  );
  const [customWords, setCustomWords] = useState<VocabItem[]>(() =>
    account ? (initial?.customWords ?? []) : loadList<VocabItem>(customKey),
  );
  const [today, setToday] = useState(dayKey());

  const snapshot = useMemo(() => ({ settings, progress, customWords }), [settings, progress, customWords]);
  const sync = useAccountSync(account, snapshot, draft);

  // Keep "today" fresh if the app stays open overnight.
  useEffect(() => {
    const t = setInterval(() => setToday(dayKey()), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (account) return;
    save("linguaflow.settings", settings);
    save(`linguaflow.settings.${settings.lang}`, settings);
  }, [account, settings]);
  useEffect(() => {
    if (!account) save(progressKey, progress);
  }, [account, progressKey, progress]);
  useEffect(() => {
    if (!account) save(customKey, customWords);
  }, [account, customKey, customWords]);

  // The language decides the visual world.
  useEffect(() => {
    document.documentElement.dataset.theme = getLanguage(settings.lang).culture.theme;
  }, [settings.lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.theme === "dark");
    try {
      localStorage.setItem("linguaflow.theme", settings.theme);
    } catch {
      /* ignore */
    }
  }, [settings.theme]);

  // The learning language = shipped content + the learner's own words.
  const lang = useMemo<Language>(() => {
    const base = getLanguage(settings.lang);
    return {
      ...base,
      categories: [...base.categories, customCategory(base.culture.customGlyph)],
      vocab: [...base.vocab, ...customWords],
    };
  }, [settings.lang, customWords]);

  const addXp = useCallback((n: number) => {
    if (n <= 0) return;
    const day = dayKey();
    setProgress((p) => ({
      ...p,
      xp: p.xp + n,
      days: { ...p.days, [day]: (p.days[day] ?? 0) + n },
    }));
  }, []);

  const logActivity = useCallback((kind: ActivityKind, n = 1) => {
    const day = dayKey();
    setProgress((p) => {
      const cur = p.activity[day] ?? emptyActivity();
      return { ...p, activity: { ...p.activity, [day]: { ...cur, [kind]: cur[kind] + n } } };
    });
  }, []);

  const answer = useCallback((id: string, correct: boolean, xp = 10) => {
    const day = dayKey();
    setProgress((p) => {
      const card = nextCard(p.cards[id], correct, day);
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
    const day = dayKey();
    setProgress((p) => {
      const cur = p.activity[day] ?? emptyActivity();
      return {
        ...p,
        lessonsDone: p.lessonsDone + 1,
        activity: { ...p.activity, [day]: { ...cur, lesson: cur.lesson + 1 } },
      };
    });
  }, []);

  const markDone = useCallback(
    (id: string) => setProgress((p) => (p.done[id] ? p : { ...p, done: { ...p.done, [id]: true } })),
    [],
  );

  const tearToday = useCallback(() => {
    const day = dayKey();
    setProgress((p) => (p.torn[day] ? p : { ...p, torn: { ...p.torn, [day]: true } }));
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
    username: account?.username ?? null,
    sync,
    lang,
    settings,
    progress,
    today,
    todayXp: progress.days[today] ?? 0,
    todayActivity: progress.activity[today] ?? emptyActivity(),
    streak,
    level: Math.floor(progress.xp / XP_PER_LEVEL) + 1,
    dueWords,
    customWords,
    status,
    answer,
    addXp,
    logActivity,
    finishLesson,
    markDone,
    tearToday,
    addCustomWord: (word, schedule = false) => {
      const existing = customWords.find((w) => w.target === word.target && w.reading === word.reading);
      const id =
        existing?.id ?? `${settings.lang}:custom:${Array.from(crypto.getRandomValues(new Uint32Array(4))).join("-")}`;
      setCustomWords((list) => {
        if (list.some((w) => w.target === word.target && w.reading === word.reading)) return list;
        return [...list, { ...word, id, category: CUSTOM_ID, learned: true }];
      });
      if (schedule) {
        const card = scheduledCard(dayKey());
        setProgress((p) =>
          p.cards[id]
            ? p
            : {
                ...p,
                cards: { ...p.cards, [id]: card },
              },
        );
      }
    },
    updateCustomWord: (id, word) => setCustomWords((list) => list.map((w) => (w.id === id ? { ...w, ...word } : w))),
    removeCustomWord: (id) => {
      setCustomWords((list) => list.filter((w) => w.id !== id));
      setProgress((previous) => {
        if (!previous.cards[id]) return previous;
        const cards = { ...previous.cards };
        delete cards[id];
        return { ...previous, cards };
      });
    },
    updateSettings: (patch) => {
      // Each language keeps its own progress and own words: swap them with the setting.
      if (patch.lang && patch.lang !== settings.lang) {
        if (account) {
          if (sync.pending) return;
          const url = new URL(window.location.href);
          url.searchParams.set("lang", patch.lang);
          url.hash = "/heute";
          window.location.assign(url);
          return;
        }
        setProgress(load(`linguaflow.progress.${patch.lang}`, emptyProgress()));
        setCustomWords(loadList<VocabItem>(`linguaflow.custom.${patch.lang}`));
        setSettings({ ...load(`linguaflow.settings.${patch.lang}`, defaultSettings()), ...patch });
        return;
      }
      setSettings((s) => ({ ...s, ...patch }));
    },
    resetProgress: () => setProgress(emptyProgress()),
    exportProgress: () => JSON.stringify({ app: "linguaflow", lang: settings.lang, progress, customWords }, null, 2),
    importProgress: (json) => {
      try {
        const data = JSON.parse(json);
        if (data.lang && data.lang !== settings.lang) return false;
        const p = data.progress ?? data;
        if (!p || typeof p !== "object" || typeof p.cards !== "object") return false;
        setProgress({ ...emptyProgress(), ...p });
        if (Array.isArray(data.customWords)) setCustomWords(data.customWords);
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
