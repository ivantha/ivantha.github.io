import React from "react"

import Layout from "../components/layout"

const ProjectsPage = () => (
    <Layout>
        <div className="projectsLayout section-wrapper">
            <div className="section-title">
                <h1>Selected Projects</h1>
            </div>
            <div className="section-items">
                <ul>
                    <li className="projects-wrapper">
                        <h3>Realtime Property Evaluation of Large Streaming Graphs</h3>
                        <span className="tools-text">Graphs | Graph Summarization | Python</span><br />
                        <span className="content-text">Final year research project carried on the area of massive streaming graph summarization.</span><br />
                        <span className="date-text">Jan. 2019 - Jan. 2020</span>
                    </li>
                    <li className="projects-wrapper">                        
                        <h3>TessTA</h3>
                        <span className="tools-text">ML | OCR | React | Java | Spring Boot | Hibernate | Tesseract | AWS</span><br />
                        <span className="content-text">OCR Solution for Sinhala language using Tesseract OCR Engine.</span><br />
                        <span className="date-text">Jan. 2018 - Mar. 2020</span>
                    </li>
                    <li className="projects-wrapper">
                        <h3>Machine Learning over Encrypted Data</h3>
                        <span className="tools-text">ML | Encryption | Tensorflow | Python | Google Cloud Platform</span><br />
                        <span className="content-text">I worked on adding a layer over Tensorflow to facilitate machine learning on encrypted data over a distributed network of machines.</span><br />
                        <span className="date-text">Jul. 2018 - Jan. 2019</span>
                    </li>
                    <li className="projects-wrapper">
                        <h3>Intelligent Traffic Light System</h3>
                        <span className="tools-text">Tensorflow | Python | Angular | NodeJS | Raspberry Pi | Arduino | Ionic Framework | GCP</span><br />
                        <span className="content-text">Traditional time interval based traffic light system was automated to remove the involvement of traffic officers.</span><br />
                        <span className="date-text">Feb. 2017 - Nov. 2017</span>
                    </li>
                    <li className="projects-wrapper">
                        <h3>Bra Elasticity Analyzing System</h3>
                        <span className="tools-text">Image processing | OpenCV | Java | Swing</span><br />
                        <span className="content-text">Implemented a way to compare the elasticity of sports bras using image processing.</span><br />
                        <span className="date-text">Mar. 2016 - Jan. 2017</span>
                    </li>
                    <li className="projects-wrapper">
                        <h3>Yarn Detection System</h3>
                        <span className="tools-text">Image processing | OpenCV | Python | Raspberry Pi</span><br />
                        <span className="content-text">Solution to detect the knots of yarn threads in glove weaving machines.</span><br />
                        <span className="date-text">Mar. 2016 - Jan. 2017</span>
                    </li>
                    <li className="projects-wrapper">
                        <h3>Glove Defect Identification System</h3>
                        <span className="tools-text">Image processing | OpenCV | Python</span><br />
                        <span className="content-text">Identified the common defect of gloves using image processing as they are being passed through a conveyor belt.</span><br />
                        <span className="date-text">Jan. 2016 - Jun. 2016</span>
                    </li>
                    <li className="projects-wrapper">
                        <h3>Smart Glove</h3>
                        <span className="tools-text">Java | JavaFX | FSR 400 | Arduino</span><br />
                        <span className="content-text">A glove prototype that can measure the pressure distribution and the acceleration of hand in order to derive the best patterns of movements for Cricket players in relation with the hand pressure.</span><br />
                        <span className="date-text">Jan. 2016 - Jun. 2016</span>
                    </li>
                </ul>
            </div>
        </div>
    </Layout>
)

export default ProjectsPage
