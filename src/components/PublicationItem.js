import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { pickField } from "./markup"

const renderAuthors = (authors) => {
    if (!authors || authors.length === 0) return null
    return authors.map((author, idx) => {
        const eqMark = author.equal_contribution ? <sup>*</sup> : null
        const name = author.self
            ? <b>{author.name}{eqMark}</b>
            : <>{author.name}{eqMark}</>
        return (
            <React.Fragment key={idx}>
                {idx > 0 && ", "}
                {name}
            </React.Fragment>
        )
    })
}

const PublicationItem = ({ pub }) => {
    const title = pickField(pub, "title", "academic")
    const venue = pickField(pub, "venue", "academic")
    const venueLabel = pub.venue_type ? `[${pub.venue_type}] ` : ""
    const venueHasYear = venue && pub.year && new RegExp(`\\b${pub.year}\\b`).test(venue)
    const yearSuffix = pub.year && !venueHasYear ? `, ${pub.year}` : ""
    const venueText = pub.doi_url
        ? (venue ? `, in ${venue}${yearSuffix}` : (pub.year ? `, ${pub.year}` : ""))
        : ""

    return (
        <li>
            <span>
                {venueLabel}
                {renderAuthors(pub.authors)}
                , "{title}"
                {venueText}
                {pub.doi_url && (
                    <>
                        {". "}
                        <OutboundLink className="link" href={pub.doi_url} target="_blank" rel="noopener noreferrer">
                            {pub.doi_label || "DOI"}
                        </OutboundLink>
                    </>
                )}
            </span>
            {pub.pdf_url && (
                <>
                    <br/>
                    <span>
                        <OutboundLink className="link" href={pub.pdf_url} target="_blank" rel="noopener noreferrer">
                            [PDF]
                        </OutboundLink>
                    </span>
                </>
            )}
        </li>
    )
}

export default PublicationItem
