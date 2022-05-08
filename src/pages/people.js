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
                        Dr. Nalin Ranasinghe <br />
                        <span className="institute-text">
                            Senior Lecturer | University of Colombo
                        </span>
                    </li>
                    <li className="content-text">
                        Dr. Mohammad Nabeel <br />
                        <span className="institute-text">
                            Research Scientist | Qatar Computing Research Institute (QCRI)
                        </span>
                    </li>
                    <li className="content-text">
                        Mr. Gihan Seneviratne <br />
                        <span className="institute-text">
                            Senior Lecturer | University of Colombo
                        </span>
                    </li>
                    <li className="content-text">
                        Dr. Noel Fernando <br />
                        <span className="institute-text">
                            Senior Lecturer | University of Colombo
                        </span>
                    </li>
                </ul>
                <h2 className="people-subtitle">Colleagues</h2>
                <ul className="people-wrapper">
                    <li className="content-text">
                        Ms. Disni Rathnayake <br />
                        <span className="institute-text">
                        Research Assistant | University of Colombo
                        </span>
                    </li>
                    <li className="content-text">
                        Mr. Amila Indika <br />
                        <span className="institute-text">
                        Lecturer (On contract) | University of Peradeniya
                        </span>
                    </li>
                    <li className="content-text">
                        Mr. Indrajith Ekanayake <br />
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
