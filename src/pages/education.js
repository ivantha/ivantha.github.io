import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import "../styles/pages/experience.scss"
import Layout from "../components/layout"
import EducationItem from "../components/EducationItem"
import { isWebVisible } from "../components/markup"

const EducationPage = () => {
    const { allEducationYaml } = useStaticQuery(graphql`
        query {
            allEducationYaml {
                nodes {
                    yamlId
                    include_in
                    institute
                    institute_academic_prefix
                    degree_academic
                    degree_casual
                    dates
                    dates_casual
                    extras_academic
                    extras_casual
                }
            }
        }
    `)

    const items = allEducationYaml.nodes.filter(isWebVisible)

    return (
        <Layout>
            <div className="experienceLayout section-wrapper">
                <div className="section-title">
                    <h1>Education</h1>
                </div>
                <div className="section-items">
                    <ul>
                        {items.map((item) => (
                            <EducationItem key={item.yamlId} item={item}/>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default EducationPage
