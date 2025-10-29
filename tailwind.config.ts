// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: false, // ⛔ nonaktifkan dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
