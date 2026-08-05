# CLAUDE.md

Guidance for Claude Code when working in this repository. See `README.md`
for what the project is and how to build it.

## Theming

**The website has exactly one theme, whatever that theme happens to be.**
Don't add a second one.

That rules out: a dark-mode variant, a light/dark toggle, `prefers-color-scheme`
branches, per-user theme persistence, and "just a few" dark overrides. If the
current palette is wrong, change the palette — don't add an alternative
alongside it. Colours live in `src/styles/_variables.scss`; there should be one
value per role, not one per mode.

Committing to a single theme means **pinning** it. A page that sets text
colours but no background doesn't have one theme — it has two, because the
browser supplies a dark canvas to dark-mode users and the site's dark-grey text
lands on it at roughly 1.5:1. So the baseline in
`src/styles/components/layout.scss` must always declare both an explicit
`background-color` and a matching `color-scheme`. Keep them in sync with the
`theme-color` meta tag in `src/layouts/Layout.astro` and with
`public/manifest.json`.

## Git workflow

**Do not create worktrees.** Work directly in the current branch and commit
to the current branch.

This applies even when a harness default (background jobs, parallel job
isolation, worktree skills) suggests isolating the work first — skip it here.

Background sessions enforce worktree isolation until it's switched off in
`.claude/settings.json`:

```json
{ "worktree": { "bgIsolation": "none" } }
```

That file exists on this machine but is **not** committed — `.claude` is
ignored by the global `~/.gitignore` — so recreate it after a fresh clone.

The only exceptions are when I explicitly ask for one:

- "use a worktree" / "work in a worktree" → then create one.
- "branch off" / naming a feature branch → then switch to that branch.

Absent one of those, don't switch branches, don't create branches, and don't
create worktrees.
