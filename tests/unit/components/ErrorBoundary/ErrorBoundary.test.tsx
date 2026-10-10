import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBoundary } from "@components/ErrorBoundary/ErrorBoundary";

const BrokenComponent = () => {
    throw new Error("Render error");
};

describe("ErrorBoundary", () => {
    afterEach(() => vi.restoreAllMocks());

    it("shows a recovery screen when a child cannot render", async () => {
        const consoleError = vi
            .spyOn(console, "error")
            .mockImplementation(() => undefined);

        const reloadMock = vi.fn();
        Object.defineProperty(window, "location", {
            writable: true,
            value: { reload: reloadMock },
        });

        const user = userEvent.setup();

        render(
            <ErrorBoundary>
                <BrokenComponent />
            </ErrorBoundary>
        );

        expect(
            screen.getByRole("heading", { name: "Something went wrong" })
        ).toBeInTheDocument();
        expect(screen.getByRole("alert")).toHaveTextContent(
            "The page could not be displayed"
        );
        const reloadButton = screen.getByRole("button", { name: "Reload page" });
        expect(reloadButton).toBeInTheDocument();
        expect(consoleError).toHaveBeenCalled();

        await user.click(reloadButton);
        expect(reloadMock).toHaveBeenCalled();
    });

    it("renders children when no error occurs", () => {
        render(
            <ErrorBoundary>
                <div>Safe Content</div>
            </ErrorBoundary>
        );

        expect(screen.getByText("Safe Content")).toBeInTheDocument();
    });
});
