import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const SUPER = /#super\[([^\]]+)\]/g
const ITALIC_QUOTED = /_"([^"]+)"_/g
const LINK_TOKEN = /\[([^\]\n]+)\]/g

const splitOn = (input, regex, render) => {
    const out = []
    let last = 0
    let i = 0
    for (const match of String(input).matchAll(regex)) {
        if (match.index > last) out.push(input.slice(last, match.index))
        out.push(<React.Fragment key={i++}>{render(match[1])}</React.Fragment>)
        last = match.index + match[0].length
    }
    if (last < input.length) out.push(input.slice(last))
    return out
}

const flatMap = (parts, regex, render) =>
    parts.flatMap((p) => {
        if (typeof p !== "string") return [p]
        const sub = splitOn(p, regex, render)
        return sub.length ? sub : [p]
    })

export const renderTypstMd = (input) => {
    if (input == null) return null
    let parts = [String(input)]
    parts = flatMap(parts, ITALIC_QUOTED, (text) => <em>“{text}”</em>)
    parts = flatMap(parts, SUPER, (text) => <sup>{text}</sup>)
    return <>{parts.map((p, i) => <React.Fragment key={i}>{p}</React.Fragment>)}</>
}

export const renderWithLinks = (input, links) => {
    if (input == null) return null
    const lookup = links || {}
    let parts = [String(input)]
    parts = flatMap(parts, ITALIC_QUOTED, (text) => <em>“{text}”</em>)
    parts = flatMap(parts, SUPER, (text) => <sup>{text}</sup>)
    parts = flatMap(parts, LINK_TOKEN, (label) => {
        const href = lookup[label]
        return href
            ? <OutboundLink href={href} target="_blank" rel="noopener noreferrer">{label}</OutboundLink>
            : `[${label}]`
    })
    return <>{parts.map((p, i) => <React.Fragment key={i}>{p}</React.Fragment>)}</>
}

export const pickField = (item, key, variant = "casual") => {
    if (item == null) return undefined
    const variantKey = `${key}_${variant}`
    const otherVariant = variant === "casual" ? "academic" : "casual"
    return item[variantKey] ?? item[key] ?? item[`${key}_${otherVariant}`]
}

export const isWebVisible = (item) => {
    if (item == null) return false
    const tags = item.include_in
    if (tags == null) return true
    if (tags.length === 0) return false
    return tags.includes("academic") || tags.includes("casual") || tags.includes("web")
}
