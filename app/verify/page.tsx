"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, Cpu, Sparkles, Loader2, ArrowLeft } from "lucide-react";

type VerifyResult = {
  authentic?: boolean;
  message?: string;
  product?: { name: string; sku: string };
  certificate?: { status?: string; minted_at?: string | null };
  scanCount?: number;
};

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#E9EAF0]">
          <Loader2 className="w-8 h-8 text-[#C9A96E] animate-spin" />
        </main>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || "";
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`/api/nfc/verify?code=${encodeURIComponent(code)}`);
      const data = (await response.json()) as VerifyResult;
      setResult(data);
    } catch {
      setResult({ message: "Unable to verify code right now." });
    } finally {
      setLoading(false);
    }
  }

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
              <Link href="/vault" className="text-[#8C8580] hover:text-[#E9EAF0] text-sm transition-colors">
                VAULT
              </Link>
              <Link href="/dashboard" className="text-[#8C8580] hover:text-[#E9EAF0] text-sm transition-colors">
                DASHBOARD
              </Link>
            </div>
          </div>
        </nav>

        {/* Content container */}
        <div className="max-w-2xl mx-auto px-6 py-16 relative">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C9A96E]/5 blur-[120px] pointer-events-none" />
          
          <div className="border border-white/10 bg-[#05061B]/60 backdrop-blur-md p-8 rounded-3xl relative z-10 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/5 mb-6">
              <Cpu className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span className="text-white text-[10px] font-bold uppercase tracking-widest font-mono">CRYPTOGRAPHIC REGISTRY</span>
            </div>
            
            <h1 className="font-display font-light text-3xl md:text-4xl text-white mb-2">
              Verify <span className="italic text-[#C9A96E] font-medium">Authenticity</span>
            </h1>
            <p className="text-[#8C8580] text-sm mb-8 leading-relaxed">
              Scan the embedded garment tag NFC chip or manually input your item&apos;s unique archive tracking key.
            </p>

            <form onSubmit={handleVerify} className="space-y-4">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="Enter public code (e.g. BRAND-A1B2C3)"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#8C8580]/40 outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#C9A96E] text-white text-sm font-semibold hover:bg-[#C9A96E]/90 transition-colors shadow-[0_0_15px_rgba(201,169,110,0.3)] disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Verifying Keys...
                  </>
                ) : (
                  "Initiate Handshake"
                )}
              </button>
            </form>
          </div>

          {/* Results section */}
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="mt-8 relative z-10"
            >
              {result.authentic ? (
                <div className="space-y-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-8 text-center flex flex-col items-center">
                    <ShieldCheck className="w-12 h-12 text-emerald-400 mb-3" />
                    <p className="font-display font-light text-2xl text-white tracking-wider">
                      ✓ <span className="font-bold text-emerald-400">VERIFIED AUTHENTIC</span>
                    </p>
                    <p className="text-[#8C8580] text-xs mt-2 font-mono">
                      Timestamp: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  <div className="border border-white/10 bg-[#05061B]/60 backdrop-blur-md rounded-3xl p-6">
                    {result.product && (
                      <>
                        <span className="text-[10px] font-mono text-[#C9A96E] tracking-wider block">{result.product.sku}</span>
                        <h2 className="font-display text-xl font-light text-white mt-1">{result.product.name}</h2>
                      </>
                    )}
                    {result.certificate && (
                      <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-[#8C8580]">
                        <span>Polygon Certificate Status:</span>
                        <span className="text-[#C9A96E] font-semibold font-mono uppercase bg-[#C9A96E]/10 px-2 py-0.5 rounded">
                          {result.certificate.status}
                        </span>
                        {result.certificate.minted_at && (
                          <span className="w-full text-[10px] text-[#8C8580]/60 mt-1 block">
                            Minted on: {new Date(result.certificate.minted_at).toLocaleDateString("en-IN")}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <details className="border border-white/10 bg-[#05061B]/40 rounded-2xl overflow-hidden group">
                    <summary className="p-4 cursor-pointer text-[#8C8580] text-xs hover:text-white transition-colors list-none flex items-center justify-between font-mono">
                      <span>SECURE METADATA PAYLOAD</span>
                      <span className="text-[#C9A96E] font-bold group-open:rotate-180 transition-transform">↓</span>
                    </summary>
                    <div className="px-4 pb-4 text-[#8C8580]/80 text-[11px] font-mono space-y-2 border-t border-white/5 pt-3">
                      <p>• Blockchain: Polygon Network</p>
                      <p>• NFC Engine: NTAG 424 DNA (AES-128 Encryption Keys)</p>
                      <p>• Origin Location: Bangalore Lab</p>
                      <p>• Construction: 500 GSM Heavyweight Garment</p>
                      <p>• Registry Identifier: {code}</p>
                    </div>
                  </details>

                  <div className="text-center text-[10px] text-[#8C8580]/50 font-mono space-y-1">
                    <p>This drop is strictly limited to 10 copies. No re-issues or restocks.</p>
                    <p>Cryptographic twin ensures lifetime on-chain authentication.</p>
                  </div>
                </div>
              ) : (
                <div className="border border-white/10 bg-[#111111]/60 rounded-3xl p-8 text-center flex flex-col items-center">
                  <ShieldAlert className="w-12 h-12 text-rose-500 mb-3" />
                  <p className="text-white font-display font-medium text-xl">Verification Refused</p>
                  <p className="text-[#8C8580] text-sm mt-2 max-w-sm leading-relaxed">
                    {result.message || "This tracking signature does not exist in our active drop registry."}
                  </p>
                  <p className="text-[#8C8580]/40 text-xs mt-4">
                    For technical support, connect with verification admin.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          <div className="mt-12 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[#8C8580]/60 hover:text-white transition-colors font-mono">
              <ArrowLeft className="w-3.5 h-3.5" /> Return home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="border-t border-white/[0.05] py-8 px-6 bg-[#111111]/20 text-center font-mono">
        <p className="text-[#8C8580]/40 text-[10px]">&copy; 2026 Leous. Secure verification portal.</p>
      </footer>
    </main>
  );
}
