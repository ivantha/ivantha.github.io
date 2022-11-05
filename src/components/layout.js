import React from "react"
import "../styles/components/layout.scss"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"

const Layout = ({ children }) => {

    return (
        <>
            <Helmet htmlAttributes={{ lang: "en" }}>
                <meta charSet="utf-8" name="Oshan Mudannayake | AI Researcher"/>
                <title>Ivantha</title>
                <link rel="canonical" href="https://ivantha.github.io/"/>
            </Helmet>
            <div className="content">
                <div className="header">
                    <h2>Oshan Mudannayake</h2>
                </div>
                <div className="container">
                    <div className="navbar">
                        <Link to="/">Home</Link>
                        <Link to="/research">Research</Link>
                        <Link to="/publications">Publications</Link>
                        <Link to="/experience">Experience</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/certifications">Certifications</Link>
                        <Link to="/achievements">Achievements</Link>
                        <Link to="/workshops">Workshops</Link>
                        <Link to="/presentations">Presentations</Link>
                        <Link to="/volunteering">Volunteering</Link>
                        <Link to="/people">People</Link>
                        <Link to="/articles">Articles</Link>
                        <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">CV</a>
                        <Link to="/about">About</Link>
                        {/*<Link className="officeHours" to="/officehours">Office Hours</Link>*/}
                    </div>
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
