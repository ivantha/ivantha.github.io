import React from "react"

import Layout from "../components/layout"
import people from "../data/people"

const advisors = [
    {
        name: people.nalinranasinghe.anchor,
        position: people.nalinranasinghe.position
    },
    {
        name: people.mohammadnabeel.anchor,
        position: people.mohammadnabeel.position
    },
    {
        name: people.gihanseneviratne.anchor,
        position: people.gihanseneviratne.position
    },
    {
        name: people.noelfernando.anchor,
        position: people.noelfernando.position
    },
]

const colleagues = [
    {
        name: people.disnirathnayake.anchor,
        position: people.disnirathnayake.position
    },
    {
        name: people.amilaindika.anchor,
        position: people.amilaindika.position
    },
    {
        name: people.indrajithekanayake.anchor,
        position: people.indrajithekanayake.position
    },
]

const PeoplePage = () => (
    <Layout>
        <div className="peopleLayout section-wrapper">
            <div className="section-title">
                <h1>People</h1>
            </div>
            <div className="section-items">
                <h2 className="people-subtitle">Advisors</h2>
                <ul className="people-wrapper">
                    {advisors.map(advisor => (
                        <li className="content-text">
                            {advisor.name}<br/><span className="institute-text">{advisor.position}</span>
                        </li>
                    ))}
                </ul>
                <div className="people-divider"></div>
                <h2 className="people-subtitle">Colleagues</h2>
                <ul className="people-wrapper">
                    {colleagues.map(colleague => (
                        <li className="content-text">
                            {colleague.name}<br/><span className="institute-text">{colleague.position}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </Layout>
)

export default PeoplePage
