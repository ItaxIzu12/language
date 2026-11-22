import { build } from "esbuild";
import { mkdtemp, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";

const directory = await mkdtemp(join(tmpdir(), "language-architecture-"));
try {
  const output = join(directory, "registry.mjs");
  await build({
    stdin: {
      contents: 'export * from "./src/languages/registry"; export * from "./src/app/navigation";',
      resolveDir: process.cwd(),
    },
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: output,
    define: { "import.meta.env.DEV": "false" },
  });
  const { languages, navigationFor, isModuleAvailable, quickLinks } = await import(pathToFileURL(output));
  const zh = languages.find((language) => language.code === "zh");
  assert.ok(zh);
  assert.equal(zh.vocab.filter((word) => word.understanding).length, 20);
  assert.equal(zh.scenarios.length, 3);
  assert.equal(new Set(zh.vocab.map((word) => word.id)).size, zh.vocab.length);
  assert.equal(quickLinks.length, 5);
  assert.ok(isModuleAvailable(zh, "/tones"));
  const empty = {
    ...zh,
    code: "test",
    tonePractice: false,
    toneModule: undefined,
    vocab: [],
    scenarios: [],
    texts: [],
    listening: [],
    episodes: [],
  };
  for (const path of [
    "/dialoge",
    "/dialoge/bestellen",
    "/listen",
    "/read",
    "/podcasts",
    "/tones",
    "/quiz",
    "/lesson/test",
  ]) {
    assert.equal(isModuleAvailable(empty, path), false, path);
  }
  for (const path of ["/settings", "/chronicle", "/notebook", "/learn/custom", "/lesson/custom"]) {
    assert.equal(isModuleAvailable(empty, path), true, path);
  }
  assert.ok(!navigationFor(empty).some((item) => item.to === "/tones"));
  // A different language can use the vocabulary and dialogue engines without Mandarin's tone module.
  const other = { ...empty, vocab: zh.vocab.slice(0, 1), scenarios: zh.scenarios.slice(0, 1) };
  assert.ok(isModuleAvailable(other, "/learn"));
  assert.ok(isModuleAvailable(other, "/dialoge/test"));
  assert.equal(isModuleAvailable(other, "/tones"), false);
  const graph = await build({
    entryPoints: ["src/app/App.tsx"],
    bundle: true,
    platform: "browser",
    format: "esm",
    write: false,
    metafile: true,
    logLevel: "silent",
    define: {
      "import.meta.env.DEV": "false",
      "import.meta.env.VITE_ACCOUNT_BACKEND": '"0"',
      "import.meta.env.BASE_URL": '"/"',
    },
  });
  const inputs = graph.metafile.inputs;
  const visited = new Set();
  const active = new Set();
  function visit(path) {
    if (!path.startsWith("src/") || visited.has(path)) return;
    assert.ok(!active.has(path), `Circular runtime dependency: ${path}`);
    active.add(path);
    for (const dependency of inputs[path]?.imports ?? []) {
      if (!dependency.external) visit(dependency.path);
      if (path.startsWith("src/features/")) {
        assert.ok(!dependency.path.startsWith("src/languages/zh/"), `Feature imports Mandarin directly: ${path}`);
      }
    }
    active.delete(path);
    visited.add(path);
  }
  for (const path of Object.keys(inputs)) visit(path);
  const css = await readFile("src/styles/styles.css", "utf8");
  assert.ok(css.includes('@import "../languages/zh/presentation/theme.css"'));
  assert.ok(
    !JSON.stringify(languages).includes("function "),
    "Language content must serialize without UI implementations",
  );
  console.log(
    `Architecture checks passed: ${zh.vocab.length} stable vocabulary entries, shared navigation and language capabilities.`,
  );
} finally {
  await rm(directory, { recursive: true, force: true });
}
