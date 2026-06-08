"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

import P01Header01Tsx from "@/components/templates/leous/Header";
import P01WhyUs from "@/components/templates/leous/WhyChooseUs";
import HowItWorks01 from "@/components/templates/leous/HowItWorks";
import Footer01 from "@/components/templates/leous/Footer";

type ActiveProduct = {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  price_inr: number;
  stock_left: number;
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E9EAF0] selection:bg-[#C9A96E]/50">
      <P01Header01Tsx />
      <LiveProducts />
      <Countdown />
      <P01WhyUs />
      <HowItWorks01 />
      <Footer01 />
    </div>
  );
}

// ============================================
// LIVE PRODUCTS SECTION (STYLISH BENTO STYLE)
// ============================================
function LiveProducts() {
  const [products, setProducts] = useState<ActiveProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section id="drop" className="py-24 px-6 bg-[#111111] border-y border-white/[0.05] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(201,169,110,0.06),transparent_60%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-[#C9A96E] uppercase mb-4">BANGALORE SERIES 001</span>
          <h2 className="font-display font-light text-4xl md:text-5xl text-white">
            Available <span className="italic text-[#C9A96E] drop-shadow-[0_0_15px_rgba(201,169,110,0.4)] font-medium">Pieces</span>
          </h2>
          <p className="text-[#8C8580] text-sm md:text-base mt-4 max-w-xl">
            Each item is finished by hand in Bangalore. Embedded cryptography ensures complete origin proof.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#C9A96E] animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 border border-white/5 bg-white/5 rounded-3xl backdrop-blur-md">
            <p className="text-[#8C8580] text-base">No active drop products at this moment.</p>
            <p className="text-xs text-[#8C8580]/40 mt-1">Check back soon or seed from admin control panel.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <motion.article 
                key={product.id} 
                whileHover={{ y: -6, borderColor: "rgba(201,169,110,0.3)" }}
                className="border border-white/10 bg-[#05061B]/40 rounded-3xl p-8 relative flex flex-col justify-between backdrop-blur-md transition-all duration-300"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#C9A96E] tracking-widest">{product.sku}</span>
                  <h3 className="font-display text-2xl font-light text-white mt-3 mb-2">{product.name}</h3>
                  <p className="text-[#8C8580] text-sm leading-relaxed mb-6">
                    {product.description || "Ultra-limited heavyweight luxury streetwear featuring embedded NTAG 424 DNA sun cryptography."}
                  </p>
                </div>
                <div>
                  <div className="flex items-baseline justify-between border-t border-white/5 pt-4 mb-6">
                    <div>
                      <span className="text-xs text-[#8C8580]/60 block uppercase font-mono">Price</span>
                      <span className="text-xl font-medium text-white">₹{product.price_inr.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#8C8580]/60 block uppercase font-mono">Stock Left</span>
                      <span className={`text-base font-semibold ${product.stock_left > 0 ? "text-emerald-400" : "text-rose-500"}`}>
                        {product.stock_left} / 10
                      </span>
                    </div>
                  </div>
                  {product.stock_left > 0 ? (
                    <a
                      href={`/checkout/${product.id}`}
                      className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#C9A96E] text-white text-sm font-semibold hover:bg-[#C9A96E]/90 transition-colors shadow-[0_0_15px_rgba(201,169,110,0.3)]"
                    >
                      Acquire Piece <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full h-12 rounded-xl bg-white/5 border border-white/5 text-white/40 text-sm font-semibold cursor-not-allowed"
                    >
                      Sold Out
                    </button>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// COUNTDOWN SECTION
// ============================================
function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Drop opens 30 days from project launch
    const dropDate = new Date();
    dropDate.setDate(dropDate.getDate() + 30);
    const targetTime = dropDate.getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setIsLive(true);
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLive) {
    return (
      <section className="py-20 px-6 bg-[#0A0A0A] border-b border-white/[0.05] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[#C9A96E] font-display font-black text-5xl md:text-7xl animate-pulse tracking-widest">
            DROP 001 IS LIVE
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-[#0A0A0A] border-b border-white/[0.05] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C9A96E]/5 blur-[120px] pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-[0.2em] text-[#8C8580]/60 uppercase">SERIES RELEASE TIMELINE</span>
          <h3 className="font-display font-light text-2xl md:text-3xl text-white mt-2">
            Drop 001 opens in
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-4 md:gap-8">
          <TimeBlock value={timeLeft.days} label="DAYS" />
          <TimeBlock value={timeLeft.hours} label="HRS" />
          <TimeBlock value={timeLeft.minutes} label="MIN" />
          <TimeBlock value={timeLeft.seconds} label="SEC" />
        </div>
      </div>
    </section>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="border border-white/10 bg-[#111111]/60 backdrop-blur-md rounded-2xl p-6 md:p-8 text-center shadow-lg relative group">
      <div className="absolute inset-0 bg-[#C9A96E]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
      <span className="font-mono font-black text-3xl md:text-6xl text-white block tracking-tight">
        {String(value).padStart(2, "0")}
      </span>
      <span className="block text-[#8C8580]/60 text-[10px] font-mono mt-3 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
