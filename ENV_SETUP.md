# Frontend Environment Variables Setup

## ✅ Security Update Complete

The `.env` file has been successfully removed from Git tracking to protect configuration.

## What Changed?

1. ✅ Updated `.gitignore` to ignore `.env` files
2. ✅ Removed `.env` from Git tracking (but kept it locally)
3. ✅ Created `.env.example` as a template
4. ✅ Committed changes to repository

## Important Notes

### Your Local .env File
- ✅ **Still exists** on your computer at `LiftupLabs/.env`
- ✅ **Still works** - your application will continue to use it
- ✅ **Not tracked** by Git anymore - won't be pushed to GitHub
- ✅ **Safe** - your configuration is protected

### For Other Developers

When someone clones this repository, they need to:

1. Copy the example file:
   ```bash
   cd LiftupLabs
   cp .env.example .env
   ```

2. Edit `.env` with their own values:
   ```bash
   # For local development
   VITE_API_URL=http://localhost:5000/api

   # For production
   # VITE_API_URL=https://your-backend-url.com/api
   ```

## Environment Variables

### VITE_API_URL
The backend API URL that the frontend will connect to.

**Local Development:**
```env
VITE_API_URL=http://localhost:5000/api
```

**Production:**
```env
VITE_API_URL=https://your-backend-url.com/api
```

### Important: VITE_ Prefix

⚠️ **All environment variables in Vite must be prefixed with `VITE_`** to be exposed to the client-side code.

- ✅ `VITE_API_URL` - Will work
- ❌ `API_URL` - Won't work

## Files in Git

### Tracked (in Git):
- `.env.example` - Template with placeholder values
- `.gitignore` - Tells Git what to ignore
- All other project files

### Ignored (not in Git):
- `.env` - Your actual environment variables
- `.env.local` - Local overrides
- `.env.development.local` - Development overrides
- `.env.production.local` - Production overrides
- `node_modules/` - Dependencies
- `dist/` - Build output

## Verification

To verify the .env file is not tracked:

```bash
# Check tracked files (should NOT show .env)
git ls-files | grep "^\.env$"

# Should only show .env.example
git ls-files | grep "\.env"

# Check ignored files (should show .env)
git status --ignored
```

## Development Workflow

### Starting Development

1. Make sure you have `.env` file:
   ```bash
   # If not, copy from example
   cp .env.example .env
   ```

2. Update API URL if needed:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

1. Update `.env` for production:
   ```env
   VITE_API_URL=https://your-production-backend.com/api
   ```

2. Build the project:
   ```bash
   npm run build
   ```

## Environment-Specific Files

Vite supports multiple environment files:

- `.env` - Loaded in all cases
- `.env.local` - Loaded in all cases, ignored by git
- `.env.[mode]` - Only loaded in specified mode
- `.env.[mode].local` - Only loaded in specified mode, ignored by git

**Priority (highest to lowest):**
1. `.env.[mode].local`
2. `.env.[mode]`
3. `.env.local`
4. `.env`

### Example Setup

```bash
# .env - Default values (tracked in git)
VITE_API_URL=http://localhost:5000/api

# .env.local - Your local overrides (not tracked)
VITE_API_URL=http://192.168.1.100:5000/api

# .env.production - Production values (tracked in git)
VITE_API_URL=https://api.liftuplabs.com/api
```

## Accessing Environment Variables

In your code:

```javascript
// ✅ Correct - Use import.meta.env
const apiUrl = import.meta.env.VITE_API_URL

// ❌ Wrong - Don't use process.env (that's for Node.js)
const apiUrl = process.env.VITE_API_URL
```

## Common Issues

### "API URL is undefined"
- Make sure variable is prefixed with `VITE_`
- Restart dev server after changing `.env`
- Check `.env` file exists

### "Changes to .env not working"
- Restart the development server
- Vite only reads `.env` on startup

### "Git still tracking .env"
```bash
# Remove from cache
git rm --cached .env

# Commit the change
git commit -m "Stop tracking .env"
```

## Best Practices

1. ✅ **Use `.env.example`** - Keep it updated with all required variables
2. ✅ **Document variables** - Add comments explaining what each variable does
3. ✅ **Use different values** - Dev and production should have different URLs
4. ✅ **Never commit `.env`** - Always keep it in `.gitignore`
5. ✅ **Restart dev server** - After changing environment variables
6. ✅ **Use VITE_ prefix** - Required for client-side access
7. ✅ **Don't expose secrets** - Frontend env vars are public in the browser

## Security Notes

⚠️ **Important**: Frontend environment variables are **NOT SECRET**!

- All `VITE_*` variables are embedded in the client-side bundle
- Anyone can see them in the browser's developer tools
- **Never put sensitive data** (API keys, passwords, secrets) in frontend `.env`
- Only put **public configuration** (API URLs, feature flags, etc.)

### What's Safe to Put in Frontend .env:
- ✅ API URLs
- ✅ Feature flags
- ✅ Public configuration
- ✅ Analytics IDs (public ones)

### What's NOT Safe:
- ❌ API keys
- ❌ Passwords
- ❌ Secret tokens
- ❌ Private credentials

## Deployment

### Vercel
Add environment variables in project settings:
```
VITE_API_URL=https://your-backend.com/api
```

### Netlify
Add in Site settings > Build & deploy > Environment:
```
VITE_API_URL=https://your-backend.com/api
```

### GitHub Pages
Use GitHub Secrets and GitHub Actions to inject variables during build.

### Docker
Pass environment variables in docker-compose.yml:
```yaml
environment:
  - VITE_API_URL=https://your-backend.com/api
```

## Troubleshooting

### Check Current Environment Variables

```javascript
// In your browser console
console.log(import.meta.env)
```

### Verify Build Output

```bash
# Build the project
npm run build

# Check if env vars are embedded
grep -r "VITE_API_URL" dist/
```

## Support

If you have questions about environment variables:

1. Check `.env.example` for required variables
2. Read [Vite Environment Variables Documentation](https://vitejs.dev/guide/env-and-mode.html)
3. Ask your team lead
4. Never share actual `.env` contents in public channels

---

**Remember**: Frontend environment variables are public! 🌐
