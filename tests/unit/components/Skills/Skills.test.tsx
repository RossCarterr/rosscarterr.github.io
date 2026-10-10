import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Skills from "@components/Skills/Skills";
import { skills } from "@data/skills";

describe("Skills Component", () => {
    it("renders heading and all tab categories", () => {
        render(<Skills />);
        expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
        expect(
            screen.getByText(
                "Explore core technical domains, tools, and real-world project applications."
            )
        ).toBeInTheDocument();

        const tabs = screen.getAllByRole("tab");
        expect(tabs).toHaveLength(skills.length);
        expect(tabs[0]).toHaveAttribute("aria-selected", "true");
        expect(tabs[1]).toHaveAttribute("aria-selected", "false");
    });

    it("switches active category when clicking a tab", async () => {
        const user = userEvent.setup();
        render(<Skills />);

        const secondTab = screen.getByRole("tab", { name: skills[1].title });
        await user.click(secondTab);

        expect(secondTab).toHaveAttribute("aria-selected", "true");
        const panel = screen.getByRole("tabpanel");
        expect(panel).toHaveAttribute("id", "skill-panel-1");
        expect(screen.getByRole("heading", { name: skills[1].title, level: 3 })).toBeInTheDocument();
    });

    it("navigates next and previous categories via control buttons", async () => {
        const user = userEvent.setup();
        render(<Skills />);

        const nextBtn = screen.getByRole("button", { name: "Next skill category" });
        const prevBtn = screen.getByRole("button", { name: "Previous skill category" });

        // Navigate forward
        await user.click(nextBtn);
        expect(screen.getByRole("heading", { name: skills[1].title, level: 3 })).toBeInTheDocument();

        // Navigate backward
        await user.click(prevBtn);
        expect(screen.getByRole("heading", { name: skills[0].title, level: 3 })).toBeInTheDocument();

        // Navigate backward to wrap around to last category
        await user.click(prevBtn);
        const lastSkill = skills[skills.length - 1]!;
        expect(screen.getByRole("heading", { name: lastSkill.title, level: 3 })).toBeInTheDocument();

        // Navigate forward to wrap around to first category
        await user.click(nextBtn);
        expect(screen.getByRole("heading", { name: skills[0].title, level: 3 })).toBeInTheDocument();
    });

    it("navigates directly via pagination indicator dots", async () => {
        const user = userEvent.setup();
        const { container } = render(<Skills />);

        const targetIndex = 2;
        const dots = container.querySelectorAll(".indicator-dot");
        expect(dots).toHaveLength(skills.length);

        const targetDot = dots[targetIndex]!;
        await user.click(targetDot);
        expect(screen.getByRole("heading", { name: skills[targetIndex].title, level: 3 })).toBeInTheDocument();
        expect(targetDot).toHaveClass("active");
    });

    it("supports keyboard navigation on the tablist (ArrowRight, ArrowLeft, Home, End)", async () => {
        const user = userEvent.setup();
        render(<Skills />);

        const tablist = screen.getByRole("tablist", { name: "Skill Categories" });
        tablist.focus();

        // ArrowRight
        await user.keyboard("{ArrowRight}");
        expect(screen.getByRole("heading", { name: skills[1].title, level: 3 })).toBeInTheDocument();

        // ArrowLeft
        await user.keyboard("{ArrowLeft}");
        expect(screen.getByRole("heading", { name: skills[0].title, level: 3 })).toBeInTheDocument();

        // End
        await user.keyboard("{End}");
        const lastSkill = skills[skills.length - 1]!;
        expect(screen.getByRole("heading", { name: lastSkill.title, level: 3 })).toBeInTheDocument();

        // Home
        await user.keyboard("{Home}");
        expect(screen.getByRole("heading", { name: skills[0].title, level: 3 })).toBeInTheDocument();

        // Other key (e.g. Tab or Enter) does nothing
        await user.keyboard("{Enter}");
        expect(screen.getByRole("heading", { name: skills[0].title, level: 3 })).toBeInTheDocument();
    });

    it("supports touch swipe navigation", () => {
        render(<Skills />);

        const carousel = screen.getByLabelText("Skills & Experience Carousel");

        // Swipe Left (diff > 50 -> next)
        fireEvent.touchStart(carousel, {
            targetTouches: [{ clientX: 200 }],
        });
        fireEvent.touchMove(carousel, {
            targetTouches: [{ clientX: 100 }],
        });
        fireEvent.touchEnd(carousel);

        expect(screen.getByRole("heading", { name: skills[1].title, level: 3 })).toBeInTheDocument();

        // Swipe Right (diff < -50 -> prev)
        fireEvent.touchStart(carousel, {
            targetTouches: [{ clientX: 100 }],
        });
        fireEvent.touchMove(carousel, {
            targetTouches: [{ clientX: 200 }],
        });
        fireEvent.touchEnd(carousel);

        expect(screen.getByRole("heading", { name: skills[0].title, level: 3 })).toBeInTheDocument();

        // Small swipe (< 50 -> no change)
        fireEvent.touchStart(carousel, {
            targetTouches: [{ clientX: 100 }],
        });
        fireEvent.touchMove(carousel, {
            targetTouches: [{ clientX: 120 }],
        });
        fireEvent.touchEnd(carousel);

        expect(screen.getByRole("heading", { name: skills[0].title, level: 3 })).toBeInTheDocument();
    });

    it("displays relevant tags and contextual experience cards for active skill", () => {
        render(<Skills />);

        const firstSkill = skills[0];
        for (const tag of firstSkill.tags) {
            expect(screen.getByText(tag)).toBeInTheDocument();
        }

        expect(screen.getByText("Core Technologies & Proficiencies")).toBeInTheDocument();
        expect(screen.getByText("Relevant Experience & Impact Highlights")).toBeInTheDocument();
    });
});
