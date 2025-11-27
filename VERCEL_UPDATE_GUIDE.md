# 🚨 URGENT: Update Vercel Environment Variable

## Current Issue

Your deployed site is still using the OLD environment variable:
```
❌ https://liftuplabs-backend.onrender.com (missing /api)
```

It needs to be:
```
✅ https://liftuplabs-backend.onrender.com/api (with /api)
```

## Step-by-Step Fix

### Step 1: Go to Vercel Dashboard

1. Open your browser
2. Go to: **https://vercel.com/dashboard**
3. Log in if needed
4. You should see your projects list

### Step 2: Select Your Project

1. Find and click on your project: **liftup-labs** (or whatever name you used)
2. You'll see the project overview page

### Step 3: Go to Settings

1. Click on the **"Settings"** tab at the top
2. In the left sidebar, click on **"Environment Variables"**

### Step 4: Find VITE_API_URL

You should see a list of environment variables. Look for:
```
VITE_API_URL
```

### Step 5: Edit the Variable

**Option A: If the variable exists**
1. Click the **"..."** (three dots) menu next to `VITE_API_URL`
2. Click **"Edit"**
3. Change the value to: `https://liftuplabs-backend.onrender.com/api`
4. Make sure it ends with `/api`
5. Click **"Save"**

**Option B: If the variable doesn't exist**
1. Click **"Add New"** button
2. Name: `VITE_API_URL`
3. Value: `https://liftuplabs-backend.onrender.com/api`
4. Select environments: Check all (Production, Preview, Development)
5. Click **"Save"**

### Step 6: Redeploy

**IMPORTANT:** Changing environment variables doesn't automatically redeploy!

1. Click on the **"Deployments"** tab at the top
2. Find the latest deployment (should be at the top)
3. Click the **"..."** (three dots) menu on the right
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again
6. Wait for the deployment to complete (usually 1-2 minutes)

### Step 7: Verify

1. Once deployment is complete, visit your site: **https://liftup-labs.vercel.app**
2. Open browser DevTools (F12)
3. Go to Console tab
4. Type: `console.log(import.meta.env.VITE_API_URL)`
5. Press Enter
6. Should show: `https://liftuplabs-backend.onrender.com/api`

### Step 8: Test

1. Go to Register page
2. Fill in the form
3. Click "Create Account"
4. Should work without 404 error! ✅

## Visual Guide

```
Vercel Dashboard
    ↓
Select Project (liftup-labs)
    ↓
Settings Tab
    ↓
Environment Variables (left sidebar)
    ↓
Find VITE_API_URL
    ↓
Edit → Change to: https://liftuplabs-backend.onrender.com/api
    ↓
Save
    ↓
Deployments Tab
    ↓
Latest Deployment → ... → Redeploy
    ↓
Wait for deployment
    ↓
Test your site
```

## Common Mistakes

### ❌ Mistake 1: Forgetting to Redeploy
- Changing env var doesn't auto-redeploy
- You MUST manually redeploy after changing

### ❌ Mistake 2: Wrong URL Format
```
❌ https://liftuplabs-backend.onrender.com
❌ https://liftuplabs-backend.onrender.com/
✅ https://liftuplabs-backend.onrender.com/api
```

### ❌ Mistake 3: Not Selecting All Environments
- Make sure to select Production, Preview, and Development
- Or at least Production

### ❌ Mistake 4: Typo in Variable Name
- Must be exactly: `VITE_API_URL`
- Case sensitive!
- Must start with `VITE_`

## Troubleshooting

### Issue: Can't find Environment Variables section

**Solution:**
1. Make sure you're in the correct project
2. Click "Settings" tab
3. Look in the left sidebar
4. Should see "Environment Variables"

### Issue: Changes not taking effect

**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Try incognito/private mode
3. Wait a few minutes for CDN to update
4. Make sure you redeployed after saving

### Issue: Still getting 404

**Solution:**
1. Check if backend is running: `curl https://liftuplabs-backend.onrender.com/api/health`
2. Verify env var in Vercel is correct
3. Verify you redeployed
4. Check browser console for actual URL being called
5. Clear browser cache completely

## Quick Verification Commands

### Test Backend (in terminal)
```bash
# Should return 200 OK
curl https://liftuplabs-backend.onrender.com/api/health

# Should return JSON with status
curl -i https://liftuplabs-backend.onrender.com/api/health
```

### Test Frontend (in browser console)
```javascript
// Check environment variable
console.log(import.meta.env.VITE_API_URL)
// Should show: https://liftuplabs-backend.onrender.com/api

// Test API call
fetch(import.meta.env.VITE_API_URL + '/health')
  .then(r => r.json())
  .then(console.log)
// Should return: {status: "OK", message: "..."}
```

## Alternative: Use Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Set environment variable
vercel env add VITE_API_URL production
# When prompted, enter: https://liftuplabs-backend.onrender.com/api

# Redeploy
vercel --prod
```

## What Happens After Fix

Once you update Vercel and redeploy:

✅ **Registration will work**
```javascript
POST https://liftuplabs-backend.onrender.com/api/auth/register
// Returns: 201 Created
```

✅ **Login will work**
```javascript
POST https://liftuplabs-backend.onrender.com/api/auth/login
// Returns: 200 OK with token
```

✅ **All API calls will work**
```javascript
GET https://liftuplabs-backend.onrender.com/api/events
GET https://liftuplabs-backend.onrender.com/api/auth/me
POST https://liftuplabs-backend.onrender.com/api/contact
// All will work correctly
```

## Checklist

Before you start:
- [ ] I have access to Vercel dashboard
- [ ] I know my project name
- [ ] I have the correct backend URL

During update:
- [ ] Opened Vercel dashboard
- [ ] Selected correct project
- [ ] Went to Settings → Environment Variables
- [ ] Found or created VITE_API_URL
- [ ] Set value to: `https://liftuplabs-backend.onrender.com/api`
- [ ] Saved the variable
- [ ] Went to Deployments tab
- [ ] Clicked Redeploy on latest deployment
- [ ] Waited for deployment to complete

After update:
- [ ] Cleared browser cache
- [ ] Tested registration
- [ ] Tested login
- [ ] Verified no 404 errors
- [ ] Checked browser console for correct URL

## Need Help?

If you're stuck:

1. **Screenshot the error** - Take a screenshot of the browser console
2. **Check Vercel logs** - Go to Deployments → Click deployment → View logs
3. **Verify backend** - Make sure backend is actually running
4. **Check network tab** - See what URL is actually being called

## Expected Timeline

- Updating env var: 30 seconds
- Redeploying: 1-2 minutes
- CDN propagation: 1-5 minutes
- Total: ~5 minutes

---

**🚨 ACTION REQUIRED: Update Vercel environment variable NOW!**

The local fix is done, but your deployed site won't work until you update Vercel.
