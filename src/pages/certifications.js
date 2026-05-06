import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import "../styles/pages/certifications.scss"
import Layout from "../components/layout"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { pickField, isWebVisible } from "../components/markup"

const renderCertLinks = (cert) => {
    const links = []
    if (cert.url) {
        links.push(
            <OutboundLink key="url" className="link" href={cert.url} target="_blank" rel="noopener noreferrer">
                [Certificate]
            </OutboundLink>
        )
    }
    if (cert.pdf_url) {
        links.push(
            <OutboundLink key="pdf" className="link" href={cert.pdf_url} target="_blank" rel="noopener noreferrer">
                [PDF]
            </OutboundLink>
        )
    }
    if (links.length === 0) return null
    return links.reduce((acc, link, idx) => acc.concat(idx > 0 ? [" ", link] : [link]), [])
}

const CertificationsPage = () => {
    const { allCertificationsYaml } = useStaticQuery(graphql`
        query {
            allCertificationsYaml {
                nodes {
                    id
                    name
                    name_casual
                    institute
                    year
                    include_in
                    url
                    pdf_url
                }
            }
        }
    `)

    const items = allCertificationsYaml.nodes.filter(isWebVisible)
    const moocs = items.filter((c) => c.institute === "Coursera" || c.institute === "Qwicklabs")
    const professional = items.filter((c) => c.institute !== "Coursera" && c.institute !== "Qwicklabs")

    const renderItem = (cert) => {
        const name = pickField(cert, "name", "academic")
        const links = renderCertLinks(cert)
        return (
            <li key={cert.id} className="certification-wrapper">
                <h3>{cert.year} | {name}</h3>
                <span className="institute-text">
                    {cert.institute}
                    {links && <> | {links}</>}
                </span>
            </li>
        )
    }

    return (
        <Layout>
            <div className="certificationsLayout section-wrapper">
                <div className="section-title">
                    <h1>Certifications</h1>
                </div>
                <div className="section-items">
                    {moocs.length > 0 && (
                        <div>
                            <h2>MOOCs</h2>
                            <ul>{moocs.map(renderItem)}</ul>
                        </div>
                    )}
                    {moocs.length > 0 && professional.length > 0 && (
                        <div className="certification-divider"></div>
                    )}
                    {professional.length > 0 && (
                        <div>
                            <h2 className="certification-subtitle">Professional Certifications</h2>
                            <ul>{professional.map(renderItem)}</ul>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default CertificationsPage
