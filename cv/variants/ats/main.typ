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

// No page fill, no footer, no page numbers. The casual variant's footer prints
// "1 / 2" flush against the top of the next page's first heading, which
// extracts as the single token "2PROJECTS".
#set page(paper: "a4", margin: (x: 18mm, y: 16mm))

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
#set text(font: body-font, size: fs-body, fill: black, hyphenate: false, kerning: false)
// Loose enough that a wrapped bullet line reads as continuation rather than as
// the next bullet. This is the one concession to human legibility in the file:
// a recruiter does sometimes glance at the machine copy, and the document flows
// freely, so vertical space costs nothing but page count.
#set par(justify: false, leading: 0.7em, spacing: 0.7em)

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
