// Renderers for the ATS variant.
//
// Design rule for this file, and the only one that matters: EVERY DECISION IS
// MADE FOR A PARSER, NOT A READER. Where the casual variant reaches for a grid,
// an icon, a rule, or a colour, this one emits a plain line of text in reading
// order. Nothing here should be copied back into the casual renderers, and
// nothing from those renderers should be copied here without asking what it
// does to the extracted text layer.
//
// The specific defects this file exists to avoid, all measured on the shipped
// casual-cv.pdf with pypdf (see scripts/check-ats.py):
//
//   - multi-column grids, which extractors serialise in unpredictable order
//   - Font Awesome glyphs, which land in the text layer as U+F0xx private-use
//     codepoints fused to the label beside them ("@_ivanthaivantha.com")
//   - link() annotations carrying the real URL while the text says "in/ivantha"
//   - #super[th], which renders as a separate text run and fragments "6th"
//   - a page footer, which collides with the next heading ("1 / 2PROJECTS")
//   - letter-spacing (tracking), which shreds a word into single glyphs

#import "../../common/loaders.typ": *

// ---- Type -------------------------------------------------------------------
//
// One family, three sizes, no colour. The body size is larger than the casual
// variant's 8pt because page count carries no penalty here — NOT because size
// caused the extraction failure. That was measured: at 10.5pt with kerning
// still on, scripts/check-ats.py reported 0/12 phrases intact, no better than
// the 8pt casual CV. The fix was `kerning: false` in main.typ; see the note
// there before changing either setting.

#let body-font = "IBM Plex Sans"
#let fs-name = 18pt
#let fs-head = 11pt
#let fs-body = 10.5pt

// ---- Text normalisation -----------------------------------------------------

// Strip embedded Typst markup rather than evaluating it.
//
// The casual and academic variants both eval these strings (`render-md` / `md`)
// so that "6#super[th]" sets a real superscript. That is exactly what we cannot
// have: a superscript is a separate text run at a different baseline, and
// extraction splits the word around it. Ten `place_*` values in awards.yaml and
// two education extras carry #super; awards and education also carry _italic_
// markers. Both are stripped to their inner text.
//
// The italic pattern is deliberately paired (`_([^_]+)_`) rather than a blanket
// underscore strip — a bare "_" is legitimate inside a URL such as
// twitter.com/_ivantha, and this helper must never be reached for by one.
#let plain(s) = {
  if s == none { return "" }
  str(s)
    .replace(regex("#super\[([^\]]*)\]"), m => m.captures.at(0))
    .replace(regex("_([^_]+)_"), m => m.captures.at(0))
    .trim()
}

// Date ranges as plain hyphens. The data already uses " - "; the casual variant
// converts that to an en dash on the way in (`dash-dates`) and this one simply
// does not, but normalise anyway so a future en dash in the YAML cannot leak.
#let dates-of(s) = plain(s).replace("–", "-").replace("—", "-")

// "https://www.linkedin.com/in/ivantha/" -> "linkedin.com/in/ivantha"
//
// The casual variant shows the label "in/ivantha" and hides the real URL in a
// PDF link annotation. Most parsers read the text layer and never look at
// /Annots, so the URL has to BE the text.
#let display-url(u) = {
  let s = str(u).replace("https://", "").replace("http://", "").replace("www.", "")
  if s.ends-with("/") { s = s.slice(0, -1) }
  s
}

#let split-list(s, sep) = {
  if s == none { return () }
  str(s).split(sep).map(p => p.trim()).filter(p => p != "")
}

// ---- Blocks -----------------------------------------------------------------

#let sec(title) = block(above: 12pt, below: 5pt,
  text(size: fs-head, weight: 700, upper(title)))

// The marker is a literal character in the same text run as the body, not a
// list marker and not a grid column, so it extracts as "\u{2022} Built an
// LLM-backed platform...". Note that writing "- " here instead would NOT be
// literal: Typst reads a leading hyphen as list syntax and builds a real list,
// which is a different construct than this file wants to be reasoning about.
// above > below on purpose: Typst collapses adjacent block spacing to the max of
// the two, so a bullet's own 2pt `below` binds it to the "Technologies:" line
// that follows it, while the next bullet's 5pt `above` opens the larger gap
// between bullet groups. Zeroing `below` here instead makes the tech line
// collide with the bullet's last wrapped line.
#let bullet(body) = block(width: 100%, above: 5pt, below: 2pt, inset: (left: 4mm), {
  set par(hanging-indent: 3.2mm)
  [\u{2022} #body]
})

#let line-of(s) = block(above: 0pt, below: 2pt, text(size: fs-body, s))

#let tech-line(items) = if items.len() > 0 {
  block(above: 0pt, below: 2pt, text(size: fs-body, "Technologies: " + items.join(", ")))
}

// ---- Header -----------------------------------------------------------------

#let profile-label = (
  linkedin: "LinkedIn",
  github: "GitHub",
  twitter: "Twitter",
  scholar: "Google Scholar",
  kaggle: "Kaggle",
  medium: "Medium",
)

#let render-header(personal) = {
  block(below: 3pt, text(size: fs-name, weight: 700,
    personal.first_name + " " + personal.last_name))

  // `tagline_casual` ("Lead Machine Learning Engineer") rather than the two-item
  // `roles_casual` run the casual header sets. A single spelled-out job title is
  // what a title matcher compares against; "ML Engineer / Data Scientist" reads
  // as one hyphenated title to a parser, and the abbreviation misses the phrase
  // "Machine Learning" entirely.
  block(below: 8pt, text(size: fs-body, personal.tagline_casual))

  // One labelled line each. Parentheses around a country code defeat some phone
  // normalisers, so "(+94) 71..." becomes "+94 71...".
  let rows = (
    ("Email", personal.emails.at(0).address),
    ("Phone", personal.phone.replace("(", "").replace(")", "").trim()),
    ("Location", personal.location),
    ("Website", display-url(personal.homepage.url)),
  )
  for slug in personal.profiles_casual.filter(s => s != "homepage") {
    rows.push((
      profile-label.at(slug, default: upper(slug.first()) + slug.slice(1)),
      display-url(personal.profile_entries.at(slug).url),
    ))
  }
  for (label, value) in rows {
    block(above: 0pt, below: 1.5pt, text(size: fs-body, label + ": " + value))
  }
}

// ---- Sections ---------------------------------------------------------------

#let make-summary(personal) = {
  sec("Summary")
  block(text(size: fs-body, plain(personal.about_me)))
}

// One section, not the professional/research split the other two variants use.
// ATS that compute total years of experience typically sum a single Experience
// block; splitting hands them roughly half the span. experience.yaml is already
// globally descending by start date, so passing the unsplit list preserves
// chronology without a re-sort.
#let make-experience(items, variant) = {
  sec("Experience")
  for (i, e) in items.enumerate() {
    let company = plain(field(e, "company", variant))
    let location = plain(field(e, "location", variant))

    block(above: if i == 0 { 0pt } else { 10pt }, below: 0pt, {
      // Role, then employer, then dates — three lines, title first. The casual
      // variant puts a 30mm date rail to the LEFT of the title, which serialises
      // as two lines of metadata before the job it belongs to, and fuses under
      // some extractors ("1 yr 10 mosSenior Data Science Engineer / WSO2").
      block(below: 1.5pt, text(size: fs-body, weight: 700, plain(field(e, "role", variant))))
      block(below: 1.5pt, text(size: fs-body,
        if location != "" { company + ", " + location } else { company }))
      block(below: 4pt, text(size: fs-body, dates-of(e.dates)))
    })

    for b in bullets-for(e, variant) {
      bullet(text(size: fs-body, plain(field(b, "text", variant))))
      let stack = split-list(field(b, "stack", variant), ",")
      if stack.len() > 0 {
        block(inset: (left: 4mm), above: 0pt, below: 0pt,
          text(size: fs-body, "Technologies: " + stack.join(", ")))
      }
    }
  }
}

#let make-education(items, variant) = {
  sec("Education")
  for (i, e) in items.enumerate() {
    block(above: if i == 0 { 0pt } else { 8pt }, below: 0pt, {
      block(below: 1.5pt, text(size: fs-body, weight: 700, plain(field(e, "degree", variant))))
      block(below: 1.5pt, text(size: fs-body, e.institute))
      block(below: 3pt, text(size: fs-body, dates-of(field(e, "dates", variant))))
    })
    let extras = field(e, "extras", variant)
    if extras != none {
      for x in extras { bullet(text(size: fs-body, plain(x))) }
    }
  }
}

#let make-skills(items) = {
  sec("Skills")
  for s in items {
    // Bare `category`, NOT category_casual. The casual CV abbreviates four of
    // these to "ML / DL", "RL", "MLOps" and "IaC" so they fit its right-aligned
    // label gutter. "Reinforcement Learning" and "Infrastructure as Code" are
    // the strings a keyword matcher is actually looking for, and here there is
    // no gutter to fit.
    line-of(s.category + ": " + s.stack)
  }
}

#let make-projects(items, variant) = {
  sec("Projects")
  for (i, p) in items.enumerate() {
    block(above: if i == 0 { 0pt } else { 8pt }, below: 1.5pt,
      text(size: fs-body, weight: 700, plain(field(p, "name", variant))))
    tech-line(split-list(field(p, "stack", variant), "|"))
    block(above: 0pt, below: 0pt, text(size: fs-body, plain(field(p, "description", variant))))
  }
}

#let make-publications(items, variant) = {
  sec("Publications")
  for p in items {
    block(above: 0pt, below: 4pt, text(size: fs-body,
      plain(field(p, "title", variant)) + ". "
        + plain(field(p, "venue", variant)) + ", " + str(p.year) + "."))
  }
}

#let make-awards(items, variant) = {
  sec("Awards")
  for a in items {
    let event = plain(field(a, "event", variant))
    let place = plain(field(a, "place", variant))
    line-of(
      (if place != "" { event + " (" + place + ")" } else { event })
        + ", " + str(a.year),
    )
  }
}

#let make-open-source(items, variant) = {
  sec("Open Source")
  for (i, o) in items.enumerate() {
    block(above: if i == 0 { 0pt } else { 8pt }, below: 1.5pt,
      text(size: fs-body, weight: 700, plain(field(o, "name", variant))))
    tech-line(split-list(field(o, "stack", variant), ","))
    block(above: 0pt, below: 0pt, text(size: fs-body, plain(field(o, "description", variant))))
  }
}

#let make-interests(personal) = {
  sec("Interests")
  line-of("Professional: " + personal.interests_casual)
  line-of("Personal: " + personal.who_am_i.join(", "))
}
