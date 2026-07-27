import type { EducationItem } from "@/types/portfolio";

export const education = [
    {
        title: "BSc (Hons) Computer Games Programming - First Class Honours",
        institution: "Edge Hill University, 2014 to 2017",
        description:
            "Studied C# and Java programming using Unity, Participated in multiple Games Jam competitions and " +
            "Winner of Barclays Tech Challenge 2016",
    }
] as const satisfies readonly EducationItem[];