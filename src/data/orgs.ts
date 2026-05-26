export type Org = {
    fullname: string
    shortname: string
    url: string
}

export const orgs: Record<string, Org> = {
    dreamteam: {
        fullname: "Dreamteam IT Solutions",
        shortname: "Dreamteam IT Solutions",
        url: "#",
    },
    ucsc: {
        fullname: "University of Colombo School of Computing",
        shortname: "UCSC",
        url: "https://ucsc.cmb.ac.lk/",
    },
    cernhsf: {
        fullname: "High-Energy Physics Software Foundation",
        shortname: "CERN-HSF",
        url: "https://hepsoftwarefoundation.org/",
    },
    owncloud: {
        fullname: "ownCloud",
        shortname: "ownCloud",
        url: "https://owncloud.com/",
    },
    aarnet: {
        fullname: "Australian Academic and Research Network",
        shortname: "AARNet",
        url: "https://www.aarnet.edu.au/",
    },
    score: {
        fullname: "Sustainable Computing Research Lab",
        shortname: "SCoRe Lab",
        url: "https://scorelab.org/",
    },
    qcri: {
        fullname: "Qatar Computing Research Institute",
        shortname: "QCRI",
        url: "https://www.hbku.edu.qa/en/qcri/about",
    },
    wso2: {
        fullname: "WSO2",
        shortname: "WSO2",
        url: "https://wso2.com/",
    },
    paradigmai: {
        fullname: "ParadigmAI",
        shortname: "ParadigmAI",
        url: "https://paradigmai.com/",
    },
    cohere: {
        fullname: "Cohere For AI",
        shortname: "Cohere For AI",
        url: "https://cohere.com/research",
    },
    uom: {
        fullname: "University of Moratuwa",
        shortname: "UoM",
        url: "https://uom.lk/",
    },
}
