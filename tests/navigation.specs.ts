import { navigationItems } from "@data/navigation";
import { expect, openPortfolio, test } from "./support/portfolioTest";

test("the hero call to action opens Experience", async ({ page }) => {
    await openPortfolio(page);

    await page.getByRole("link", { name: "View experience" }).click();
    await expect(page.locator("#experience")).toBeInViewport();
});

test("Experience precedes Impact in the page and navigation", async ({ page }) => {
    await openPortfolio(page);

    const sectionIds = await page
        .locator("main > section[id]")
        .evaluateAll((sections) => sections.map(({ id }) => id));
    const navigationTargets = await page
        .getByRole("navigation", { name: "Primary navigation" })
        .locator(".nav-links a")
        .evaluateAll((links) => links.map((link) => link.getAttribute("href")));

    expect(sectionIds.indexOf("experience")).toBeLessThan(
        sectionIds.indexOf("impact")
    );
    expect(navigationTargets.indexOf("#experience")).toBeLessThan(
        navigationTargets.indexOf("#impact")
    );
});

test(
    "desktop navigation opens every portfolio section",
    async ({ page, isMobile }) => {
        test.skip(
            isMobile,
            "Desktop navigation is covered by the mobile disclosure test"
        );
        await openPortfolio(page);
        const navigation = page.getByRole("navigation", {
            name: "Primary navigation",
        });

        for (const item of navigationItems) {
            await navigation.getByRole("link", { name: item.label }).click();
            await expect(page.locator(item.href)).toBeInViewport();
        }
    }
);

test(
    "mobile navigation behaves as an accessible disclosure",
    async ({ page, isMobile }) => {
        test.skip(!isMobile, "The navigation disclosure is only displayed on mobile");
        await openPortfolio(page);

        const openButton = page.getByRole("button", { name: "Open navigation" });
        await expect(openButton).toHaveAttribute(
            "aria-controls",
            "primary-navigation-links"
        );
        await expect(openButton).toHaveAttribute("aria-expanded", "false");

        await openButton.click();
        const closeButton = page.getByRole("button", { name: "Close navigation" });
        await expect(closeButton).toHaveAttribute("aria-expanded", "true");
        await expect(page.getByRole("link", { name: "About" })).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(openButton).toHaveAttribute("aria-expanded", "false");
        await expect(openButton).toBeFocused();

        await openButton.click();
        await page
            .getByRole("navigation", { name: "Primary navigation" })
            .getByRole("link", { name: "Experience" })
            .click();
        await expect(openButton).toHaveAttribute("aria-expanded", "false");
        await expect(openButton).toBeFocused();
        await expect(page.locator("#experience")).toBeInViewport();
    }
);