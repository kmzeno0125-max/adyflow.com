/*
# Create leads table (public contact form, no auth)

1. New Tables
  - `leads`
    - `id` (uuid, primary key)
    - `name` (text, not null)
    - `email` (text, not null)
    - `phone` (text, not null)
    - `company_type` (text, not null)
    - `message` (text, optional)
    - `honeypot` (text, for spam detection)
    - `created_at` (timestamptz)

2. Security
  - Enable RLS on `leads`.
  - Allow anon + authenticated INSERT (public contact form).
  - No SELECT/UPDATE/DELETE for anon (admin only via dashboard).
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company_type text NOT NULL,
  message text DEFAULT '',
  honeypot text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_leads" ON leads;
CREATE POLICY "anon_select_leads" ON leads FOR SELECT
  TO anon, authenticated USING (false);

DROP POLICY IF EXISTS "anon_update_leads" ON leads;
CREATE POLICY "anon_update_leads" ON leads FOR UPDATE
  TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "anon_delete_leads" ON leads;
CREATE POLICY "anon_delete_leads" ON leads FOR DELETE
  TO anon, authenticated USING (false);