import React from "react"

import Layout from "../components/layout"

const PresentationsPage = () => (
    <Layout>
        <div className="presentationsLayout section-wrapper">
            <div className="section-title">
                <h1>Presentations</h1>
            </div>
            <div className="section-items">
                <div>
                    <h2>Mentoring</h2>
                    <ul>
                        <li>
                            <p>Jul. 2021</p><p>-</p><p>[Conference] kMatrix: A Space Efficient Streaming Graph Summarization Technique</p><p>-</p><p>IEEE International Conference on Information and Automation for Sustainability 2021</p>
                        </li>
                        <li>
                            <p>Dec. 2018</p><p>-</p><p>[Poster] Machine Learning over Encrypted Data</p><p>-</p><p>Sri Lanka Association for the Advancement of Science (SLAAS) Exhibition 2018</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2>Seminars</h2>
                    <ul>
                        <li>
                            <p>May. 2021</p><p>-</p><p>Career guidance for undergraduates</p><p>-</p><p>UCSC ACM Student Chapter - Colombo, Sri Lanka</p>
                        </li>
                        <li>
                            <p>Dec. 2020</p><p>-</p><p>A new CORS Valve for the WSO2 Identity Server</p><p>-</p><p>IAM Community Call by WSO2 - Colombo, Sri Lanka</p>
                        </li>
                        <li>
                            <p>Oct. 2019</p><p>-</p><p>Rust 101</p><p>-</p><p>Hacktoberfest 2019 by Mozilla Club of UCSC - Colombo, Sri Lanka</p>
                        </li>
                        <li>
                            <p>Sep. 2018</p><p>-</p><p>Lightning talk on Phoenix</p><p>-</p><p>ownCloud Conference 2018 - Nuremberg, Germany</p>
                        </li>
                    </ul>
                </div>
            </div>
         </div>
    </Layout>
)

export default PresentationsPage
