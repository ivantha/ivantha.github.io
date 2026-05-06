typst_flags := "--root . --font-path fonts"
out := "build"

default: academic casual

academic:
    mkdir -p {{out}}
    typst compile {{typst_flags}} variants/academic/main.typ {{out}}/academic-cv.pdf

casual:
    mkdir -p {{out}}
    typst compile {{typst_flags}} variants/casual/main.typ {{out}}/casual-cv.pdf

watch-academic:
    typst watch {{typst_flags}} variants/academic/main.typ {{out}}/academic-cv.pdf

watch-casual:
    typst watch {{typst_flags}} variants/casual/main.typ {{out}}/casual-cv.pdf

clean:
    rm -rf {{out}}
