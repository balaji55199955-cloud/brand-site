"use client";  
  
import React, { useState } from "react";  
import { motion } from "framer-motion";  
import { Zap, BarChart3, Puzzle, Network, Sparkles, Smartphone, Cpu, ShieldCheck } from "lucide-react";  
  
type CardData = {  
  icon: React.ElementType;  
  title: string;  
  description: string;  
  iconColor: string;  
  ui: React.ReactNode;  
};  
  
const cards: CardData[] = [  
  {  
    icon: Smartphone,  
    title: "Instant Verification",  
    description: "Tap the embedded NTAG 424 DNA NFC chip with any smartphone to verify the physical garment instantly.",  
    iconColor: "#C9A96E",  
    ui: (  
      <div className="relative w-full h-full flex items-center justify-center">  
        <div className="relative w-[180px] h-[180px]">  
          <div className="absolute inset-0 rounded-full bg-[#C9A96E]/5 blur-[20px]" />  
          <div className="absolute inset-[10px] rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-inner backdrop-blur-[2px]" />  
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-[220deg]">  
            <circle  
              cx="50"  
              cy="50"  
              r="40"  
              fill="none"  
              stroke="#C9A96E"  
              strokeOpacity="0.1"  
              strokeWidth="4"  
              strokeDasharray="180 360"  
              strokeLinecap="round"  
            />  
            <motion.circle  
              cx="50"  
              cy="50"  
              r="40"  
              fill="none"  
              stroke="#C9A96E"  
              strokeWidth="5"  
              strokeDasharray="180 360"  
              initial={{ strokeDashoffset: 180 }}  
              animate={{ strokeDashoffset: [180, 40, 100, 20] }}  
              transition={{ duration: 4, repeat: Infinity as number, ease: "easeInOut" as const }}  
              strokeLinecap="round"  
              className="drop-shadow-[0_0_15px_rgba(201,169,110,1)]"  
            />  
            <circle  
              cx="50"  
              cy="50"  
              r="34"  
              fill="none"  
              stroke="white"  
              strokeOpacity="0.05"  
              strokeWidth="0.5"  
            />  
          </svg>  
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111111] border border-[#C9A96E]/50 shadow-[0_0_30px_#C9A96E] z-20 flex items-center justify-center">  
            <div className="w-4 h-4 rounded-full bg-[#C9A96E] flex items-center justify-center">  
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />  
            </div>  
          </div>  
          <motion.div  
            animate={{ rotate: [-40, 140, 80, 200] }}  
            transition={{ duration: 4, repeat: Infinity as number, ease: "easeInOut" as const }}  
            className="absolute top-1/2 left-1/2 w-[2px] h-[90px] origin-bottom -translate-x-1/2 -translate-y-full z-10"  
          >  
            <div className="w-full h-full bg-gradient-to-t from-[#C9A96E] via-[#C9A96E] to-white rounded-full relative">  
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white blur-[4px] rounded-full opacity-60" />  
            </div>  
          </motion.div>  
          {[...Array(18)].map((_: unknown, i: number) => (  
            <div  
              key={i}  
              className="absolute top-1/2 left-1/2 w-[1px] h-3 bg-white/30 origin-[0_100px] rounded-full"  
              style={{ transform: "translate(-50%, -50%) rotate(" + (i * 12 - 108) + "deg) translateY(-50px)" } as React.CSSProperties}  
            />  
          ))}  
        </div>  
      </div>  
    )  
  },  
  {  
    icon: Cpu,  
    title: "Unclonable Security",  
    description: "AES-128 cryptographic keys generate dynamic validation URLs on every tap to completely block replay attacks.",  
    iconColor: "#C9A96E",  
    ui: (  
      <div className="relative w-full h-[180px] flex items-end justify-center gap-5 px-10 pb-6">  
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[150px] bg-[#C9A96E]/10 blur-[60px] rounded-full" />  
        <div className="absolute inset-0 flex flex-col justify-between py-8 px-12 opacity-10">  
          {[...Array(6)].map((_: unknown, i: number) => (  
            <div key={i} className="w-full h-px bg-white/50" />  
          ))}  
        </div>  
        {([0.4, 0.7, 0.5, 0.9, 0.6, 0.8] as number[]).map((h: number, i: number) => (  
          <motion.div  
            key={i}  
            initial={{ height: 0 }}  
            animate={{ height: (h * 100) + "%" }}  
            transition={{ duration: 2, delay: i * 0.15, repeat: Infinity as number, repeatType: "reverse" as const }}  
            className="w-full max-w-[28px] relative group"  
          >  
            <div className="relative w-full h-full bg-[#C9A96E]/10 rounded-t-lg border border-white/10 overflow-hidden backdrop-blur-[1px]">  
              <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-[#C9A96E] via-[#4F46E5]/80 to-[#7C3AED]/60" />  
              <motion.div  
                animate={{ y: ["100%", "-100%"] }}  
                transition={{ duration: 2.5, repeat: Infinity as number, ease: "linear" as const, delay: i * 0.2 }}  
                className="absolute inset-x-0 h-1/2 bg-gradient-to-t from-transparent via-white/20 to-transparent"  
              />  
            </div>  
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-full h-1 bg-white/40 blur-[2px] rounded-full" />  
          </motion.div>  
        ))}  
      </div>  
    )  
  },  
  {  
    icon: ShieldCheck,  
    title: "Blockchain Proof",  
    description: "An immutable Polygon digital twin certificate guarantees ownership and records secondary market transfers.",  
    iconColor: "#C9A96E",  
    ui: (  
      <div className="relative w-full h-full flex items-center justify-center">  
        <div className="relative w-48 h-48">  
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A96E_1px,transparent_1px)] [background-size:20px_20px]" />  
          {([1, 1.4, 1.8] as number[]).map((scale: number, i: number) => (  
            <motion.div  
              key={i}  
              initial={{ scale: 0.5, opacity: 0 }}  
              animate={{ scale: scale, opacity: [0, 0.15, 0] }}  
              transition={{ duration: 5, repeat: Infinity as number, delay: i * 1.5 }}  
              className="absolute inset-0 border border-[#C9A96E] rounded-full"  
            />  
          ))}  
          <motion.div  
            animate={{ rotate: 360 }}  
            transition={{ duration: 40, repeat: Infinity as number, ease: "linear" as const }}  
            className="relative w-full h-full flex items-center justify-center"  
          >  
            <div className="relative w-20 h-20 bg-[#111111] rounded-3xl border-2 border-[#C9A96E] shadow-[0_0_50px_rgba(201,169,110,0.7)] z-20 flex items-center justify-center">  
              <motion.div  
                animate={{ scale: [1, 1.05, 1] }}  
                transition={{ duration: 3, repeat: Infinity as number }}  
                className="w-10 h-10 bg-gradient-to-br from-[#C9A96E] to-[#7C3AED] rounded-xl flex items-center justify-center shadow-[0_0_20px_#C9A96E]"  
              >  
                <Network className="w-6 h-6 text-white" />  
              </motion.div>  
              <div className="absolute inset-[-10px] border border-[#C9A96E]/20 rounded-3xl animate-pulse" />  
            </div>  
            {([0, 60, 120, 180, 240, 300] as number[]).map((angle: number, i: number) => (  
              <React.Fragment key={i}>  
                <div  
                  className="absolute origin-left h-[2px] bg-white/5 overflow-hidden"  
                  style={{  
                    width: "80px",  
                    left: "50%",  
                    top: "50%",  
                    transform: "rotate(" + angle + "deg) translateX(30px)"  
                  } as React.CSSProperties}  
                >  
                  <motion.div  
                    animate={{ x: ["-100%", "200%"] }}  
                    transition={{ duration: 2, repeat: Infinity as number, delay: i * 0.3 }}  
                    className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent shadow-[0_0_8px_#C9A96E]"  
                  />  
                </div>  
                <motion.div  
                  animate={{ scale: [1, 1.1, 1] }}  
                  transition={{ duration: 3, delay: i * 0.3, repeat: Infinity as number }}  
                  className="absolute w-6 h-6 bg-[#111111]/80 backdrop-blur-md rounded-xl border border-[#C9A96E]/40 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(201,169,110,0.3)]"  
                  style={{  
                    transform: "rotate(" + angle + "deg) translateY(-85px) rotate(-" + angle + "deg)"  
                  } as React.CSSProperties}  
                >  
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] shadow-[0_0_8px_#C9A96E]" />  
                </motion.div>  
              </React.Fragment>  
            ))}  
          </motion.div>  
        </div>  
      </div>  
    )  
  }  
];  
  
function Card({ card, index }: { card: CardData; index: number }) {  
  const [_isHovered, setIsHovered] = useState(false);  
  
  return (  
    <motion.div  
      initial={{ opacity: 0, y: 40 }}  
      whileInView={{ opacity: 1, y: 0 }}  
      viewport={{ once: true }}  
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.21, 0.45, 0.32, 0.9] as const }}  
      onMouseEnter={() => setIsHovered(true)}  
      onMouseLeave={() => setIsHovered(false)}  
      className="relative w-full h-[420px] bg-[#111111] rounded-[32px] border border-white/[0.08] overflow-hidden group shadow-2xl"  
    >  
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,169,110,0.05),transparent_70%)]" />  
      <div className="absolute inset-0 pointer-events-none rounded-[32px] border border-white/[0.08]" />  
      <div className="relative h-full flex flex-col p-8 gap-5 z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">  
        <div className="flex-1 flex items-center justify-center min-h-[180px]">  
          {card.ui}  
        </div>  
        <div>  
          <div className="flex items-center gap-3 mb-3">  
            <div className="w-8 h-8 rounded-lg bg-[#C9A96E] flex items-center justify-center shadow-[0_0_15px_rgba(201,169,110,0.4)]">  
              <card.icon className="w-4 h-4 text-white" />  
            </div>  
            <h3 className="text-white text-2xl font-medium leading-tight">  
              {card.title}  
            </h3>  
          </div>  
          <p className="text-[#8C8580] text-[15px] leading-relaxed max-w-[320px]">  
            {card.description}  
          </p>  
        </div>  
      </div>  
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#C9A96E] blur-[120px] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />  
    </motion.div>  
  );  
}  
  
export default function P01WhyUsStorva({ className }: { className?: string }) {  
  return (  
    <>  
      <section className={"relative w-full py-16 md:py-24 lg:py-[120px] bg-[#111111] overflow-hidden " + (className || "")}>  
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#C9A96E]/5 blur-[150px] pointer-events-none" />  
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24">  
          <div className="flex flex-col items-center mb-12 md:mb-20 text-center">  
            <motion.div  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const }}  
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#1A1A1A] backdrop-blur-xl px-5 py-2 mb-6 md:mb-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]"  
            >  
              <Sparkles className="w-4 h-4 text-[#C9A96E] fill-[#C9A96E]/20" />  
              <span className="uppercase tracking-[0.05em] text-[11px] font-medium text-white/90">PHYGITAL TECHNOLOGY</span>  
            </motion.div>  
  
            <motion.h2  
              initial={{ opacity: 0, y: 30 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ duration: 1.2, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.1 }}  
              className="font-display text-white text-[32px] sm:text-[42px] md:text-[56px] lg:text-[64px] leading-[1.2] md:leading-tight mb-4"  
            >  
              <span className="font-sans font-light">The Proof of</span>{" "}  
              <span className="italic text-[#C9A96E] font-medium drop-shadow-[0_0_15px_rgba(201,169,110,0.5)]">Ownership</span>  
            </motion.h2>  
  
            <motion.p  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.2 }}  
              className="text-[#8C8580] text-[15px] md:text-[17px] max-w-2xl px-4"  
            >  
              Fusing mechanical motorsport details with state-of-the-art encryption keys.  
            </motion.p>  
          </div>  
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-[24px]">  
            {cards.map((card: CardData, idx: number) => (  
              <Card key={idx} card={card} index={idx} />  
            ))}  
          </div>  
        </div>  
      </section>  
    </>  
  );  
}