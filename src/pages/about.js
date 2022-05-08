import React from "react"

import Layout from "../components/layout"

const AboutPage = () => (
    <Layout>
        <div className="section-wrapper">
            <div className="section-title">
                <h1>About</h1>
            </div>
            <div className="section-items">
                <div>
                    <h2>Education</h2>
                    <p className="note">Add logos to education</p>
                    <div>
                        <p>University of Colombo School of Computing</p>
                        <p>B.Sc (Hons) in Computer Science</p>
                        <p>Feb. 2016 - Feb. 2020</p>
                        <p>First Class Honors with a GPA of 3.61/4.0 (Top 5%)</p>
                        <p>Ranked 6th over 156 CS students</p>
                        <p>Thesis: “Summarization of Large Scale Streaming Graphs” (Grade A)</p>
                        <ul>
                            <li>Chair of IEEE Student Branch</li>
                            <li>Core team member of Mozilla Club</li>
                            <li>Member of CompSoc</li>
                            <li>Instructor of Exploration Club</li>
                            <li>Batch representative at IUD</li>
                        </ul>
                    </div>
                    <div>
                        <p>Maliyadeva College</p>
                        <p>G.C.E. Advance Level Examination - Physical Science Stream</p>
                        <p>Jan. 2001 - Dec. 2014</p>
                        <ul>
                            <li>President of Robotics Club</li>
                            <li>Team Lead of Hardware and Networking Group</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h2>Hobbies and Interests</h2>
                    <ul>
                        <li>Some hobby 1</li>
                        <li>My hobby 2</li>
                        <li>Extra hobby 3</li>
                        <li>Random activity I like to do 4</li>
                    </ul>
                </div>
            </div>
        </div>
    </Layout>
)

export default AboutPage
