const fs = require("fs")
const path = require("path")
const yaml = require("js-yaml")

exports.createPages = ({ actions: { createRedirect } }) => {
    const moves = [
        ["/mudannayake2021kmatrix.pdf", "/papers/mudannayake2021kmatrix.pdf"],
        ["/mudannayake2022exploring.pdf", "/papers/mudannayake2022exploring.pdf"],
        ["/samaranayake2023detecting.pdf", "/papers/samaranayake2023detecting.pdf"],
        ["/mloed_slasscom_poster.png", "/posters/mloed_slasscom_poster.png"],
    ]
    for (const [from, to] of moves) {
        createRedirect({ fromPath: from, toPath: to, isPermanent: true, redirectInBrowser: true })
    }
}

// gatsby-transformer-yaml mishandles top-level lists of plain strings (it
// indexes each string by character into _0, _1, …). For the four YAMLs that
// are pure string lists, register a custom node type per file with a single
// `lines: [String]` field instead.
const stringListYamls = [
    { file: "workshops.yaml", typeName: "WorkshopsList" },
    { file: "mentoring.yaml", typeName: "MentoringList" },
    { file: "volunteering.yaml", typeName: "VolunteeringList" },
    { file: "scholarships.yaml", typeName: "ScholarshipsList" },
]

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions
    for (const { file, typeName } of stringListYamls) {
        const fullPath = path.join(__dirname, "cv", "data", file)
        const raw = fs.readFileSync(fullPath, "utf8")
        const parsed = yaml.load(raw)
        if (!Array.isArray(parsed)) continue
        const lines = parsed.filter((x) => typeof x === "string")
        const data = { lines }
        createNode({
            ...data,
            id: createNodeId(`cv-list-${file}`),
            internal: {
                type: typeName,
                contentDigest: createContentDigest(data),
            },
        })
    }
}
