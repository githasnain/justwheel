# Vercel Deployment Guide - Step by Step

## Repository: https://github.com/githasnain/wheeljustchange.git

**Important:** You'll deploy both backend and frontend from the SAME repository, but as separate Vercel projects.

---

## Step 1: Push Code to GitHub

### 1.1 Check Current Status
```bash
cd newwheel
git status
```

### 1.2 Add All Files
```bash
git add .
```

### 1.3 Commit Changes
```bash
git commit -m "Ready for Vercel deployment - backend and frontend"
```

### 1.4 Set Remote URL (if needed)
```bash
git remote set-url origin https://github.com/githasnain/wheeljustchange.git
```

### 1.5 Push to GitHub
```bash
git push -u origin main
```

**Note:** If you get authentication errors:
- Use GitHub Desktop app (recommended for Windows), OR
- Use Personal Access Token: When prompted for password, use a GitHub Personal Access Token instead
- Or authenticate via: `git config --global credential.helper wincred`
- To create a token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token

---

## Step 2: Deploy Backend First

### 2.1 Go to Vercel Dashboard
1. Visit [vercel.com](https://vercel.com)
2. Sign in with your account
3. Click **"Add New Project"** button

### 2.2 Import Your Repository
1. Click **"Import Git Repository"**
2. Find and select: `githasnain/wheeljustchange`
3. Click **"Import"**

### 2.3 Configure Backend Project

**Project Settings:**
- **Project Name**: Use your existing backend project name (or create new name like `wheel-backend`)
- **Framework Preset**: Select **"Other"** (or "Express" if available)
- **Root Directory**: 
  - Click **"Edit"** button next to Root Directory
  - Change from `/` to `backend`
  - This tells Vercel to use the `backend` folder
- **Build Command**: Leave empty (or `npm install`)
- **Output Directory**: Leave empty
- **Install Command**: `npm install`

### 2.4 Set Environment Variables for Backend

Click **"Environment Variables"** section and add these:

| Variable Name | Value |
|---------------|-------|
| `DATABASE_URL` | `postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@YOUR_DB_HOST/YOUR_DB_NAME?sslmode=require&channel_binding=require` |
| `NODE_ENV` | `production` |
| `PORT` | `3001` (optional, Vercel will set this automatically) |

**⚠️ SECURITY NOTE:** 
- Replace `YOUR_DB_USER`, `YOUR_DB_PASSWORD`, `YOUR_DB_HOST`, and `YOUR_DB_NAME` with your actual database credentials
- **NEVER commit your actual database connection string to GitHub!**
- Get your connection string from your Neon dashboard or database provider

**Important:** 
- Make sure `DATABASE_URL` is exactly as shown above
- Click "Save" after adding each variable

### 2.5 Deploy Backend

1. Click the **"Deploy"** button
2. Wait for deployment to complete (usually 1-2 minutes)
3. Once deployed, you'll see a success message
4. **COPY THE DEPLOYMENT URL** - It will look like:
   - `https://your-backend-name.vercel.app`
   - Or `https://wheel-backend-xyz123.vercel.app`
5. **Test the backend:**
   - Visit: `https://YOUR_BACKEND_URL.vercel.app/api/health`
   - Should return: `{"status":"ok","message":"Backend is running","database":"PostgreSQL"}`

**✅ Save this backend URL - you'll need it for frontend!**

---

## Step 3: Deploy Frontend

### 3.1 Create New Frontend Project

1. In Vercel dashboard, click **"Add New Project"** again (yes, create a NEW project)
2. Select the **SAME repository**: `githasnain/wheeljustchange`
3. Click **"Import"**

**Note:** This is a separate project from the backend, but uses the same GitHub repo.

### 3.2 Configure Frontend Project

**Project Settings:**
- **Project Name**: `wheel-frontend` (or any name you prefer)
- **Framework Preset**: **Vite** (should auto-detect, if not select "Vite")
- **Root Directory**: 
  - Click **"Edit"** button next to Root Directory
  - Change from `/` to `frontend`
  - This tells Vercel to use the `frontend` folder
- **Build Command**: `npm run build` (should auto-fill)
- **Output Directory**: `dist` (should auto-fill)
- **Install Command**: `npm install` (should auto-fill)

### 3.3 Set Environment Variables for Frontend

Click **"Environment Variables"** section and add:

| Variable Name | Value |
|---------------|-------|
| `VITE_API_BASE_URL` | `https://YOUR_BACKEND_URL.vercel.app/api` |
| `NODE_ENV` | `production` |

**CRITICAL:** 
- Replace `YOUR_BACKEND_URL` with the actual backend URL from Step 2.5
- Example: If backend is `https://wheel-backend-abc.vercel.app`, then:
  - `VITE_API_BASE_URL` = `https://wheel-backend-abc.vercel.app/api`
- Make sure to include `/api` at the end!

### 3.4 Deploy Frontend

1. Click the **"Deploy"** button
2. Wait for deployment to complete (usually 1-2 minutes)
3. Once deployed, you'll get a frontend URL like:
   - `https://wheel-frontend-xyz123.vercel.app`

---

## Step 4: Verify Everything Works

### Test Backend:
1. Visit: `https://YOUR_BACKEND_URL.vercel.app/api/health`
2. Should see: `{"status":"ok","message":"Backend is running","database":"PostgreSQL"}`

### Test Frontend:
1. Visit: `https://YOUR_FRONTEND_URL.vercel.app`
2. The wheel application should load
3. Try uploading a file or spinning the wheel
4. Check browser console (F12) for any errors

### Test Connection:
- Frontend should automatically connect to backend
- All API calls should work
- Database should be the same as local (same PostgreSQL)

---

## Important Notes

✅ **Same Repository**: Both projects use `githasnain/wheeljustchange` repo  
✅ **Different Root Directories**: Backend uses `backend/`, Frontend uses `frontend/`  
✅ **Separate Projects**: Backend and Frontend are separate Vercel projects  
✅ **Same Database**: Production uses the same PostgreSQL database as local  
✅ **Environment Variables**: Must be set in each project separately  

---

## Troubleshooting

### Backend Issues:

**Problem:** 404 errors or "Cannot GET /"  
**Solution:** 
- Check Root Directory is set to `backend`
- Verify `backend/vercel.json` exists
- Check deployment logs in Vercel dashboard

**Problem:** Database connection fails  
**Solution:**
- Verify `DATABASE_URL` environment variable is correct
- Check for typos in the connection string
- Make sure database allows connections from Vercel IPs

**Problem:** Build fails  
**Solution:**
- Check that `backend/package.json` exists
- Verify all dependencies are listed
- Check build logs in Vercel dashboard

### Frontend Issues:

**Problem:** API calls fail (404 or CORS errors)  
**Solution:**
- Verify `VITE_API_BASE_URL` is correct
- Make sure it includes `/api` at the end
- Check that backend URL is correct (no typos)
- Redeploy frontend after fixing environment variable

**Problem:** Build fails  
**Solution:**
- Check that `frontend/package.json` exists
- Verify Root Directory is set to `frontend`
- Check build logs for specific errors

**Problem:** Frontend shows but can't connect to backend  
**Solution:**
- Open browser console (F12) and check for errors
- Verify `VITE_API_BASE_URL` environment variable
- Test backend URL directly: `https://YOUR_BACKEND_URL.vercel.app/api/health`
- Redeploy frontend after updating environment variable

### General Tips:

1. **After changing environment variables, always redeploy:**
   - Go to project → Settings → Environment Variables
   - Make changes
   - Go to Deployments tab
   - Click "Redeploy" on latest deployment

2. **Check deployment logs:**
   - Go to project → Deployments
   - Click on a deployment
   - View "Build Logs" and "Function Logs"

3. **Test endpoints:**
   - Backend health: `https://YOUR_BACKEND_URL.vercel.app/api/health`
   - Backend API: `https://YOUR_BACKEND_URL.vercel.app/api/spins/list/`

---

## Quick Checklist

Before deploying, make sure:
- [ ] Code is pushed to GitHub
- [ ] `backend/vercel.json` exists
- [ ] `frontend/vercel.json` exists
- [ ] `backend/package.json` has all dependencies
- [ ] `frontend/package.json` has all dependencies
- [ ] `.env` files are NOT committed (they're in `.gitignore`)

After backend deployment:
- [ ] Backend URL is saved
- [ ] Backend health check works
- [ ] Database connection works

After frontend deployment:
- [ ] `VITE_API_BASE_URL` is set correctly
- [ ] Frontend loads without errors
- [ ] Frontend can connect to backend
- [ ] All features work (upload, spin, etc.)

---

## Summary

1. ✅ Push code to: `https://github.com/githasnain/wheeljustchange.git`
2. ✅ Deploy backend first (Root Directory: `backend`)
3. ✅ Save backend URL
4. ✅ Deploy frontend (Root Directory: `frontend`)
5. ✅ Set `VITE_API_BASE_URL` to backend URL + `/api`
6. ✅ Test both deployments

Good luck! 🚀
