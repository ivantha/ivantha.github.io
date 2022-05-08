import * as React from "react"
import "../styles/styles.scss"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"

const IndexPage = () => {
    return (
        <Layout>
            <div className="homeLayout section-wrapper">
                <div className="section-title">
                    <h1>Home</h1>
                </div>
                <div className="section-items">
                    <div>
                        {/*<StaticImage src="../images/oim.png" alt="oshan" className="profile-img"/>*/}
                        <StaticImage
                            src="../images/oim.png"
                            alt="oshan"
                            placeholder="blurred"
                            layout="fixed"
                            // width={200}
                            height={200}
                            className="profile-img"
                        />
                    </div>
                    <div>
                        <p className="note">Can we have a collection (somewhere in this site) of logos of the places/orgs/companies that I've been involved in?</p>
                    </div>
                    <div>
                        <h2>Contact Details</h2>
                        <p>Phone: (+94) 71 908 4020</p>
                        <p>Email: oshan.ivantha@gmail.com</p>
                        <p>Google Scholar: https://scholar.google.com/citations?user=2FA0RngAAAAJ&hl=en</p>
                        <p>ResearchGate: https://www.researchgate.net/profile/Oshan-Mudannayake</p>
                        <p>arXiv: https://arxiv.org/search/cs?searchtype=author&query=Mudannayake%2C+O</p>
                        <p>Twitter: https://twitter.com/_ivantha</p>
                        <p>Linkedin: https://www.linkedin.com/in/ivantha/</p>
                        <p>GitHub: https://github.com/ivantha</p>
                    </div>
                    <div>
                        <h2>Research Interests</h2>
                        <p>Reinforcement Learning | Machine Learning | Artificial Intelligence</p>
                        <p>Game Theory | Computer Games</p>
                    </div>
                    <div>
                        <h2>[About Me]</h2>
                        <p>I am a Senior Data Science Engineer at WSO2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc mattis enim ut tellus elementum. Tincidunt augue interdum velit euismod. Id velit ut tortor pretium viverra.</p>
                        <p>Volutpat blandit aliquam etiam erat velit scelerisque in dictum. Ut tristique et egestas quis ipsum suspendisse ultrices. Aliquam eleifend mi in nulla. Proin sed libero enim sed faucibus. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui. Ornare suspendisse sed nisi lacus sed viverra tellus in.</p>
                        <p>Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Mollis aliquam ut porttitor leo a diam. Lorem donec massa sapien faucibus. Fringilla ut morbi tincidunt augue interdum velit euismod. Massa tincidunt nunc pulvinar sapien et ligula. Mauris augue neque gravida in fermentum. Libero volutpat sed cras ornare. Morbi leo urna molestie at elementum eu. Magna eget est lorem ipsum. Sem viverra aliquet eget sit amet tellus.</p>
                    </div>
                    <div>
                        <h2>News</h2>
                        <p>2022.04.17 - Started working on 'Sinhala OCR' with Indrajith Ekanayake.</p>
                        <p>2022.03.18 - Started working on 'Privacy Preserved Machine Learning' with Dr. Upul Jayasinghe and Amila Indika.</p>
                        <p>2022.03.18 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..</p>
                        <p>2022.03.18 -  Ut tristique et egestas quis. Cursus turpis massa tincidunt dui.</p>
                        <p>2022.03.18 - Sapien faucibus et molestie ac feugiat sed lectus vestibulum.</p>
                        <p>2022.03.18 - Integer quis auctor elit sed vulputate mi sit. Facilisis volutpat est velit egestas dui id. In hac habitasse platea dictumst vestibulum rhoncus.</p>
                        <p>2022.03.18 - At imperdiet dui accumsan sit amet.</p>
                        <p>2022.03.18 - Viverra suspendisse potenti nullam ac. Augue ut lectus arcu bibendum at varius.</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default IndexPage
