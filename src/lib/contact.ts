/**
 * Shape of a `profile_entries` row in data/personal.yaml. The YAML-backed
 * collection loaders don't surface inferred types to `astro check`, so callers
 * annotate against this rather than against the Zod schema.
 */
export interface ProfileEntry {
    url: string
    label: string
    label_academic?: string
    label_web?: string
}

/**
 * Renders an address the way the homepage has always shown it: readable by a
 * person, unappetising to a naive scraper. `oshan.ivantha@gmail.com` becomes
 * `oshan [DOT] ivantha [AT] g**** [DOT] com` — the provider stays guessable
 * from its first letter, so nothing a human needs is actually lost.
 */
export function obfuscateEmail(address: string): string {
    const [local, domain] = address.split("@")
    if (!domain) return address

    const spellDots = (value: string) => value.split(".").join(" [DOT] ")
    const labels = domain.split(".")
    const masked = labels
        .map((label, i) => (i === 0 ? label[0] + "*".repeat(Math.max(label.length - 1, 0)) : label))
        .join(".")

    return `${spellDots(local)} [AT] ${spellDots(masked)}`
}
