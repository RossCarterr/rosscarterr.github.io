import type { ExperienceRole } from "@/types/portfolio";

export const experience = [
    {
        title: "Lead Software Engineer",
        company: "Diageo",
        dates: "Sept 2025 to present",
        highlights: [
            "Architect and deliver greenfield cloud-native services supporting global marketing teams, improving scalability, maintainability, and delivery velocity.",
            "Lead the evolution of FlavorPrint into a reusable AI-driven personalisation platform spanning whisky, beer, tequila, cocktails and food recommendations.",
            "Spearhead Java and Spring Boot microservices on Amazon ECS with MongoDB and AWS SageMaker, modernizing APIs from Java 11/Spring 5 to Java 25/Spring Boot 4.",
            "Champion engineering governance frameworks including Architecture Decision Records (ADRs), PR reviews, and technical documentation.",
        ],
    },
    {
        title: "Senior Software Engineer",
        company: "Diageo",
        dates: "Nov 2022 to Sept 2025",
        highlights: [
            "Delivered award-winning AI marketing products recognised by Campaign Tech Awards ('Best Use of AI') and The Drum Marketing Awards (Gold for Data/Insight).",
            "Designed and deployed high-volume AI advertising services processing millions of daily requests with sub-200ms response times.",
            "Grew FlavorPrint platform from 400,000 to over 70 million consumer flavour profiles.",
            "Increased automated test coverage from 0% to over 80% across engineering portfolios, raising release quality.",
        ],
    },
    {
        title: "Senior Software Engineer",
        company: "Jaguar Land Rover",
        dates: "Oct 2020 to Nov 2022",
        highlights: [
            "Developed and enhanced microservices supporting connected vehicle infotainment platforms used across multiple vehicle programmes.",
            "Line managed and mentored a team of four software engineers, driving performance, career growth, and engineering excellence.",
            "Led software delivery activities across release cycles, coordinating development, testing, and deployment readiness.",
            "Provided production support for business-critical services, leading incident investigation and root cause analysis.",
        ],
    },
    {
        title: "Software Engineer",
        company: "Qurate Retail Group (QVC)",
        dates: "Aug 2017 to Oct 2020",
        highlights: [
            "Designed and developed RESTful APIs and enterprise applications supporting European retail operations within a globally distributed engineering environment.",
            "Delivered integration solutions that improved operational efficiency, data flow reliability, and business process automation.",
            "Collaborated closely with product, engineering, and business stakeholders to deliver customer-focused technology solutions.",
        ],
    },
    {
        title: "Games Engineer Unpaid Internship",
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
        dates: "Apr 2016 to Aug 2017",
        highlights: [
            "Developed and designed an educational cyber security game to teach common workplace security risks and prevention strategies.",
            "Created game assets and collaborated with the team to deliver gamified training applications within project timelines.",
            "Worked with business stakeholders to shape learning outcomes and improve the effectiveness of training experiences.",
        ],
    },
] as const satisfies readonly ExperienceRole[];