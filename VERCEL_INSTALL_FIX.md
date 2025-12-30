# Fix: npm install Can't Find package.json

## The Error:
```
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory, open '/vercel/path0/package.json'
```

This means Vercel is running `npm install` from the **root directory**, not from `frontend/`.

## Solution Options:

### Option 1: Set Root Directory in Vercel (BEST - Try This First)

1. **Go to Vercel Dashboard → Your Frontend Project**
2. **Settings → General**
3. **Scroll to "Root Directory"**
4. **Set it to:** `frontend` (exactly, no slashes)
5. **Save**
6. **Go to Settings → Build and Deployment Settings**
7. **Make sure these are set:**
   - **Build Command:** `npm run build` (no `cd frontend`)
   - **Output Directory:** `dist` (not `frontend/dist`)
   - **Install Command:** `npm install` (no `cd frontend`)
8. **Save and Redeploy**

### Option 2: Use Manual Override (If Root Directory Doesn't Work)

If Root Directory setting still doesn't work, use these **exact** commands:

1. **Settings → Build and Deployment Settings**

2. **Install Command:**
   - Enable "Override"
   - Set to: `bash -c "cd frontend && npm install"`
   - (Using `bash -c` ensures the directory change persists)

3. **Build Command:**
   - Enable "Override"
   - Set to: `bash -c "cd frontend && npm run build"`

4. **Output Directory:**
   - Enable "Override"
   - Set to: `frontend/dist`

5. **Save and Redeploy**

### Option 3: Create Root-Level Build Script (Alternative)

If both above don't work, we can create a build script at the root level.

## Why Option 1 Should Work:

When Root Directory is set to `frontend`:
- ✅ Vercel changes to `frontend/` directory FIRST
- ✅ Then runs `npm install` (finds `frontend/package.json`)
- ✅ Then runs `npm run build` (finds vite in `frontend/node_modules`)
- ✅ Output is in `frontend/dist` (but you set Output Directory as `dist`)

## Verification:

After fixing, build logs should show:
```
✓ Installing dependencies
  npm install
  added 1234 packages in 45s  ← Many packages!
  
✓ Building application
  npm run build
  vite v7.2.7 building for production...
```

## If Still Failing:

1. **Check you're editing the FRONTEND project** (not backend)
2. **Verify `frontend/package.json` exists** in your GitHub repo
3. **Try Option 2** (bash -c method)
4. **Check Vercel project settings** - make sure you're not in a team/organization that has restrictions

