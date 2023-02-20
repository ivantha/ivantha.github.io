import React from "react"
import "../styles/pages/experience.scss"
import Layout from "../components/layout"

const ExperiencePage = () => {
    return (
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
                                <li>Advised by <b>Dr. Noel Fernando</b></li>
                                <li>Conducted research on solid waste generation patterns in cities using machine learning techniques, which involved collecting and analyzing time series data over a several decades.</li>
                                <li>Developed and implemented machine learning models to forecast solid waste generation patterns, which improved the efficiency of waste management planning and resource allocation.</li>
                                <li>Contributed to a publication on solid waste management in IEEE Access, which highlighted the research findings and their implications for waste management practices.</li>
                                <li>Demonstrated a strong ability to work independently, manage time effectively, and prioritize tasks to meet project deadlines.</li>
                            </ul>
                            <span className="date-country-text">May. 2021 - Present</span><br/>
                            <span className="date-country-text">Sri Lanka</span>
                        </li>
                        <li className="research-wrapper">
                            <h3>Researcher (Part-time)</h3>
                            <span className="institute-text">Sustainable Computing Research (SCoRe) Lab</span>
                            <ul className="research-content-text">
                                <li>Advised by <b>Dr. Mohamed Nabeel</b></li>
                                <li>Working on Machine Learning based Internet Domain Entity Matching and its Applications.</li>
                            </ul>
                            <span className="date-country-text">Aug. 2020 - Present</span><br/>
                            <span className="date-country-text">Sri Lanka</span>
                        </li>
                        <li className="research-wrapper">
                            <h3>Research Intern (Full-time)</h3>
                            <span className="institute-text">University of Colombo School of Computing - Distributed Computing Group</span>
                            <ul className="research-content-text">
                                <li>Advised by <b>Dr. Nalin Ranasinghe</b></li>
                                <li>Successfully developed and implemented a new layer over Tensorflow to facilitate machine learning on encrypted data over a distributed network of machines, improving data security and privacy.</li>
                                <li>Presented research findings at the SLASSCOM conference, demonstrating excellent communication and presentation skills.</li>
                            </ul>
                            <span className="date-country-text">Jul. 2018 - Jan. 2019</span><br/>
                            <span className="date-country-text">Sri Lanka</span>
                        </li>
                        <li className="research-wrapper">
                            <h3>Software Developer - R&D (Contract)</h3>
                            <span className="institute-text">Language Matters</span>
                            <ul className="research-content-text">
                                <li>Supervised by <b>Dr. Leonie Solomons</b></li>
                                <li>Working part time on developing an OCR solution for Sinhala language using Tesseract
                                    OCR Engine.
                                </li>
                            </ul>
                            <span className="date-country-text">Jan. 2018 - Mar. 2020</span><br/>
                            <span className="date-country-text">Sri Lanka</span>
                        </li>
                        <li className="research-wrapper">
                            <h3>Software Developer - R&D (Contract)</h3>
                            <span className="institute-text">Dreamteam IT Solutions</span>
                            <ul className="research-content-text">
                                <li>Supervised by <b>Dr. Gihan Kuruppu</b></li>
                                <li>Provided R&D solutions to industrial problems such as Bra Elasticity Analyzing
                                    System, Yarn Detection System and Glove Defect Identification System.
                                </li>
                            </ul>
                            <span className="date-country-text">Mar. 2016 - Jan. 2017</span><br/>
                            <span className="date-country-text">Sri Lanka</span>
                        </li>
                    </ul>
                    <div className="experience-divider"></div>
                    <h2 className="experience-subtitle">Professional Experience</h2>
                    <ul>
                        <li className="research-wrapper">
                            <h3>Senior Data Science Engineer (Full-time)</h3>
                            <span className="institute-text">WSO2</span><br/>
                            <ul className="research-content-text">
                                <li>Developed and deployed machine learning models to optimize performance and enhance functionality of software products.</li>
                                <li>Collaborated with the product team to incorporate insights from machine learning algorithms into WSO2's core product offerings, resulting in increased customer engagement and sales.</li>
                                <li>Developed and maintained custom data visualization dashboards for internal stakeholders, enabling faster and more effective decision-making.</li>
                                <li>Contributed to the development and implementation of best practices for data science, including code documentation, version control, and model evaluation.</li>
                            </ul>
                            <span className="date-country-text">Nov. 2021 - Present</span><br/>
                            <span className="date-country-text">Sri Lanka</span>
                        </li>
                        <li className="research-wrapper">
                            <h3>Data Science Engineer (Full-time)</h3>
                            <span className="institute-text">WSO2</span><br/>
                            <ul className="research-content-text">
                                <li>Conducted exploratory data analysis to identify trends and patterns and made data-driven recommendations to improve business strategies.</li>
                                <li>Presented findings and insights from data analyses to both technical and non-technical stakeholders.</li>
                                <li>Collaborated with cross-functional teams to identify and define business problems, and developed solutions to meet business objectives.</li>
                            </ul>
                            <span className="date-country-text">Apr. 2021 - Oct. 2021</span><br/>
                            <span className="date-country-text">Sri Lanka</span>
                        </li>
                        <li className="research-wrapper">
                            <h3>Software Engineer - IAM Team (Full-time)</h3>
                            <span className="institute-text">WSO2</span>
                            <ul className="research-content-text">
                                <li>Designed and implemented a new CORS architecture for Identity Server 5.11, improving security and enabling cross-origin resource sharing.</li>
                                <li>Contributed to customer support efforts by providing timely and effective solutions to product issues, resulting in increased customer satisfaction and retention.</li>
                                <li>Investigated the FIDO capabilities of Identity Server and proposed changes necessary for its adoption across the platform, enhancing the product's authentication capabilities.</li>
                                <li>Worked on configuring Identity Server and propagating necessary configurations in tenanted URL mode, ensuring seamless and efficient operation across multiple tenants.</li>
                                <li>Successfully managed and prioritized multiple projects simultaneously, ensuring on-time delivery.</li>
                                <li>Proactively sought out new technologies and approaches to improve product performance and functionality.</li>
                            </ul>
                            <span className="date-country-text">Mar. 2020 - Mar. 2021</span><br/>
                            <span className="date-country-text">Sri Lanka</span>
                        </li>
                        <li className="research-wrapper">
                            <h3>Student Developer</h3>
                            <span className="institute-text">CERN-HSF - Google Summer of Code</span>
                            <ul className="research-content-text">
                                <li>Worked as a Google Summer of Code Participant in collaboration with CERN-HSF,
                                    ownCloud and AARNet to provide a prototype of a new web UI for CERNBox that will
                                    provide an immersive user experience.
                                </li>
                            </ul>
                            <span className="date-country-text">May. 2018 - Aug. 2018</span><br/>
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
                            <span className="date-country-text">Jan. 2016 - Jun. 2016</span><br/>
                            <span className="date-country-text">Sri Lanka</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default ExperiencePage
