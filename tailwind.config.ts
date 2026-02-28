import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: "#87CEEB",
        /* Light mode grays (slate) */
        "light-50": "rgb(248 250 252)",   /* slate-50 */
        "light-100": "rgb(241 245 249)",  /* slate-100 */
        "light-200": "rgb(226 232 240)",  /* slate-200 */
        /* Dark mode grays */
        "dark-900": "rgb(15 23 42)",      /* slate-900 */
        "dark-800": "rgb(30 41 59)",     /* slate-800 */
        "dark-700": "rgb(51 65 85)",      /* slate-700 */
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "bounce-subtle": "bounce-subtle 0.5s ease-out",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "marquee-left": "marquee-left 25s linear infinite",
        "marquee-right": "marquee-right 25s linear infinite",
        "marquee-mobile": "marquee-left 20s linear infinite",
      },
      keyframes: {
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
