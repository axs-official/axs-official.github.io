import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      colors: {
        void: "#0a0a0a",
        panel: "#111111",
        ink: "#f5f5f5",
        muted: "#a3a3a3",
        dim: "#737373",
        accent: "#3b63f6",
        "accent-soft": "#9cb4ff",
      },
    },
  },
  plugins: [],
};

export default config;
