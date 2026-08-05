# Site theme rework — design

Date: 2026-08-05
Status: **superseded.** Kept as the record of a design that was planned and then
not built.

> **Superseded by the "paper terminal" theme, which is what the code now
> implements.** There is no successor document. The shipped theme is documented
> in the stylesheets themselves, where each rationale sits next to the value it
> explains and so cannot drift from it:
>
> - `src/styles/_variables.scss` — every colour token with its measured ratio
> - `src/styles/components/layout.scss` — type scale, shell, measure caps
> - `src/styles/components/_navbar.scss` — rail nav and the disclosure
> - `src/lib/prompt.ts`, `src/layouts/Layout.astro` — the command crumb
>
> **What survived:** §1's sticky rail and normal document scroll; §2's IBM Plex
> Mono + Sans at a 14px base, and its 400/600-only weight postcondition, which
> still greps clean; §4's `<details>` disclosure and the `@supports` guard around
> it, shipped nearly verbatim; all 17 nav links.
>
> **What did not:**
>
> - **§3 is wrong in every row.** The canvas is `#fbfaf7` paper, not `#ffffff`,
>   so every ratio was re-measured against it. The inks became `#17191c` /
>   `#2f3136` / `#5c5a52`, the link `#1a5fb4` — §3 calls the link unchanged; it
>   changed — the hover `#0f3f7a`, the accent `#9a7d2e`. `$pf-surface-sunken`,
>   `$pf-rule`, and `$pf-rule-strong` are shipped tokens this document never
>   anticipated. §5 inherits the same error where it expects `#ffffff` to hold.
> - **Shipped without being designed here:** the four-step type scale and its
>   "no page may introduce a fifth" rule, `--measure-mono` alongside the prose
>   cap, three line-height tokens rather than two, `h2` demoted to a tracked
>   uppercase rule-under label at metadata size, `h3` at body size, boxed venue
>   chips, and the `$ ls ~/path` command crumb above each page title.
> - **§1's blast radius was never true** — corrected in place, in that section.

## Goal

Replace the site's current visual theme with one that is readable on a phone,
readable in long-form prose, and hierarchical enough that a section header
doesn't carry the same weight as a list item — while keeping the monospace
"terminal" character that makes the site recognisable.

This is a theme and layout change. It touches no content, no `data/`, and no
Typst CV.

## Constraints

- **One theme only.** No dark mode, no `prefers-color-scheme` branch, no
  toggle, no per-user persistence. Per `CLAUDE.md`, if a colour is wrong the
  colour changes — an alternative is never added alongside it. The theme stays
  pinned: explicit `background-color` plus `color-scheme: light`, kept in sync
  with the `theme-color` meta tag in `src/layouts/Layout.astro` and
  `public/manifest.json`.
- **No client-side JavaScript.** The site currently ships none for UI — the
  only scripts in `Layout.astro` are Google Analytics. The mobile nav must not
  change that.
- **All 17 nav links stay.** Grouping or pruning navigation is an information
  architecture change, out of scope here.
- Work on `main`, no branches, no worktrees.

## Baseline — what is wrong today

Measured on the live dev server, not assumed:

1. **Mobile is broken, not merely unstyled.** The codebase contains exactly one
   `@media` query (`src/styles/components/layout.scss:29`) and it is
   `prefers-reduced-motion`. At 375px the fixed `16rem` sidebar consumes the
   viewport and content is pushed off-screen entirely.
2. **Every bold on the site is faux bold.** Only Roboto Mono weight 400 is
   fetched (`family=Roboto+Mono`, no weight axis). `h1` computes to 700,
   `.navbar a.active` to 500, and `b` to 800 — all synthesised by the browser
   from the 400 cut.
3. **No measure control.** Monospace runs ~30–40% wider per character than a
   proportional face and nothing caps line length; publication titles span the
   full window (~150 characters on a 1600px screen).
4. **`$pf-secondary-font` is declared and never used**
   (`src/styles/_variables.scss:3`). The proportional-body-face escape hatch was
   designed in and abandoned.
5. **Line-height is scattered and tight.** `line-height: 1.25` is repeated
   across 11 page stylesheets (`certifications.scss` uses 1.35); there is no
   global default.
6. **Nested scroll containers.** Three regions scroll independently, which
   breaks browser scroll restoration, `Cmd+F` scroll-to-match, and `#anchor`
   deep links.
7. **Hover changes hue, not just prominence.** `$pf-link-hover-color: #8a5a00`
   is brown against a blue `#1772d0` link. The contrast reasoning behind it was
   sound; the hue jump reads as a different kind of thing rather than a more
   prominent one.

## Decisions taken

| Decision            | Choice                                            |
| ------------------- | ------------------------------------------------- |
| Layout model        | Sticky rail + normal document scroll              |
| Type identity       | Keep mono; add a proportional face for prose only |
| Font superfamily    | IBM Plex Mono + IBM Plex Sans                     |
| Base font size      | 14px (unchanged)                                  |
| Site name placement | Moves into the sticky rail                        |

## 1. Layout and scroll model

Remove the `100vh` app shell. The document scrolls normally.

- `.content` and `.container` lose `height`, `max-height`, and
  `overflow: hidden`.
- `.section-wrapper` and `.section-items` lose `height: 100%` and
  `overflow: auto`.
- `.header`'s fixed `height: 122px` and `.section-title`'s
  `min-height`/`max-height: 75px` both go — they are artifacts of the fixed
  shell.
- `.container` becomes a two-column grid (`16rem 1fr`).
- The left column is `position: sticky; top: 0; align-self: start`, with its own
  `max-height: 100vh` and `overflow-y: auto` so a long nav can still scroll
  independently when it exceeds the viewport.

### Markup change

`<header>` moves from above `.container` to inside it, as the first grid child,
and takes the site name and `<nav>` with it:

```
<header class="rail">
  <h1|a class="site-name">Oshan Mudannayake</h1|a>
  <NavBar />
</header>
```

This is the only markup change in the design. Rationale: today the 122px header
is permanently on screen; if it simply scrolls away the site name is lost on
every scroll, and on a personal site the name is the brand. Pinning name and nav
together preserves it and returns ~122px of vertical space to content. The
`<header>` landmark containing the site name and primary `<nav>` remains
semantically correct, and the existing conditional (`<h1>` on home, `<a>`
elsewhere) is unaffected.

### Blast radius

> **Correction — this section was wrong when written, not merely superseded.**
> The original text is quoted below rather than left standing as prose, because
> a reader skimming for the component map would have acted on it.
>
> It claimed: "identical across all 19 pages, 12 of them via
> `src/components/ListSection.astro`. The layout change is therefore almost
> entirely confined to `layout.scss`; no per-page markup changes."
>
> `ListSection.astro` is imported by nothing — `grep -rn ListSection src/`
> returns no hit at all, the only trace of the name anywhere in the tree being
> the component's own filename. All **18** pages hand-roll
> `.section-wrapper` / `.section-title` / `.section-items` inline, so the
> component routes zero of them and the 12 was never a real number.
>
> The conclusion drawn from it was wrong too. Implementation was not confined to
> `layout.scss` and did not avoid per-page markup: `NavBar.astro`,
> `PublicationItem.astro`, `Layout.astro`, and `education.astro` all changed, and
> `src/styles/pages/education.scss` was deleted outright.

## 2. Typography

Replace Roboto Mono with **IBM Plex Mono**, and wire `$pf-secondary-font` to
**IBM Plex Sans**. They are one superfamily, so the two faces share letter
skeletons and the mix reads as deliberate.

Load real weights — Mono 400/600, Sans 400/600 — which resolves the faux-bold
defect. Every declared weight must then be snapped to a loaded cut, or it stays
synthesised. The full set:

| Selector                            | Now          | Becomes |
| ----------------------------------- | ------------ | ------- |
| `b` (`layout.scss`)                 | 800          | 600     |
| `.site-name` (`layout.scss`)        | `bold` (700) | 600     |
| `.skip-link` (`layout.scss`)        | 700          | 600     |
| `.link` (`layout.scss`)             | `bold` (700) | 600     |
| `.navbar a.active` (`_navbar.scss`) | 500          | 600     |
| `.date-text` (`home.scss`)          | 700          | 600     |

This is a sweep, not a handful of edits. There are **26 `font-weight`
declarations** across the stylesheets — 6 in `layout.scss`/`_navbar.scss` (the
table above) and 20 more spread over 13 page stylesheets, nearly all `700`.
Every one must land on a loaded cut: after this change only `400` and `600` may
appear anywhere in `src/styles/`, which is a greppable postcondition.

| Role                                                                     | Face          |
| ------------------------------------------------------------------------ | ------------- |
| Site name, nav, `h1`/`h2`, dates, venues, DOI/arXiv refs, contact values | IBM Plex Mono |
| Running prose — homepage bio, research/project/article descriptions      | IBM Plex Sans |

- Base size stays **14px**.
- Prose is capped at a `--measure` of ~68ch.
- Line-height becomes global: **1.6** for prose, **1.3** for headings and mono
  lists. The 12 per-page `line-height` declarations are removed.
- Because two faces now sit at one size, check optical size parity between Plex
  Sans and Plex Mono. `font-size-adjust: from-font` is the right tool if they
  diverge; it degrades harmlessly where unsupported. Verify visually rather than
  applying pre-emptively.

## 3. Colour and hierarchy

> **Stale — every token below was replaced, and the white canvas these ratios
> assume is not the one that shipped.** Do not copy these values. The shipped
> tokens and their measured ratios live in `src/styles/_variables.scss`.

All ratios below are measured against `#ffffff`.

| Token        | Value     | Ratio  | Use                        |
| ------------ | --------- | ------ | -------------------------- |
| `ink-strong` | `#1a1a1a` | 17.4:1 | Headings, site name        |
| `ink-body`   | `#333333` | 12.6:1 | Body text                  |
| `ink-muted`  | `#5f5f5f` | 6.4:1  | Metadata, inactive nav     |
| `link`       | `#1772d0` | 4.8:1  | Links (unchanged)          |
| `link-hover` | `#0f4c8a` | 8.7:1  | Link hover, plus underline |
| `accent`     | `#c17d00` | 3.4:1  | **Non-text only**          |

Three ink steps supply hierarchy that the current two greys (`#424242`,
`#616161`) cannot. The hover colour now holds the link's hue and darkens it.

**Accent constraint.** `#c17d00` is used only for the active-nav marker, section
rules, and list bullets — never for text, at any size. It clears the 3:1
non-text floor but not the 4.5:1 text floor. The original `#f9a825` is not
viable even as a non-text accent: it measures 1.97:1 and fails both floors.
Active nav state remains redundantly encoded in ink and weight, so colour is
never the sole signal.

## 4. Responsive behaviour

Breakpoint at **900px**.

- **≥900px** — two-column grid, sticky rail as described in §1.
- **<900px** — single column. The rail becomes a normal-flow block at the top of
  the page; the nav collapses into a native `<details>`/`<summary>` disclosure
  labelled "Menu". Nav links get ≥44px touch targets.

### Disclosure mechanism

`NavBar.astro` renders the nav wrapped in a `<details>` that is **closed by
default** (correct for mobile). Desktop forces it open with CSS only:

```scss
@media (min-width: 900px) {
    @supports selector(::details-content) {
        .site-nav > summary {
            display: none;
        }
        .site-nav::details-content {
            content-visibility: visible;
            block-size: auto;
        }
    }
}
```

Verified working in Chromium 148; `CSS.supports('selector(::details-content)')`
returns true, and a closed `<details>` renders its content when overridden this
way.

Hiding the `<summary>` sits **inside** the `@supports` block deliberately. Where
`::details-content` is unsupported, the summary stays visible and desktop users
get a clickable "Menu" — one extra click, never unreachable navigation. Putting
the `display: none` outside the guard would hide the only control in exactly the
browsers that need it.

No JavaScript. The disclosure is keyboard-accessible and screen-reader-announced
natively.

### Scrollbar

`_scrollbar.scss` currently styles a 5px scrollbar that applies to the inner
panes. With those gone it applies to the page scrollbar; re-check that the 5px
width and `#b6b6b6` thumb still read acceptably as the primary page scrollbar.

## 5. Verification

- Render at 375px, 768px, and 1280px; content must be reachable and no
  horizontal overflow at any width.
- Confirm computed `font-weight` values correspond to loaded faces — no
  synthesised bold anywhere.
- Re-check every ratio in §3 against the shipped values.
- Confirm `background-color`, `color-scheme`, the `theme-color` meta tag, and
  `manifest.json` all still agree (all remain `#ffffff`; no change expected, but
  verify rather than assume).
- Confirm zero client-side JS is added: no new `<script>` beyond the existing
  analytics.
- `pnpm lint` clean.

## Non-goals

- No dark mode or any second theme.
- No content, `data/`, or Typst CV changes.
- No nav restructuring — all 17 links stay.
- No client-side JavaScript.
- No changes to the OG image pipeline or analytics.

## Open items for implementation

- Optical size parity between Plex Sans and Plex Mono at 14px (§2) — resolve by
  eye in the browser, not by assumption.
- Font loading strategy: the current Google Fonts `<link>` costs a
  render-blocking round trip and now has to carry four faces instead of one.
  Self-hosting the subset via `@font-face` is worth weighing during
  implementation.
