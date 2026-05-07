export default {
    plugins: ["prettier-plugin-astro"],
    overrides: [
        {
            files: "*.astro",
            options: { parser: "astro" },
        },
    ],
    tabWidth: 4,
    printWidth: 120,
    semi: false,
    singleQuote: false,
    trailingComma: "all",
}
