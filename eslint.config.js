import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import astro from "eslint-plugin-astro"

export default tseslint.config(
    {
        // `.claude/**` matches .prettierignore. Without it, a worktree under
        // .claude/worktrees/ is linted as a second copy of the repo, where the
        // path-scoped config below no longer matches and every build script
        // reports Buffer/console as undefined.
        ignores: [".astro/**", ".claude/**", "dist/**", "node_modules/**", "public/**"],
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
