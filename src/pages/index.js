import * as React from "react"
import "../styles/pages/home.scss"
import { StaticImage } from "gatsby-plugin-image"
import { OutboundLink } from "gatsby-plugin-google-gtag"

import Layout from "../components/layout"
import news from "../data/news"
import orgs from "../data/orgs"

class IndexPage extends React.Component {
    render() {
        return (
            <Layout>
                <div className="homeLayout section-wrapper">
                    <div className="section-items">
                        <div className="about-me">
                            <div className="profile-card">
                                <div className="img-container">
                                    <StaticImage src="../images/oim.png" alt="CORS" placeholder="blurred"
                                                 className="article-img" objectFit="contain"/>
                                </div>
                                <div className="profile-description">
                                    <h2>Hello world!</h2>
                                    <span className="content-text">
                                    I am a Senior Data Science Engineer at {orgs.wso2.anchor}. I graduated from {orgs.ucsc.anchor} with an honours degree in Computer Science. I am currently engaged in research projects at {orgs.ucsc.anchor} and {orgs.score.anchor}.
                                    <br/>
                                    My research interests primarily lie in the intersection of reinforcement learning and computer games. I am particularly interested in studying about intelligent agents that improve with experience.
                                    <br/>
                                    In a much broader sense, I like to work on theoretical and application research topics involving in artificial intelligence.
                                </span>
                                </div>
                            </div>
                            <div className="contact-details-section">
                                <div className="contact-details">
                                    <div className="contact-item">
                                        <StaticImage src="../images/phone.png" alt="Phone" placeholder="blurred"
                                                     height={14} layout="fixed"/>
                                        <span>(+94) 71 908 4020</span>
                                    </div>
                                    <div className="contact-item">
                                        <StaticImage src="../images/email.png" alt="email" placeholder="blurred"
                                                     height={11} layout="fixed"/>
                                        <span>oshan [DOT] ivantha [AT] g**** [DOT] com</span>
                                    </div>
                                    <div className="contact-item">
                                        <StaticImage src="../images/google-scholar.png" alt="google scholar"
                                                     placeholder="blurred" height={16} layout="fixed"/>
                                        <span><OutboundLink className="link"
                                                            href="https://scholar.google.com/citations?user=2FA0RngAAAAJ&hl=en"
                                                            target="_blank"
                                                            rel="noopener noreferrer">Google Scholar</OutboundLink></span>
                                    </div>
                                    <div className="contact-item">
                                        <StaticImage src="../images/kaggle.png" alt="kaggle" placeholder="blurred"
                                                     height={16} layout="fixed"/>
                                        <span><OutboundLink className="link" href="https://www.kaggle.com/ivantha"
                                                            target="_blank"
                                                            rel="noopener noreferrer">Kaggle</OutboundLink></span>
                                    </div>
                                    <div className="contact-item">
                                        <StaticImage src="../images/research-gate.png" alt="research gate"
                                                     placeholder="blurred" height={16} layout="fixed"/>
                                        <span><OutboundLink className="link"
                                                            href="https://www.researchgate.net/profile/Oshan-Mudannayake"
                                                            target="_blank"
                                                            rel="noopener noreferrer">ResearchGate</OutboundLink></span>
                                    </div>
                                    <div className="contact-item">
                                        <StaticImage src="../images/arxiv.png" alt="arXiv" placeholder="blurred"
                                                     height={16} layout="fixed"/>
                                        <span><OutboundLink className="link"
                                                            href="https://arxiv.org/search/cs?searchtype=author&query=Mudannayake%2C+O"
                                                            target="_blank"
                                                            rel="noopener noreferrer">arXiv</OutboundLink></span>
                                    </div>
                                    <div className="contact-item">
                                        <StaticImage src="../images/twitter.png" alt="twitter" placeholder="blurred"
                                                     height={13} layout="fixed"/>
                                        <span><OutboundLink className="link" href="https://twitter.com/_ivantha"
                                                            target="_blank"
                                                            rel="noopener noreferrer">_ivantha</OutboundLink></span>
                                    </div>
                                    <div className="contact-item">
                                        <StaticImage src="../images/linkedin-in.png" alt="linkedin-in"
                                                     placeholder="blurred" height={15} layout="fixed"/>
                                        <span><OutboundLink className="link" href="https://www.linkedin.com/in/ivantha/"
                                                            target="_blank"
                                                            rel="noopener noreferrer">ivantha</OutboundLink></span>
                                    </div>
                                    <div className="contact-item">
                                        <StaticImage src="../images/github.png" alt="github" placeholder="blurred"
                                                     height={15} layout="fixed"/>
                                        <span><OutboundLink className="link" href="https://github.com/ivantha"
                                                            target="_blank"
                                                            rel="noopener noreferrer">ivantha</OutboundLink></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="research-interests">
                            <h2>Research Interests</h2>
                            <span>Reinforcement Learning | Machine Learning | Artificial Intelligence</span><br/>
                            <span>Game Theory | Computer Games</span><br/>
                            <span>Computer Vision</span>
                        </div>
                        <div className="news-section">
                            <h2>News</h2>
                            {news.slice(0, 5).map(newsItem => (
                                <div key={newsItem.date} className="news-content">
                                    <span className="date-text">{newsItem.date}</span><br/>
                                    <span className="content-text">{newsItem.content}</span>
                                </div>
                            ))}
                            <div className="news-content">
                                <span><a className="link" href="/news">[See more]</a></span>
                            </div>
                        </div>
                    </div>

                </div>
            </Layout>
        )
    }
}

export default IndexPage
