"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CreditCard, ArrowLeft, Loader2, Cpu } from "lucide-react";

type CreateOrderResponse = {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  product: {
    id: string;
    name: string;
    sku: string;
  };
};

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

export default function CheckoutPage() {
  const params = useParams<{ productId: string }>();
  const productId = useMemo(() => params.productId, [params.productId]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function startCheckout() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = (await response.json()) as CreateOrderResponse | { error: string };
      if (!response.ok || !("orderId" in data)) {
        setMessage("error" in data ? data.error : "Failed to start checkout");
        return;
      }

      const razorpay = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Leous",
        description: `${data.product.name} (${data.product.sku})`,
        order_id: data.orderId,
        theme: { color: "#C9A96E" },
        handler: function () {
          setMessage("Payment initiated. Verification in progress. An email confirmation will be sent shortly.");
        },
      });

      razorpay.open();
    } catch {
      setMessage("Unable to initiate payment.");
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
              <Link href="/verify" className="text-[#8C8580] hover:text-[#E9EAF0] text-sm transition-colors">
                VERIFY
              </Link>
            </div>
          </div>
        </nav>

        {/* Content container */}
        <div className="max-w-xl mx-auto px-6 py-20 relative">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C9A96E]/5 blur-[120px] pointer-events-none" />

          <div className="border border-white/10 bg-[#05061B]/60 backdrop-blur-md p-8 rounded-3xl relative z-10 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/5 mb-6">
              <CreditCard className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span className="text-white text-[10px] font-bold uppercase tracking-widest font-mono">SECURE BILLING</span>
            </div>

            <h1 className="font-display font-light text-3xl md:text-4xl text-white mb-2">
              Purchase <span className="italic text-[#C9A96E] font-medium">Drop Piece</span>
            </h1>
            <p className="text-[#8C8580] text-sm mb-8 leading-relaxed">
              Complete your acquisition securely in INR. Digital Twin certificates are minted after successful payment verification.
            </p>

            <button
              onClick={startCheckout}
              disabled={loading}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#C9A96E] text-white text-sm font-semibold hover:bg-[#C9A96E]/90 transition-colors shadow-[0_0_15px_rgba(201,169,110,0.3)] disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Starting Secure Session...
                </>
              ) : (
                "Pay with Razorpay"
              )}
            </button>

            {message && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-[#8C8580] font-mono leading-relaxed">
                {message}
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[#8C8580]/60 hover:text-white transition-colors font-mono">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to drop
            </Link>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="border-t border-white/[0.05] py-8 px-6 bg-[#111111]/20 text-center font-mono">
        <p className="text-[#8C8580]/40 text-[10px]">&copy; 2026 Leous. Secure gateway connection.</p>
      </footer>
    </main>
  );
}
