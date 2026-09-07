# Supabase Integration Documentation - TGPCET IT Department

## 1. Connection Details
- **Project URL:** `https://qqzjnylpkftyzishsssa.supabase.co`
- **Publishable / Anon Key:** `sb_publishable_cI316TXVj4o1x1wrbg7EtQ_lZseYTjG`
- **Database:** PostgreSQL (Cloud-hosted on Supabase)
- **Authentication:** Supabase Auth (Email/Password, OAuth, Magic Link)
- **Storage:** Buckets (`resumes`, `avatars`, `attachments`, `gallery`)

---

## 2. Database Schema & Tables Created

All SQL statements are saved in:
- [`supabase/schema.sql`](file:///c:/Users/bhupe/Downloads/TGPCET-IT-Department-main/TGPCET-IT-Department-main/supabase/schema.sql)
- [`supabase/migrations/20260307000000_schema_and_rls.sql`](file:///c:/Users/bhupe/Downloads/TGPCET-IT-Department-main/TGPCET-IT-Department-main/supabase/migrations/20260307000000_schema_and_rls.sql)

### Tables Overview:
1. **`profiles`**
   - **Fields**: `id` (FK `auth.users`), `email`, `full_name`, `role` (`student`, `faculty`, `alumni`, `admin`, `recruiter`), `avatar_url`, `phone`, `bio`, `department`, `year_of_study`, `roll_number`, `skills`, `resume_url`, `github_url`, `linkedin_url`, `portfolio_url`, `created_at`, `updated_at`.
   - **Auto Profile Creation**: Trigger `on_auth_user_created` fires whenever a new user signs up in `auth.users` and creates their profile row.

2. **`opportunities`**
   - **Fields**: `id`, `title`, `company_name`, `company_logo_url`, `location`, `type` (`internship`, `full_time`, `part_time`, `project`, `hackathon`, `workshop`), `workplace_type` (`Remote`, `On-site`, `Hybrid`), `description`, `requirements`, `skills_required`, `stipend_or_salary`, `openings_count`, `experience_level`, `eligibility_criteria`, `apply_url`, `deadline`, `status` (`draft`, `active`, `closed`, `archived`), `created_by` (FK `profiles.id`), `created_at`, `updated_at`.

3. **`saved_opportunities`** (Bookmarks)
   - **Fields**: `id`, `user_id` (FK `profiles.id`), `opportunity_id` (FK `opportunities.id`), `notes`, `created_at`.
   - **Constraint**: `UNIQUE(user_id, opportunity_id)`

4. **`applications`**
   - **Fields**: `id`, `opportunity_id` (FK `opportunities.id`), `user_id` (FK `profiles.id`), `resume_url`, `cover_letter`, `portfolio_link`, `custom_answers` (JSONB), `status` (`applied`, `under_review`, `shortlisted`, `rejected`, `accepted`, `withdrawn`), `feedback_notes`, `reviewed_at`, `reviewed_by` (FK `profiles.id`), `created_at`, `updated_at`.
   - **Constraint**: `UNIQUE(opportunity_id, user_id)`

5. **Departmental Tables** (Integrated with Supabase):
   - `gallery` (Department photo gallery)
   - `news_announcements` (Department announcements & notifications)
   - `events` (Workshops, Hackathons, Guest lectures)
   - `placements` (Placement statistics & records)
   - `faculty` (Faculty directory & profiles)
   - `contact_inquiries` (Public contact form submissions)

---

## 3. Row Level Security (RLS) Policies

| Table | Operation | Policy Description |
|---|---|---|
| `profiles` | SELECT | Public profiles readable by everyone |
| `profiles` | INSERT / UPDATE | Users can only insert & update their own profile; Admins can update any |
| `opportunities` | SELECT | Active opportunities readable by all; Admins/Creators can see all |
| `opportunities` | INSERT / UPDATE / DELETE | Authenticated staff/admins/recruiters can create; Creators & Admins can manage |
| `saved_opportunities` | SELECT / INSERT / DELETE | Only owner (`auth.uid() = user_id`) |
| `applications` | SELECT | Applicant can read own application; Opportunity creator and Admins can read applications for their postings |
| `applications` | INSERT | Authenticated users can apply |
| `applications` | UPDATE | Applicants can update info; Opportunity creators/Admins can update status & feedback |
| `storage.objects` | SELECT / INSERT | Public avatar/gallery read; Resumes restricted to applicant and opportunity creator/admin |

---

## 4. Frontend Usage Examples

### Include Supabase in HTML:
```html
<!-- Supabase JS CDN -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Supabase Client Config & Service -->
<script src="js/supabase-config.js"></script>
<script src="js/supabase-service.js"></script>
```

### Sign Up / Login:
```javascript
// Register new student
await SupabaseService.auth.signUp('student@tgpcet.com', 'password123', {
    fullName: 'Rahul Sharma',
    role: 'student',
    department: 'Information Technology'
});

// Sign In
await SupabaseService.auth.signIn('student@tgpcet.com', 'password123');
```

### Fetch Opportunities:
```javascript
// Get all active internships/jobs
const opportunities = await SupabaseService.opportunities.getAll({
    type: 'internship',
    workplaceType: 'Remote'
});
console.log(opportunities);
```

### Apply to an Opportunity:
```javascript
// Apply
const application = await SupabaseService.applications.apply(opportunityId, {
    coverLetter: 'I am excited to apply for this frontend role...',
    portfolioLink: 'https://github.com/my-profile',
    resumeUrl: '...'
});
```

### Save / Bookmark Opportunity:
```javascript
await SupabaseService.savedOpportunities.save(opportunityId);
```

---

## 5. How to Run the SQL Migration in Supabase

1. Open your Supabase Project Dashboard: [https://supabase.com/dashboard/project/qqzjnylpkftyzishsssa](https://supabase.com/dashboard/project/qqzjnylpkftyzishsssa)
2. In the left navigation bar, click on **SQL Editor**.
3. Click **New query**.
4. Copy the entire contents of [`supabase/schema.sql`](file:///c:/Users/bhupe/Downloads/TGPCET-IT-Department-main/TGPCET-IT-Department-main/supabase/schema.sql) and paste it into the editor.
5. Click **Run** (or press `Ctrl+Enter`).
6. All tables, types, triggers, RLS policies, indexes, and storage buckets will be instantly set up!
