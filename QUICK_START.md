# Quick Start: Firebase Integration

## What I've Created:

1. **`js/firebase-config.js`** - Firebase configuration and helper functions
2. **`FIREBASE_SETUP_GUIDE.md`** - Complete step-by-step setup guide
3. **`js/migrate-to-firebase.js`** - Script to migrate existing localStorage data

## What You Need to Do:

### Step 1: Create Firebase Account (5 minutes)
1. Go to https://console.firebase.google.com/
2. Sign in with Google account
3. Create new project: "tgpcet-it-department"

### Step 2: Enable Services (2 minutes)
1. Enable Firestore Database (test mode)
2. Enable Storage (test mode)

### Step 3: Get Configuration (2 minutes)
1. Go to Project Settings
2. Add Web App
3. Copy firebaseConfig object
4. Paste in `js/firebase-config.js` (replace placeholder)

### Step 4: Add to HTML Files (5 minutes)
Add these lines before `</body>` in all HTML files:

```html
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js"></script>
<script src="js/firebase-config.js"></script>
```

### Step 5: Test
1. Open admin-dashboard.html
2. Check console - should see "✅ Firebase initialized"
3. Add a gallery image
4. Open on different browser - should see same image!

## Benefits:

✅ Data visible on ALL devices
✅ No more localStorage issues
✅ Images hosted on cloud
✅ Free (up to 1GB storage)
✅ Real-time updates

## Need Help?

Read `FIREBASE_SETUP_GUIDE.md` for detailed instructions.

Contact: bhupeshindurkar6@gmail.com
