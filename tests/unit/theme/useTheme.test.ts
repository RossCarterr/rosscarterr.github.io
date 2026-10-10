import { renderHook, act } from "@testing-library/react";
import { Theme, THEME_STORAGE_KEY } from "@/constants/theme";
import { useTheme } from "@/theme/useTheme";

describe("useTheme", () => {
    beforeEach(() => {
        window.localStorage.clear();
        delete document.documentElement.dataset.theme;
        window.matchMedia = vi.fn().mockImplementation(
            (query: string): MediaQueryList => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })
        );
    });

    it("defaults to light theme when system and storage are empty", () => {
        const { result } = renderHook(() => useTheme());

        expect(result.current.theme).toBe(Theme.LIGHT);
        expect(document.documentElement.dataset.theme).toBe(Theme.LIGHT);
    });

    it("toggles the theme and persists to localStorage", () => {
        const { result } = renderHook(() => useTheme());

        act(() => result.current.toggleTheme());

        expect(result.current.theme).toBe(Theme.DARK);
        expect(document.documentElement.dataset.theme).toBe(Theme.DARK);
        expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(Theme.DARK);

        act(() => result.current.toggleTheme());

        expect(result.current.theme).toBe(Theme.LIGHT);
        expect(document.documentElement.dataset.theme).toBe(Theme.LIGHT);
        expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(Theme.LIGHT);
    });
});
