import "./styles/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./app/App";
import { Welcome } from "./features/welcome/Welcome";
import AccountRoot from "./features/account/AccountRoot";
import "@fontsource-variable/archivo/wdth";
import "@fontsource-variable/big-shoulders-display/wght";
// HashRouter keeps deep links working on static hosts like GitHub Pages.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="*"
          element={
            <AccountRoot>
              <App />
            </AccountRoot>
          }
        />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
