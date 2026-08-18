// Renderers for the ATS variant.
//
// THE DESIGN RULE, and the only one that matters: decide for the PARSER first;
// then, among the choices a parser cannot tell apart, take the one a READER
// prefers. An earlier revision of this file said "every decision is made for a
// parser, not a reader", which was half a rule — it licensed the document to be
// unreadable in exchange for nothing, since a recruiter does open this file and
// no extractor is any worse off for a hairline or a grey date. What the first
// clause still forbids is listed under "Levers that are not available" below;
// everything outside that list is free, and this file now spends it.
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
//
// ---- Levers that are not available -----------------------------------------
//
// These are the obvious ways to make a plain document look better, and each one
// silently breaks extraction. None of them may be reached for here:
//
//   TRACKING on the section labels. casual/renderers.typ:527 sets
//   `tracking: 0.12em` and it looks good there. Here it would extract as
//   "E X P E R I E N C E", and section labels are exactly what a resume parser
//   segments a document on — so this would break the one thing the variant is
//   for. It would also pass scripts/check-ats.py, whose shredding heuristic only
//   counts LOWERCASE singletons. Highest-risk item in this file.
//
//   GRIDS, for the heading rule or the contact block. The rule below therefore
//   sits on its own line at full measure rather than in the label's row, which
//   is the one way casual's cv-section differs from this one.
//
//   kerning, link(), Font Awesome, #super. See main.typ and the list above.
//
// What IS free, and is what this file now uses: vertical space, colour (absent
// from the text layer entirely), rules (graphics, not text), size and weight.

#import "../../common/loaders.typ": *

// ---- Ink --------------------------------------------------------------------
//
// Two inks and a hairline. The rule: LABELS AND DATE RANGES ARE GREY;
// everything a parser is looking for stays black. So "Email:" is grey and the
// address is black, "Technologies:" is grey and the stack is black. A date
// range is grey outright — it is pure metadata, and there is no keyword in it.
//
// This costs nothing in extraction: colour is not in the text layer, so the
// grey tier is invisible to every check in scripts/check-ats.py and to every
// parser this document is aimed at. It is the cheapest structure available, and
// it is what breaks up the seven-line contact block without restructuring it.

#let ink  = black
#let meta = rgb(97, 97, 97)   // 6.9:1 on white — clear of WCAG AA, and dark
                              // enough to survive a greyscale laser, which
                              // matters because this document does get printed.
#let hair = rgb(176, 176, 176) // section rules ONLY. Nowhere near a text tier,
                               // which is the point; see the note on `sec`.

// ---- Type -------------------------------------------------------------------
//
// One family, three sizes, and the body size is larger than the casual
// variant's 8pt because page count carries little penalty here — NOT because
// size caused the extraction failure. That was measured: at 10.5pt with kerning
// still on, scripts/check-ats.py reported 0/12 phrases intact, no better than
// the 8pt casual CV. The fix was `kerning: false` in main.typ; see the note
// there before changing either setting.

#let body-font = "IBM Plex Sans"
#let fs-name   = 20pt
#let fs-head   = 11pt
#let fs-body   = 10.5pt
#let fs-foot   = 8.5pt

// ---- Spacing ----------------------------------------------------------------
//
// Typst's `above`/`below` are not what the eye sees; BASELINE-TO-BASELINE is.
// The two differ by the height of a line box, which was measured rather than
// derived: contact rows set at `below: 1.5pt` land 8.83pt apart in the built
// PDF, so a 10.5pt line box is 7.33pt. Every distance below is therefore
// written as the b2b it is meant to produce, and `gap-for` converts.
//
// (The constant is exact at fs-body and about 4% low at fs-head, which only
// affects the space above a section label. That is the largest gap in the
// document and the least sensitive to 0.3pt.)
//
// THE LAW, and the whole reason this file was rewritten:
//
//     sp-bind  <  lead-list  <  lead-body  <  sp-item  <  sp-entry  <  sp-section
//
// It has to be monotone, and in the first cut of this variant it was INVERTED.
// Measured on the shipped PDF: a wrap inside one sentence was 14.68pt while the
// gap between two DIFFERENT bullets was 12.33pt — two separate points sat
// closer together than two lines of a single one — and a section break (19.29pt)
// was only 11% larger than a job break (17.33pt). Every boundary was either
// backwards or indistinguishable from its neighbour, which is why the page read
// as one slab. casual/renderers.typ:151 already names both failures ("RHYTHM
// RULE", "PARTS RULE"); this file simply violated them everywhere.
//
// THREE PAGES IS A FIXED BUDGET and is what sets the magnitudes — the ratios are
// a judgement, the absolute values are arithmetic. The first cut of this ladder
// used the same ratios one rung looser throughout (10.5 / 11.5 / 12.6 / 15.5 /
// 20.0 / 25.0) and overflowed onto a fourth page by 175pt, so these are what the
// budget actually affords, not what it would like.
//
// The instance counts are what price a change, and they are lopsided — measured
// across the built PDF: sp-bind x57, sp-item x41, lead-body x26, sp-entry x17,
// sp-section x9. So 1pt off sp-bind is worth 57pt of page and 1pt off sp-section
// is worth 9pt: the cheapest-looking constant to touch is the most expensive one
// to get wrong, and vice versa.
//
// If a data change pushes this to four pages, trim in this order — sp-section,
// then sp-entry — and do NOT trim sp-item or lead-body. sp-item is the constant
// that fixes the inverted rank above, and lead-body is already at 1.16x the type
// size, which is the floor for prose. There is ~44pt of slack on page 3 as this
// is written, which is roughly four more bullets or six more publications.

#let line-box = 7.33pt
#let gap-for(b2b) = b2b - line-box

#let sp-bind    = gap-for(10.0pt)  // A LINE THAT BELONGS TO THE LINE ABOVE IT:
                                   // the employer under a role, the dates under
                                   // the employer, "Technologies:" under its
                                   // bullet, each contact row under the last.
                                   // Deliberately the tightest gap here, and
                                   // deliberately UNDER both leadings, so these
                                   // read as one cluster rather than as a list.
                                   // It replaces the three separate sub-leading
                                   // values (1.5pt, 2pt, 0pt) the first cut
                                   // used. Those were never a hierarchy — they
                                   // were one tier that had not been named, and
                                   // naming it is what stops the next edit
                                   // picking a fourth number.
#let lead-list  = gap-for(10.9pt)  // wrap inside a TOKEN LIST row — a skills
                                   // line, an award, a citation. Tighter than
                                   // prose because these are lists of short
                                   // items rather than sentences, and because
                                   // it is what pays for sp-item: the 28 flat
                                   // rows are the largest single pool of lines
                                   // in the document, and at a prose leading
                                   // they cost the page-3 budget outright.
#let lead-body  = gap-for(12.2pt)  // wrap inside a SENTENCE. Down from 14.68pt,
                                   // which was loose enough that it outranked
                                   // most of the real boundaries in the file.
#let sp-item    = gap-for(14.1pt)  // BETWEEN SIBLINGS that can each wrap:
                                   // bullets, skills rows, awards, publications,
                                   // interests. One constant for all of them
                                   // because they are one relationship. Must
                                   // clear BOTH leadings, or a wrapped item
                                   // merges into the next one — which is exactly
                                   // what a wrapped "Cloud:" row did.
#let sp-entry   = gap-for(16.9pt)  // between ENTRIES in a section: two jobs, two
                                   // projects, two degrees.
#let sp-section = gap-for(20.5pt)  // between SECTIONS. The largest gap here, and
                                   // it does not have to be as large as the
                                   // ratio ladder would suggest, because a
                                   // section boundary is the only one in the
                                   // document that also carries a RULE. Space is
                                   // confirming a boundary a second signal has
                                   // already drawn.
#let sp-rule    = 3.5pt            // section label down to its rule.
#let sp-head    = 6pt              // rule down to the section's first line.

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

// A grey label followed by a black value, on one line. The label keeps its
// trailing space so that however an extractor chooses to join the two runs, the
// result is "Email: address" and never "Email:address".
#let labelled(label, value) = {
  text(fill: meta, label + ": ")
  text(fill: ink, value)
}

// ---- Blocks -----------------------------------------------------------------

// A section label with a full-measure rule under it.
//
// The rule is the single largest legibility gain available to this document and
// it costs nothing: a `box(fill:)` is a graphic, so it contributes no text runs
// and no positioning offsets. casual/renderers.typ:532 hangs the same rule in a
// two-column grid beside the label; here it goes on its own line instead,
// because a grid is on the forbidden list at the top of this file and a
// full-measure rule is the louder mark anyway.
//
// One block, not three, so the boundary above is `sp-section` exactly rather
// than whatever Typst's weak-spacing collapse would have made of a stack.
#let sec(title) = block(above: sp-section, below: sp-head, {
  text(size: fs-head, weight: 700, fill: ink, upper(title))
  block(above: sp-rule, below: 0pt, box(width: 100%, height: 0.5pt, fill: hair))
})

// The marker is a literal character in the same text run as the body, not a
// list marker and not a grid column, so it extracts as "\u{2022} Built an
// LLM-backed platform...". Note that writing "- " here instead would NOT be
// literal: Typst reads a leading hyphen as list syntax and builds a real list,
// which is a different construct than this file wants to be reasoning about.
//
// `below: sp-bind` binds the "Technologies:" line that may follow to this
// bullet, while the NEXT bullet's `above: sp-item` opens the larger gap —
// Typst collapses adjacent block spacing to the max of the two, so one pair of
// values produces both distances.
#let bullet(body) = block(width: 100%, above: sp-item, below: sp-bind,
  inset: (left: 4mm), {
  set par(hanging-indent: 3.2mm, leading: lead-body)
  [\u{2022} #body]
})

// A row in a flat list — a skills category, an award, a citation, an interest.
// Sibling spacing above (it is its own item), list leading inside (it is a run
// of tokens, not a sentence).
#let flat-line(body, first: false) = block(
  // `first` matters because Typst collapses adjacent spacing to the MAX of the
  // pair: without it the opening row of a flat section takes sp-item rather
  // than the sp-head that every other section's first line gets, so the gap
  // under a rule differed depending on what followed it. The entry-based
  // sections already handle this with their `if i == 0 { 0pt }`.
  above: if first { 0pt } else { sp-item }, below: 0pt, {
  set par(leading: lead-list)
  text(size: fs-body, body)
})

#let tech-line(items) = if items.len() > 0 {
  block(above: sp-bind, below: 0pt, {
    set par(leading: lead-list)
    text(size: fs-body, labelled("Technologies", items.join(", ")))
  })
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
  block(below: 5pt, text(size: fs-name, weight: 700, fill: ink,
    personal.first_name + " " + personal.last_name))

  // `tagline_casual` ("Lead Machine Learning Engineer") rather than the two-item
  // `roles_casual` run the casual header sets. A single spelled-out job title is
  // what a title matcher compares against; "ML Engineer / Data Scientist" reads
  // as one hyphenated title to a parser, and the abbreviation misses the phrase
  // "Machine Learning" entirely.
  block(below: 9pt, text(size: fs-body, fill: ink, personal.tagline_casual))

  // One labelled line each — the shape a parser reads most reliably, and the
  // reason this block is NOT compressed onto two lines with separators. What
  // makes it survivable for a reader is the grey tier: seven identical-weight
  // lines are a wall, seven grey labels against black values are a table.
  //
  // Parentheses around a country code defeat some phone normalisers, so
  // "(+94) 71..." becomes "+94 71...".
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
    block(above: sp-bind, below: 0pt, text(size: fs-body, labelled(label, value)))
  }
}

// ---- Footer -----------------------------------------------------------------
//
// A page footer is a KNOWN defect of the casual variant — it extracts as
// "1 / 2PROJECTS", the page number fused to the next heading — so this one is
// permitted only because it is tested. scripts/check-ats.py asserts the footer
// is glued to nothing on either side; if that assertion ever fires, the footer
// goes, not the assertion.
//
// Suppressed on page 1, where the name is already set at fs-name. It exists for
// pages 2 and 3, which otherwise carry nothing identifying them at all — this
// is a three-page document that gets printed and stapled.
#let render-footer(personal) = context {
  let n = counter(page).get().first()
  if n > 1 {
    let total = counter(page).final().first()
    align(center, text(size: fs-foot, fill: meta,
      personal.first_name + " " + personal.last_name
        + " — Page " + str(n) + " of " + str(total)))
  }
}

// ---- Sections ---------------------------------------------------------------

#let make-summary(personal) = {
  sec("Summary")
  block(text(size: fs-body, fill: ink, plain(personal.about_me)))
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

    // Role, then employer, then dates — three lines, title first. The casual
    // variant puts a 30mm date rail to the LEFT of the title, which serialises
    // as two lines of metadata before the job it belongs to, and fuses under
    // some extractors ("1 yr 10 mosSenior Data Science Engineer / WSO2").
    //
    // breakable: false so a page break can never strand a role from its
    // employer. Free, and invisible to extraction.
    block(breakable: false, above: if i == 0 { 0pt } else { sp-entry },
      below: sp-bind, {
      block(below: sp-bind, text(size: fs-body, weight: 700, fill: ink,
        plain(field(e, "role", variant))))
      block(below: sp-bind, text(size: fs-body, fill: ink,
        if location != "" { company + ", " + location } else { company }))
      block(below: 0pt, text(size: fs-body, fill: meta, dates-of(e.dates)))
    })

    for b in bullets-for(e, variant) {
      bullet(text(size: fs-body, fill: ink, plain(field(b, "text", variant))))
      let stack = split-list(field(b, "stack", variant), ",")
      if stack.len() > 0 {
        block(inset: (left: 4mm), above: sp-bind, below: 0pt, {
          set par(leading: lead-list)
          text(size: fs-body, labelled("Technologies", stack.join(", ")))
        })
      }
    }
  }
}

#let make-education(items, variant) = {
  sec("Education")
  for (i, e) in items.enumerate() {
    block(breakable: false, above: if i == 0 { 0pt } else { sp-entry },
      below: sp-bind, {
      block(below: sp-bind, text(size: fs-body, weight: 700, fill: ink,
        plain(field(e, "degree", variant))))
      block(below: sp-bind, text(size: fs-body, fill: ink, e.institute))
      block(below: 0pt, text(size: fs-body, fill: meta,
        dates-of(field(e, "dates", variant))))
    })
    let extras = field(e, "extras", variant)
    if extras != none {
      for x in extras { bullet(text(size: fs-body, fill: ink, plain(x))) }
    }
  }
}

#let make-skills(items) = {
  sec("Skills")
  for (i, s) in items.enumerate() {
    // Bare `category`, NOT category_casual. The casual CV abbreviates four of
    // these to "ML / DL", "RL", "MLOps" and "IaC" so they fit its right-aligned
    // label gutter. "Reinforcement Learning" and "Infrastructure as Code" are
    // the strings a keyword matcher is actually looking for, and here there is
    // no gutter to fit.
    flat-line(labelled(s.category, s.stack), first: i == 0)
  }
}

// Order is name, then technologies, then description — the one place in the
// document where an annotation precedes what it annotates, and it stays that
// way deliberately: it is the order scripts/build-ats-txt.mjs emits, and the two
// are kept diffable by eye on purpose (see the note at the top of that file).
#let make-projects(items, variant) = {
  sec("Projects")
  for (i, p) in items.enumerate() {
    block(above: if i == 0 { 0pt } else { sp-entry }, below: sp-bind,
      text(size: fs-body, weight: 700, fill: ink, plain(field(p, "name", variant))))
    tech-line(split-list(field(p, "stack", variant), "|"))
    block(above: sp-bind, below: 0pt, {
      set par(leading: lead-body)
      text(size: fs-body, fill: ink, plain(field(p, "description", variant)))
    })
  }
}

#let make-publications(items, variant) = {
  sec("Publications")
  for (i, p) in items.enumerate() {
    flat-line(first: i == 0, text(fill: ink,
      plain(field(p, "title", variant)) + ". "
        + plain(field(p, "venue", variant)) + ", " + str(p.year) + "."))
  }
}

#let make-awards(items, variant) = {
  sec("Awards")
  for (i, a) in items.enumerate() {
    let event = plain(field(a, "event", variant))
    let place = plain(field(a, "place", variant))
    flat-line(first: i == 0, {
      text(fill: ink, if place != "" { event + " (" + place + ")" } else { event })
      text(fill: meta, ", " + str(a.year))
    })
  }
}

#let make-open-source(items, variant) = {
  sec("Open Source")
  for (i, o) in items.enumerate() {
    block(above: if i == 0 { 0pt } else { sp-entry }, below: sp-bind,
      text(size: fs-body, weight: 700, fill: ink, plain(field(o, "name", variant))))
    tech-line(split-list(field(o, "stack", variant), ","))
    block(above: sp-bind, below: 0pt, {
      set par(leading: lead-body)
      text(size: fs-body, fill: ink, plain(field(o, "description", variant)))
    })
  }
}

#let make-interests(personal) = {
  sec("Interests")
  flat-line(labelled("Professional", personal.interests_casual), first: true)
  flat-line(labelled("Personal", personal.who_am_i.join(", ")))
}
