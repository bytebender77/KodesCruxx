# Deployment Guide (Production Ready)

This guide explains how to deploy the KodesCruxx application to **Render** (Backend with PostgreSQL) and **Vercel** (Frontend).

## 1. Backend Deployment (Render)

The backend is configured to be deployed on [Render](https://render.com/) using a **Blueprint**. This is the easiest and most robust method.

### Steps:
1.  **Push your code to GitHub.**
2.  **Go to the Render Dashboard.**
3.  **Click "New" -> "Blueprint Instance".**
4.  **Connect your GitHub repository.**
5.  Render will automatically detect the `render.yaml` file.
6.  **Click "Apply".**

This will automatically create:
*   A **Web Service** (Python Backend).
*   A **PostgreSQL Database** (Managed DB).
*   It will automatically link them together using the `DATABASE_URL` environment variable.

### Environment Variables (Render Dashboard):
After the Blueprint is created, go to the **Web Service** settings -> **Environment** and ensure these are set (some might need manual entry if not in `render.yaml`):

| Key | Value (Example) | Description |
| :--- | :--- | :--- |
| `OPENAI_API_KEY` | `sk-...` | Your OpenAI API Key |
| `SECRET_KEY` | `your-secure-random-string` | Secret for JWT tokens (generate a long random string) |
| `ALLOWED_ORIGINS` | `https://your-vercel-app.vercel.app` | The URL of your deployed frontend |
| `MODEL_NAME` | `gpt-4o-mini` | AI Model to use |
| `DEBUG` | `False` | Set to False for production |

> **Note:** The `DATABASE_URL` is automatically handled by the Blueprint. You do **NOT** need to set it manually.

## 2. Frontend Deployment (Vercel)

The frontend is configured for [Vercel](https://vercel.com/).

### Steps:
1.  **Push your code to GitHub.**
2.  **Import the project in Vercel.**
    *   Select the `frontend` directory as the **Root Directory**.
    *   Vercel should automatically detect Vite.
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `dist`
    *   **Install Command:** `npm install`

### Environment Variables (Vercel Dashboard):
You must set this environment variable in the Vercel Project Settings:

| Key | Value | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | `https://your-render-backend-name.onrender.com` | The URL of your deployed backend |

> **IMPORTANT:** Make sure to remove any trailing slash `/` from the backend URL.
> Example: `https://kodescruxx-backend.onrender.com` (Correct) vs `https://kodescruxx-backend.onrender.com/` (Incorrect).

## 3. Final Verification

1.  **Update Backend CORS:**
    *   Once your Vercel app is deployed, copy its URL (e.g., `https://kodescruxx.vercel.app`).
    *   Go to your Render Dashboard -> Web Service -> Environment.
    *   Update `ALLOWED_ORIGINS` to match your Vercel URL exactly.
    *   **Redeploy** the backend if you changed the environment variable.

2.  **Test Signup/Login:**
    *   Open your Vercel app.
    *   Try to sign up.
    *   If you see "Failed to fetch", check:
        *   Is the backend running? (Check Render logs)
        *   Is `VITE_API_URL` correct? (Check Vercel settings)
        *   Is `ALLOWED_ORIGINS` correct? (Check Render settings)
