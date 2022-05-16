import React from "react"

import Layout from "../components/layout"
import people from "../data/people"

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
                        {people.nalinranasinghe.anchor}
                        <br/>
                        <span className="institute-text">{people.nalinranasinghe.position}</span>
                    </li>
                    <li className="content-text">
                        {people.mohammadnabeel.anchor}
                        <br/>
                        <span className="institute-text">{people.mohammadnabeel.position}</span>
                    </li>
                    <li className="content-text">
                        {people.gihanseneviratne.anchor}
                        <br/>
                        <span className="institute-text">{people.gihanseneviratne.position}</span>
                    </li>
                    <li className="content-text">
                        {people.noelfernando.anchor}
                        <br/>
                        <span className="institute-text">{people.noelfernando.position}</span>
                    </li>
                </ul>
                <h2 className="people-subtitle">Colleagues</h2>
                <ul className="people-wrapper">
                    <li className="content-text">
                        {people.disnirathnayake.anchor}
                        <br/>
                        <span className="institute-text">{people.disnirathnayake.position}</span>
                    </li>
                    <li className="content-text">
                        {people.amilaindika.anchor}
                        <br/>
                        <span className="institute-text">{people.amilaindika.position}</span>
                    </li>
                    <li className="content-text">
                        {people.indrajithekanayake.anchor}
                        <br/>
                        <span className="institute-text">{people.indrajithekanayake.position}</span>
                    </li>
                </ul>
            </div>
        </div>
    </Layout>
)

export default PeoplePage
