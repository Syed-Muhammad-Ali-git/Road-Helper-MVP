import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-red": "#D72626",
        "brand-dark-red": "#A4161A",
        "brand-black": "#0F0F0F",
        "brand-charcoal": "#1C1C1C",
        "brand-offwhite": "#F5F5F5",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #D72626 0%, #A4161A 100%)",
        "dark-gradient": "linear-gradient(180deg, #1C1C1C 0%, #0F0F0F 100%)",
        "light-gradient": "linear-gradient(180deg, #FFFFFF 0%, #F3F3F3 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
