"use client";  
  
import React from "react";  
import Link from "next/link";
import { motion } from "framer-motion";  
import {  
  MessageCircle,  
  Mail,  
  Building2,  
  ArrowRight  
} from "lucide-react";  
  
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer01({ className }: { className?: string }) {  
  return (  
    <>  
      <footer className={"relative bg-[#0A0A0A] pt-24 pb-12 overflow-hidden " + (className || "")}>  
        {/* Background Video */}  
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">  
          <video  
            autoPlay  
            loop  
            muted  
            playsInline  
            className="w-full h-full object-cover opacity-[0.25] filter grayscale"  
          >  
            <source src="/assets/video/footer-bg.mp4" type="video/mp4" />  
          </video>  
          <div className="absolute inset-0 bg-[#0A0A0A]/70" />  
        </div>  
  
        {/* Background radial glow */}  
        <div className="absolute bottom-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(circle_at_bottom_right,rgba(201,169,110,0.08)_0%,transparent_60%)] pointer-events-none" />  
        <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-[radial-gradient(circle_at_top_left,rgba(201,169,110,0.04)_0%,transparent_60%)] pointer-events-none" />  
  
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-20">  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-20">  
  
            {/* Left Section */}  
            <motion.div  
              initial={{ opacity: 0, x: -20 }}  
              whileInView={{ opacity: 1, x: 0 }}  
              viewport={{ once: true }}  
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}  
            >  
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/5 mb-10">  
                <MessageCircle className="w-4 h-4 text-[#C9A96E]" />  
                <span className="text-white text-[11px] font-bold tracking-widest uppercase">DROP 001 STATUS</span>  
              </div>  
  
              <h2 className="text-white text-5xl lg:text-[72px] font-normal leading-[1.1] mb-2 font-display">  
                Worn. <br /> Verified.  
              </h2>  
              <h3 className="font-display italic font-light text-[#D4B87A] text-4xl lg:text-[56px] leading-[1.1] mb-8">  
                Yours Forever.  
              </h3>  
  
              <motion.div  
                animate={{  
                  width: ["96px", "140px", "96px"],  
                  opacity: [0.6, 1, 0.6],  
                }}  
                transition={{  
                  duration: 4,  
                  repeat: Infinity as number,  
                  ease: "easeInOut" as const  
                }}  
                className="h-1 bg-gradient-to-r from-[#C9A96E] to-transparent mb-12 rounded-full"  
              />  
  
              <div className="max-w-md">  
                <p className="text-[#8C8580] text-base leading-relaxed mb-1">  
                  Limited edition luxury phygital garments with cryptographically  
                </p>  
                <p className="text-[#8C8580] text-base leading-relaxed flex items-center gap-1.5">  
                  secure <span className="text-[#C9A96E] font-semibold">NTAG 424 DNA NFC</span> validation chips.  
                </p>  
                <p className="text-[#8C8580] text-base leading-relaxed mt-1">  
                  Claim on-chain ownership certificates via Polygon.  
                </p>  
              </div>  
  
              <Link  
                href="/verify"  
                className="group inline-flex items-center gap-3 text-white text-lg font-medium mt-16 border-b border-white/10 pb-2 hover:border-[#C9A96E] transition-colors duration-300"  
              >  
                Verify your streetwear authenticity now  
                <ArrowRight className="w-5 h-5 text-[#C9A96E] group-hover:translate-x-1 transition-transform" />  
              </Link>  
            </motion.div>  
  
            {/* Right Section - Grid */}  
            <motion.div  
              initial={{ opacity: 0, x: 20 }}  
              whileInView={{ opacity: 1, x: 0 }}  
              viewport={{ once: true }}  
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}  
              className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8"  
            >  
              {/* Connect Section */}  
              <div className="space-y-6">  
                <div className="flex items-center gap-3 mb-8">  
                  <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center border border-[#C9A96E]/20">  
                    <Mail className="w-5 h-5 text-[#C9A96E]" />  
                  </div>  
                  <h4 className="text-white text-lg font-normal">Contact info</h4>  
                </div>  
  
                <div className="flex items-center gap-4 group">  
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#C9A96E]/10 group-hover:border-[#C9A96E]/30 transition-all duration-300">  
                    <Mail className="w-5 h-5 text-[#C9A96E]" />  
                  </div>  
                  <span className="text-[#8C8580] group-hover:text-white transition-colors">hello@brand.com</span>  
                </div>  
              </div>  
  
              {/* Address Section */}  
              <div className="space-y-6">  
                <div className="flex items-center gap-3 mb-8">  
                  <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center border border-[#C9A96E]/20">  
                    <Mail className="w-5 h-5 text-[#C9A96E]" />  
                  </div>  
                  <h4 className="text-white text-lg font-normal">Origin</h4>  
                </div>  
  
                <div className="flex items-start gap-4">  
                  <div className="mt-1 w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">  
                    <Building2 className="w-5 h-5 text-[#C9A96E]" />  
                  </div>  
                  <div className="text-[#8C8580]">  
                    <p className="text-white font-normal mb-1">Bangalore Lab</p>  
                    <p className="text-sm leading-relaxed">Indiranagar, Bangalore</p>  
                    <p className="text-sm leading-relaxed">Karnataka, India</p>  
                  </div>  
                </div>  
              </div>  
  
              {/* Social Section */}  
              <div className="space-y-8 lg:mt-4 md:col-span-2">  
                <div className="flex items-center gap-3">  
                  <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center border border-[#C9A96E]/20">  
                    <MessageCircle className="w-5 h-5 text-[#C9A96E]" />  
                  </div>  
                  <h4 className="text-white text-lg font-normal">Stay Connected</h4>  
                </div>  
  
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">  
                  <a href="#" className="flex items-center gap-3 group">  
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#C9A96E]/10 group-hover:border-[#C9A96E]/30 transition-all duration-300">  
                      <InstagramIcon className="w-4 h-4 text-[#C9A96E]" />  
                    </div>  
                    <span className="text-[#8C8580] text-sm group-hover:text-white transition-colors">Instagram</span>  
                  </a>  
                  <a href="#" className="flex items-center gap-3 group">  
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#C9A96E]/10 group-hover:border-[#C9A96E]/30 transition-all duration-300">  
                      <TwitterIcon className="w-4 h-4 text-[#C9A96E]" />  
                    </div>  
                    <span className="text-[#8C8580] text-sm group-hover:text-white transition-colors">Twitter</span>  
                  </a>  
                </div>  
              </div>  
            </motion.div>  
          </div>  
  
          {/* Bottom Bar */}  
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">  
            <div className="flex items-center gap-3">  
              <span className="text-white text-2xl font-sans font-black tracking-[0.2em] uppercase">Leous</span>  
            </div>  
  
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 text-[#8C8580]/50 text-xs font-mono">  
              <p className="font-normal">&copy; 2026 Leous. All rights reserved.</p>  
              <div className="hidden md:block w-px h-4 bg-white/10" />  
              <p className="font-normal">Secure Phygital Infrastructure</p>  
            </div>  
          </div>  
        </div>  
      </footer>  
    </>  
  );  
}