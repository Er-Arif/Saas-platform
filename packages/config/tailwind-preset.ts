import type { Config } from "tailwindcss";

const config: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eafe",
          200: "#bcdafb",
          300: "#8dc0f7",
          400: "#58a0ef",
          500: "#317fdc",
          600: "#2263ba",
          700: "#1f5096",
          800: "#20457a",
          900: "#213a64",
          950: "#172541"
        },
        sand: "#f5f1e8",
        ink: "#101828"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 80px rgba(49, 127, 220, 0.22)"
      }
    }
  }
};

export default config;

