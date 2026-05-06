# ivantha.github.io

Source for [ivantha.com](https://ivantha.com) — a personal site that's
also the single source of truth for my CV. The site is rendered with
Gatsby; the CV (academic and casual variants) is rendered with Typst.
Both consume the YAML data in `data/`.

## Quickstart

```sh
yarn install
yarn develop          # http://localhost:8000
```

To build everything (PDFs + site):

```sh
yarn build            # runs build:cv, then gatsby build
```

To rebuild just the CVs:

```sh
yarn build:cv         # produces static/cv/{academic,casual}-cv.pdf
yarn build:cv:academic
yarn build:cv:casual
```

Requires `typst >= 0.13` for the CV build. The site itself only needs
Node and Yarn.

## Editing CV content

All CV data lives in `data/*.yaml`. Pick the file that matches the
section you want to change:

| File | Drives |
|------|--------|
| `personal.yaml` | name, contact, taglines, profile links |
| `education.yaml` | degrees |
| `experience.yaml` | jobs (split research / professional) |
| `publications.yaml` | published + under-review papers |
| `preprints.yaml`, `under-review.yaml` | preprints, under-review (academic CV only) |
| `projects.yaml` | portfolio projects |
| `skills.yaml` | technical skills (casual CV only) |
| `awards.yaml` | achievements / honours |
| `certifications.yaml` | course / specialization certs |
| `talks.yaml`, `workshops.yaml` | talks (poster/oral/invited), workshops attended |
| `mentoring.yaml`, `volunteering.yaml`, `open-source.yaml`, `scholarships.yaml` | other CV sections |

**Variant filtering.** Each YAML entry may carry `include_in: [academic, casual]`
to control which CV variant it appears in. Missing tag = visible
everywhere; `include_in: []` (empty list) = hidden from both.

The website renders the union of academic + casual entries. To hide an
entry from the website without changing the CVs, you'd need to add a
`web` literal — currently unused.

**Variant-scoped fields.** Where a value differs between CV variants,
suffix it with `_academic` or `_casual`:

```yaml
role: "Senior Data Science Engineer"   # default
role_casual: "Senior DSE"               # casual override
```

**Linking certificates and papers.** Some YAML entries support an
optional `pdf_url:` to link a local file (e.g. cert PDFs in
`static/certificates/` or paper PDFs in `static/papers/`). Used by the
website to render `[PDF]` / `[Certificate]` links; ignored by Typst.

After any YAML edit, rerun `yarn build:cv` (or `cd cv && just`) to
refresh the PDFs.

## Static layout

```
static/
├── cv/                  # built academic-cv.pdf + casual-cv.pdf (gitignored)
├── papers/              # research paper PDFs
├── posters/             # research / talk posters
└── certificates/        # course + competition certificate PDFs
```

## CI / deployment

Pushing to `main` triggers `.github/workflows/gatsby.yml`, which:

1. Sets up Node 16 and Typst 0.13.
2. Runs `yarn install` and `yarn build` (which chains `build:cv` →
   `gatsby build`).
3. Uploads `public/` and deploys to GitHub Pages.

The CNAME is in `static/CNAME` (`ivantha.com`).

## Repository history

The CV used to live in a separate local-only repo. It was merged into
this repo via `git subtree add --prefix=cv ...` so all CV history is
reachable. See `cv/README.md` for Typst-side details.
