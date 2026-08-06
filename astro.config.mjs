import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
    site: "https://ivantha.com",
    trailingSlash: "ignore",
    build: {
        format: "directory",
    },
    // The one piece of JavaScript on the site, and it is ~700 bytes. Pages here
    // are ~12 kB of HTML against a 17-link rail, so the whole site fits in the
    // budget of a single image — fetching the next page while the pointer is
    // still travelling makes navigation land instantly.
    //
    // `hover` rather than `viewport`: with the entire nav visible at once,
    // viewport strategy would prefetch all 17 pages on every load, which trades
    // the bandwidth of the whole site for a latency win on the one page actually
    // clicked. Astro only ever prefetches same-origin links, so the outbound
    // links in the content are untouched — but the rail's CV link is a local PDF
    // and opts out explicitly in components/NavBar.astro.
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "hover",
    },
    integrations: [sitemap()],
})
