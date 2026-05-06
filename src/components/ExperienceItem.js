import React from "react"
import { pickField, isWebVisible } from "./markup"

const ExperienceItem = ({ item }) => {
    const role = pickField(item, "role", "academic")
    const company = pickField(item, "company", "academic")
    const location = pickField(item, "location", "academic")
    const employment = item.employment_type
    const heading = employment ? `${role} (${employment})` : role

    const bullets = (item.bullets || []).filter(isWebVisible)

    return (
        <li className="research-wrapper">
            <h3>{heading}</h3>
            <span className="institute-text">{company}</span>
            <ul className="research-content-text">
                {item.advisor && (
                    <li>Advised by <b>{item.advisor}</b></li>
                )}
                {bullets.map((bullet, idx) => {
                    const text = pickField(bullet, "text", "academic")
                    return <li key={idx}>{text}</li>
                })}
            </ul>
            {item.dates && <><span className="date-country-text">{item.dates}</span><br/></>}
            {location && <span className="date-country-text">{location}</span>}
        </li>
    )
}

export default ExperienceItem
