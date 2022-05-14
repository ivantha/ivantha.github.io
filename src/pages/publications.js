import React from "react"

import Layout from "../components/layout"

const PublicationsPage = () => (
    <Layout>
        <div className="publicationsLayout section-wrapper">
            <div className="section-title">
                <h1>Publications</h1>
            </div>
            <div className="section-items">
                <ul>
                    <li>
                        <span>[Conference] <b>Oshan Mudannayake</b>, Nalin Ranasinghe, "kMatrix: A Space Efficient Streaming Graph Summarization Technique", in 10th IEEE International Conference on Information and Automation for Sustainability (ICIAfS) 2021  Colombo, Sri Lanka, Aug. 2021. <a
                            className="link" href="https://ieeexplore.ieee.org/document/9606137">DOI: 10.1109/ICIAfS52090.2021.9606137</a></span>
                        <br/>
                        <span><a className="link" href="/2021_kmatrix_a_space_efficient_streaming_graph_summarization_technique.pdf" target="_blank" rel="noopener noreferrer">[PDF]</a> <a className="link" href="xxxxx">[Cite]</a></span>
                    </li>
                </ul>
            </div>
        </div>
    </Layout>
)

export default PublicationsPage
