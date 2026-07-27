import { education } from "@data/education";
import { experience } from "@data/experience";
import { impactStories } from "@data/impactStories";
import { portfolioLinks } from "@data/links";
import { navigationItems } from "@data/navigation";
import { skills } from "@data/skills";

const expectUnique = (values: readonly string[]) => {
    expect(new Set(values).size).toBe(values.length);
};

describe("portfolio data", () => {
    it("defines the canonical portfolio links", () => {
        expect(portfolioLinks).toEqual({
            cv: "https://github.com/RossCarterr/CV/raw/main/Ross'_CV.pdf",
            github: "https://github.com/RossCarterr",
            linkedin: "https://www.linkedin.com/in/ross-carterr",
            email: "mailto:ross29.8@hotmail.com",
        });
    });

    it("defines unique navigation labels and section targets", () => {
        expectUnique(navigationItems.map(({ label }) => label));
        expectUnique(navigationItems.map(({ href }) => href));
        expect(navigationItems.every(({ href }) => href.startsWith("#"))).toBe(true);
    });

    it("defines complete skill categories without duplicate tags", () => {
        expectUnique(skills.map(({ title }) => title));

        for (const category of skills) {
            expect(category.title.trim()).not.toBe("");
            expect(category.tags.length).toBeGreaterThan(0);
            expectUnique(category.tags);
        }
    });

    it("defines complete and distinct impact stories", () => {
        expectUnique(impactStories.map(({ title }) => title));

        for (const story of impactStories) {
            expect(story.kicker.trim()).not.toBe("");
            expect(story.title.trim()).not.toBe("");
            expect(story.description.trim()).not.toBe("");
        }
    });

    it("defines distinct roles with at least one experience highlight", () => {
        expectUnique(experience.map(({ company, title }) => `${company}-${title}`));

        for (const role of experience) {
            expect(role.company.trim()).not.toBe("");
            expect(role.dates.trim()).not.toBe("");
            expect(role.highlights.length).toBeGreaterThan(0);
            expectUnique(role.highlights);
        }
    });

    it("defines complete education entries", () => {
        expectUnique(education.map(({ title }) => title));

        for (const item of education) {
            expect(item.institution.trim()).not.toBe("");
            expect(item.description.trim()).not.toBe("");
        }
    });
});