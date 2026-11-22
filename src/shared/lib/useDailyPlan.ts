import { useStore } from "../../state/learningStore";
import { isModuleAvailable } from "../../app/navigation";
import { dayPlan, recommendNext } from "./plan";

/** Presentation derived entirely from the existing, synced learner document. */
export function useDailyPlan() {
  const store = useStore();
  const { lang, today, progress, status, dueWords, todayActivity, settings } = store;
  const next =
    lang.categories.find((c) => lang.vocab.some((w) => w.category === c.id && status(w.id) === "new")) ??
    lang.categories.find((c) => lang.vocab.some((w) => w.category === c.id));
  const plan = next
    ? dayPlan({
        activity: todayActivity,
        nextSetId: next.id,
        nextSetName: next.name,
        dueCount: dueWords.length,
        hasCards: Object.keys(progress.cards).length > 0,
        weekday: new Date(today + "T12:00:00").getDay(),
        dailyMinutes: settings.dailyMinutes,
        tonePractice: lang.tonePractice,
      }).filter((b) => isModuleAvailable(lang, b.to))
    : [];
  const recommended = recommendNext(plan, dueWords.length);
  return { ...store, next, plan, recommended, completed: plan.filter((b) => b.done).length };
}
