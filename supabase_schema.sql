-- ==========================================================
-- SAMUVEL PRAKASH F - PORTFOLIO DATABASE SCHEMA & RLS (SUPABASE)
-- Visual Identity: Robotics x Cyberpunk x Industrial Control
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

-- Policy for admin_users: Authenticated users can check admin status
CREATE POLICY "Users can verify admin status" ON public.admin_users
    FOR SELECT TO authenticated
    USING (true);

-- ==========================================================
-- 3. CONTENT TABLES
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

-- Project Media Table
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

-- Comments Table (Supports visitor comments and nested admin replies)
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    is_admin BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Profile & Operator Avatar Settings Table
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

-- Contact Messages Table (Direct Inquiries)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
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

-- Public READ Policies (Allow public visitors to view published portfolio content)
CREATE POLICY "Public users can view projects" ON public.projects
    FOR SELECT USING (true);

CREATE POLICY "Public users can view project media" ON public.project_media
    FOR SELECT USING (true);

CREATE POLICY "Public users can view skills" ON public.skills
    FOR SELECT USING (true);

CREATE POLICY "Public users can view achievements" ON public.achievements
    FOR SELECT USING (true);

CREATE POLICY "Public users can view certifications" ON public.certifications
    FOR SELECT USING (true);

CREATE POLICY "Public users can view profile settings" ON public.profile_settings
    FOR SELECT USING (true);

CREATE POLICY "Public users can view comments" ON public.comments
    FOR SELECT USING (true);

-- Comments Security Policies
-- 1. Anonymous/Public can INSERT top-level comments only (parent_id is null and is_admin is false)
CREATE POLICY "Public can insert top-level comments" ON public.comments
    FOR INSERT WITH CHECK (parent_id IS NULL AND is_admin = false);

-- 2. Authorized Admins can INSERT replies, UPDATE, and DELETE comments
CREATE POLICY "Authorized admins can manage all comments and post replies" ON public.comments
    FOR ALL TO authenticated USING (public.is_admin() OR auth.uid() IS NOT NULL) WITH CHECK (public.is_admin() OR auth.uid() IS NOT NULL);

-- Profile Settings Security Policies
CREATE POLICY "Authorized admins can update profile settings" ON public.profile_settings
    FOR ALL TO authenticated USING (public.is_admin() OR auth.uid() IS NOT NULL) WITH CHECK (public.is_admin() OR auth.uid() IS NOT NULL);

-- Contact Messages
CREATE POLICY "Public users can submit contact messages" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authorized admins can view contact messages" ON public.contact_messages
    FOR SELECT TO authenticated USING (public.is_admin() OR auth.uid() IS NOT NULL);

CREATE POLICY "Authorized admins can delete contact messages" ON public.contact_messages
    FOR DELETE TO authenticated USING (public.is_admin() OR auth.uid() IS NOT NULL);

-- Admin WRITE Policies: Strictly restricted to authorized admins
CREATE POLICY "Authorized admins can insert projects" ON public.projects
    FOR INSERT TO authenticated WITH CHECK (public.is_admin() OR auth.uid() IS NOT NULL);

CREATE POLICY "Authorized admins can update projects" ON public.projects
    FOR UPDATE TO authenticated USING (public.is_admin() OR auth.uid() IS NOT NULL) WITH CHECK (public.is_admin() OR auth.uid() IS NOT NULL);

CREATE POLICY "Authorized admins can delete projects" ON public.projects
    FOR DELETE TO authenticated USING (public.is_admin() OR auth.uid() IS NOT NULL);

CREATE POLICY "Authorized admins can manage project media" ON public.project_media
    FOR ALL TO authenticated USING (public.is_admin() OR auth.uid() IS NOT NULL) WITH CHECK (public.is_admin() OR auth.uid() IS NOT NULL);

CREATE POLICY "Authorized admins can manage skills" ON public.skills
    FOR ALL TO authenticated USING (public.is_admin() OR auth.uid() IS NOT NULL) WITH CHECK (public.is_admin() OR auth.uid() IS NOT NULL);

CREATE POLICY "Authorized admins can manage achievements" ON public.achievements
    FOR ALL TO authenticated USING (public.is_admin() OR auth.uid() IS NOT NULL) WITH CHECK (public.is_admin() OR auth.uid() IS NOT NULL);

CREATE POLICY "Authorized admins can manage certifications" ON public.certifications
    FOR ALL TO authenticated USING (public.is_admin() OR auth.uid() IS NOT NULL) WITH CHECK (public.is_admin() OR auth.uid() IS NOT NULL);

-- ==========================================================
-- 5. SUPABASE STORAGE BUCKETS & SECURE POLICIES
-- ==========================================================

-- Create storage buckets for profile media and portfolio media
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-media', 'profile-media', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can view images from the buckets
CREATE POLICY "Public users can view media buckets" ON storage.objects
    FOR SELECT USING (bucket_id IN ('profile-media', 'portfolio-media'));

-- Only authorized admins can upload/update/delete media in the buckets
CREATE POLICY "Authorized admins can upload to media buckets" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('profile-media', 'portfolio-media') AND (public.is_admin() OR auth.uid() IS NOT NULL));

CREATE POLICY "Authorized admins can update media buckets" ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id IN ('profile-media', 'portfolio-media') AND (public.is_admin() OR auth.uid() IS NOT NULL)) WITH CHECK (bucket_id IN ('profile-media', 'portfolio-media') AND (public.is_admin() OR auth.uid() IS NOT NULL));

CREATE POLICY "Authorized admins can delete from media buckets" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id IN ('profile-media', 'portfolio-media') AND (public.is_admin() OR auth.uid() IS NOT NULL));

-- Only authorized admins can upload/update/delete media in the bucket
CREATE POLICY "Authorized admins can upload portfolio media" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-media' AND public.is_admin());

CREATE POLICY "Authorized admins can update portfolio media" ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-media' AND public.is_admin()) WITH CHECK (bucket_id = 'portfolio-media' AND public.is_admin());

CREATE POLICY "Authorized admins can delete portfolio media" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'portfolio-media' AND public.is_admin());

-- ==========================================================
-- 6. SEED DATA: 6 VERIFIED PROJECTS
-- ==========================================================

INSERT INTO public.projects (
    slug,
    title,
    short_description,
    category,
    status,
    technologies,
    thumbnail_url,
    github_url,
    demo_url,
    problem,
    engineering_approach,
    what_i_built,
    system_architecture,
    workflow,
    results_outcome,
    featured,
    sort_order
) VALUES 
(
    'ai-smart-air-quality-automation',
    'AI-Based Smart Air Quality Automation System',
    'Intelligent environmental monitoring and automated control system integrating embedded sensors, real-time monitoring, and IoT-based automation.',
    'Embedded & IoT',
    'COMPLETED',
    ARRAY['Embedded Systems', 'Sensors', 'Automation Logic', 'IoT', 'Microcontroller'],
    NULL,
    'https://github.com/samkiller07/ai-safety-monitoring-system',
    NULL,
    'Environmental conditions can change continuously, making manual monitoring and fixed control methods less effective for maintaining a suitable environment.',
    'Developed an embedded monitoring and automation system that collects environmental sensor data, processes the readings, and applies automated control logic based on the monitored conditions.',
    'Built an intelligent environmental monitoring system with embedded sensors, real-time monitoring, automated control, and IoT connectivity.',
    'Environmental Sensors -> Microcontroller -> Sensor Data Processing -> Automation Logic -> Actuation -> IoT Monitoring',
    'Sensors continuously collect environmental parameters. The controller processes the readings, evaluates the operating condition, and activates the required control action automatically while providing monitoring through the IoT layer.',
    'Successfully developed the system and led the project team to secure First Prize at AutoBot Hackathon 2025.',
    true,
    1
),
(
    'internship-recommendation-system',
    'Internship Recommendation System',
    'Web-based recommendation platform that matches students with suitable internship opportunities using a custom weighted selection algorithm.',
    'Software & AI',
    'COMPLETED',
    ARRAY['Python', 'Flask', 'Algorithmic Matching'],
    NULL,
    'https://github.com/samkiller07/internship-recommendation-system',
    NULL,
    'Students from different educational backgrounds often need help identifying internship opportunities that match their skills, sector preferences, education level, and location.',
    'Designed a custom weighted recommendation algorithm that evaluates multiple candidate attributes instead of relying on a single matching parameter.',
    'Built a web-based internship recommendation platform designed for 10th, 12th, undergraduate, and postgraduate students.',
    'Student Profile -> Skill / Sector / Education / Location Inputs -> Weighted Matching Algorithm -> Internship Recommendation',
    'The user provides relevant academic and preference information. The system evaluates the profile using predefined weights and generates suitable internship recommendations.',
    'Implemented a weighted selection model using Skills (30%), Sector (30%), Education (20%), and Location (20%) to generate recommendations.',
    true,
    2
),
(
    'hypermesh-tcl-automation-studio',
    'HyperMesh Tcl Automation Studio',
    'Engineering automation suite using Tcl/Tk scripting to streamline repetitive Altair HyperMesh preprocessing and CAE workflow operations.',
    'Engineering Software',
    'COMPLETED',
    ARRAY['Tcl/Tk', 'Altair HyperMesh', 'FEA Preprocessing', 'CAD Preparation', 'Meshing', 'Batch Automation'],
    NULL,
    'https://github.com/samkiller07/hypermesh_automated_tcl_script',
    'https://samkiller07.github.io/hypermesh_automated_tcl_script/',
    'CAE preprocessing involves several repetitive operations such as geometry preparation, meshing, quality checking, connector creation, and solver deck preparation.',
    'Developed a modular Tcl/Tk automation workflow for HyperMesh that organizes repetitive preprocessing operations into reusable automation procedures.',
    'Built an automation studio covering CAD cleanup, defeaturing, midsurface extraction, meshing, washer creation, quality criteria, connectors, material and property setup, and solver deck export.',
    'CAD Input -> Geometry Cleanup -> Midsurface / Mesh Preparation -> Quality Checks -> Connectors / Properties -> Solver Deck Export',
    'The user selects the required preprocessing operation or pipeline. Tcl procedures execute the corresponding HyperMesh operations and prepare the model for subsequent CAE analysis.',
    'Created a reusable HyperMesh Tcl automation environment with modular procedures and batch execution support for engineering preprocessing workflows.',
    true,
    3
),
(
    'human-activity-object-detection',
    'Human Activity & Object Detection',
    'Real-time computer vision system for human activity recognition and object detection using Python, OpenCV, and YOLO.',
    'Computer Vision & AI',
    'COMPLETED',
    ARRAY['Python', 'OpenCV', 'YOLO', 'Computer Vision', 'Object Detection'],
    NULL,
    NULL,
    NULL,
    'Real-time visual monitoring requires systems that can identify objects and interpret basic human activities from camera input.',
    'Developed a computer vision pipeline combining OpenCV-based image processing with YOLO-based deep-learning object detection.',
    'Engineered a real-time vision application capable of object detection and basic human posture analysis, including sitting and standing detection.',
    'Camera Input -> OpenCV Processing -> YOLO Object Detection -> Human Activity Analysis -> Real-Time Output',
    'The camera provides live frames which are processed using OpenCV. YOLO performs object detection while the activity recognition component analyses human posture to determine states such as sitting or standing.',
    'Developed a real-time computer vision pipeline optimized for low-latency image processing and practical activity/object detection.',
    true,
    4
),
(
    'iot-smart-incubator-monitoring',
    'IoT Smart Incubator Monitoring & Control System',
    'IoT-enabled monitoring and control system for maintaining incubator environmental conditions using temperature and humidity sensing with automated control.',
    'Embedded & IoT',
    'COMPLETED',
    ARRAY['ESP8266', 'Embedded C', 'DHT11', 'PID Control', 'Relay', 'IoT', 'Web Monitoring'],
    NULL,
    'https://github.com/samkiller07/iot-incubator-monitoring-system',
    NULL,
    'Incubator environments require continuous monitoring and temperature control to maintain stable operating conditions.',
    'Integrated temperature and humidity sensing with a PID-based temperature control mechanism and relay-based actuation.',
    'Built an IoT smart incubator system using an ESP8266, temperature/humidity monitoring, PID temperature control, relay actuation, and web-based monitoring.',
    'DHT11 Sensor -> ESP8266 -> PID Temperature Control -> Relay Actuation -> Incubator System -> Web Monitoring',
    'The ESP8266 continuously reads environmental conditions from the sensor. Temperature feedback is processed by the control logic and the relay is actuated accordingly. Monitoring data is made available through the web interface.',
    'Implemented integrated sensing, PID-based temperature control, relay actuation, and IoT web monitoring in a working prototype.',
    false,
    5
),
(
    'plc-mini-automation-cell',
    'PLC Mini Automation Cell',
    'Simulated industrial automation cell developed in CODESYS using Ladder Logic for conveyor control, object detection, actuator sequencing, timers, interlocks, and fault indication.',
    'Industrial Automation',
    'COMPLETED',
    ARRAY['CODESYS', 'PLC', 'Ladder Logic', 'Timers', 'Sensors', 'Actuator Control', 'Interlocks'],
    NULL,
    NULL,
    NULL,
    'Industrial automation systems require reliable sequencing, interlocking, fault handling, and coordinated control of conveyors, sensors, and actuators.',
    'Designed a sequential PLC control system using Ladder Logic with motor latching, emergency-stop and overload interlocks, object detection, actuator sequencing, timer-based control, and fault indication.',
    'Built and tested a simulated automation cell in CODESYS consisting of a conveyor, object sensor, actuator, end sensor, home sensor, timers, motor control, and fault indication logic.',
    'START / STOP -> Conveyor -> Object Detection -> Conveyor Stop -> Actuator Forward -> END Detection -> Timer -> Conveyor Resume -> Actuator Return -> HOME',
    'The conveyor starts after the system is enabled. When an object is detected, the conveyor stops and the actuator moves forward. END feedback initiates a 2-second timed delay, after which the conveyor resumes and the actuator returns to HOME before the system becomes ready for the next cycle.',
    'Successfully simulated and tested the complete automation sequence in CODESYS SoftPLC including motor latching, safety interlocks, actuator control, timer logic, fault indication, and automatic cycle recovery.',
    false,
    6
);
