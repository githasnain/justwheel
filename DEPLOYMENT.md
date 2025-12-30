# Vercel Deployment Guide

This guide will help you deploy both frontend and backend to Vercel using the same repository.

## Prerequisites

1. GitHub account
2. Vercel account (free tier works)
3. Your PostgreSQL database connection string (already have it)

## Step 1: Push to GitHub

1. Initialize git (if not already done):
```bash
cd newwheel
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub
3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/newwheel.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy as Single Project (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (leave as is or set to root)
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd frontend && npm install`

5. **Environment Variables** - Add these:
   - `DATABASE_URL` = `postgresql://neondb_owner:npg_XhSQ5rlF7VsN@ep-withered-dream-adupxyp9-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
   - `VITE_API_BASE_URL` = `https://YOUR_PROJECT_NAME.vercel.app/api` (will be set after first deploy)
   - `NODE_ENV` = `production`

6. Click "Deploy"

### Option B: Deploy Frontend and Backend Separately (Alternative)

This gives you separate URLs but is easier to manage.

#### Deploy Backend First:
1. Create new project in Vercel
2. Import your repo
3. Settings:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: (leave empty or `npm install`)
   - **Output Directory**: (leave empty)
4. Environment Variables:
   - `DATABASE_URL` = (your PostgreSQL connection string)
   - `NODE_ENV` = `production`
5. Deploy and note the URL (e.g., `https://newwheel-backend.vercel.app`)

#### Deploy Frontend:
1. Create another project in Vercel
2. Import same repo
3. Settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Environment Variables:
   - `VITE_API_BASE_URL` = `https://newwheel-backend.vercel.app/api` (use your backend URL)
5. Deploy

## Step 3: Update Environment Variables After First Deploy

After the first deployment, you'll get a URL like `https://newwheel-xyz123.vercel.app`

1. Go to your Vercel project settings
2. Go to "Environment Variables"
3. Update `VITE_API_BASE_URL` to: `https://YOUR_ACTUAL_URL.vercel.app/api`
4. Redeploy

## Important Notes

- **Same Database**: Your production will use the SAME PostgreSQL database as local
- **No localhost**: All API calls will use the production URL
- **Environment Variables**: Make sure all are set in Vercel dashboard

## Troubleshooting

- If API routes don't work, check that `/api/index.js` exists
- If build fails, check that all dependencies are in package.json
- If database connection fails, verify DATABASE_URL is correct

