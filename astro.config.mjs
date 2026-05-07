import { defineConfig } from "astro/config"

export default defineConfig({
    site: "https://ivantha.com",
    trailingSlash: "ignore",
    build: {
        format: "directory",
    },
})
