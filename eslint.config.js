import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import astro from "eslint-plugin-astro"

export default tseslint.config(
    {
        ignores: ["dist/**", ".astro/**", "node_modules/**", "public/**"],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...astro.configs.recommended,
    {
        // Build-time scripts run under Node, not in the browser.
        files: ["scripts/**/*.mjs"],
        languageOptions: {
            globals: { Buffer: "readonly", console: "readonly", process: "readonly" },
        },
    },
)
