import React from "react"
import "../styles/components/layout.scss"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import { OutboundLink } from "gatsby-plugin-google-gtag"

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
                        {/*<Link to="/">Home</Link>*/}
                        <OutboundLink href="/">Home</OutboundLink>
                        {/*<Link to="/research">Research</Link>*/}
                        <OutboundLink href="/research">Research</OutboundLink>
                        {/*<Link to="/publications">Publications</Link>*/}
                        <OutboundLink href="/publications">Publications</OutboundLink>
                        {/*<Link to="/experience">Experience</Link>*/}
                        <OutboundLink href="/experience">Experience</OutboundLink>
                        {/*<Link to="/projects">Projects</Link>*/}
                        <OutboundLink href="/projects">Projects</OutboundLink>
                        {/*<Link to="/certifications">Certifications</Link>*/}
                        <OutboundLink href="/certifications">Certifications</OutboundLink>
                        {/*<Link to="/achievements">Achievements</Link>*/}
                        <OutboundLink href="/achievements">Achievements</OutboundLink>
                        {/*<Link to="/workshops">Workshops</Link>*/}
                        <OutboundLink href="/workshops">Workshops</OutboundLink>
                        {/*<Link to="/presentations">Presentations</Link>*/}
                        <OutboundLink href="/presentations">Presentations</OutboundLink>
                        {/*<Link to="/volunteering">Volunteering</Link>*/}
                        <OutboundLink href="/volunteering">Volunteering</OutboundLink>
                        {/*<Link to="/people">People</Link>*/}
                        <OutboundLink href="/people">People</OutboundLink>
                        {/*<Link to="/articles">Articles</Link>*/}
                        <OutboundLink href="/articles">Articles</OutboundLink>
                        <OutboundLink href="/cv.pdf" target="_blank" rel="noopener noreferrer">CV</OutboundLink>
                        {/*<Link to="/about">About</Link>*/}
                        <OutboundLink href="/about">About</OutboundLink>
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
