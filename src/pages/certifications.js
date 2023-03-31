import React from "react"
import "../styles/pages/certifications.scss"
import Layout from "../components/layout"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import certifications from "../data/certifications"

const CertificationsPage = () => {
    return (
        <Layout>
            <div className="certificationsLayout section-wrapper">
                <div className="section-title">
                    <h1>Certifications</h1>
                </div>
                <div className="section-items">
                    <div>
                        <h2>MOOCs</h2>
                        <ul>
                            {certifications.map(certificationItem => (
                                <li key={certificationItem.name} className="certification-wrapper">
                                    <h3>{certificationItem.year} | {certificationItem.name}</h3>
                                    <span className="institute-text">
                                    {certificationItem.institution} | <OutboundLink className="link"
                                                             href={certificationItem.certificateurl}
                                                             target="_blank" rel="noopener noreferrer">[Certificate]</OutboundLink>
                                </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="certification-divider"></div>
                    <div>
                        <h2 className="certification-subtitle">Professional Certifications</h2>
                        <ul>
                            <li className="certification-wrapper">
                                <h3>2015 | Oracle Certified Professional Java SE 6 Programmer</h3>
                                <span className="institute-text">Oracle</span>
                            </li>
                            <li className="certification-wrapper">
                                <h3>2015 | Robotics & Automation</h3>
                                <span className="institute-text">Dreamteam IT Solutions</span>
                            </li>
                            <li className="certification-wrapper">
                                <h3>2015 | Professional Certified Java Developer</h3>
                                <span className="institute-text">Dreamteam IT Solutions</span>
                            </li>
                            <li className="certification-wrapper">
                                <h3>2013 | Diploma in Software Engineering</h3>
                                <span className="institute-text">Esoft</span>
                            </li>
                            <li className="certification-wrapper">
                                <h3>2010 | Diploma in PC Hardware and Network Administration</h3>
                                <span className="institute-text">Esoft</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CertificationsPage
