import sharp from "sharp"

const W = 1200
const H = 630
const PANEL_X = 800
const PANEL_W = W - PANEL_X

const MONO = "IBM Plex Mono, Menlo, DejaVu Sans Mono, Liberation Mono, Courier New, monospace"

// Mirrors src/styles/_variables.scss. This card is rendered by sharp rather
// than the browser, so the palette cannot be shared — keep the two in step by
// hand when the theme moves.
const PAPER = "#fbfaf7"
const SUNKEN = "#f2efe8"
const INK_STRONG = "#17191c"
const INK_MUTED = "#5c5a52"
const LINK = "#1a5fb4"
const ACCENT = "#9a7d2e" // non-text only, same as the site

const photo = await sharp("src/assets/oim.png")
    .resize({ width: PANEL_W, fit: "inside" })
    .toBuffer({ resolveWithObject: true })

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect x="${PANEL_X}" y="0" width="${PANEL_W}" height="${H}" fill="${SUNKEN}"/>
  <rect x="0" y="0" width="14" height="${H}" fill="${ACCENT}"/>
  <text x="84" y="248" font-family="${MONO}" font-size="60" font-weight="600" fill="${INK_STRONG}">Oshan Mudannayake</text>
  <text x="84" y="312" font-family="${MONO}" font-size="29" fill="${INK_MUTED}">AI Researcher  /  ML Engineer</text>
  <rect x="84" y="360" width="120" height="3" fill="${ACCENT}"/>
  <text x="84" y="438" font-family="${MONO}" font-size="24" fill="${INK_MUTED}">Reinforcement Learning  |  Machine Learning</text>
  <text x="84" y="476" font-family="${MONO}" font-size="24" fill="${INK_MUTED}">Game Theory  |  Computer Vision</text>
  <text x="84" y="556" font-family="${MONO}" font-size="26" font-weight="600" fill="${LINK}">ivantha.com</text>
</svg>`

await sharp(Buffer.from(svg))
    .composite([{ input: photo.data, left: PANEL_X, top: H - photo.info.height }])
    .png()
    .toFile("public/og.png")

console.log("wrote public/og.png", photo.info.width, "x", photo.info.height)
