-- Supabase Schema for Baksos Yankes 2026

-- 1. Create proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_number TEXT UNIQUE NOT NULL,
  donor_name TEXT NOT NULL,
  institution TEXT,
  committee_name TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  donor_name TEXT NOT NULL,
  notes TEXT,
  receipt_url TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies

-- Drop existing policies if any to prevent errors when re-running
DROP POLICY IF EXISTS "Public can insert proposals" ON proposals;
DROP POLICY IF EXISTS "Admins can view proposals" ON proposals;
DROP POLICY IF EXISTS "Public can view proposals" ON proposals;

DROP POLICY IF EXISTS "Public can insert donations" ON donations;
DROP POLICY IF EXISTS "Admins can view donations" ON donations;
DROP POLICY IF EXISTS "Admins can update donations" ON donations;
DROP POLICY IF EXISTS "Public can view donations" ON donations;

DROP POLICY IF EXISTS "Public can view news" ON news;
DROP POLICY IF EXISTS "Admins can insert news" ON news;
DROP POLICY IF EXISTS "Admins can update news" ON news;

-- Public can insert proposals
CREATE POLICY "Public can insert proposals" ON proposals
  FOR INSERT WITH CHECK (true);

-- Public can view proposals (everyone is equal)
CREATE POLICY "Public can view proposals" ON proposals
  FOR SELECT USING (true);

-- Public can insert donations
CREATE POLICY "Public can insert donations" ON donations
  FOR INSERT WITH CHECK (true);

-- Public can view donations (everyone is equal)
CREATE POLICY "Public can view donations" ON donations
  FOR SELECT USING (true);

-- Admin updates/deletes handled via Server Actions (bypassing RLS)

-- Public can view news
CREATE POLICY "Public can view news" ON news
  FOR SELECT USING (true);

-- News updates handled via Server Actions (bypassing RLS)

-- 6. Storage Buckets (Execute in SQL Editor or via Supabase Dashboard)
INSERT INTO storage.buckets (id, name, public) VALUES ('receipts', 'receipts', false) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('news-images', 'news-images', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('assets', 'assets', true) ON CONFLICT (id) DO NOTHING;

-- Storage Policies for Receipts
DROP POLICY IF EXISTS "Public can upload receipts" ON storage.objects;
DROP POLICY IF EXISTS "Admins can read receipts" ON storage.objects;
DROP POLICY IF EXISTS "Public can read receipts" ON storage.objects;
CREATE POLICY "Public can upload receipts" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'receipts');
CREATE POLICY "Public can read receipts" ON storage.objects
  FOR SELECT USING (bucket_id = 'receipts');

-- Storage Policies for Assets
DROP POLICY IF EXISTS "Public can read assets" ON storage.objects;
DROP POLICY IF EXISTS "Public can read news images" ON storage.objects;
CREATE POLICY "Public can read assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'assets');
CREATE POLICY "Public can read news images" ON storage.objects
  FOR SELECT USING (bucket_id = 'news-images');
