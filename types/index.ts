// ── Database entity types ─────────────────────────────────────

export type OwnershipTier = 'core' | 'verified' | 'inner_circle'
export type DropStatus = 'draft' | 'scheduled' | 'live' | 'sold_out' | 'archived'
export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled'
export type NFTStatus = 'pending' | 'minting' | 'minted' | 'failed'

export interface User {
  id: string
  email: string
  wallet_address: string | null
  tier: OwnershipTier
  created_at: string
  updated_at: string
}

export interface Drop {
  id: string
  name: string
  slug: string
  description: string | null
  story: string | null
  total_supply: number
  remaining: number
  price_inr: number        // in paise
  status: DropStatus
  drop_date: string | null
  cover_image: string | null
  images: string[]
  created_at: string
}

export interface Product {
  id: string
  drop_id: string
  name: string
  description: string | null
  images: string[]
  size_options: string[]
  weight_grams: number | null
  materials: string | null
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  product_id: string
  drop_id: string
  size: string
  razorpay_order_id: string | null
  razorpay_payment_id: string | null
  status: OrderStatus
  amount_inr: number       // in paise
  shipping_address: ShippingAddress | null
  created_at: string
  updated_at: string
}

export interface NFTCertificate {
  id: string
  order_id: string
  crossmint_id: string | null
  token_id: string | null
  contract_address: string
  chain: string
  metadata_uri: string
  status: NFTStatus
  minted_at: string | null
  created_at: string
}

export interface NFCChip {
  id: string
  chip_uid: string
  cmac_key_ref: string
  product_id: string | null
  order_id: string | null
  scan_counter: number
  activated_at: string | null
  created_at: string
}

export interface TierMembership {
  id: string
  user_id: string
  tier: OwnershipTier
  granted_at: string
  granted_by: string | null
}

export interface VaultItem {
  id: string
  drop_id: string
  archived_at: string
  total_sold: number
  contract_address: string | null
  polygon_tx: string | null
  provenance_notes: string | null
}

export interface ShippingAddress {
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  phone: string
}

// ── API response types ────────────────────────────────────────

export interface CreateOrderResponse {
  orderId: string
  razorpayOrderId: string
  amount: number
  currency: string
  keyId: string
}

export interface VerifyNFCResponse {
  verified: boolean
  reason?: string
  product?: {
    name: string
    drop: string
    images: string[]
    drop_date: string | null
  }
  owner?: {
    tier: string
    since: string
  }
  nft?: {
    tokenId: string | null
    contractAddress: string
    polygonScanUrl: string
    metadataUri: string
  }
}

export interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
}

// ── Component prop types ──────────────────────────────────────

export interface DropWithProduct extends Drop {
  products: Product[]
}

export interface OrderWithDetails extends Order {
  product: Product
  drop: Drop
  nft_certificate: NFTCertificate | null
}
