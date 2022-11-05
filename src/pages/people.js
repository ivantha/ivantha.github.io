import React from "react"
import "../styles/pages/people.scss"
import Layout from "../components/layout"
import people from "../data/people"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const alphabeticalList = [
    people.amilaindika,
    people.dinalherath,
    people.dinunifernando,
    people.disnirathnayake,
    people.gihanseneviratne,
    people.harindasamarasekara,
    people.mohammadnabeel,
    people.nalinranasinghe,
    people.noelfernando,
    people.sumedhedissanayake,
    people.upuljayasinghe,
]

const PeoplePage = () => {
    return (
        <Layout>
            <div className="peopleLayout section-wrapper">
                <div className="section-title">
                    <h1>People</h1>
                </div>
                <h2 className="people-subtitle">Present Affiliations</h2>
                <div className="section-items">
                    <ul className="alt-people-wrapper">
                        <li className="content-text">
                            <span className="institute-text">I am collaborating with <OutboundLink className="link"
                                                                                        href={people.amilaindika.link}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer">{people.amilaindika.name}</OutboundLink> and <OutboundLink
                                className="link" href={people.upuljayasinghe.link} target="_blank"
                                rel="noopener noreferrer">{people.upuljayasinghe.namewithhonorifics}</OutboundLink> on "Privacy Preserved Machine Learning using Secure Multi-party Computing".</span>
                        </li>
                        <li className="content-text">
                            <span className="institute-text">I am collaborating with <OutboundLink className="link"
                                                                                        href={people.harindasamarasekara.link}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer">{people.harindasamarasekara.name}</OutboundLink> and <OutboundLink
                                className="link" href={people.sumedhedissanayake.link} target="_blank"
                                rel="noopener noreferrer">{people.sumedhedissanayake.name}</OutboundLink> on improving the current state of the Sinhala OCR.</span>
                        </li>
                        <li className="content-text">
                            <span className="institute-text">I am instructed by <OutboundLink className="link"
                                                                                   href={people.dinalherath.link}
                                                                                   target="_blank"
                                                                                   rel="noopener noreferrer">{people.dinalherath.namewithhonorifics}</OutboundLink>, <OutboundLink
                                className="link" href={people.dinunifernando.link} target="_blank"
                                rel="noopener noreferrer">{people.dinunifernando.namewithhonorifics}</OutboundLink>, and <OutboundLink
                                className="link" href={people.noelfernando.link} target="_blank"
                                rel="noopener noreferrer">{people.noelfernando.namewithhonorifics}</OutboundLink> on "Modeling and Prediction of Municipal Solid Waste Generation in Sri Lanka using Machine Learning Techniques".</span>
                        </li>
                        <li className="content-text">
                            <span className="institute-text">I am supervised by <OutboundLink className="link"
                                                                                   href={people.mohammadnabeel.link}
                                                                                   target="_blank"
                                                                                   rel="noopener noreferrer">{people.mohammadnabeel.namewithhonorifics}</OutboundLink> on "Machine Learning based Internet Domain Entity Matching and its Applications".</span>
                        </li>
                    </ul>
                    <div className="people-divider"></div>
                    <h2 className="people-subtitle">Past Affiliations</h2>
                    <ul className="alt-people-wrapper">
                        <li className="content-text">
                            <span className="institute-text">I was advised by <OutboundLink className="link"
                                                                                 href={people.nalinranasinghe.link}
                                                                                 target="_blank"
                                                                                 rel="noopener noreferrer">{people.nalinranasinghe.namewithhonorifics}</OutboundLink> in my bachelor's thesis at UCSC.</span>
                        </li>
                    </ul>
                    <div className="people-divider"></div>
                    <h2 className="people-subtitle">Alphabetical List</h2>
                    <ul className="people-wrapper">
                        {alphabeticalList.map(person => (
                            <li key={person.namewithhonorifics} className="content-text">
                                {person.namewithhonorifics}<br/>
                                <span className="institute-text">{person.position}</span><br/>
                                <span className="institute-text">
                                {person.web && <OutboundLink className="link" href={person.web} target="_blank"
                                                  rel="noopener noreferrer">[Web] </OutboundLink>}
                                    {person.linkedin && <OutboundLink className="link" href={person.linkedin} target="_blank"
                                                           rel="noopener noreferrer">[Linkedin] </OutboundLink>}
                                    {person.scholar && <OutboundLink className="link" href={person.scholar} target="_blank"
                                                          rel="noopener noreferrer">[Google Scholar]</OutboundLink>}
                                    {person.researchgate &&
                                        <OutboundLink className="link" href={person.researchgate} target="_blank"
                                           rel="noopener noreferrer">[ResearchGate]</OutboundLink>}
                                    </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default PeoplePage
