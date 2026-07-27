import { Theme, THEME_STORAGE_KEY } from "@/constants/theme";
import { getSavedTheme, saveTheme } from "@/theme/themeStorage";

describe("themeStorage", () => {
    it("returns a valid saved theme", () => {
        const storage = {
            getItem: vi.fn(() => Theme.DARK),
            setItem: vi.fn(),
        };

        expect(getSavedTheme(() => storage)).toBe(Theme.DARK);
        expect(storage.getItem).toHaveBeenCalledWith(THEME_STORAGE_KEY);
    });

    it("ignores invalid saved values", () => {
        const storage = {
            getItem: vi.fn(() => "invalid-theme"),
            setItem: vi.fn(),
        };

        expect(getSavedTheme(() => storage)).toBeNull();
    });

    it("returns null when no theme has been saved", () => {
        const storage = {
            getItem: vi.fn(() => null),
            setItem: vi.fn(),
        };

        expect(getSavedTheme(() => storage)).toBeNull();
    });

    it("handles unavailable storage", () => {
        const unavailableStorage = () => {
            throw new Error("Storage unavailable");
        };

        expect(getSavedTheme(unavailableStorage)).toBeNull();
        expect(saveTheme(Theme.DARK, unavailableStorage)).toBe(false);
    });

    it("saves the selected theme", () => {
        const storage = {
            getItem: vi.fn(),
            setItem: vi.fn(),
        };

        expect(saveTheme(Theme.DARK, () => storage)).toBe(true);
        expect(storage.setItem).toHaveBeenCalledWith(
            THEME_STORAGE_KEY,
            Theme.DARK
        );
    });

    it("handles storage read failures", () => {
        const storage = {
            getItem: vi.fn(() => {
                throw new Error("Read failed");
            }),
            setItem: vi.fn(),
        };

        expect(getSavedTheme(() => storage)).toBeNull();
    });

    it("handles storage write failures", () => {
        const storage = {
            getItem: vi.fn(),
            setItem: vi.fn(() => {
                throw new Error("Write failed");
            }),
        };

        expect(saveTheme(Theme.LIGHT, () => storage)).toBe(false);
    });
});