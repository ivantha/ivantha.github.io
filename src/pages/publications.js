import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import "../styles/pages/publications.scss"
import Layout from "../components/layout"
import PublicationItem from "../components/PublicationItem"

const PublicationsPage = () => {
    const { publicationsYaml } = useStaticQuery(graphql`
        query {
            publicationsYaml {
                equal_contribution_note
                items {
                    venue_type
                    include_in
                    year
                    authors {
                        name
                        self
                        equal_contribution
                    }
                    title
                    title_casual
                    venue
                    venue_casual
                    doi_url
                    doi_label
                    pdf_url
                }
            }
        }
    `)

    const items = publicationsYaml.items || []
    const sorted = [...items].sort((a, b) => (b.year || 0) - (a.year || 0))
    const published = sorted.filter((p) => p.doi_url)
    const preprints = sorted.filter((p) => !p.doi_url && p.venue_type === "Preprint")
    const underReview = sorted.filter((p) => !p.doi_url && p.venue_type !== "Preprint")
    const note = publicationsYaml.equal_contribution_note

    const hasEqContribInPublished = published.some((p) =>
        (p.authors || []).some((a) => a.equal_contribution)
    )

    return (
        <Layout>
            <div className="publicationsLayout section-wrapper">
                <div className="section-title">
                    <h1>Publications</h1>
                </div>
                <div className="section-items">
                    {published.length > 0 && (
                        <>
                            <h2 className="publications-subtitle">Published Articles</h2>
                            <ul>
                                {published.map((pub, idx) => <PublicationItem key={idx} pub={pub}/>)}
                            </ul>
                            {hasEqContribInPublished && note && (
                                <p><sup>*</sup> {note}</p>
                            )}
                        </>
                    )}
                    {underReview.length > 0 && (
                        <>
                            <h2 className="publications-subtitle">Articles Under Review</h2>
                            <ul>
                                {underReview.map((pub, idx) => <PublicationItem key={idx} pub={pub}/>)}
                            </ul>
                        </>
                    )}
                    {preprints.length > 0 && (
                        <>
                            <h2 className="publications-subtitle">Preprints</h2>
                            <ul>
                                {preprints.map((pub, idx) => <PublicationItem key={idx} pub={pub}/>)}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default PublicationsPage
