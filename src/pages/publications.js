import React from "react"
import "../styles/pages/publications.scss"
import Layout from "../components/layout"

const PublicationsPage = () => (
    <Layout>
        <div className="publicationsLayout section-wrapper">
            <div className="section-title">
                <h1>Publications</h1>
            </div>
            <div className="section-items">
                <h2 className="publications-subtitle">Published Articles</h2>
                <ul>
                    <li>
                        <span>[Conference] <b>Oshan Mudannayake</b>, Nalin Ranasinghe, "kMatrix: A Space Efficient Streaming Graph Summarization Technique", in 10th IEEE International Conference on Information and Automation for Sustainability (ICIAfS) 2021  Colombo, Sri Lanka, Aug. 2021. <a
                            className="link" href="https://ieeexplore.ieee.org/document/9606137">DOI: 10.1109/ICIAfS52090.2021.9606137</a></span>
                        <br/>
                        <span>
                            <a className="link" href="/mudannayake2021kmatrix.pdf" target="_blank" rel="noopener noreferrer">[PDF]</a>
                            {/*<a className="link" href="xxxxx">[Cite]</a>*/}
                        </span>
                    </li>
                </ul>
                <div className="publications-divider"></div>
                <h2 className="publications-subtitle">Articles in Review</h2>
                <ul>
                    <li>
                        <span>[Journal] <b>Oshan Mudannayake</b>, Disni Rathnayake, Jerome Dinal Herath, Dinuni K Fernando, MGNAS Fernando "Exploring Machine Learning and Deep Learning Approaches for Multi-Step Forecasting in Municipal Solid Waste Generation"</span>
                        <br/>
                        <span>Submitted to <i><a className="link" href="https://ieeeaccess.ieee.org/" target="_blank" rel="noopener noreferrer">IEEE Access</a></i>.</span>
                        <br/>
                        <span>
                            <a className="link" href="/mudannayake2022exploring.pdf" target="_blank" rel="noopener noreferrer">[PDF]</a>
                            {/*<a className="link" href="xxxxx">[Cite]</a>*/}
                        </span>
                    </li>
                </ul>
                <h2 className="publications-subtitle">Preprints</h2>
                <ul>
                    <li>
                        <span><b>Oshan Mudannayake</b>, Amila Indika, Upul Jayasinghe, Gyu Myoung Lee "Privacy Preserved Machine Learning using Secure Multi-party Computing: A Survey"</span>
                        <br/>
                        {/*<span>Submitted to <i><a className="link" href="https://ieeeaccess.ieee.org/" target="_blank" rel="noopener noreferrer">IEEE Access</a></i>.</span>*/}
                        <br/>
                        <span>
                            {/*<a className="link" href="/mudannayake2022privacy.pdf" target="_blank" rel="noopener noreferrer">[PDF]</a>*/}
                            {/*<a className="link" href="xxxxx">[Cite]</a>*/}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </Layout>
)

export default PublicationsPage
