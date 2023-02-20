import React from "react"
import "../styles/pages/about.scss"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

const AboutPage = () => {
    return (
        <Layout>
            <div className="aboutLayout section-wrapper">
                <div className="section-title">
                    <h1>About</h1>
                </div>
                <div className="section-items">
                    <div>
                        <div className="education-wrapper">
                            <h2>Education</h2>
                            <div className="education-card">
                                <div className="img-container ucsc-mal">
                                    <StaticImage
                                        src="../images/uom.png"
                                        alt="UoM"
                                        placeholder="blurred"
                                        objectFit="contain"
                                    />
                                </div>
                                <div className="card-content">
                                    <h3>University of Moratuwa</h3>
                                    <h3>[Reading] M.Sc in Data Science & AI</h3>
                                    <span className="date-text">Jan. 2023 - Present</span><br/>
                                </div>
                            </div>
                            <div className="education-card">
                                <div className="img-container ucsc-mal">
                                    <StaticImage
                                        src="../images/ucsc.jpg"
                                        alt="UCSC"
                                        placeholder="blurred"
                                        objectFit="contain"
                                    />
                                </div>
                                <div className="card-content">
                                    <h3>University of Colombo School of Computing</h3>
                                    <h3>B.Sc (Hons) in Computer Science</h3>
                                    <span className="tags-text">First Class Honors with a GPA of 3.61/4.0 (Top 5%)</span><br/>
                                    <span className="tags-text">Ranked 6th over 156 CS students</span><br/>
                                    <span className="tags-text">Thesis: “Summarization of Large Scale Streaming Graphs” (Grade A)</span><br/>
                                    <span className="content-text">
                                        <ul>
                                            <li>Chair of IEEE Student Branch</li>
                                            <li>Core team member of Mozilla Club</li>
                                            <li>Member of CompSoc</li>
                                            <li>Instructor of Exploration Club</li>
                                            <li>Batch representative at IUD</li>
                                        </ul>
                                    </span><br/>
                                    <span className="date-text">Feb. 2016 - Feb. 2020</span><br/>
                                </div>
                            </div>
                            <div className="education-card">
                                <div className="img-container ucsc-mal">
                                    <StaticImage
                                        src="../images/maliyadeva.jpg"
                                        alt="Maliyadeva College"
                                        placeholder="blurred"
                                        objectFit="contain"
                                    />
                                </div>
                                <div className="card-content">
                                    <h3>Maliyadeva College</h3>
                                    <span className="tags-text">G.C.E. Advance Level Examination - Physical Science Stream</span><br/>
                                    <span className="content-text">
                                        <ul>
                                            <li>President of Robotics Club</li>
                                            <li>Team Lead of Hardware and Networking Group</li>
                                        </ul>
                                    </span><br/>
                                    <span className="date-text">Jan. 2001 - Dec. 2014</span><br/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Hobbies and Interests</h2>
                        <ul>
                            <li>Avid reader</li>
                            <li>Gamer</li>
                            <li>Dreams about traveling</li>
                            <li>Likes food(can cook)</li>
                            <li>Borderline otaku</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AboutPage
