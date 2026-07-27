import { defineConfig, devices } from "@playwright/test";

const localUrl = "http://127.0.0.1:4176/";

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? "line" : "list",
    outputDir: "test-results",
    use: {
        baseURL: process.env.PREVIEW_URL ?? localUrl,
        colorScheme: "light",
        contextOptions: {
            reducedMotion: "reduce",
        },
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
    },
    projects: [
        {
            name: "desktop",
            use: {
                ...devices["Desktop Chrome"],
                viewport: { width: 1440, height: 1000 },
            },
        },
        {
            name: "mobile",
            use: {
                ...devices["Pixel 5"],
                viewport: { width: 390, height: 900 },
            },
        },
    ],
    webServer: process.env.PREVIEW_URL
        ? undefined
        : {
            command: "npm run preview:test",
            url: localUrl,
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
        },
});