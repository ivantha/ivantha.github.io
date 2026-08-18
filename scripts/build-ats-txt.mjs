// Build public/cv/ats-cv.txt — the plain-text twin of the ATS PDF.
//
// Why a second generator rather than extracting the PDF: job forms very often
// ask you to PASTE a résumé into a textarea rather than upload a file, and text
// derived from a PDF inherits whatever the extractor did to it. Generating from
// the YAML directly means there is no glyph layer to get wrong.
//
// This duplicates the content assembly in cv/variants/ats/renderers.typ. That is
// accepted rather than accidental: both read the same data/*.yaml through the
// same filter semantics, and the ATS layout is flat enough that the two can be
// diffed by eye. Keep the section order below identical to the render order in
// cv/variants/ats/main.typ so that stays true.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { parse } from "yaml"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT = join(root, "public/cv/ats-cv.txt")

// --- Port of cv/common/loaders.typ -------------------------------------------
//
// Deliberately NOT reusing pickField from src/lib/variants.ts: that helper falls
// back across variants (`item[key_other]` as a last resort), which Typst's
// `field()` does not do. Reusing it would let this file silently disagree with
// the PDF. These three mirror loaders.typ exactly.
//
// As in cv/variants/ats/main.typ, the variant is "casual" on purpose — the ATS
// outputs render the casual CV's content. See the long note in that file.
const VARIANT = "casual"
const included = (e) => (e.include_in ?? [VARIANT]).includes(VARIANT)
const field = (item, key) => item?.[`${key}_${VARIANT}`] ?? item?.[key] ?? null
const bulletsFor = (item) => (item.bullets ?? []).filter(included)

// --- Port of `plain` in cv/variants/ats/renderers.typ ------------------------
const plain = (s) =>
    s == null
        ? ""
        : String(s)
              .replace(/#super\[([^\]]*)\]/g, "$1")
              .replace(/_([^_]+)_/g, "$1")
              .trim()

const dates = (s) => plain(s).replace(/[–—]/g, "-")

const displayUrl = (u) =>
    String(u)
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, "")

const splitList = (s, sep) =>
    s == null
        ? []
        : String(s)
              .split(sep)
              .map((p) => p.trim())
              .filter(Boolean)

// --- Data ---------------------------------------------------------------------

const load = (name) => parse(readFileSync(join(root, "data", `${name}.yaml`), "utf8"))

const personal = load("personal")
const skills = load("skills")
const education = load("education").filter(included)
const projects = load("projects").filter(included)
const experience = load("experience").filter(included)
const awards = load("awards").entries.filter(included)
const publications = load("publications").items.filter(included)
const openSource = load("open-source").filter(included)

// --- Emit ---------------------------------------------------------------------

const out = []
const line = (s = "") => out.push(s)
const section = (title) => {
    line()
    line(title.toUpperCase())
    line()
}
const tech = (items) => {
    if (items.length > 0) line(`  Technologies: ${items.join(", ")}`)
}

const PROFILE_LABEL = {
    linkedin: "LinkedIn",
    github: "GitHub",
    twitter: "Twitter",
    scholar: "Google Scholar",
    kaggle: "Kaggle",
    medium: "Medium",
}

line(`${personal.first_name} ${personal.last_name}`)
line(personal.tagline_casual)
line()
line(`Email: ${personal.emails[0].address}`)
line(`Phone: ${personal.phone.replace(/[()]/g, "").trim()}`)
line(`Location: ${personal.location}`)
line(`Website: ${displayUrl(personal.homepage.url)}`)
for (const slug of personal.profiles_casual.filter((s) => s !== "homepage")) {
    const label = PROFILE_LABEL[slug] ?? slug
    line(`${label}: ${displayUrl(personal.profile_entries[slug].url)}`)
}

section("Summary")
line(plain(personal.about_me))

section("Experience")
experience.forEach((e, i) => {
    if (i > 0) line()
    const company = plain(field(e, "company"))
    const location = plain(field(e, "location"))
    line(plain(field(e, "role")))
    line(location ? `${company}, ${location}` : company)
    line(dates(e.dates))
    for (const b of bulletsFor(e)) {
        line(`- ${plain(field(b, "text"))}`)
        tech(splitList(field(b, "stack"), ","))
    }
})

section("Education")
education.forEach((e, i) => {
    if (i > 0) line()
    line(plain(field(e, "degree")))
    line(e.institute)
    line(dates(field(e, "dates")))
    for (const x of field(e, "extras") ?? []) line(`- ${plain(x)}`)
})

section("Skills")
// Bare `category`, not category_casual — same reasoning as make-skills in
// cv/variants/ats/renderers.typ: "Reinforcement Learning" is the keyword, "RL"
// is not.
for (const s of skills) line(`${s.category}: ${s.stack}`)

section("Projects")
projects.forEach((p, i) => {
    if (i > 0) line()
    line(plain(field(p, "name")))
    tech(splitList(field(p, "stack"), "|"))
    line(plain(field(p, "description")))
})

section("Publications")
for (const p of publications) {
    line(`${plain(field(p, "title"))}. ${plain(field(p, "venue"))}, ${p.year}.`)
}

section("Awards")
for (const a of awards) {
    const event = plain(field(a, "event"))
    const place = plain(field(a, "place"))
    line(`${place ? `${event} (${place})` : event}, ${a.year}`)
}

section("Open Source")
openSource.forEach((o, i) => {
    if (i > 0) line()
    line(plain(field(o, "name")))
    tech(splitList(field(o, "stack"), ","))
    line(plain(field(o, "description")))
})

section("Interests")
line(`Professional: ${personal.interests_casual}`)
line(`Personal: ${personal.who_am_i.join(", ")}`)

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, `${out.join("\n").trim()}\n`, "utf8")
console.log(`wrote ${OUT} (${out.length} lines)`)
