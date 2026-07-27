import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { portfolioLinks } from "@data/links";
import { navigationItems } from "@data/navigation";
import App from "@/App";

describe("App", () => {
    const mockMatchMedia = (matches = false) =>
        vi.fn().mockImplementation(
            (query: string): MediaQueryList => ({
                matches,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })
        );

    beforeEach(() => {
        window.localStorage.clear();
        delete document.documentElement.dataset.theme;
        window.matchMedia = mockMatchMedia();
    });

    it("renders the core portfolio sections", () => {
        render(<App />);

        expect(screen.getByText("Hi I'm Ross.")).toBeInTheDocument();
        expect(screen.getByText("A Senior Software Engineer.")).toBeInTheDocument();
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            "Hi I'm Ross. A Senior Software Engineer."
        );
        expect(screen.getByRole("main")).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: "Skip to main content" })
        ).toHaveAttribute("href", "#main-content");
        expect(
            screen.getByText("Diageo | Nov 2022 to present")
        ).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Impact" })).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: /view experience/i })
        ).toHaveAttribute("href", "#experience");
        expect(
            screen.getByRole("link", { name: /download cv/i })
        ).toHaveAttribute("href", portfolioLinks.cv);
        expect(
            screen.getByRole("link", { name: /download my cv/i })
        ).toHaveAttribute("href", portfolioLinks.cv);
        expect(
            screen.getByRole("link", { name: /linkedin/i })
        ).toHaveAttribute("href", portfolioLinks.linkedin);
        expect(screen.getByRole("img", { name: "Ross Carter" })).toHaveAttribute(
            "fetchpriority",
            "high"
        );
        for (const { label, href } of navigationItems) {
            expect(screen.getByRole("link", { name: label })).toHaveAttribute(
                "href",
                href
            );
        }
    });

    it("places Experience before Impact in the page and navigation", () => {
        render(<App />);

        const sectionHeadings = screen
            .getAllByRole("heading", { level: 2 })
            .map(({ textContent }) => textContent);
        const navigationLabels = screen
            .getByRole("navigation", { name: "Primary navigation" })
            .querySelectorAll(".nav-links a");
        const expectedOrder = [
            "About",
            "Skills",
            "Experience",
            "Impact",
            "Education",
            "Connect",
        ];

        expect(sectionHeadings).toEqual(expectedOrder);
        expect(
            Array.from(navigationLabels, ({ textContent }) => textContent)
        ).toEqual(expectedOrder);
    });

    it("persists the selected colour theme", async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.click(screen.getByRole("button", { name: /switch to dark mode/i }));

        expect(document.documentElement.dataset.theme).toBe("dark");
        expect(window.localStorage.getItem("portfolio-theme")).toBe("dark");
    });

    it("exposes the mobile navigation as a keyboard-accessible disclosure", async () => {
        const user = userEvent.setup();
        render(<App />);

        const openButton = screen.getByRole("button", {
            name: "Open navigation",
        });
        expect(openButton).toHaveAttribute(
            "aria-controls",
            "primary-navigation-links"
        );
        expect(openButton).toHaveAttribute("aria-expanded", "false");

        await user.click(openButton);
        expect(
            screen.getByRole("button", { name: "Close navigation" })
        ).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("link", { name: "About" })).toHaveFocus();

        await user.keyboard("{ArrowDown}");
        expect(
            screen.getByRole("button", { name: "Close navigation" })
        ).toHaveAttribute("aria-expanded", "true");

        await user.keyboard("{Escape}");
        expect(
            screen.getByRole("button", { name: "Open navigation" })
        ).toHaveAttribute("aria-expanded", "false");
        await waitFor(() =>
            expect(screen.getByRole("button", { name: "Open navigation" })).toHaveFocus()
        );

        await user.click(openButton);
        await user.click(screen.getByRole("link", { name: "Experience" }));
        expect(openButton).toHaveAttribute("aria-expanded", "false");
        await waitFor(() => expect(openButton).toHaveFocus());
    });
});