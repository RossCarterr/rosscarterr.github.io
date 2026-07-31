export type SkillIconName = "cloud" | "code" | "database" | "people" | "server";

export interface SkillCategory {
    readonly title: string;
    readonly icon: SkillIconName;
    readonly tags: readonly string[];
}

export interface ImpactStory {
    readonly kicker: string;
    readonly title: string;
    readonly description: string;
}

export interface Awards {
    readonly title: string;
    readonly issuer: string;
    readonly date: string;
    readonly description: string;
    readonly link: string;
}

export interface ExperienceRole {
    readonly title: string;
    readonly company: string;
    readonly dates: string;
    readonly highlights: readonly string[];
}

export interface EducationItem {
    readonly title: string;
    readonly institution: string;
    readonly description: string;
}

export interface NavigationItem {
    readonly label: string;
    readonly href: `#${string}`;
}