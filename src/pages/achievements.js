import React from "react"

import Layout from "../components/layout"

const achievements = [
    {
        place: "Merit Award",
        event: "Datathon (SLIIT Codefest) by Sri Lanka Institute of Information Technology",
        year: "2019",
        country: "Sri Lanka"
    },
    {
        place: "1st place",
        event: "Codezilla by Mozilla Campus Club of Uva Wellassa University",
        year: "2018",
        country: "Sri Lanka"
    },
    {
        place: "1st place",
        event: "LetMeHack by Sabaragamuwa University",
        year: "2018",
        country: "Sri Lanka"
    },
    {
        place: "Participant",
        event: "HackZurich by Digital Festival",
        year: "2019",
        country: "Switzerland"
    },
    {
        place: "Participant",
        event: "Hack The North by University of Waterloo",
        year: "2018",
        country: "Canada"
    },
    {
        place: "2nd place",
        event: "Presistent Hackathon by Persistent Systems Lanka",
        year: "2017",
        country: "Sri Lanka"
    },
    {
        place: "2nd place",
        event: "HACKiNTRA by University of Jaffna",
        year: "2017",
        country: "Sri Lanka"
    },
    {
        place: "Finalist",
        event: "CodeFest Designathon by Sri Lanka Institute of Information Technology",
        year: "2017",
        country: "Sri Lanka"
    },
    {
        place: "Finalist",
        event: "SS12 Asia by IEEE",
        year: "2017",
        country: "Sri Lanka"
    },
    {
        place: "3rd place",
        event: "Dialog Game Dev Hackathon by Dialog Axiata",
        year: "2017",
        country: "Sri Lanka"
    },
    {
        place: "1st place",
        event: "Mozilla Web Maker Party by Mozilla Club of University of Colombo School of Computing",
        year: "2016",
        country: "Sri Lanka"
    },
    {
        place: "2nd place",
        event: "CodeFest Tertiary Hackathon by Sri Lanka Institute of Information Technology",
        year: "2016",
        country: "Sri Lanka"
    },
    {
        place: "1st place",
        event: "IEEE preXtreme 1.0 by IEEE Student Branch of University of Colombo School of Computing",
        year: "2016",
        country: "Sri Lanka"
    },
    {
        place: "6th place",
        event: "ACES Coders by University of Peradeniya",
        year: "2016",
        country: "Sri Lanka"
    },
    {
        place: "5th place",
        event: "Code Expertz by University of Moratuwa",
        year: "2016",
        country: "Sri Lanka"
    },
]

const AchievementsPage = () => (
    <Layout>
        <div className="achievementsLayout section-wrapper">
            <div className="section-title">
                <h1>Achievements</h1>
            </div>
            <div className="section-items">
                <ul>
                    {achievements.map(achievement => (
                        <li key={achievement.url} className="achievements-wrapper">
                            <span className="institute-text">{achievement.year} | {achievement.place}</span>
                            <h3>{achievement.event}</h3>
                            <span className="institute-text country">{achievement.country}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </Layout>
)

export default AchievementsPage
