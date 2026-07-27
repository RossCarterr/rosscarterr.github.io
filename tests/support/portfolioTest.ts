import { expect, test as base } from "@playwright/test";
import type { Page } from "@playwright/test";

interface PortfolioFixtures {
    browserErrorCheck: void;
}

export const test = base.extend<PortfolioFixtures>({
    browserErrorCheck: [
        async ({ page }, use) => {
            const errors: string[] = [];

            page.on("console", (message) => {
                if (message.type() === "error") {
                    errors.push(`console: ${message.text()}`);
                }
            });
            page.on("pageerror", (error) => errors.push(`page: ${error.message}`));

            await use();

            expect(errors, "The page emitted browser errors").toEqual([]);
        },
        { auto: true },
    ],
});

export const openPortfolio = async (page: Page) => {
    await page.goto(".", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
        "Hi I'm Ross."
    );
};

export { expect };