-- ============================================
-- [BRAND] PHYGITAL LUXURY STREETWEAR DATABASE
-- ============================================

-- TABLE 1: WAITLIST
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  phone text,
  position integer,
  invited boolean DEFAULT false,
  drop_access integer,
  created_at timestamptz DEFAULT now()
);

-- TABLE 2: DROPS
CREATE TABLE IF NOT EXISTS drops (
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

-- TABLE 3: ORDERS
CREATE TABLE IF NOT EXISTS orders (
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
  wallet_type text,
  nft_claimed boolean DEFAULT false,
  nft_tx_hash text,
  nft_token_id text,
  is_backup_unit boolean DEFAULT false,
  shipping_status text DEFAULT 'pending',
  tracking_number text,
  created_at timestamptz DEFAULT now()
);

-- TABLE 4: NFC_SCANS
CREATE TABLE IF NOT EXISTS nfc_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_number text NOT NULL,
  scanned_at timestamptz DEFAULT now(),
  user_agent text,
  scan_count integer DEFAULT 1
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE drops ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE nfc_scans ENABLE ROW LEVEL SECURITY;

-- WAITLIST: Anyone can insert (signup), no public SELECT
CREATE POLICY "Anyone can join waitlist"
  ON waitlist FOR INSERT
  WITH CHECK (true);

CREATE POLICY "No public SELECT on waitlist"
  ON waitlist FOR SELECT
  USING (false);

-- DROPS: Public read access
CREATE POLICY "Anyone can view drops"
  ON drops FOR SELECT
  USING (true);

-- ORDERS: Users can only see their own orders (matched by email)
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Insert orders on purchase"
  ON orders FOR INSERT
  WITH CHECK (true);

-- NFC_SCANS: Anyone can insert scan events
CREATE POLICY "Anyone can log NFC scans"
  ON nfc_scans FOR INSERT
  WITH CHECK (true);

CREATE POLICY "No public SELECT on nfc_scans"
  ON nfc_scans FOR SELECT
  USING (false);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_serial ON orders(serial_number);
CREATE INDEX IF NOT EXISTS idx_drops_active ON drops(is_active);
CREATE INDEX IF NOT EXISTS idx_nfc_scans_serial ON nfc_scans(serial_number);

-- ============================================
-- PHASE 1 COMMERCE + OWNERSHIP TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  phone text,
  role text DEFAULT 'customer',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id uuid REFERENCES drops(id) ON DELETE SET NULL,
  sku text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  price_inr integer NOT NULL CHECK (price_inr > 0),
  stock_total integer NOT NULL DEFAULT 10 CHECK (stock_total >= 0),
  stock_left integer NOT NULL DEFAULT 10 CHECK (stock_left >= 0),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ownership_certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  chain text NOT NULL DEFAULT 'polygon',
  status text NOT NULL DEFAULT 'pending',
  token_id text,
  tx_hash text,
  minted_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS nfc_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  chip_uid_hash text UNIQUE NOT NULL,
  public_code text UNIQUE NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS amount_inr integer,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'created';

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE ownership_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE nfc_tags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profiles" ON profiles;
CREATE POLICY "Users can view own profiles"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profiles" ON profiles;
CREATE POLICY "Users can update own profiles"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Public can view active products" ON products;
CREATE POLICY "Public can view active products"
  ON products FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Users can view own orders by uid" ON orders;
CREATE POLICY "Users can view own orders by uid"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own certificates" ON ownership_certificates;
CREATE POLICY "Users can view own certificates"
  ON ownership_certificates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = ownership_certificates.order_id
      AND orders.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Public can verify nfc tags" ON nfc_tags;
CREATE POLICY "Public can verify nfc tags"
  ON nfc_tags FOR SELECT
  USING (is_active = true);

CREATE OR REPLACE FUNCTION reserve_product_stock(p_product_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  updated_count integer;
BEGIN
  UPDATE products
  SET stock_left = stock_left - 1
  WHERE id = p_product_id
    AND is_active = true
    AND stock_left > 0;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count = 1;
END;
$$;

REVOKE ALL ON FUNCTION reserve_product_stock(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION reserve_product_stock(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION reserve_product_stock(uuid) TO service_role;
