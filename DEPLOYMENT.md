# Deployment Guide

This guide explains how to deploy the KodesCruxx application to **Render** (Backend) and **Vercel** (Frontend).

## 1. Backend Deployment (Render)

The backend is configured to be deployed on [Render](https://render.com/).

### Steps:
1.  **Push your code to GitHub.**
2.  **Create a new Web Service on Render.**
    *   Connect your GitHub repository.
    *   Render should automatically detect the `render.yaml` file (Blueprint).
    *   If not using Blueprint, choose **Python 3** environment.
    *   **Build Command:** `pip install --upgrade pip && pip install -r requirements.txt`
    *   **Start Command:** `gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`

### Environment Variables (Render Dashboard):
You must set these environment variables in the Render Dashboard under "Environment":

| Key | Value (Example) | Description |
| :--- | :--- | :--- |
| `OPENAI_API_KEY` | `sk-...` | Your OpenAI API Key |
| `SECRET_KEY` | `your-secure-random-string` | Secret for JWT tokens (generate a long random string) |
| `ALLOWED_ORIGINS` | `https://your-vercel-app.vercel.app` | The URL of your deployed frontend |
| `DATABASE_URL` | `sqlite:///./kodescruxx.db` | Database URL (See note below) |
| `MODEL_NAME` | `gpt-4o-mini` | AI Model to use |
| `DEBUG` | `False` | Set to False for production |

> **Important Note on Database:**
> The current configuration uses SQLite (`sqlite:///./kodescruxx.db`). On Render's free tier, the disk is ephemeral, meaning **all data (users, chat history) will be lost every time the server restarts or you deploy new code.**
>
> **For a production-ready app:**
> 1.  Create a **PostgreSQL** database on Render.
> 2.  Copy the "Internal Database URL" from the Postgres dashboard.
> 3.  Update the `DATABASE_URL` environment variable in your Web Service to use the Postgres URL.

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

> **Note:** Make sure to remove any trailing slash `/` from the backend URL.

## 3. Final Verification

1.  **Update Backend CORS:**
    *   Once your Vercel app is deployed, copy its URL (e.g., `https://kodescruxx.vercel.app`).
    *   Go to your Render Dashboard -> Environment.
    *   Update `ALLOWED_ORIGINS` to match your Vercel URL exactly.

2.  **Test Signup/Login:**
    *   Open your Vercel app.
    *   Try to sign up. If it works, the connection is successful!
