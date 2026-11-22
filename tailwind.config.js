/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // Set per language world in styles/styles.css.
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        hanzi: ["var(--font-script)"],
      },
      colors: {
        paper: token("paper"),
        sheet: token("sheet"),
        wash: token("wash"),
        ink: token("ink"),
        dim: token("dim"),
        rule: token("rule"),
        cinnabar: token("cinnabar"),
        "on-cinnabar": token("on-cinnabar"),
        band: token("band"),
        jade: token("jade"),
        blue: token("blue"),
        ochre: token("ochre"),
      },
      borderRadius: {
        DEFAULT: "3px",
      },
      keyframes: {
        enter: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        stamp: {
          "0%": { opacity: "0", transform: "scale(1.9) rotate(-14deg)" },
          "55%": { opacity: "1", transform: "scale(0.94) rotate(-7deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(-8deg)" },
        },
        tear: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "22%": { transform: "translateY(10px) rotate(-1.2deg)", opacity: "1" },
          "100%": { transform: "translateY(115vh) rotate(9deg)", opacity: "0.9" },
        },
      },
      animation: {
        enter: "enter 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
        stamp: "stamp 0.45s cubic-bezier(0.2, 1.3, 0.4, 1) both",
        tear: "tear 0.9s cubic-bezier(0.5, 0, 0.9, 0.4) forwards",
      },
    },
  },
  plugins: [],
};
