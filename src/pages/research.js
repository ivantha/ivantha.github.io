import React from "react"
import "../styles/pages/research.scss"
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
                            <h3>The Art of Optical Character Recognition on Printed Sinhala Text</h3>
                            <span className="tools-text">ML | OCR | Tessseract</span><br />
                            <span className="content-text">We aim to establish the benchmark for the Sinhala OCR for printed text.</span><br />
                            <span className="date-text">Apr. 2022 - Present</span>
                        </li>
                        <li className="research-wrapper">
                            <h3>Privacy Preserved Machine Learning using Secure Multi-party Computing</h3>
                            <span className="tools-text">ML | SMPC</span><br />
                            <span className="content-text">We are writing a comprehensive survey on privacy preserving machine learning that employs secure multi-party computing.</span><br />
                            <span className="date-text">Apr. 2022 - Present</span>
                        </li>
                        <li className="research-wrapper">
                            <h3>Machine Learning based Internet Domain Entity Matching and its Applications</h3>
                            <span className="tools-text">ML | Scikit-learn | Tensorflow | Python</span><br />
                            <span className="content-text">We try to predict the malicious domain URLs by using machine learning techniques.</span><br />
                            <span className="date-text">Aug. 2020 - Present</span>
                        </li>
                    </ul>
                </div>
                <div className="research-divider"></div>
                <div>
                    <h2 className="research-subtitle">Completed</h2>
                    <ul>
                        <li className="research-wrapper">
                            <h3>Modeling and Prediction of Municipal Solid Waste Generation in Sri Lanka using Machine Learning Techniques</h3>
                            <span className="tools-text">ML | Time series | Darts | Python</span><br />
                            <span className="content-text">We aimed to model and forecast solid waste generation patterns in cities using machine learning techniques.</span><br />
                            <span className="date-text">May 2021 - Jul. 2022</span><br />
                            <span><a className="link" href="/mudannayake2022exploring.pdf" target="_blank" rel="noopener noreferrer">[Paper - Pending]</a></span>
                        </li>
                        <li className="research-wrapper">
                            <h3>Realtime Property Evaluation of Large Streaming Graphs</h3>
                            <span className="tools-text">Graphs | Graph Summarization | Python</span><br />
                            <span className="content-text">We investigated massive graph stream summarization techniques and proposed an improved graph sketch; kMatrix.</span><br />
                            <span className="date-text">Jan. 2019 - Jan. 2020</span><br />
                            <span><a className="link" href="https://docs.google.com/presentation/d/1HQr98OLbt1QBcVf28NeYp1ws2XV7admlYiCcRN5dnHA/edit?usp=sharing" target="_blank" rel="noopener noreferrer">[Presentation]</a> <a className="link" href="https://github.com/ivantha/rpelsg" target="_blank" rel="noopener noreferrer">[Source]</a> <a className="link" href="/mudannayake2021kmatrix.pdf" target="_blank" rel="noopener noreferrer">[Paper]</a></span>
                        </li>
                        <li className="projects-wrapper">
                            <h3>Machine Learning over Encrypted Data</h3>
                            <span className="tools-text">ML | Encryption | SMPC | Tensorflow | Python | Google Cloud Platform</span><br />
                            <span className="content-text">We added a layer over Tensorflow to facilitate machine learning on encrypted data over a distributed network of machines.</span><br />
                            <span className="date-text">Jul. 2018 - Jan. 2019</span><br />
                            <span><a className="link" href="/mloed_slasscom_poster.png" target="_blank" rel="noopener noreferrer">[Poster]</a></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Layout>
)

export default ResearchPage
