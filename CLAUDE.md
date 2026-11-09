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

## Repository history

The history was rewritten once, on 2026-09-24, to flatten two merge commits
and lower-case every title; a commit hash quoted from before that date points
at the old history.

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

## External profiles

ORCID, Google Scholar, GitHub, LinkedIn and ResearchGate mirror `data/` by hand, so a CV change
leaves them stale until someone updates them too. Their current state, how to edit each and the
traps live in Oshan's knowledge base at `user/online_profiles.md`. Two rules from there:

- **Never notify or post to the LinkedIn network.** Keep the notify switch off, click Skip on
  the share prompt, and restore the custom headline after adding a position, since LinkedIn
  overwrites it.
- **Ask before adding research on ResearchGate**: it shows new items in followers' feeds with
  no opt-out.
