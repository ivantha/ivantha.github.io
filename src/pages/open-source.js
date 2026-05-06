import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import "../styles/pages/open-source.scss"
import Layout from "../components/layout"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { pickField, isWebVisible, renderWithLinks } from "../components/markup"

const restoreYamlKeys = (links) => {
    if (!links) return {}
    const out = {}
    for (const [k, v] of Object.entries(links)) {
        if (v == null || k === "internal" || k === "id" || k === "parent" || k === "children") continue
        // gatsby-transformer-yaml converts kebab-case to snake_case in field
        // names; YAML descriptions reference the original kebab-case labels,
        // so reverse the substitution here.
        out[k.replace(/_/g, "-")] = v
    }
    return out
}

const OpenSourcePage = () => {
    const { allOpenSourceYaml } = useStaticQuery(graphql`
        query {
            allOpenSourceYaml {
                nodes {
                    id
                    include_in
                    name
                    name_casual
                    name_url
                    stack
                    stack_casual
                    description
                    description_casual
                    links {
                        TensorMap
                        DroneSym
                        ImageLab
                        DataLoom
                        fact_bounty
                        carbon_identity_framework
                        identity_api_server
                        product_is
                        docs_is
                        aya_annotations_ui
                    }
                }
            }
        }
    `)

    const items = allOpenSourceYaml.nodes.filter(isWebVisible)

    return (
        <Layout>
            <div className="openSourceLayout section-wrapper">
                <div className="section-title">
                    <h1>Open Source</h1>
                </div>
                <div className="section-items">
                    <ul>
                        {items.map((item) => {
                            const name = pickField(item, "name", "academic")
                            const stack = pickField(item, "stack", "academic")
                            const description = pickField(item, "description", "academic")
                            const links = restoreYamlKeys(item.links)
                            return (
                                <li key={item.id} className="open-source-wrapper">
                                    <h3>
                                        {item.name_url ? (
                                            <OutboundLink className="link" href={item.name_url} target="_blank" rel="noopener noreferrer">
                                                {name}
                                            </OutboundLink>
                                        ) : name}
                                    </h3>
                                    {stack && <><span className="tools-text">{stack}</span><br/></>}
                                    {description && (
                                        <span className="content-text">
                                            {renderWithLinks(description, links)}
                                        </span>
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

export default OpenSourcePage
