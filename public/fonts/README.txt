IBM Plex Mono and IBM Plex Sans — vendored web fonts
====================================================

Licence: SIL Open Font License 1.1. The full text is in OFL.txt beside this
file. These fonts are NOT covered by the repository's own LICENSE.

  Copyright © 2017 IBM Corp. with Reserved Font Name "Plex"


Why these live here
-------------------
The site used to load them from fonts.googleapis.com with a render-blocking
<link>. That cost a cold visitor two connection setups it could not begin until
the <head> had been parsed — DNS + TCP + TLS to googleapis for a stylesheet,
then the same again to gstatic before a single glyph could start downloading.
Served from this directory the files ride the connection that already delivered
the HTML, and src/layouts/Layout.astro preloads the two upright Mono cuts so
they start before the stylesheet that references them has even been parsed.


Provenance
----------
These four files are Google Fonts' own `latin` slices, downloaded unmodified
from fonts.gstatic.com. They are byte-identical to what the site was already
pulling over the network, so switching to them changed nothing about how the
page renders — that was the point of taking Google's bytes rather than
rebuilding from upstream sources.

  ibm-plex-mono-latin-400-normal.woff2    10052 B   ibmplexmono/v20/-F63fjpt…
  ibm-plex-mono-latin-600-normal.woff2    10120 B   ibmplexmono/v20/-F6qfjpt…
  ibm-plex-mono-latin-400-italic.woff2    11568 B   ibmplexmono/v20/-F6pfjpt…
  ibm-plex-sans-latin-wght-normal.woff2   40240 B   ibmplexsans/v23/zYXzKVEl…

The Sans file is the variable font. Its wght axis spans the full 100–700 and
serves both weights the site uses, which is why src/styles/_fonts.scss declares
it once with a weight range instead of twice. Google's API reported it as two
@font-face blocks at 400 and 600 only because the request named those two
instances; asking for `wght@100..700` returns this same file with
`font-weight: 100 700`.

There is no Sans italic here and there was none before — the old request
carried no `ital` axis for Sans, so the browser has always synthesised the
oblique used by the emphasis in data/projects.yaml. Adding a fifth file would
change how the site looks.

Refetching is manual; there is no build step. The URLs come from the css2
endpoint. If a byte count above no longer matches, the upstream file rotated —
re-derive the URLs rather than assuming.


Do NOT run a subsetter over these files
---------------------------------------
"Plex" is a Reserved Font Name under OFL §3, and a Modified Version may not
carry a reserved name. Redistributing Google's slices as they are is
redistribution, not modification, which is what every CDN mirror already does.
Cutting our own subset would make this repository the modifier and force a
rename of the family everywhere it appears. If a glyph is ever missing, take a
different upstream slice — do not carve one.

Two glyphs already fall outside the latin slice and resolve through the
fallback stack instead: → (U+2192, in the research, news and open-source
entries) and ≤ (U+2264, in projects). That was equally true under Google's
hosting; it is not a regression introduced here.
