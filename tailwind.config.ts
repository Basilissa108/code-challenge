import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        loading: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0.3", transform: "translateY(-6px)" },
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
