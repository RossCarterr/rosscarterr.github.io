import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { expect, openPortfolio, test } from "./support/portfolioTest";

const expectNoAccessibilityViolations = async (page: Page) => {
    const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

    expect(results.violations).toEqual([]);
};

test("provides accessible landmarks and headings", async ({ page }) => {
    await openPortfolio(page);

    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(
        page.getByRole("navigation", { name: "Primary navigation" })
    ).toBeVisible();
});

test("has no automatically detectable WCAG A or AA violations", async ({ page }) => {
    await openPortfolio(page);
    await expectNoAccessibilityViolations(page);
});

test("the dark theme has no automatically detectable WCAG A or AA violations", async ({
                                                                                          page,
                                                                                      }) => {
    await openPortfolio(page);
    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expectNoAccessibilityViolations(page);
});

test(
    "moves keyboard focus to the main content from the skip link",
    async ({ page }) => {
        await openPortfolio(page);

        const skipLink = page.getByRole("link", { name: "Skip to main content" });
        await page.keyboard.press("Tab");
        await expect(skipLink).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(page.locator("main")).toBeFocused();
    }
);