import React from "react"

import Layout from "../components/layout"

const ProjectsPage = () => (
    <Layout>
        <div className="projectsLayout">
            <h1>Selected Projects</h1>
            <ul>
                <li>
                    <div>
                        <p>Jan. 2019 - Jan. 2020</p><p>-</p><p className="projectTitle">Realtime Property Evaluation of Large Streaming Graphs</p>
                    </div>
                    <p>Graphs, Graph Summarization, Python</p>
                    <p>Final year research project carried on the area of massive streaming graph summarization.</p>
                </li>
                <li>
                    <div>
                        <p>Jan. 2018 - Mar. 2020</p><p>-</p><p className="projectTitle">TessTA</p>
                    </div>
                    <p>ML, OCR, React, Java, Spring Boot, Hibernate, Tesseract, AWS</p>
                    <p>OCR Solution for Sinhala language using Tesseract OCR Engine.</p>
                </li>
                <li>
                    <div>
                        <p>Jul. 2018 - Jan. 2019</p><p>-</p><p className="projectTitle">Machine Learning over Encrypted Data</p>
                    </div>
                    <p>ML, Encryption, Tensorflow, Python, Google Cloud Platform</p>
                    <p>I worked on adding a layer over Tensorflow to facilitate machine learning on encrypted data over a distributed network of machines.</p>
                </li>
                <li>
                    <div>
                        <p>Feb. 2017 - Nov. 2017</p><p>-</p><p className="projectTitle">Intelligent Traffic Light System</p>
                    </div>
                    <p>Tensorflow, Python, Angular, NodeJS, Raspberry Pi, Arduino, Ionic Framework, GCP</p>
                    <p>Traditional time interval based traffic light system was automated to remove the involvement of traffic officers.</p>
                </li>
                <li>
                    <div>
                        <p>Mar. 2016 - Jan. 2017</p><p>-</p><p className="projectTitle">Bra Elasticity Analyzing System</p>
                    </div>
                    <p>Image processing, OpenCV, Java, Swing</p>
                    <p>Implemented a way to compare the elasticity of sports bras using image processing.</p>
                </li>
                <li>
                    <div>
                        <p>Mar. 2016 - Jan. 2017</p><p>-</p><p className="projectTitle">Yarn Detection System</p>
                    </div>
                    <p>Image processing, OpenCV, Python, Raspberry Pi</p>
                    <p>Solution to detect the knots of yarn threads in glove weaving machines.</p>
                </li>
                <li>
                    <div>
                        <p>Jan. 2016 - Jun. 2016</p><p>-</p><p className="projectTitle">Glove Defect Identification System</p>
                    </div>
                    <p>Image processing, OpenCV, Python</p>
                    <p>Identified the common defect of gloves using image processing as they are being passed through a conveyor belt.</p>
                </li>
                <li>
                    <div>
                        <p>Jan. 2016 - Jun. 2016</p><p>-</p><p className="projectTitle">Smart Glove</p>
                    </div>
                    <p>Java, JavaFX, FSR 400, Arduino</p>
                    <p>A glove prototype that can measure the pressure distribution and the acceleration of hand in order to derive the best patterns of movements for Cricket players in relation with the hand pressure.</p>
                </li>
            </ul>
        </div>
    </Layout>
)

export default ProjectsPage
