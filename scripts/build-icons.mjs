import sharp from "sharp"

// Downscales the [i] mark into the sizes browsers actually ask for.
//
// The site used to serve the 2000x2000 master as its favicon: 25.6 kB fetched
// on every first visit to render into 16 or 32 CSS pixels, on a page whose
// entire HTML and CSS come to 5 kB gzipped. The master stays in src/assets as
// the source of truth and stops being shipped.
//
// Run with `pnpm build:icons` and commit the output. Deliberately outside
// `pnpm build`, for the same reason build-og.mjs is: CI never has to render
// with sharp, it just copies what is already in public/. Re-run it only when
// the mark itself changes.
const SOURCE = "src/assets/favicon.png"

const OUTPUTS = [
    // What browsers use for the tab. 32 covers the 2x tab strip and Windows
    // taskbar; the browser downsamples to 16 itself.
    { file: "public/favicon-32.png", size: 32 },
    // iOS home screen. Apple applies its own mask and corner radius, and
    // composites on white if the icon is transparent — the mark already carries
    // enough padding for that crop.
    { file: "public/apple-touch-icon.png", size: 180 },
]

for (const { file, size } of OUTPUTS) {
    // The master is RGBA over an opaque white field. Flattening drops the alpha
    // channel rather than carrying four bytes per pixel for a mark that never
    // uses the fourth, and it guarantees the same rendering against dark browser
    // chrome that the master already gets.
    const info = await sharp(SOURCE)
        .resize(size, size, { fit: "contain", background: "#ffffff" })
        .flatten({ background: "#ffffff" })
        .png({ compressionLevel: 9, palette: true })
        .toFile(file)

    console.log(`wrote ${file}`, `${info.width}x${info.height}`, `${info.size} bytes`)
}
