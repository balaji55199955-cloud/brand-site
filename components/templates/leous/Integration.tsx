"use client";  
  
import React from 'react';  
import Image from 'next/image';  
import { motion } from 'framer-motion';  
import {  
  Plus,  
  Layers  
} from 'lucide-react';  
  
interface IntegrationCardProps {  
  name: string;  
  description: string;  
  icon: string | React.ReactNode;  
  iconColor: string;  
  side: 'left' | 'right';  
  index: number;  
}  
  
function IntegrationCard({ name, description, icon, iconColor, side, index }: IntegrationCardProps) {  
  return (  
    <motion.div  
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}  
      whileInView={{ opacity: 1, x: 0 }}  
      viewport={{ once: true }}  
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}  
      className={"group relative flex items-center gap-4 bg-[#050714]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-full md:w-[220px] lg:w-[340px] transition-all duration-500 hover:border-[#C9A96E]/50 hover:bg-[#1A1A1A]/90 hover:shadow-[0_0_30px_rgba(201,169,110,0.1)]"}  
    >  
      <div  
        className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden"  
        style={{ color: iconColor }}  
      >  
        {typeof icon === 'string' ? (  
          <Image  
            src={icon}  
            alt={name}  
            fill  
            className="p-2.5 object-contain"  
            referrerPolicy="no-referrer"  
          />  
        ) : (  
          icon  
        )}  
      </div>  
      <div className="flex-grow min-w-0 text-left">  
        <h4 className="text-white font-bold text-[15px] mb-0.5">{name}</h4>  
        <p className="text-[#8C8580] text-[11px] font-medium leading-tight opacity-70 group-hover:opacity-100 transition-opacity duration-300">{description}</p>  
      </div>  
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-[#C9A96E] group-hover:text-white transition-all duration-300 cursor-pointer border border-white/5 group-hover:border-[#C9A96E]">  
        <Plus className="w-4 h-4" />  
      </div>  
      <div  
        className={"absolute top-1/2 -translate-y-1/2 " + (side === 'left' ? '-right-1.5' : '-left-1.5') + " w-3 h-3 rounded-full bg-[#C9A96E] border-2 border-[#0A0A0A] z-10 hidden md:block shadow-[0_0_8px_#C9A96E]"}  
      />  
    </motion.div>  
  );  
}  
  
function ConnectorLines({ side }: { side: 'left' | 'right' }) {  
  const lineCount = 5;  
  
  return (  
    <div  
      className={"absolute top-0 bottom-0 " + (side === 'left' ? 'left-full' : 'right-full') + " w-[60px] lg:w-[150px] pointer-events-none hidden md:block"}  
    >  
      <svg className="w-full h-full" viewBox="0 0 150 580" preserveAspectRatio="none">  
        <defs>  
          <filter id={"beam-glow-" + side} x="-100%" y="-100%" width="300%" height="300%">  
            <feGaussianBlur stdDeviation="3" result="blur" />  
            <feComposite in="SourceGraphic" in2="blur" operator="over" />  
          </filter>  
        </defs>  
        {Array.from({ length: lineCount }).map((_: unknown, i: number) => {  
          const cardHeight = 82;  
          const gap = 16;  
          const spacing = cardHeight + gap;  
          const totalContentHeight = (cardHeight * 5) + (gap * 4);  
          const topOffset = (580 - totalContentHeight) / 2;  
  
          const startY = topOffset + (cardHeight / 2) + (i * spacing);  
          const hubCenterY = 290;  
          const endY = hubCenterY + (i - 2) * 16;  
  
          const hubX = side === 'left' ? 150 : 0;  
  
          const path = side === 'left'  
            ? "M 0 " + startY + " C 80 " + startY + ", 70 " + endY + ", 150 " + endY  
            : "M 150 " + startY + " C 70 " + startY + ", 80 " + endY + ", 0 " + endY;  
  
          return (  
            <React.Fragment key={i}>  
              <path  
                d={path}  
                stroke="white"  
                strokeOpacity="0.05"  
                strokeWidth="1.5"  
                fill="none"  
              />  
              <motion.path  
                d={path}  
                stroke="#C9A96E"  
                strokeWidth="2.5"  
                strokeLinecap="round"  
                fill="none"  
                initial={{ pathLength: 0, opacity: 0 }}  
                animate={{  
                  pathLength: [0.1, 0.3, 0.3, 0.1],  
                  pathOffset: [0, 0, 1, 1],  
                  opacity: [0, 1, 1, 0]  
                }}  
                transition={{  
                  duration: 4,  
                  repeat: Infinity as number,  
                  delay: i * 0.4,  
                  ease: "easeInOut" as const  
                }}  
                style={{ filter: "url(#beam-glow-" + side + ")" }}  
              />  
              <motion.circle  
                initial={{ scale: 0 }}  
                whileInView={{ scale: 1 }}  
                viewport={{ once: true }}  
                cx={hubX}  
                cy={endY}  
                r="3"  
                fill="#C9A96E"  
              />  
            </React.Fragment>  
          );  
        })}  
      </svg>  
    </div>  
  );  
}  
  
export default function Integration01({ className }: { className?: string }) {  
  const leftTools: { name: string; description: string; icon: string | React.ReactNode; iconColor: string }[] = [  
    { name: "ChatGPT", description: "GPT-4o, o1, o1-mini & more", icon: "/assets/svg/chatgpt.svg", iconColor: "#8C8580" },
    { name: "Claude", description: "Claude 3.5 Sonnet & more", icon: "/assets/svg/claude.svg", iconColor: "#8C8580" },
    { name: "Gemini", description: "Gemini 1.5 Pro & more", icon: "/assets/svg/gemini.svg", iconColor: "#8C8580" },
    { name: "MidJourney", description: "Image Generation", icon: "/assets/svg/midjourney.svg", iconColor: "#8C8580" },
    { name: "DALL-E", description: "Image Generation", icon: "/assets/svg/chatgpt.svg", iconColor: "#8C8580" },  
  ];  
  
  const rightTools: { name: string; description: string; icon: string | React.ReactNode; iconColor: string }[] = [  
    { name: "DeepL", description: "Advanced Translation", icon: "/assets/svg/deepl.svg", iconColor: "#8C8580" },
    { name: "HeyGen", description: "Video Generation", icon: "/assets/svg/heygen.svg", iconColor: "#8C8580" },
    { name: "DeepGram", description: "Voice AI", icon: "/assets/svg/deepgram.svg", iconColor: "#8C8580" },
    { name: "ElevenLabs", description: "Voice Generation", icon: "/assets/svg/elevenlabs.svg", iconColor: "#8C8580" },  
    {  
      name: "And More",  
      description: "New models added regularly",  
      icon: (  
        <div className="flex items-center justify-center font-bold text-xs tracking-tighter opacity-80">AI</div>  
      ),  
      iconColor: "#8C8580"  
    },  
  ];  
  
  return (  
    <section className={"relative py-24 bg-[#0A0A0A] overflow-hidden min-h-screen flex items-center " + (className || "")}>  
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.06)_0%,transparent_50%)] pointer-events-none" />  
  
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full">  
        <div className="text-center mb-16">  
          <motion.div  
            initial={{ opacity: 0, y: 10 }}  
            whileInView={{ opacity: 1, y: 0 }}  
            viewport={{ once: true }}  
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/5 mb-8"  
          >  
            <Layers className="w-4 h-4 text-[#C9A96E]" />  
            <span className="text-white text-xs font-bold tracking-widest uppercase">AI Ecosystem</span>  
          </motion.div>  
  
          <motion.h2  
            initial={{ opacity: 0, y: 30 }}  
            whileInView={{ opacity: 1, y: 0 }}  
            viewport={{ once: true }}  
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}  
            className="text-white text-4xl md:text-6xl lg:text-[72px] font-normal leading-[1.1] mb-6"  
          >  
            One AI Space. <br /> <span className="font-display italic font-light text-[#C9A96E]">Endless</span> Possibilities.  
          </motion.h2>  
  
          <motion.p  
            initial={{ opacity: 0, y: 20 }}  
            whileInView={{ opacity: 1, y: 0 }}  
            viewport={{ once: true }}  
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}  
            className="text-[#8C8580] text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-16"  
          >  
            Access the best AI models in one unified workspace. <br className="hidden md:block" />  
            Compare, create, and scale — all in <span className="text-[#C9A96E] font-medium">one place</span>.  
          </motion.p>  
        </div>  
  
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 lg:h-[580px] md:h-[500px] lg:py-0">  
          <div className="relative z-20 flex flex-col gap-4 w-full md:w-auto h-full justify-center items-end">  
            {leftTools.map((tool: { name: string; description: string; icon: string | React.ReactNode; iconColor: string }, index: number) => (  
              <IntegrationCard key={tool.name} {...tool} side="left" index={index} />  
            ))}  
            <ConnectorLines side="left" />  
          </div>  
  
          <div className="relative z-30 mx-0 md:mx-12 lg:mx-24 flex-shrink-0">  
            <motion.div  
              initial={{ scale: 0.5, opacity: 0 }}  
              whileInView={{ scale: 1, opacity: 1 }}  
              viewport={{ once: true }}  
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}  
              className="relative w-32 h-32 md:w-40 md:h-40 lg:w-64 lg:h-64 flex items-center justify-center"  
            >  
              <div className="absolute inset-2 md:inset-4 lg:inset-8 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#1A1A1A] flex items-center justify-center overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(201,169,110,0.4)]">  
                <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-xl" />  
                <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 lg:w-20 lg:h-20">  
                  <Image  
                    src="/assets/svg/logo-white.svg"  
                    alt="Logo"  
                    fill  
                    className="object-contain"  
                    referrerPolicy="no-referrer"  
                  />  
                </div>  
                <motion.div  
                  animate={{ opacity: [0.1, 0.3, 0.1] }}  
                  transition={{ duration: 4, repeat: Infinity as number, ease: "easeInOut" as const }}  
                  className="absolute inset-0 bg-[#C9A96E] pointer-events-none"  
                />  
              </div>  
  
              <motion.div  
                animate={{ rotate: 360 }}  
                transition={{ duration: 25, repeat: Infinity as number, ease: "linear" as const }}  
                className="absolute inset-0 rounded-full border border-dashed border-[#C9A96E]/20"  
              />  
  
              <motion.div  
                animate={{  
                  scale: [1, 1.3, 1],  
                  opacity: [0.2, 0.1, 0.2]  
                }}  
                transition={{ duration: 5, repeat: Infinity as number, ease: "easeInOut" as const }}  
                className="absolute inset-[-20%] rounded-full bg-[#C9A96E] blur-3xl -z-10"  
              />  
            </motion.div>  
          </div>  
  
          <div className="relative z-20 flex flex-col gap-4 w-full md:w-auto h-full justify-center items-start">  
            {rightTools.map((tool: { name: string; description: string; icon: string | React.ReactNode; iconColor: string }, index: number) => (  
              <IntegrationCard key={tool.name} {...tool} side="right" index={index} />  
            ))}  
            <ConnectorLines side="right" />  
          </div>  
        </div>  
      </div>  
    </section>  
  );  
}