# API URL 404 Error Fix

## Problem

Frontend is getting 404 errors when trying to access backend API:

```
POST https://liftuplabs-backend.onrender.com/auth/register 404 (Not Found)
Error: API endpoint not found
```

## Root Cause

The `VITE_API_URL` was missing `/api` at the end:

```env
# ❌ Wrong - Missing /api
VITE_API_URL=https://liftuplabs-backend.onrender.com

# ✅ Correct - Includes /api
VITE_API_URL=https://liftuplabs-backend.onrender.com/api
```

## Why This Happens

The backend server has all routes under the `/api` prefix:

```javascript
// In server.js
app.use('/api/auth', authRoutes);      // Routes: /api/auth/register, /api/auth/login
app.use('/api/events', eventRoutes);   // Routes: /api/events, /api/events/:id
app.use('/api/users', userRoutes);     // Routes: /api/users, /api/users/:id
app.use('/api/contact', contactRoutes); // Routes: /api/contact
```

So the frontend needs to include `/api` in the base URL.

## Solution

### 1. Local Development (Already Fixed)

Updated `LiftupLabs/.env`:

```env
VITE_API_URL=https://liftuplabs-backend.onrender.com/api
```

### 2. Vercel Environment Variable (IMPORTANT!)

You need to update the environment variable on Vercel:

#### Steps:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project (liftup-labs)

2. **Navigate to Settings**
   - Click on "Settings" tab
   - Click on "Environment Variables" in the left sidebar

3. **Update VITE_API_URL**
   - Find the `VITE_API_URL` variable
   - Click "Edit" or "..." menu
   - Update the value to:
     ```
     https://liftuplabs-backend.onrender.com/api
     ```
   - Make sure it ends with `/api`
   - Click "Save"

4. **Redeploy**
   - Go to "Deployments" tab
   - Click on the latest deployment
   - Click "Redeploy"
   - Wait for deployment to complete

### 3. Verify Backend URL

Make sure your backend is actually deployed and accessible:

```bash
# Test backend health endpoint
curl https://liftuplabs-backend.onrender.com/api/health

# Should return something like:
{
  "status": "OK",
  "message": "Liftuplabs API is running",
  "timestamp": "2024-11-27T...",
  "environment": "production"
}
```

If this doesn't work, your backend might not be deployed or the URL is wrong.

## Testing After Fix

### Test Backend Endpoints

```bash
# Health check
curl https://liftuplabs-backend.onrender.com/api/health

# Register endpoint (should return validation error without data)
curl -X POST https://liftuplabs-backend.onrender.com/api/auth/register

# Login endpoint (should return validation error without data)
curl -X POST https://liftuplabs-backend.onrender.com/api/auth/login
```

### Test Frontend

1. Open your deployed app: https://liftup-labs.vercel.app
2. Go to Register page
3. Fill in the form
4. Click "Create Account"
5. Should work without 404 error ✅

## Common Issues

### Issue 1: Still getting 404 after updating Vercel env var

**Solution:**
1. Make sure you clicked "Save" on the environment variable
2. Make sure you redeployed after saving
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try incognito/private mode
5. Wait a few minutes for CDN to update

### Issue 2: Backend URL is wrong

**Check your backend deployment:**
1. Go to Render dashboard (or wherever backend is hosted)
2. Find your backend service
3. Copy the correct URL
4. Make sure it's accessible
5. Update Vercel env var with correct URL + `/api`

### Issue 3: CORS errors

If you get CORS errors instead of 404:

**Backend needs to allow your frontend domain:**

In `server.js`:
```javascript
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://liftup-labs.vercel.app',
        'https://your-custom-domain.com'
    ],
    credentials: true
}));
```

### Issue 4: Environment variable not updating

**Force update:**
1. Delete the old environment variable
2. Create a new one with correct value
3. Redeploy
4. Clear browser cache

## Verification Checklist

After fixing:

- [ ] Backend health endpoint works: `https://liftuplabs-backend.onrender.com/api/health`
- [ ] Vercel environment variable updated to include `/api`
- [ ] Redeployed on Vercel
- [ ] Cleared browser cache
- [ ] Registration works without 404
- [ ] Login works without 404
- [ ] All API calls work

## Environment Variables Reference

### Local Development (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

### Production (Vercel)

```env
VITE_API_URL=https://liftuplabs-backend.onrender.com/api
```

### Staging (if you have one)

```env
VITE_API_URL=https://liftuplabs-backend-staging.onrender.com/api
```

## Backend Routes Reference

All routes are under `/api` prefix:

| Route | Full URL |
|-------|----------|
| Register | `https://liftuplabs-backend.onrender.com/api/auth/register` |
| Login | `https://liftuplabs-backend.onrender.com/api/auth/login` |
| Get Profile | `https://liftuplabs-backend.onrender.com/api/auth/me` |
| Get Events | `https://liftuplabs-backend.onrender.com/api/events` |
| Contact Form | `https://liftuplabs-backend.onrender.com/api/contact` |
| Health Check | `https://liftuplabs-backend.onrender.com/api/health` |

## How API Service Works

The frontend API service (`src/services/api.js`) constructs URLs like this:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL; // https://...com/api

// When calling register:
async register(userData) {
    return this.post('/auth/register', userData);
    // Becomes: https://...com/api/auth/register
}
```

So `VITE_API_URL` must include `/api` at the end!

## Debugging

### Check Current Environment Variable

In your browser console on the deployed site:

```javascript
console.log(import.meta.env.VITE_API_URL)
// Should show: https://liftuplabs-backend.onrender.com/api
```

### Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to register/login
4. Look at the request URL
5. Should be: `https://liftuplabs-backend.onrender.com/api/auth/register`
6. If it's missing `/api`, env var not updated

### Check Build Output

```bash
# Build locally
npm run build

# Check if env var is embedded
grep -r "VITE_API_URL" dist/

# Should show the correct URL with /api
```

## Prevention

To avoid this in the future:

1. ✅ Always include `/api` in backend URL
2. ✅ Document the correct format in `.env.example`
3. ✅ Test backend health endpoint first
4. ✅ Verify environment variables before deploying
5. ✅ Use consistent URL format across environments

## Quick Fix Commands

```bash
# Update local .env
echo "VITE_API_URL=https://liftuplabs-backend.onrender.com/api" > .env

# Rebuild
npm run build

# Test locally
npm run preview
```

Then update Vercel environment variable and redeploy.

---

**Status:** ✅ Fixed locally - Update Vercel env var and redeploy!
