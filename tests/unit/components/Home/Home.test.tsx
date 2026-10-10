import { render, screen } from "@testing-library/react";
import Home from "@components/Home/Home";
import { portfolioLinks } from "@data/links";

vi.mock("framer-motion", async () => {
    const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
    return {
        ...actual,
        useReducedMotion: vi.fn(),
    };
});

import { useReducedMotion } from "framer-motion";

describe("Home Component", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders introduction, title, and action links", () => {
        vi.mocked(useReducedMotion).mockReturnValue(false);
        render(<Home />);

        expect(screen.getByText("Hi, I'm Ross.")).toBeInTheDocument();
        expect(screen.getByText("A Lead Software Engineer.")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /view experience/i })).toHaveAttribute(
            "href",
            "#experience"
        );
        expect(screen.getByRole("link", { name: /download cv/i })).toHaveAttribute(
            "href",
            portfolioLinks.cv
        );
    });

    it("renders profile image with responsive srcset and attributes", () => {
        vi.mocked(useReducedMotion).mockReturnValue(false);
        render(<Home />);

        const img = screen.getByRole("img", { name: "Ross Carter" });
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("fetchpriority", "high");
        expect(img).toHaveAttribute("width", "400");
        expect(img).toHaveAttribute("height", "400");
        expect(img).toHaveAttribute("srcset");
    });

    it("respects prefers-reduced-motion when true", () => {
        vi.mocked(useReducedMotion).mockReturnValue(true);

        render(<Home />);
        expect(screen.getByText("Hi, I'm Ross.")).toBeInTheDocument();
    });
});
