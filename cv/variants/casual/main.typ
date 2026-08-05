#import "../../common/loaders.typ": *
#import "renderers.typ": *

#let variant = "casual"
#let personal  = yaml("/data/personal.yaml")
#let education = load-yaml-list("/data/education.yaml", variant)
#let skills         = yaml("/data/skills.yaml")
#let certifications = load-yaml-list("/data/certifications.yaml", variant)
#let awards-doc     = yaml("/data/awards.yaml")
#let achievements   = awards-doc.entries.filter(e => variant in e.at("include_in", default: (variant,)))
#let projects       = load-yaml-list("/data/projects.yaml", variant)
#let experience     = load-yaml-list("/data/experience.yaml", variant)
// Split on the same field the academic variant splits on, and into the same two
// section titles, because both documents are built from one experience.yaml and
// a reader holding them together should not have to work out whether "Research
// Experience" here means what it means there. Filtering preserves the file's
// most-recent-first order, so each section is still chronological on its own.
#let prof-exp       = experience.filter(e => e.category == "professional")
#let research-exp   = experience.filter(e => e.category == "research")
#let pubs-doc       = yaml("/data/publications.yaml")
#let publications   = pubs-doc.items.filter(p => variant in p.at("include_in", default: (variant,)))
#let open-source    = yaml("/data/open-source.yaml").filter(o => variant in o.at("include_in", default: (variant,)))

#set document(
  title: personal.first_name + " " + personal.last_name + " — CV",
  author: personal.first_name + " " + personal.last_name,
)

// A let rather than a literal because page 2's column arithmetic derives from
// it: the measure is the sheet less two of these, and the three columns divide
// what is left. Hardcoding 15mm in three places means a margin change silently
// leaves the columns sized for the old measure.
#let margin-x = 15mm

// Real margins, unlike the previous revision's edge-to-edge panels: the dark
// ground still bleeds to the paper edge, but the text block is inset properly.
#set page(
  paper: "a4",
  margin: (x: margin-x, top: 10mm, bottom: 11mm),
  fill: ground,
  footer: page-number,
  footer-descent: 5mm,
)
#set text(font: sans, size: fs-body, fill: body, weight: 400, hyphenate: false)
// 0.53em, down from 0.6em via 0.55em. Page 1 carries the whole of experience
// against a fixed budget — the pagebreak below is unconditional, so anything
// that doesn't fit doesn't flow, it strands. Nine roles and two section headers
// do not fit at 0.6em. Every gap constant in renderers.typ that reads against
// this value was re-derived from the absolute leading rather than left pointing
// at an older one — see the rhythm note there.
//
// WHAT THIS POOL IS ACTUALLY WORTH, measured on the current document: 1.09pt per
// 0.01em. Leading only opens gaps WITHIN a wrapped paragraph, and page 1 is
// mostly explicit `v()` and block spacing, so the rate implies just ~14 wrapped-
// line boundaries here (1.09 / 0.08pt per boundary at fs-body) — not the ~80
// baselines the page actually sets. An earlier revision of this note called
// leading "the only pool big enough to matter", which the arithmetic does not
// support: the whole 0.6em → 0.55em step was worth ~5.5pt. It is a real pool and
// a small one, and it is spendable mainly because the ratio it has to preserve
// (below) improves as it shrinks.
//
// The last 0.02em is what splitting experience into two sections cost, and it
// was measured rather than guessed: at 0.55em the split needs 815.9pt against a
// text area ending at 810.7pt, and this pays 2.2pt of that. sp-section-p1 pays
// the other 2pt. Splitting the cost across two pools was deliberate — either one
// alone would have had to give up its whole documented margin.
//
// This narrows rather than widens the gap to page 2, which runs the same 8pt
// prose at col-leading (0.48em). 0.53em is a ~1.53 line-height against page 2's
// ~1.48, so page 1 is still the looser of the two, and the theme's own note on
// col-leading — leading is far less perceptible across a page turn than size is
// — argues this direction is the cheap one. Size is untouched on both pages.
// It also IMPROVES the rhythm ordering rather than straining it: sp-bullet (5pt)
// now clears the leading by 18% where it cleared 4.4pt by 14%.
#set par(justify: false, leading: 0.53em)
// Deliberate no-op: links carry no inherited styling. Affordance is explicit —
// renderers colour them, and `ext-link` rules them.
#show link: it => it

// -------- Page 1: identity + the whole of experience --------
#render-header(personal)

// The profile panel's change of ground already separates it from the header.
// Keep only a small optical pause here; the longer summary uses the rest of
// this formerly redundant gap without tightening the experience entries.
#v(2pt)
#render-profile(personal)

// Professional first, research second. Not chronology — the two sections can't
// both lead — but the reader this variant is written for: it is the CV that goes
// to engineering teams, and the professional section holds the current role.
// The academic variant orders them the same way, which is a coincidence of that
// document's own logic rather than a shared rule, but there is no reason to
// disagree with it here.
//
// Weak, so it collapses with the sp-head-above the section header emits rather
// than stacking on top of it. See sp-section-p1 in renderers.typ.
#make-experience(prof-exp, title: "Professional Experience")
#v(sp-section-p1, weak: true)
#make-experience(research-exp, title: "Research Experience")

#pagebreak()

// The personal strips become page furniture on page 2 rather than flowed
// content. Putting them in the footer reserves their height out of the body
// area automatically, so the two columns can never grow into the space and
// push them onto a third page. The bottom margin has to grow to match — a
// footer taller than its margin silently runs off the bottom of the sheet.
// A shorter descent than page 1's: this footer is two rows tall, so anchoring
// it at the default would carry the last row to within ~2mm of the trim edge,
// inside the unprintable margin of most desktop printers.
#set page(
  margin: (x: margin-x, top: 14mm, bottom: 20mm),
  footer-descent: 3mm,
  footer: render-personal-footer(personal, trailing: page-number-text),
)

// -------- Page 2: everything else, three columns --------
//
//   ┌──────────┬─────────────────────────┐
//   │          │  SKILLS   (band, 2 col) │
//   │ PROJECTS ├────────────┬────────────┤
//   │          │ EDUCATION  │ ACHIEVEM.  │
//   │          │ PUBLICAT.  │ OPEN SRC   │
//   └──────────┴────────────┴────────────┘
//
// Two constraints decide this shape, and both are load-bearing.
//
// FIRST: skills cannot live in a column. Its form is a fixed label gutter
// right-aligned against `=` (see make-skills), and that gutter costs the same
// 18mm whatever the measure — 22mm of a 85.5mm half-page, but 40% of a 56mm
// third. At a third the value side is ~24 monospace glyphs and every row wraps
// three to five times; the section swells past the height of the column it was
// supposed to fit into. So skills comes OUT of the column grid and sets as a
// band across the top instead.
//
// SECOND: that band spans columns 2 and 3 only, never all three. Projects is
// the tallest section in the document — ~205mm at this measure, against a
// 263mm body. A full-width band would take ~38mm off the top of every column
// and leave projects ~225mm, which still fits; but the balance then collapses,
// because nothing else is tall enough to hold the other two columns down. Held
// to two columns, the band leaves column 1 at full height, projects reads as
// one uninterrupted list, and the ~54mm it doesn't use is honest slack for the
// next project rather than a hole in the middle of the page.
//
// Placement below is deliberate, not flowed. `columns(3)` would balance the
// bottom edge more evenly, but it splits entries across column boundaries —
// a project title stranded at the foot of one column with its body at the head
// of the next — which grid cells cannot do by construction. Even bottoms are
// not worth a renderer full of `breakable: false`.
//
// Education leads column 2 rather than sitting with the other short sections:
// publications alone left column 2 ending ~50mm above its neighbours, which
// read as a gap rather than as a ragged edge. Certifications sits with
// achievements because the two share a renderer form exactly (year, then one
// line), and because column 3 is the one holding the spare height.
//
// That spare height is ~46mm, which is the section header plus about THREE
// certifications at this measure — not the thirteen in certifications.yaml,
// which want ~170mm. The casual variant deliberately opts into none of them
// (see the note at the top of that file), so this is contingency, not a
// budget: re-enabling a couple is free, re-enabling the list needs a
// rebalance and probably a third page.
#let gut = 6mm
#let colw = (210mm - 2 * margin-x - 2 * gut) / 3

#[
  #set par(leading: col-leading)
  #grid(
    columns: (colw, 2 * colw + gut),
    column-gutter: gut,
    align: (left + top, left + top),
    make-projects(projects),
    {
      make-skills(skills)
      v(sp-section, weak: true)
      grid(
        columns: (colw, colw),
        column-gutter: gut,
        align: (left + top, left + top),
        {
          make-education(education)
          v(sp-section, weak: true)
          make-publications(publications)
        },
        {
          make-certifications(certifications)
          v(sp-section, weak: true)
          make-achievements(achievements)
          v(sp-section, weak: true)
          make-open-source(open-source)
        },
      )
    },
  )
]
