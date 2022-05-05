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
                <ul>
                    <li><p>Dr. Nalin Ranasinghe</p><p>-</p><p>Senior Lecturer at University of Colombo</p></li>
                    <li><p>Dr. Mohammad Nabeel</p><p>-</p><p>Research Scientist at Qatar Computing Research Institute (QCRI)</p></li>
                    <li><p>Mr. Gihan Seneviratne</p><p>-</p><p>Senior Lecturer at University of Colombo</p></li>
                    <li><p>Dr. Noel Fernando</p><p>-</p><p>Senior Lecturer at University of Colombo</p></li>
                </ul>
                <h2>Colleagues</h2>
                <ul>
                    <li><p>Ms. Disni Rathnayake</p><p>-</p><p>Research Assistant at University of Colombo</p></li>
                    <li><p>Mr. Amila Indika</p><p>-</p><p>Lecturer (On contract) at University of Peradeniya</p></li>
                    <li><p>Mr. Indrajith Ekanayake</p><p>-</p><p>Visiting Lecturer at Open University of Sri Lanka</p></li>
                </ul>
            </div>
         </div>
    </Layout>
)

export default PeoplePage
