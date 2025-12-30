# How to Push to GitHub - Fix Authentication Issue

## Problem
You're getting: `Permission denied to gitdaudali` when trying to push to `githasnain/wheeljustchange.git`

This means Windows has cached credentials for a different GitHub account.

## Solution Options

### Option 1: Use GitHub Desktop (Easiest - Recommended)

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in with your `githasnain` account
3. In GitHub Desktop:
   - File → Add Local Repository
   - Browse to: `C:\Users\Dell\Desktop\justchange\newwheel`
   - Click "Add Repository"
4. Click "Publish repository" or "Push origin"
5. Done! ✅

### Option 2: Use Personal Access Token (HTTPS)

1. **Create a Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: `Vercel Deployment`
   - Select scopes: Check `repo` (full control of private repositories)
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

2. **Push using the token:**
   ```bash
   cd C:\Users\Dell\Desktop\justchange\newwheel
   git push -u origin main
   ```
   - When prompted for **Username**: Enter `githasnain`
   - When prompted for **Password**: Paste the token (not your password!)

### Option 3: Clear Credentials and Re-authenticate

1. **Clear cached credentials:**
   ```bash
   cmdkey /delete:git:https://github.com
   ```

2. **Try pushing again:**
   ```bash
   git push -u origin main
   ```
   - It will prompt for credentials
   - Use your `githasnain` username
   - Use a Personal Access Token as password (see Option 2)

### Option 4: Use SSH Instead

1. **Generate SSH key (if you don't have one):**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
   - Press Enter to accept default location
   - Press Enter for no passphrase (or set one)

2. **Add SSH key to GitHub:**
   - Copy the key: `type C:\Users\Dell\.ssh\id_ed25519.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste the key and save

3. **Change remote to SSH:**
   ```bash
   git remote set-url origin git@github.com:githasnain/wheeljustchange.git
   ```

4. **Push:**
   ```bash
   git push -u origin main
   ```

## Quick Fix (Try This First)

Run these commands in order:

```bash
cd C:\Users\Dell\Desktop\justchange\newwheel

# Clear cached credentials
cmdkey /delete:git:https://github.com

# Verify remote URL
git remote -v

# Try pushing (will prompt for credentials)
git push -u origin main
```

When prompted:
- **Username**: `githasnain`
- **Password**: Use a Personal Access Token (create one at https://github.com/settings/tokens)

## Verify Access

Make sure you have write access to the repository:
- Go to: https://github.com/githasnain/wheeljustchange
- Check if you can see the repository
- If it's private, make sure you're logged in as `githasnain`

## After Successful Push

Once the code is pushed, you can proceed with Vercel deployment:
1. Backend deployment (Root Directory: `backend`)
2. Frontend deployment (Root Directory: `frontend`)

See `VERCEL_DEPLOYMENT.md` for deployment steps.

