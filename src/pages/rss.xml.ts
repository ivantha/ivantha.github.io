import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getCollection, type CollectionEntry } from "astro:content"
import { tokenizeNews } from "@/lib/markup"
import { orgs } from "@/data/orgs"
import { people } from "@/data/people"

function escapeHtml(value: string): string {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

/**
 * News entries carry the same `[[org:…]]` / `[[person:…]]` / `[label](url)`
 * tokens the site renders. Feed readers get resolved anchors; the plain-text
 * fallback drops the markup rather than leaking raw tokens.
 */
function renderNews(content: string): { html: string; text: string } {
    const tokens = tokenizeNews(content)
    let html = ""
    let text = ""

    for (const token of tokens) {
        if (token.type === "text") {
            html += escapeHtml(token.value)
            text += token.value
        } else if (token.type === "org") {
            const org = orgs[token.key]
            const label = org?.shortname ?? token.key
            html += org ? `<a href="${escapeHtml(org.url)}">${escapeHtml(label)}</a>` : escapeHtml(label)
            text += label
        } else if (token.type === "person") {
            const person = people[token.key]
            const label = person?.namewithhonorifics ?? token.key
            html += person ? `<a href="${escapeHtml(person.link)}">${escapeHtml(label)}</a>` : escapeHtml(label)
            text += label
        } else if (token.type === "link") {
            html += `<a href="${escapeHtml(token.href)}">${escapeHtml(token.label)}</a>`
            text += token.label
        }
    }

    return { html, text }
}

export async function GET(context: APIContext) {
    const news: CollectionEntry<"news">[] = await getCollection("news")

    return rss({
        title: "Oshan Mudannayake — News",
        description: "Research, publication, and career updates from Oshan Mudannayake.",
        site: context.site!,
        items: news.map((entry, index) => {
            const { html, text } = renderNews(entry.data.content)
            const pubDate = new Date(entry.data.date)
            const title = text.length > 90 ? `${text.slice(0, 89).trimEnd()}…` : text

            return {
                title,
                description: text,
                content: html,
                link: new URL("/news", context.site).href,
                ...(Number.isNaN(pubDate.valueOf()) ? {} : { pubDate }),
                // Entries have no permalinks of their own, so every item would
                // otherwise share /news as its guid and collapse in readers.
                customData: `<guid isPermaLink="false">news-${index}-${escapeHtml(entry.data.date)}</guid>`,
            }
        }),
        customData: "<language>en</language>",
    })
}
