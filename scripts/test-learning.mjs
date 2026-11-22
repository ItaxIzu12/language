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
        'export * from "./src/shared/lib/plan"; export {getDraft, discardDraft, draftKey} from "./src/features/account/useAccountSync";',
      resolveDir: process.cwd(),
    },
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: output,
    define: { "import.meta.env.VITE_ACCOUNT_BACKEND": '"0"' },
  });
  const { dayPlan, recallTarget, getDraft, discardDraft, draftKey } = await import(pathToFileURL(output));
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
