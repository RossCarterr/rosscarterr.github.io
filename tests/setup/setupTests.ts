import "@testing-library/jest-dom/vitest";

class IntersectionObserverMock {
    readonly root: Element | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
}

Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock,
});

const storage = new Map<string, string>();

const localStorageMock = {
    clear: () => storage.clear(),
    getItem: (key: string) => storage.get(key) ?? null,
    removeItem: (key: string) => {
        storage.delete(key);
    },
    setItem: (key: string, value: string) => storage.set(key, value),
} satisfies Pick<Storage, "clear" | "getItem" | "removeItem" | "setItem">;

Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    configurable: true,
});
