-- ==============================================================================
-- SUPABASE POSTGRESQL COMPLETE DATABASE SCHEMA (100% SUPABASE - NO MONGODB)
-- Project URL: https://qqzjnylpkftyzishsssa.supabase.co
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('student', 'faculty', 'alumni', 'admin', 'recruiter');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE opportunity_type AS ENUM ('internship', 'full_time', 'part_time', 'project', 'hackathon', 'workshop');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE opportunity_status AS ENUM ('draft', 'active', 'closed', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE application_status AS ENUM ('applied', 'under_review', 'shortlisted', 'rejected', 'accepted', 'withdrawn');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Supabase Auth Users Extension)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL DEFAULT '',
    role user_role NOT NULL DEFAULT 'student',
    avatar_url TEXT,
    phone TEXT,
    bio TEXT,
    department TEXT DEFAULT 'Information Technology',
    year_of_study INTEGER CHECK (year_of_study BETWEEN 1 AND 4),
    roll_number TEXT,
    skills TEXT[] DEFAULT '{}',
    resume_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    is_profile_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. OPPORTUNITIES TABLE
CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    company_logo_url TEXT,
    location TEXT NOT NULL,
    type opportunity_type NOT NULL DEFAULT 'internship',
    workplace_type TEXT DEFAULT 'Remote' CHECK (workplace_type IN ('Remote', 'On-site', 'Hybrid')),
    description TEXT NOT NULL,
    requirements TEXT[] DEFAULT '{}',
    skills_required TEXT[] DEFAULT '{}',
    stipend_or_salary TEXT,
    openings_count INTEGER DEFAULT 1,
    experience_level TEXT DEFAULT 'Fresher',
    eligibility_criteria TEXT,
    apply_url TEXT,
    deadline TIMESTAMPTZ,
    status opportunity_status NOT NULL DEFAULT 'active',
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. SAVED OPPORTUNITIES TABLE (BOOKMARKS)
CREATE TABLE IF NOT EXISTS public.saved_opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, opportunity_id)
);

-- 6. APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    resume_url TEXT,
    cover_letter TEXT,
    portfolio_link TEXT,
    custom_answers JSONB DEFAULT '{}'::jsonb,
    status application_status NOT NULL DEFAULT 'applied',
    feedback_notes TEXT,
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(opportunity_id, user_id)
);

-- 7. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    image_url TEXT,
    date TEXT,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. NEWS & NOTICES TABLE
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    date TEXT,
    category TEXT,
    description TEXT,
    image TEXT,
    image_url TEXT,
    is_important BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    date TEXT,
    type TEXT,
    description TEXT,
    status TEXT,
    resourcePerson TEXT,
    resource_person TEXT,
    designation TEXT,
    image TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. PLACEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.placements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    studentName TEXT,
    student_name TEXT,
    rollNumber TEXT,
    roll_number TEXT,
    company TEXT NOT NULL,
    year TEXT NOT NULL,
    package_lpa NUMERIC(4,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. FACULTY TABLE
CREATE TABLE IF NOT EXISTS public.faculty (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    qualification TEXT,
    specialization TEXT,
    email TEXT,
    phone TEXT,
    experience TEXT,
    image TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. MESSAGES / CONTACT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. ANNOUNCEMENTS TABLE (Banner & Popups)
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    message TEXT,
    image TEXT,
    link TEXT,
    type TEXT DEFAULT 'info',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 14. INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON public.opportunities(status);
CREATE INDEX IF NOT EXISTS idx_opportunities_created_at ON public.opportunities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_opps_user ON public.saved_opportunities(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_user ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_opp ON public.applications(opportunity_id);

-- ==============================================================================
-- 15. AUTO-UPDATE TRIGGER FUNCTION
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_opportunities_updated_at ON public.opportunities;
CREATE TRIGGER set_opportunities_updated_at BEFORE UPDATE ON public.opportunities FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_applications_updated_at ON public.applications;
CREATE TRIGGER set_applications_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 16. AUTH TRIGGER: AUTO-CREATE PROFILE ON NEW USER SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    default_role user_role := 'student';
    raw_role TEXT;
BEGIN
    raw_role := NEW.raw_user_meta_data->>'role';
    IF raw_role IN ('student', 'faculty', 'alumni', 'admin', 'recruiter') THEN
        default_role := raw_role::user_role;
    END IF;

    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        role,
        avatar_url,
        phone,
        department
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.email, ''),
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(COALESCE(NEW.email, ''), '@', 1)),
        default_role,
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        COALESCE(NEW.raw_user_meta_data->>'department', 'Information Technology')
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = CASE WHEN profiles.full_name = '' THEN EXCLUDED.full_name ELSE profiles.full_name END,
        avatar_url = CASE WHEN profiles.avatar_url IS NULL OR profiles.avatar_url = '' THEN EXCLUDED.avatar_url ELSE profiles.avatar_url END,
        updated_at = timezone('utc'::text, now());

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT OR UPDATE ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 17. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Profiles Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id OR public.is_admin()) WITH CHECK (auth.uid() = id OR public.is_admin());

-- Opportunities Policies
DROP POLICY IF EXISTS "Active opportunities are viewable by everyone" ON public.opportunities;
CREATE POLICY "Active opportunities are viewable by everyone" ON public.opportunities FOR SELECT USING (status = 'active' OR auth.uid() = created_by OR public.is_admin());
DROP POLICY IF EXISTS "Authorized users can create opportunities" ON public.opportunities;
CREATE POLICY "Authorized users can create opportunities" ON public.opportunities FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Creators and admins can update opportunities" ON public.opportunities;
CREATE POLICY "Creators and admins can update opportunities" ON public.opportunities FOR UPDATE USING (auth.uid() = created_by OR public.is_admin() OR auth.role() = 'anon');
DROP POLICY IF EXISTS "Creators and admins can delete opportunities" ON public.opportunities;
CREATE POLICY "Creators and admins can delete opportunities" ON public.opportunities FOR DELETE USING (auth.uid() = created_by OR public.is_admin() OR auth.role() = 'anon');

-- Saved Opportunities Policies
DROP POLICY IF EXISTS "Users can view own saved opportunities" ON public.saved_opportunities;
CREATE POLICY "Users can view own saved opportunities" ON public.saved_opportunities FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can save opportunities" ON public.saved_opportunities;
CREATE POLICY "Users can save opportunities" ON public.saved_opportunities FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can unsave opportunities" ON public.saved_opportunities;
CREATE POLICY "Users can unsave opportunities" ON public.saved_opportunities FOR DELETE USING (auth.uid() = user_id);

-- Applications Policies
DROP POLICY IF EXISTS "Applications view policy" ON public.applications;
CREATE POLICY "Applications view policy" ON public.applications FOR SELECT USING (auth.uid() = user_id OR public.is_admin() OR auth.role() = 'anon');
DROP POLICY IF EXISTS "Users can apply to opportunities" ON public.applications;
CREATE POLICY "Users can apply to opportunities" ON public.applications FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Update application policy" ON public.applications;
CREATE POLICY "Update application policy" ON public.applications FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Users can delete own application" ON public.applications;
CREATE POLICY "Users can delete own application" ON public.applications FOR DELETE USING (true);

-- Department Tables (Public Read / Admin & Backend Full Access)
DROP POLICY IF EXISTS "Public read gallery" ON public.gallery;
CREATE POLICY "Public read gallery" ON public.gallery FOR SELECT USING (true);
DROP POLICY IF EXISTS "Manage gallery" ON public.gallery;
CREATE POLICY "Manage gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read news" ON public.news;
CREATE POLICY "Public read news" ON public.news FOR SELECT USING (true);
DROP POLICY IF EXISTS "Manage news" ON public.news;
CREATE POLICY "Manage news" ON public.news FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read events" ON public.events;
CREATE POLICY "Public read events" ON public.events FOR SELECT USING (true);
DROP POLICY IF EXISTS "Manage events" ON public.events;
CREATE POLICY "Manage events" ON public.events FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read placements" ON public.placements;
CREATE POLICY "Public read placements" ON public.placements FOR SELECT USING (true);
DROP POLICY IF EXISTS "Manage placements" ON public.placements;
CREATE POLICY "Manage placements" ON public.placements FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read faculty" ON public.faculty;
CREATE POLICY "Public read faculty" ON public.faculty FOR SELECT USING (true);
DROP POLICY IF EXISTS "Manage faculty" ON public.faculty FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Submit messages" ON public.messages;
CREATE POLICY "Submit messages" ON public.messages FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Manage messages" ON public.messages;
CREATE POLICY "Manage messages" ON public.messages FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read announcements" ON public.announcements;
CREATE POLICY "Public read announcements" ON public.announcements FOR SELECT USING (true);
DROP POLICY IF EXISTS "Manage announcements" ON public.announcements;
CREATE POLICY "Manage announcements" ON public.announcements FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 18. STORAGE BUCKETS & POLICIES
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('resumes', 'resumes', false),
    ('avatars', 'avatars', true),
    ('attachments', 'attachments', true),
    ('gallery', 'gallery', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

DROP POLICY IF EXISTS "Public Access for avatars" ON storage.objects;
CREATE POLICY "Public Access for avatars" ON storage.objects FOR SELECT USING (bucket_id IN ('avatars', 'attachments', 'gallery'));

DROP POLICY IF EXISTS "Upload avatar/gallery files" ON storage.objects;
CREATE POLICY "Upload avatar/gallery files" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('avatars', 'attachments', 'gallery'));

DROP POLICY IF EXISTS "Users upload own resumes" ON storage.objects;
CREATE POLICY "Users upload own resumes" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resumes');

DROP POLICY IF EXISTS "Users read resumes" ON storage.objects;
CREATE POLICY "Users read resumes" ON storage.objects FOR SELECT USING (bucket_id = 'resumes');
