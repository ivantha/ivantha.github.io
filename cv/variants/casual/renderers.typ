#import "@preview/fontawesome:0.5.0": *
#import "../../common/loaders.typ": *

// =============================================================================
// Casual CV — "terminal refined".
//
// Dark, but not a screenshot of an editor. The previous revision of this file
// drew fake window chrome (traffic lights, a tab bar, an `ln 1, col 1` status
// bar) and set every word in Roboto Mono across five syntax-highlight hues.
// That reads as a costume, and it fights content that already establishes the
// same thing on its own.
//
// The rules this theme holds to:
//   * Proportional type (IBM Plex Sans) for anything that is a sentence.
//     Monospace (JetBrains Mono) only for things that really are tokens —
//     dates, stacks, skill values, labels, identifiers.
//   * ONE accent hue. `signal` marks employers, section labels and links, and
//     nothing else. Hierarchy is carried by size, weight and space.
//   * No page furniture that isn't load-bearing. A page number is; a fake
//     status bar isn't.
// =============================================================================

// ----- Palette ---------------------------------------------------------------
// Ratios are contrast against `ground`.

#let ground = rgb(16, 17, 21)     // near-neutral black; the old blue-grey read
                                  // as "theme" rather than as a ground
#let raised = rgb(23, 25, 30)     // the one lifted surface (profile panel)
#let bright = rgb(238, 239, 242)  // 15.6:1 — name, entry titles
#let body   = rgb(176, 181, 191)  //  8.4:1 — prose
#let mute   = rgb(118, 125, 138)  //  4.6:1 — metadata, stacks, markers
#let signal = rgb(126, 226, 152)  // 11.3:1 — the only accent
#let hair   = rgb(48, 52, 61)     // rules and separators; never carries text

// ----- Type ------------------------------------------------------------------

#let sans = "IBM Plex Sans"
#let mono = "JetBrains Mono"

#let body-size  = 8.4pt   // main-column prose
#let col-size   = 7.6pt   // page-2 two-column prose — narrower measure
#let token-size = 6.6pt   // mono metadata: dates, stacks, locations
#let head-size  = 6.6pt   // section labels
#let name-size  = 26pt

// ----- Spacing ---------------------------------------------------------------
// RHYTHM RULE (inherited from the previous theme, still true): the gap between
// entries must clearly exceed the leading within one, or entries merge into a
// wall. The stack line is the trap — it belongs to the bullet ABOVE it, so its
// `above` spacing must stay well under the inter-bullet gap.

#let sp-stack-above = 2.8pt
#let sp-bullet      = 6pt
#let sp-job         = 7pt
#let sp-entry       = 4.4pt
#let sp-entry-tight = 3.8pt   // single-line entries (certs, achievements)
#let sp-head-above  = 8pt
#let sp-head-below  = 5pt
#let sp-section     = 8pt
#let sp-skill       = 4pt     // between skill rows; the hanging indent already
                              // binds a wrapped row, so this can sit under
                              // sp-entry without the rows merging
// Page-2 columns run on a tighter leading than page 1: the measure is half as
// wide, so lines are short and need less vertical separation to stay legible.
#let col-leading    = 0.56em

// Left metadata gutter on page 1. Sized so "Nov 2021 – Aug 2023" sets on one
// line at token-size: 19 glyphs x 0.6em advance x 6.9pt ≈ 27.7mm.
#let gutter = 30mm

// ----- Helpers ---------------------------------------------------------------

// En-dash rather than the old ASCII "->": JetBrains Mono has U+2013, so this no
// longer risks a serif fallback glyph, and a range is not an arrow.
#let dash-dates(s) = s.replace(" - ", " – ").replace(" -- ", " – ")

// Evaluate Typst markup embedded in YAML (e.g. `#super[th]`). This is markup
// eval, not code eval, and every string originates in our own data/ dir.
#let render-md(s) = eval(s, mode: "markup")

#let split-on(s, sep) = if s == none { () } else {
  s.split(sep).map(p => p.trim()).filter(p => p.len() > 0)
}

// A dotted token run: "FastAPI · Python · React". `sep` is tightenable for runs
// that must hold one line — at 0.6em per glyph a wide separator costs real
// millimetres, and a wrapped run in the page footer overflows the page.
#let tokens(items, size: token-size, fill: mute, sep: "  ·  ") = {
  if items.len() == 0 { return }
  text(font: mono, size: size, fill: fill, items.join(sep))
}

// Links get an explicit rule; the page-level `show link` rule is a no-op, so
// without this a DOI-linked title is indistinguishable from an unlinked one.
#let ext-link(url, body) = link(url, underline(
  body,
  stroke: 0.4pt + hair,
  offset: 1.6pt,
  evade: true,
))

// ----- Section headers -------------------------------------------------------
// One label typography throughout. Only the position varies: page 1 hangs the
// label in the metadata gutter, page 2's narrow columns can't spare 30mm so it
// sits inline. Absolute sizes, so a header never inherits the caller's size.

#let head-label(title) = text(
  font: mono, size: head-size, weight: 700,
  fill: signal, tracking: 0.12em, upper(title),
)

#let cv-section(title) = {
  v(sp-head-above, weak: true)
  block(width: 100%, breakable: false, grid(
    columns: (gutter, 1fr),
    column-gutter: 5mm,
    align: (right + horizon, left + horizon),
    head-label(title),
    box(width: 100%, height: 0.5pt, fill: hair),
  ))
  v(sp-head-below, weak: true)
}

#let cv-section-inline(title) = {
  v(sp-head-above, weak: true)
  block(width: 100%, breakable: false, grid(
    columns: (auto, 1fr),
    column-gutter: 2.5mm,
    align: (left + horizon, left + horizon),
    head-label(title),
    box(width: 100%, height: 0.5pt, fill: hair),
  ))
  v(sp-head-below, weak: true)
}

// A page-1 row: metadata right-aligned in the gutter, content in the measure.
#let gutter-row(meta, content) = grid(
  columns: (gutter, 1fr),
  column-gutter: 5mm,
  align: (right + top, left + top),
  meta, content,
)

// Marker + body, used for every bullet and list item in the document.
#let marked(content, marker: "›", indent: 3mm) = grid(
  columns: (indent, 1fr),
  align: (left + top, left + top),
  text(fill: mute, marker),
  content,
)

// ----- Page-1 header ---------------------------------------------------------

#let profile-icon(slug) = {
  if slug == "github" { fa-github() }
  else if slug == "linkedin" { fa-linkedin() }
  else if slug == "twitter" { fa-twitter() }
  else if slug == "homepage" { fa-globe() }
  else if slug == "scholar" { fa-graduation-cap() }
  else if slug == "kaggle" { fa-kaggle() }
  else if slug == "medium" { fa-medium() }
  else { none }
}

#let render-header(personal) = {
  text(size: name-size, weight: 600, fill: bright, tracking: -0.015em,
    personal.first_name + " " + personal.last_name)
  // The one surviving nod to the old theme: a terminal cursor, kept because it
  // is a single glyph rather than a whole simulated application.
  h(2.5pt)
  text(size: name-size, weight: 600, fill: signal, "_")

  v(5pt)
  // Parenthesised: Typst ends a statement at a newline unless it is bracketed,
  // so an unwrapped multi-line method chain silently splits in two and the tail
  // renders as literal source text.
  let roles = (
    personal.roles_casual
      .map(r => text(fill: body, r))
      .join(text(fill: hair, "  /  "))
  )
  text(font: mono, size: 7.8pt, roles)

  v(8pt)
  box(width: 100%, height: 0.8pt, fill: hair)
  v(5pt)

  // Contact strip.
  let email = personal.emails.at(0).address
  let tel = personal.phone.replace(" ", "").replace("(", "").replace(")", "")
  grid(
    columns: (1fr, auto),
    align: (left + horizon, right + horizon),
    text(font: mono, size: token-size, fill: mute)[
      #link("mailto:" + email, email)
      #h(0.7em)·#h(0.7em) #link("tel:" + tel, personal.phone)
      #h(0.7em)·#h(0.7em) #personal.location
    ],
    link(personal.homepage.url,
      text(font: mono, size: token-size, fill: signal, personal.homepage.label)),
  )

  v(3.5pt)

  // Profile links, inline rather than as a sidebar column.
  let entries = personal.profiles_casual
    .filter(slug => slug != "homepage")
    .map(slug => {
      let p = personal.profile_entries.at(slug)
      box(link(p.url, {
        text(size: token-size, fill: signal, profile-icon(slug))
        h(0.4em)
        text(font: mono, size: token-size, fill: body, p.label)
      }))
    })
  entries.join(text(font: mono, size: token-size, fill: hair, "   ·   "))
}

// The one lifted surface in the document, so the summary reads before anything
// else on the page.
#let render-profile(personal) = block(
  width: 100%,
  fill: raised,
  inset: (x: 5mm, y: 4mm),
  radius: 1.5pt,
  text(size: 8.8pt, fill: bright, personal.about_me),
)

// `interests` and `who_am_i` were vertical sidebar lists. As single dotted runs
// they keep the personality of the casual variant at a fraction of the space,
// and pinned to the foot of the last page they close the document rather than
// competing with experience for page 1.
// Sized to hold ONE line. The interests run is the longest string in the
// document (116 glyphs incl. separators); at JetBrains Mono's 0.6em advance it
// needs <= 6.5pt to clear the 159.5mm measure. A second line here would push
// the footer past the bottom margin and off the sheet.
#let personal-size = 6.2pt

#let personal-row(label, items) = grid(
  columns: (17mm, 1fr),
  column-gutter: 2.5mm,
  align: (left + top, left + top),
  text(font: mono, size: personal-size, weight: 700, fill: signal,
    tracking: 0.12em, label),
  tokens(items, size: personal-size, sep: " · "),
)

// The page number rides on the last row rather than taking a line of its own:
// this footer sits in the bottom margin, and every point of height here is a
// point taken off the two columns above it.
#let render-personal-footer(personal, trailing: none) = block(width: 100%, {
  box(width: 100%, height: 0.5pt, fill: hair)
  v(4.5pt)
  personal-row("INTERESTS", split-on(personal.interests_casual, ","))
  v(3.5pt)
  grid(
    columns: (1fr, auto),
    column-gutter: 3mm,
    align: (left + top, right + top),
    personal-row("WHO_AM_I", personal.who_am_i),
    trailing,
  )
})

// ----- Experience ------------------------------------------------------------

#let make-experience(items) = {
  set text(size: body-size)
  cv-section("Experience")
  for (i, item) in items.enumerate() {
    let bullets = bullets-for(item, "casual")
    gutter-row(
      {
        text(font: mono, size: 6.9pt, fill: body, dash-dates(item.dates))
        linebreak()
        v(1pt)
        text(font: mono, size: token-size, fill: mute,
          field(item, "location", "casual"))
      },
      {
        text(size: 9.6pt, weight: 600, fill: bright, field(item, "role", "casual"))
        text(size: 9.6pt, fill: hair, "  /  ")
        text(size: 9.6pt, weight: 500, fill: signal, field(item, "company", "casual"))
        if bullets.len() > 0 {
          v(3.6pt)
          for b in bullets {
            marked({
              text(fill: body, render-md(field(b, "text", "casual")))
              let st = field(b, "stack", "casual")
              if st != none {
                block(above: sp-stack-above, below: 0pt, tokens(split-on(st, ",")))
              }
            })
            v(sp-bullet, weak: true)
          }
        }
      },
    )
    // Only between blocks — an unconditional gap strands space under the last.
    if i + 1 < items.len() { v(sp-job) }
  }
}

// ----- Page-2 sections -------------------------------------------------------
// These live in 50%-width columns, so they use the inline header and drop the
// metadata gutter entirely.

#let make-education(items) = {
  set text(size: col-size)
  cv-section-inline("Education")
  for (i, e) in items.enumerate() {
    marked({
      text(font: mono, size: token-size, fill: body, dash-dates(e.dates_casual))
      linebreak()
      v(1.4pt)
      text(size: 8.4pt, weight: 600, fill: bright,
        e.at("degree_casual", default: ""))
      linebreak()
      v(1pt)
      text(fill: signal, e.institute)
      for line in e.at("extras_casual", default: ()) {
        linebreak()
        text(fill: mute, render-md(line))
      }
    })
    if i + 1 < items.len() { v(sp-entry) }
  }
}

// One row per category. The hanging indent is computable because JetBrains Mono
// advances exactly 0.6em per glyph and the labels are ASCII, so wrapped values
// hang under the value instead of colliding with the next label.
#let make-skills(items) = {
  set text(size: col-size)
  cv-section-inline("Skills")
  for (i, s) in items.enumerate() {
    let label = lower(s.at("category_casual", default: s.category))
    // Absolute, not em: the label sets at token-size but the paragraph's em is
    // col-size, so an em-relative indent would land in the wrong place. The +3
    // covers the " = " separator.
    par(hanging-indent: (label.len() + 3) * 0.6 * token-size)[
      #text(font: mono, size: token-size, weight: 700, fill: bright, label)
      #text(font: mono, size: token-size, fill: hair, " = ")
      #tokens(split-on(s.stack, ","), fill: body)
    ]
    if i + 1 < items.len() { v(sp-skill) }
  }
}

#let make-projects(items) = {
  set text(size: col-size)
  cv-section-inline("Projects")
  for (i, p) in items.enumerate() {
    marked({
      text(size: 8.2pt, weight: 600, fill: bright, field(p, "name", "casual"))
      block(above: sp-stack-above, below: 0pt,
        tokens(split-on(field(p, "stack", "casual"), "|")))
      block(above: 2.6pt, below: 0pt,
        text(fill: body, render-md(field(p, "description", "casual"))))
    })
    if i + 1 < items.len() { v(sp-entry) }
  }
}

#let make-publications(items) = {
  set text(size: col-size)
  cv-section-inline("Publications")
  for (i, p) in items.enumerate() {
    let title = field(p, "title", "casual")
    let venue = field(p, "venue", "casual")
    let doi = p.at("doi_url", default: none)
    let head = text(size: 8pt, weight: 600, fill: bright, title)
    marked({
      text(font: mono, size: token-size, fill: mute, str(p.year))
      h(0.6em)
      if doi != none { ext-link(doi, head) } else { head }
      if venue != none and venue != "" {
        block(above: sp-stack-above, below: 0pt,
          text(font: mono, size: token-size, fill: mute, venue))
      }
    })
    if i + 1 < items.len() { v(sp-entry) }
  }
}

#let make-open-source(items) = {
  set text(size: col-size)
  cv-section-inline("Open Source")
  for (i, o) in items.enumerate() {
    let url = o.at("name_url", default: none)
    let head = text(size: 8.2pt, weight: 600, fill: bright, field(o, "name", "casual"))
    marked({
      if url != none { ext-link(url, head) } else { head }
      block(above: sp-stack-above, below: 0pt,
        tokens(split-on(field(o, "stack", "casual"), ",")))
      block(above: 2.6pt, below: 0pt,
        text(fill: body, render-md(field(o, "description", "casual"))))
    })
    if i + 1 < items.len() { v(sp-entry) }
  }
}

// Self-suppresses when nothing opts into `casual`, so emptying the section in
// data/ doesn't strand a bare header.
#let make-certifications(items) = {
  if items.len() == 0 { return }
  set text(size: col-size)
  cv-section-inline("Certifications")
  for (i, c) in items.enumerate() {
    marked({
      text(font: mono, size: token-size, fill: mute, str(c.year))
      h(0.6em)
      text(fill: bright, render-md(field(c, "name", "casual")))
      text(fill: mute, " · " + c.institute)
    })
    if i + 1 < items.len() { v(sp-entry-tight) }
  }
}

#let make-achievements(items) = {
  set text(size: col-size)
  cv-section-inline("Achievements")
  for (i, a) in items.enumerate() {
    let event = render-md(a.at("event_casual", default: a.event))
    let place = a.at("place_casual", default: "")
    marked({
      text(font: mono, size: token-size, fill: mute, str(a.year))
      h(0.6em)
      text(fill: bright, event)
      if place != "" {
        text(fill: signal, [ (#render-md(place))])
      }
    })
    if i + 1 < items.len() { v(sp-entry-tight) }
  }
}

// ----- Page furniture --------------------------------------------------------
// A page number is load-bearing on a stapled two-pager. Nothing else is.

#let page-number-text = context {
  let cur = counter(page).get().first()
  let tot = counter(page).final().first()
  text(font: mono, size: 6.4pt, fill: mute)[#cur / #tot]
}

#let page-number = align(right, page-number-text)
