import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12211C",
        paper: "#EEF0EA",
        panel: "#F7F8F4",
        line: "#C9CCC0",
        muted: "#5B6259",
        gold: "#B8863B",
        "gold-soft": "#DCC69A",
        teal: "#1F6F63",
        "teal-soft": "#D9E7E2",
        rust: "#A6432F",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
