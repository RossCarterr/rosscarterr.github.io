import { isTheme, Theme } from "@/constants/theme";
import type { ThemeValue } from "@/constants/theme";

interface InitialThemeOptions {
    readonly savedTheme: ThemeValue | null;
    readonly documentTheme: unknown;
    readonly prefersDarkMode: boolean;
}

export const getInitialTheme = ({
                                    savedTheme,
                                    documentTheme,
                                    prefersDarkMode,
                                }: InitialThemeOptions): ThemeValue => {
    if (savedTheme) {
        return savedTheme;
    }

    if (isTheme(documentTheme)) {
        return documentTheme;
    }

    return prefersDarkMode ? Theme.DARK : Theme.LIGHT;
};