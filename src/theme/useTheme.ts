import { useEffect, useState } from "react";
import { DARK_MODE_MEDIA_QUERY, Theme } from "@/constants/theme";
import type { ThemeValue } from "@/constants/theme";
import { getInitialTheme } from "@/theme/themeDetection";
import { getSavedTheme, saveTheme } from "@/theme/themeStorage";

const detectInitialTheme = () =>
    getInitialTheme({
        savedTheme: getSavedTheme(),
        documentTheme: document.documentElement.dataset.theme,
        prefersDarkMode: window.matchMedia(DARK_MODE_MEDIA_QUERY).matches,
    });

export const useTheme = () => {
    const [theme, setTheme] = useState<ThemeValue>(detectInitialTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;

        saveTheme(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
        );
    };

    return { theme, toggleTheme };
};