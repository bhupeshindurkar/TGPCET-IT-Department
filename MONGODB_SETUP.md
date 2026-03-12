# MongoDB Atlas Setup - Quick Guide

## Step 1: Create Account (3 min)
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google
3. No credit card needed!

## Step 2: Create Free Cluster (2 min)
1. Click "Build a Database"
2. Select FREE tier
3. Region: Mumbai
4. Click "Create"

## Step 3: Database User (2 min)
1. "Database Access" → "Add User"
2. Username: `tgpcet_admin`
3. Auto-generate password (SAVE IT!)
4. Click "Add User"

## Step 4: Network Access (1 min)
1. "Network Access" → "Add IP"
2. "Allow Access from Anywhere"
3. Confirm

## Step 5: Create Realm App (3 min)
1. "App Services" → "Create New App"
2. Name: `TGPCET-IT-Department`
3. Link to Cluster0
4. Create

## Step 6: Enable Anonymous Auth
1. "Authentication" → "Anonymous"
2. Enable it
3. Deploy

## Step 7: Get App ID
1. "App Settings"
2. Copy App ID
3. Paste in `js/mongodb-config.js`

## Step 8: Add to HTML
```html
<script src="https://unpkg.com/realm-web@2.0.0/dist/bundle.iife.js"></script>
<script src="js/mongodb-config.js"></script>
```

Done! ✅

Contact: bhupeshindurkar6@gmail.com
