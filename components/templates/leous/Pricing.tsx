"use client";  
  
import React, { useState, useEffect } from "react";  
import { motion, animate } from "framer-motion";  
import { Tag, Check, ArrowRight } from "lucide-react";  
import Image from "next/image";  
  
interface PricingPlan {  
  id: string;  
  name: string;  
  tagline: string;  
  price: number;  
  originalPrice?: number;  
  priceFooter: string;  
  features: string[];  
  buttonText: string;  
  highlight?: boolean;  
}  
  
const plans: PricingPlan[] = [  
  {  
    id: "starter",  
    name: "Starter",  
    tagline: "For solo marketers and small teams",  
    price: 99,  
    originalPrice: 199,  
    priceFooter: "per month, +$49 per additional brand",  
    buttonText: "Get Started",  
    features: [  
      "Up to $1,000,000 annual revenue",  
      "Unlimited usage",  
      "Up to 5 users",  
      "Unlimited integrations"  
    ]  
  },  
  {  
    id: "growth",  
    name: "Growth",  
    tagline: "For growing agencies and teams",  
    price: 399,  
    originalPrice: 799,  
    priceFooter: "per month, +$179 per additional brand",  
    buttonText: "Get Started",  
    highlight: true,  
    features: [  
      "Up to $10,000,000 annual revenue",  
      "Unlimited usage",  
      "Up to 20 users",  
      "Unlimited integrations"  
    ]  
  },  
  {  
    id: "enterprise",  
    name: "Enterprise",  
    tagline: "For large agencies and enterprises",  
    price: 1000,  
    originalPrice: 1999,  
    priceFooter: "per month, +$400 per additional brand",  
    buttonText: "Get Started",  
    features: [  
      "Unlimited revenue",  
      "Unlimited usage",  
      "Unlimited users",  
      "Unlimited integrations"  
    ]  
  }  
];  
  
function Counter({ value, className }: { value: number; className?: string }) {  
  const [displayValue, setDisplayValue] = useState(0);  
  
  useEffect(() => {  
    const animation = animate(0, value, {  
      duration: 2,  
      ease: "easeOut" as const,  
      onUpdate: (latest: number) => setDisplayValue(Math.round(latest)),  
    });  
  
    return animation.stop;  
  }, [value]);  
  
  return <span className={className}>{"$" + displayValue}</span>;  
}  
  
export default function Pricing01({ className }: { className?: string }) {  
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);  
  const [_isExpertHovered, setIsExpertHovered] = useState(false);  
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");  
  
  return (  
    <>  
      <link rel="preconnect" href="https://fonts.googleapis.com" />  
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />  
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />  
  
      <section className={"py-20 bg-[#0A0A0A] overflow-hidden " + (className || "")}>  
        <div className="max-w-[1248px] mx-auto px-4 md:px-8 lg:px-0">  
          {/* Header Section */}  
          <div className="flex flex-col items-center text-center mb-12">  
            <motion.div  
              initial={{ opacity: 0, scale: 0.9 }}  
              whileInView={{ opacity: 1, scale: 1 }}  
              viewport={{ once: true }}  
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"  
            >  
              <div className="w-4 h-4 rounded-sm bg-[#C9A96E]/20 flex items-center justify-center">  
                <Tag className="w-2.5 h-2.5 text-[#C9A96E]" />  
              </div>  
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">Pricing</span>  
            </motion.div>  
  
            <motion.h2  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              className="text-4xl md:text-5xl lg:text-[56px] font-sans text-white leading-[1.1] mb-6"  
            >  
              Plans and <span className="font-display italic text-[#C9A96E] drop-shadow-[0_0_15px_rgba(201,169,110,0.5)]">Pricing</span>  
            </motion.h2>  
  
            <motion.p  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ delay: 0.1 }}  
              className="text-[#8C8580] text-lg max-w-2xl mb-16"  
            >  
              Flexible plans designed to scale your automation with <span className="text-[#C9A96E]">ease</span>.  
            </motion.p>  
  
            {/* Toggle */}  
            <div className="flex flex-col sm:flex-row items-center gap-4 p-1.5 rounded-2xl sm:rounded-full bg-[#1A1A1A] border border-white/10">  
              <button  
                onClick={() => setBillingCycle("monthly")}  
                className={"w-full sm:w-auto px-8 py-2.5 rounded-xl sm:rounded-full text-sm md:text-base font-bold transition-all duration-300 " + (billingCycle === "monthly" ? "bg-[#C9A96E] text-white shadow-[0_0_20px_rgba(201,169,110,0.3)]" : "text-white/40 hover:text-white")}  
              >  
                Monthly  
              </button>  
              <button  
                onClick={() => setBillingCycle("annual")}  
                className={"w-full sm:w-auto px-4 sm:px-8 py-2.5 rounded-xl sm:rounded-full text-sm md:text-base font-bold transition-all duration-300 flex items-center justify-center gap-3 " + (billingCycle === "annual" ? "bg-[#C9A96E] text-white shadow-[0_0_20px_rgba(201,169,110,0.3)]" : "text-white/40 hover:text-white")}  
              >  
                Annual  
                <div className={"px-2.5 py-1 rounded-md sm:rounded-full border border-white/20 bg-white/10 text-[10px] md:text-xs font-bold transition-colors " + (billingCycle === "annual" ? "text-white" : "text-[#C9A96E]")}>  
                  Get 2 Months Free  
                </div>  
              </button>  
            </div>  
          </div>  
  
          {/* Pricing Grid */}  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 mb-6 justify-items-center">  
            {plans.map((plan: PricingPlan, index: number) => {  
              const isActive = hoveredPlan ? hoveredPlan === plan.id : plan.highlight;  
  
              return (  
                <motion.div  
                  key={plan.id}  
                  initial={{ opacity: 0, y: 15 }}  
                  whileInView={{ opacity: 1, y: 0 }}  
                  viewport={{ once: true }}  
                  transition={{ duration: 1.2, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] as const }}  
                  onMouseEnter={() => setHoveredPlan(plan.id)}  
                  onMouseLeave={() => setHoveredPlan(null)}  
                  className={"relative w-full lg:max-w-[400px] h-full bg-[#1A1A1A]/30 backdrop-blur-xl border rounded-[32px] p-8 md:p-12 lg:p-8 flex flex-col transition-all duration-500 overflow-hidden " + (isActive ? "border-[#C9A96E]/50 shadow-[0_0_40px_rgba(201,169,110,0.1)] translate-y-[-8px] lg:scale-[1.02] z-10" : "border-white/10 hover:border-white/20")}  
                >  
                  {/* Static Border */}  
                  <div className="absolute inset-0 pointer-events-none rounded-[32px] border border-white/10" />  
  
                  {/* Content */}  
                  <motion.div  
                    initial={{ opacity: 0, y: 10 }}  
                    whileInView={{ opacity: 1, y: 0 }}  
                    viewport={{ once: true }}  
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}  
                  >  
                    <h3 className="text-white text-2xl font-normal mb-4">{plan.name}</h3>  
                    <p className="text-[#8C8580] text-[18px] font-normal mb-6">{plan.tagline}</p>  
                  </motion.div>  
  
                  <motion.div  
                    initial={{ opacity: 0, y: 10 }}  
                    whileInView={{ opacity: 1, y: 0 }}  
                    viewport={{ once: true }}  
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}  
                    className="flex items-baseline gap-4"  
                  >  
                    <Counter value={plan.price} className="text-4xl md:text-5xl lg:text-[56px] font-sans text-white leading-none" />  
                    {plan.originalPrice && (  
                      <Counter value={plan.originalPrice} className="text-2xl md:text-3xl text-white/20 line-through font-light" />  
                    )}  
                  </motion.div>  
  
                  <motion.p  
                    initial={{ opacity: 0 }}  
                    whileInView={{ opacity: 1 }}  
                    viewport={{ once: true }}  
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}  
                    className="text-[#8C8580] text-[18px] font-normal mt-4 mb-8"  
                  >  
                    {plan.priceFooter}  
                  </motion.p>  
  
                  <motion.div  
                    initial={{ opacity: 0, y: 10 }}  
                    whileInView={{ opacity: 1, y: 0 }}  
                    viewport={{ once: true }}  
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}  
                  >  
                    <button  
                      className={"w-full py-4 rounded-full text-sm font-bold border transition-all duration-300 " + (isActive ? "bg-[#C9A96E] border-[#C9A96E] text-white shadow-[0_0_20px_rgba(201,169,110,0.3)]" : "bg-transparent border-white/20 text-white hover:bg-white/5")}  
                    >  
                      {plan.buttonText}  
                    </button>  
                  </motion.div>  
  
                  <motion.div  
                    initial={{ opacity: 0 }}  
                    whileInView={{ opacity: 1 }}  
                    viewport={{ once: true }}  
                    transition={{ duration: 1, delay: 0.7 + index * 0.1 }}  
                    className="mt-8 pt-8 border-t border-white/5"  
                  >  
                    <h4 className="text-white text-2xl font-normal mb-[32px]">What&apos;s included:</h4>  
                    <ul className="space-y-3">  
                      {plan.features.map((feature: string, idx: number) => (  
                        <li key={idx} className="flex items-center gap-3 text-[#8C8580] text-[18px] font-normal">  
                          <Check className="w-5 h-5 text-[#C9A96E] flex-shrink-0" />  
                          {feature}  
                        </li>  
                      ))}  
                    </ul>  
                  </motion.div>  
  
                  <motion.div  
                    initial={{ opacity: 0, y: 5 }}  
                    whileInView={{ opacity: 1, y: 0 }}  
                    viewport={{ once: true }}  
                    transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}  
                    className="mt-8 pt-8 flex justify-center"  
                  >  
                    <button className="flex items-center gap-2 group">  
                      <span className="text-white text-xl font-medium transition-colors duration-300 group-hover:text-[#C9A96E]">Contact Sales</span>  
                      <ArrowRight className="w-5 h-5 text-white transition-all duration-300 group-hover:text-[#C9A96E] group-hover:translate-x-1" />  
                    </button>  
                  </motion.div>  
                </motion.div>  
              );  
            })}  
          </div>  
  
          {/* Expert Footer */}  
          <div  
            onMouseEnter={() => setIsExpertHovered(true)}  
            onMouseLeave={() => setIsExpertHovered(false)}  
            className="relative bg-[#1A1A1A]/30 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 md:p-12 overflow-hidden group"  
          >  
            {/* Static Border */}  
            <div className="absolute inset-0 pointer-events-none rounded-[32px] border border-white/10" />  
  
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 transition-transform duration-500 group-hover:translate-y-[-2px]">  
              <div className="max-w-md text-center lg:text-left">  
                <h2 className="text-white text-2xl md:text-[32px] font-normal mb-4">Need a Human Expert?</h2>  
                <p className="text-[#8C8580] text-base md:text-[18px] font-normal">  
                  Talk to our automation experts and find the right strategy for your business.  
                </p>  
              </div>  
  
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 md:gap-8">  
                {/* Expert */}  
                <div className="flex items-center gap-4">  
                  <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/10 flex-shrink-0">  
                    <Image src="https://picsum.photos/seed/expert2/200/200" alt="Nina Fernandes" fill className="object-cover" />  
                  </div>  
                  <div className="text-left">  
                    <div className="text-white text-base md:text-lg font-bold">Nina Fernandes</div>  
                    <div className="text-[10px] md:text-xs text-[#C9A96E] font-bold">ex-Dyson, AWA Digital, Blubolt</div>  
                  </div>  
                </div>  
  
                {/* Coaches Counter */}  
                <div className="flex items-center gap-4 sm:pl-8 sm:border-l border-white/10">  
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#C9A96E]/50 bg-[#C9A96E]/10 flex items-center justify-center text-xl md:text-2xl font-bold text-[#C9A96E] shadow-[0_0_20px_rgba(201,169,110,0.2)] flex-shrink-0">  
                    40+  
                  </div>  
                  <div className="text-[10px] md:text-xs text-white/40 font-bold uppercase tracking-widest leading-normal text-left">  
                    Available <br /> Growth Coaches  
                  </div>  
                </div>  
              </div>  
            </div>  
          </div>  
        </div>  
      </section>  
    </>  
  );  
}