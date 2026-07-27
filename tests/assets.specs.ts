import { portfolioLinks } from "@data/links";
import { expect, openPortfolio, test } from "./support/portfolioTest";

test("all images load successfully", async ({ page }) => {
    await openPortfolio(page);

    const brokenImages = await page.locator("img").evaluateAll((elements) =>
        elements
            .filter(
                (element): element is HTMLImageElement =>
                    element instanceof HTMLImageElement
            )
            .filter((image) => !image.complete || image.naturalWidth === 0)
            .map((image) => image.currentSrc || image.src)
    );

    expect(brokenImages).toEqual([]);
});

test("the profile image uses responsive WebP sources and is prioritised", async ({ page }) => {
    await openPortfolio(page);

    const profile = page.getByRole("img", { name: "Ross Carter" });
    await expect(profile).toHaveAttribute("src", /profile-400\.webp$/);
    await expect(profile).toHaveAttribute("srcset", /profile-256\.webp 256w/);
    await expect(profile).toHaveAttribute("srcset", /profile-400\.webp 400w/);
    await expect(profile).toHaveAttribute("fetchpriority", "high");
    await expect(profile).toHaveAttribute("loading", "eager");
});

test("the email contact uses the expected address", async ({ page }) => {
    await openPortfolio(page);

    await expect(page.getByRole("link", { name: "Email" })).toHaveAttribute(
        "href",
        portfolioLinks.email
    );
});