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
// Reserve a little vertical real estate at the very top + bottom for the
// editor-tab title bar and status bar; everything else stays edge-to-edge.
#set page(
  paper: "a4",
  margin: (top: 6mm, bottom: 6mm, left: 0cm, right: 0cm),
  fill: dark-blue,
  header: title-bar,
  header-ascent: 1mm,
  footer: status-bar,
  footer-descent: 1mm,
)
#set text(font: "Roboto Mono", size: body-size, fill: dove-white, hyphenate: false)
#set par(justify: false, leading: 0.62em)
#show link: it => it

// -------- Page 1 --------
#grid(
  columns: (34%, 66%),
  rows: 1fr,
  block(
    width: 100%,
    height: 100%,
    fill: panel-bg,
    inset: (x: 0.05 * 210mm, y: 6mm),
  )[
    #render-sidebar(personal)
  ],
  block(
    width: 100%,
    height: 100%,
    inset: (x: 8mm, y: 6mm),
  )[
    #render-main-header(personal)
    #v(sp-header-below)
    #make-experience(experience)
  ],
)

#pagebreak()

// -------- Page 2 --------
#grid(
  columns: (50%, 50%),
  rows: 1fr,
  block(
    width: 100%,
    height: 100%,
    inset: (x: 8mm, y: 6mm),
  )[
    #make-education(education)
    #v(sp-section, weak: true)
    #make-skills(skills)
    #v(sp-section, weak: true)
    #make-certifications(certifications)
    #v(sp-section, weak: true)
    #make-achievements(achievements)
    #v(sp-section, weak: true)
    #make-open-source(open-source)
  ],
  block(
    width: 100%,
    height: 100%,
    inset: (x: 8mm, y: 6mm),
  )[
    #make-projects(projects)
    #v(sp-section, weak: true)
    #make-publications(publications)
  ],
)
