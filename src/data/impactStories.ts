import type { ImpactStory } from "@/types/portfolio";

export const impactStories = [
    {
        kicker: "Personalisation Platform",
        title: "Scaled FlavorPrint to Over 70 Million Consumer Profiles",
        description:
            "Architected and expanded Diageo's reusable taste-personalisation platform across whisky, beer, tequila, cocktails and food recommendations, powered by Java, Spring Boot microservices on ECS, MongoDB, and SageMaker.",
        metric: "70M+",
        badge: "Scale & Growth",
    },
    {
        kicker: "Applied AI & Recognition",
        title: "Delivered Award-Winning AI Marketing & Cocktail Products",
        description:
            "Engineered high-volume AI advertising and recommendation services processing millions of daily requests with sub-200ms latency. 'What’s Your Cocktail' won 'Best Use of AI' at the Campaign Tech Awards 2025 and Gold at The Drum Marketing Awards 2025.",
        metric: "<200ms",
        badge: "Award-Winning AI",
    },
    {
        kicker: "Engineering Governance",
        title: "Raised Automated Test Coverage from Zero to Over 80%",
        description:
            "Established engineering standards, ADRs, PR review processes, automated CI/CD pipelines, and SonarQube quality gates across multiple team portfolios, drastically boosting release confidence and maintainability.",
        metric: "80%+",
        badge: "Quality Engineering",
    },
    {
        kicker: "Connected Platforms",
        title: "Cloud-Native Backend for Connected Dispenser Systems",
        description:
            "Delivered Java, Spring Boot, AWS Lambda, AWS Glue, and DynamoDB services supporting real-time data pipelines and mobile experiences for smart bar dispensers and reusable kegs.",
        metric: "Cloud-Native",
        badge: "IoT & Distributed Systems",
    },
] as const satisfies readonly ImpactStory[];