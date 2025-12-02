<<<<<<< HEAD
# 🚀 Deployment Quick Start Guide

## 1. Backend (Render) Configuration

Go to your Render Dashboard -> Select your Backend Service -> **Environment**

Add these Environment Variables:

| Key | Value | Description |
|-----|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | Your Render PostgreSQL Internal URL |
| `SECRET_KEY` | `your-secure-secret-key` | Generate a random string |
| `ALLOWED_ORIGINS` | `https://your-frontend-app.vercel.app` | **CRITICAL**: Your Vercel Frontend URL |
| `OPENAI_API_KEY` | `sk-...` | Your OpenAI Key |

> **Note**: For `ALLOWED_ORIGINS`, if you have multiple URLs (e.g. staging), separate them with commas: `https://app.com,https://staging.app.com`

## 2. Frontend (Vercel) Configuration

Go to your Vercel Dashboard -> Select your Project -> **Settings** -> **Environment Variables**

Add this Environment Variable:

| Key | Value | Description |
|-----|-------|-------------|
| `VITE_API_URL` | `https://your-backend-app.onrender.com` | **CRITICAL**: Your Render Backend URL |

> **Important**: Do NOT add a trailing slash `/` at the end of the URL.
> ✅ Correct: `https://api.render.com`
> ❌ Incorrect: `https://api.render.com/`

## 3. Verification Steps

After redeploying both:

1.  Open your Vercel App URL.
2.  Open Chrome Developer Tools (F12) -> **Network** tab.
3.  Try to **Login**.
4.  Look for the login request.
    *   **Request URL** should start with `https://your-backend-app.onrender.com/...`
    *   **Status** should be `200` (OK).

### Troubleshooting "Failed to Fetch"

If you still see "Failed to Fetch" in production:

1.  **Check VITE_API_URL**: Ensure it matches your Render URL exactly.
2.  **Check ALLOWED_ORIGINS**: Ensure your Vercel URL is listed in Render env vars.
3.  **Check Protocol**: Ensure both are using `https://`.
=======
# 🚀 Quick Deployment Guide

## Your Two URLs

After deploying both services, you'll have:

### 1. Backend URL (Render.com)
**Your Backend**: `https://kodescruxx.onrender.com`

This is already deployed! ✅

**What it's for:**
- API endpoints (e.g., `/explain`, `/debug`, `/execute_code`)
- WebSocket connections (`/ws/{room_id}`)
- Health check: `https://kodescruxxx.onrender.com/health`

### 2. Frontend URL (Vercel)
**Your Frontend**: `https://kodes-cruxx.vercel.app`

This will be created when you deploy to Vercel.

**What it's for:**
- Your main application website
- User-facing interface
- Where users access the app

---

## 🔄 How to Get Both URLs

### Step 1: Backend (Already Done! ✅)
- **URL**: `https://kodescruxx.onrender.com`
- **Status**: Deployed and running
- **Location**: Render Dashboard → Your Service → URL

### Step 2: Frontend (Deploy to Vercel)

1. **Go to Vercel**: https://vercel.com/dashboard
2. **Click "Add New..." → "Project"**
3. **Import your GitHub repository**
4. **Configure:**
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Add Environment Variables:**
   ```
   VITE_API_URL=https://kodescruxx.onrender.com
   VITE_WS_URL=wss://kodescruxx.onrender.com
   ```
6. **Click "Deploy"**
7. **Wait 1-2 minutes**
8. **Copy your frontend URL** (shown after deployment)

### Step 3: Connect Them Together

After getting your frontend URL (e.g., `https://kodes-cruxx.vercel.app`):

1. **Go to Render Dashboard**
2. **Your Service → Environment**
3. **Update `ALLOWED_ORIGINS`:**
   ```
   https://kodes-cruxx.vercel.app
   ```
4. **Save** (Render will auto-redeploy)

---

## ✅ Final Checklist

- [ ] Backend deployed on Render: `https://kodescruxx.onrender.com`
- [ ] Frontend deployed on Vercel: `https://kodes-cruxx.vercel.app`
- [ ] Environment variables set in Vercel:
  - [ ] `VITE_API_URL` = `https://kodescruxx.onrender.com`
  - [ ] `VITE_WS_URL` = `wss://kodescruxx.onrender.com`
- [ ] `ALLOWED_ORIGINS` updated in Render with your Vercel URL
- [ ] Test both URLs are accessible
- [ ] Test frontend can connect to backend

---

## 🧪 Testing Your Deployment

### Test Backend:
```bash
curl https://kodescruxx.onrender.com/health
```
Should return: `{"status": "ok", ...}`

### Test Frontend:
1. Visit your Vercel URL
2. Check browser console (F12) for errors
3. Try using the app features

### Test Connection:
1. Open frontend in browser
2. Open DevTools → Network tab
3. Use any feature (e.g., Code Explanation)
4. Check that API calls go to `https://kodescruxx.onrender.com`

---

## 📝 Summary

**Backend URL**: `https://kodescruxx.onrender.com` ✅ (Already deployed)

**Frontend URL**: `https://kodes-cruxx.vercel.app` (Deploy to get this)

Once you have both:
1. Set environment variables in Vercel
2. Update CORS in Render
3. Test the connection
4. You're live! 🎉

>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)
