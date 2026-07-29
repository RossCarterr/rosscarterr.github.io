# Portfolio site

[![Build and deploy](https://github.com/RossCarterr/rosscarterr.github.io/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/RossCarterr/rosscarterr.github.io/actions/workflows/deploy.yml)

React portfolio hosted on GitHub Pages and served at [rosscarterr.com](https://rosscarterr.com).

## Local development

Use Node.js 26.5 or newer.

```powershell
npm ci
npm run dev
```

The Vite development server runs the site from its root URL. Production assets
use relative paths so the same build works on the custom domain and the default
GitHub Pages project URL.

## Verification

```powershell
npm run lint
npm test
npm run test:coverage
npm run typecheck
npm run build
npm run test:integration
```

The integration command builds the site, starts an isolated preview and runs the
Playwright browser suite in managed desktop and mobile Chromium projects. Set
`PREVIEW_URL` to run the same browser checks against an existing deployment.

## Deployment

Pushes to `master` run the GitHub Actions workflow in
`.github/workflows/deploy.yml`. The workflow installs the locked dependencies,
runs the automated checks, builds the site and deploys `dist` to GitHub Pages.