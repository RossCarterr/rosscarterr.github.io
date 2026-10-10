import { render, screen } from "@testing-library/react";
import { SkillsCard } from "@components/Skills/SkillsCard/SkillsCard";

describe("SkillsCard Component", () => {
    it("renders card title, icon, and tags", () => {
        render(
            <SkillsCard
                title="Frontend Development"
                icon="code"
                tags={["React", "TypeScript", "HTML5", "CSS3"]}
            />
        );

        expect(
            screen.getByRole("heading", { name: "Frontend Development", level: 3 })
        ).toBeInTheDocument();
        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("TypeScript")).toBeInTheDocument();
        expect(screen.getByText("HTML5")).toBeInTheDocument();
        expect(screen.getByText("CSS3")).toBeInTheDocument();
    });

    it("renders with different icons such as cloud and database", () => {
        const { rerender } = render(
            <SkillsCard
                title="Cloud Computing"
                icon="cloud"
                tags={["AWS", "Terraform"]}
            />
        );

        expect(
            screen.getByRole("heading", { name: "Cloud Computing", level: 3 })
        ).toBeInTheDocument();

        rerender(
            <SkillsCard
                title="Databases"
                icon="database"
                tags={["PostgreSQL", "DynamoDB"]}
            />
        );

        expect(
            screen.getByRole("heading", { name: "Databases", level: 3 })
        ).toBeInTheDocument();
    });
});
