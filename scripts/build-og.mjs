import sharp from "sharp"

const W = 1200
const H = 630
const PANEL_X = 800
const PANEL_W = W - PANEL_X

const MONO = "Roboto Mono, Menlo, DejaVu Sans Mono, Liberation Mono, Courier New, monospace"

const photo = await sharp("src/assets/oim.png")
    .resize({ width: PANEL_W, fit: "inside" })
    .toBuffer({ resolveWithObject: true })

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="${PANEL_X}" y="0" width="${PANEL_W}" height="${H}" fill="#f1f1f1"/>
  <rect x="0" y="0" width="14" height="${H}" fill="#1772d0"/>
  <text x="84" y="248" font-family="${MONO}" font-size="60" font-weight="700" fill="#424242">Oshan Mudannayake</text>
  <text x="84" y="312" font-family="${MONO}" font-size="29" fill="#6b6b6b">AI Researcher  /  ML Engineer</text>
  <rect x="84" y="360" width="120" height="3" fill="#1772d0"/>
  <text x="84" y="438" font-family="${MONO}" font-size="24" fill="#6b6b6b">Reinforcement Learning  |  Machine Learning</text>
  <text x="84" y="476" font-family="${MONO}" font-size="24" fill="#6b6b6b">Game Theory  |  Computer Vision</text>
  <text x="84" y="556" font-family="${MONO}" font-size="26" font-weight="700" fill="#1772d0">ivantha.com</text>
</svg>`

await sharp(Buffer.from(svg))
    .composite([{ input: photo.data, left: PANEL_X, top: H - photo.info.height }])
    .png()
    .toFile("public/og.png")

console.log("wrote public/og.png", photo.info.width, "x", photo.info.height)
