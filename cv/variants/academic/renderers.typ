#import "@preview/fontawesome:0.5.0": *
#import "../../common/loaders.typ": *

// Colors and symbols.
#let c-bg    = white
#let c-text  = rgb("#2b2b2b")
#let c-muted = rgb("#5a5a5a")
#let c-link  = rgb("#1f3a68")
#let c-icon  = rgb("#2b2b2b")
#let dia     = sym.diamond.stroked

// Convert ASCII hyphens used as date separators to en-dashes.
// YAML data has strings like "Jan. 2023 - 2026"; we want "Jan. 2023 – 2026".
#let endash(s) = s.replace(" - ", " – ")

// Strip the protocol prefix from a URL for display-as-text. The full URL
// is still used as the link target; only the visible label is shortened.
#let display-url(u) = u.replace("https://", "").replace("http://", "")

// Section with a hairline rule and left-indented body. Headings use small
// caps with subtle tracking for a refined, classical academic feel rather
// than bold uppercase.
#let r-section(title, body) = {
  v(0.55em)
  text(
    fill: c-text,
    weight: "medium",
    tracking: 0.08em,
    smallcaps(title),
  )
  v(0.18em)
  line(length: 100%, stroke: 0.3pt + c-text)
  v(0.22em)
  pad(left: 1.25em, body)
}

// Title on the left, date on the right, same line.
#let tdline(a, b) = box(width: 100%)[#a#h(1fr)#b]

// Slug → FontAwesome icon function. Wrapped in `text(fill: c-icon, ...)` so
// brand-colored glyphs (Kaggle teal, Medium green, etc.) render in the
// muted academic text color instead.
#let profile-icon(slug) = {
  let glyph = if slug == "scholar" { fa-graduation-cap() }
    else if slug == "github"   { fa-github() }
    else if slug == "kaggle"   { fa-kaggle() }
    else if slug == "medium"   { fa-medium() }
    else if slug == "linkedin" { fa-linkedin() }
    else if slug == "twitter"  { fa-twitter() }
    else if slug == "homepage" { fa-globe() }
    else if slug == "email"    { fa-envelope() }
    else { none }
  text(fill: c-icon)[#glyph]
}

// Evaluate YAML-embedded Typst markup (e.g. `#super[th]`, `_"..."_`).
// YAML strings come from our own data/ directory, so this is safe.
#let md(s) = eval(s, mode: "markup")

// Render education entries: strong institute, right-aligned dates, degree
// line, then any extras as trailing lines. Prefix tags like "[Reading]" are
// rendered as muted small-caps tags rather than bracketed italic text.
#let render-education(items) = {
  for (i, e) in items.enumerate() [
    #if i > 0 { v(0.45em) }
    #let prefix-raw = e.at("institute_academic_prefix", default: none)
    #let prefix = if prefix-raw != none {
      let s = prefix-raw.replace("[", "").replace("]", "").trim()
      text(size: 0.85em, fill: c-muted, tracking: 0.06em, smallcaps(s))
    }
    #let title = if prefix != none {
      [#prefix #h(0.3em) #strong(e.institute)]
    } else {
      strong(e.institute)
    }
    #tdline(title, text(fill: c-muted, emph(endash(e.dates)))) \
    #e.at("degree_academic", default: "")
    #for line in e.at("extras_academic", default: ()) [
      \ #md(line)
    ]
  ]
}

// Academic certifications as a numbered enum: "name by institute, year".
#let render-certifications(items) = {
  enum(
    numbering: "[1]",
    tight: true,
    body-indent: 0.6em,
    ..items.map(c => [#md(c.name) by #c.institute, #str(c.year)]),
  )
}

// Academic awards: numbered enum where each entry can carry a footnote marker
// (rendered as a superscript before the line) and an organizer suffix. Notes
// (marker → meaning) are printed below the enum.
#let render-awards(items, notes) = {
  enum(
    numbering: "[1]",
    tight: true,
    body-indent: 0.6em,
    ..items.map(a => {
      let marker = a.at("marker", default: none)
      let place = a.at("place_academic", default: none)
      let event = md(a.event)
      let organizer = a.at("organizer", default: none)
      let pieces = ()
      if marker != none { pieces.push(super(marker)) }
      if place != none and place != "" {
        pieces.push(md(place))
        pieces.push([ at #event])
      } else {
        pieces.push(event)
      }
      if organizer != none {
        pieces.push([ by #organizer])
      }
      pieces.push([, #str(a.year)])
      pieces.join([])
    }),
  )
  if notes.len() > 0 {
    v(0.4em)
    for n in notes [
      #super(n.marker) #n.text \
    ]
  }
}

// Academic projects: bold name / italic stack / optional source URL on its
// own line (rendered as visible text, protocol stripped, in link color) /
// long description paragraph.
#let render-projects(items) = {
  for (i, p) in items.enumerate() [
    #if i > 0 { v(0.45em) }
    #let repo = p.at("url", default: none)
    *#field(p, "name", "academic")* \
    _#field(p, "stack", "academic")_ \
    #if repo != none [#link(repo)[#display-url(repo)] \ ]
    #field(p, "description", "academic")
  ]
}

// Academic experience: one entry = tdline(role + employment_type, dates) +
// tdline(company italic, location); optional "· Advised by <advisor>" line;
// optional compact bullet list with each bullet's stack rendered as a small
// muted-italic subline. Bullets come from the same `bullets` field used by
// the casual variant.
#let render-experience(items) = {
  for (i, e) in items.enumerate() [
    #if i > 0 { v(0.45em) }
    #let role = field(e, "role", "academic")
    #let emp = e.at("employment_type", default: none)
    #let role-str = if emp != none [*#role (#emp)*] else [*#role*]
    #tdline(role-str, text(fill: c-muted, emph(endash(e.dates)))) \
    #tdline(
      emph(field(e, "company", "academic")),
      text(fill: c-muted, field(e, "location", "academic")),
    )
    #let adv = e.at("advisor", default: none)
    #if adv != none [\ · Advised by #adv]
    #let bullets = bullets-for(e, "academic")
    #if bullets.len() > 0 [
      #v(0.15em)
      #list(
        marker: text(fill: c-muted)[–],
        indent: 0.4em,
        body-indent: 0.45em,
        spacing: 0.55em,
        ..bullets.map(b => {
          let txt = field(b, "text", "academic")
          let stack = field(b, "stack", "academic")
          if stack != none {
            [#txt \ #text(size: 0.88em, style: "italic", fill: c-muted, stack)]
          } else {
            [#txt]
          }
        }),
      )
    ]
  ]
}

// Author list → inline content with `**self**` bolded and a superscript "*"
// appended when `equal_contribution` is true.
#let render-authors(authors) = {
  let parts = authors.map(a => {
    let name = if a.at("self", default: false) { strong(a.name) } else { [#a.name] }
    if a.at("equal_contribution", default: false) {
      [#name#super[\*]]
    } else {
      name
    }
  })
  parts.join(", ")
}

// Publications as a numbered enum: bracketed venue_type, authors, title,
// venue, and a linked DOI suffix.
#let render-publications(items, notes) = {
  enum(
    numbering: "[1]",
    tight: true,
    body-indent: 0.6em,
    ..items.map(p => [
      *\[#p.venue_type\]* #render-authors(p.authors), "#p.title," in #p.venue, #link(p.doi_url)[\[#p.doi_label\]].
    ]),
  )
  if notes != none and notes != "" {
    v(0.4em)
    [#super[\*] #notes]
  }
}

// Preprints: same author formatting, optional venue annotation, no DOI.
#let render-preprints(items) = {
  enum(
    numbering: "[1]",
    tight: true,
    body-indent: 0.6em,
    ..items.map(p => {
      let venue = p.at("venue", default: none)
      if venue != none [
        #render-authors(p.authors), "#p.title", #venue.
      ] else [
        #render-authors(p.authors), "#p.title".
      ]
    }),
  )
}

// Scholarships: numbered enum with "text, year" and optional footnote.
#let render-scholarships(items) = {
  enum(
    numbering: "[1]",
    tight: true,
    body-indent: 0.6em,
    ..items.map(s => {
      let base = [#s.text, #str(s.year)]
      let fn = s.at("footnote", default: none)
      if fn != none [#base#footnote[#fn]] else [#base]
    }),
  )
}

// Talks bucketed by type. `type` controls which bucket each entry lives in.
#let render-talks(items, type-key) = {
  let filtered = items.filter(t => t.type == type-key)
  enum(
    numbering: "[1]",
    tight: true,
    body-indent: 0.6em,
    ..filtered.map(t => {
      let date-str = if type(t.date) == int { str(t.date) } else { t.date }
      [#t.title, #t.venue, #t.location, #date-str]
    }),
  )
}

// Technical skills: one line per category. Category in bold, stack inline.
// Reads as text-dense prose, in keeping with the rest of the academic CV.
#let render-skills(items) = {
  for (i, s) in items.enumerate() [
    #if i > 0 [\ ]
    *#s.category:* #s.stack
  ]
}

// Simple string-list renderer (workshops, mentoring, volunteering).
#let render-string-list(items) = {
  enum(
    numbering: "[1]",
    tight: true,
    body-indent: 0.6em,
    ..items.map(s => md(s)),
  )
}

// Open-source contributions: bold linked title, italic stack, description
// paragraph with [label] placeholders replaced by #link(url)[label].
#let render-open-source(items) = {
  for (i, o) in items.enumerate() [
    #if i > 0 { v(0.45em) }
    *#link(o.name_url)[#o.name]* \
    _#o.stack _ \
    #{
      let desc = o.description
      let links = o.links
      let parts = ()
      let rest = desc
      while rest.contains("[") {
        let start = rest.position("[")
        let end = rest.position("]")
        if start == none or end == none { break }
        parts.push(rest.slice(0, start))
        let label = rest.slice(start + 1, end)
        if label in links {
          parts.push(link(links.at(label))[#label])
        } else {
          parts.push(label)
        }
        rest = rest.slice(end + 1)
      }
      parts.push(rest)
      parts.join("")
    }
  ]
}

// Render the academic header: name in small caps, single tagline line, and
// two centered contact lines (emails; then homepage + profiles). Drops the
// Email/Website/Other label column for a cleaner look.
#let render-header(personal) = {
  // Name: small caps with tracking. Reads as elegant rather than shouting.
  align(center, text(
    size: 18pt,
    weight: "medium",
    tracking: 0.12em,
    smallcaps(personal.first_name + " " + personal.last_name),
  ))
  v(0.35em)
  // Single tagline: "<role> · <field>".
  align(center, text(fill: c-muted)[
    #personal.tagline_academic_role #h(0.3em)·#h(0.3em) #personal.tagline_academic_field
  ])
  v(0.35em)
  line(length: 100%, stroke: 0.3pt + c-text)
  v(0.3em)

  // Email line: each entry as "icon address", joined by middots.
  let email-line = {
    let entries = personal.emails.map(e => [
      #profile-icon("email")~#link("mailto:" + e.address)[#e.address]
    ])
    entries.join([ #h(0.5em)·#h(0.5em) ])
  }

  // Profile line: homepage first, then social profiles. Each as "icon label".
  let profile-line = {
    let entries = ([
      #profile-icon("homepage")~#link(personal.homepage.url)[#personal.homepage.label]
    ],)
    for slug in personal.profiles_academic {
      let p = personal.profile_entries.at(slug)
      let lbl = p.at("label_academic", default: p.label)
      entries.push([#profile-icon(slug)~#link(p.url)[#lbl]])
    }
    entries.join([ #h(0.5em)·#h(0.5em) ])
  }

  align(center, email-line)
  v(0.15em)
  align(center, profile-line)
}
