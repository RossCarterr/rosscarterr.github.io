import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "@components/ErrorBoundary/ErrorBoundary";

const BrokenComponent = () => {
    throw new Error("Test rendering failure");
};

describe("ErrorBoundary", () => {
    afterEach(() => vi.restoreAllMocks());

    it("shows a recovery screen when a child cannot render", () => {
        const consoleError = vi
            .spyOn(console, "error")
            .mockImplementation(() => undefined);

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
        expect(
            screen.getByRole("button", { name: "Reload page" })
        ).toBeInTheDocument();
        expect(consoleError).toHaveBeenCalled();

    });
});