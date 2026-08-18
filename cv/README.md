# cv

Three Typst CVs (academic, casual, ATS) driven by a single YAML source of
truth. The YAML lives at the repo root in `../data/` and is shared with the
Gatsby site.

## Layout

```
common/loaders.typ # shared YAML loader + variant-filter helpers
fonts/             # shared font pool (Linux Libertine, IBM Plex Sans,
                   # JetBrains Mono, Font Awesome 6)
variants/
  academic/        # serif, Linux Libertine, 6 pages. main.typ + renderers.typ
  casual/          # dark, IBM Plex Sans + JetBrains Mono, 2 pages.
  ats/             # plain single column, 3 pages. Machine-readable, not pretty.
build/             # generated PDFs (gitignored)
```

## Build

```sh
just            # build all three (default)
just academic   # academic CV only
just casual     # casual CV only
just ats        # ATS CV only
just watch-academic
just watch-casual
just watch-ats
just clean
```

Requires `typst` (>= 0.13) and `just` on PATH.

Outputs:

- `build/academic-cv.pdf`
- `build/casual-cv.pdf`
- `build/ats-cv.pdf`

Note that `just` does not produce `ats-cv.txt` — the plain-text twin is written
by `node scripts/build-ats-txt.mjs`, which the npm scripts run and the justfile
does not. Use `pnpm build:cv:ats` when you want both.

## Fonts

Every face a variant uses must live in `fonts/`. CI builds on a bare Ubuntu
runner with no system fonts installed, so anything referenced but not vendored
falls back silently — the PDF still builds, it just comes out in the wrong
typeface. All vendored faces are OFL.

To check a change hasn't introduced a system-font dependency, build the way CI
effectively does and confirm it still looks right:

```sh
typst compile --root .. --font-path fonts --ignore-system-fonts variants/casual/main.typ /tmp/check.pdf
```

## SSOT conventions

Every entry in a `../data/*.yaml` list that can appear in either CV carries an
`include_in` tag:

```yaml
- include_in: [academic, casual]   # shown in both
- include_in: [academic]           # academic-only
- include_in: [casual]             # casual-only
```

`common/loaders.typ#load-yaml-list(path, variant)` filters on this tag.

When a field differs between variants, the bare key is the default and a
`_academic` / `_casual` suffix overrides it:

```yaml
role: "Senior Data Science Engineer"
location_academic: "Sri Lanka"
location_casual:   "Colombo"
```

Renderers fetch overridable fields via `field(item, key, variant)`.

Typst markup inside YAML strings (e.g. `#super[th]`, `_italic_`) is parsed by
the `md()` helper in each variant's `renderers.typ` — except in the ATS variant,
whose `plain()` helper strips it instead. A superscript is a separate text run
at its own baseline, and extraction splits the word around it.

### The ATS variant does not have its own tag

`ats` is deliberately **not** an `include_in` value. `variants/ats/main.typ`
sets `variant = "casual"` and renders the casual CV's content through a
machine-readable renderer, so it inherits every casual tag and `_casual`
override automatically and cannot drift from the industry CV. Tag an entry
`casual` and it appears in both. There is nothing to keep in sync, and
`../src/content.config.ts` needs no third enum member.

## Data files

| File | Consumers | Notes |
|---|---|---|
| `personal.yaml`       | both | contact, taglines, profile list, casual sidebar blurbs; ATS uses `tagline_casual` as its headline |
| `education.yaml`      | both | academic retains extras + Maliyadeva HS |
| `experience.yaml`     | both | `category: professional\|research` splits academic sections |
| `projects.yaml`       | both | casual uses short `description`, academic uses `description_academic` |
| `skills.yaml`         | both | grouped by category; `category_casual` shortens labels for the casual CV's narrow column |
| `certifications.yaml` | both | `name_casual` override for Oracle entry |
| `awards.yaml`         | both | top-level map: `entries` + `awards_notes_academic` |
| `publications.yaml`   | both | top-level map: `items` + `equal_contribution_note`; structured authors |
| `preprints.yaml`      | academic | structured authors |
| `under-review.yaml`   | academic | structured authors + optional `venue` annotation |
| `scholarships.yaml`   | academic | optional `footnote:` per entry |
| `talks.yaml`          | academic | `type: poster\|oral\|invited` buckets |
| `workshops.yaml`      | academic | plain strings |
| `mentoring.yaml`      | academic | plain strings |
| `open-source.yaml`    | academic | `[label]` placeholders in `description` resolve via `links` sidecar |
| `volunteering.yaml`   | academic | plain strings |

## Adding or editing content

1. Find the right YAML file in `../data/`.
2. Edit or add the entry. If variant-scoped, set `include_in`. Tagging `casual`
   also puts the entry in the ATS CV — see above.
3. Run `just` to rebuild.

## Verifying the ATS variant

The ATS CV exists because the casual one does not survive text extraction: the
pdfminer/pypdf family reads OpenType kern offsets as word breaks, so IBM Plex
Sans shreds every word into fragments like `r esear cher`. `pdftotext` hides the
problem by reconstructing boundaries from font metrics, and nothing about it is
visible on screen — so it needs a test, not an eyeball:

```sh
pnpm build:cv:ats && pnpm check:cv:ats
```

`variants/ats/main.typ` sets `kerning: false`, which is what fixes it. Rerun the
check after touching the font, the size, or that flag. It is worth confirming
the check still has teeth as well:

```sh
python3 scripts/check-ats.py --expect-fail public/cv/casual-cv.pdf
```
