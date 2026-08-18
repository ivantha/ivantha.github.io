#import "../../common/loaders.typ": *
#import "renderers.typ": *

// The ATS variant renders the CASUAL CV's content through a machine-readable
// renderer. Data selection therefore uses "casual" on purpose, and this is the
// load-bearing line in the file — read the reasoning before changing it.
//
// `load-yaml-list` filters with `default: (variant,)`, so an entry carrying any
// `include_in` is excluded unless the variant is named in it. Across data/ the
// census is 45 x [academic], 33 x [academic, casual], 4 x [casual]. A literal
// "ats" here would therefore select ZERO entries from experience, education,
// projects, publications, awards and open-source — an empty document that still
// compiles. Making "ats" work as a filter string would mean retagging 82 YAML
// entries, widening the z.enum in src/content.config.ts, and extending the
// two-member Variant union in src/lib/variants.ts, with every future entry
// needing to remember a third tag.
//
// Inheriting "casual" instead means this document tracks the industry CV
// permanently: retag one entry for casual and it appears here too, with no
// second decision to keep in sync. The ATS identity lives entirely in
// renderers.typ, which is where a change belongs.
#let variant = "casual"

#let personal     = yaml("/data/personal.yaml")
#let education    = load-yaml-list("/data/education.yaml", variant)
#let skills       = yaml("/data/skills.yaml")
#let projects     = load-yaml-list("/data/projects.yaml", variant)
#let experience   = load-yaml-list("/data/experience.yaml", variant)
// awards.yaml and publications.yaml wrap their lists in a mapping key, so the
// filter is inlined here rather than going through load-yaml-list — same shape
// the other two variants use.
#let awards-doc   = yaml("/data/awards.yaml")
#let awards       = awards-doc.entries.filter(e => variant in e.at("include_in", default: (variant,)))
#let pubs-doc     = yaml("/data/publications.yaml")
#let publications = pubs-doc.items.filter(p => variant in p.at("include_in", default: (variant,)))
#let open-source  = yaml("/data/open-source.yaml").filter(o => variant in o.at("include_in", default: (variant,)))

#set document(
  title: personal.first_name + " " + personal.last_name + " — CV",
  author: personal.first_name + " " + personal.last_name,
)

// No page fill. The footer is the one piece of page furniture here, and it is
// permitted only because it is TESTED: the casual variant's footer prints
// "1 / 2" flush against the top of the next page's first heading and extracts
// as the single token "2PROJECTS", so scripts/check-ats.py asserts this one is
// glued to nothing on either side. See render-footer in renderers.typ.
//
// Margins stay at 18mm horizontally, which puts a full line at ~100 characters —
// past the 45-75 range that reads comfortably, and the one typographic defect
// this document keeps. Widening them is the obvious fix and it costs pages:
// every millimetre forces wraps, and the three-page budget is hard. The three
// pages win. If that budget is ever relaxed, this is the first thing to spend
// it on.
//
// The vertical 15mm is 1mm tighter than the horizontal rhythm would suggest,
// and it is not a design choice: it is the last 17pt (2mm x 3 pages) needed to
// pull the Interests section back off a fourth page. Restoring 16mm means
// finding 17pt in the ladder in renderers.typ first.
#set page(
  paper: "a4",
  margin: (x: 18mm, y: 15mm),
  footer: render-footer(personal),
)

// kerning: false is the load-bearing setting in this file after `variant`, and
// it is set on measurement, not taste. Typst emits OpenType kern pairs as TJ
// offsets of 4-30 milli-em between glyph clusters; pdfminer-family extractors
// read any offset past a threshold as a word break, so IBM Plex Sans's dense
// kern tables shred every word ("r esear cher"). Linux Libertine, which the
// academic variant uses, has no such tables and extracts clean at any size —
// which is what proves this is the fonts kerning and not the layout. Setting
// it at 10.5pt was measured first and did NOT help (0/12 phrases intact), so
// size was not the cause. Verify with scripts/check-ats.py after any change.
//
// hyphenate: false so no word is ever broken across a line by a soft hyphen —
// a parser cannot tell that apart from a real one.
#set text(font: body-font, size: fs-body, fill: ink, hyphenate: false, kerning: false)

// lead-body, not a literal: it is one rung of the spacing ladder documented in
// renderers.typ, and setting it here independently is how that ladder stopped
// being monotone in the first place.
#set par(justify: false, leading: lead-body, spacing: sp-item)

// Deliberately no `show link` rule and no link() calls anywhere: every URL in
// this document is plain text. See display-url in renderers.typ.

#render-header(personal)
#make-summary(personal)
#make-experience(experience, variant)
#make-education(education, variant)
#make-skills(skills)
#make-projects(projects, variant)
#make-publications(publications, variant)
#make-awards(awards, variant)
#make-open-source(open-source, variant)
#make-interests(personal)
