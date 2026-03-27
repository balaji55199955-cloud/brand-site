-- ============================================
-- PHYGITAL LUXURY FASHION BRAND - SUPABASE SCHEMA
-- ============================================

-- TABLE 1: waitlist
CREATE TABLE waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  phone text,
  position integer,
  invited boolean DEFAULT false,
  drop_access integer,
  created_at timestamptz DEFAULT now()
);

-- TABLE 2: drops
CREATE TABLE drops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_number integer UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  price_inr integer NOT NULL,
  total_units integer DEFAULT 10,
  backup_units integer DEFAULT 1,
  units_sold integer DEFAULT 0,
  launch_date timestamptz,
  close_date timestamptz,
  is_active boolean DEFAULT false,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- TABLE 3: orders
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  phone text,
  drop_id uuid REFERENCES drops(id),
  drop_number integer NOT NULL,
  serial_number text UNIQUE NOT NULL,
  unit_number integer NOT NULL,
  product_name text,
  price_paid_inr integer,
  razorpay_payment_id text,
  razorpay_order_id text,
  tier integer DEFAULT 1,
  wallet_address text,
  wallet_type text CHECK (wallet_type IN ('custodial', 'self-custody')),
  nft_claimed boolean DEFAULT false,
  nft_tx_hash text,
  nft_token_id text,
  is_backup_unit boolean DEFAULT false,
  shipping_status text DEFAULT 'pending',
  tracking_number text,
  created_at timestamptz DEFAULT now()
);

-- TABLE 4: nfc_scans
CREATE TABLE nfc_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_number text NOT NULL,
  scanned_at timestamptz DEFAULT now(),
  user_agent text,
  scan_count integer DEFAULT 1
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE drops ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE nfc_scans ENABLE ROW LEVEL SECURITY;

-- WAITLIST: anyone can INSERT, no public SELECT
CREATE POLICY "Allow public insert on waitlist"
  ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- DROPS: anyone can SELECT (public)
CREATE POLICY "Allow public read on drops"
  ON drops
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ORDERS: authenticated users can only SELECT their own rows
CREATE POLICY "Users can view own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (email = (auth.jwt() ->> 'email'));

-- NFC_SCANS: anyone can INSERT, no public SELECT
CREATE POLICY "Allow public insert on nfc_scans"
  ON nfc_scans
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
