import type { EducationItem } from "@/types/portfolio";

export const education = [
    {
        title: "title",
        institution: "institution",
        description:
            "blah blah blah",
    }
] as const satisfies readonly EducationItem[];