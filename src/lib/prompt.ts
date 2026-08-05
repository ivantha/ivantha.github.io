/**
 * The shell command rendered above each page title.
 *
 * Keyed centrally off the pathname rather than passed down as a prop: all 18
 * pages hand-roll their own section markup, so a prop would mean 18 edits that
 * drift the moment a page is added. The fallback derives the command from the
 * path, so a new page gets a correct crumb without touching this map.
 */
const COMMANDS: Record<string, string> = {
    "/": "whoami",
    "/about": "cat ~/about.md",
    "/officehours": "cat ~/officehours.md",
    "/news": "tail ~/news",
    "/404": "cat: no such file or directory",
}

export function commandFor(pathname: string): string {
    const path = pathname.replace(/\/$/, "") || "/"
    return COMMANDS[path] ?? `ls ~${path}`
}
