# TGPCET IT Department - Backend API (Supabase PostgreSQL Powered)

This backend runs entirely on **Supabase (PostgreSQL, Auth & Storage)** and Google Gemini AI. **MongoDB is completely removed.**

## Supabase Connection Details
- **Project URL:** `https://qqzjnylpkftyzishsssa.supabase.co`
- **Publishable / Anon Key:** `sb_publishable_cI316TXVj4o1x1wrbg7EtQ_lZseYTjG`
- **Database Engine:** PostgreSQL (Cloud-hosted on Supabase)

---

## Deploy on Render.com (FREE)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Migrated backend 100% to Supabase PostgreSQL"
git push origin main
```

### Step 2: Configure Render Environment Variables
Add the following in Render dashboard:
- `SUPABASE_URL`: `https://qqzjnylpkftyzishsssa.supabase.co`
- `SUPABASE_ANON_KEY`: `sb_publishable_cI316TXVj4o1x1wrbg7EtQ_lZseYTjG`
- `GEMINI_API_KEY`: *(Your Google Gemini API Key)*

---

## API Endpoints

### 1. Opportunities & Jobs
- `GET /api/opportunities` - Get active opportunities
- `GET /api/opportunities/:id` - Get opportunity details
- `POST /api/opportunities` - Create new opportunity
- `POST /api/applications` - Submit application

### 2. Gallery
- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery` - Add image
- `PUT /api/gallery/:id` - Update image
- `DELETE /api/gallery/:id` - Delete image

### 3. News & Announcements
- `GET /api/news` - Get news
- `POST /api/news` - Add news
- `DELETE /api/news/:id` - Delete news

### 4. Events
- `GET /api/events` - Get events
- `POST /api/events` - Add event
- `DELETE /api/events/:id` - Delete event

### 5. Placements & Faculty
- `GET /api/placements` / `POST /api/placements` / `DELETE /api/placements/:id`
- `GET /api/faculty` / `POST /api/faculty` / `PUT /api/faculty/:id` / `DELETE /api/faculty/:id`

### 6. Messages & Contact
- `GET /api/messages` / `POST /api/messages` / `PATCH /api/messages/:id/read` / `DELETE /api/messages/:id`

### 7. AI Chatbot
- `POST /api/chat` - Gemini AI chat integration

---

Developer: Bhupesh Indurkar
