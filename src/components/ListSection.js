import React from "react"
import Layout from "./layout"

const ListSection = ({ title, className = "", children }) => (
    <Layout>
        <div className={`${className} section-wrapper`}>
            <div className="section-title">
                <h1>{title}</h1>
            </div>
            <div className="section-items">
                {children}
            </div>
        </div>
    </Layout>
)

export default ListSection
