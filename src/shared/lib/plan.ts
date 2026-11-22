import type { DayActivity } from "../../state/learningStore";

/** Answers needed to complete the afternoon recall block. */
export const RECALL_TARGET = 10;
export const recallTarget = (minutes = 10) => (minutes === 5 ? 5 : minutes === 20 ? 15 : RECALL_TARGET);

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
  tonePractice?: boolean;
  dailyMinutes?: 5 | 10 | 20;
}): Block[] {
  const { activity, nextSetId, nextSetName, dueCount, hasCards, weekday } = opts;
  const scheduled = EVENING[weekday % EVENING.length];
  const evening = scheduled.to === "/tones" && !opts.tonePractice ? EVENING[3] : scheduled;
  const minutes = opts.dailyMinutes ?? 10;
  const target = recallTarget(minutes);
  const blocks: Block[] = [
    {
      id: "lesson",
      title: "Hauptlektion",
      when: "Neue Wörter",
      detail: `${minutes === 5 ? "Zwei" : minutes === 10 ? "Drei" : "Fünf"} neue Wörter aus „${nextSetName}“`,
      to: `/lesson/${nextSetId}`,
      done: activity.lesson >= 1,
      progress: Math.min(1, activity.lesson),
    },
    {
      id: "recall",
      title: "Abruf",
      when: "Wissen auffrischen",
      detail: !hasCards
        ? "Kommt nach deiner ersten Lektion dazu"
        : dueCount > 0
          ? `${dueCount} ${dueCount === 1 ? "Karte ist" : "Karten sind"} fällig – ohne Nachschauen abrufen`
          : `${target} Karten ohne Nachschauen abrufen`,
      to: "/review",
      done: activity.review >= target,
      progress: Math.min(1, activity.review / target),
    },
    {
      id: "apply",
      title: "Anwenden und Hören",
      when: "Im Alltag anwenden",
      detail: evening.detail,
      to: evening.to,
      done: activity.apply >= 1,
      progress: Math.min(1, activity.apply),
    },
  ];
  // Short sessions focus on one task; a due queue takes precedence.
  if (minutes === 5) return [blocks[dueCount > 0 ? 1 : 0]];
  if (minutes === 10) return dueCount > 0 ? [blocks[1], blocks[2]] : [blocks[0], blocks[2]];
  return dueCount > 0 ? [blocks[1], blocks[0], blocks[2]] : blocks;
}
