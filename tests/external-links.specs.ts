import type { BrowserContext } from "@playwright/test";
import { portfolioLinks } from "@data/links";
import { expect, openPortfolio, test } from "./support/portfolioTest";

const openExternalUrl = async (context: BrowserContext, url: string) => {
    const externalPage = await context.newPage();
    try {
        const response = await externalPage.goto(url, {
            waitUntil: "domcontentloaded",
        });
        return {
            status: response?.status(),
            headers: response?.headers(),
        };
    } finally {
        await externalPage.close();
    }
};

test("the CV download points to the expected file", async ({ page }) => {
    await openPortfolio(page);

    const cvLinks = page.getByRole("link", { name: /download (my )?cv/i });
    await expect(cvLinks).toHaveCount(2);
    for (const cvLink of await cvLinks.all()) {
        await expect(cvLink).toHaveAttribute("href", portfolioLinks.cv);
    }
});

test("the CV download is available @external", async ({ page }) => {
    await openPortfolio(page);
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: "Download CV", exact: true }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
    expect(await download.failure()).toBeNull();
    expect(await download.path()).not.toBeNull();
});

test("the GitHub link uses the expected profile URL", async ({ page }) => {
    await openPortfolio(page);

    await expect(page.getByRole("link", { name: "GitHub" })).toHaveAttribute(
        "href",
        portfolioLinks.github
    );
});

test("the GitHub profile is available @external", async ({ context }) => {
    const response = await openExternalUrl(context, portfolioLinks.github);
    expect(response.status).toBe(200);
});

test("the LinkedIn link uses the canonical profile URL", async ({ page }) => {
    await openPortfolio(page);

    await expect(page.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
        "href",
        portfolioLinks.linkedin
    );
});