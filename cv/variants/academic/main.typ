#import "../../common/loaders.typ": *
#import "renderers.typ": *

#let variant = "academic"
#let personal  = yaml("/data/personal.yaml")
#let education      = load-yaml-list("/data/education.yaml", variant)
#let certifications = load-yaml-list("/data/certifications.yaml", variant)
#let awards-doc     = yaml("/data/awards.yaml")
#let awards         = awards-doc.entries.filter(e => variant in e.at("include_in", default: (variant,)))
#let projects       = load-yaml-list("/data/projects.yaml", variant)
#let experience     = load-yaml-list("/data/experience.yaml", variant)
#let prof-exp       = experience.filter(e => e.category == "professional")
#let research-exp   = experience.filter(e => e.category == "research")
#let pubs-doc       = yaml("/data/publications.yaml")
#let pubs-items     = pubs-doc.items.filter(p => variant in p.at("include_in", default: (variant,)))
#let preprints      = yaml("/data/preprints.yaml")
#let under-review   = yaml("/data/under-review.yaml")
#let scholarships   = yaml("/data/scholarships.yaml")
#let talks          = yaml("/data/talks.yaml")
#let workshops      = yaml("/data/workshops.yaml")
#let mentoring      = yaml("/data/mentoring.yaml")
#let open-source    = yaml("/data/open-source.yaml")
#let skills         = yaml("/data/skills.yaml")
#let volunteering   = yaml("/data/volunteering.yaml")

#set page(paper: "a4", margin: (top: 0.55in, bottom: 0.55in, x: 0.65in), fill: c-bg)
#set text(
  size: 10.5pt,
  font: "Linux Libertine",
  fill: c-text,
  number-type: "old-style",
)
#set par(first-line-indent: 0pt, leading: 0.55em, spacing: 0.45em)
#show link: set text(fill: c-link)

#render-header(personal)

#r-section("Research Interests")[
  #personal.interests_academic
]

#r-section("Education")[
  #render-education(education)
]

#r-section("Publications")[
  #render-publications(pubs-items, pubs-doc.equal_contribution_note)
]

// Both lists render straight from data/ with no `include_in` filter, so either
// can empty out. `r-section` always draws its header and rule, so guard here —
// an empty list would otherwise strand a bare heading over blank space.
#if under-review.len() > 0 {
  r-section("Under Review")[
    #render-preprints(under-review)
  ]
}

#if preprints.len() > 0 {
  r-section("Preprints")[
    #render-preprints(preprints)
  ]
}

#r-section("Professional Experience")[
  #render-experience(prof-exp)
]

#r-section("Research Experience")[
  #render-experience(research-exp)
]

#r-section("Scholarships & Grants")[
  #render-scholarships(scholarships)
]

#r-section("Honours & Awards")[
  #render-awards(awards, awards-doc.awards_notes_academic)
]

#r-section("Poster presentations")[
  #render-talks(talks, "poster")
]

#r-section("Oral presentations")[
  #render-talks(talks, "oral")
]

#r-section("Invited talks")[
  #render-talks(talks, "invited")
]

#r-section("Workshops Attended")[
  #render-string-list(workshops)
]

#r-section("Selected Projects")[
  #render-projects(projects)
]

#r-section("Technical Skills")[
  #render-skills(skills)
]

#r-section("Certifications")[
  #render-certifications(certifications)
]

#r-section("Mentoring")[
  #render-string-list(mentoring)
]

#r-section("Open Source Contributions")[
  #render-open-source(open-source)
]

#r-section("Volunteering & Committee Positions")[
  #render-string-list(volunteering)
]
