import React from "react"
import "../styles/pages/experience.scss"
import Layout from "../components/layout"

const ExperiencePage = () => (
    <Layout>
        <div className="experienceLayout section-wrapper">
            <div className="section-title">
                <h1>Experience</h1>
            </div>
            <div className="section-items">
                <h2 className="experience-subtitle">Research Experience</h2>
                <ul>
                    <li className="research-wrapper">
                        <h3>Research Assistant (Part-time)</h3>
                        <span className="institute-text">University of Colombo School of Computing</span>
                        <ul className="research-content-text">
                            <li>Advisor: <b>Dr. Noel Fernando</b></li>
                            <li>Working on Modeling and Prediction of Solid Waste Generation in Sri Lanka using Machine Learning Approaches.</li>
                        </ul>
                        <span className="date-country-text">May. 2021 - Present</span><br />
                        <span className="date-country-text">Sri Lanka</span>
                    </li>
                    <li className="research-wrapper">
                        <h3>Researcher (Part-time)</h3>
                        <span className="institute-text">Sustainable Computing Research (SCoRe) Lab</span>
                        <ul className="research-content-text">
                            <li>Advisor: <b>Dr. Mohamed Nabeel</b></li>
                            <li>Working on Machine Learning based Internet Domain Entity Matching and its Applications.</li>
                        </ul>
                        <span className="date-country-text">Aug. 2020 - Present</span><br />
                        <span className="date-country-text">Sri Lanka</span>
                    </li>
                    <li className="research-wrapper">
                        <h3>Research Intern (Full-time)</h3>
                        <span className="institute-text">University of Colombo School of Computing - Distributed Computing Group</span>
                        <ul className="research-content-text">
                            <li>Advisor: <b>Dr. Nalin Ranasinghe</b></li>
                            <li>Carried out a research study on the topic, Machine Learning Over Encrypted Data.</li>
                        </ul>
                        <span className="date-country-text">Jul. 2018 - Jan. 2019</span><br />
                        <span className="date-country-text">Sri Lanka</span>
                    </li>
                    <li className="research-wrapper">
                        <h3>Software Developer (Contract)</h3>
                        <span className="institute-text">Language Matters</span>
                        <ul className="research-content-text">
                            <li>Supervisor: <b>Dr. Leonie Solomons</b></li>
                            <li>Working part time on developing an OCR solution for Sinhala language using Tesseract OCR Engine.</li>
                        </ul>
                        <span className="date-country-text">Jan. 2018 - Mar. 2020</span><br />
                        <span className="date-country-text">Sri Lanka</span>
                    </li>
                    <li className="research-wrapper">
                        <h3>Software Developer (Contract)</h3>
                        <span className="institute-text">Dreamteam IT Solutions</span>
                        <ul className="research-content-text">
                            <li>Supervisor: <b>Dr. Gihan Kuruppu</b></li>
                            <li>Provided R&D solutions to industrial problems such as Bra Elasticity Analyzing System, Yarn Detection System and Glove Defect Identification System.</li>
                        </ul>
                        <span className="date-country-text">Mar. 2016 - Jan. 2017</span><br />
                        <span className="date-country-text">Sri Lanka</span>
                    </li>
                </ul>
                <div className="experience-divider"></div>
                <h2 className="experience-subtitle">Professional Experience</h2>
                <ul>
                    <li className="research-wrapper">
                        <h3>Senior Data Science Engineer (Full-time)</h3>
                        <span className="institute-text">WSO2</span><br />
                        {/*<ul className="research-content-text">*/}
                        {/*    <li></li>*/}
                        {/*</ul>*/}
                        <span className="date-country-text">Nov. 2021 - Present</span><br />
                        <span className="date-country-text">Sri Lanka</span>
                    </li>
                    <li className="research-wrapper">
                        <h3>Data Science Engineer (Full-time)</h3>
                        <span className="institute-text">WSO2</span><br />
                        {/*<ul className="research-content-text">*/}
                        {/*    <li>Improved the HR aspects of the company by introducing a model to predict the workforce requirement in the coming years.</li>*/}
                        {/*</ul>*/}
                        <span className="date-country-text">Apr. 2021 - Oct. 2021</span><br />
                        <span className="date-country-text">Sri Lanka</span>
                    </li>
                    <li className="research-wrapper">
                        <h3>Software Engineer - IAM Team (Full-time)</h3>
                        <span className="institute-text">WSO2</span>
                        <ul className="research-content-text">
                            <li>Designed and implemented the new CORS architecture for the Identity Server 5.11.</li>
                            <li>Worked extensively on customer support in order to give solutions for the product issues.</li>
                        </ul>
                        <span className="date-country-text">Mar. 2020 - Mar. 2021</span><br />
                        <span className="date-country-text">Sri Lanka</span>
                    </li>
                    <li className="research-wrapper">
                        <h3>Student Developer</h3>
                        <span className="institute-text">CERN-HSF - Google Summer of Code</span>
                        <ul className="research-content-text">
                            <li>Worked as a Google Summer of Code Participant in collaboration with CERN-HSF, ownCloud and AARNet to provide a prototype of a new web UI for CERNBox that will provide an immersive user experience.</li>
                        </ul>
                        <span className="date-country-text">May. 2018 - Aug. 2018</span><br />
                        <span className="date-country-text">Remote</span>
                    </li>
                </ul>
                <div className="experience-divider"></div>
                <h2 className="experience-subtitle">Teaching Experience</h2>
                <ul>
                    <li className="research-wrapper">
                        <h3>Course Instructor (Contract)</h3>
                        <span className="institute-text">Dreamteam IT Solutions</span>
                        <ul className="research-content-text">
                            <li>Conducted sessions for introductory robotics and Java 6.</li>
                        </ul>
                        <span className="date-country-text">Jan. 2016 - Jun. 2016</span><br />
                        <span className="date-country-text">Sri Lanka</span>
                    </li>
                </ul>
            </div>
        </div>
    </Layout>
)

export default ExperiencePage
