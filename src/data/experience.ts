import type { ExperienceRole } from "@/types/portfolio";

export const experience  = [
    {
        title: "title",
        company: "company",
        dates: "April 2023 to present",
        highlights: [
            "Blah blah blah",
            "Blah blah blah",
            "Blah blah blah",
            ],
    }
] as const satisfies readonly ExperienceRole[];