import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Layout = ({ children }) => {

    return (

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
                </div>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
