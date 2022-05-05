import * as React from "react"

import "../styles/styles.scss"

import Layout from "../components/layout"

const IndexPage = () => {
    return (
        <Layout>
            <div className="section-wrapper">
                <div className="section-title">
                    <h1>Home</h1>
                </div>
                <div className="section-items">
                    This website is a work in progress!
                </div>
            </div>
        </Layout>
    )
}

export default IndexPage
