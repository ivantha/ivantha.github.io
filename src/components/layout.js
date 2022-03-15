import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Layout = ({ children }) => {

    return (
        <>
            <div className="navbar">
                <Link className="active" to="/">Home</Link>
                <Link to="/publications">Publications</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/achievements">Achievements</Link>
                <Link to="/volunteering">Volunteering</Link>
                <Link to="/about">About</Link>
            </div>
            <main>
                {children}
            </main>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
