# Go Sandy APK Hub - Deployment Guide

This guide explains how to deploy the Go Sandy APK Hub to Vercel, Netlify, and Railway.

## Prerequisites

1. **Gmail Account**: b81617106@gmail.com (for authentication)
2. **Database**: MySQL or compatible database
3. **Git Repository**: Push code to GitHub

## Environment Variables Required

Before deploying, you need to set up the following environment variables:

- `DATABASE_URL`: MySQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `GOOGLE_CLIENT_ID`: Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth Client Secret
- `OAUTH_CALLBACK_URL`: Your deployment URL + /api/oauth/callback

## Deployment Steps

### 1. Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Environment Variables in Vercel Dashboard:**
- Go to Project Settings → Environment Variables
- Add all required variables

### 2. Netlify Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

**Environment Variables in Netlify:**
- Go to Site Settings → Build & Deploy → Environment
- Add all required variables

### 3. Railway Deployment

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Create new project
railway init

# Deploy
railway up
```

**Environment Variables in Railway:**
- Set variables in the Railway dashboard under Variables section

## Database Setup

1. Create a MySQL database
2. Run migrations: `pnpm db:push`
3. Update `DATABASE_URL` with your connection string

## Gmail OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `https://your-vercel-domain.vercel.app/api/oauth/callback`
   - `https://your-netlify-domain.netlify.app/api/oauth/callback`
   - `https://your-railway-domain.railway.app/api/oauth/callback`
6. Copy Client ID and Client Secret

## Deployment URLs

After successful deployment, your application will be available at:

- **Vercel**: https://go-sandy-apk-hub.vercel.app
- **Netlify**: https://go-sandy-apk-hub.netlify.app
- **Railway**: https://go-sandy-apk-hub.railway.app

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `pnpm install`
- Check Node version compatibility (requires Node 18+)

### Database Connection Issues
- Verify DATABASE_URL format
- Ensure database is accessible from deployment server
- Check firewall rules

### OAuth Issues
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Check redirect URIs match deployment domain
- Ensure OAUTH_CALLBACK_URL is correct

## Support

For issues, check the logs in your deployment platform's dashboard.
