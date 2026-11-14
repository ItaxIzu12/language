import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { StoreProvider } from "./lib/store";
import "@fontsource-variable/archivo/wght";
import "@fontsource-variable/big-shoulders-display/wght";
// Chinese print face, self-hosted in ~100 small slices per weight: the browser only
// fetches the slices whose characters actually appear on the page.
import "@fontsource/noto-serif-sc/500";
import "@fontsource/noto-serif-sc/900";
import "./index.css";

// HashRouter keeps deep links working on static hosts like GitHub Pages.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </StoreProvider>
  </React.StrictMode>,
);
