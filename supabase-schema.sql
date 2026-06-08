-- ============================================================
-- MIGRATION 001: Core tables
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── users (extends Supabase auth.users) ──────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id             uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email          text UNIQUE NOT NULL,
  wallet_address text UNIQUE,
  tier           text NOT NULL DEFAULT 'core' CHECK (tier IN ('core', 'verified', 'inner_circle')),
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

-- ── drops ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.drops (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  slug         text UNIQUE NOT NULL,
  description  text,
  story        text,
  total_supply integer NOT NULL CHECK (total_supply > 0),
  remaining    integer NOT NULL CHECK (remaining >= 0),
  price_inr    integer NOT NULL CHECK (price_inr > 0),  -- in paise
  status       text NOT NULL DEFAULT 'draft'
               CHECK (status IN ('draft','scheduled','live','sold_out','archived')),
  drop_date    timestamptz,
  cover_image  text,
  images       text[] DEFAULT '{}',
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- ── products ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id      uuid NOT NULL REFERENCES public.drops(id) ON DELETE CASCADE,
  name         text NOT NULL,
  description  text,
  images       text[] DEFAULT '{}',
  size_options text[] DEFAULT '{"XS","S","M","L","XL"}',
  weight_grams integer,
  materials    text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- ── orders ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              uuid NOT NULL REFERENCES public.users(id),
  product_id           uuid NOT NULL REFERENCES public.products(id),
  drop_id              uuid NOT NULL REFERENCES public.drops(id),
  size                 text NOT NULL,
  razorpay_order_id    text UNIQUE,
  razorpay_payment_id  text UNIQUE,       -- UNIQUE prevents webhook replay
  status               text NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending','paid','failed','refunded','cancelled')),
  amount_inr           integer NOT NULL,  -- in paise — set server-side from drop price
  shipping_address     jsonb,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

-- ── nfc_chips ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.nfc_chips (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chip_uid     text UNIQUE NOT NULL,
  cmac_key_ref text NOT NULL,             -- reference to Supabase Vault secret
  product_id   uuid REFERENCES public.products(id),
  order_id     uuid UNIQUE REFERENCES public.orders(id),
  scan_counter integer NOT NULL DEFAULT 0,
  activated_at timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- ── nft_certificates ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.nft_certificates (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id         uuid UNIQUE NOT NULL REFERENCES public.orders(id),  -- UNIQUE = 1 NFT per order
  crossmint_id     text UNIQUE,
  token_id         text,
  contract_address text NOT NULL,
  chain            text NOT NULL DEFAULT 'polygon',
  metadata_uri     text NOT NULL,         -- ipfs:// URI — never http://
  status           text NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending','minting','minted','failed')),
  minted_at        timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- ── tier_memberships ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tier_memberships (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid UNIQUE NOT NULL REFERENCES public.users(id),
  tier        text NOT NULL CHECK (tier IN ('core', 'verified', 'inner_circle')),
  granted_at  timestamptz NOT NULL DEFAULT now(),
  granted_by  uuid REFERENCES public.users(id)   -- NULL = auto-grant
);

-- ── vault_items ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.vault_items (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id          uuid UNIQUE NOT NULL REFERENCES public.drops(id),
  archived_at      timestamptz NOT NULL DEFAULT now(),
  total_sold       integer NOT NULL DEFAULT 0,
  contract_address text,
  polygon_tx       text,
  provenance_notes text
);


-- ============================================================
-- MIGRATION 002: Indexes for performance at scale
-- ============================================================

-- orders: most common lookup patterns
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_drop_id ON public.orders(drop_id);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON public.orders(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_payment_id ON public.orders(razorpay_payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- drops: slug lookup (used on every drop page load)
CREATE INDEX IF NOT EXISTS idx_drops_slug ON public.drops(slug);
CREATE INDEX IF NOT EXISTS idx_drops_status ON public.drops(status);

-- nfc_chips: chip_uid lookup (used on every NFC scan)
CREATE INDEX IF NOT EXISTS idx_nfc_chips_chip_uid ON public.nfc_chips(chip_uid);

-- nft_certificates: order_id lookup
CREATE INDEX IF NOT EXISTS idx_nft_certs_order_id ON public.nft_certificates(order_id);
CREATE INDEX IF NOT EXISTS idx_nft_certs_status ON public.nft_certificates(status);

-- products: drop_id lookup
CREATE INDEX IF NOT EXISTS idx_products_drop_id ON public.products(drop_id);


-- ============================================================
-- MIGRATION 003: Atomic inventory function
-- ============================================================

-- This function is the ONLY place inventory is decremented.
-- PostgreSQL row-level locking prevents concurrent oversell.
CREATE OR REPLACE FUNCTION public.decrement_drop_inventory(p_drop_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_updated boolean;
BEGIN
  UPDATE public.drops
  SET remaining = remaining - 1,
      status = CASE WHEN remaining - 1 = 0 THEN 'sold_out' ELSE status END
  WHERE id = p_drop_id
    AND remaining > 0
    AND status = 'live';

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated > 0;
END;
$$;


-- ============================================================
-- MIGRATION 004: Auto-update updated_at trigger
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS users_updated_at ON public.users;
CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ============================================================
-- MIGRATION 005: Auto-create user profile on signup
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS on ALL tables
ALTER TABLE public.users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drops          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfc_chips      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nft_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tier_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_items    ENABLE ROW LEVEL SECURITY;

-- ── RLS Policies ──

DROP POLICY IF EXISTS "users_select_own" ON public.users;
CREATE POLICY "users_select_own" ON public.users FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "users_update_own" ON public.users;
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "drops_public_read" ON public.drops;
CREATE POLICY "drops_public_read" ON public.drops FOR SELECT USING (status IN ('live', 'sold_out', 'archived'));

DROP POLICY IF EXISTS "products_public_read" ON public.products;
CREATE POLICY "products_public_read" ON public.products FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.drops d
    WHERE d.id = drop_id
    AND d.status IN ('live', 'sold_out', 'archived')
  )
);

DROP POLICY IF EXISTS "orders_select_own" ON public.orders;
CREATE POLICY "orders_select_own" ON public.orders FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "orders_insert_own" ON public.orders;
CREATE POLICY "orders_insert_own" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "nft_certs_select_own" ON public.nft_certificates;
CREATE POLICY "nft_certs_select_own" ON public.nft_certificates FOR SELECT USING (
  order_id IN (
    SELECT id FROM public.orders WHERE user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "tiers_select_own" ON public.tier_memberships;
CREATE POLICY "tiers_select_own" ON public.tier_memberships FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "vault_public_read" ON public.vault_items;
CREATE POLICY "vault_public_read" ON public.vault_items FOR SELECT USING (true);
