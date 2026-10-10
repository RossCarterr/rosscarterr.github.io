import { expect, test as base } from "@playwright/test";
import { THEME_STORAGE_KEY, Theme } from "@/constants/theme";
import { openPortfolio, test } from "./support/portfolioTest";

test("the theme toggle updates and persists the selected theme", async ({ page }) => {
    await openPortfolio(page);

    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", Theme.DARK);
    await expect
        .poll(() =>
            page.evaluate((key) => localStorage.getItem(key), THEME_STORAGE_KEY)
        )
        .toBe(Theme.DARK);

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", Theme.DARK);
});

test("uses the system theme when no preference has been saved", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.addInitScript(
        (key) => localStorage.removeItem(key),
        THEME_STORAGE_KEY
    );
    await openPortfolio(page);

    await expect(page.locator("html")).toHaveAttribute("data-theme", Theme.DARK);
});

base("applies a saved theme before React loads", async ({ page }) => {
    await page.addInitScript(
        ({ key, theme }) => localStorage.setItem(key, theme),
        { key: THEME_STORAGE_KEY, theme: Theme.DARK }
    );
    await page.route("**/assets/*.js", (route) => route.abort());

    await page.goto(".", { waitUntil: "domcontentloaded" });

    await expect(page.locator("html")).toHaveAttribute("data-theme", Theme.DARK);
});