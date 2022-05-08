import * as React from "react"
import "../styles/styles.scss"

import Layout from "../components/layout"

const IndexPage = () => {
    return (
        <Layout>
            <div className="homeLayout section-wrapper">
                <div className="section-title">
                    <h1>Home</h1>
                </div>
                <div className="section-items">
                    <div>
                    <img src="static/oim.png" alt="oshan" className="profile-img" />
                    </div>
                    This website is a work in progress!
                </div>
            </div>
        </Layout>
    )
}

export default IndexPage
