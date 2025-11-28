# Deployment Guide

This guide explains how to deploy the **Backend to Render** and the **Frontend to Vercel**, and how to connect them.

# Deployment Guide: KodesCruxx

This guide details how to deploy the KodesCruxx application to **Render** (Backend) and **Vercel** (Frontend).

## Prerequisites

1.  **GitHub Account**: Ensure your project is pushed to a GitHub repository.
2.  **Render Account**: Sign up at [render.com](https://render.com).
3.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).

---

## Part 1: Backend Deployment (Render)

We will use Render to host the FastAPI backend.

1.  **Create a New Web Service**:
    *   Go to your Render Dashboard.
    *   Click **New +** -> **Web Service**.
    *   Connect your GitHub repository.

2.  **Configure the Service**:
    *   **Name**: `kodescruxx-backend` (or similar)
    *   **Region**: Choose the one closest to you (e.g., Oregon, Frankfurt).
    *   **Branch**: `main` (or your working branch).
    *   **Root Directory**: `.` (leave empty or dot).
    *   **Runtime**: `Python 3`.
    *   **Build Command**: `pip install -r requirements.txt`
8.  **Copy the Backend URL**: Once deployed, copy the URL (e.g., `https://kodescruxx-backend.onrender.com`).

## 2. Deploy Frontend to Vercel

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** > **Project**.
3.  Import your GitHub repository.
4.  **Configure the Project**:
    *   **Framework Preset**: `Vite`
    *   **Root Directory**: `frontend` (Important! Click "Edit" and select the `frontend` folder).
5.  **Environment Variables**:
    *   `VITE_API_URL`: Paste your Render Backend URL (e.g., `https://kodescruxx-backend.onrender.com`). **Do not add a trailing slash**.
6.  Click **Deploy**.
7.  **Copy the Frontend URL**: Once deployed, copy the URL (e.g., `https://kodescruxx.vercel.app`).

## 3. Connect & Finalize

1.  **Update Backend CORS**:
    *   Go back to Render > Environment.
    *   Update `ALLOWED_ORIGINS` to your Vercel Frontend URL (e.g., `https://kodescruxx.vercel.app`).
    *   Save changes (Render will redeploy).

2.  **Update OAuth Redirect URIs**:
    *   **Google Cloud Console**: Add `https://kodescruxx-backend.onrender.com/auth/google/callback` to "Authorized redirect URIs".
    *   **GitHub Developer Settings**: Update "Authorization callback URL" to `https://kodescruxx-backend.onrender.com/auth/github/callback`.

## 4. Verify

1.  Open your Vercel URL.
2.  Try to Sign Up / Log In.
3.  Check if the API requests are going to the Render URL (Network tab).
