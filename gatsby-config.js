module.exports = {
    siteMetadata: {
        title: `new`,
        menuLinks: [
            {
                name: 'home',
                link: '/'
            },
            {
                name: 'publications',
                link: '/publications'
            }
        ],
        siteUrl: `https://ivantha.github.io`,
    },
    plugins: ["gatsby-plugin-sass", {
        resolve: "gatsby-plugin-google-analytics",
        options: {
            "trackingId": "G-9BMKFHVG74",
        },
    }, "gatsby-plugin-image", {
        resolve: "gatsby-plugin-manifest",
        options: {
            "icon": "src/images/icon.png",
        },
    }, "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
        resolve: "gatsby-source-filesystem",
        options: {
            "name": "images",
            "path": "./src/images/",
        },
        __key: "images",
    }],
}
