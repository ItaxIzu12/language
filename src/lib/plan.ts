import type { DayActivity } from "./store";

/** Answers needed to complete the afternoon recall block. */
export const RECALL_TARGET = 10;

export interface Block {
  id: "lesson" | "recall" | "apply";
  title: string;
  when: string;
  detail: string;
  to: string;
  done: boolean;
  /** 0..1 */
  progress: number;
}

/** Rotates the evening suggestion through the week so every skill gets its turn. */
const EVENING = [
  { to: "/read", detail: "Einen Text lesen und die Fragen beantworten" },
  { to: "/podcasts", detail: "Eine Podcast-Episode mit Transkript hören" },
  { to: "/speak", detail: "Ein Rollenspiel sprechen" },
  { to: "/listen", detail: "Eine Runde Hörverstehen" },
  { to: "/tones", detail: "Eine Runde im Tonlabor" },
  { to: "/podcasts", detail: "Eine Podcast-Episode ohne Übersetzung hören" },
  { to: "/read", detail: "Einen Text lesen und laut mitsprechen" },
];

/**
 * The day in three blocks – the learner's own routine:
 * main lesson at noon, short recall in the afternoon, applying and listening in the evening.
 */
export function dayPlan(opts: {
  activity: DayActivity;
  nextSetId: string;
  nextSetName: string;
  dueCount: number;
  hasCards: boolean;
  weekday: number;
}): Block[] {
  const { activity, nextSetId, nextSetName, dueCount, hasCards, weekday } = opts;
  const evening = EVENING[weekday % EVENING.length];
  return [
    {
      id: "lesson",
      title: "Hauptlektion",
      when: "Mittags · 25 Min.",
      detail: `Fünf neue Wörter aus „${nextSetName}“`,
      to: `/lesson/${nextSetId}`,
      done: activity.lesson >= 1,
      progress: Math.min(1, activity.lesson),
    },
    {
      id: "recall",
      title: "Abruf",
      when: "Nachmittags · 10 Min.",
      detail: !hasCards
        ? "Kommt nach deiner ersten Lektion dazu"
        : dueCount > 0
          ? `${dueCount} ${dueCount === 1 ? "Karte ist" : "Karten sind"} fällig – ohne Nachschauen abrufen`
          : "Zehn Karten ohne Nachschauen abrufen",
      to: "/review",
      done: activity.review >= RECALL_TARGET,
      progress: Math.min(1, activity.review / RECALL_TARGET),
    },
    {
      id: "apply",
      title: "Anwenden und Hören",
      when: "Abends · 15 Min.",
      detail: evening.detail,
      to: evening.to,
      done: activity.apply >= 1,
      progress: Math.min(1, activity.apply),
    },
  ];
}
