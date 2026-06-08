import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { adminSupabase } from "@/lib/supabase/admin";
import { ClaimSection } from "./claim-section";
import { ShieldCheck, LogOut, Package, RefreshCw, Layers } from "lucide-react";

export const dynamic = "force-dynamic";

type OrderRow = {
  id: string;
  amount_inr: number;
  status: string;
  created_at: string;
  product_id: string;
  products: { name: string; sku: string }[] | { name: string; sku: string } | null;
};

type CertificateRow = {
  order_id: string;
  status: string;
  token_id: string | null;
  chain: string;
  wallet_type: string | null;
  wallet_address: string | null;
  tx_hash: string | null;
  minted_at: string | null;
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: orders } = await adminSupabase
    .from("orders")
    .select("id, amount_inr, status, created_at, product_id, products(name, sku)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const orderIds = (orders || []).map((order) => order.id);

  let certificates: CertificateRow[] = [];
  if (orderIds.length) {
    const { data } = await adminSupabase
      .from("ownership_certificates")
      .select("order_id, status, token_id, chain, wallet_type, wallet_address, tx_hash, minted_at")
      .in("order_id", orderIds);

    certificates = (data || []) as CertificateRow[];
  }

  const certificateByOrder = new Map(
    certificates.map((c) => [c.order_id, c])
  );

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#E9EAF0] selection:bg-[#C9A96E]/50 flex flex-col justify-between">
      <div>
        {/* Navigation header */}
        <nav className="w-full border-b border-white/[0.05] bg-[#111111]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="font-sans font-black text-xl tracking-[0.2em] text-[#E9EAF0]">
                Leous
              </Link>
              <span className="text-[10px] font-mono text-[#C9A96E] tracking-widest uppercase bg-[#C9A96E]/10 px-2 py-0.5 rounded">
                OWNER VAULT
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[#8C8580] text-xs font-mono hidden md:block">{user.email}</span>
              <a
                href="/api/auth/logout"
                className="text-xs font-mono text-white/60 hover:text-rose-400 flex items-center gap-1.5 transition-colors border border-white/10 rounded-lg px-3 py-1.5 bg-white/5"
              >
                <LogOut className="w-3.5 h-3.5" /> LOGOUT
              </a>
            </div>
          </div>
        </nav>

        {/* Dashboard content */}
        <div className="max-w-4xl mx-auto px-6 py-16 relative">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A96E]/5 blur-[120px] pointer-events-none" />

          <div className="mb-10">
            <h1 className="font-display font-light text-3xl md:text-4xl text-white">
              Owner <span className="italic text-[#C9A96E] font-medium">Dashboard</span>
            </h1>
            <p className="text-[#8C8580] text-sm mt-2 font-mono">Profile: {user.email}</p>
          </div>

          {(orders as OrderRow[] | null)?.length ? (
            <div className="space-y-6 relative z-10">
              {(orders as OrderRow[]).map((order) => {
                const cert = certificateByOrder.get(order.id);
                const tier = cert?.status === "minted" ? 2 : 1;
                const activeGlow = tier === 2 ? "border-[#C9A96E] shadow-[0_0_20px_rgba(201,169,110,0.1)]" : "border-white/10";

                const productInfo = Array.isArray(order.products)
                  ? order.products[0]
                  : order.products;

                return (
                  <article
                    key={order.id}
                    className={`border rounded-3xl bg-[#05061B]/60 backdrop-blur-md p-8 transition-all duration-300 ${activeGlow}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                      <div>
                        <span className="text-[10px] font-mono text-[#C9A96E] tracking-wider block">
                          {productInfo?.sku || "SKU-N/A"}
                        </span>
                        <h2 className="font-display text-xl font-light text-white mt-1">
                          {productInfo?.name || "Premium Streetwear Product"}
                        </h2>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-[#8C8580]">
                          ₹{order.amount_inr.toLocaleString("en-IN")}
                        </span>
                        <span className={`px-2.5 py-0.5 text-[10px] font-mono rounded-full border ${tier === 2 ? "border-[#C9A96E]/40 text-[#C9A96E] bg-[#C9A96E]/5" : "border-white/10 text-[#8C8580]"}`}>
                          TIER 0{tier}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6 mb-8">
                      <ProgressStep label="ORDER CONFIRMED" done={true} />
                      <ProgressStep label="CERTIFICATE SYNCED" done={!!cert} />
                      <ProgressStep label="NFT MINTED" done={cert?.status === "minted"} />
                    </div>

                    {cert?.status === "minted" ? (
                      <div className="border border-[#C9A96E]/20 bg-[#0A0A0A]/60 rounded-2xl p-6 text-sm">
                        <p className="text-[#C9A96E] font-medium flex items-center gap-2 mb-3">
                          <ShieldCheck className="w-5 h-5 text-emerald-400" /> NFT CLAIMED • TIER 02 OWNER VERIFIED
                        </p>
                        <p className="text-[#8C8580] text-xs">
                          Registry method: {cert.wallet_type === "custodial" ? "Custodial Wallet Vault" : "Self-Custodial Signature"}
                        </p>
                        {cert.wallet_type === "self-custody" && cert.wallet_address && (
                          <p className="text-[#8C8580]/60 mt-1 font-mono text-xs truncate">
                            Address: {cert.wallet_address}
                          </p>
                        )}
                        {cert.tx_hash && (
                          <a
                            href={`https://polygonscan.com/tx/${cert.tx_hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#C9A96E] hover:underline text-xs mt-3 font-mono"
                          >
                            Verify transaction on Polygonscan →
                          </a>
                        )}
                      </div>
                    ) : cert?.status === "claim_submitted" ? (
                      <div className="border border-white/10 bg-[#0A0A0A]/40 rounded-2xl p-6 text-sm flex items-center gap-3">
                        <RefreshCw className="w-5 h-5 text-[#C9A96E] animate-spin shrink-0" />
                        <div>
                          <p className="text-white font-medium">Claim request submitted.</p>
                          <p className="text-[#8C8580] text-xs mt-0.5">Minting on-chain keys. The NFT certificate will arrive in your wallet shortly.</p>
                        </div>
                      </div>
                    ) : order.status === "paid" ? (
                      <div className="bg-[#0A0A0A]/40 rounded-2xl p-1 border border-white/5">
                        <ClaimSection orderId={order.id} userEmail={user.email || ""} />
                      </div>
                    ) : (
                      <p className="text-[#8C8580] text-xs font-mono">
                        Order Registry Status: <span className="text-white uppercase">{order.status}</span>
                      </p>
                    )}

                    <div className="text-[10px] text-[#8C8580]/40 mt-4 font-mono">
                      Logged at: {new Date(order.created_at).toLocaleString("en-IN")}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="border border-white/10 bg-[#05061B]/40 rounded-3xl p-12 text-center relative z-10 backdrop-blur-md">
              <Package className="w-8 h-8 text-[#8C8580]/40 mx-auto mb-3" />
              <p className="text-[#8C8580] text-sm">
                No orders associated with this account. Visit our drop page to acquire a piece.
              </p>
              <Link href="/" className="inline-flex items-center gap-1 mt-4 text-[#C9A96E] text-xs hover:underline font-mono">
                View active collections →
              </Link>
            </div>
          )}

          <div className="mt-16 border-t border-white/10 pt-8 text-[#8C8580]/40 text-xs font-mono space-y-1">
            <p>• Verified luxury membership status is non-transferable without physical twin validation.</p>
            <p>• Garment NFC keys remain active indefinitely.</p>
            <p>• Engineered in Bangalore, India.</p>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="border-t border-white/[0.05] py-8 px-6 bg-[#111111]/20 text-center font-mono">
        <p className="text-[#8C8580]/40 text-[10px]">&copy; 2026 Leous. Secure owner dashboard.</p>
      </footer>
    </main>
  );
}

function ProgressStep({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2 font-mono">
      <div className={`w-2 h-2 rounded-full ${done ? "bg-[#C9A96E] shadow-[0_0_8px_rgba(201,169,110,0.8)]" : "bg-white/10"}`} />
      <span className={`text-[10px] ${done ? "text-white" : "text-[#8C8580]/40"}`}>{label}</span>
    </div>
  );
}
