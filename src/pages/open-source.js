import React from "react"
import "../styles/pages/open-source.scss"
import Layout from "../components/layout"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const OpenSourcePage = () => {
    return (
        <Layout>
            <div className="openSourceLayout section-wrapper">
                <div className="section-title">
                    <h1>Open Source</h1>
                </div>
                <div className="section-items">
                    <ul>
                        <li className="open-source-wrapper">
                            <h3><OutboundLink className="link" href="https://github.com/wso2/product-is" target="_blank" rel="noopener noreferrer">WSO2 Identity Server</OutboundLink></h3>
                            <span className="tools-text">Java | OSGi | REST | Tomcat Valves</span><br/>
                            <span className="content-text">Designed and shipped the tenant-aware CORS architecture for Identity Server 5.11 end-to-end, including the OSGi management service, DAO layer, REST APIs (tenant, application, and origin scopes), servlet valve, integration tests, and the public migration guide. Changes landed across <OutboundLink className="link" href="https://github.com/wso2/carbon-identity-framework" target="_blank" rel="noopener noreferrer">carbon-identity-framework</OutboundLink>, <OutboundLink className="link" href="https://github.com/wso2/identity-api-server" target="_blank" rel="noopener noreferrer">identity-api-server</OutboundLink>, <OutboundLink className="link" href="https://github.com/wso2/product-is" target="_blank" rel="noopener noreferrer">product-is</OutboundLink>, and <OutboundLink className="link" href="https://github.com/wso2/docs-is" target="_blank" rel="noopener noreferrer">docs-is</OutboundLink>.</span>
                        </li>
                        <li className="open-source-wrapper">
                            <h3><OutboundLink className="link" href="https://github.com/c2siorg" target="_blank" rel="noopener noreferrer">SCoRe Lab / C2SI</OutboundLink></h3>
                            <span className="tools-text">Python | Flask | React | Redux | Elasticsearch | TensorFlow | GitHub Actions</span><br/>
                            <span className="content-text">Long-running contributor and Google Summer of Code mentor across the lab's SCoRe-era projects and its successor organisation C2SI. Initiated and architected three of the organisation's flagship projects (<OutboundLink className="link" href="https://github.com/c2siorg/imagelab" target="_blank" rel="noopener noreferrer">ImageLab</OutboundLink>, <OutboundLink className="link" href="https://github.com/c2siorg/tensormap" target="_blank" rel="noopener noreferrer">TensorMap</OutboundLink>, and <OutboundLink className="link" href="https://github.com/c2siorg/dataloom" target="_blank" rel="noopener noreferrer">DataLoom</OutboundLink>), driving their core feature development and release engineering (fork-PR linting, slash-command automation triggers, release workflows). Also built the authentication and news-crawler stack for <OutboundLink className="link" href="https://github.com/scorelab/fact-bounty" target="_blank" rel="noopener noreferrer">fact-bounty</OutboundLink> and contributed to <OutboundLink className="link" href="https://github.com/scorelab/DroneSym" target="_blank" rel="noopener noreferrer">DroneSym</OutboundLink>.</span>
                        </li>
                        <li className="open-source-wrapper">
                            <h3><OutboundLink className="link" href="https://github.com/Cohere-Labs-Community/aya-annotations-ui" target="_blank" rel="noopener noreferrer">Cohere Labs — Aya Annotations Platform</OutboundLink></h3>
                            <span className="tools-text">Next.js | Nest.js | PostgreSQL | Docker | Google Cloud Platform</span><br/>
                            <span className="content-text">Built and deployed the open-source web platform used to collect multilingual instruction-tuning data from a global contributor community for the Aya dataset (ACL 2024). Covers Google and Discord SSO, the full task-annotation workflow, analytics, RTL language support, and the Cloud Build deployment pipeline.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default OpenSourcePage
