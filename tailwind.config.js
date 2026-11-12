/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        hanzi: [
          "Noto Sans SC",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          50: "#eef5ff",
          100: "#d9e8ff",
          200: "#bcd7ff",
          300: "#8ebeff",
          400: "#599bff",
          500: "#3377ff",
          600: "#1f5af5",
          700: "#1846e1",
          800: "#1a3bb6",
          900: "#1b388f",
        },
        accent: {
          400: "#ff8a5c",
          500: "#ff6b35",
          600: "#f25016",
        },
      },
      boxShadow: {
        soft: "0 6px 24px -8px rgba(16, 24, 40, 0.18)",
        card: "0 2px 12px -4px rgba(16, 24, 40, 0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop": {
          "0%": { transform: "scale(0.96)" },
          "60%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "pop": "pop 0.25s ease-out",
      },
    },
  },
  plugins: [],
};
