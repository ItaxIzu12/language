import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base ("./") so the production build also works when served from a
// subfolder, e.g. GitHub Pages at https://<user>.github.io/linguaflow/.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
