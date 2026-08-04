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
#let pubs-doc       = yaml("/data/publications.yaml")
#let publications   = pubs-doc.items.filter(p => variant in p.at("include_in", default: (variant,)))
#let open-source    = yaml("/data/open-source.yaml").filter(o => variant in o.at("include_in", default: (variant,)))

#set document(
  title: personal.first_name + " " + personal.last_name + " — CV",
  author: personal.first_name + " " + personal.last_name,
)

// Real margins, unlike the previous revision's edge-to-edge panels: the dark
// ground still bleeds to the paper edge, but the text block is inset properly.
#set page(
  paper: "a4",
  margin: (x: 15mm, top: 14mm, bottom: 11mm),
  fill: ground,
  footer: page-number,
  footer-descent: 5mm,
)
#set text(font: sans, size: fs-body, fill: body, weight: 400, hyphenate: false)
#set par(justify: false, leading: 0.6em)
// Deliberate no-op: links carry no inherited styling. Affordance is explicit —
// renderers colour them, and `ext-link` rules them.
#show link: it => it

// -------- Page 1: identity + the whole of experience --------
#render-header(personal)

#v(10pt)
#render-profile(personal)

#make-experience(experience)

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
  margin: (x: 15mm, top: 14mm, bottom: 20mm),
  footer-descent: 3mm,
  footer: render-personal-footer(personal, trailing: page-number-text),
)

// -------- Page 2: everything else, two columns --------
// Column split is a balance decision, not a semantic one: projects and
// publications are the two tallest sections, so they get a column to
// themselves and everything else stacks opposite.
#[
  #set par(leading: col-leading)
  #grid(
    columns: (1fr, 1fr),
    column-gutter: 9mm,
    align: (left + top, left + top),
    {
      make-education(education)
      v(sp-section, weak: true)
      make-skills(skills)
      v(sp-section, weak: true)
      make-certifications(certifications)
      v(sp-section, weak: true)
      make-achievements(achievements)
      v(sp-section, weak: true)
      make-open-source(open-source)
    },
    {
      make-projects(projects)
      v(sp-section, weak: true)
      make-publications(publications)
    },
  )
]
