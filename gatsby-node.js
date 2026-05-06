const fs = require("fs")
const path = require("path")
const yaml = require("js-yaml")

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
        const fullPath = path.join(__dirname, "data", file)
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
