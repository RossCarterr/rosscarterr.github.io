import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Connect from "@/components/Connect/Connect";
import { portfolioLinks } from "@/data/links";

describe("Connect Component", () => {
    it("renders LinkedIn and Email links", () => {
        render(<Connect />);

        expect(
            screen.getByRole("heading", { name: "Connect" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: "LinkedIn profile" })
        ).toHaveAttribute("href", portfolioLinks.linkedin);
        expect(
            screen.getByRole("link", { name: /Send email to/i })
        ).toHaveAttribute("href", portfolioLinks.email);
    });

    it("copies email to clipboard on copy button click", async () => {
        const user = userEvent.setup();
        const writeTextMock = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(navigator, "clipboard", {
            writable: true,
            value: { writeText: writeTextMock },
        });

        render(<Connect />);

        const copyButton = screen.getByRole("button", {
            name: "Copy email address",
        });
        expect(copyButton).toBeInTheDocument();
        expect(copyButton).toHaveTextContent("Copy Email");

        await user.click(copyButton);

        const emailAddress = portfolioLinks.email.replace("mailto:", "");
        expect(writeTextMock).toHaveBeenCalledWith(emailAddress);
        expect(copyButton).toHaveTextContent("Copied!");
    });

    it("handles clipboard failure gracefully", async () => {
        const user = userEvent.setup();
        const writeTextMock = vi.fn().mockRejectedValue(new Error("Permission denied"));
        Object.defineProperty(navigator, "clipboard", {
            writable: true,
            value: { writeText: writeTextMock },
        });

        render(<Connect />);

        const copyButton = screen.getByRole("button", {
            name: "Copy email address",
        });
        await user.click(copyButton);

        expect(writeTextMock).toHaveBeenCalled();
        expect(copyButton).toHaveTextContent("Copy Email");
    });
});
