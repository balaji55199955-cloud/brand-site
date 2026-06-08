"use client";  
  
import React, { useState, useEffect } from "react";  
import { motion } from "framer-motion";  
import {  
  Layers,  
  Bot,  
  LineChart,  
  Code2,  
  ShieldCheck,  
  Headphones,  
  CheckCircle2,  
  RefreshCcw,  
  Mail,  
  BarChart,  
  FileText,  
  MousePointer2,  
  Cpu  
} from "lucide-react";  
import { cn } from "@/lib/utils";  
  
interface BeamCardProps {  
  children: React.ReactNode;  
  width?: string | number;  
  className?: string;  
  delay?: number;  
}  
  
function BeamCard({ children, width = "100%", className, delay = 0 }: BeamCardProps) {  
  const [_isHovered, setIsHovered] = useState(false);  
  
  return (  
    <motion.div  
      initial={{ opacity: 0, y: 40 }}  
      whileInView={{ opacity: 1, y: 0 }}  
      viewport={{ once: true }}  
      transition={{ duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] as const }}  
      onMouseEnter={() => setIsHovered(true)}  
      onMouseLeave={() => setIsHovered(false)}  
      style={{  
        width: typeof width === "number" ? width + "px" : width,  
      }}  
      className={cn(  
        "relative bg-[#111111] rounded-[32px] border border-white/[0.08] overflow-hidden group shadow-2xl flex flex-col h-[420px] md:h-[420px]",  
        className  
      )}  
    >  
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,169,110,0.05),transparent_70%)]" />  
      <div className="absolute inset-0 pointer-events-none rounded-[32px] border border-white/[0.08]" />  
      <div className="relative h-full flex flex-col p-8 gap-5 z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">  
        {children}  
      </div>  
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#C9A96E] blur-[120px] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />  
    </motion.div>  
  );  
}  
  
function SatelliteOrbit() {  
  const [radius, setRadius] = useState(110);  
  
  useEffect(() => {  
    const updateRadius = () => {  
      setRadius(window.innerWidth < 768 ? 70 : 110);  
    };  
    updateRadius();  
    window.addEventListener("resize", updateRadius);  
    return () => window.removeEventListener("resize", updateRadius);  
  }, []);  
  
  const satellites: { Icon: React.ElementType; color: string }[] = [  
    { Icon: Mail, color: "#EA4335" },  
    { Icon: RefreshCcw, color: "#00A1E0" },  
    { Icon: BarChart, color: "#34A853" },  
    { Icon: FileText, color: "#FBBC04" },  
    { Icon: MousePointer2, color: "#C9A96E" },  
    { Icon: Cpu, color: "#00D1FF" }  
  ];  
  
  return (  
    <>  
      {satellites.map((satellite, i) => {  
        const angle = (i * 360) / 6;  
        const x = (Math.cos((angle * Math.PI) / 180) * radius).toFixed(4);  
        const y = (Math.sin((angle * Math.PI) / 180) * radius).toFixed(4);  
  
        return (  
          <React.Fragment key={i}>  
            <div className="absolute inset-0 rounded-full opacity-10" />  
            <motion.div  
              initial={{ opacity: 0 }}  
              whileInView={{ opacity: 0.15 }}  
              className="absolute top-1/2 left-1/2 h-px bg-[#C9A96E] origin-left"  
              style={{  
                width: radius + "px",  
                transform: "rotate(" + angle + "deg)"  
              }}  
            />  
            <motion.div  
              animate={{  
                y: [0, -10, 0],  
                scale: [1, 1.05, 1]  
              }}  
              transition={{  
                duration: 4,  
                repeat: Infinity as number,  
                delay: i * 0.5,  
                ease: "easeInOut" as const  
              }}  
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"  
              style={{  
                left: "calc(50% + " + x + "px)",  
                top: "calc(50% + " + y + "px)"  
              }}  
            >  
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg transition-colors">  
                <satellite.Icon className="w-4 h-4 md:w-5 md:h-5 text-white/70" />  
              </div>  
            </motion.div>  
          </React.Fragment>  
        );  
      })}  
    </>  
  );  
}  
  
export default function Services01({ className }: { className?: string }) {  
  return (  
    <>  
      <link rel="preconnect" href="https://fonts.googleapis.com" />  
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />  
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />  
  
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
              <Layers className="w-4 h-4 text-[#C9A96E]" />  
              <span className="uppercase tracking-[0.05em] text-[12px] md:text-[14px] font-medium text-white/90">Services</span>  
            </motion.div>  
  
            <motion.h2  
              initial={{ opacity: 0, y: 30 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ duration: 1.2, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.1 }}  
              className="font-display text-white text-[32px] sm:text-[42px] md:text-[56px] lg:text-[64px] leading-[1.2] md:leading-tight mb-4"  
            >  
              <span className="font-sans font-normal">Smarter Services,</span>{" "}  
              <span className="italic text-[#C9A96E] drop-shadow-[0_0_15px_rgba(201,169,110,0.5)]">Built with AI</span>  
            </motion.h2>  
  
            <motion.p  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.2 }}  
              className="text-[#8C8580] text-[16px] md:text-[18px] max-w-2xl px-4"  
            >  
              Everything you need to automate operations, boost productivity  
            </motion.p>  
          </div>  
  
          <div className="flex flex-col gap-6 md:gap-[24px]">  
            {/* Row 1 */}  
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-[24px]">  
              <div className="lg:col-span-1">  
                <BeamCard width="100%">  
                  <div className="flex-1 flex flex-col justify-center overflow-hidden">  
                    <div className="flex flex-col gap-2.5">  
                      {([  
                        { icon: FileText, label: "Data Entry Automation", active: true, loading: false },  
                        { icon: RefreshCcw, label: "Lead Follow-up", active: true, loading: false },  
                        { icon: Layers, label: "Invoice Processing", active: true, loading: false },  
                        { icon: Mail, label: "Email & Notifications", active: false, loading: true },  
                        { icon: BarChart, label: "Report Generation", active: false, loading: true }  
                      ] as { icon: React.ElementType; label: string; active: boolean; loading: boolean }[]).map((item, i) => (  
                        <motion.div  
                          key={i}  
                          initial={{ opacity: 0, x: -10 }}  
                          whileInView={{ opacity: 1, x: 0 }}  
                          transition={{ delay: 0.5 + i * 0.1 }}  
                          className="flex items-center justify-between p-3 md:p-3.5 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm"  
                        >  
                          <div className="flex items-center gap-3">  
                            <item.icon className="w-4 h-4 text-[#C9A96E]" />  
                            <span className="text-white/80 text-xs md:text-sm font-medium">{item.label}</span>  
                          </div>  
                          {item.active ? (  
                            <CheckCircle2 className="w-4 h-4 text-[#C9A96E] fill-[#C9A96E]/10" />  
                          ) : (  
                            <RefreshCcw className={cn("w-4 h-4 text-[#C9A96E]/40", item.loading && "animate-spin")} />  
                          )}  
                        </motion.div>  
                      ))}  
                    </div>  
                  </div>  
                  <div>  
                    <h3 className="text-white text-xl md:text-2xl font-medium mb-2 md:mb-3">Task Automation</h3>  
                    <p className="text-[#8C8580] text-[14px] md:text-[16px] font-normal leading-relaxed">  
                      Eliminate repetitive tasks and save hours every day with smart automation.  
                    </p>  
                  </div>  
                </BeamCard>  
              </div>  
  
              <div className="lg:col-span-2">  
                <BeamCard width="100%">  
                  <div className="flex-1 relative flex items-center justify-center overflow-hidden">  
                    <div className="relative w-full h-full max-w-[300px] md:max-w-[500px]">  
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">  
                        <div className="relative">  
                          <div className="absolute inset-0 bg-[#C9A96E] blur-[60px] opacity-20" />  
                          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-[#C9A96E] bg-[#111111] flex items-center justify-center shadow-[0_0_40px_rgba(201,169,110,0.4)]">  
                            <Bot className="w-8 h-8 md:w-12 md:h-12 text-[#C9A96E]" />  
                          </div>  
                        </div>  
                      </div>  
                      <SatelliteOrbit />  
                    </div>  
                  </div>  
                  <div className="max-w-2xl">  
                    <h3 className="text-white text-xl md:text-2xl font-medium mb-2 md:mb-3">Automated Workflows</h3>  
                    <p className="text-[#8C8580] text-[14px] md:text-[18px] font-normal leading-relaxed">  
                      Boost efficiency across teams with smart automation. Build intelligent workflows that automate multi-step processes across tools and platforms.  
                    </p>  
                  </div>  
                </BeamCard>  
              </div>  
            </div>  
  
            {/* Row 2 */}  
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-[24px]">  
              <BeamCard width="100%">  
                <div className="flex-1 flex items-center justify-center">  
                  <div className="relative w-full max-w-[200px]">  
                    <div className="absolute inset-0 bg-[#C9A96E]/10 blur-[40px] rounded-full" />  
                    <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">  
                      <LineChart className="w-12 h-12 text-[#C9A96E] mb-4" />  
                      <div className="space-y-2">  
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">  
                          <motion.div  
                            initial={{ width: 0 }}  
                            whileInView={{ width: "75%" }}  
                            transition={{ duration: 1.5, delay: 0.5 }}  
                            className="h-full bg-[#C9A96E]"  
                          />  
                        </div>  
                        <div className="h-2 w-2/3 bg-white/10 rounded-full overflow-hidden">  
                          <motion.div  
                            initial={{ width: 0 }}  
                            whileInView={{ width: "90%" }}  
                            transition={{ duration: 1.5, delay: 0.7 }}  
                            className="h-full bg-[#C9A96E]"  
                          />  
                        </div>  
                      </div>  
                    </div>  
                  </div>  
                </div>  
                <div>  
                  <h3 className="text-white text-xl font-medium mb-2">Real-Time Insights</h3>  
                  <p className="text-[#8C8580] text-[16px] font-normal leading-relaxed line-clamp-2">  
                    Track data and gain insights for faster business decisions.  
                  </p>  
                </div>  
              </BeamCard>  
  
              <BeamCard width="100%">  
                <div className="flex-1 flex items-center justify-center">  
                  <div className="relative w-full max-w-[200px]">  
                    <div className="absolute inset-0 bg-[#C9A96E]/10 blur-[40px] rounded-full" />  
                    <div className="relative px-6 py-8 rounded-2xl border border-white/10 bg-[#1A1A1A] backdrop-blur-md overflow-hidden">  
                      <div className="flex items-center gap-2 mb-4">  
                        <div className="w-2 h-2 rounded-full bg-red-500" />  
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />  
                        <div className="w-2 h-2 rounded-full bg-green-500" />  
                      </div>  
                      <pre className="text-[10px] text-white/40 leading-relaxed">  
                        <code>{"// AI Agent Logic\nfunction initAgent() {\n  const model = \"gemini-3\";\n  return model.start();\n}"}</code>  
                      </pre>  
                      <motion.div  
                        animate={{  
                          opacity: [0, 1, 0],  
                          scale: [0.8, 1, 0.8]  
                        }}  
                        transition={{ duration: 2, repeat: Infinity as number }}  
                        className="absolute bottom-4 right-4 w-10 h-10 rounded-lg bg-[#C9A96E] flex items-center justify-center shadow-[0_0_15px_#C9A96E]"  
                      >  
                        <Code2 className="w-5 h-5 text-white" />  
                      </motion.div>  
                    </div>  
                  </div>  
                </div>  
                <div>  
                  <h3 className="text-white text-xl font-medium mb-2">Custom AI Solutions</h3>  
                  <p className="text-[#8C8580] text-[16px] font-normal leading-relaxed line-clamp-2">  
                    Tailored AI solutions built for your unique business needs.  
                  </p>  
                </div>  
              </BeamCard>  
  
              <BeamCard width="100%">  
                <div className="flex-1 flex items-center justify-center">  
                  <div className="relative w-full max-w-[200px]">  
                    <motion.div  
                      animate={{ rotate: 360 }}  
                      transition={{ duration: 20, repeat: Infinity as number, ease: "linear" as const }}  
                      className="absolute inset-0 rounded-full border border-dashed border-[#C9A96E]/20"  
                    />  
                    <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#C9A96E]/20 to-transparent border border-white/10 flex items-center justify-center backdrop-blur-md">  
                      <ShieldCheck className="w-16 h-16 text-[#C9A96E]" />  
                      <motion.div  
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}  
                        transition={{ duration: 2, repeat: Infinity as number }}  
                        className="absolute inset-0 rounded-full bg-[#C9A96E]/20"  
                      />  
                    </div>  
                  </div>  
                </div>  
                <div>  
                  <h3 className="text-white text-xl font-medium mb-2">Secure & Reliable</h3>  
                  <p className="text-[#8C8580] text-[16px] font-normal leading-relaxed line-clamp-2">  
                    Enterprise security to keep your data safe and operations smooth.  
                  </p>  
                </div>  
              </BeamCard>  
  
              <BeamCard width="100%">  
                <div className="flex-1 flex items-center justify-center">  
                  <div className="relative w-full max-w-[200px]">  
                    <div className="absolute inset-0 bg-[#C9A96E]/10 blur-[40px] rounded-full" />  
                    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">  
                      <div className="absolute inset-0 rounded-full border border-[#C9A96E]/20 animate-ping" />  
                      <div className="relative w-24 h-24 rounded-full bg-[#111111] border-2 border-[#C9A96E] flex items-center justify-center shadow-[0_0_30px_rgba(201,169,110,0.3)]">  
                        <Headphones className="w-10 h-10 text-[#C9A96E]" />  
                      </div>  
                      <motion.div  
                        animate={{ x: [0, 10, 0], y: [0, -5, 0] }}  
                        transition={{ duration: 3, repeat: Infinity as number }}  
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"  
                      >  
                        <div className="w-4 h-1 bg-[#C9A96E]/50 rounded-full" />  
                      </motion.div>  
                    </div>  
                  </div>  
                </div>  
                <div>  
                  <h3 className="text-white text-xl font-medium mb-2">Expert Support</h3>  
                  <p className="text-[#8C8580] text-[16px] font-normal leading-relaxed line-clamp-2">  
                    Expert support to ensure your success at every stage.  
                  </p>  
                </div>  
              </BeamCard>  
            </div>  
          </div>  
        </div>  
      </section>  
    </>  
  );  
}