import { build } from "esbuild";
import { mkdtemp, rm, readFile, writeFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const dir = await mkdtemp(join(tmpdir(), "linguaflow-routes-"));
try {
  const outfile = join(dir, "routes.mjs");
  await build({
    stdin: {
      contents: `
    import React from 'react';
    import { renderToString } from 'react-dom/server';
    import { MemoryRouter } from 'react-router-dom';
    import { StoreProvider } from './src/state/learningStore';
    import Routes from './src/app/routes';
    import { getLanguage } from './src/languages/registry';
    export function renderPage(path) { return renderToString(React.createElement(MemoryRouter, {initialEntries:[path]}, React.createElement(StoreProvider, {account:null}, React.createElement(Routes)))); }
    export function smoke() {
      const lang = getLanguage('zh');
      const paths = ['/heute', '/lernplan', '/lernkalender', '/learn', '/learn/'+lang.categories[0].id,
        '/lesson/'+lang.categories[0].id, '/review', '/practice', '/dialoge', '/dialoge/'+lang.scenarios[0].id,
        '/listen', '/speak', '/tones', '/read', '/read/'+encodeURIComponent(lang.texts[0].id), '/podcasts',
        '/podcasts/'+encodeURIComponent(lang.episodes[0].id), '/quiz', '/notebook', '/chronicle', '/settings'];
      for (const path of paths) {
        const html = renderToString(React.createElement(MemoryRouter, {initialEntries:[path]},
          React.createElement(StoreProvider, {account:null}, React.createElement(Routes))));
        if (!html.includes('id="learning-content"') || !html.includes('<h1')) throw new Error('Empty route: '+path);
      }
      for (const path of ['/anmelden', '/anmelden?mode=register', '/sprachen/zh', '/sprachen/zh?mode=register']) {
        const html = renderPage(path);
        if (!html.includes('name="username"') || !html.includes('name="password"') || !html.includes('<h1')) throw new Error('Missing account form: '+path);
        if (html.includes('name="confirmation"') !== path.includes('mode=register')) throw new Error('Wrong account mode: '+path);
        if (!html.includes('Ohne Konto starten')) throw new Error('Missing guest path: '+path);
      }
      return paths.length;
    }`,
      resolveDir: process.cwd(),
      loader: "tsx",
    },
    bundle: true,
    platform: "node",
    format: "esm",
    outfile,
    banner: { js: "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);" },
    logLevel: "silent",
    define: {
      "import.meta.env.DEV": "false",
      "import.meta.env.VITE_ACCOUNT_BACKEND": '"0"',
      "import.meta.env.BASE_URL": '"/"',
      "process.env.NODE_ENV": '"production"',
    },
  });
  globalThis.localStorage = { getItem: () => null, length: 0 };
  globalThis.sessionStorage = { getItem: () => null };
  globalThis.window = { location: { pathname: "/", search: "", hash: "" } };

  const { smoke, renderPage } = await import(pathToFileURL(outfile));
  if (process.argv.includes("--preview")) {
    const assets = await readdir("dist/assets");
    const cssFile = assets.find((name) => name.startsWith("index-") && name.endsWith(".css"));
    const css = (await readFile("dist/assets/" + cssFile, "utf8")).replaceAll(
      "/assets/",
      "file://" + process.cwd() + "/dist/assets/",
    );
    for (const [name, route] of [
      ["home", "/heute"],
      ["practice", "/practice"],
      ["words", "/learn"],
      ["profile", "/settings"],
    ]) {
      const html = renderPage(route).replaceAll(
        'src="/linguaflow-logo.svg"',
        'src="file://' + process.cwd() + '/public/linguaflow-logo.svg"',
      );
      await writeFile(
        "/tmp/linguaflow-" + name + ".html",
        '<!doctype html><html lang="de" data-theme="almanac"><meta name="viewport" content="width=device-width,initial-scale=1"><title>LinguaFlow Layoutprüfung</title><style>' +
          css +
          "</style>" +
          html +
          "</html>",
      );
    }
  }
  console.log(
    `Route render checks passed: ${smoke()} learning pages including deep links, plus 4 account entry states.`,
  );
} finally {
  await rm(dir, { recursive: true, force: true });
}
