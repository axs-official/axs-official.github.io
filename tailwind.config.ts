
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Manrope", "system-ui", "sans-serif"] },
      backgroundImage: {
        "gradient-radial": "radial-gradient(50% 50% at 50% 50%, #0b0b12 0%, #040407 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
