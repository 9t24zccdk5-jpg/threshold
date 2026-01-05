import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17121C",
        smoke: "#2A2230",
        ivory: "#F6F1E8",
        ember: "#D6A86E"
      }
    }
  },
  plugins: []
} satisfies Config;
