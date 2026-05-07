import React from "react"
import "../styles/pages/research.scss"
import Layout from "../components/layout"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const ResearchPage = () => {
    return (
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
                                <h3>Reinforcement Learning Hyperparameter Rigor — Paired-Offset Reevaluation</h3>
                                <span className="tools-text">RL | HPO | Selection Bias | Diagnostics</span><br/>
                                <span className="content-text">Investigating selection-induced optimism in RL hyperparameter search and proposing a paired-offset reevaluation diagnostic. Two manuscripts under review.</span><br/>
                                <span className="date-text">2025 - Present</span>
                            </li>
                            <li className="research-wrapper">
                                <h3>Wildfire Spread Prediction with Spatio-Temporal Deep Learning</h3>
                                <span className="tools-text">Spatio-Temporal | Deep Learning | Remote Sensing</span><br/>
                                <span className="content-text">Leveraging spatial and temporal data for enhanced wildfire spread prediction. Manuscript under review.</span><br/>
                                <span className="date-text">2024 - Present</span>
                            </li>
                        </ul>
                    </div>
                    <div className="research-divider"></div>
                    <div>
                        <h2 className="research-subtitle">Completed</h2>
                        <ul>
                            <li className="research-wrapper">
                                <h3>On Privacy-Preserved Machine Learning Using Secure Multi-Party Computing: Techniques and Trends</h3>
                                <span className="tools-text">ML | SMPC | Privacy</span><br/>
                                <span className="content-text">Comprehensive survey on privacy-preserving machine learning that employs secure multi-party computing.</span><br/>
                                <span className="date-text">Apr. 2022 - 2025</span><br/>
                                <span><OutboundLink className="link" href="https://doi.org/10.32604/cmc.2025.068875" target="_blank" rel="noopener noreferrer">[Paper]</OutboundLink></span>
                            </li>
                            <li className="research-wrapper">
                                <h3>Detecting Water In Visual Image Streams Captured From Unmanned Aerial Vehicles</h3>
                                <span className="tools-text">CV | UNet | Tensorflow | OpenCV | Python</span><br/>
                                <span className="content-text">Our work attempts at detecting water surfaces using Unmanned Aerial Vehicles (UAV) footage.</span><br/>
                                <span className="date-text">Oct. 2022 - 2023</span><br/>
                                <span><OutboundLink className="link" href="https://www.sciencedirect.com/science/article/pii/S1047320323001839?dgcid=author" target="_blank" rel="noopener noreferrer">[Paper]</OutboundLink></span>
                            </li>
                            <li className="research-wrapper">
                                <h3>Modeling and Prediction of Municipal Solid Waste Generation in Sri Lanka using Machine Learning Techniques</h3>
                                <span className="tools-text">ML | Time series | Darts | Python</span><br/>
                                <span className="content-text">We aimed to model and forecast solid waste generation patterns in cities using machine learning techniques.</span><br/>
                                <span className="date-text">May 2021 - Jul. 2022</span><br/>
                                <span><OutboundLink className="link" href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9950270" target="_blank" rel="noopener noreferrer">[Paper]</OutboundLink></span>
                            </li>
                            <li className="research-wrapper">
                                <h3>Machine Learning based Internet Domain Entity Matching and its Applications</h3>
                                <span className="tools-text">ML | Scikit-learn | Tensorflow | Python</span><br/>
                                <span className="content-text">We tried to predict malicious domain URLs by using machine learning techniques.</span><br/>
                                <span className="date-text">Aug. 2020 - Dec. 2021</span>
                            </li>
                            <li className="research-wrapper">
                                <h3>Realtime Property Evaluation of Large Streaming Graphs</h3>
                                <span className="tools-text">Graphs | Graph Summarization | Python</span><br/>
                                <span className="content-text">We investigated massive graph stream summarization techniques and proposed an improved graph sketch; kMatrix.</span><br/>
                                <span className="date-text">Jan. 2019 - Jan. 2020</span><br/>
                                <span><OutboundLink className="link" href="https://docs.google.com/presentation/d/1HQr98OLbt1QBcVf28NeYp1ws2XV7admlYiCcRN5dnHA/edit?usp=sharing" target="_blank" rel="noopener noreferrer">[Presentation]</OutboundLink> <OutboundLink className="link" href="https://github.com/ivantha/rpelsg" target="_blank" rel="noopener noreferrer">[Source]</OutboundLink> <OutboundLink className="link" href="/papers/mudannayake2021kmatrix.pdf" target="_blank" rel="noopener noreferrer">[Paper]</OutboundLink></span>
                            </li>
                            <li className="projects-wrapper">
                                <h3>Machine Learning over Encrypted Data</h3>
                                <span className="tools-text">ML | Encryption | SMPC | Tensorflow | Python | Google Cloud Platform</span><br/>
                                <span className="content-text">We added a layer over Tensorflow to facilitate machine learning on encrypted data over a distributed network of machines.</span><br/>
                                <span className="date-text">Jul. 2018 - Jan. 2019</span><br/>
                                <span><OutboundLink className="link" href="/posters/mloed_slasscom_poster.png" target="_blank" rel="noopener noreferrer">[Poster]</OutboundLink></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ResearchPage
