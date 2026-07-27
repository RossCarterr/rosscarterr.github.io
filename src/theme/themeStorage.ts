import { isTheme, THEME_STORAGE_KEY } from "@/constants/theme";
import type { ThemeValue } from "@/constants/theme";

type ThemeStorage = Pick<Storage, "getItem" | "setItem">;
type ThemeStorageProvider = () => ThemeStorage;

const getBrowserThemeStorage = () => window.localStorage;

export const getSavedTheme = (
    getStorage: ThemeStorageProvider = getBrowserThemeStorage
): ThemeValue | null => {
    try {
        const savedTheme = getStorage().getItem(THEME_STORAGE_KEY);
        return isTheme(savedTheme) ? savedTheme : null;
    } catch {
        return null;
    }
};

export const saveTheme = (
    theme: ThemeValue,
    getStorage: ThemeStorageProvider = getBrowserThemeStorage
): boolean => {
    try {
        getStorage().setItem(THEME_STORAGE_KEY, theme);
        return true;
    } catch {
        return false;
    }
};