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
        siteUrl: `https://ivantha.com`,
    },
    plugins: [
        "gatsby-plugin-sass",
        {
            resolve: "gatsby-plugin-google-analytics",
            options: {
                "trackingId": "G-9BMKFHVG74",
            },
        },
        "gatsby-plugin-image",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                "icon": "src/images/icon.png",
            },
        },
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                "name": "images",
                "path": "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/images/favicon.png',
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: [
                    'G-9YY9CJLD5V',
                ],
                pluginConfig: {
                    // Puts tracking script in the head instead of the body
                    head: false,
                    // Setting this parameter is also optional
                    respectDNT: false,
                    // Avoids sending pageview hits from custom paths
                    exclude: ['/preview/**', '/do-not-track/me/too/'],
                },
            },
        },
    ],
}
