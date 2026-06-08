import { adminSupabase } from "@/lib/supabase/admin";
import Link from "next/link";
import { Sparkles, ShieldAlert, Cpu, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

type Product = {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  stock_total: number;
};

type Drop = {
  id: string;
  drop_number: number;
  name: string;
};

export default async function VaultPage() {
  const { data: products } = await adminSupabase
    .from("products")
    .select("id, sku, name, description, stock_total, drop_id")
    .order("created_at", { ascending: false });

  const { data: drops } = await adminSupabase
    .from("drops")
    .select("id, drop_number, name")
    .order("drop_number", { ascending: true });

  const totalPieces = (products || []).reduce((sum, p) => sum + (p.stock_total || 10), 0);
  const dropsCompleted = (drops || []).length;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#E9EAF0] selection:bg-[#C9A96E]/50 flex flex-col justify-between">
      <div>
        {/* Navigation header */}
        <nav className="w-full border-b border-white/[0.05] bg-[#111111]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-sans font-black text-xl tracking-[0.2em] text-[#E9EAF0]">
              Leous
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-[#8C8580] hover:text-[#E9EAF0] text-sm transition-colors">
                HOME
              </Link>
              <Link href="/dashboard" className="text-[#8C8580] hover:text-[#E9EAF0] text-sm transition-colors">
                DASHBOARD
              </Link>
              <Link href="/verify" className="text-[#8C8580] hover:text-[#E9EAF0] text-sm transition-colors">
                VERIFY
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero banner */}
        <header className="px-6 py-20 border-b border-white/[0.05] relative overflow-hidden bg-[#111111]/40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C9A96E]/5 blur-[100px] pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/5 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span className="text-white text-[10px] font-bold uppercase tracking-widest font-mono">ARCHIVE SYSTEM</span>
              </div>
              <h1 className="font-display font-light text-4xl md:text-5xl text-white">
                The Brand <span className="italic text-[#C9A96E] font-medium drop-shadow-[0_0_15px_rgba(201,169,110,0.4)]">Vault</span>
              </h1>
              <p className="text-[#8C8580] text-sm mt-3 max-w-lg leading-relaxed">
                Every phygital garment ever produced. Cryptographically registered, tracked, and verifiable on the public ledger.
              </p>
            </div>
            
            <div className="flex justify-center md:justify-start gap-8 bg-[#05061B]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <Stat label="Total Pieces" value={String(totalPieces)} />
              <div className="w-px bg-white/10" />
              <Stat label="Drops Released" value={String(dropsCompleted)} />
              <div className="w-px bg-white/10" />
              <Stat label="Live Chips" value={String(totalPieces)} />
            </div>
          </div>
        </header>

        {/* Products section */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/verify?code=${product.sku}`}
                  className="border border-white/10 bg-[#05061B]/40 rounded-2xl p-6 hover:border-[#C9A96E]/50 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square bg-[#0A0A0A] rounded-xl border border-white/5 flex flex-col items-center justify-center mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.05),transparent_70%)]" />
                      <Cpu className="w-10 h-10 text-[#8C8580]/20 group-hover:text-[#C9A96E]/40 transition-colors duration-300" />
                    </div>
                    <span className="text-[10px] font-mono text-[#C9A96E] tracking-wider block">{product.sku}</span>
                    <h3 className="text-white font-medium text-base mt-2 group-hover:text-white transition-colors">{product.name}</h3>
                  </div>
                  <p className="text-[#8C8580] text-xs mt-3 line-clamp-2 leading-relaxed">
                    {product.description || "Limited edition custom garment with on-chain metadata Twin."}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-white/5 bg-[#111111]/40 rounded-3xl backdrop-blur-md">
              <ShieldAlert className="w-8 h-8 text-[#8C8580]/40 mx-auto mb-3" />
              <p className="text-[#8C8580] text-base">No registered products in the vault yet.</p>
              <p className="text-xs text-[#8C8580]/40 mt-1">Products will populate when drops are seeded.</p>
            </div>
          )}
        </section>
      </div>

      {/* Footer note */}
      <footer className="border-t border-white/[0.05] py-10 px-6 bg-[#111111]/30">
        <div className="max-w-6xl mx-auto text-center font-mono">
          <p className="text-[#8C8580]/60 text-xs">
            Want to verify your own streetwear item? Scan the integrated chip or tap verify.
          </p>
          <Link href="/verify" className="inline-flex items-center gap-1 mt-3 text-[#C9A96E] text-xs hover:underline">
            Go to verification interface <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center min-w-[70px]">
      <span className="font-mono text-2xl font-semibold text-white block tracking-tight">{value}</span>
      <span className="text-[9px] font-mono text-[#8C8580]/60 uppercase tracking-widest mt-1 block">{label}</span>
    </div>
  );
}
