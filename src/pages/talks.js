import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import "../styles/pages/presentations.scss"
import Layout from "../components/layout"

const TYPE_LABEL = {
    oral: "Oral Presentations",
    poster: "Poster Presentations",
    invited: "Invited Talks",
}

const renderItems = (items) => (
    <ul>
        {items.map((talk, idx) => (
            <li key={idx} className="presentation-wrapper">
                <h3>{talk.date} | {talk.title}</h3>
                {talk.venue && (
                    <span className="content-text">
                        {talk.venue}
                        {talk.location && ` | ${talk.location}`}
                    </span>
                )}
            </li>
        ))}
    </ul>
)

const PresentationsPage = () => {
    const { allTalksYaml } = useStaticQuery(graphql`
        query {
            allTalksYaml {
                nodes {
                    type
                    title
                    venue
                    location
                    date
                }
            }
        }
    `)

    const talks = allTalksYaml.nodes
    const grouped = ["oral", "poster", "invited"].map((type) => ({
        type,
        items: talks.filter((t) => t.type === type),
    })).filter((g) => g.items.length > 0)

    return (
        <Layout>
            <div className="presentationsLayout section-wrapper">
                <div className="section-title">
                    <h1>Presentations</h1>
                </div>
                <div className="section-items">
                    {grouped.map((g, idx) => (
                        <React.Fragment key={g.type}>
                            {idx > 0 && <div className="presentation-divider"></div>}
                            <div>
                                <h2 className="presentation-subtitle">{TYPE_LABEL[g.type]}</h2>
                                {renderItems(g.items)}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default PresentationsPage
