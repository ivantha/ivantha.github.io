import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import "../styles/pages/projects.scss"
import Layout from "../components/layout"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { pickField, isWebVisible } from "../components/markup"

const ProjectsPage = () => {
    const { allProjectsYaml } = useStaticQuery(graphql`
        query {
            allProjectsYaml {
                nodes {
                    yamlId
                    include_in
                    name
                    name_academic
                    name_casual
                    stack_academic
                    stack_casual
                    description
                    description_academic
                    description_casual
                    url
                }
            }
        }
    `)

    const items = allProjectsYaml.nodes.filter(isWebVisible)

    return (
        <Layout>
            <div className="projectsLayout section-wrapper">
                <div className="section-title">
                    <h1>Selected Projects</h1>
                </div>
                <div className="section-items">
                    <ul>
                        {items.map((item) => {
                            const name = pickField(item, "name", "academic")
                            const stack = pickField(item, "stack", "academic")
                            const description = pickField(item, "description", "academic")
                            return (
                                <li key={item.yamlId} className="projects-wrapper">
                                    <h3>
                                        {item.url ? (
                                            <OutboundLink className="link" href={item.url} target="_blank" rel="noopener noreferrer">
                                                {name}
                                            </OutboundLink>
                                        ) : name}
                                    </h3>
                                    {stack && <><span className="tools-text">{stack}</span><br/></>}
                                    {description && <span className="content-text">{description}</span>}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default ProjectsPage
