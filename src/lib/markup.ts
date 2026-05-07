const ITALIC_QUOTED = /_"([^"]+)"_/g
const ITALIC_PLAIN = /(?<![A-Za-z0-9])_([^_\n]+?)_(?![A-Za-z0-9])/g
const SUPER = /#super\[([^\]]+)\]/g
const LINK_TOKEN = /\[([^\]\n]+)\]/g
const ORG_REF = /\[\[org:([^\]]+)\]\]/g
const PERSON_REF = /\[\[person:([^\]]+)\]\]/g
const MD_LINK = /\[([^\]]+)\]\(([^)]+)\)/g

export type Token =
    | { type: "text"; value: string }
    | { type: "italic"; value: string }
    | { type: "italic-quoted"; value: string }
    | { type: "sup"; value: string }
    | { type: "link"; label: string; href: string }
    | { type: "org"; key: string }
    | { type: "person"; key: string }

type Part = Token | string

function splitOn(input: string, regex: RegExp, map: (capture: string) => Token): Part[] {
    const out: Part[] = []
    let last = 0
    for (const match of input.matchAll(regex)) {
        const idx = match.index ?? 0
        if (idx > last) out.push(input.slice(last, idx))
        out.push(map(match[1]))
        last = idx + match[0].length
    }
    if (last < input.length) out.push(input.slice(last))
    return out.length ? out : [input]
}

function applySingleCapture(parts: Part[], regex: RegExp, map: (capture: string) => Token): Part[] {
    return parts.flatMap((p) => (typeof p === "string" ? splitOn(p, regex, map) : [p]))
}

function finalize(parts: Part[]): Token[] {
    return parts.map((p) => (typeof p === "string" ? { type: "text" as const, value: p } : p))
}

export function tokenize(input: string | null | undefined, links?: Record<string, string>): Token[] {
    if (input == null) return []
    let parts: Part[] = [String(input)]
    parts = applySingleCapture(parts, ITALIC_QUOTED, (value) => ({ type: "italic-quoted", value }))
    parts = applySingleCapture(parts, ITALIC_PLAIN, (value) => ({ type: "italic", value }))
    parts = applySingleCapture(parts, SUPER, (value) => ({ type: "sup", value }))
    if (links) {
        parts = applySingleCapture(parts, LINK_TOKEN, (label) => ({
            type: "link",
            label,
            href: links[label] ?? `#missing-${label}`,
        }))
    }
    return finalize(parts)
}

export function tokenizeNews(input: string): Token[] {
    let parts: Part[] = [input]
    parts = applySingleCapture(parts, ORG_REF, (key) => ({ type: "org", key }))
    parts = applySingleCapture(parts, PERSON_REF, (key) => ({ type: "person", key }))
    parts = parts.flatMap((p) => {
        if (typeof p !== "string") return [p]
        const out: Part[] = []
        let last = 0
        for (const match of p.matchAll(MD_LINK)) {
            const idx = match.index ?? 0
            if (idx > last) out.push(p.slice(last, idx))
            out.push({ type: "link", label: match[1], href: match[2] })
            last = idx + match[0].length
        }
        if (last < p.length) out.push(p.slice(last))
        return out.length ? out : [p]
    })
    return finalize(parts)
}
