import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nav from "@/components/Nav/Nav";
import { Theme } from "@/constants/theme";
import { navigationItems } from "@/data/navigation";

describe("Nav Component", () => {
    let observerCallback: (entries: IntersectionObserverEntry[]) => void;

    beforeEach(() => {
        class MockObserver {
            constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
                observerCallback = callback;
            }
            observe = vi.fn();
            unobserve = vi.fn();
            disconnect = vi.fn();
            takeRecords = vi.fn(() => []);
        }

        Object.defineProperty(window, "IntersectionObserver", {
            writable: true,
            configurable: true,
            value: MockObserver,
        });
    });

    it("renders navigation items and toggles theme on button click", async () => {
        const user = userEvent.setup();
        const onToggleTheme = vi.fn();

        render(<Nav theme={Theme.LIGHT} onToggleTheme={onToggleTheme} />);

        for (const { label } of navigationItems) {
            expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
        }

        const themeButton = screen.getByRole("button", {
            name: "Switch to dark mode",
        });
        await user.click(themeButton);
        expect(onToggleTheme).toHaveBeenCalledTimes(1);
    });

    it("updates active section link when IntersectionObserver fires", () => {
        const onToggleTheme = vi.fn();
        render(<Nav theme={Theme.DARK} onToggleTheme={onToggleTheme} />);

        const targetEl = document.createElement("section");
        targetEl.id = "skills";
        document.body.appendChild(targetEl);

        const mockEntry: IntersectionObserverEntry = {
            isIntersecting: true,
            target: targetEl,
            boundingClientRect: new DOMRectReadOnly(0, 100, 100, 100),
            intersectionRatio: 1,
            intersectionRect: new DOMRectReadOnly(0, 100, 100, 100),
            rootBounds: null,
            time: 0,
        };

        act(() => {
            if (observerCallback) {
                observerCallback([mockEntry]);
            }
        });

        const skillsLink = screen.getByRole("link", { name: "Skills" });
        expect(skillsLink).toHaveClass("active");

        document.body.removeChild(targetEl);
    });
});
