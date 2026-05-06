import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import "../styles/pages/volunteering.scss"
import Layout from "../components/layout"

const VolunteeringPage = () => {
    const { mentoringList, volunteeringList } = useStaticQuery(graphql`
        query {
            mentoringList {
                lines
            }
            volunteeringList {
                lines
            }
        }
    `)

    const mentoring = mentoringList?.lines || []
    const committees = volunteeringList?.lines || []

    return (
        <Layout>
            <div className="volunteeringLayout section-wrapper">
                <div className="section-title">
                    <h1>Volunteering</h1>
                </div>
                <div className="section-items">
                    {mentoring.length > 0 && (
                        <div>
                            <h2 className="research-subtitle">Mentoring</h2>
                            <ul>
                                {mentoring.map((text, idx) => (
                                    <li key={idx} className="volunteering-wrapper">
                                        <h3>{text}</h3>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {mentoring.length > 0 && committees.length > 0 && (
                        <div className="volunteering-divider"></div>
                    )}
                    {committees.length > 0 && (
                        <div>
                            <h2 className="volunteering-subtitle">Committee Positions</h2>
                            <ul>
                                {committees.map((text, idx) => (
                                    <li key={idx} className="volunteering-wrapper">
                                        <h3>{text}</h3>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default VolunteeringPage
