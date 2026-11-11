# Vercel Web Analytics Setup

This project has been configured with Vercel Web Analytics to track page views and user interactions.

## Installation

The `@vercel/analytics` package has been installed and configured for this static HTML site.

### Files Added/Modified:

1. **package.json** - Added `@vercel/analytics` and `esbuild` dependencies
2. **analytics.js** - Analytics initialization script
3. **build.js** - Build script to bundle analytics for browser use
4. **dist/analytics.bundle.js** - Bundled analytics script (generated)
5. **All HTML files** - Added analytics script tag before closing `</body>` tag

## Build Instructions

To rebuild the analytics bundle after updates:

```bash
npm install
npm run build
```

This will generate the `dist/analytics.bundle.js` file which is loaded by all HTML pages.

## How It Works

The analytics are initialized using the vanilla JavaScript approach:
- The `@vercel/analytics` package's `inject()` method is called in `analytics.js`
- The script is bundled using esbuild into a browser-compatible IIFE format
- The bundled script is loaded in all HTML files via a script tag
- Analytics automatically track page views when deployed to Vercel

## Deployment

When deployed to Vercel:
1. Enable Web Analytics in your Vercel project dashboard
2. Deploy the project with the analytics integration
3. Analytics will automatically start tracking page views and events

## Development

In development mode, the analytics script will:
- Use the debug version of the script
- Log analytics events to the console
- Not send data to production analytics

## Documentation

For more information, see the official Vercel Analytics documentation:
https://vercel.com/docs/analytics/quickstart
