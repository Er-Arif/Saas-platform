import type { Config } from "tailwindcss";
import sharedPreset from "@company/config/tailwind-preset";

const config: Config = {
  presets: [sharedPreset as Config],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ]
};

export default config;

