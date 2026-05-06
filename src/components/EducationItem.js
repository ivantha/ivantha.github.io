import React from "react"
import { pickField, renderTypstMd } from "./markup"

const EducationItem = ({ item }) => {
    const institute = item.institute
    const prefix = item.institute_academic_prefix
    const degree = pickField(item, "degree", "academic")
    const dates = item.dates ?? item.dates_casual
    const extras = item.extras_academic ?? item.extras_casual ?? []

    return (
        <li className="research-wrapper">
            <h3>{institute}</h3>
            <span className="institute-text">
                {prefix && `${prefix} `}{degree}
            </span>
            {extras.length > 0 && (
                <ul className="research-content-text">
                    {extras.map((line, idx) => (
                        <li key={idx}>{renderTypstMd(line)}</li>
                    ))}
                </ul>
            )}
            {dates && <span className="date-country-text">{dates}</span>}
        </li>
    )
}

export default EducationItem
