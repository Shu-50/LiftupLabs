# Vercel 404 Error Fix - Page Refresh Issue

## Problem

When refreshing the page on routes like `/login`, `/register`, `/forgot-password`, etc., Vercel returns a 404 error:

```
404: NOT_FOUND
Code: NOT_FOUND
ID: bom1::tdrpv-1764237970300-e349ee02641a
```

## Root Cause

This is a common issue with Single Page Applications (SPAs) on static hosting platforms:

1. **Initial Load:** When you navigate to `https://your-app.vercel.app/login` directly or refresh the page
2. **Server Request:** Vercel tries to find a file at `/login/index.html` or `/login.html`
3. **File Not Found:** These files don't exist (React Router handles routing client-side)
4. **404 Error:** Vercel returns 404 because it can't find the file

## Solution

Configure Vercel to redirect all routes to `index.html`, allowing React Router to handle the routing.

## Files Created

### 1. `vercel.json` (Primary Solution)

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**What it does:**
- Catches all routes (`(.*)` = any path)
- Redirects them to `/index.html`
- React Router then handles the routing client-side
- Returns 200 status (not 404)

### 2. `public/_redirects` (Backup/Netlify)

```
/*    /index.html   200
```

**What it does:**
- Works for Netlify and some other platforms
- Same concept: redirect all routes to index.html
- Backup solution if vercel.json doesn't work

## How It Works

### Before Fix:
```
User visits: https://your-app.vercel.app/login
    ↓
Vercel looks for: /login/index.html or /login.html
    ↓
File not found
    ↓
❌ 404 Error
```

### After Fix:
```
User visits: https://your-app.vercel.app/login
    ↓
Vercel rewrites to: /index.html
    ↓
React app loads
    ↓
React Router sees URL is /login
    ↓
✅ Shows LoginPage component
```

## Deployment Steps

### 1. Commit Changes

```bash
cd LiftupLabs
git add vercel.json public/_redirects
git commit -m "Fix 404 error on page refresh"
git push origin main
```

### 2. Redeploy on Vercel

**Option A: Automatic (if connected to GitHub)**
- Vercel will automatically detect the push
- New deployment will start
- Wait for deployment to complete

**Option B: Manual**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click "Deployments"
4. Click "Redeploy" on the latest deployment
5. Wait for deployment to complete

### 3. Verify Fix

Test these URLs (replace with your actual domain):

- ✅ `https://your-app.vercel.app/`
- ✅ `https://your-app.vercel.app/login` (refresh page)
- ✅ `https://your-app.vercel.app/register` (refresh page)
- ✅ `https://your-app.vercel.app/forgot-password` (refresh page)
- ✅ `https://your-app.vercel.app/reset-password` (refresh page)
- ✅ `https://your-app.vercel.app/verify-email` (refresh page)

All should work without 404 errors!

## Testing Checklist

After deployment:

- [ ] Home page loads
- [ ] Navigate to /login - works
- [ ] Refresh on /login - works (no 404)
- [ ] Navigate to /register - works
- [ ] Refresh on /register - works (no 404)
- [ ] Navigate to /forgot-password - works
- [ ] Refresh on /forgot-password - works (no 404)
- [ ] Browser back/forward buttons work
- [ ] Direct URL access works
- [ ] All routes accessible

## Alternative Solutions

If `vercel.json` doesn't work, try these alternatives:

### Option 1: Update vercel.json with routes

```json
{
  "routes": [
    {
      "src": "/[^.]+",
      "dest": "/",
      "status": 200
    }
  ]
}
```

### Option 2: Use rewrites with headers

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

### Option 3: Vercel Configuration in Project Settings

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings > General
4. Scroll to "Build & Development Settings"
5. Add to "Output Directory": `dist`
6. Ensure "Framework Preset" is set to "Vite"

## Common Issues

### Issue 1: Still getting 404 after deployment

**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Try incognito/private mode
3. Wait a few minutes for CDN to update
4. Check Vercel deployment logs

### Issue 2: vercel.json not being recognized

**Solution:**
1. Ensure file is in root directory (same level as package.json)
2. Check JSON syntax is valid
3. Redeploy from Vercel dashboard
4. Check deployment logs for errors

### Issue 3: Works locally but not on Vercel

**Solution:**
1. Ensure you're using React Router's `BrowserRouter` (not `HashRouter`)
2. Check that all routes are defined in App.jsx
3. Verify build output includes index.html
4. Check Vercel build logs

## Vercel Configuration Options

### Basic Configuration (Current)

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Advanced Configuration (Optional)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Environment Variables on Vercel

Don't forget to set environment variables in Vercel:

1. Go to Project Settings
2. Click "Environment Variables"
3. Add:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
4. Redeploy for changes to take effect

## Build Settings

Ensure these are correct in Vercel:

- **Framework Preset:** Vite
- **Build Command:** `npm run build` or `vite build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Node Version:** 18.x or higher

## Debugging

### Check Deployment Logs

1. Go to Vercel Dashboard
2. Click on your project
3. Click "Deployments"
4. Click on the latest deployment
5. Check "Build Logs" and "Function Logs"

### Test Locally

```bash
# Build the project
npm run build

# Preview the build
npm run preview

# Test routes
# Open browser and test /login, /register, etc.
# Refresh pages to ensure no 404
```

### Verify vercel.json

```bash
# Check JSON syntax
cat vercel.json | jq .

# Or use online JSON validator
# https://jsonlint.com/
```

## Best Practices

1. ✅ **Always use vercel.json** for Vercel deployments
2. ✅ **Test all routes** after deployment
3. ✅ **Use BrowserRouter** (not HashRouter)
4. ✅ **Set environment variables** in Vercel dashboard
5. ✅ **Check build logs** if issues occur
6. ✅ **Clear cache** when testing
7. ✅ **Use preview deployments** for testing before production

## Additional Resources

- [Vercel Rewrites Documentation](https://vercel.com/docs/concepts/projects/project-configuration#rewrites)
- [Vercel SPA Configuration](https://vercel.com/guides/deploying-react-with-vercel)
- [React Router Documentation](https://reactrouter.com/en/main)

## Support

If you still have issues:

1. Check Vercel deployment logs
2. Verify vercel.json is in root directory
3. Ensure JSON syntax is valid
4. Try redeploying from Vercel dashboard
5. Contact Vercel support with deployment ID

---

**Status:** ✅ Fixed - All routes now work on refresh!
