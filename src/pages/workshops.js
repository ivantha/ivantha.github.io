import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import "../styles/pages/workshops.scss"
import Layout from "../components/layout"

const WorkshopsPage = () => {
    const { workshopsList } = useStaticQuery(graphql`
        query {
            workshopsList {
                lines
            }
        }
    `)

    const lines = workshopsList?.lines || []

    return (
        <Layout>
            <div className="workshopsLayout section-wrapper">
                <div className="section-title">
                    <h1>Workshops / Training Programs Attended</h1>
                </div>
                <div className="section-items">
                    <ul>
                        {lines.map((text, idx) => (
                            <li key={idx} className="workshops-wrapper">
                                <h3>{text}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default WorkshopsPage
