import "@testing-library/jest-dom/vitest";

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