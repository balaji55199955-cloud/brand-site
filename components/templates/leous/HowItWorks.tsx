"use client";  
  
import React, { useState } from "react";  
import { motion, AnimatePresence } from "framer-motion";  
import {  
  Search,  
  Settings,  
  TrendingUp,  
  BarChart2,  
  Terminal,  
  Zap,  
  Activity,  
  Users,  
  Code,
  Smartphone,
  Cpu,
  Key,
  ShieldCheck
} from "lucide-react";  
  
interface StepContent {  
  id: string;  
  number: string;  
  title: string;  
  subtitle: string;  
  description: string;  
  ui: React.ReactNode;  
}  
  
export default function HowItWorks01({ className }: { className?: string }) {  
  const [activeStep, setActiveStep] = useState(1);  
  
  const steps: StepContent[] = [  
    {  
      id: "waitlist",  
      number: "01",  
      title: "Join the Waitlist",  
      subtitle: "01 WAITLIST",  
      description: "Submit your email to secure your priority queue position. Early access links are dispatched to waitlist members first.",  
      ui: (  
        <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-6">  
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">  
            {[1, 2, 3, 4].map((i) => (  
              <motion.div  
                key={i}  
                initial={{ opacity: 0, scale: 0.9 }}  
                animate={{ opacity: 1, scale: 1 }}  
                transition={{ delay: i * 0.1 }}  
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3"  
              >  
                <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/20 flex items-center justify-center">  
                  {i === 1 && <Users className="w-4 h-4 text-[#C9A96E]" />}  
                  {i === 2 && <Key className="w-4 h-4 text-[#C9A96E]" />}  
                  {i === 3 && <Activity className="w-4 h-4 text-[#C9A96E]" />}  
                  {i === 4 && <Zap className="w-4 h-4 text-[#C9A96E]" />}  
                </div>  
                <div className="h-2 w-2/3 bg-white/20 rounded-full" />  
                <div className="h-2 w-1/2 bg-white/10 rounded-full" />  
              </motion.div>  
            ))}  
          </div>  
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">  
            <motion.path  
              d="M 100 100 Q 200 150 300 100"  
              stroke="#C9A96E"  
              strokeWidth="2"  
              fill="none"  
              initial={{ pathLength: 0 }}  
              animate={{ pathLength: 1 }}  
              transition={{ duration: 2, repeat: Infinity as number }}  
            />  
          </svg>  
        </div>  
      )  
    },  
    {  
      id: "purchase",  
      number: "02",  
      title: "Secure Your Piece",  
      subtitle: "02 SECURE PIECE",  
      description: "When the drop window opens, complete your order using safe, unified payment methods (Razorpay). Only 10 pieces exist in Drop 001.",  
      ui: (  
        <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 lg:p-6 gap-4 lg:gap-6">  
          <div className="w-full max-w-[400px] bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 relative z-0">  
            <div className="flex justify-between items-center mb-8">  
              <h4 className="text-white text-sm font-medium">Drop Release Queue</h4>  
              <div className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded border border-white/10">In Stock</div>  
            </div>  
            <div className="flex items-end justify-between h-32 gap-2">  
              {[90, 75, 50, 40, 25, 10, 0].map((h, i) => (  
                <div key={i} className="flex-1 flex flex-col items-center gap-2">  
                  <motion.div  
                    initial={{ height: 0 }}  
                    animate={{ height: h + "%" }}  
                    className="w-full bg-[#C9A96E]/20 rounded-t-sm relative overflow-hidden"  
                  >  
                    <motion.div  
                      initial={{ height: 0 }}  
                      animate={{ height: "40%" }}  
                      className="absolute bottom-0 inset-x-0 bg-[#C9A96E]"  
                    />  
                  </motion.div>  
                  <span className="text-[8px] text-white/40">{"D" + (i + 1)}</span>  
                </div>  
              ))}  
            </div>  
            <div className="mt-8 pt-6 border-t border-white/5 flex gap-8">  
              <div>  
                <div className="flex items-center gap-2 text-[10px] text-white/40 mb-1">  
                  <Users className="w-3 h-3" /> Buyers  
                </div>  
                <div className="text-white font-bold text-lg">10 Only</div>  
              </div>  
              <div>  
                <div className="flex items-center gap-2 text-[10px] text-white/40 mb-1">  
                  <Zap className="w-3 h-3 text-[#C9A96E]" /> Swaps  
                </div>  
                <div className="text-white font-bold text-lg">None</div>  
              </div>  
            </div>  
          </div>  
        </div>  
      )  
    },  
    {  
      id: "verify",  
      number: "03",  
      title: "Activate On-Chain Twin",  
      subtitle: "03 ACTIVATE TWIN",  
      description: "Receive the physical garment. Tap the smartphone on the NFC chip to automatically unlock ownership claiming and mint the digital Polygon certificate.",  
      ui: (  
        <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-6">  
          <div className="relative w-64 h-64 rounded-full border border-white/5 flex items-center justify-center">  
            <motion.div  
              animate={{ rotate: 360 }}  
              transition={{ duration: 20, repeat: Infinity as number, ease: "linear" as const }}  
              className="absolute inset-0"  
            >  
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#C9A96E] rounded-xl flex items-center justify-center">  
                <Smartphone className="w-5 h-5 text-white" />  
              </div>  
            </motion.div>  
            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#C9A96E]/20 to-transparent border border-white/10 flex flex-col items-center justify-center">  
              <ShieldCheck className="w-12 h-12 text-[#C9A96E] mb-2" />  
              <span className="text-2xl font-bold text-white">Twin Active</span>  
              <span className="text-[10px] text-white/40">Verified Owner</span>  
            </div>  
          </div>  
        </div>  
      )  
    }  
  ];  
  
  return (  
    <>  
      <section className={"py-20 bg-[#0A0A0A] overflow-hidden " + (className || "")}>  
        <div className="max-w-[1248px] mx-auto px-6">  
          <div className="flex flex-col items-center text-center mb-16">  
            <motion.div  
              initial={{ opacity: 0, scale: 0.9 }}  
              whileInView={{ opacity: 1, scale: 1 }}  
              viewport={{ once: true }}  
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"  
            >  
              <div className="w-4 h-4 rounded-sm bg-[#C9A96E]/20 flex items-center justify-center">  
                <Zap className="w-2.5 h-2.5 text-[#C9A96E]" />  
              </div>  
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">Ownership Pipeline</span>  
            </motion.div>  
  
            <motion.h2  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              className="text-4xl md:text-5xl lg:text-[56px] font-sans text-white leading-[1.1] mb-6"  
            >  
              How It <span className="font-display italic text-[#C9A96E] drop-shadow-[0_0_15px_rgba(201,169,110,0.5)]">Works</span>  
            </motion.h2>  
  
            <motion.p  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ delay: 0.1 }}  
              className="text-[#8C8580] text-base md:text-lg max-w-2xl"  
            >  
              Three steps from waitlist submission to cryptographically guaranteed on-chain twin.  
            </motion.p>  
          </div>  
  
          <div className="mt-[64px] bg-[#1A1A1A]/30 backdrop-blur-xl border border-white/10 rounded-[32px] p-4 md:p-8 relative group">  
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">  
              <svg className="w-full h-full" preserveAspectRatio="none">  
                <motion.rect  
                  width="100%"  
                  height="100%"  
                  rx="32"  
                  fill="none"  
                  stroke="#C9A96E"  
                  strokeWidth="2"  
                  pathLength="1"  
                  strokeDasharray="0.1 0.9"  
                  animate={{ strokeDashoffset: [0, -1] }}  
                  transition={{ duration: 6, repeat: Infinity as number, ease: "linear" as const }}  
                  style={{ filter: "drop-shadow(0 0 8px #C9A96E)" }}  
                />  
              </svg>  
            </div>  
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-[#C9A96E] blur-xl opacity-30 rounded-full" />  
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">  
              {steps.map((step, idx) => (  
                <button  
                  key={step.id}  
                  onClick={() => setActiveStep(idx + 1)}  
                  className={"relative flex items-center justify-center gap-4 py-4 px-6 rounded-2xl transition-all duration-300 border " + (activeStep === idx + 1 ? "bg-[#C9A96E]/10 border-[#C9A96E]/50 shadow-[0_0_20px_rgba(201,169,110,0.15)]" : "bg-white/5 border-white/5 hover:bg-white/10")}  
                >  
                  <div className={"w-10 h-10 rounded-[6px] flex items-center justify-center text-sm font-bold border " + (activeStep === idx + 1 ? "bg-[#C9A96E]/20 border-[#C9A96E] text-[#C9A96E]" : "bg-white/5 border-white/10 text-white/40")}>  
                    {step.number}  
                  </div>  
                  <span className={"text-[12px] font-semibold tracking-wider uppercase " + (activeStep === idx + 1 ? "text-white" : "text-white/40")}>  
                    {step.subtitle}  
                  </span>  
                  {activeStep === idx + 1 && (  
                    <motion.div  
                      layoutId="tab-glow"  
                      className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent shadow-[0_0_10px_#C9A96E]"  
                    />  
                  )}  
                </button>  
              ))}  
            </div>  
  
            <div className="min-h-0 lg:min-h-[450px] lg:border lg:border-white/10 lg:rounded-[24px] p-0 lg:p-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">  
              <div className="w-full lg:w-1/2 h-[450px] bg-[#1A1A1A]/30 border border-white/10 rounded-[24px] relative overflow-hidden flex items-center justify-center">  
                <AnimatePresence mode="wait">  
                  <motion.div  
                    key={activeStep}  
                    initial={{ opacity: 0, x: -20 }}  
                    animate={{ opacity: 1, x: 0 }}  
                    exit={{ opacity: 0, x: 20 }}  
                    transition={{ duration: 0.4 }}  
                    className="w-full h-full"  
                  >  
                    {steps[activeStep - 1].ui}  
                  </motion.div>  
                </AnimatePresence>  
              </div>  
  
              <div className="w-full lg:w-1/2">  
                <AnimatePresence mode="wait">  
                  <motion.div  
                    key={activeStep}  
                    initial={{ opacity: 0, y: 20 }}  
                    animate={{ opacity: 1, y: 0 }}  
                    exit={{ opacity: 0, y: -20 }}  
                    transition={{ duration: 0.4 }}  
                  >  
                    <span className="text-[#C9A96E] font-bold text-3xl mb-4 block">  
                      {steps[activeStep - 1].number}  
                    </span>  
                    <h3 className="text-white text-3xl md:text-4xl font-normal mb-6 tracking-tight">  
                      {steps[activeStep - 1].title}  
                    </h3>  
                    <p className="text-[#8C8580] text-base md:text-lg leading-relaxed font-normal">  
                      {steps[activeStep - 1].description}  
                    </p>  
                  </motion.div>  
                </AnimatePresence>  
              </div>  
            </div>  
          </div>  
        </div>  
      </section>  
    </>  
  );  
}