export const Theme = {
    LIGHT: "light",
    DARK: "dark",
} as const;

export type ThemeValue = (typeof Theme)[keyof typeof Theme];

export const THEME_STORAGE_KEY = "portfolio-theme";
export const DARK_MODE_MEDIA_QUERY = "(prefers-color-scheme: dark)";

export const isTheme = (value: unknown): value is ThemeValue =>
    value === Theme.LIGHT || value === Theme.DARK;