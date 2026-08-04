#import "@preview/fontawesome:0.5.0": *
#import "../../common/loaders.typ": *

// =============================================================================
// Casual CV — dev-console / IDE theme.
// Color palette inspired by VS Code Dark+: green prompts, cyan keywords,
// amber string-literals, comment-grey metadata.
// =============================================================================

// ----- Palette ---------------------------------------------------------------
// Ratios are contrast against the dark-blue page fill.

#let dark-blue     = rgb(45, 48, 59)
#let panel-bg      = rgb(38, 41, 51)
#let dove-white    = rgb(221, 221, 221)   // 9.6:1 — entry emphasis
#let medium-white  = rgb(184, 188, 196)   // 6.9:1 — body copy
#let comment-grey  = rgb(148, 158, 173)   // 4.9:1 — `//` metadata; the
                                          //         highest-frequency text here
#let rule-grey     = rgb(115, 124, 140)   // 3.1:1 — section rules; tinted rather
                                          //         than neutral so it reads as
                                          //         part of the theme
#let bright-green  = rgb(120, 214, 112)
#let accent-cyan   = rgb(97, 175, 239)
#let accent-amber  = rgb(229, 192, 123)
#let chip-text     = rgb(140, 190, 134)   // 6.2:1 — calmer than bright-green so
#let chip-bracket  = rgb(105, 115, 130)   //         stack chips stop shouting
#let traffic-red   = rgb(237, 109, 96)
#let traffic-amber = rgb(229, 192, 123)
#let traffic-green = rgb(120, 214, 112)

// ----- Type scale ------------------------------------------------------------
// A real 700 face is vendored (fonts/RobotoMono-Bold.ttf), so weight — not just
// hue — carries hierarchy. The ladder:
//   700  name, section headers, entry titles
//   500  company names, header sigils
//   400  body copy, metadata, chips

#let body-size      = 10pt    // document default; the whoami header block sits here
#let footnote-size  = 7.5pt   // main-column body copy
#let side-size      = 8pt     // sidebar body copy — narrower column, and the
                              // sidebar has spare vertical room to give it
#let head-size      = 10pt    // main-column section headers
#let side-head-size = 9pt     // sidebar headers — deliberately subordinate
#let name-size      = 19pt

// ----- Spacing scale ---------------------------------------------------------
// RHYTHM RULE: the gap *between* entries must clearly exceed the leading
// *within* an entry, or multi-line entries merge into an unreadable wall.
// Bulleted lists get a smaller margin because the `›` marker already anchors
// each item.
//
// Section/header gaps are absolute pt so they don't silently change with the
// caller's text size. Everything else is em so it scales with local body copy.
// This block is the single tuning point for the document's vertical rhythm.

#let sp-line          = 0.56em  // leading WITHIN an entry
#let sp-bullet        = 0.80em  // between bullets in one job
#let sp-entry         = 0.95em  // between multi-line entries
#let sp-entry-compact = 0.75em  // between single-line entries (certs, achievements)
#let sp-skill         = 0.50em  // between skill rows (hanging indent already binds them)
#let sp-job           = 1.32em  // between experience blocks
#let sp-side-entry    = 1.35em  // between sidebar list rows
#let sp-side-section  = 40pt    // between sidebar sections
#let sp-header-above  = 8pt     // above a section header
#let sp-header-below  = 5pt     // below a section header — a header belongs closer
                                // to what it introduces than to what it follows
#let sp-section       = 13pt    // between sections within a column

// whoami header block
#let sp-name-above    = 0.55em
#let sp-name-below    = 0.80em
#let sp-meta-line     = 0.25em

// ----- Helpers ---------------------------------------------------------------

// Lowercase + snake_case for IDE-style identifiers.
#let snake(s) = {
  let r = lower(s)
  r = r.replace(" / ", "_")
  r = r.replace(" & ", "_")
  r = r.replace("/", "_")
  r = r.replace("&", "_")
  r = r.replace(" ", "_")
  r
}

// Replace " - " with an ASCII arrow for date ranges. Deliberately ASCII: Roboto
// Mono has no U+2192, so a real "→" silently falls back to Linux Libertine and
// drops a serif glyph into the monospace skin. "->" is more terminal-native anyway.
#let arrow-dates(s) = s.replace(" - ", " -> ").replace(" -- ", " -> ").replace(" – ", " -> ")

// Evaluate YAML-embedded Typst markup (e.g. `#super[th]`).
// Strings originate in our own data/ dir, so arbitrary-code risk is nil.
#let render-md(s) = eval(s, mode: "markup")

// A linked title, marked so it is distinguishable from plain text. The page-level
// `show link` rule is a deliberate no-op, so without this a DOI-linked
// publication title would look identical to an unlinked one.
// A rule rather than a glyph: Roboto Mono has no arrow codepoints, so any "↗"
// marker would fall back to Linux Libertine.
#let ext-link(url, body) = link(url, underline(
  body,
  stroke: 0.4pt + rule-grey,
  offset: 1.1pt,
  evade: true,
))

// Render a stack string as bracketed tag chips: "[Python] [FastAPI] [LangChain]".
// Secondary annotation under a bullet, so it uses the dimmed chip palette.
#let tag-list(s, sep: ",") = {
  let parts = s.split(sep).map(p => p.trim()).filter(p => p.len() > 0)
  parts
    .map(p => box[#text(fill: chip-bracket, "[")#text(fill: chip-text, p)#text(fill: chip-bracket, "]")])
    .join(text(fill: chip-bracket, " "))
}

// Render a stack as a single bracketed comma-separated list: "[Python, SQL, Java]".
// This *is* the content in the skills section, so it keeps the brighter green.
#let bracket-list(s, sep: ",") = {
  let parts = s.split(sep).map(p => p.trim()).filter(p => p.len() > 0)
  let inner = parts.map(p => text(fill: bright-green, p)).join(text(fill: chip-bracket, ", "))
  text(fill: chip-bracket, "[") + inner + text(fill: chip-bracket, "]")
}

// ----- Section headers -------------------------------------------------------
// Both use absolute sizes so they render identically regardless of the caller's
// ambient text size. They previously inherited it, which made main-column
// headers 10.5pt and sidebar headers 7.5pt purely by accident of call order.

// Main column: shell prompt header.  `$ experience ──────────────`
#let cv-section(title) = {
  v(sp-header-above, weak: true)
  block(width: 100%, breakable: false, grid(
    columns: (auto, auto, 1fr),
    column-gutter: 0.4em,
    align: (left + horizon, left + horizon, left + horizon),
    text(weight: "medium", size: head-size, fill: bright-green, "$"),
    text(weight: "bold", size: head-size, fill: dove-white, lower(title)),
    box(width: 100%, height: 0.6pt, fill: rule-grey),
  ))
  v(sp-header-below, weak: true)
}

// Sidebar: code-comment header.  `// about_me ─────────────`
#let cv-side-section(title) = {
  v(sp-side-section, weak: true)
  block(width: 100%, breakable: false, grid(
    columns: (auto, auto, 1fr),
    column-gutter: 0.4em,
    align: (left + horizon, left + horizon, left + horizon),
    text(fill: comment-grey, weight: "medium", size: side-head-size, "//"),
    text(weight: "bold", fill: dove-white, size: side-head-size, snake(title)),
    box(width: 100%, height: 0.6pt, fill: rule-grey),
  ))
  v(sp-header-below, weak: true)
}

// ----- Page-1 main-column header (whoami block) ------------------------------

#let render-main-header(personal) = {
  set par(leading: 0.4em)
  text(size: footnote-size, fill: bright-green, "oshan@cv:~$ ")
  text(size: footnote-size, fill: dove-white, weight: "medium", "whoami")
  v(sp-name-above)
  block(below: 0pt)[
    #text(size: name-size, fill: comment-grey, "> ")
    #text(size: name-size, weight: "bold", fill: dove-white, personal.first_name + " " + personal.last_name)
    #text(size: name-size, weight: "bold", fill: bright-green, "_")
  ]
  v(sp-name-below)
  set text(size: body-size)
  let roles = personal.at("roles_casual", default: none)
  if roles != none and roles.len() > 0 {
    text(fill: accent-cyan, "role")
    text(fill: dove-white, ": ")
    roles
      .map(r => text(fill: accent-amber, "\"" + r + "\""))
      .join(text(fill: comment-grey, " | "))
  } else {
    text(fill: comment-grey, "// ")
    text(fill: comment-grey, style: "italic", personal.tagline_casual)
  }
  linebreak()
  v(sp-meta-line)
  text(fill: accent-cyan, "more")
  text(fill: dove-white, ": ")
  link(
    personal.homepage.url,
    underline(text(fill: bright-green, weight: "medium", personal.homepage.label)),
  )
  text(fill: bright-green, weight: "medium", " ->")
}

// ----- FontAwesome profile-icon table ----------------------------------------

#let profile-icon(slug) = {
  if slug == "github"   { fa-github() }
  else if slug == "linkedin" { fa-linkedin() }
  else if slug == "twitter"  { fa-twitter() }
  else if slug == "homepage" { fa-globe() }
  else if slug == "scholar"  { fa-graduation-cap() }
  else if slug == "kaggle"   { fa-kaggle() }
  else if slug == "medium"   { fa-medium() }
  else { none }
}

#let icon-row(icon, body) = (
  align(left + horizon, text(size: 0.95em, fill: bright-green, icon)),
  align(left + horizon, body),
)

// ----- Sections: main column -------------------------------------------------

// Experience.
#let make-experience(items) = {
  set text(size: footnote-size)
  cv-section("Experience")
  set par(leading: sp-line)
  for (i, item) in items.enumerate() {
    [
      #text(weight: "bold", fill: accent-cyan, field(item, "role", "casual"))#text(fill: comment-grey, " @ ")#text(weight: "medium", fill: dove-white, field(item, "company", "casual")) \
      #text(fill: comment-grey, "// " + field(item, "location", "casual") + " · " + arrow-dates(item.dates))
      #let bullets = bullets-for(item, "casual")
      #if bullets.len() > 0 [
        #list(
          marker: text(fill: bright-green, "›"),
          indent: 0pt,
          body-indent: 0.5em,
          spacing: sp-bullet,
          ..bullets.map(b => [
            #text(fill: medium-white, render-md(field(b, "text", "casual")))
            #let st = field(b, "stack", "casual")
            #if st != none [
              \ #tag-list(st, sep: ",")
            ]
          ]),
        )
      ]
    ]
    // Only *between* blocks — an unconditional gap here left a dangling space
    // under the last job.
    if i + 1 < items.len() { v(sp-job) }
  }
}

// Open-source contributions. Project name (linked) · stack · one-line description.
#let make-open-source(items) = {
  set text(size: footnote-size)
  cv-section("Open Source")
  set par(leading: sp-line)
  list(
    marker: text(fill: bright-green, "›"),
    indent: 0pt,
    body-indent: 0.5em,
    spacing: sp-entry,
    ..items.map(o => {
      let name = field(o, "name", "casual")
      let stack = field(o, "stack", "casual")
      let desc = field(o, "description", "casual")
      let url = o.at("name_url", default: none)
      let title-body = if url != none { ext-link(url, text(fill: accent-cyan, weight: "bold", name)) } else { text(fill: accent-cyan, weight: "bold", name) }
      [
        #title-body \
        #text(fill: comment-grey, "// " + stack) \
        #text(fill: medium-white, render-md(desc))
      ]
    }),
  )
}

// Publications. Compact one-liner: year · title (in brackets: venue).
#let make-publications(items) = {
  set text(size: footnote-size)
  cv-section("Publications")
  set par(leading: sp-line)
  list(
    marker: text(fill: bright-green, "›"),
    indent: 0pt,
    body-indent: 0.5em,
    spacing: sp-entry,
    ..items.map(p => {
      let title = field(p, "title", "casual")
      let venue = field(p, "venue", "casual")
      let doi = p.at("doi_url", default: none)
      let title-body = if doi != none { ext-link(doi, text(fill: accent-cyan, weight: "bold", title)) } else { text(fill: accent-cyan, weight: "bold", title) }
      let has-venue = venue != none and venue != ""
      if has-venue [
        #text(fill: accent-amber, str(p.year)) #text(fill: comment-grey)[·] #title-body \
        #text(fill: comment-grey, "// " + venue)
      ] else [
        #text(fill: accent-amber, str(p.year)) #text(fill: comment-grey)[·] #title-body
      ]
    }),
  )
}

// Projects.
#let make-projects(items) = {
  set text(size: footnote-size)
  cv-section("Projects")
  set par(leading: sp-line)
  list(
    marker: text(fill: bright-green, "›"),
    indent: 0pt,
    body-indent: 0.5em,
    spacing: sp-entry,
    ..items.map(p => [
      #text(weight: "bold", fill: accent-cyan, field(p, "name", "casual")) \
      #text(fill: comment-grey, "// " + field(p, "stack", "casual").split("|").map(s => s.trim()).filter(s => s.len() > 0).join(", ")) \
      #text(fill: medium-white, render-md(field(p, "description", "casual")))
    ]),
  )
}

// ----- Sections: page 2 left column ------------------------------------------

#let make-education(items) = {
  set text(size: footnote-size)
  cv-section("Education")
  set par(leading: sp-line)
  list(
    marker: text(fill: bright-green, "›"),
    indent: 0pt,
    body-indent: 0.5em,
    spacing: sp-entry,
    ..items.map(e => [
      #text(fill: accent-amber, e.dates_casual) — #text(weight: "bold", fill: accent-cyan, e.at("degree_casual", default: ""))\
      #text(fill: comment-grey, e.institute)
      #for line in e.at("extras_casual", default: ()) [
        \ #text(fill: comment-grey, render-md(line))
      ]
    ]),
  )
}

// Skills. Each category is one paragraph with a hanging indent computed from its
// label, so wrapped stack lines hang exactly under the value instead of running
// back to the margin and colliding with the next category's label.
#let make-skills(items) = {
  set text(size: footnote-size)
  cv-section("Skills")
  set par(leading: sp-line)
  for (i, s) in items.enumerate() {
    let label = lower(s.at("category_casual", default: s.category))
    // Roboto Mono advances exactly 0.6em per glyph, so the indent that aligns
    // continuation lines under the value is computable. Labels are ASCII, so
    // .len() equals the glyph count. The +3 covers the " = " separator.
    par(hanging-indent: (label.len() + 3) * 0.6em)[
      #text(fill: accent-cyan, label)#text(fill: dove-white, " = ")#bracket-list(s.stack, sep: ",")
    ]
    if i + 1 < items.len() { v(sp-skill) }
  }
}

#let make-certifications(items) = {
  set text(size: footnote-size)
  cv-section("Certifications")
  set par(leading: sp-line)
  list(
    marker: text(fill: bright-green, "›"),
    indent: 0pt,
    body-indent: 0.5em,
    spacing: sp-entry-compact,
    ..items.map(c => [
      #text(fill: accent-amber, str(c.year))
      #text(fill: comment-grey)[·]
      #text(fill: dove-white, render-md(field(c, "name", "casual")))
      #text(fill: comment-grey)[· #c.institute]
    ]),
  )
}

#let make-achievements(items) = {
  set text(size: footnote-size)
  cv-section("Achievements")
  set par(leading: sp-line)
  list(
    marker: text(fill: bright-green, "›"),
    indent: 0pt,
    body-indent: 0.5em,
    spacing: sp-entry-compact,
    ..items.map(a => {
      let event = render-md(a.at("event_casual", default: a.event))
      let place = a.at("place_casual", default: "")
      if place == "" {
        [#text(fill: accent-amber, str(a.year)) #text(fill: comment-grey)[·] #event]
      } else {
        [#text(fill: accent-amber, str(a.year)) #text(fill: comment-grey)[·] #event #text(fill: accent-amber)[(#render-md(place))]]
      }
    }),
  )
}

// ----- Sidebar (page 1 left column) ------------------------------------------

#let render-sidebar(personal) = {
  set text(size: side-size)
  set par(leading: 1.05em)
  set align(left)

  cv-side-section("About Me")
  text(fill: medium-white, personal.about_me)

  cv-side-section("Interests")
  text(fill: medium-white, personal.interests_casual)

  cv-side-section("Who Am I?")
  list(
    marker: text(fill: bright-green, "›"),
    indent: 0pt,
    body-indent: 0.4em,
    spacing: sp-side-entry,
    ..personal.who_am_i.map(w => [#text(fill: medium-white, w)]),
  )

  cv-side-section("Contact Me")
  let email = personal.emails.at(0).address
  let tel = personal.phone.replace(" ", "").replace("(", "").replace(")", "")
  grid(
    columns: (auto, 1fr),
    column-gutter: 0.6em,
    row-gutter: sp-side-entry,
    align: (left + horizon, left + horizon),
    ..icon-row(fa-envelope(), link("mailto:" + email, text(fill: dove-white, email))),
    ..icon-row(fa-phone(),    link("tel:" + tel, text(fill: dove-white, personal.phone))),
    ..icon-row(fa-map(),      text(fill: dove-white, personal.location)),
  )

  cv-side-section("Profiles")
  let profile-rows = personal.profiles_casual.map(slug => {
    if slug == "homepage" {
      icon-row(fa-globe(), link(personal.homepage.url, text(fill: accent-cyan, personal.homepage.label)))
    } else {
      let p = personal.profile_entries.at(slug)
      icon-row(profile-icon(slug), link(p.url, text(fill: accent-cyan, p.label)))
    }
  }).flatten()
  grid(
    columns: (auto, 1fr),
    column-gutter: 0.6em,
    row-gutter: sp-side-entry,
    align: (left + horizon, left + horizon),
    ..profile-rows,
  )
}

// ----- Page chrome: title bar + status bar (used in main.typ) ---------------
// Inset matches the content columns' 8mm so the chrome lines up with the text
// below it rather than floating at its own margin.

// Editor-tab title bar — inline block at the top of each page.
#let title-bar = context {
  let cur = counter(page).get().first()
  let tot = counter(page).final().first()
  block(
    width: 100%,
    inset: (x: 8mm, y: 1.5mm),
    fill: dark-blue,
    grid(
      columns: (auto, 1fr, auto),
      column-gutter: 0.8em,
      align: (left + horizon, left + horizon, right + horizon),
      stack(
        dir: ltr,
        spacing: 3pt,
        circle(radius: 2.2pt, fill: traffic-red),
        circle(radius: 2.2pt, fill: traffic-amber),
        circle(radius: 2.2pt, fill: traffic-green),
      ),
      text(size: footnote-size)[
        #h(0.5em)
        #text(fill: dove-white, "~/cv/oshan-mudannayake.md")
        #h(1.2em)
        #text(fill: bright-green, "[main]")
      ],
      text(size: footnote-size, fill: comment-grey)[#cur / #tot],
    ),
  )
}

// Status-bar style footer — inline block at the bottom of each page.
#let status-bar = block(
  width: 100%,
  inset: (x: 8mm, y: 1.5mm),
  fill: dark-blue,
  grid(
    columns: (auto, 1fr, auto),
    column-gutter: 1em,
    align: (left + horizon, left + horizon, right + horizon),
    // Drawn, not the glyph "●" — Roboto Mono has no U+25CF and would fall back
    // to a serif face. This also scales with the design rather than the font.
    box(baseline: 0.5pt, circle(radius: 1.6pt, fill: bright-green))
      + text(size: 7pt, fill: dove-white)[ ready],
    text(size: 7pt, fill: comment-grey)[utf-8 · typst · roboto-mono],
    text(size: 7pt, fill: comment-grey)[ln 1, col 1],
  ),
)
