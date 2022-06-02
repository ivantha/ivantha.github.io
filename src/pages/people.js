import React from "react"
import "../styles/pages/people.scss"
import Layout from "../components/layout"
import people from "../data/people"

const alphabeticalList = [
    {
        name: people.amilaindika.namewithhonorifics,
        position: people.amilaindika.position,
        web: people.amilaindika.web,
        linkedin: people.amilaindika.linkedin,
        scholar: people.amilaindika.scholar,
        researchgate: people.amilaindika.scholar,
    },
    {
        name: people.disnirathnayake.namewithhonorifics,
        position: people.disnirathnayake.position,
        web: people.disnirathnayake.web,
        linkedin: people.disnirathnayake.linkedin,
        scholar: people.disnirathnayake.scholar,
        researchgate: people.disnirathnayake.scholar,
    },
    {
        name: people.indrajithekanayake.namewithhonorifics,
        position: people.indrajithekanayake.position,
        web: people.indrajithekanayake.web,
        linkedin: people.indrajithekanayake.linkedin,
        scholar: people.indrajithekanayake.scholar,
        researchgate: people.indrajithekanayake.scholar,
    },
    {
        name: people.gihanseneviratne.namewithhonorifics,
        position: people.gihanseneviratne.position,
        web: people.gihanseneviratne.web,
        linkedin: people.gihanseneviratne.linkedin,
        scholar: people.gihanseneviratne.scholar,
        researchgate: people.gihanseneviratne.scholar,
    },
    {
        name: people.mohammadnabeel.namewithhonorifics,
        position: people.mohammadnabeel.position,
        web: people.mohammadnabeel.web,
        linkedin: people.mohammadnabeel.linkedin,
        scholar: people.mohammadnabeel.scholar,
        researchgate: people.mohammadnabeel.scholar,
    },
    {
        name: people.nalinranasinghe.namewithhonorifics,
        position: people.nalinranasinghe.position,
        web: people.nalinranasinghe.web,
        linkedin: people.nalinranasinghe.linkedin,
        scholar: people.nalinranasinghe.scholar,
        researchgate: people.nalinranasinghe.scholar,
    },
    {
        name: people.noelfernando.namewithhonorifics,
        position: people.noelfernando.position,
        web: people.noelfernando.web,
        linkedin: people.noelfernando.linkedin,
        scholar: people.noelfernando.scholar,
        researchgate: people.noelfernando.scholar,
    },
]

const PeoplePage = () => (
    <Layout>
        <div className="peopleLayout section-wrapper">
            <div className="section-title">
                <h1>People</h1>
            </div>
            <div className="section-items">
                <ul className="people-wrapper">
                    <li className="content-text">
                        <span className="institute-text">I am currently supervised by <a className="link" href={people.noelfernando.link} target="_blank" rel="noopener noreferrer">{people.noelfernando.namewithhonorifics}</a> and <a className="link" href={people.mohammadnabeel.link} target="_blank" rel="noopener noreferrer">{people.mohammadnabeel.namewithhonorifics}</a> on multiple research work.</span>
                    </li>
                    <li className="content-text">
                        <span className="institute-text">I was advised by <a className="link" href={people.nalinranasinghe.link} target="_blank" rel="noopener noreferrer">{people.nalinranasinghe.namewithhonorifics}</a> in my bachelor's thesis at UCSC.</span>
                    </li>
                </ul>
                <div className="people-divider"></div>
                <h2 className="people-subtitle">Alphabetical list</h2>
                <ul className="people-wrapper">
                    {alphabeticalList.map(person => (
                        <li className="content-text">
                            {person.name}<br/>
                            <span className="institute-text">{person.position}</span><br/>
                            <span className="institute-text">
                                {person.web && <a className="link" href={person.web} target="_blank" rel="noopener noreferrer">[Web] </a>}
                                {person.linkedin && <a className="link" href={person.linkedin} target="_blank" rel="noopener noreferrer">[Linkedin] </a>}
                                {person.scholar && <a className="link" href={person.scholar} target="_blank" rel="noopener noreferrer">[Google Scholar]</a>}
                                {person.researchgate && <a className="link" href={person.researchgate} target="_blank" rel="noopener noreferrer">[ResearchGate]</a>}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </Layout>
)

export default PeoplePage
