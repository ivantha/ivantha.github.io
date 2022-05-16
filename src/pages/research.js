import React from "react"

import Layout from "../components/layout"

const ResearchPage = () => (
    <Layout>
        <div className="researchLayout section-wrapper">
            <div className="section-title">
                <h1>Research</h1>
            </div>
            <div className="section-items">
                <div>
                    <h2 className="research-subtitle">Ongoing</h2>
                    <ul>
                        <li className="research-wrapper">
                            <h3>Sinhala OCR</h3>
                            {/*<span className="tools-text">TECHNOLOGIES</span><br />*/}
                            {/*<span className="content-text">DESCRIPTION</span><br />*/}
                            <span className="date-text">Apr. 2022 - Present</span>
                        </li>
                        <li className="research-wrapper">
                            <h3>Privacy Preserved Machine Learning using Secure Multi-party Computing</h3>
                            {/*<span className="tools-text">TECHNOLOGIES</span><br />*/}
                            {/*<span className="content-text">DESCRIPTION</span><br />*/}
                            <span className="date-text">Apr. 2022 - Present</span>
                        </li>
                        <li className="research-wrapper">
                            <h3>Modeling and Prediction of Municipal Solid Waste Generation in Sri Lanka using Machine Learning Techniques</h3>
                            <span className="tools-text">Darts | Python</span><br />
                            {/*<span className="content-text">DESCRIPTION</span><br />*/}
                            <span className="date-text">May 2021 - Present</span>
                        </li>
                        <li className="research-wrapper">
                            <h3>Machine Learning based Internet Domain Entity Matching and its Applications</h3>
                            <span className="tools-text">Scikit-learn | Tensorflow | Python</span><br />
                            {/*<span className="content-text">DESCRIPTION</span><br />*/}
                            <span className="date-text">Aug. 2020 - Present</span>
                        </li>
                    </ul>
                </div>
                <div className="research-divider"></div>
                <div>
                    <h2 className="research-subtitle">Completed</h2>
                    <ul>
                        <li className="research-wrapper">
                            <h3>Realtime Property Evaluation of Large Streaming Graphs</h3>
                            <span className="tools-text">Graphs | Graph Summarization | Python</span><br />
                            <span className="content-text">Final year research project carried on the area of massive streaming graph summarization.</span><br />
                            <span className="date-text">Jan. 2019 - Jan. 2020</span><br />
                            <span><a className="link" href="https://github.com/ivantha/rpelsg" target="_blank" rel="noopener noreferrer">[Source]</a></span>
                        </li>
                        <li className="projects-wrapper">
                            <h3>Machine Learning over Encrypted Data</h3>
                            <span className="tools-text">ML | Encryption | Tensorflow | Python | Google Cloud Platform</span><br />
                            <span className="content-text">I worked on adding a layer over Tensorflow to facilitate machine learning on encrypted data over a distributed network of machines.</span><br />
                            <span className="date-text">Jul. 2018 - Jan. 2019</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Layout>
)

export default ResearchPage
