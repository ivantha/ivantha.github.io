import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import "../styles/pages/about.scss"
import Layout from "../components/layout"

const AboutPage = () => {
    const { personalYaml } = useStaticQuery(graphql`
        query {
            personalYaml {
                about_me
                interests_casual
                who_am_i
            }
        }
    `)

    const aboutMe = personalYaml?.about_me
    const interests = personalYaml?.interests_casual
    const hobbies = personalYaml?.who_am_i || []

    return (
        <Layout>
            <div className="aboutLayout section-wrapper">
                <div className="section-title">
                    <h1>About</h1>
                </div>
                <div className="section-items">
                    {aboutMe && (
                        <div>
                            <p>{aboutMe}</p>
                        </div>
                    )}
                    {interests && (
                        <div>
                            <h2>Interests</h2>
                            <p>{interests}</p>
                        </div>
                    )}
                    {hobbies.length > 0 && (
                        <div>
                            <h2>Hobbies</h2>
                            <ul>
                                {hobbies.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default AboutPage
