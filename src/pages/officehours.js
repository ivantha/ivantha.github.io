import React from "react"
import "../styles/pages/office_hours.scss"

import Layout from "../components/layout"


const OfficeHoursPage = () => (
    <Layout>
        <div className="officeHoursLayout section-wrapper">
            <div className="section-title">
                <h1>Office Hours</h1>
            </div>
            <div className="section-items">
                <span>Inspired by <a className="link" href="https://blog.evjang.com/2020/06/free-office-hours-for-non-traditional.html" target="_blank" rel="noopener noreferrer">Eric Jang.</a></span>

            </div>
        </div>
    </Layout>
)

export default OfficeHoursPage
