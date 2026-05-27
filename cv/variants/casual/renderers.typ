#import "@preview/fontawesome:0.5.0": *
#import "../../common/loaders.typ": *

// =============================================================================
// Casual CV — dev-console / IDE theme.
// Color palette inspired by VS Code Dark+: green prompts, cyan keywords,
// amber string-literals, comment-grey metadata.
// =============================================================================

#let dark-blue     = rgb(45, 48, 59)
#let panel-bg      = rgb(38, 41, 51)
#let dove-white    = rgb(221, 221, 221)
#let medium-white  = rgb(166, 166, 166)
#let comment-grey  = rgb(120, 130, 145)
#let dark-grey     = rgb(97, 97, 97)
#let bright-green  = rgb(120, 214, 112)
#let accent-cyan   = rgb(97, 175, 239)
#let accent-amber  = rgb(229, 192, 123)
#let traffic-red   = rgb(237, 109, 96)
#let traffic-amber = rgb(229, 192, 123)
#let traffic-green = rgb(120, 214, 112)

#let body-size     = 10pt
#let footnote-size = 7.5pt

// ----- Spacing scale ---------------------------------------------------------
// Em-based so every gap scales with text size. One place to retune rhythm.

#let sp-bullet       = 0.45em  // between bullets within one entry
#let sp-entry-tight  = 0.9em   // short single-line entries (certs, achievements)
#let sp-entry        = 0.4em   // multi-line entries (education, projects, skills)
#let sp-entry-wide   = 0.9em   // between experience blocks (adds to internal list spacing)
#let sp-section      = 1.5em   // between major sections within a main column
#let sp-side-entry   = 1.3em   // between entries in sidebar lists (more room than main)
#let sp-side-section = 3.8em   // between sidebar sections (sidebar has more height to fill)
#let sp-header-above = 0.6em   // above a section header
#let sp-header-below = 0.9em   // below a section header

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

// Replace " - " with " -> " arrow for date ranges.
#let arrow-dates(s) = s.replace(" - ", " → ").replace(" -- ", " → ").replace(" – ", " → ")

// Evaluate YAML-embedded Typst markup (e.g. `#super[th]`).
// Strings originate in our own data/ dir, so arbitrary-code risk is nil.
#let render-md(s) = eval(s, mode: "markup")

// Render a stack string as bracketed tag chips: "[Python] [FastAPI] [LangChain]".
#let tag-list(s, sep: ",") = {
  let parts = s.split(sep).map(p => p.trim()).filter(p => p.len() > 0)
  parts
    .map(p => box[#text(fill: comment-grey, "[")#text(fill: bright-green, p)#text(fill: comment-grey, "]")])
    .join(text(fill: comment-grey, " "))
}

// Render a stack as a single bracketed comma-separated list: "[Python, SQL, Java]".
#let bracket-list(s, sep: ",") = {
  let parts = s.split(sep).map(p => p.trim()).filter(p => p.len() > 0)
  let inner = parts.map(p => text(fill: bright-green, p)).join(text(fill: comment-grey, ", "))
  text(fill: comment-grey, "[") + inner + text(fill: comment-grey, "]")
}

// ----- Section headers -------------------------------------------------------

// Main column: shell prompt header.  `$ experience ──────────────`
#let cv-section(title) = {
  v(sp-header-above, weak: true)
  block(width: 100%, breakable: false, grid(
    columns: (auto, auto, 1fr),
    column-gutter: 0.4em,
    align: (left + horizon, left + horizon, left + horizon),
    text(weight: "bold", size: 1.05em, fill: bright-green, "$"),
    text(weight: "bold", size: 1.05em, fill: dove-white, lower(title)),
    box(width: 100%, height: 0.5pt, fill: dark-grey),
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
    text(fill: comment-grey, weight: "bold", "//"),
    text(weight: "bold", fill: dove-white, snake(title)),
    box(width: 100%, height: 0.5pt, fill: dark-grey),
  ))
  v(sp-header-below, weak: true)
}

// ----- Page-1 main-column header (whoami block) ------------------------------

#let render-main-header(personal) = {
  set par(leading: 0.4em)
  text(size: footnote-size, fill: bright-green, "oshan@cv:~$ ")
  text(size: footnote-size, fill: dove-white, weight: "bold", "whoami")
  v(0.55em)
  block(below: 0pt)[
    #text(size: 19pt, fill: comment-grey, "> ")
    #text(size: 19pt, weight: "bold", fill: dove-white, personal.first_name + " " + personal.last_name)
    #text(size: 19pt, weight: "bold", fill: bright-green, "_")
  ]
  v(0.8em)
  set text(size: 10pt)
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
  v(0.25em)
  text(fill: accent-cyan, "more")
  text(fill: dove-white, ": ")
  link(
    personal.homepage.url,
    underline(text(fill: bright-green, weight: "bold", personal.homepage.label)),
  )
  text(fill: bright-green, weight: "bold", " →")
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
  cv-section("Experience")
  set text(size: footnote-size)
  set par(leading: 0.7em)
  for item in items [
    #text(weight: "bold", fill: accent-cyan, field(item, "role", "casual"))#text(fill: comment-grey, " @ ")#text(weight: "bold", fill: dove-white, field(item, "company", "casual")) \
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
    #v(sp-entry-wide)
  ]
}

// Open-source contributions. Project name (linked) · stack · one-line description.
#let make-open-source(items) = {
  cv-section("Open Source")
  set text(size: footnote-size)
  set par(leading: 0.75em)
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
      let title-body = if url != none { link(url, text(fill: accent-cyan, weight: "bold", name)) } else { text(fill: accent-cyan, weight: "bold", name) }
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
  cv-section("Publications")
  set text(size: footnote-size)
  set par(leading: 0.75em)
  list(
    marker: text(fill: bright-green, "›"),
    indent: 0pt,
    body-indent: 0.5em,
    spacing: sp-entry,
    ..items.map(p => {
      let title = field(p, "title", "casual")
      let venue = field(p, "venue", "casual")
      let doi = p.at("doi_url", default: none)
      let title-body = if doi != none { link(doi, text(fill: accent-cyan, weight: "bold", title)) } else { text(fill: accent-cyan, weight: "bold", title) }
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
  cv-section("Projects")
  set text(size: footnote-size)
  set par(leading: 0.75em)
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
  cv-section("Education")
  set text(size: footnote-size)
  set par(leading: 0.75em)
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

#let make-skills(items) = {
  cv-section("Skills")
  set text(size: footnote-size)
  set par(leading: 0.75em)
  grid(
    columns: (auto, auto, 1fr),
    column-gutter: 0.5em,
    row-gutter: sp-entry,
    ..items
      .map(s => (
        text(fill: accent-cyan, snake(s.category)),
        text(fill: dove-white, "="),
        bracket-list(s.stack, sep: ","),
      ))
      .flatten()
  )
}

#let make-certifications(items) = {
  cv-section("Certifications")
  set text(size: footnote-size)
  set par(leading: 0.75em)
  list(
    marker: text(fill: bright-green, "›"),
    indent: 0pt,
    body-indent: 0.5em,
    spacing: sp-entry-tight,
    ..items.map(c => [
      #text(fill: accent-amber, str(c.year))
      #text(fill: comment-grey)[·]
      #text(fill: dove-white, render-md(field(c, "name", "casual")))
      #text(fill: comment-grey)[· #c.institute]
    ]),
  )
}

#let make-achievements(items) = {
  cv-section("Achievements")
  set text(size: footnote-size)
  set par(leading: 0.75em)
  list(
    marker: text(fill: bright-green, "›"),
    indent: 0pt,
    body-indent: 0.5em,
    spacing: sp-entry-tight,
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
  set text(size: footnote-size)
  set par(leading: 1.1em)
  set align(left)

  cv-side-section("About Me")
  text(fill: dove-white, personal.about_me)

  cv-side-section("Interests")
  text(fill: dove-white, personal.interests_casual)

  cv-side-section("Who Am I?")
  list(
    marker: text(fill: bright-green, "›"),
    indent: 0pt,
    body-indent: 0.4em,
    spacing: sp-side-entry,
    ..personal.who_am_i.map(w => [#text(fill: medium-white, w)]),
  )

  cv-side-section("Contact Me")
  grid(
    columns: (auto, 1fr),
    column-gutter: 0.6em,
    row-gutter: sp-side-entry,
    align: (left + horizon, left + horizon),
    ..icon-row(fa-envelope(), text(fill: dove-white, personal.emails.at(0).address)),
    ..icon-row(fa-phone(),    text(fill: dove-white, personal.phone)),
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

// Editor-tab title bar — inline block at the top of each page.
#let title-bar = context {
  let cur = counter(page).get().first()
  let tot = counter(page).final().first()
  block(
    width: 100%,
    inset: (x: 6mm, y: 1.5mm),
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
  inset: (x: 6mm, y: 1.5mm),
  fill: dark-blue,
  grid(
    columns: (auto, 1fr, auto),
    column-gutter: 1em,
    align: (left + horizon, left + horizon, right + horizon),
    text(size: 7pt, fill: bright-green)[● #text(fill: dove-white)[ready]],
    text(size: 7pt, fill: comment-grey)[utf-8 · typst · roboto-mono],
    text(size: 7pt, fill: comment-grey)[ln 1, col 1],
  ),
)
