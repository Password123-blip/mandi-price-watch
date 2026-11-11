import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#16a34a",
        accentSoft: "#dcfce7",
      },
    },
  },
  plugins: [],
};
export default config;
