import React from "react"
import "../styles/pages/articles.scss"
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
                                <span className="tags-text">wso2 identity server, cors</span><br />
                                <span className="content-text">If you are here, chances are you know what CORS is. But let’s go through the basics in case you are a bit rusty on the exact way that CORS works. You can hop over to the next section if you feel confident... <a className="link" href="https://ivantha.medium.com/cors-with-wso2-identity-server-5-11-1067b3a6f9bd" target="_blank" rel="noopener noreferrer">[Read more]</a></span><br />
                                <span className="date-text">Dec 4, 2020</span><br />
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
                                <span className="tags-text">open source, gsoc, cern, owncloud</span><br />
                                <span className="content-text">Google Summer of Code is an annual initiative carried out by Google for the betterment of the open-source software and the students in STEM fields. It started in 2005 as a program that would help students... <a className="link" href="https://ivantha.medium.com/gsoc-diaries-part-i-long-walk-to-gsoc-with-cern-hsf-92e671fad4f5" target="_blank" rel="noopener noreferrer">[Read more]</a></span><br />
                                <span className="date-text">Nov 18, 2019</span><br />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </Layout>
)

export default ArticlesPage
