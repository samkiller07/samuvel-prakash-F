-- ==========================================================
-- SAMUVEL PRAKASH F - PORTFOLIO DATABASE SCHEMA & RLS (SUPABASE)
-- Visual Identity: Robotics x Industrial Automation x HUD Control
-- Security Standard: Strict public.is_admin() RLS Boundary
-- ==========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================================
-- 2. ADMINISTRATIVE AUTHORIZATION TABLES & FUNCTIONS
-- ==========================================================

-- Admin Users Table (Links to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Helper Function to Check Admin Status with Fixed search_path
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Policy for admin_users: Authenticated users can check their own admin status
DROP POLICY IF EXISTS "Users can verify admin status" ON public.admin_users;
CREATE POLICY "Users can verify admin status" ON public.admin_users
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- ==========================================================
-- 3. CONTENT & APPLICATION TABLES
-- ==========================================================

-- Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'COMPLETED' NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    thumbnail_url TEXT,
    github_url TEXT,
    demo_url TEXT,
    problem TEXT NOT NULL,
    engineering_approach TEXT NOT NULL,
    what_i_built TEXT NOT NULL,
    system_architecture TEXT NOT NULL,
    workflow TEXT NOT NULL,
    results_outcome TEXT NOT NULL,
    featured BOOLEAN DEFAULT false NOT NULL,
    sort_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Project Media Table (Schematics, Diagrams, Photos, Videos)
CREATE TABLE IF NOT EXISTS public.project_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'image', 'diagram', 'schematic', 'video'
    url TEXT NOT NULL,
    caption TEXT,
    sort_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    telemetry_code VARCHAR(50),
    sort_order INT DEFAULT 0 NOT NULL
);

-- Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    date_text VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    metrics VARCHAR(100),
    badge VARCHAR(50),
    sort_order INT DEFAULT 0 NOT NULL
);

-- Certifications Table
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255),
    issue_date VARCHAR(50),
    credential_id VARCHAR(100),
    credential_url TEXT,
    skills_covered TEXT[] DEFAULT '{}',
    sort_order INT DEFAULT 0 NOT NULL
);

-- Comments Table (Visitor comments + Admin replies)
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    is_admin BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Profile Settings Table
CREATE TABLE IF NOT EXISTS public.profile_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
    name VARCHAR(255) DEFAULT 'Samuvel Prakash F',
    title VARCHAR(255) DEFAULT 'Aspiring Robotics Engineer • Hardware × Software',
    tagline VARCHAR(255) DEFAULT 'Mechatronics • Robotics • Automation • Embedded & AI',
    image_url TEXT,
    avatar_url TEXT,
    operator_id VARCHAR(50) DEFAULT 'OP-SAM-01',
    status VARCHAR(50) DEFAULT 'ONLINE // READY',
    bio TEXT,
    github_url TEXT DEFAULT 'https://github.com/samkiller07',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/in/samuvel-prakash-f-3385902a5',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Contact Inquiries Table (Private Client & Recruiter Messages)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    service_type VARCHAR(100) DEFAULT 'General Inquiry',
    budget VARCHAR(100),
    deadline VARCHAR(100),
    admin_reply TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------
-- 4.1 PROJECTS & PROJECT MEDIA POLICIES
-- ----------------------------------------------------------
DROP POLICY IF EXISTS "Public users can view projects" ON public.projects;
CREATE POLICY "Public users can view projects" ON public.projects
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authorized admins can insert projects" ON public.projects;
CREATE POLICY "Authorized admins can insert projects" ON public.projects
    FOR INSERT TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authorized admins can update projects" ON public.projects;
CREATE POLICY "Authorized admins can update projects" ON public.projects
    FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authorized admins can delete projects" ON public.projects;
CREATE POLICY "Authorized admins can delete projects" ON public.projects
    FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Public users can view project media" ON public.project_media;
CREATE POLICY "Public users can view project media" ON public.project_media
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authorized admins can manage project media" ON public.project_media;
CREATE POLICY "Authorized admins can manage project media" ON public.project_media
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ----------------------------------------------------------
-- 4.2 SKILLS, ACHIEVEMENTS, CERTIFICATIONS POLICIES
-- ----------------------------------------------------------
DROP POLICY IF EXISTS "Public users can view skills" ON public.skills;
CREATE POLICY "Public users can view skills" ON public.skills
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authorized admins can manage skills" ON public.skills;
CREATE POLICY "Authorized admins can manage skills" ON public.skills
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public users can view achievements" ON public.achievements;
CREATE POLICY "Public users can view achievements" ON public.achievements
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authorized admins can manage achievements" ON public.achievements;
CREATE POLICY "Authorized admins can manage achievements" ON public.achievements
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public users can view certifications" ON public.certifications;
CREATE POLICY "Public users can view certifications" ON public.certifications
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authorized admins can manage certifications" ON public.certifications;
CREATE POLICY "Authorized admins can manage certifications" ON public.certifications
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ----------------------------------------------------------
-- 4.3 PROFILE SETTINGS POLICIES
-- ----------------------------------------------------------
DROP POLICY IF EXISTS "Public users can view profile settings" ON public.profile_settings;
DROP POLICY IF EXISTS "Allow upsert profile settings" ON public.profile_settings;
CREATE POLICY "Public users can view profile settings" ON public.profile_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authorized admins can update profile settings" ON public.profile_settings;
CREATE POLICY "Authorized admins can update profile settings" ON public.profile_settings
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ----------------------------------------------------------
-- 4.4 COMMENTS POLICIES
-- ----------------------------------------------------------
DROP POLICY IF EXISTS "Public users can view comments" ON public.comments;
DROP POLICY IF EXISTS "Anyone can view comments" ON public.comments;
CREATE POLICY "Public users can view comments" ON public.comments
    FOR SELECT USING (true);

-- Anonymous visitors can only insert top-level comments (not replies, and cannot claim is_admin = true)
DROP POLICY IF EXISTS "Public can insert top-level comments" ON public.comments;
DROP POLICY IF EXISTS "Anyone can create top-level comments" ON public.comments;
CREATE POLICY "Public can insert top-level comments" ON public.comments
    FOR INSERT WITH CHECK (parent_id IS NULL AND is_admin = false);

-- Only verified admins can insert replies, update, or delete comments
DROP POLICY IF EXISTS "Authorized admins can manage all comments and post replies" ON public.comments;
DROP POLICY IF EXISTS "Allow delete and reply management" ON public.comments;
CREATE POLICY "Authorized admins can manage all comments and post replies" ON public.comments
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ----------------------------------------------------------
-- 4.5 CONTACT MESSAGES (INQUIRIES) POLICIES - STRICTLY PRIVATE
-- ----------------------------------------------------------
-- Public visitors can submit contact messages, but CANNOT read existing messages
DROP POLICY IF EXISTS "Public users can submit contact messages" ON public.contact_messages;
CREATE POLICY "Public users can submit contact messages" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

-- Only verified admins can view, update, or delete contact messages
DROP POLICY IF EXISTS "Authorized admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Authorized admins can view contact messages" ON public.contact_messages
    FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Authorized admins can update contact messages" ON public.contact_messages;
CREATE POLICY "Authorized admins can update contact messages" ON public.contact_messages
    FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authorized admins can delete contact messages" ON public.contact_messages;
CREATE POLICY "Authorized admins can delete contact messages" ON public.contact_messages
    FOR DELETE TO authenticated USING (public.is_admin());

-- ==========================================================
-- 5. SUPABASE STORAGE BUCKETS & SECURE POLICIES
-- ==========================================================

-- Initialize buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('profile-media', 'profile-media', true),
    ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS: Public READ
DROP POLICY IF EXISTS "Public users can view media buckets" ON storage.objects;
DROP POLICY IF EXISTS "Public Profile Media Access" ON storage.objects;
CREATE POLICY "Public users can view media buckets" ON storage.objects
    FOR SELECT USING (bucket_id IN ('profile-media', 'portfolio-media'));

-- Storage RLS: Admin WRITE (Strictly public.is_admin())
DROP POLICY IF EXISTS "Public Upload Profile Media" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Profile Media" ON storage.objects;
DROP POLICY IF EXISTS "Authorized admins can upload to media buckets" ON storage.objects;
CREATE POLICY "Authorized admins can upload to media buckets" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('profile-media', 'portfolio-media') AND public.is_admin());

DROP POLICY IF EXISTS "Authorized admins can update media buckets" ON storage.objects;
CREATE POLICY "Authorized admins can update media buckets" ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id IN ('profile-media', 'portfolio-media') AND public.is_admin()) WITH CHECK (bucket_id IN ('profile-media', 'portfolio-media') AND public.is_admin());

DROP POLICY IF EXISTS "Authorized admins can delete from media buckets" ON storage.objects;
CREATE POLICY "Authorized admins can delete from media buckets" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id IN ('profile-media', 'portfolio-media') AND public.is_admin());

-- ==========================================================
-- 6. DEFAULT PROFILE SEED RECORD
-- ==========================================================
INSERT INTO public.profile_settings (id, name, title, tagline, operator_id, status, bio, github_url, linkedin_url)
VALUES (
    'default',
    'Samuvel Prakash F',
    'Aspiring Robotics Engineer • Hardware × Software',
    'Mechatronics • Robotics • Automation • Embedded & AI',
    'OP-SAM-01',
    'ONLINE // READY',
    'Building practical mechatronics systems by combining embedded systems, sensors, automation logic, IoT, and computer vision for real-world engineering applications.',
    'https://github.com/samkiller07',
    'https://linkedin.com/in/samuvel-prakash-f-3385902a5'
)
ON CONFLICT (id) DO NOTHING;
