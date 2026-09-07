# TGPCET IT Department - Backend API

## Deploy on Render.com (FREE)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Added backend API"
git push origin main
```

### Step 2: Create Render Account
1. Go to: https://render.com/
2. Sign up with GitHub

### Step 3: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `TGPCET-IT-Department`
3. Configure:
   - Name: `tgpcet-it-backend`
   - Region: Singapore (closest to India)
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: **Free**

### Step 4: Add Environment Variable
1. In Render dashboard, go to "Environment"
2. Add variable:
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://bhupeshindurkar6_db_user:YOUR_PASSWORD@cluster0.e0cqc76.mongodb.net/tgpcet_it_dept?retryWrites=true&w=majority`
   - Replace `YOUR_PASSWORD` with actual MongoDB password

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. You'll get URL like: `https://tgpcet-it-backend.onrender.com`

### Step 6: Test API
Open in browser:
```
https://tgpcet-it-backend.onrender.com/
```

Should see:
```json
{
  "status": "OK",
  "message": "TGPCET IT Department API Server",
  "developer": "Bhupesh Indurkar"
}
```

## API Endpoints

### Gallery
- GET `/api/gallery` - Get all images
- POST `/api/gallery` - Add new image
- DELETE `/api/gallery/:id` - Delete image

### News
- GET `/api/news` - Get all news
- POST `/api/news` - Add news
- DELETE `/api/news/:id` - Delete news

### Events
- GET `/api/events` - Get all events
- POST `/api/events` - Add event
- DELETE `/api/events/:id` - Delete event

### Placements
- GET `/api/placements` - Get all placements
- POST `/api/placements` - Add placement
- DELETE `/api/placements/:id` - Delete placement

### Messages
- GET `/api/messages` - Get all messages
- POST `/api/messages` - Add message
- DELETE `/api/messages/:id` - Delete message
- PATCH `/api/messages/:id/read` - Mark as read

## Free Tier Limits
✅ 750 hours/month (enough for 24/7)
✅ Auto-sleep after 15 min inactivity
✅ Wakes up on request (takes 30 sec)
✅ Perfect for your website!

---
Developer: Bhupesh Indurkar
Email: bhupeshindurkar6@gmail.com
