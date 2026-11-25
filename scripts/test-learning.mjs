import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";

const dir = await mkdtemp(join(tmpdir(), "language-tests-"));
try {
  const output = join(dir, "modules.mjs");
  await build({
    stdin: {
      contents:
        'export * from "./src/shared/lib/plan"; export * from "./src/shared/lib/srs"; export {getDraft, discardDraft, draftKey} from "./src/features/account/useAccountSync";',
      resolveDir: process.cwd(),
    },
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: output,
    define: { "import.meta.env.VITE_ACCOUNT_BACKEND": '"0"' },
  });
  const {
    dayPlan,
    recommendNext,
    recallTarget,
    getDraft,
    discardDraft,
    draftKey,
    nextCard,
    scheduledCard,
    BOX_INTERVALS,
    MASTERED_BOX,
  } = await import(pathToFileURL(output));

  // Leitner boxes: right → +1 (max 6), wrong → −2 (min 1, due today), new cards start in box 0.
  assert.deepEqual(BOX_INTERVALS, [0, 1, 3, 7, 14, 30, 60]);
  assert.equal(MASTERED_BOX, 4);
  const card = (box, due = "2026-01-01") => ({ box, due, right: 2, wrong: 1 });
  const day = "2026-01-10";
  for (const [box, right, wrong] of [
    [0, 1, 1],
    [1, 2, 1],
    [2, 3, 1],
    [3, 4, 1],
    [4, 5, 2],
    [5, 6, 3],
    [6, 6, 4],
  ]) {
    assert.equal(nextCard(card(box), true, day).box, right, `right answer from box ${box}`);
    assert.equal(nextCard(card(box), false, day).box, wrong, `wrong answer from box ${box}`);
  }
  assert.deepEqual(nextCard(undefined, true, day), { box: 1, due: "2026-01-11", right: 1, wrong: 0 });
  assert.deepEqual(nextCard(undefined, false, day), { box: 1, due: day, right: 0, wrong: 1 });
  assert.deepEqual(nextCard(card(3), true, day), { box: 4, due: "2026-01-24", right: 3, wrong: 1 });
  assert.deepEqual(nextCard(card(5), false, day), { box: 3, due: day, right: 2, wrong: 2 });
  const prev = card(2);
  nextCard(prev, true, day);
  assert.deepEqual(prev, card(2), "nextCard must not mutate the previous card");
  // Due dates across month, leap-day, year and DST boundaries (calendar days, not 24-hour steps).
  assert.equal(nextCard(card(5), true, "2026-01-31").due, "2026-04-01");
  assert.equal(nextCard(card(3), true, "2028-02-20").due, "2028-03-05");
  assert.equal(nextCard(card(2), true, "2026-12-30").due, "2027-01-06");
  assert.equal(nextCard(card(1), true, "2026-03-28").due, "2026-03-31");
  assert.equal(nextCard(card(1), true, "2026-10-24").due, "2026-10-27");
  assert.deepEqual(scheduledCard(day), { box: 1, due: "2026-01-11", right: 0, wrong: 0 });

  const options = {
    activity: { lesson: 0, review: 0, apply: 0 },
    nextSetId: "start",
    nextSetName: "Start",
    dueCount: 7,
    hasCards: true,
    weekday: 1,
  };
  assert.equal(dayPlan({ ...options, dailyMinutes: 5 })[0].id, "recall");
  assert.equal(dayPlan({ ...options, dailyMinutes: 5 }).length, 1);
  assert.equal(dayPlan({ ...options, dueCount: 0, dailyMinutes: 5 })[0].id, "lesson");
  assert.equal(dayPlan({ ...options, dailyMinutes: 10 }).length, 2);
  assert.equal(dayPlan({ ...options, dailyMinutes: 20 }).length, 3);
  assert.deepEqual([5, 10, 20].map(recallTarget), [5, 10, 15]);
  const beginner = dayPlan({ ...options, hasCards: false, dueCount: 0, dailyMinutes: 20 });
  assert.ok(!beginner.some((b) => b.id === "recall"), "Do not send a beginner to an empty repeat queue");
  assert.equal(recommendNext(beginner, 0).id, "lesson");
  const finished = beginner.map((b) => ({ ...b, done: true }));
  assert.equal(recommendNext(finished, 0), undefined);
  assert.equal(
    recommendNext(finished, 3).to,
    "/review",
    "Due cards take precedence even when the daily plan is complete",
  );
  class Storage {
    values = new Map();
    get length() {
      return this.values.size;
    }
    key(i) {
      return [...this.values.keys()][i] ?? null;
    }
    getItem(k) {
      return this.values.get(k) ?? null;
    }
    setItem(k, v) {
      this.values.set(k, v);
    }
    removeItem(k) {
      this.values.delete(k);
    }
  }
  globalThis.localStorage = new Storage();
  globalThis.sessionStorage = new Storage();
  const key = draftKey("test-user", "zh");
  const document = { settings: { lang: "zh" }, progress: { xp: 1 }, customWords: [] };
  localStorage.setItem(key + ".corrupt", "{");
  localStorage.setItem(key + ".old", JSON.stringify({ revision: 1, document, updatedAt: 1 }));
  localStorage.setItem(key + ".new", JSON.stringify({ revision: 2, document, updatedAt: 2 }));
  localStorage.setItem(
    draftKey("another-user", "zh") + ".private",
    JSON.stringify({ revision: 3, document, updatedAt: 3 }),
  );
  const recovered = getDraft(key);
  assert.equal(recovered.revision, 2);
  discardDraft(key, recovered);
  assert.equal(getDraft(key).revision, 1);
  assert.ok(localStorage.getItem(draftKey("another-user", "zh") + ".private"));
  const older = getDraft(key);
  localStorage.setItem(
    older.sourceKey,
    JSON.stringify({ revision: 2, document: { ...document, progress: { xp: 2 } } }),
  );
  discardDraft(key, older);
  assert.ok(localStorage.getItem(older.sourceKey), "Never delete a draft changed by another tab");
  console.log("Learning plan and draft recovery regression checks passed.");
} finally {
  await rm(dir, { recursive: true, force: true });
}
