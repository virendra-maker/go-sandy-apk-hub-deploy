# 🚀 Go Sandy APK Hub - Quick Deployment

## One-Click Deploy Links (Click any one to deploy instantly)

### ⚡ Vercel (Recommended - Fastest)
[Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/virendra-maker/go-sandy-apk-hub-deploy&project-name=go-sandy-apk-hub&repository-name=go-sandy-apk-hub-deploy)

### 🔗 Netlify 
[Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/virendra-maker/go-sandy-apk-hub-deploy)

### 🚂 Railway
[Deploy to Railway](https://railway.app/new/template?repo=https://github.com/virendra-maker/go-sandy-apk-hub-deploy)

## After Clicking Deploy Button:

1. **Connect GitHub** - Authorize the platform to access your repository
2. **Add Environment Variables** - Copy these values:
   ```
   DATABASE_URL = (leave empty for now, we'll set up later)
   JWT_SECRET = your-random-secret-key-123
   VITE_APP_ID = go-sandy-apk-hub
   OAUTH_SERVER_URL = https://api.manus.im
   VITE_OAUTH_PORTAL_URL = https://portal.manus.im
   VITE_APP_TITLE = Go Sandy APK Hub
   ```
3. **Click Deploy** - Wait 2-5 minutes for deployment to complete
4. **Get Your Live URL** - Platform will give you a live link like:
   - Vercel: `https://go-sandy-apk-hub.vercel.app`
   - Netlify: `https://go-sandy-apk-hub.netlify.app`
   - Railway: `https://go-sandy-apk-hub.railway.app`

## GitHub Repository
https://github.com/virendra-maker/go-sandy-apk-hub-deploy

## Support
If deployment fails, check:
- Node version (requires 18+)
- Environment variables are set correctly
- GitHub token has proper permissions
