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
//   * ONE accent hue. `signal` marks exactly three kinds of thing —
//     ORGANIZATIONS (employers, institutions), SECTION LABELS, and LINKS —
//     plus the single cursor glyph after the name. Nothing else. An earlier
//     revision of this comment said "employers, section labels and links",
//     which was narrower than the design ever was (an institution is the
//     education analogue of an employer) and was in any case not what the code
//     did: achievement placings were accented too, which is neither an
//     organization nor a label nor a link. The code now matches this list.
//     Hierarchy is carried by size, weight and space.
//   * No page furniture that isn't load-bearing. A page number is; a fake
//     status bar isn't.
//   * The document is meant to be PRINTED. Anything structural — the section
//     rules, the one lifted surface, the link underlines — has to survive a
//     greyscale laser printer, not merely register on a calibrated display.
//     Several values below were raised for exactly this reason.
// =============================================================================

// ----- Palette ---------------------------------------------------------------
// Ratios are WCAG contrast against `ground`, computed rather than estimated —
// an earlier revision carried eyeballed figures that were all slightly off.
// Every run of text in this document is under 14pt, so WCAG treats all of it as
// "normal text": AA is 4.5:1, AAA is 7:1. Nothing here may sit below 4.5.

#let ground = rgb(16, 17, 21)     // near-neutral black; the old blue-grey read
                                  // as "theme" rather than as a ground
#let raised = rgb(33, 36, 44)     // the one lifted surface (profile panel).
                                  //  1.22:1 against `ground`. It was 1.07:1 —
                                  //  a seven-value step that registered as a
                                  //  hint on screen and as nothing at all on
                                  //  paper, which makes "the one lifted
                                  //  surface" a claim the document didn't keep.
                                  //  Roughly tripling the step costs almost
                                  //  nothing: `bright` on the panel is still
                                  //  13.5:1, well clear of AAA.
#let bright = rgb(238, 239, 242)  // 16.4:1 — name, entry titles
#let body   = rgb(176, 181, 191)  //  9.2:1 — prose
#let mute   = rgb(146, 155, 171)  //  6.7:1 — identifying metadata (dates,
                                  //  locations, years, venues) and bullet
                                  //  markers. Shares fs-meta (6.6pt, the
                                  //  smallest type here) with `stack`, so it
                                  //  gets real margin over AA rather than the
                                  //  4.6:1 it used to scrape by on.
#let stack  = rgb(121, 129, 144)  //  4.8:1 — TECHNOLOGY RUNS only: the "FastAPI
                                  //  · Python · React" lines under bullets, and
                                  //  the project, open-source and skill values.
                                  //  A tier of its own because those runs are
                                  //  annotations ON content, not content: they
                                  //  answer "with what" about the sentence above
                                  //  them, and at `mute` they read at nearly the
                                  //  weight of the prose they qualify. Skills
                                  //  were worse still — they ran at full `body`,
                                  //  so the one section that is ENTIRELY
                                  //  technology was also the one that made it
                                  //  indistinguishable from prose.
                                  //  Sits between `separator` (punctuation) and
                                  //  `mute` (metadata), which is exactly the
                                  //  standing of a stack line. Lowered from
                                  //  5.3:1, where the run held nearly the
                                  //  presence of the `mute` metadata tier above
                                  //  it and a three-part entry read as one
                                  //  block. This is the LAST step available: at
                                  //  4.8:1 the margin over AA is ~7%, and since
                                  //  this is the smallest type in the document
                                  //  and it has to survive a greyscale laser
                                  //  printer, what is left is not spendable.
                                  //  Anything dimmer than this needs a lighter
                                  //  WEIGHT instead, which the vendored
                                  //  JetBrains Mono (Regular + Bold, static
                                  //  files, no variable axis) cannot supply
                                  //  without a new face in fonts/.
#let signal = rgb(126, 226, 152)  // 11.9:1 — the only accent
#let hair   = rgb(62, 67, 79)     //  1.9:1 — RULES ONLY. Far below AA, which is
                                  //  fine for a hairline and disqualifying for
                                  //  text; `separator` exists so that stays true.
                                  //  Raised from 1.5:1, where the section rules
                                  //  washed out in print. They carry section
                                  //  boundaries, so they are structure, not
                                  //  decoration, and have to survive the page.
                                  //  1.9:1 is still nowhere near a text tier.
#let separator = rgb(103, 110, 123) // 3.7:1 — the "/" and "=" glyphs that divide
                                  //  two pieces of text, and the link underline.
                                  //  Deliberately below body contrast (they are
                                  //  punctuation, not content) but visible,
                                  //  which `hair` was not. Annotated 3.4:1 for
                                  //  several revisions; the block claims its
                                  //  figures are computed, so: 3.68:1.

// ----- Type ------------------------------------------------------------------

#let sans = "IBM Plex Sans"
#let mono = "JetBrains Mono"

// WEIGHTS: 400 and 700 only, and that is a property of the fonts, not a choice.
// IBM Plex's OTF release files Medium and SemiBold under their own family names
// ("IBM Plex Sans Medm", "IBM Plex Sans SmBld"), so the family "IBM Plex Sans"
// offers exactly Regular 400, Italic 400 and Bold 700. An earlier revision asked
// for `weight: 500` and `weight: 600` believing a ladder existed; Typst silently
// resolved those to the nearest real face (500 -> 400, 600 -> 700) and the two
// vendored files were never embedded at all. Asking for weights the family does
// not have is worse than asking for the ones it does — it reads as a ladder in
// the source while rendering as a binary. So: 400 or 700, explicitly.
//
// Inter was evaluated as a replacement, since it does carry a real 100-900 ladder
// in one family. It costs two extra pages at identical size — its metrics are
// materially wider — so the ladder is not worth the paper. Plex also has more
// character for this theme, which is the point of the theme.

// FOUR sizes, and no others. Every `size:` in this file resolves to one of
// these — a literal pt value anywhere below is a bug.
//
// An earlier revision drifted to twelve sizes, four of them (8, 8.2, 8.4, 8.8)
// inside a single 0.8pt band. Differences that small don't register as
// hierarchy; they just make the page look unresolved. Where two things need to
// be told apart at the same size, weight and colour do it (see the weight note
// below — the ladder is 400/700, not a continuum).
//
// Page 1 and page 2 previously ran their prose at 8.4pt and 7.6pt, on the
// reasoning that page 2's half-width columns want a smaller size for their
// shorter measure. That is sound in isolation and wrong here: body text is most
// of what the eye takes in, so a 10% step between facing pages reads as two
// different documents rather than as a considered adjustment. One body size
// now, on both pages; the columns get tighter LEADING instead, which answers
// the narrow measure without touching apparent size.

#let fs-display = 26pt    // the name. Used exactly once.
#let fs-title   = 9pt     // page-1 entry titles (role @ company). The only
                          // size that is page-specific, because experience is
                          // the spine of the document and reads as such.
#let fs-body    = 8pt     // ALL prose on both pages, the profile summary, the
                          // role line, and page-2 entry titles (weight 700 and
                          // `bright` separate those from the prose around them)
#let fs-meta    = 6.6pt   // every mono metadatum, everywhere: dates, stacks,
                          // locations, section labels, years, page number

// ----- Spacing ---------------------------------------------------------------
// RHYTHM RULE (inherited from the previous theme, still true): the gap between
// entries must clearly exceed the leading within one, or entries merge into a
// wall. The stack line is the trap — it belongs to the bullet ABOVE it, so its
// `above` spacing must stay well under the inter-bullet gap.
//
// PARTS RULE (the same rule one level down, and it was missing entirely): the
// gap between the PARTS of a single entry — title, technology run, description
// — must ALSO exceed the leading inside those parts. It did not. A project ran
// 2.8pt above its technology run and 2.6pt above its description against a
// col-leading of 3.84pt, which means the boundaries BETWEEN the three parts
// were TIGHTER than the boundaries between two lines of the same sentence. The
// eye had no cue where one part ended, so an entry read as a single paragraph
// with some bold at the front. Both gaps are now sp-part, 30% over col-leading.
//
// The two rules pull opposite ways on what looks like the same element, which
// is why a technology run has two different constants depending on where it is:
//
//   page 1  the run is SUBORDINATE — it annotates the one bullet above it. So
//           sp-stack-above stays UNDER page 1's 4.4pt leading and binds upward.
//   page 2  the run is a SIBLING of the title and the description. So sp-part
//           sits OVER the 3.84pt col-leading and separates.
//
// Same glyphs, same colour, opposite job, opposite spacing. Collapsing the two
// into one constant is the mistake this block exists to prevent.
//
// PAGE 1 IS A FIXED BUDGET, and that is what sets every page-1 number below.
// main.typ breaks the page unconditionally after experience, so the section does
// not flow — it either fits or it strands a line on a page of its own. Nine roles
// do not fit at the spacing this block used to carry, so page 1's leading went to
// 0.55em and its gaps came down with it, each re-derived against the new 4.4pt
// rather than scaled by eye. The ORDERING is what had to survive, and does:
//
//   sp-stack-above (3) < leading (4.4) < sp-bullet (5) < sp-job (8.5)
//
// The margins between those are now thinner than they were — sp-bullet clears the
// leading by 14% where it used to clear by 25% — so this is close to the floor.
// A tenth role does not fit by tightening; it needs a cut somewhere, and the
// honest levers at that point are dropping an entry from `casual` in
// data/experience.yaml or giving experience a second page.

#let sp-part        = 5pt     // PAGE 2 ONLY: the gap between the PARTS of an entry —
                              // title → technology run → description in projects and
                              // open source, and title → venue in publications. Clears
                              // col-leading (3.84pt) by 30%, which is the parts rule
                              // above.
                              //
                              // Publications carried their own constant (sp-venue, 2.8pt)
                              // until this revision, on the argument that a venue is
                              // metadata ON the title rather than a third part and should
                              // therefore bind upward like page 1's technology run. That
                              // reading is defensible in isolation and loses to a simpler
                              // one: a venue occupies the same slot a project's technology
                              // run does — the annotation set directly under a bold title
                              // — and page 2 has exactly one column grid, so two different
                              // distances under the same shape read as an inconsistency
                              // rather than as a distinction. One value now, both shapes.
                              //
                              // This used to serve page 1's role line as well. It
                              // can't any more: page 1 now has to seat nine roles in
                              // a fixed budget and wants 4pt there, which on page 2
                              // would clear col-leading by 4% and put the boundary
                              // BETWEEN a project's parts back under the boundary
                              // between two lines of its description — precisely the
                              // bug the parts rule was written to prevent. One
                              // constant cannot hold both numbers, so page 1 gets
                              // sp-part-role below and this one keeps page 2 intact.
#let sp-part-role   = 4pt     // page 1 ONLY: role line → its first bullet. Sits just
                              // UNDER page 1's leading (4.4pt), which would be a
                              // parts-rule violation anywhere else and is not one
                              // here for the reason the old shared comment already
                              // gave: a page-1 title is 9.6pt/700/bright and is fully
                              // separated by size, weight and colour before space is
                              // asked to do anything. Space is confirming a boundary
                              // three other signals have already drawn. Nowhere else
                              // in the document is a title so heavily marked, which
                              // is why this licence doesn't generalize.
#let sp-stack-above = 3pt     // page 1 ONLY: bullet → its technology run. Was 3.8pt
                              // against a 4.8pt leading; both fell together, so the
                              // relationship is unchanged — still under page 1's
                              // leading (now 4.4pt) and still well under sp-bullet,
                              // so the run stays bound to the bullet it annotates
                              // instead of floating between two of them. It is NOT
                              // back at the old 2.8pt that sat the run in the
                              // descenders above it: 3pt at the tighter leading is
                              // the same optical gap 3.8pt bought at the looser one.
// EDUCATION's head lines (dates → degree → institute) look like the same shape
// and get NO constant from this block: they set at col-leading exactly, which is
// the one distance here deliberately equal to something else. See make-education.
#let sp-bullet      = 5pt     // the largest pool on page 1 — fourteen of these —
                              // and the one the ninth role was mostly paid for
                              // out of. Still over page 1's leading (4.4pt) by
                              // 14%, so the rhythm rule at the top of this block
                              // holds and a wrapped bullet stays one bullet. The
                              // margin is thinner than it was (25% at 6pt/4.8pt),
                              // which is the real cost of the ninth role; 4.5pt
                              // was tried and is where wrapped bullets start
                              // reading as separate ones.
#let sp-job         = 8.5pt   // must read as clearly bigger than sp-bullet, or
                              // the boundary between two jobs is carried by the
                              // title styling alone. At 7pt it did not. 70% over
                              // sp-bullet here, against 83% at the old 11pt/6pt —
                              // a smaller margin, but the ordering it has to
                              // preserve is intact and 7pt is still clear below.
                              // Eight of these on the page, so this is the second
                              // biggest pool after sp-bullet. Seven now, not eight:
                              // splitting experience in two turned one of these
                              // boundaries into sp-section-p1 below.
#let sp-section-p1  = 11pt    // between the two page-1 SECTIONS — professional
                              // experience and research experience. The page-1
                              // analogue of sp-section, and it exists for the same
                              // reason: a boundary between two SUBJECTS has to
                              // outrank the boundary between two entries about one,
                              // or the split is carried by the section rule alone
                              // and reads as decoration.
                              //
                              // 29% over sp-job, where page 2's sp-section clears
                              // its sp-entry-rich by 110%. The smaller margin is
                              // page 1's budget, not a different judgement: this
                              // costs ~11pt of a page that had none, and every point
                              // over sp-job here is a point taken from the pools
                              // above. 13pt was the first value tried and is the one
                              // this would carry on a page with room.
                              //
                              // The narrow margin is affordable because the SPACE is
                              // not what separates the two sections — it is one of
                              // three signals, and the weakest. The other two are a
                              // ~139mm rule and a tracked `signal`-green label, and
                              // neither appears anywhere else on page 1. Measured
                              // top to bottom the boundary is 11pt + label + 4pt
                              // ≈ 22pt against sp-job's 8.5pt, so a section break
                              // still reads at better than twice a job break even
                              // after this trim. Page 2 has to pay in full instead,
                              // because it draws six of these and its widest rule is
                              // ~105mm (the skills band) against ~40mm in a column —
                              // a repeated, shorter mark, so it carries less on its
                              // own than page 1's single full-measure one.
                              //
                              // Emitted as a WEAK v in main.typ, which is what makes
                              // it composable with the sp-head-above (6pt, also weak)
                              // that cv-section emits on the other side of the
                              // boundary: weak spacing collapses to the max rather
                              // than summing, so the gap is 11pt and not 17pt. Two
                              // strong v's, or one of each, would stack and quietly
                              // put 6pt of page-1 budget somewhere nobody costed it.
// The page-2 gaps below were all raised once the `›` markers came off. Those
// markers were the only left-edge delimiter page-2 entries had; without one,
// separation has to be carried by space, and the 3mm per entry the markers gave
// back is what pays for it.
//
// There are TWO of them, because two shapes of entry live out here and the
// parts rule prices them differently: an entry whose largest internal gap is
// sp-part needs more around it than one built from a title and a line of
// metadata.
//
// WHAT PAYS FOR IT. Measured slack from the last ink in each column to the
// bottom of the text area (297mm − 20mm), re-measured after folding the venue
// gap into sp-part: ~95pt in column 1 (projects), ~56pt in column 2 (education,
// publications), ~127pt in column 3 (achievements, open source). The two
// sections carrying the three-part shape are the two sitting in the columns with
// room, so the sections that needed the space are the ones that could afford it.
//
// Column 2 is still the only one that can actually overflow, and it is the one
// this revision spent from: raising the publication venue gap to sp-part costs
// 2.2pt per publication, 15.4pt over the seven that opt into `casual`. What
// absorbed it is that the column had ~71pt rather than the ~31pt recorded above
// — dropping the under-review manuscript from publications.yaml handed back
// ~40pt, and nothing had re-measured since. Which is the standing warning here:
// re-measure before spending page-2 height, because these figures move whenever
// data/ does and they were all stale by 20pt or more when this line was written.
#let sp-entry       = 6.5pt   // education and publications — the page-2 entries that
                              // have something INSIDE them. Their internal lines sit
                              // at col-leading or below, and this outranks that by at
                              // least 69%.
#let sp-entry-flat  = 5pt     // achievements and certifications — the year-led entries
                              // with nothing inside them but the occasional wrap. The
                              // only boundary this has to beat is col-leading, and at
                              // sp-entry it beat it by 69%: five of the seven
                              // achievements set on one line, and between them the
                              // section read as a spaced list rather than as a list.
                              // 30% over col-leading, the same clearance sp-part is
                              // held to, and a 23% step under sp-entry.
                              //
                              // This is NOT the old sp-entry-tight returning. That was
                              // 4.6pt against an sp-entry of 5pt — a 0.4pt step, too
                              // small to register as anything but noise, which is why
                              // it went. The note that removed it also observed that
                              // these entries "wrap to two lines often enough"; they
                              // do (two of the seven), and it does not bear on this.
                              // A wrapped entry's internal boundary IS col-leading,
                              // which 5pt still clears by 30%. The premise was never
                              // "these never wrap" — it is "these have no parts".
#let sp-entry-rich  = 9.5pt   // projects and open source — the three-part entries.
                              // 90% over sp-part, so the boundary BETWEEN entries
                              // clearly outranks the boundaries inside one. The old
                              // 5pt cleared its internal gaps by a similar ratio,
                              // which is why the ratio was never the bug: both
                              // numbers were simply under the leading.
// Both trimmed 2pt and 1pt for page 1's budget. Page 2 is unaffected in practice:
// a section boundary there is max(sp-section, sp-head-above) and both are weak, so
// 20pt still wins outright — these only ever surface at the TOP of a column, where
// the change buys that column a little more height rather than costing it any.
#let sp-head-above  = 6pt
#let sp-head-below  = 4pt
#let sp-section     = 20pt    // between two page-2 SECTIONS — the gap that lands above
                              // a labelled rule. It was 10pt against an sp-entry-rich
                              // of 9.5pt: a 5% step, so the boundary between OPEN
                              // SOURCE and what came before it was no larger than the
                              // boundary between two open-source entries, and the
                              // section rule was doing the work of the space alone.
                              // 110% over sp-entry-rich now — the largest step in the
                              // document, which is right, because it is the boundary
                              // on page 2 that separates two SUBJECTS rather than two
                              // entries about one. Page 1 has one such boundary too
                              // since experience was split; it is sp-section-p1, and
                              // it is deliberately smaller. See the note there.
                              //
                              // Page 2 nests three levels — line, entry, section — so
                              // the top one has to be unmistakable or the page reads
                              // as one undifferentiated list. Costed at 4 boundaries
                              // (see main.typ): ~3.5mm each off columns 2 and 3, which
                              // the education tightening above more than paid for.
                              //
                              // NOTE this does not stack with sp-head-above. Both are
                              // weak, so a section boundary is max(15, 8) = 15pt, not
                              // 23pt. Raising sp-head-above below 15pt buys nothing;
                              // above it, it silently becomes the value in force
                              // everywhere and this constant stops meaning anything.
#let sp-skill       = 5.5pt   // between skill rows. This was 4pt against a
                              // col-leading of 3.84pt — a 4% step, which fails
                              // the rhythm rule at the top of this block: a
                              // multi-line skill row merged into the row under
                              // it, and five of the twelve rows are multi-line.
                              // The old note argued the hanging indent bound a
                              // wrapped row so the gap could stay small. It
                              // binds the row to ITSELF; it says nothing about
                              // where the row ends. Now 43% over the leading.
// Page-2 columns run on a tighter leading than page 1: the measure is half as
// wide, so lines are short and need less vertical separation to stay legible.
// This is also what pays for the columns running at full fs-body — 8pt in a
// 90mm column is ~1.48 line-height here, still comfortable, and leading is far
// less perceptible across a page turn than size is.
#let col-leading    = 0.48em

// Left metadata gutter on page 1. Sized so "Nov 2021 – Aug 2023" sets on one
// line at fs-meta: 19 glyphs x 0.6em advance x 6.6pt ≈ 26.5mm.
#let gutter = 30mm

// The page-2 analogue of that gutter, for the sections that lead with a year.
// Page 1 sets identifying metadata in a COLUMN; page 2 used to set the same
// class of thing inline and let the paragraph wrap back underneath it, so the
// second line of an achievement returned under "2019" instead of under the
// event. A hanging indent buys the column without a grid, which matters: a grid
// would top-align a 6.6pt year against 8pt prose and break the shared baseline
// the inline form gets for free. Four digits at the mono advance, plus the
// 0.6em of the paragraph's own em that separates year from text.
#let year-indent = 4 * 0.6 * fs-meta + 0.6 * fs-body

// ----- Helpers ---------------------------------------------------------------

// En-dash rather than the old ASCII "->": JetBrains Mono has U+2013, so this no
// longer risks a serif fallback glyph, and a range is not an arrow.
#let dash-dates(s) = s.replace(" - ", " – ").replace(" -- ", " – ")

// How long a role lasted, DERIVED from `dates` rather than stored beside it.
// A second field would be a second source of truth for one fact, and the one
// that drifts is always the derived one — data/experience.yaml already carries
// nine date ranges and nobody re-does the arithmetic when one is corrected.
//
// COUNTED INCLUSIVELY: both endpoint months count, so "Mar 2020 – Mar 2021" is
// 1 yr 1 mo rather than 1 yr. That is not a rounding preference, it is the
// convention LinkedIn uses, and this is the CV a reader is most likely to hold
// against a LinkedIn profile. Matching an exclusive count there would read as an
// error in one document or the other.
//
// "Present" resolves against the BUILD date, which means these values tick up on
// their own — the current role gains a month every month CI runs. That is the
// point: a hardcoded tenure is wrong the month after it is written. It does mean
// two builds of the same commit can differ, so this is the one thing in the
// document that isn't reproducible from the repository alone.
#let month-index = (
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
)

#let tenure(dates) = {
  let ends = dates.split(" - ").map(p => p.trim())
  let month-year(s) = {
    let p = s.split(" ")
    (year: int(p.at(1)), month: month-index.at(p.at(0)))
  }
  let start = month-year(ends.at(0))
  let end = if ends.at(1) == "Present" {
    let t = datetime.today()
    (year: t.year(), month: t.month())
  } else { month-year(ends.at(1)) }

  let months = (end.year - start.year) * 12 + (end.month - start.month) + 1
  let years = calc.div-euclid(months, 12)
  let rest = calc.rem-euclid(months, 12)
  // Abbreviated ("yr", "mo"), because this line sets in the 30mm gutter beside
  // "Nov 2021 – Aug 2023", and "1 year 10 months" is 16 glyphs against that
  // line's 19 — it would read as a second date range rather than as a gloss on
  // the one above it. Singulars are spelled out because "1 yrs" is just wrong.
  let plural(n, unit) = str(n) + " " + unit + if n == 1 { "" } else { "s" }
  if years == 0 { plural(rest, "mo") }
  else if rest == 0 { plural(years, "yr") }
  else { plural(years, "yr") + " " + plural(rest, "mo") }
}

// Evaluate Typst markup embedded in YAML (e.g. `#super[th]`). This is markup
// eval, not code eval, and every string originates in our own data/ dir.
#let render-md(s) = eval(s, mode: "markup")

#let split-on(s, sep) = if s == none { () } else {
  s.split(sep).map(p => p.trim()).filter(p => p.len() > 0)
}

// A dotted token run: "FastAPI · Python · React". `sep` is tightenable for runs
// that must hold one line — at 0.6em per glyph a wide separator costs real
// millimetres, and a wrapped run in the page footer overflows the page.
//
// The default fill is `mute` because the run is only sometimes a technology
// list; every technology caller passes `stack` explicitly. Defaulting to `stack`
// would have been fewer characters and a worse comment, since the footer's
// interests and who_am_i rows are the CONTENT of their line rather than an
// annotation on one, and shouldn't be dimmed to the annotation tier.
#let tokens(items, size: fs-meta, fill: mute, sep: "  ·  ") = {
  if items.len() == 0 { return }
  text(font: mono, size: size, fill: fill, items.join(sep))
}

// Links get an explicit rule; the page-level `show link` rule is a no-op, so
// without this a DOI-linked title is indistinguishable from an unlinked one.
// The stroke is `separator`, not `hair`: this underline's whole job is to be
// perceived, and `hair` (1.9:1, and 1.5:1 when this was written) is the one
// value in the palette that guarantees it isn't — which left the comment above
// describing an affordance the code did not actually provide.
#let ext-link(url, body) = link(url, underline(
  body,
  stroke: 0.4pt + separator,
  offset: 1.6pt,
  evade: true,
))

// ----- Section headers -------------------------------------------------------
// ONE form, both pages. Page 1 used to hang its label in the 30mm metadata
// gutter and page 2 set it inline, on the reasoning that page 2's narrow columns
// can't spare 30mm. That held while page 1 had exactly one section: "EXPERIENCE"
// is ten glyphs and fits the gutter with room.
//
// Splitting experience broke it. At fs-meta with 0.12em tracking a glyph advances
// 0.72em x 6.6pt = 4.75pt, so "PROFESSIONAL EXPERIENCE" wants 23 x 4.75 = 109pt
// = 38.6mm and "RESEARCH EXPERIENCE" wants 32mm — both past the 30mm gutter, so
// both wrapped to two lines. Measured, that wrap cost 16.9pt of page-1 height
// across the two headers, on a page whose whole deficit was 20.4pt. Widening the
// gutter to fit is the wrong direction: it comes straight out of the 145mm
// content measure, and every millimetre there wraps bullets, which is the pool
// this page is already shortest on.
//
// So the gutter form is gone rather than kept for one caller. What replaced it
// is what page 2 already used, and the result is a document with one section
// header instead of two — the label sets on one line whatever it says, and
// renaming a section can no longer silently cost a page.
//
// What is lost is real and worth naming: the gutter form hung the label OUT of
// the content column, clear of the entry titles, and aligned it with the dates
// below it. Inline, it sits at the left edge of the measure above right-aligned
// gutter metadata, which agrees with nothing in particular. The rule is what
// carries the boundary instead, and it runs the header's block width less the
// label — ~139mm of the 180mm measure on page 1, against ~105mm under the page-2
// skills band and ~40mm in a 56mm column. So page 1's header is still the
// loudest in the document, which is what the section split needs it to be.
//
// Absolute sizes, so a header never inherits the caller's size.

#let head-label(title) = text(
  font: mono, size: fs-meta, weight: 700,
  fill: signal, tracking: 0.12em, upper(title),
)

#let cv-section(title, below: sp-head-below) = {
  v(sp-head-above, weak: true)
  block(width: 100%, breakable: false, grid(
    columns: (auto, 1fr),
    column-gutter: 2.5mm,
    align: (left + horizon, left + horizon),
    head-label(title),
    box(width: 100%, height: 0.5pt, fill: hair),
  ))
  v(below, weak: true)
}

// A page-1 row: metadata right-aligned in the gutter, content in the measure.
#let gutter-row(meta, content) = grid(
  columns: (gutter, 1fr),
  column-gutter: 5mm,
  align: (right + top, left + top),
  meta, content,
)

// Marker + body. THE RULE: `›` marks a bullet INSIDE an entry. An entry itself
// is anchored by what it already has — a 700-weight `bright` title, or the year
// column it leads with. So this is page-1 experience bullets and nothing else.
//
// It used to wrap every list item in the document: all eight experience bullets
// AND all thirty-odd page-2 entries. A marker that marks everything marks
// nothing, and each one spent 3mm of an 85.5mm column to say so. Handing that
// 3mm back to the measure is what pays for the skills value column.
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
  text(size: fs-display, weight: 700, fill: bright, tracking: -0.015em,
    personal.first_name + " " + personal.last_name)
  // The one surviving nod to the old theme: a terminal cursor, kept because it
  // is a single glyph rather than a whole simulated application.
  h(2.5pt)
  text(size: fs-display, weight: 700, fill: signal, "_")

  v(5pt)
  // Parenthesised: Typst ends a statement at a newline unless it is bracketed,
  // so an unwrapped multi-line method chain silently splits in two and the tail
  // renders as literal source text.
  let roles = (
    personal.roles_casual
      .map(r => text(fill: body, r))
      .join(text(fill: separator, "  /  "))
  )
  text(font: mono, size: fs-body, roles)

  // 5pt above the rule rather than 8pt, so the rule sits centred between the role
  // line and the contact strip instead of hanging closer to the strip. Reclaimed
  // for page 1's budget; the symmetry is a side effect worth having.
  v(5pt)
  box(width: 100%, height: 0.8pt, fill: hair)
  v(5pt)

  // Contact block: two stacked rows of contact detail on the left, the site on
  // the right, as ONE grid rather than the two full-width rows this used to be.
  //
  // The homepage previously sat as a right-aligned cell inside the contact
  // strip at fs-meta in signal — the same size and weight as the phone number
  // beside it. Colour alone doesn't say "there is more of this elsewhere", so
  // nothing in the document told a reader the site was worth opening. It is now
  // the one piece of deliberate emphasis in the header, and the grid exists to
  // give it a column of its own instead of the tail of a line.
  let email = personal.emails.at(0).address
  let tel = personal.phone.replace(" ", "").replace("(", "").replace(")", "")
  grid(
    columns: (1fr, auto),
    column-gutter: 6mm,
    align: (left + horizon, right + horizon),
    {
      text(font: mono, size: fs-meta, fill: mute)[
        #link("mailto:" + email, email)
        #h(0.7em)·#h(0.7em) #link("tel:" + tel, personal.phone)
        #h(0.7em)·#h(0.7em) #personal.location
      ]

      v(3.5pt)

      // Profile links, inline rather than as a sidebar column. `homepage` is
      // filtered out because it has its own treatment opposite; listing it
      // here too would spend the emphasis twice.
      let entries = personal.profiles_casual
        .filter(slug => slug != "homepage")
        .map(slug => {
          let p = personal.profile_entries.at(slug)
          box(link(p.url, {
            text(size: fs-meta, fill: signal, profile-icon(slug))
            h(0.4em)
            text(font: mono, size: fs-meta, fill: body, p.label)
          }))
        })
      entries.join(text(font: mono, size: fs-meta, fill: separator, "   ·   "))
    },
    // The emphasis is carried by SIZE, WEIGHT and COLOUR — nothing else. An
    // earlier cut boxed this in an outlined pill and led into it with a
    // "projects · papers · talks" qualifier. Both were foreign to the theme:
    // the document contains exactly one container, the profile panel, and that
    // is a lifted *surface* rather than an outline, so a stroked box read as
    // borrowed UI. The rules up top already say hierarchy comes from size,
    // weight and space; the pill was a fourth mechanism invented for one item.
    //
    // What is left still steps hard off its surroundings: fs-body against the
    // fs-meta metadata on every side (a 21% size step), weight 700 against
    // 400, and `signal` against `mute`. The globe repeats the icon-then-label
    // idiom of the profile row directly below, so it reads as native to the
    // header rather than bolted onto it.
    //
    // Widths are no longer tight — this cell is ~22mm against the contact
    // strip's ~95mm in a 180mm measure — but the strip must still hold ONE
    // line. Anything added here comes out of its slack, and when it runs out
    // the strip is what wraps, orphaning "Sri Lanka" on a line of its own.
    link(personal.homepage.url, {
      text(size: fs-meta, fill: signal, profile-icon("homepage"))
      h(0.5em)
      text(font: mono, size: fs-body, weight: 700, fill: signal,
        personal.homepage.label)
    }),
  )
}

// The one lifted surface in the document, so the summary reads before anything
// else on the page.
#let render-profile(personal) = block(
  width: 100%,
  fill: raised,
  // The longer profile copy needs one more line than the original summary.
  // Its panel already separates itself through fill, so a tighter vertical
  // inset preserves the hierarchy while keeping all experience on page 1.
  // The horizontal inset remains roomy and unchanged.
  inset: (x: 5mm, y: 1.5mm),
  radius: 1.5pt,
  // Slightly below the 8pt body size so the longer summary does not displace
  // the final research entry from page 1.
  text(size: 7.6pt, fill: bright, personal.about_me),
)

// `interests` and `who_am_i` were vertical sidebar lists. As single dotted runs
// they keep the personality of the casual variant at a fraction of the space,
// and pinned to the foot of the last page they close the document rather than
// competing with experience for page 1.
// These rows must hold ONE line each — a second line pushes the footer past
// the bottom margin and off the sheet. Rather than give them a sixth font size
// to fit, the room is bought back from the label column, which is what actually
// had slack. The arithmetic at fs-meta, JetBrains Mono, 0.6em advance:
//
//   label  "INTERESTS"  9 glyphs x 0.64em (0.6 + tracking) x 6.6pt = 13.4mm
//   value  116 glyphs (101 chars + 5 separators) x 0.6em x 6.6pt   = 162.1mm
//   measure  180mm - 14mm label - 2mm gutter                       = 164.0mm
//
// ~2mm of slack, so one more interest in personal.yaml will wrap it. If that
// happens, grow the page-2 bottom margin in main.typ to match.
#let personal-row(label, items) = grid(
  columns: (14mm, 1fr),
  column-gutter: 2mm,
  align: (left + top, left + top),
  text(font: mono, size: fs-meta, weight: 700, fill: signal,
    tracking: 0.04em, label),
  tokens(items, size: fs-meta, sep: " · "),
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

// `title` is a parameter because page 1 now carries TWO of these — professional
// and research — split on the `category` field the academic variant has always
// split on. The casual variant used to run them mixed and strictly
// chronological, which is the honest shape for a document read top-to-bottom in
// one pass; two sections is the better one for a reader scanning for a
// particular kind of work, and it costs page-1 height (see sp-section-p1).
#let make-experience(items, title: "Experience") = {
  set text(size: fs-body)
  // Experience entries carry dense role and metadata lines, so give their
  // section labels a slightly clearer pause than the compact page-2 sections.
  cv-section(title, below: sp-head-below + 2pt)
  for (i, item) in items.enumerate() {
    let bullets = bullets-for(item, "casual")
    gutter-row(
      {
        text(font: mono, size: fs-meta, fill: body, dash-dates(item.dates))
        linebreak()
        v(1pt)
        text(font: mono, size: fs-meta, fill: mute,
          field(item, "location", "casual"))
        // Third line, on a bare linebreak where the location got a 1pt nudge.
        // The nudge marks a change of tier — `body` dates above, `mute`
        // metadata below — and there is no such change here: a tenure and a
        // location are the same class of thing, so they set as one block.
        //
        // Costs nothing in page-1 height, which is the only reason it can be
        // here at all: page 1 is FULL — last ink lands at 286.6mm against a
        // text area that ends at 286mm — so a line that cost anything would
        // cost a role. It doesn't, because the gutter is a PARALLEL column and
        // a grid row is max(gutter, content). Measured in the built PDF, the
        // content side wins on all nine rows, by 2.2mm on the six single-bullet
        // ones and far more elsewhere; three lines of 6.6pt mono still sit
        // inside a 9.6pt title over one wrapped bullet and its technology run.
        //
        // 2.2mm is about one and a half lines of this gutter, so a FOURTH line
        // here is not free and would push page 1 over. That is the budget this
        // sits in, not the entry gaps below.
        linebreak()
        text(font: mono, size: fs-meta, fill: mute, tenure(item.dates))
      },
      {
        text(size: fs-title, weight: 700, fill: bright, field(item, "role", "casual"))
        text(size: fs-title, fill: separator, "  /  ")
        text(size: fs-title, weight: 400, fill: signal, field(item, "company", "casual"))
        if bullets.len() > 0 {
          v(sp-part-role)
          for b in bullets {
            marked({
              text(fill: body, render-md(field(b, "text", "casual")))
              let st = field(b, "stack", "casual")
              if st != none {
                block(above: sp-stack-above, below: 0pt,
                  tokens(split-on(st, ","), fill: stack))
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
// These live in 50%-width columns, so they drop the metadata gutter entirely and
// set their identifying metadata inline or on a hanging indent instead. The
// section header needs no adjusting for the measure — there is only one form now
// (see the note above cv-section), and it was always this one.

#let make-education(items) = {
  set text(size: fs-body)
  cv-section("Education")
  for (i, e) in items.enumerate() {
    block({
      text(font: mono, size: fs-meta, fill: body, dash-dates(e.dates_casual))
      // col-leading, and blocks rather than `linebreak()` + a nudge. These three
      // lines are one entry in three registers (6.6pt mono dates, 8pt bold
      // degree, 8pt institute), and the ONLY spacing that reads as "these belong
      // together" is the document's own line rhythm — the same distance two lines
      // of one sentence sit at. Anything under it (2.8pt was tried) crowds the
      // 8pt degree into the descenders of the dates; anything over it, which is
      // what `linebreak()` plus a 1–1.4pt nudge gave at 4.8–5.2pt, sets the three
      // lines nearly as far apart as two whole entries and the entry reads as
      // three.
      //
      // The nudge was the wrong lever either way: most of that gap is an 8pt
      // ascender clearing a 6.6pt descender, which no `v()` shrinks. Only
      // replacing the leading — an explicit `above` on a block — moves it, which
      // is also why this can't just go back to bare linebreaks: it would work
      // today and break the moment a size on any of these lines changes.
      //
      // The extras stay on linebreaks. They belong to the institute line the way
      // a second line of a sentence belongs to the first, and at col-leading they
      // are already exactly where this puts everything else.
      block(above: col-leading, below: 0pt,
        text(size: fs-body, weight: 700, fill: bright,
          e.at("degree_casual", default: "")))
      block(above: col-leading, below: 0pt, {
        text(fill: signal, e.institute)
        for line in e.at("extras_casual", default: ()) {
          linebreak()
          text(fill: mute, render-md(line))
        }
      })
    })
    if i + 1 < items.len() { v(sp-entry) }
  }
}

// One row per category, and ONE value column for all of them. Every width here
// is computable because JetBrains Mono advances exactly 0.6em per glyph and the
// labels are ASCII.
//
// This used to compute the hanging indent from each row's OWN label, which
// binds that row's wraps to itself and to nothing else: the `=` landed in
// twelve different places down what is the densest block on the page, so the
// one section a reader scans by structure was the one with no structure to
// scan. Setting the label in a fixed-width box fixes the `=` in a single
// channel, and the indent derived from that box makes wrapped values line up
// under the values above them.
//
// The box is measured off the LONGEST label in the data rather than a literal,
// so a new category in skills.yaml widens the column instead of silently
// overflowing its box. Right-aligned, not left: the labels then close up
// against the `=` exactly as page 1's metadata closes up against its gutter
// edge. Same grammar as the facing page, a quarter of the width.
//
// Costed: the common column is wider than most rows used before, which is paid
// for by the `›` markers this column no longer spends 3mm on.
#let make-skills(items) = {
  set text(size: fs-body)
  cv-section("Skills")
  // `category` takes the usual `_casual` override — this column is narrow and
  // wants "ml / dl" where the academic CV writes "ML / Deep Learning". `stack`
  // does NOT, and reads `s.stack` directly rather than through `field`: the two
  // CVs claim the same inventory by design (see data/skills.yaml), so a
  // `stack_casual` sitting in the data should be visibly inert, not honoured.
  let label-of(s) = lower(field(s, "category", "casual"))
  // Absolute, not em: the label sets at fs-meta but the paragraph's em is
  // fs-body, so an em-relative width would be measured against the wrong size.
  let label-w = calc.max(..items.map(s => label-of(s).len())) * 0.6 * fs-meta
  let sep-w = 3 * 0.6 * fs-meta   // " = "
  for (i, s) in items.enumerate() {
    // Code mode, not markup: in markup each source newline between the three
    // runs sets as a space, so the value started two spaces past where the
    // indent arithmetic said it did and no wrapped line ever quite aligned.
    par(hanging-indent: label-w + sep-w, {
      box(width: label-w, align(right,
        text(font: mono, size: fs-meta, weight: 700, fill: bright, label-of(s))))
      text(font: mono, size: fs-meta, fill: separator, " = ")
      tokens(split-on(s.stack, ","), fill: stack)
    })
    if i + 1 < items.len() { v(sp-skill) }
  }
}

#let make-projects(items) = {
  set text(size: fs-body)
  cv-section("Projects")
  for (i, p) in items.enumerate() {
    block({
      text(size: fs-body, weight: 700, fill: bright, field(p, "name", "casual"))
      block(above: sp-part, below: 0pt,
        tokens(split-on(field(p, "stack", "casual"), "|"), fill: stack))
      block(above: sp-part, below: 0pt,
        text(fill: body, render-md(field(p, "description", "casual"))))
    })
    if i + 1 < items.len() { v(sp-entry-rich) }
  }
}

#let make-publications(items) = {
  set text(size: fs-body)
  cv-section("Publications")
  for (i, p) in items.enumerate() {
    let title = field(p, "title", "casual")
    let venue = field(p, "venue", "casual")
    let doi = p.at("doi_url", default: none)
    let head = text(size: fs-body, weight: 700, fill: bright, title)
    block({
      par(hanging-indent: year-indent, {
        text(font: mono, size: fs-meta, fill: mute, str(p.year))
        h(0.6em)
        if doi != none { ext-link(doi, head) } else { head }
      })
      if venue != none and venue != "" {
        // Indented to the same column as the title, not to the year: the venue
        // belongs to the title above it, and hanging it under the year would
        // have put two different things in one column.
        block(above: sp-part, below: 0pt, inset: (left: year-indent),
          text(font: mono, size: fs-meta, fill: mute, venue))
      }
    })
    if i + 1 < items.len() { v(sp-entry) }
  }
}

#let make-open-source(items) = {
  set text(size: fs-body)
  cv-section("Open Source")
  for (i, o) in items.enumerate() {
    let url = o.at("name_url", default: none)
    let head = text(size: fs-body, weight: 700, fill: bright, field(o, "name", "casual"))
    block({
      if url != none { ext-link(url, head) } else { head }
      block(above: sp-part, below: 0pt,
        tokens(split-on(field(o, "stack", "casual"), ","), fill: stack))
      block(above: sp-part, below: 0pt,
        text(fill: body, render-md(field(o, "description", "casual"))))
    })
    if i + 1 < items.len() { v(sp-entry-rich) }
  }
}

// Self-suppresses when nothing opts into `casual`, so emptying the section in
// data/ doesn't strand a bare header.
#let make-certifications(items) = {
  if items.len() == 0 { return }
  set text(size: fs-body)
  cv-section("Certifications")
  for (i, c) in items.enumerate() {
    par(hanging-indent: year-indent, {
      text(font: mono, size: fs-meta, fill: mute, str(c.year))
      h(0.6em)
      text(fill: bright, render-md(field(c, "name", "casual")))
      text(fill: mute, " · " + c.institute)
    })
    if i + 1 < items.len() { v(sp-entry-flat) }
  }
}

#let make-achievements(items) = {
  set text(size: fs-body)
  cv-section("Achievements")
  for (i, a) in items.enumerate() {
    let event = render-md(a.at("event_casual", default: a.event))
    let place = a.at("place_casual", default: "")
    par(hanging-indent: year-indent, {
      text(font: mono, size: fs-meta, fill: mute, str(a.year))
      h(0.6em)
      text(fill: bright, event)
      if place != "" {
        // `body`, not `signal`. The placing is a qualifier on the event beside
        // it, and accenting it inverted that — the eye landed on "(1st place)"
        // before the thing that was won. It is also neither an organization,
        // a section label, nor a link, so it fails the accent rule up top.
        text(fill: body, [ (#render-md(place))])
      }
    })
    if i + 1 < items.len() { v(sp-entry-flat) }
  }
}

// ----- Page furniture --------------------------------------------------------
// A page number is load-bearing on a stapled two-pager. Nothing else is.

#let page-number-text = context {
  let cur = counter(page).get().first()
  let tot = counter(page).final().first()
  text(font: mono, size: fs-meta, fill: mute)[#cur / #tot]
}

#let page-number = align(right, page-number-text)
