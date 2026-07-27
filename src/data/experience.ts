import type { ExperienceRole } from "@/types/portfolio";

export const experience  = [
    {
        title: "Technical Lead",
        company: "Diageo",
        dates: "September 2025 to Present",
        highlights: [
            "Lead Java, Spring Boot, and AWS delivery across high-scale consumer platforms.",
            "Architect greenfield internal services supporting marketing teams across the organisation.",
            "Develop AI agents that improve marketing brief quality and promote content reuse.",
            "Coordinate internal teams and external partners to align technical delivery with business priorities.",
        ],
    },
    {
        title: "Senior Software Engineer",
        company: "Diageo",
        dates: "November 2022 to September 2025",
        highlights: [
            "Led Java, Spring Boot, and AWS delivery across high-scale consumer platforms.",
            "Modernised services, infrastructure, and delivery practices across internal and supplier teams.",
            "Built production AI and machine-learning integrations for consumer-facing services.",
            "Supported technical decision-making by evaluating trade-offs across scalability, reliability, and delivery timelines.",
        ],
    },
    {
        title: "Senior Software Engineer",
        company: "Jaguar Land Rover",
        dates: "October 2020 to November 2022",
        highlights: [
            "Developed microservices for in-vehicle infotainment systems while maintaining legacy platform services.",
            "Provided production support for critical services, investigating incidents and driving timely resolutions.",
            "Line managed four software engineers, supporting career development, delivery performance, and day-to-day engineering practices.",
            "Led development activity for software releases, coordinating delivery and release readiness.",
        ],
    },
    {
        title: "Software Engineer",
        company: "Qurate Retail Group",
        dates: "August 2017 to October 2020",
        highlights: [
            "Developed RESTful APIs and web applications supporting European systems within a global engineering team.",
            "Improved business processes by building and supporting applications in a fast-moving integration environment.",
            "Collaborated with cross-functional teams to deliver reliable solutions aligned with operational needs.",
        ],
    },
    {
        title: "Games Engineer (Unpaid 2 week internship)",
        company: "BBC",
        dates: "May 2017",
        highlights: [
            "Evaluated third-party games for suitability, quality, and compatibility with BBC children’s platforms.",
            "Supported testing and deployment of approved games to the CBBC and CBeebies websites.",
            "Worked with the team to review external content and ensure platform readiness before release.",
        ],
    },
    {
        title: "Games Developer",
        company: "CyberGaTE",
        dates: "April 2016 to August 2017",
        highlights: [
            "Developed an educational cyber security game designed to teach common workplace security risks and prevention strategies.",
            "Created game assets and collaborated with the team to deliver gamified training applications within project timelines.",
            "Worked with business stakeholders to shape learning outcomes and improve the effectiveness of training experiences.",
        ],
    },
] as const satisfies readonly ExperienceRole[];