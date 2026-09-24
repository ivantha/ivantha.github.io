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

### History and commits

`main` keeps a strictly linear history. No merge commits, ever.

- **Commit titles start with a lower-case letter**: imperative, one short
  line, no `feat:`-style prefix. A body is optional; when the title doesn't
  carry the why, add a blank line and two or three plain sentences wrapped
  at 72 columns.
- **Pull with rebase.** This clone sets `pull.rebase true` and
  `merge.ff only`, so a stray merge commit can't happen locally. Like
  `.claude/settings.json`, they aren't committed, so re-set them after a
  fresh clone: `git config pull.rebase true && git config merge.ff only`.
- **Landing a branch** (only when I asked for one): rebase it onto `main`,
  then `git merge --ff-only`. On GitHub, **Rebase and merge** is the only
  button; merge commits and squash are switched off, and merged PR branches
  are deleted automatically.
- **Clean up after every merge**: delete the branch locally and on GitHub,
  remove its worktree, drop any stash. Between pieces of work only `main`
  exists.
- **Never force-push, rewrite or delete `main`.** A ruleset on GitHub blocks
  deletion and force pushes and requires linear history, with no bypass,
  not even for admins (since 2026-09-24).

The history was rewritten once, on 2026-09-24, to flatten two merge commits
and lower-case every title; trees, authors and dates were kept. A commit
hash quoted from before that date points at the old history.

## Unlisted pages

`public/reclusive-raven/` holds two pages that are **not part of the academic site**: the home
page and privacy policy that the Google OAuth consent screen for Oshan's personal tools links to
(GCP project `reclusive-raven`, app "Flux"). Academic visitors must not be able to reach them, so:

- They are static HTML in `public/`, which Astro copies untouched. That keeps them out of the nav
  rail, the layout, and the sitemap. Don't convert them into `src/pages/` routes.
- Each carries `<meta name="robots" content="noindex, nofollow">`.
- Nothing on the site links to them. Don't add a link, and don't list the path in `robots.txt`,
  which is public and would advertise it.

They are orphans on purpose. Don't delete them as dead files: Google publishing for those tools
depends on both URLs staying live.
