import type {ImpactStory} from "@/types/portfolio";

export const impactStories = [
    {
        kicker: "Applied AI",
        title: "Delivered AI-Powered Intelligence for Global Marketing Workflows",
        description:
            "Led the integration of LLMs and AI agents into a global marketing service, transforming consumer insights into better briefs, smarter recommendations, and reusable content opportunities across marketing teams.",
    },
    {
        kicker: "Personalisation platform",
        title: "Scaled taste profiles from 400,000 to more than 70 million",
        description:
            "Expanded a reusable taste-personalisation platform across whisky, beer, tequila and cocktail experiences, backed by Java services, search and machine-learning endpoints.",
    },
    {
        kicker: "Engineering standards",
        title: "Raised automated test coverage from zero to more than 80%",
        description:
            "Established pull request review processes, built CI/CD pipelines from scratch, added SonarQube quality gates, and introduced ADRs plus automated unit, integration and acceptance testing across a portfolio of services.",
    },
    {
        kicker: "Connected devices",
        title: "Built backend services for reusable-keg and dispenser data",
        description:
            "Delivered Java, Spring Boot, Lambda, Glue and DynamoDB services supporting a mobile app and connected drinks-dispensing platform used by bars.",
    },
] as const satisfies readonly ImpactStory[];