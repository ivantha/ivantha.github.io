type Item = Record<string, unknown>
type Variant = "academic" | "casual"

export function pickField<T extends Item>(
    item: T | null | undefined,
    key: string,
    variant: Variant = "casual",
): string | undefined {
    if (item == null) return undefined
    const variantKey = `${key}_${variant}`
    const otherVariant: Variant = variant === "casual" ? "academic" : "casual"
    const value = item[variantKey] ?? item[key] ?? item[`${key}_${otherVariant}`]
    return typeof value === "string" ? value : undefined
}

export function isWebVisible(item: Item | null | undefined): boolean {
    if (item == null) return false
    const tags = item.include_in
    if (tags == null) return true
    if (!Array.isArray(tags)) return false
    if (tags.length === 0) return false
    return tags.includes("academic") || tags.includes("casual") || tags.includes("web")
}
