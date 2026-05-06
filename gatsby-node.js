exports.createPages = ({ actions: { createRedirect } }) => {
    const moves = [
        ["/mudannayake2021kmatrix.pdf", "/papers/mudannayake2021kmatrix.pdf"],
        ["/mudannayake2022exploring.pdf", "/papers/mudannayake2022exploring.pdf"],
        ["/samaranayake2023detecting.pdf", "/papers/samaranayake2023detecting.pdf"],
        ["/mloed_slasscom_poster.png", "/posters/mloed_slasscom_poster.png"],
    ]
    for (const [from, to] of moves) {
        createRedirect({ fromPath: from, toPath: to, isPermanent: true, redirectInBrowser: true })
    }
}
