// @ts-check
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/ts-sandbox/**",
      "**/CUsersOrianAppDataLocalTempyogi-react-ts/**",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  {
    files: ["**/*.{jsx,tsx}"],
    extends: [reactHooks.configs.flat.recommended],
  },
]);
