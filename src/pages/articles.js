import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

const ArticlesPage = () => (
    <Layout>
        <div className="articlesLayout section-wrapper">
            <div className="section-title">
                <h1>Articles</h1>
            </div>
            <div className="section-items">
                <ul>
                    <li className="articles-wrapper">
                        <div className="articles-card">
                            <div className="img-container cors">
                                <StaticImage
                                    src="../images/cors.jpg"
                                    alt="CORS"
                                    placeholder="blurred"
                                    className="article-img"
                                    objectFit="contain"
                                />
                            </div>
                            <div className="card-content">
                                <h3>CORS with WSO2 Identity Server 5.11</h3>
                                <span className="tags-text">WSO2 Identity Server</span><br />
                                <span className="content-text">What is CORS? If you are here, chances are you know what CORS is. But let’s go through the basics in case you are a bit rusty on the exact way that CORS works. You can hop over to the next section if you feel confident...</span><br />
                                <span className="date-text">Dec 4, 2020</span><br />
                                <span><a className="link" href="https://ivantha.medium.com/cors-with-wso2-identity-server-5-11-1067b3a6f9bd" target="_blank" rel="noopener noreferrer">[Source]</a></span>
                            </div>
                        </div>
                    </li>
                    <li className="articles-wrapper">
                        <div className="articles-card">
                            <div className="img-container gsoc">
                                <StaticImage
                                    src="../images/gsoc.jpg"
                                    alt="GSoC"
                                    placeholder="blurred"
                                    className="article-img"
                                    objectFit="contain"
                                />
                            </div>
                            <div className="card-content">
                                <h3>GSoC diaries I - Long walk to GSoC with CERN-HSF</h3>
                                <span className="tags-text">Open Source</span><br />
                                <span className="content-text">What is GSoC? Google Summer of Code is an annual initiative carried out by Google for the betterment of the open-source software and the students in STEM fields. It started in 2005 as a program that would help students...</span><br />
                                <span className="date-text">Nov 18, 2019</span><br />
                                <span><a className="link" href="https://ivantha.medium.com/gsoc-diaries-part-i-long-walk-to-gsoc-with-cern-hsf-92e671fad4f5" target="_blank" rel="noopener noreferrer">[Source]</a></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </Layout>
)

export default ArticlesPage
