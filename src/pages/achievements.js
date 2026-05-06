import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import "../styles/pages/achievements.scss"
import Layout from "../components/layout"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { pickField, isWebVisible, renderTypstMd } from "../components/markup"

const AchievementsPage = () => {
    const { awardsYaml } = useStaticQuery(graphql`
        query {
            awardsYaml {
                entries {
                    year
                    event
                    event_casual
                    organizer
                    place_academic
                    place_casual
                    include_in
                    pdf_url
                }
            }
        }
    `)

    const entries = (awardsYaml?.entries || []).filter(isWebVisible)
    const sorted = [...entries].sort((a, b) => (b.year || 0) - (a.year || 0))

    return (
        <Layout>
            <div className="achievementsLayout section-wrapper">
                <div className="section-title">
                    <h1>Achievements</h1>
                </div>
                <div className="section-items">
                    <ul>
                        {sorted.map((entry, idx) => {
                            const event = pickField(entry, "event", "casual")
                            const place = pickField(entry, "place", "casual")
                            const organizer = entry.organizer
                            return (
                                <li key={idx} className="achievements-wrapper">
                                    <span className="institute-text">
                                        {entry.year}
                                        {place && <> | {renderTypstMd(place)}</>}
                                    </span>
                                    <h3>{event}</h3>
                                    {organizer && (
                                        <span className="institute-text country">{organizer}</span>
                                    )}
                                    {entry.pdf_url && (
                                        <>
                                            <br/>
                                            <OutboundLink className="link" href={entry.pdf_url} target="_blank" rel="noopener noreferrer">
                                                [Certificate]
                                            </OutboundLink>
                                        </>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default AchievementsPage
