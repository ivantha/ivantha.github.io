import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const orgs = {
    dreamteam: {
        fullname: "Dreamteam IT Solutions",
        shortname: "Dreamteam IT Solutions",
        url: "#",
        anchor: <OutboundLink className="link" href="#" target="_blank" rel="noopener noreferrer">Dreamteam IT Solutions</OutboundLink>,
    },
    ucsc: {
        fullname: "Univesity of Colombo School of Computing",
        shortname: "UCSC",
        url: "https://ucsc.cmb.ac.lk/",
        anchor: <OutboundLink className="link" href="https://ucsc.cmb.ac.lk/" target="_blank" rel="noopener noreferrer">UCSC</OutboundLink>,
        anchorfullname: <OutboundLink className="link" href="https://ucsc.cmb.ac.lk/" target="_blank" rel="noopener noreferrer">Univesity of Colombo School of Computing</OutboundLink>,
    },
    cernhsf: {
        fullname: "High-Energy Physics Software Foundation",
        shortname: "CERN-HSF",
        url: "https://hepsoftwarefoundation.org/",
        anchor: <OutboundLink className="link" href="https://hepsoftwarefoundation.org/" target="_blank" rel="noopener noreferrer">CERN-HSF</OutboundLink>,
    },
    owncloud: {
        fullname: "ownCloud",
        shortname: "ownCloud",
        url: "https://owncloud.com/",
        anchor: <OutboundLink className="link" href="https://owncloud.com/" target="_blank" rel="noopener noreferrer">ownCloud</OutboundLink>,
    },
    aarnet: {
        fullname: "Australian Academic and Research Network",
        shortname: "AARNet",
        url: "https://www.aarnet.edu.au/",
        anchor: <OutboundLink className="link" href="https://www.aarnet.edu.au/" target="_blank" rel="noopener noreferrer">AARNet</OutboundLink>,
    },
    score: {
        fullname: "Sustainable Computing Research Lab",
        shortname: "SCoRe Lab",
        url: "https://scorelab.org/",
        anchor: <OutboundLink className="link" href="https://scorelab.org/" target="_blank" rel="noopener noreferrer">SCoRe Lab</OutboundLink>,
        anchorfullname: <OutboundLink className="link" href="https://scorelab.org/" target="_blank" rel="noopener noreferrer">Sustainable Computing Research Lab</OutboundLink>,
    },
    qcri: {
        fullname: "Qatar Computing Research Institute",
        shortname: "QCRI",
        url: "https://www.hbku.edu.qa/en/qcri/about",
        anchor: <OutboundLink className="link" href="https://www.hbku.edu.qa/en/qcri/about" target="_blank" rel="noopener noreferrer">QCRI</OutboundLink>,
        anchorfullname: <OutboundLink className="link" href="https://www.hbku.edu.qa/en/qcri/about" target="_blank" rel="noopener noreferrer">Qatar Computing Research Institute</OutboundLink>,
    },
    wso2: {
        fullname: "WSO2",
        shortname: "WSO2",
        url: "https://wso2.com/",
        anchor: <OutboundLink className="link" href="https://wso2.com/" target="_blank" rel="noopener noreferrer">WSO2</OutboundLink>,
    },
}

export default orgs
