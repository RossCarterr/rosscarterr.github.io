import { Theme } from "@/constants/theme";
import { getInitialTheme } from "@/theme/themeDetection";

describe("getInitialTheme", () => {
    it("prefers a saved theme", () => {
        expect(
            getInitialTheme({
                savedTheme: Theme.DARK,
                documentTheme: Theme.LIGHT,
                prefersDarkMode: false,
            })
        ).toBe(Theme.DARK);
    });

    it("uses the document theme when no saved theme exists", () => {
        expect(
            getInitialTheme({
                savedTheme: null,
                documentTheme: Theme.DARK,
                prefersDarkMode: false,
            })
        ).toBe(Theme.DARK);
    });

    it.each([
        [true, Theme.DARK],
        [false, Theme.LIGHT],
    ])(
        "uses the system preference when no theme is set",
        (prefersDarkMode, expected) => {
            expect(
                getInitialTheme({
                    savedTheme: null,
                    documentTheme: undefined,
                    prefersDarkMode,
                })
            ).toBe(expected);
        }
    );

    it("ignores an invalid document theme", () => {
        expect(
            getInitialTheme({
                savedTheme: null,
                documentTheme: "unsupported-theme",
                prefersDarkMode: true,
            })
        ).toBe(Theme.DARK);
    });
});