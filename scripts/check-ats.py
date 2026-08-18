#!/usr/bin/env python3
"""Assert that a CV PDF's text layer survives naive extraction.

Why this exists: `pdftotext` (poppler) reconstructs word boundaries from font
metrics and reads every variant of this CV correctly. The pdfminer/pypdf family
does not — it inserts a space wherever a glyph-positioning offset crosses a
threshold, so a font with dense kern pairs comes out shredded:

    'L ead ML engineer and published r esear cher with 6+ y ears o f e xperienc e'

A keyword matcher sees `r esear cher`, not "researcher". The failure is
invisible on screen and invisible to pdftotext, which is exactly why it needs a
test rather than an eyeball.

Usage:
    python3 scripts/check-ats.py public/cv/ats-cv.pdf
    python3 scripts/check-ats.py --expect-fail public/cv/casual-cv.pdf

Exits non-zero when a check fails (or, under --expect-fail, when they all pass —
a check that cannot fail on known-bad input is testing nothing).
"""

import argparse
import re
import sys

try:
    import pypdf
except ImportError:
    sys.exit("pypdf is required: pip install pypdf")

# Phrases that must survive intact. Drawn from about_me, the current role, the
# skills block, and education — i.e. spread across every font size and section
# the document uses, so a regression in any one of them trips this.
REQUIRED = [
    "Mudannayake",
    "published researcher",
    "years of experience",
    "backend architecture",
    "computer vision",
    "reinforcement learning",
    "Lead ML Engineer",
    "ParadigmAI",
    "machine-learning systems",
    "PostgreSQL",
    "University of Moratuwa",
    "Google Summer of Code",
]

# Known defects from the casual variant, none of which may appear here.
FORBIDDEN = [
    ("private-use glyphs (Font Awesome icons in the text layer)", re.compile("[\ue000-\uf8ff]")),
    ("decorative underscore fused to the surname", re.compile(r"Mudannayake_")),
    ("page number fused to a section heading", re.compile(r"\d\s*/\s*\d[A-Z]{3,}")),
    ("unstripped #super markup", re.compile(r"#super")),
]


def extract(path):
    """Join every page into one whitespace-normalised string.

    Line breaks are collapsed to single spaces because a word wrapped across two
    lines is legitimate. Spurious *intra*-word spaces survive that collapse,
    which is the whole point.
    """
    reader = pypdf.PdfReader(path)
    text = " ".join(page.extract_text() for page in reader.pages)
    return re.sub(r"\s+", " ", text)


def find_shredding(text):
    """Return lowercase single-letter tokens, which effectively never occur in
    clean English prose apart from 'a'. Uppercase singletons are excluded: 'C'
    and 'R' are real entries in the skills list."""
    tokens = re.findall(r"(?<![\w'-])([a-z])(?![\w'-])", text)
    return [t for t in tokens if t != "a"]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf")
    ap.add_argument(
        "--expect-fail",
        action="store_true",
        help="invert the exit code; use to prove the check catches a known-bad PDF",
    )
    args = ap.parse_args()

    text = extract(args.pdf)
    failures = []

    missing = [p for p in REQUIRED if p.lower() not in text.lower()]
    for phrase in missing:
        failures.append(f"missing or shredded: {phrase!r}")

    for label, pattern in FORBIDDEN:
        hit = pattern.search(text)
        if hit:
            failures.append(f"{label}: found {hit.group(0)!r}")

    strays = find_shredding(text)
    if len(strays) > 3:
        sample = " ".join(sorted(set(strays))[:12])
        failures.append(f"{len(strays)} stray single letters (word shredding): {sample}")

    print(f"{args.pdf}: {len(text)} chars extracted, {len(REQUIRED) - len(missing)}/{len(REQUIRED)} phrases intact")
    for f in failures:
        print(f"  FAIL  {f}")

    passed = not failures
    if args.expect_fail:
        if passed:
            print("  FAIL  expected this PDF to fail the check, but it passed")
            return 1
        print("  OK    failed as expected — the check has teeth")
        return 0

    print("  OK    all checks passed" if passed else f"  {len(failures)} check(s) failed")
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
