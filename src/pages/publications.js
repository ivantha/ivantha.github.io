import React from "react"
import "../styles/pages/publications.scss"
import Layout from "../components/layout"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const PublicationsPage = () => {
    return (
        <Layout>
            <div className="publicationsLayout section-wrapper">
                <div className="section-title">
                    <h1>Publications</h1>
                </div>
                <div className="section-items">
                    <h2 className="publications-subtitle">Published Articles</h2>
                    <ul>
                        <li>
                            <span>
                                [Journal] <b>Oshan Mudannayake</b>, Amila Indika, Upul Jayasinghe, Gyu Myoung Lee, Janaka Alawatugoda, "On Privacy-Preserved Machine Learning Using Secure Multi-Party Computing: Techniques and Trends", in <OutboundLink className="link" href="https://www.techscience.com/cmc" target="_blank" rel="noopener noreferrer">Computers, Materials & Continua (CMC)</OutboundLink>, vol. 85, no. 2, pp. 2527-2578, 2025. <OutboundLink className="link" href="https://doi.org/10.32604/cmc.2025.068875">DOI: 10.32604/cmc.2025.068875</OutboundLink>
                            </span>
                        </li>
                        <li>
                            <span>
                                [Conference] Shivalika Singh, ..., <b>Oshan Mudannayake</b>, and others, "Aya dataset: An open-access collection for multilingual instruction tuning", in <OutboundLink className="link" href="https://aclanthology.org/events/acl-2024/" target="_blank" rel="noopener noreferrer">Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics (ACL)</OutboundLink>, 2024. <OutboundLink className="link" href="https://aclanthology.org/2024.acl-long.620/">DOI: 10.18653/v1/2024.acl-long.620</OutboundLink>
                            </span>
                        </li>
                        <li>
                            <span>
                                [Journal] Harin Samaranayake*, <b>Oshan Mudannayake*</b>, Dushani Perera, Prabhash Kumarasinghe, Chathura Suduwella, Kasun De Zoysa, Prasad Wimalaratne "Detecting Water In Visual Image Streams Captured From Unmanned Aerial Vehicles", in <OutboundLink className="link" href="https://www.sciencedirect.com/journal/journal-of-visual-communication-and-image-representation" target="_blank" rel="noopener noreferrer">Journal of Visual Communication and Image Representation (JVCI)</OutboundLink>, 2023. <OutboundLink className="link" href="https://www.sciencedirect.com/science/article/pii/S1047320323001839?dgcid=author">DOI: 10.1016/j.jvcir.2023.103933</OutboundLink>
                            </span>
                            <br/>
                            <span>
                                <a className="link" href="/samaranayake2023detecting.pdf" target="_blank" rel="noopener noreferrer">[PDF]</a>
                            </span>
                        </li>
                        <li>
                            <span>
                                [Journal] <b>Oshan Mudannayake*</b>, Disni Rathnayake*, Jerome Dinal Herath, Dinuni K Fernando, MGNAS Fernando "Exploring Machine Learning and Deep Learning Approaches for Multi-Step Forecasting in Municipal Solid Waste Generation", <OutboundLink className="link" href="https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=6287639" target="_blank" rel="noopener noreferrer">IEEE Access</OutboundLink>, vol. 10, pp. 122570-122585, 2022. <OutboundLink className="link" href="https://ieeexplore.ieee.org/document/9950270">DOI: 10.1109/ACCESS.2022.3221941</OutboundLink>
                            </span>
                            <br/>
                            <span>
                                <a className="link" href="/mudannayake2022exploring.pdf" target="_blank" rel="noopener noreferrer">[PDF]</a>
                            </span>
                        </li>
                        <li>
                            <span>[Conference] <b>Oshan Mudannayake</b>, Nalin Ranasinghe, "kMatrix: A Space Efficient Streaming Graph Summarization Technique", in <OutboundLink  className="link" href="https://spsr.sltc.ac.lk/events/iciafs-2021/" target="_blank" rel="noopener noreferrer">10th IEEE International Conference on Information and Automation for Sustainability (ICIAfS) 2021</OutboundLink> Colombo, Sri Lanka, 2021. <OutboundLink className="link" href="https://ieeexplore.ieee.org/document/9606137">DOI: 10.1109/ICIAfS52090.2021.9606137</OutboundLink></span>
                            <br/>
                            <span>
                                <OutboundLink className="link" href="/mudannayake2021kmatrix.pdf" target="_blank" rel="noopener noreferrer">[PDF]</OutboundLink>
                            </span>
                        </li>
                    </ul>
                    <h2 className="publications-subtitle">Articles Under Review</h2>
                    <ul>
                        <li>
                            <span>[Conference] <b>Oshan Mudannayake</b>, "Paired-Offset Reevaluation: A Diagnostic for Selection-Induced Optimism in Reinforcement-Learning Hyperparameter Search", AutoML 2026 (Methods Track).</span>
                        </li>
                        <li>
                            <span>[Workshop] <b>Oshan Mudannayake</b>, "Affordable Reinforcement Learning Hyperparameter Rigor: A Paired-Offset Reevaluation Catalogue", GlobalSouthML Workshop @ ICML 2026 (non-archival).</span>
                        </li>
                        <li>
                            <span>Sahan Dissanayaka*, <b>Oshan Mudannayake*</b>, Thilina Halloluwa, Chameera De Silva, "ImageLab: Simplifying Image Processing Exploration for Novices and Experts Alike".</span>
                        </li>
                        <li>
                            <span><b>Oshan Mudannayake</b>, K. Senarathne, S. Farook, L. De Mel, C. Jayanaka, "Leveraging Spatial and Temporal Data for Enhanced Wildfire Spread Prediction".</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default PublicationsPage
