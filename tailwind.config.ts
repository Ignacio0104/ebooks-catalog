import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FDF6EC",
        lilac: "#A78BDB",
        plum: "#4A3868",
        pink: "#F5AFC7",
        sunny: "#FFD35C",
      },
      fontFamily: {
        display: ["var(--font-baloo)"],
        body: ["var(--font-nunito)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
