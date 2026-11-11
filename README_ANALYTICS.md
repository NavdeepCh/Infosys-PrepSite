# 📊 Vercel Web Analytics - Quick Reference

## Overview
InfyTrack now includes Vercel Web Analytics for tracking page views and user interactions.

## 🚀 Quick Start

### Prerequisites
- Node.js installed (for building the analytics bundle)
- Project deployed to Vercel

### Setup (Already Done)
The analytics have been configured and are ready to use. When you deploy to Vercel:

1. **Enable in Vercel Dashboard**
   - Go to your project on Vercel
   - Navigate to Settings → Analytics
   - Click "Enable Web Analytics"

2. **Deploy**
   ```bash
   vercel deploy
   ```

3. **Done!** Analytics will automatically start tracking.

## 🔧 Development

### Rebuilding the Analytics Bundle
If you need to update or rebuild the analytics:

```bash
npm install          # Install dependencies
npm run build        # Build the analytics bundle
```

This generates `dist/analytics.bundle.js` which is loaded by all HTML pages.

### Local Testing
```bash
npm run dev          # Starts local server on port 8000
```

In development mode, analytics will:
- Use debug version with console logging
- Not send data to production

## 📁 Files Overview

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies |
| `analytics.js` | Analytics initialization code |
| `build.js` | Build script for bundling |
| `dist/analytics.bundle.js` | Bundled analytics (loaded by HTML) |
| `ANALYTICS_SETUP.md` | Detailed setup documentation |

## 🔍 How It Works

1. `analytics.js` imports and calls `inject()` from `@vercel/analytics`
2. `build.js` bundles this into a browser-compatible script
3. All HTML files load `dist/analytics.bundle.js`
4. When deployed to Vercel, analytics automatically track page views

## 📊 Viewing Analytics

Once enabled in Vercel:
- Go to your Vercel project dashboard
- Click on "Analytics" tab
- View real-time and historical data

## 🛠️ Troubleshooting

**Analytics not showing up?**
1. Ensure Web Analytics is enabled in Vercel Dashboard
2. Deploy the project (analytics only work on Vercel-hosted sites)
3. Visit your site to generate events
4. Wait a few minutes for data to appear

**Need to rebuild the bundle?**
```bash
npm run build
```

## 📚 Documentation

- [Vercel Analytics Quickstart](https://vercel.com/docs/analytics/quickstart)
- [Vercel Analytics Dashboard](https://vercel.com/docs/analytics)

---

For detailed technical information, see `ANALYTICS_SETUP.md`
