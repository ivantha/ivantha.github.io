import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { parse } from "yaml"

const DATA_DIR = resolve(process.cwd(), "data")

type Item = Record<string, unknown>
type Entry = Item & { id: string }

async function readYamlFile(filename: string): Promise<unknown> {
    const raw = await readFile(resolve(DATA_DIR, filename), "utf8")
    return parse(raw)
}

export async function loadYamlList(
    filename: string,
    options?: { idField?: string; itemsPath?: string },
): Promise<Entry[]> {
    const parsed = await readYamlFile(filename)
    const items = options?.itemsPath ? (parsed as Record<string, unknown>)[options.itemsPath] : parsed
    if (!Array.isArray(items)) {
        throw new Error(`${filename}: expected top-level array${options?.itemsPath ? ` at .${options.itemsPath}` : ""}`)
    }
    const idField = options?.idField ?? "id"
    return items.map((item, i) => {
        const itemObj = item as Item
        const id = idField in itemObj ? String(itemObj[idField]) : String(i)
        return { ...itemObj, id }
    })
}

export async function loadYamlStringList(filename: string): Promise<Array<{ id: string; line: string }>> {
    const parsed = await readYamlFile(filename)
    if (!Array.isArray(parsed)) {
        throw new Error(`${filename}: expected top-level array of strings`)
    }
    return parsed.map((line, i) => ({ id: String(i), line: String(line) }))
}

export async function loadYamlSingle(filename: string): Promise<Entry[]> {
    const parsed = await readYamlFile(filename)
    return [{ ...(parsed as Item), id: "main" }]
}
