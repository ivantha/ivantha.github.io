import React from "react"

import Layout from "../components/layout"

const PeoplePage = () => (
    <Layout>
        <div className="peopleLayout section-wrapper">
            <div className="section-title">
                <h1>People</h1>
            </div>
            <div className="section-items">
                <h2>Advisors</h2>
                <ul className="people-wrapper">
                    <li className="content-text">
                        <a className="link" href="https://ucsc.cmb.ac.lk/profile/dnr/" target="_blank" rel="noopener noreferrer">Dr. Nalin Ranasinghe</a>
                        <br/>
                        <span className="institute-text">
                            Senior Lecturer | University of Colombo
                        </span>
                    </li>
                    <li className="content-text">
                        <a className="link" href="https://www.hbku.edu.qa/en/staff/dr-mohamed-nabeel" target="_blank" rel="noopener noreferrer">Dr. Mohammad Nabeel</a>
                        <br/>
                        <span className="institute-text">
                            Research Scientist | Qatar Computing Research Institute (QCRI)
                        </span>
                    </li>
                    <li className="content-text">
                        <a className="link" href="https://ucsc.cmb.ac.lk/profile/gps/" target="_blank" rel="noopener noreferrer">Mr. Gihan Seneviratne</a>
                        <br/>
                        <span className="institute-text">
                            Senior Lecturer | University of Colombo
                        </span>
                    </li>
                    <li className="content-text">
                        <a className="link" href="https://ucsc.cmb.ac.lk/profile/nas/" target="_blank" rel="noopener noreferrer">Dr. Noel Fernando</a>
                        <br/>
                        <span className="institute-text">
                            Senior Lecturer | University of Colombo
                        </span>
                    </li>
                </ul>
                <h2 className="people-subtitle">Colleagues</h2>
                <ul className="people-wrapper">
                    <li className="content-text">
                        <a className="link" href="https://www.linkedin.com/in/disni-rathnayake-3178b210b/" target="_blank" rel="noopener noreferrer">Ms. Disni Rathnayake</a>
                        <br/>
                        <span className="institute-text">
                            Research Assistant | University of Colombo
                        </span>
                    </li>
                    <li className="content-text">
                        <a className="link" href="https://www.linkedin.com/in/amila-indika/" target="_blank" rel="noopener noreferrer">Mr. Amila Indika</a>
                        <br/>
                        <span className="institute-text">
                            Lecturer (On contract) | University of Peradeniya
                        </span>
                    </li>
                    <li className="content-text">
                        <a className="link" href="https://www.linkedin.com/in/indrajithek/" target="_blank" rel="noopener noreferrer">Mr. Indrajith Ekanayake</a>
                        <br/>
                        <span className="institute-text">
                            Visiting Lecturer | Open University of Sri Lanka
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </Layout>
)

export default PeoplePage
