import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import "../styles/pages/experience.scss"
import Layout from "../components/layout"
import ExperienceItem from "../components/ExperienceItem"
import { isWebVisible } from "../components/markup"

const ExperiencePage = () => {
    const { allExperienceYaml } = useStaticQuery(graphql`
        query {
            allExperienceYaml {
                nodes {
                    yamlId
                    include_in
                    category
                    role
                    role_academic
                    role_casual
                    company
                    company_academic
                    company_casual
                    location
                    location_academic
                    location_casual
                    dates
                    employment_type
                    advisor
                    bullets {
                        text
                        text_casual
                        stack
                        stack_casual
                        include_in
                    }
                }
            }
        }
    `)

    const items = allExperienceYaml.nodes.filter(isWebVisible)
    const research = items.filter((it) => it.category === "research")
    const professional = items.filter((it) => it.category === "professional")

    return (
        <Layout>
            <div className="experienceLayout section-wrapper">
                <div className="section-title">
                    <h1>Experience</h1>
                </div>
                <div className="section-items">
                    {research.length > 0 && (
                        <>
                            <h2 className="experience-subtitle">Research Experience</h2>
                            <ul>
                                {research.map((item) => <ExperienceItem key={item.yamlId} item={item}/>)}
                            </ul>
                        </>
                    )}
                    {research.length > 0 && professional.length > 0 && (
                        <div className="experience-divider"></div>
                    )}
                    {professional.length > 0 && (
                        <>
                            <h2 className="experience-subtitle">Professional Experience</h2>
                            <ul>
                                {professional.map((item) => <ExperienceItem key={item.yamlId} item={item}/>)}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default ExperiencePage
