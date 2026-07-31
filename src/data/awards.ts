import type {Awards} from "@/types/portfolio";

export const awards = [
    {
        title: "Best Use of AI (International)",
        issuer: "Campaign",
        date: "Jun 2025",
        description:
            "Contributed to the award-winning \"What's Your Cocktail\" API, creating the Flavorprint technology to deliver personalised cocktail recommendations based on digital flavour profiles.",
        link: "https://www.campaignlive.co.uk/article/campaign-tech-awards-winners-2025-best-use-ai-international/1920103?",
    },
    {
        title: "Gold Award",
        issuer: "The Drum Awards Marketing EMEA",
        date: "Jun 2025",
        description:
            "Helped build the AI-powered \"What's Your Cocktail\" experience, combining flavour intelligence and user preferences to create smarter, more engaging drink recommendations.",
        link: "https://www.thedrummarketingawards.com/emea/en/page/results#/dma-emea/2025/data-insight/whats-your-cocktail-smart-ai-powered-ad",
    },
    {
        title: "Forge Future Back New Frontiers Winner",
        issuer: "Diageo - Breakthrough Innovation",
        date: "Oct 2023",
        description:
            "Created the \"What's Your Whisky\" AI prediction service, recommending whiskies from quiz responses and flavour ratings.",
        link: "",
    },
    {
        title: "Barclays Technology Challenge 2016 Winners",
        issuer: "Barclays, BBC and Bank of America",
        date: "Nov 2016",
        description:
            "Part of the winning university team in a four-week technology challenge, creating and pitching an image-based banking concept to judges from Barclays, BBC and Bank of America.",
        link: "",
    },
] as const satisfies readonly Awards[];