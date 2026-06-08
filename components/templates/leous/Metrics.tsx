"use client";  
  
import React, { useEffect, useState, useRef } from "react";  
import { motion, useInView } from "framer-motion";  
import { Quote } from "lucide-react";  
  
interface CountUpProps {  
  end: number;  
  duration?: number;  
  decimals?: number;  
}  
  
function CountUp({ end, duration = 2, decimals = 0 }: CountUpProps) {  
  const [count, setCount] = useState(0);  
  const nodeRef = useRef<HTMLSpanElement>(null);  
  const isInView = useInView(nodeRef, { once: true });  
  
  useEffect(() => {  
    if (!isInView) return;  
  
    let startTimestamp: number | null = null;  
    const step = (timestamp: number) => {  
      if (!startTimestamp) startTimestamp = timestamp;  
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);  
      const easedProgress = 1 - Math.pow(1 - progress, 2);  
      setCount(easedProgress * end);  
      if (progress < 1) {  
        window.requestAnimationFrame(step);  
      }  
    };  
    window.requestAnimationFrame(step);  
  }, [end, duration, isInView]);  
  
  return <span ref={nodeRef}>{count.toFixed(decimals)}</span>;  
}  
  
const metrics = [  
  { value: 10, suffix: "m+", label: "Workflows automated every month" },  
  { value: 500, suffix: "+", label: "Teams actively using Violet" },  
  { value: 99, suffix: "%", label: "Uptime SLA across all plans" },  
  { value: 4, suffix: "x", label: "Faster than building workflows manually" }  
];  
  
export default function Metrics01({ className }: { className?: string }) {  
  const [isMounted, setIsMounted] = useState(false);  
  
  useEffect(() => {  
    setIsMounted(true);  
  }, []);  
  
  if (!isMounted) return null;  
  
  return (  
    <>  
      <link rel="preconnect" href="https://fonts.googleapis.com" />  
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />  
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />  
  
      <section className={"relative w-full py-16 md:py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden " + (className || "")}>  
        {/* Background Gradients */}  
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C9A96E]/5 blur-[120px] pointer-events-none" />  
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#4F46E5]/5 blur-[120px] pointer-events-none" />  
  
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24">  
          {/* Section Header */}  
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">  
            <div className="max-w-2xl">  
              <motion.h2  
                initial={{ opacity: 0, y: 20 }}  
                whileInView={{ opacity: 1, y: 0 }}  
                viewport={{ once: true }}  
                className="text-4xl md:text-5xl lg:text-6xl font-sans text-white leading-tight"  
              >  
                Results that <span className="font-serif italic text-[#C9A96E] drop-shadow-[0_0_15px_rgba(201,169,110,0.5)]">speak</span> <br />  
                for <span className="font-serif italic text-[#C9A96E] drop-shadow-[0_0_15px_rgba(201,169,110,0.5)]">themselves</span>  
              </motion.h2>  
            </div>  
            <motion.p  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ delay: 0.2 }}  
              className="text-[#8C8580] text-base md:text-lg max-w-[280px] leading-relaxed"  
            >  
              Real results from real teams using <span className="text-white">Violet</span> every day.  
            </motion.p>  
          </div>  
  
          {/* Rows Grid */}  
          <div className="flex flex-col gap-6">  
            {/* Row 1: Metrics (4 Cards) */}  
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">  
              {metrics.map((metric, idx) => (  
                <motion.div  
                  key={idx}  
                  initial={{ opacity: 0, y: 20 }}  
                  whileInView={{ opacity: 1, y: 0 }}  
                  viewport={{ once: true }}  
                  transition={{ delay: idx * 0.1 }}  
                  className="relative h-[300px] bg-[#1A1A1A]/30 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col group overflow-hidden"  
                >  
                  {/* Static Border */}  
                  <div className="absolute inset-0 rounded-[32px] border border-white/10 pointer-events-none" />  
                  <div className="absolute inset-0 bg-[#C9A96E]/5 blur-[80px] opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />  
  
                  {/* Top 3 Rectangles */}  
                  <div className="flex gap-1 mb-10">  
                    {[0, 1, 2].map((i) => (  
                      <div key={i} className="w-[10px] h-[6px] bg-white/40 rounded-[2px]" />  
                    ))}  
                  </div>  
  
                  {/* Metric Value */}  
                  <div className="mb-4 flex items-baseline gap-1">  
                    <h3 className="font-sans font-normal text-white text-4xl sm:text-5xl md:text-5xl lg:text-[5.5rem] leading-none tracking-tighter">  
                      <CountUp end={metric.value} />  
                    </h3>  
                    <span className="font-sans text-[32px] sm:text-[42px] md:text-[56px] lg:text-[64px] text-[#C9A96E] leading-none">  
                      {metric.suffix}  
                    </span>  
                  </div>  
  
                  {/* Metric Label */}  
                  <p className="text-[#8C8580] text-base md:text-lg font-normal leading-tight">  
                    {metric.label}  
                  </p>  
                </motion.div>  
              ))}  
            </div>  
  
            {/* Row 2: Testimonial & Offer */}  
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">  
              {/* Testimonial Card */}  
              <motion.div  
                initial={{ opacity: 0, y: 20 }}  
                whileInView={{ opacity: 1, y: 0 }}  
                viewport={{ once: true }}  
                className="relative h-[300px] bg-[#1A1A1A]/30 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col transition-transform duration-500"  
              >  
                <div className="flex-1">  
                  <div className="mb-6">  
                    <Quote className="w-10 h-10 text-[#C9A96E] fill-[#C9A96E]/20" />  
                  </div>  
                  <p className="text-white text-lg md:text-xl lg:text-2xl font-light italic leading-tight max-w-lg">  
                    &quot;Automated our messy manual workflows in <span className="text-[#C9A96E] font-medium not-italic">under a week</span>. Violet just works for us.&quot;  
                  </p>  
                </div>  
  
                {/* Author Info */}  
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">  
                  <div className="flex items-center gap-4">  
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 ring-1 ring-[#C9A96E]/20">  
                      <img  
                        src="https://picsum.photos/seed/james/100/100"  
                        alt="James M."  
                        className="w-full h-full object-cover"  
                      />  
                    </div>  
                    <div>  
                      <h4 className="text-white font-medium text-sm md:text-base">James M.</h4>  
                      <p className="text-[#8C8580] text-[10px] md:text-xs">CTO, Capsule AI</p>  
                    </div>  
                  </div>  
  
                  {/* Company Logo Group */}  
                  <div className="flex items-center gap-2">  
                    <div className="relative flex items-center">  
                      <div className="w-5 h-5 rounded-full bg-[#C9A96E] opacity-60" />  
                      <div className="w-5 h-5 rounded-full bg-[#4F46E5] opacity-60 -ml-3" />  
                    </div>  
                    <span className="text-white font-semibold text-sm md:text-base tracking-tight">Capsule</span>  
                  </div>  
                </div>  
              </motion.div>  
  
              {/* CTA Offering Card */}  
              <motion.div  
                initial={{ opacity: 0, y: 20 }}  
                whileInView={{ opacity: 1, y: 0 }}  
                viewport={{ once: true }}  
                className="relative h-[300px] bg-[#1A1A1A]/30 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col justify-center transition-transform duration-500"  
              >  
                <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-normal mb-8 tracking-tight leading-tight whitespace-nowrap">  
                  Your first <span className="text-[#C9A96E]">30 days</span> are free.  
                </h3>  
                <p className="text-[#8C8580] text-sm md:text-base lg:text-lg leading-relaxed max-w-md">  
                  Try every feature, automate your first workflow, and see the results before you ever pay a thing.  
                </p>  
              </motion.div>  
            </div>  
  
            {/* Row 3: Get Started Today (Full Width) */}  
            <motion.div  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              className="w-full bg-[#1A1A1A]/30 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 flex items-center justify-between"  
            >  
              <h4 className="text-white text-xl font-medium">Get started today</h4>  
              <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-white/20 bg-white/5 hover:bg-[#C9A96E] hover:border-[#C9A96E] transition-all group">  
                <svg  
                  viewBox="0 0 24 24"  
                  className="w-6 h-6 text-white transform -rotate-45 transition-transform group-hover:scale-110"  
                  fill="none"  
                  stroke="currentColor"  
                  strokeWidth={2}  
                >  
                  <path d="M5 12h14M12 5l7 7-7 7" />  
                </svg>  
              </button>  
            </motion.div>  
          </div>  
        </div>  
      </section>  
    </>  
  );  
}