# cv

Two Typst CVs (academic and casual) driven by a single YAML source of truth.
The YAML lives at the repo root in `../data/` and is shared with the Gatsby
site.

## Layout

```
common/loaders.typ # shared YAML loader + variant-filter helpers
fonts/             # shared font pool (Linux Libertine, Roboto Mono, Font Awesome 6)
variants/
  academic/        # serif, Linux Libertine, 6 pages. main.typ + renderers.typ
  casual/          # dark-blue sidebar + Roboto Mono, 2 pages.
build/             # generated PDFs (gitignored)
```

## Build

```sh
just            # build both (default)
just academic   # academic CV only
just casual     # casual CV only
just watch-academic
just watch-casual
just clean
```

Requires `typst` (>= 0.13) and `just` on PATH.

Outputs:

- `build/academic-cv.pdf`
- `build/casual-cv.pdf`

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
the `md()` helper in each variant's `renderers.typ`.

## Data files

| File | Consumers | Notes |
|---|---|---|
| `personal.yaml`       | both | contact, taglines, profile list, casual sidebar blurbs |
| `education.yaml`      | both | academic retains extras + Maliyadeva HS |
| `experience.yaml`     | both | `category: professional\|research` splits academic sections |
| `projects.yaml`       | both | casual uses short `description`, academic uses `description_academic` |
| `skills.yaml`         | casual | grouped by category |
| `certifications.yaml` | both | `name_casual` override for Oracle entry |
| `awards.yaml`         | both | top-level map: `entries` + `awards_notes_academic` |
| `publications.yaml`   | academic | top-level map: `items` + `equal_contribution_note`; structured authors |
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
2. Edit or add the entry. If variant-scoped, set `include_in`.
3. Run `just` to rebuild.
