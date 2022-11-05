import React from "react"
import "../styles/pages/workshops.scss"
import Layout from "../components/layout"

const WorkshopsPage = () => {
    return (
        <Layout>
            <div className="workshopsLayout section-wrapper">
                <div className="section-title">
                    <h1>Workshops / Training Programs Attended</h1>
                </div>
                <div className="section-items">
                    <ul>
                        <li className="workshops-wrapper">
                            <h3>Nov. 2021 | Online Asian Machine Learning School (OAMLS)</h3>
                            <span className="content-text">The 13th Asian Conference on Machine Learning</span>
                        </li>
                        <li className="workshops-wrapper">
                            <h3>Nov. 2021 | AutoML Fall School</h3>
                        </li>
                        <li className="workshops-wrapper">
                            <h3>Aug. 2021 | ACM Europe Summer School on HPC Computer Architectures for AI and Dedicated
                                Applications</h3>
                            <span className="content-text">Barcelona Supercomputing Center and Universitat Politècnica de Catalunya</span>
                        </li>
                        <li className="workshops-wrapper">
                            <h3>Aug. 2021 | AI Summer School Singapore 2021</h3>
                            <span className="content-text">AI Singapore</span>
                        </li>
                        <li className="workshops-wrapper">
                            <h3>Jul. 2021 | Qiskit Global Summer School 2021: Quantum Machine Learning</h3>
                            <span className="content-text">Qiskit</span>
                        </li>
                        <li className="workshops-wrapper">
                            <h3>Aug. 2020 | AI Summer School Singapore 2020</h3>
                            <span className="content-text">AI Singapore</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default WorkshopsPage
