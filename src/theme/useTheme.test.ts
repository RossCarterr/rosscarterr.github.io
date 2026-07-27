import { act, renderHook } from "@testing-library/react";
import { Theme, THEME_STORAGE_KEY } from "@/constants/theme";
import { useTheme } from "@/theme/useTheme";

describe("useTheme", () => {
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

    it("uses a saved theme", () => {
        window.localStorage.setItem(THEME_STORAGE_KEY, Theme.DARK);

        const { result } = renderHook(() => useTheme());

        expect(result.current.theme).toBe(Theme.DARK);
        expect(document.documentElement.dataset.theme).toBe(Theme.DARK);
    });

    it("falls back to the system preference", () => {
        window.matchMedia = mockMatchMedia(true);

        const { result } = renderHook(() => useTheme());

        expect(result.current.theme).toBe(Theme.DARK);
    });

    it("toggles and persists the selected theme", () => {
        const { result } = renderHook(() => useTheme());

        act(() => result.current.toggleTheme());

        expect(result.current.theme).toBe(Theme.DARK);
        expect(document.documentElement.dataset.theme).toBe(Theme.DARK);
        expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(Theme.DARK);
    });
});