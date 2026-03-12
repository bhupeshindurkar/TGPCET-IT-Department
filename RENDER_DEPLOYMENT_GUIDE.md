# Render.com Deployment Guide

## Complete Setup (15 minutes)

### Step 1: Push Backend to GitHub (2 min)
```bash
git add .
git commit -m "Added backend API with MongoDB"
git push origin main
```

### Step 2: Create Render Account (2 min)
1. Go to: https://render.com/
2. Click "Get Started for Free"
3. Sign up with GitHub
4. Authorize Render to access your repositories

### Step 3: Deploy Backend (5 min)
1. In Render Dashboard, click "New +" button
2. Select "Web Service"
3. Connect repository: `TGPCET-IT-Department`
4. Configure service:
   - **Name**: `tgpcet-it-backend`
   - **Region**: Singapore (closest to India)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Click "Advanced" and add Environment Variable:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://bhupeshindurkar6_db_user:YOUR_ACTUAL_PASSWORD@cluster0.e0cqc76.mongodb.net/tgpcet_it_dept?retryWrites=true&w=majority`
   - Replace `YOUR_ACTUAL_PASSWORD` with your MongoDB password

6. Click "Create Web Service"
7. Wait 2-3 minutes for deployment

### Step 4: Get API URL (1 min)
After deployment, you'll get URL like:
```
https://tgpcet-it-backend.onrender.com
```

Copy this URL!

### Step 5: Update Frontend (2 min)
1. Open `js/api-client.js`
2. Update line 6:
```javascript
const API_BASE_URL = 'https://YOUR-RENDER-URL.onrender.com/api';
```
Replace with your actual Render URL

### Step 6: Test API (1 min)
Open in browser:
```
https://your-render-url.onrender.com/
```

Should see:
```json
{
  "status": "OK",
  "message": "TGPCET IT Department API Server"
}
```

### Step 7: Push Frontend Changes (2 min)
```bash
git add js/api-client.js
git commit -m "Updated API URL"
git push origin main
```

Vercel will auto-deploy!

## Testing

1. Open admin dashboard
2. Add a gallery image
3. Refresh page - image should persist
4. Open on different browser - should see same image!
5. Open on mobile - should work!

## Important Notes

### Free Tier Limits:
✅ 750 hours/month (24/7 coverage)
✅ Auto-sleeps after 15 min inactivity
✅ Wakes up on first request (takes 30 sec)
✅ Perfect for your website!

### First Request Delay:
- If API sleeps, first request takes 30 seconds
- Subsequent requests are instant
- This is normal for free tier

### MongoDB Password:
- Get from MongoDB Atlas → Database Access
- Or use the one you saved during setup

## Troubleshooting

**Error: "Cannot connect to MongoDB"**
- Check MONGODB_URI in Render environment variables
- Verify password is correct
- Check MongoDB Network Access allows 0.0.0.0/0

**Error: "API not responding"**
- Wait 30 seconds (API waking up from sleep)
- Check Render logs for errors
- Verify deployment succeeded

**Images not showing:**
- Check browser console for errors
- Verify API_BASE_URL in api-client.js is correct
- Test API endpoint directly in browser

## Support

Contact: bhupeshindurkar6@gmail.com

---

**Developer:** Bhupesh Indurkar
**Portfolio:** https://bhupesh-indurkar-portfolio.vercel.app/
