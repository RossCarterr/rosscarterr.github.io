import type { Page } from "@playwright/test";
import { experience } from "@data/experience";
import { expect, openPortfolio, test } from "./support/portfolioTest";

const expectNoHorizontalOverflow = async (page: Page) => {
    const widths = await page.evaluate(() => ({
        body: document.body.scrollWidth,
        root: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
    }));

    expect(widths.body).toBeLessThanOrEqual(widths.viewport + 1);
    expect(widths.root).toBeLessThanOrEqual(widths.viewport + 1);
};

test("the page fits the viewport without horizontal scrolling", async ({ page }) => {
    await openPortfolio(page);
    await expectNoHorizontalOverflow(page);
});

test("experience content keeps each role summary before its bullet list", async ({ page }) => {
    await openPortfolio(page);

    const roles = page.locator(".timeline-item");
    await expect(roles).toHaveCount(experience.length);
    for (const role of await roles.all()) {
        await expect(role.locator(":scope > div + ul")).toBeVisible();
        await expect(role.getByRole("listitem").first()).toBeVisible();
    }
});

test("mobile contact controls remain usable touch targets", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Touch-target sizing is checked at the mobile viewport");
    await openPortfolio(page);

    const contacts = page.locator("#connect").getByRole("link");
    await expect(contacts).toHaveCount(3);
    for (const contact of await contacts.all()) {
        const box = await contact.boundingBox();
        expect(box, "Contact control should be visible").not.toBeNull();
        expect(box?.width).toBeGreaterThanOrEqual(44);
        expect(box?.height).toBeGreaterThanOrEqual(44);
    }
});

test("mobile layout supports text enlarged to 200 percent", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Text zoom is checked at the mobile viewport");
    await openPortfolio(page);

    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectNoHorizontalOverflow(page);
});

test("navigation remains compact below the desktop breakpoint", async ({ page }) => {
    await page.setViewportSize({ width: 780, height: 900 });
    await openPortfolio(page);

    await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();
    await expect(
        page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", {
            name: "About",
        })
    ).toBeHidden();
    await expectNoHorizontalOverflow(page);
});

test("navigation uses the desktop layout at the breakpoint without wrapping", async ({
                                                                                         page,
                                                                                     }) => {
    await page.setViewportSize({ width: 800, height: 900 });
    await openPortfolio(page);

    await expect(page.getByRole("button", { name: "Open navigation" })).toBeHidden();
    await expect(
        page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", {
            name: "About",
        })
    ).toBeVisible();

    const linkRows = await page.locator(".nav-links a").evaluateAll((links) =>
        links.map((link) => Math.round(link.getBoundingClientRect().top))
    );
    expect(Array.from(new Set(linkRows))).toHaveLength(1);
    await expectNoHorizontalOverflow(page);
});