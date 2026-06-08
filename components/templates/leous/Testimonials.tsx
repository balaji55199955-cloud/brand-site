"use client";  
  
import React, { useState, useEffect, useCallback } from "react";  
import { motion, AnimatePresence } from "framer-motion";  
import { MessageSquare, Quote, ChevronLeft, ChevronRight } from "lucide-react";  
import Image from "next/image";  
  
interface Testimonial {  
  image: string;  
  quote: string;  
  name: string;  
  role: string;  
}  
  
const testimonials: Testimonial[] = [  
  {  
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",  
    quote: "AI Automation completely streamlined our workflow. We went from manual and messy to fully automated in just days. Productivity is up, costs are down, and our team can finally focus on growth.",  
    name: "Alex Morgan",  
    role: "Founder & CEO, GrowthFlow"  
  },  
  {  
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",  
    quote: "The efficiency gains we've seen since implementing this platform are staggering. What used to take hours now happens in minutes, with zero errors. It's been a game-changer for our scale operations.",  
    name: "Sarah Chen",  
    role: "COO, TechScale AI"  
  },  
  {  
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",  
    quote: "Integrating AI into our legacy systems seemed impossible until we found this solution. The process was seamless, and the results were immediate. Our ROI has exceeded all initial projections.",  
    name: "Michael Ross",  
    role: "CTO, Legacy Dynamics"  
  }  
];  
  
export default function Testimonial01({ className }: { className?: string }) {  
  const [currentIndex, setCurrentIndex] = useState(0);  
  
  const nextTestimonial = useCallback(() => {  
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);  
  }, []);  
  
  const prevTestimonial = useCallback(() => {  
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);  
  }, []);  
  
  useEffect(() => {  
    const timer = setInterval(() => {  
      nextTestimonial();  
    }, 5000);  
    return () => clearInterval(timer);  
  }, [nextTestimonial]);  
  
  return (  
    <>  
      <link rel="preconnect" href="https://fonts.googleapis.com" />  
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />  
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />  
  
      <section className={"py-20 bg-[#0A0A0A] overflow-hidden " + (className || "")}>  
        <div className="max-w-[1248px] mx-auto px-6">  
          {/* Header Section */}  
          <div className="flex flex-col items-center text-center mb-16">  
            <motion.div  
              initial={{ opacity: 0, scale: 0.9 }}  
              whileInView={{ opacity: 1, scale: 1 }}  
              viewport={{ once: true }}  
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"  
            >  
              <div className="w-4 h-4 rounded-sm bg-[#C9A96E]/20 flex items-center justify-center">  
                <MessageSquare className="w-2.5 h-2.5 text-[#C9A96E]" />  
              </div>  
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">Testimonials</span>  
            </motion.div>  
  
            <motion.h2  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              className="text-4xl md:text-5xl lg:text-[56px] font-sans text-white leading-[1.1] mb-6"  
            >  
              What our clients are <span className="font-display italic text-[#C9A96E] drop-shadow-[0_0_15px_rgba(201,169,110,0.5)]">saying</span>  
            </motion.h2>  
  
            <motion.p  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ delay: 0.1 }}  
              className="text-[#8C8580] text-lg max-w-2xl"  
            >  
              Real results and experiences from businesses who transformed their operations with AI Automation.  
            </motion.p>  
          </div>  
  
          {/* Testimonials Content Container */}  
          <div className="flex flex-col md:flex-row items-stretch gap-6">  
            {/* Left: User Image */}  
            <div className="w-full md:w-[380px] lg:w-[506px] flex-shrink-0">  
              <div className="relative aspect-square md:h-full w-full rounded-[24px] overflow-hidden border border-white/10 bg-[#0A0A0A] group">  
                <AnimatePresence mode="wait">  
                  <motion.div  
                    key={currentIndex}  
                    initial={{ opacity: 0, scale: 1.1 }}  
                    animate={{ opacity: 1, scale: 1 }}  
                    exit={{ opacity: 0, scale: 0.95 }}  
                    transition={{ duration: 0.8, ease: "easeInOut" as const }}  
                    className="absolute inset-0"  
                  >  
                    <Image  
                      src={testimonials[currentIndex].image}  
                      alt={testimonials[currentIndex].name}  
                      fill  
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"  
                      referrerPolicy="no-referrer"  
                    />  
                    {/* Darkish Overlay */}  
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent opacity-80" />  
                  </motion.div>  
                </AnimatePresence>  
              </div>  
            </div>  
  
            {/* Right: Testimonial Card */}  
            <div className="flex-grow bg-[#1A1A1A]/30 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 lg:p-8 xl:p-12 flex flex-col justify-center min-h-[400px]">  
              <AnimatePresence mode="wait">  
                <motion.div  
                  key={currentIndex}  
                  initial={{ opacity: 0, x: 20 }}  
                  animate={{ opacity: 1, x: 0 }}  
                  exit={{ opacity: 0, x: -20 }}  
                  transition={{ duration: 0.5 }}  
                  className="flex flex-col"  
                >  
                  {/* Quote Icon */}  
                  <div>  
                    <Quote className="w-12 h-12 text-[#C9A96E]" fill="#C9A96E" />  
                  </div>  
  
                  {/* Testimonial Text */}  
                  <div className="mt-4">  
                    <p className="text-white text-xl md:text-2xl font-light leading-relaxed">  
                      {testimonials[currentIndex].quote}  
                    </p>  
                  </div>  
  
                  {/* Footer Section */}  
                  <div className="mt-12 flex items-end justify-between">  
                    <div>  
                      <h4 className="text-white text-xl md:text-2xl font-normal mb-2">  
                        {testimonials[currentIndex].name}  
                      </h4>  
                      <p className="text-[#8C8580] text-base md:text-lg">  
                        {testimonials[currentIndex].role}  
                      </p>  
                    </div>  
  
                    {/* Navigation Buttons */}  
                    <div className="flex gap-4 mb-4">  
                      <button  
                        onClick={prevTestimonial}  
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#C9A96E]/60 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 hover:bg-[#C9A96E]/5 transition-all duration-300"  
                      >  
                        <ChevronLeft className="w-8 h-8" />  
                      </button>  
                      <button  
                        onClick={nextTestimonial}  
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#C9A96E]/60 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 hover:bg-[#C9A96E]/5 transition-all duration-300"  
                      >  
                        <ChevronRight className="w-8 h-8" />  
                      </button>  
                    </div>  
                  </div>  
  
                  {/* Carousel Dots */}  
                  <div className="mt-6 flex gap-2">  
                    {testimonials.map((_: Testimonial, idx: number) => (  
                      <button  
                        key={idx}  
                        onClick={() => setCurrentIndex(idx)}  
                        className={"h-1.5 rounded-full transition-all duration-300 " + (currentIndex === idx ? "w-8 bg-[#C9A96E]" : "w-2 bg-white/20")}  
                      />  
                    ))}  
                  </div>  
                </motion.div>  
              </AnimatePresence>  
            </div>  
          </div>  
        </div>  
      </section>  
    </>  
  );  
}