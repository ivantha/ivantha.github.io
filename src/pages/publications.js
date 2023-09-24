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
                                [Journal] Harin Samaranayake*, <b>Oshan Mudannayake*</b>, Dushani Perera, Prabhash Kumarasinghe, Chathura Suduwella, Kasun De Zoysa, Prasad Wimalaratne "Detecting Water In Visual Image Streams Captured From Unmanned Aerial Vehicles", in <OutboundLink className="link" href="https://www.sciencedirect.com/journal/journal-of-visual-communication-and-image-representation" target="_blank" rel="noopener noreferrer">Journal of Visual Communication and Image Representation (JVCI)</OutboundLink>. <OutboundLink className="link" href="https://www.sciencedirect.com/science/article/pii/S1047320323001839?dgcid=author">DOI: 10.1016/j.jvcir.2023.103933</OutboundLink>
                            </span>
                            <br/>
                            <span>
                                <a className="link" href="/samaranayake2023detecting.pdf" target="_blank" rel="noopener noreferrer">[PDF]</a>
                                {/*<a className="link" href="xxxxx">[Cite]</a>*/}
                            </span>
                        </li>
                        <li>
                            <span>
                                [Journal] <b>Oshan Mudannayake*</b>, Disni Rathnayake*, Jerome Dinal Herath, Dinuni K Fernando, MGNAS Fernando "Exploring Machine Learning and Deep Learning Approaches for Multi-Step Forecasting in Municipal Solid Waste Generation", <OutboundLink className="link" href="https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=6287639" target="_blank" rel="noopener noreferrer">IEEE Access</OutboundLink>. <OutboundLink className="link" href="https://ieeexplore.ieee.org/document/9950270">DOI: 10.1109/ACCESS.2022.3221941</OutboundLink>
                            </span>
                            <br/>
                            <span>
                                <a className="link" href="/mudannayake2022exploring.pdf" target="_blank" rel="noopener noreferrer">[PDF]</a>
                                {/*<a className="link" href="xxxxx">[Cite]</a>*/}
                            </span>
                        </li>
                        <li>
                            <span>[Conference] <b>Oshan Mudannayake</b>, Nalin Ranasinghe, "kMatrix: A Space Efficient Streaming Graph Summarization Technique", in <OutboundLink  className="link" href="https://spsr.sltc.ac.lk/events/iciafs-2021/" target="_blank" rel="noopener noreferrer">10th IEEE International Conference on Information and Automation for Sustainability (ICIAfS) 2021</OutboundLink> Colombo, Sri Lanka, Aug. 2021. <OutboundLink className="link" href="https://ieeexplore.ieee.org/document/9606137">DOI: 10.1109/ICIAfS52090.2021.9606137</OutboundLink></span>
                            <br/>
                            <span>
                                <OutboundLink className="link" href="/mudannayake2021kmatrix.pdf" target="_blank" rel="noopener noreferrer">[PDF]</OutboundLink>
                                {/*<a className="link" href="xxxxx">[Cite]</a>*/}
                            </span>
                        </li>
                    </ul>
                    {/*<div className="publications-divider"></div>*/}
                    {/*<h2 className="publications-subtitle">Accepted Articles</h2>*/}
                    {/*<ul>*/}
                    {/*    */}
                    {/*</ul>*/}
                    {/*<div className="publications-divider"></div>*/}
                    {/*<h2 className="publications-subtitle">Articles in Review</h2>*/}
                    {/*<ul>*/}
                    {/*    */}
                    {/*</ul>*/}
                    {/*<div className="publications-divider"></div>*/}
                    <h2 className="publications-subtitle">Preprints</h2>
                    <ul>
                        <li>
                            <span>Sahan Dissanayaka*, <b>Oshan Mudannayake*</b>, Thilina Halloluwa, Chameera De Silva "ImageLab: Simplifying Image Processing Exploration for Novices and Experts Alike"</span>
                        </li>
                        <li>
                            <span><b>Oshan Mudannayake</b>, Amila Indika, Upul Jayasinghe, Gyu Myoung Lee "Privacy Preserved Machine Learning using Secure Multi-party Computing: A Survey"</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default PublicationsPage
