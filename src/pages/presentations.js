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
                        <li className="presentation-wrapper">
                            <h3>Jul. 2021 | [Conference] kMatrix: A Space Efficient Streaming Graph Summarization Technique</h3>
                            <span className="content-text">IEEE International Conference on Information and Automation for Sustainability 2021</span>
                        </li>
                        <li className="presentation-wrapper">
                            <h3>Dec. 2018 | [Poster] Machine Learning over Encrypted Data</h3>
                            <span className="content-text">Sri Lanka Association for the Advancement of Science (SLAAS) Exhibition 2018</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="presentation-subtitle">Seminars</h2>
                    <ul>
                        <li className="presentation-wrapper">
                            <h3>May. 2021 | Career guidance for undergraduates</h3>
                            <span className="content-text">UCSC ACM Student Chapter | Colombo, Sri Lanka</span>
                        </li>
                        <li className="presentation-wrapper">
                            <h3>Dec. 2020 | A new CORS Valve for the WSO2 Identity Server</h3>
                            <span className="content-text">IAM Community Call by WSO2 | Colombo, Sri Lanka</span>
                        </li>
                        <li className="presentation-wrapper">
                            <h3>Oct. 2019 | Rust 101</h3>
                            <span className="content-text">Hacktoberfest 2019 by Mozilla Club of UCSC | Colombo, Sri Lanka</span>
                        </li>
                        <li className="presentation-wrapper">
                            <h3>Sep. 2018 | Lightning talk on Phoenix</h3>
                            <span className="content-text">ownCloud Conference 2018 | Nuremberg, Germany</span>
                        </li>
                    </ul>
                </div>
            </div>
         </div>
    </Layout>
)

export default PresentationsPage
