"use client";  
  
import React, { useEffect, useState } from "react";  
import { motion } from "framer-motion";  
import { Menu, X, Search, Bell, Home, CheckCircle2, MoreHorizontal, Plus, ChevronRight, LayoutGrid, FileText, CreditCard, Landmark, Wallet, Settings, ArrowUpRight, ShieldCheck, Cpu, Key, Award, Loader2 } from "lucide-react";  
import { cn } from "@/lib/utils";  
import { cva, type VariantProps } from "class-variance-authority";  
import Link from "next/link";
  
// ============================================================================  
// INLINE BUTTON COMPONENT  
// ============================================================================  
  
const buttonVariants = cva(  
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",  
  {  
    variants: {  
      variant: {  
        default: "bg-primary text-primary-foreground",  
        outline: "border-border bg-background hover:bg-muted hover:text-foreground",  
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",  
        ghost: "hover:bg-muted hover:text-foreground",  
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",  
        link: "text-primary underline-offset-4 hover:underline",  
      },  
      size: {  
        default: "h-8 gap-1.5 px-2.5",  
        xs: "h-6 gap-1 rounded-md px-2 text-xs",  
        sm: "h-7 gap-1 rounded-md px-2.5 text-[0.8rem]",  
        lg: "h-9 gap-1.5 px-2.5",  
        icon: "size-8",  
        "icon-xs": "size-6 rounded-md",  
        "icon-sm": "size-7 rounded-md",  
        "icon-lg": "size-9",  
      },  
    },  
    defaultVariants: {  
      variant: "default",  
      size: "default",  
    },  
  }  
);  
  
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {  
  className?: string;  
}  
  
function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {  
  return (  
    <button  
      data-slot="button"  
      className={cn(buttonVariants({ variant, size, className }))}  
      {...props}  
    />  
  );  
}  
  
// ============================================================================  
// COUNTER SUB-COMPONENT  
// ============================================================================  
  
function Counter({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {  
  const [count, setCount] = useState(0);  
  
  useEffect(() => {  
    const end = value;  
    const duration = 2000;  
    const startTime = performance.now();  
  
    const updateCount = (currentTime: number) => {  
      const elapsed = currentTime - startTime;  
      const progress = Math.min(elapsed / duration, 1);  
      const easeOutQuad = (t: number) => t * (2 - t);  
      const currentCount = 0 + (end - 0) * easeOutQuad(progress);  
      setCount(currentCount);  
      if (progress < 1) {  
        requestAnimationFrame(updateCount);  
      }  
    };  
  
    requestAnimationFrame(updateCount);  
  }, [value]);  
  
  return <span>{prefix}{count.toFixed(decimals)}{suffix}</span>;  
}  
  
// ============================================================================  
// DASHBOARD SIDEBAR  
// ============================================================================  
  
interface DashboardSidebarProps {  
  activeView: string;  
  setActiveView: (view: string) => void;  
}  
  
function DashboardSidebar({ activeView, setActiveView }: DashboardSidebarProps) {  
  const menuItems = [  
    { icon: Home, label: "Overview" },  
    { icon: Cpu, label: "NFC Chips", badge: "Live" },  
    { icon: Key, label: "Polygon NFT" },  
    { icon: Award, label: "Tiers" },  
  ];  
  
  const workflowItems = ["Vault Status", "Claims", "Settings"];  
  
  return (  
    <div className="w-40 border-r border-white/5 bg-[#111111]/50 h-full flex flex-col p-3 shrink-0 hidden md:flex">  
      <div className="space-y-1 mb-6">  
        {menuItems.map((item, idx) => (  
          <div  
            key={idx}  
            onClick={() => setActiveView(item.label)}  
            className={cn(  
              "flex items-center justify-between px-2 py-1.5 rounded-md text-[11px] cursor-pointer hover:bg-white/5 transition-colors",  
              item.label === activeView ? "bg-white/10 text-[#E9EAF0] font-medium" : "text-[#8C8580]"  
            )}  
          >  
            <div className="flex items-center gap-2">  
              <item.icon className={cn("h-3 w-3", item.label === activeView ? "text-[#C9A96E]" : "text-[#8C8580]")} />  
              <span>{item.label}</span>  
            </div>  
            {item.badge && (  
              <span className="bg-[#C9A96E]/20 text-[#C9A96E] px-1 rounded-sm text-[9px]">{item.badge}</span>  
            )}  
          </div>  
        ))}  
      </div>  
      <div className="mt-2">  
        <h3 className="px-2 text-[9px] font-semibold text-[#8C8580] uppercase tracking-wider mb-2">Protocols</h3>  
        <div className="space-y-1">  
          {workflowItems.map((item, idx) => (  
            <div  
              key={idx}  
              onClick={() => setActiveView(item)}  
              className={cn(  
                "px-2 py-1 text-[11px] cursor-pointer transition-colors",  
                item === activeView ? "text-[#E9EAF0] font-medium" : "text-[#8C8580] hover:text-[#E9EAF0]"  
              )}  
            >  
              {item}  
            </div>  
          ))}  
        </div>  
      </div>  
    </div>  
  );  
}  
  
// ============================================================================  
// DASHBOARD TOP BAR  
// ============================================================================  
  
function DashboardTopBar() {  
  return (  
    <div className="h-12 border-b border-white/5 bg-[#111111]/80 flex items-center justify-between px-4 shrink-0">  
      <div className="flex items-center gap-2">  
        <ShieldCheck className="h-5 w-5 text-[#C9A96E]" />  
        <span className="text-[11px] font-semibold text-[#E9EAF0] uppercase tracking-wider">OWNER VAULT</span>  
        <ChevronRight className="h-3 w-3 opacity-30 rotate-90 text-[#E9EAF0]" />  
      </div>  
      <div className="flex-1 max-w-xs mx-4 sm:mx-8 relative hidden sm:block">  
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[#8C8580]" />  
        <div className="w-full h-7 bg-white/5 rounded-md border border-white/10 flex items-center justify-between px-8 text-[10px] text-[#8C8580]">  
          <span>Search registry...</span>  
          <span className="font-mono opacity-30">Ctrl+K</span>  
        </div>  
      </div>  
      <div className="flex items-center gap-2 sm:gap-3">  
        <span className="text-[10px] font-medium px-2 py-1 bg-white/10 text-[#E9EAF0] rounded cursor-pointer hover:bg-white/20 transition-colors hidden xs:block">Verify Chip</span>  
        <Bell className="h-3.5 w-3.5 text-[#8C8580] cursor-pointer hover:text-[#E9EAF0] transition-colors" />  
        <div className="w-6 h-6 bg-[#C9A96E]/80 rounded-full flex items-center justify-center text-[9px] font-bold text-white uppercase cursor-pointer hover:opacity-80 transition-opacity">OW</div>  
      </div>  
    </div>  
  );  
}  
  
// ============================================================================  
// BALANCE CHART  
// ============================================================================  
  
function BalanceChart() {  
  return (  
    <div className="h-20 w-full mt-4 relative overflow-hidden">  
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 80">  
        <defs>  
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">  
            <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.2" />  
            <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />  
          </linearGradient>  
        </defs>  
        <motion.path  
          initial={{ pathLength: 0, opacity: 0 }}  
          animate={{ pathLength: 1, opacity: 1 }}  
          transition={{ duration: 3, ease: "easeInOut" as const, repeat: Infinity as number, repeatDelay: 1 }}  
          d="M0 60 C 100 50, 200 70, 300 40 S 500 10, 600 35 S 800 65, 1000 30"  
          fill="none"  
          stroke="#C9A96E"  
          strokeWidth="2"  
          vectorEffect="non-scaling-stroke"  
        />  
        <motion.path  
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
          transition={{ duration: 1, delay: 1 }}  
          d="M0 60 C 100 50, 200 70, 300 40 S 500 10, 600 35 S 800 65, 1000 30 L 1000 80 L 0 80 Z"  
          fill="url(#chartGradient)"  
        />  
      </svg>  
    </div>  
  );  
}  
  
// ============================================================================  
// DASHBOARD CONTENT  
// ============================================================================  
  
interface DashboardContentProps {  
  activeView: string;  
}  
  
function DashboardContent({ activeView }: DashboardContentProps) {  
  const transactions = [  
    { date: "Live", desc: "NFC Chip Link: Established", amount: "SECURE", status: "Active", statusColor: "text-emerald-400 bg-emerald-400/10" },  
    { date: "1m ago", desc: "Polygon NFT Mint: Success", amount: "Token #10", status: "Minted", statusColor: "text-[#C9A96E] bg-[#C9A96E]/10" },  
    { date: "5m ago", desc: "Authentic NFC Scan: Bangalore", amount: "UID: NTAG424", status: "Verified", statusColor: "text-amber-400 bg-amber-400/10" },  
    { date: "1h ago", desc: "Waitlist Registration", amount: "Pos #842", status: "Joined", statusColor: "text-[#C9A96E] bg-[#C9A96E]/10" },  
  ];  
  
  return (  
    <div className="flex-1 bg-[#05061B]/20 p-4 sm:p-6 overflow-auto flex flex-col">  
      <motion.div  
        key={activeView}  
        initial={{ opacity: 0, x: 10 }}  
        animate={{ opacity: 1, x: 0 }}  
        transition={{ duration: 0.3 }}  
        className="flex-1 flex flex-col"  
      >  
        {activeView === "Overview" || activeView === "Home" ? (  
          <>  
            <div className="mb-6">  
              <div className="flex items-center justify-between mb-3">  
                <h2 className="text-sm font-semibold text-[#E9EAF0]">Active Pieces: <span className="text-[#C9A96E]">10 Total</span></h2>  
                <motion.div  
                  animate={{ opacity: [0.4, 1, 0.4] }}  
                  transition={{ duration: 2, repeat: Infinity as number }}  
                  className="flex items-center gap-2"  
                >  
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />  
                  <span className="text-[10px] text-[#8C8580] uppercase tracking-widest font-mono hidden sm:inline">On-chain sync</span>  
                </motion.div>  
              </div>  
              <div className="flex flex-wrap gap-2">  
                {[  
                  "Overview",  
                  "Authentic Scan",  
                  "NFT Claims",  
                  "Owner Perks",  
                  "Analytics",  
                  "Audit Log",  
                ].map((label, idx) => (  
                  <motion.button  
                    key={idx}  
                    whileHover={{ scale: 1.05 }}  
                    whileTap={{ scale: 0.95 }}  
                    className={cn(  
                      "px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-medium border border-white/10 shadow-sm transition-all",  
                      label === "Overview"  
                        ? "bg-[#C9A96E] text-white border-[#C9A96E] hover:bg-[#C9A96E]/90"  
                        : "bg-white/5 text-[#E9EAF0] hover:bg-white/10"  
                    )}  
                  >  
                    {label}  
                  </motion.button>  
                ))}  
              </div>  
            </div>  
  
            <div className="flex flex-col lg:flex-row gap-4 mb-6">  
              <motion.div  
                initial={{ opacity: 0, scale: 0.95 }}  
                animate={{ opacity: 1, scale: 1 }}  
                transition={{ duration: 0.5 }}  
                className="flex-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 shadow-sm relative overflow-hidden group"  
              >  
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A96E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />  
                <div className="flex items-center justify-between mb-1">  
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#8C8580]">  
                    <span>Collection Mint Status</span>  
                    <motion.div  
                      animate={{ scale: [1, 1.2, 1] }}  
                      transition={{ duration: 2, repeat: Infinity as number }}  
                    >  
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />  
                    </motion.div>  
                  </div>  
                </div>  
                <div className="text-xl sm:text-2xl font-semibold tracking-tight text-[#E9EAF0]">  
                  <Counter value={100} decimals={0} suffix="%" />  
                </div>  
                <div className="flex flex-wrap items-center gap-3 mt-3 text-[10px]">  
                  <span className="text-[#8C8580] uppercase tracking-wider font-semibold">Twinning</span>  
                  <div className="flex items-center gap-1 text-emerald-400 font-medium">  
                    <ArrowUpRight className="h-2.5 w-2.5" />  
                    All NFC paired  
                  </div>  
                  <div className="flex items-center gap-1 text-[#C9A96E] font-medium">  
                    <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity as number }}>  
                      Secure  
                    </motion.div>  
                  </div>  
                </div>  
                <BalanceChart />  
              </motion.div>  
  
              <motion.div  
                initial={{ opacity: 0, scale: 0.95 }}  
                animate={{ opacity: 1, scale: 1 }}  
                transition={{ duration: 0.5, delay: 0.1 }}  
                className="flex-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 shadow-sm relative overflow-hidden group"  
              >  
                <div className="absolute inset-0 bg-gradient-to-bl from-[#C9A96E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />  
                <div className="flex items-center justify-between mb-4">  
                  <span className="text-[11px] font-semibold text-[#E9EAF0]">Metadata Gateways</span>  
                  <div className="flex items-center gap-2">  
                    <Plus className="h-3 w-3 text-[#8C8580] cursor-pointer" />  
                    <MoreHorizontal className="h-3 w-3 text-[#8C8580] cursor-pointer" />  
                  </div>  
                </div>  
                <div className="space-y-1">  
                  {[  
                    { label: "IPFS Gateway", amount: "Pinned", status: "live" },  
                    { label: "Polygon Mainnet", amount: "Stable", status: "live" },  
                    { label: "NFC Verification", amount: "Operational", status: "sync" },  
                  ].map((acc, idx) => (  
                    <div  
                      key={idx}  
                      className="flex items-center justify-between py-3 text-[11px] border-b border-white/5 last:border-0"  
                    >  
                      <div className="flex items-center gap-2">  
                        <motion.div  
                          animate={{ opacity: [0.4, 1, 0.4] }}  
                          transition={{ duration: 1.5, repeat: Infinity as number, delay: idx * 0.5 }}  
                          className={cn(  
                            "w-1.5 h-1.5 rounded-full",  
                            acc.status === "sync" ? "bg-[#C9A96E]" : "bg-emerald-500"  
                          )}  
                        />  
                        <span className="text-[#8C8580] truncate max-w-[100px]">{acc.label}</span>  
                      </div>  
                      <span className={cn(  
                        "font-medium",  
                        acc.amount === "Syncing" ? "text-[#C9A96E]" : "text-[#E9EAF0]"  
                      )}>  
                        {acc.amount}  
                      </span>  
                    </div>  
                  ))}  
                </div>  
              </motion.div>  
            </div>  
  
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 shadow-sm flex-1">  
              <h3 className="text-[11px] font-semibold mb-4 text-[#E9EAF0]">Ownership & Auth Ledger</h3>  
              <div className="w-full overflow-hidden">  
                <div className="flex items-center text-[9px] sm:text-[10px] text-[#8C8580] font-medium border-b border-white/10 pb-2 mb-2 px-1 sm:px-2">  
                  <span className="w-14 sm:w-20">Time</span>  
                  <span className="flex-1 px-1 sm:px-0">Event</span>  
                  <span className="hidden sm:block w-24 text-right">Identifier</span>  
                  <span className="w-16 sm:w-24 text-right">Status</span>  
                </div>  
                <div className="space-y-1">  
                  {transactions.map((t, idx) => (  
                    <motion.div  
                      key={idx}  
                      initial={{ opacity: 0, x: -10 }}  
                      animate={{ opacity: 1, x: 0 }}  
                      transition={{ delay: idx * 0.1 }}  
                      className="flex items-center text-[9px] sm:text-[10px] py-2 px-1 sm:px-2 hover:bg-white/5 rounded-md transition-colors"  
                    >  
                      <span className="w-14 sm:w-20 text-[#8C8580] font-mono">{t.date}</span>  
                      <span className="flex-1 font-medium text-[#E9EAF0] truncate px-1 sm:px-0">{t.desc}</span>  
                      <span className="hidden sm:block w-24 text-right font-medium text-[#E9EAF0] font-mono">{t.amount}</span>  
                      <div className="w-16 sm:w-24 text-right">  
                        <span className={cn(  
                          "px-1 sm:px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-semibold",  
                          t.statusColor  
                        )}>  
                          {t.status}  
                        </span>  
                      </div>  
                    </motion.div>  
                  ))}  
                </div>  
              </div>  
            </div>  
          </>  
        ) : (  
          <div className="flex flex-col items-center justify-center h-full py-20 text-center flex-1">  
            <motion.div  
              animate={{ rotate: 360 }}  
              transition={{ duration: 10, repeat: Infinity as number, ease: "linear" as const }}  
              className="w-16 h-16 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mb-4"  
            >  
              <Settings className="h-8 w-8 text-[#C9A96E]" />  
            </motion.div>  
            <h2 className="text-xl font-semibold text-[#E9EAF0] mb-2">{activeView} Protocol</h2>  
            <p className="text-[#8C8580] max-w-sm">  
              {"Establishing secure connection to physical twin " + activeView.toLowerCase() + " keys..."}  
            </p>  
            <motion.div  
              animate={{ opacity: [1, 0.4, 1] }}  
              transition={{ duration: 1.5, repeat: Infinity as number }}  
              className="mt-6 font-mono text-[#C9A96E] text-[12px]"  
            >  
              SECURE_NFC_VALIDATION_ACTIVE...  
            </motion.div>  
          </div>  
        )}  
      </motion.div>  
    </div>  
  );  
}  
  
// ============================================================================  
// MAIN COMPONENT  
// ============================================================================  
  
interface P01Header01TsxProps {  
  className?: string;  
}  
  
export default function P01Header01Tsx({ className }: P01Header01TsxProps) {  
  const [isMounted, setIsMounted] = useState(false);  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);  
  const [activeView, setActiveView] = useState("Overview");  

  // Waitlist State
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  
  useEffect(() => {  
    setIsMounted(true);  
  }, []);  

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setPosition(data.position);
        setAlreadyRegistered(data.alreadyRegistered || false);
      }
    } catch (err) {
      console.error("Waitlist submit error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  return (  
    <>  
      <div  
        className={cn("min-h-screen w-full flex flex-col relative", className)}  
        style={{ backgroundColor: "#0A0A0A" }}  
      >  
        {/* Background Video */}  
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">  
          {isMounted && (  
            <video  
              autoPlay  
              muted  
              loop  
              playsInline  
              className="w-full h-full object-cover opacity-[0.35] filter grayscale contrast-125"  
            >  
              <source  
                src="/assets/video/header-bg.mp4"  
                type="video/mp4"  
              />  
            </video>  
          )}  
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/20 via-[#0A0A0A]/40 to-[#0A0A0A]" />  
        </div>  
  
        {/* Navbar */}  
        <nav  
          className="sticky top-0 z-50 w-full shrink-0 border-b border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300"  
          style={{  
            backgroundColor: "rgba(3, 5, 19, 0.8)",  
            backdropFilter: "blur(12px)",  
            WebkitBackdropFilter: "blur(12px)",  
          }}  
        >  
          <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between px-6 md:px-[64px] lg:px-[96px] py-4 md:py-6">  
            <motion.div  
              initial={{ opacity: 0, x: -15 }}  
              animate={{ opacity: 1, x: 0 }}  
              transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const }}  
              className="flex items-center"
            >  
              <Link href="/" className="font-sans font-black text-xl tracking-[0.2em] text-[#E9EAF0]">
                Leous
              </Link>
            </motion.div>  
  
            <div className="flex items-center gap-4 md:gap-8">  
              <motion.div  
                initial={{ opacity: 0, y: -5 }}  
                animate={{ opacity: 1, y: 0 }}  
                transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.1 }}  
                className="hidden lg:flex items-center gap-8 text-[15px] tracking-widest text-[#8C8580]"  
              >  
                {[  
                  { label: "VAULT", href: "/vault" },  
                  { label: "DASHBOARD", href: "/dashboard" },  
                  { label: "VERIFY CHIP", href: "/verify" }  
                ].map((link) => (  
                  <Link key={link.label} href={link.href} className="hover:text-[#E9EAF0] transition-all duration-300">  
                    {link.label}  
                  </Link>  
                ))}  
              </motion.div>  
  
              <motion.div  
                initial={{ opacity: 0, x: 15 }}  
                animate={{ opacity: 1, x: 0 }}  
                transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.2 }}  
                className="hidden sm:block"  
              >  
                <Link href="/login">
                  <Button  
                    className="rounded-full px-6 md:px-8 h-[36px] md:h-[40px] text-[13px] tracking-wider uppercase font-semibold transition-all duration-300 hover:shadow-[0_10px_20px_-5px_rgba(201,169,110,0.4)] active:scale-95 shadow-lg"  
                    style={{ backgroundColor: "#C9A96E", color: "#E9EAF0" }}  
                  >  
                    Owner Login  
                  </Button>  
                </Link>
              </motion.div>  
  
              <div className="lg:hidden">  
                <button  
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}  
                  className="text-[#E9EAF0] flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors"  
                  aria-label="Toggle menu"  
                >  
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}  
                </button>  
              </div>  
            </div>  
          </div>  
  
          {/* Mobile Menu */}  
          <motion.div  
            initial={false}  
            animate={isMobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}  
            className="absolute top-full left-0 w-full lg:hidden overflow-hidden bg-[#111111]/95 backdrop-blur-2xl border-t border-white/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.4)]"  
          >  
            <div className="max-w-[1440px] mx-auto w-full px-6 md:px-[64px]">  
              <div className="flex flex-col gap-4 py-8">  
                {[  
                  { label: "VAULT", href: "/vault" },  
                  { label: "DASHBOARD", href: "/dashboard" },  
                  { label: "VERIFY CHIP", href: "/verify" }  
                ].map((link) => (  
                  <Link  
                    key={link.label}  
                    href={link.href}  
                    onClick={() => setIsMobileMenuOpen(false)}  
                    className="text-[#8C8580] text-[18px] hover:text-[#E9EAF0] py-2 transition-all w-fit"  
                  >  
                    {link.label}  
                  </Link>  
                ))}  
                <div className="pt-2">  
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button  
                      className="rounded-full w-full sm:w-fit px-8 h-[48px] text-[15px] font-medium shadow-lg"  
                      style={{ backgroundColor: "#C9A96E", color: "#E9EAF0" }}  
                    >  
                      Owner Login  
                    </Button>  
                  </Link>
                </div>  
              </div>  
            </div>  
          </motion.div>  
        </nav>  
  
        {/* Hero Body */}  
        <div className="relative z-10 w-full flex flex-1 flex-col py-12 md:py-[80px]">  
          <div className="max-w-[1440px] mx-auto w-full flex flex-col items-center px-6 md:px-[64px] lg:px-[96px]">  
            {/* Badge */}  
            <motion.div  
              initial={{ opacity: 0, y: 20 }}  
              animate={{ opacity: 1, y: 0 }}  
              transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const }}  
              className="inline-flex items-center gap-2 rounded-full border border-[#E9EAF0]/10 bg-white/5 backdrop-blur-md px-5 py-2 text-[14px] text-[#8C8580] mb-[20px]"  
            >  
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />  
              <span className="tracking-widest uppercase font-mono text-xs">Bangalore — Series 001</span>  
            </motion.div>  
  
            {/* Headline */}  
            <motion.h1  
              initial={{ opacity: 0, y: 30 }}  
              animate={{ opacity: 1, y: 0 }}  
              transition={{ duration: 1.2, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.15 }}  
              className="text-center font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.1] md:leading-[1.05] tracking-tight text-[#E9EAF0] max-w-5xl"  
            >  
              <span className="font-sans font-light">Motorsport Soul.</span>{" "}<br className="hidden md:inline" />
              <span className="italic font-display font-medium text-[#C9A96E]">Luxury Surface.</span>  
            </motion.h1>  
  
            {/* Subheadline */}  
            <motion.p  
              initial={{ opacity: 0, y: 25 }}  
              animate={{ opacity: 1, y: 0 }}  
              transition={{ duration: 1.2, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.3 }}  
              className="mt-[20px] text-center text-[15px] md:text-[18px] text-[#8C8580] max-w-[620px] lg:max-w-[850px] leading-relaxed font-normal"  
            >  
              10 pieces only. Embedded with cryptographically unclonable NTAG 424 DNA NFC chips and paired with Polygon blockchain proof-of-ownership certificates.  
            </motion.p>  
  
            {/* Waitlist submission form */}  
            <motion.div  
              initial={{ opacity: 0, y: 20 }}  
              animate={{ opacity: 1, y: 0 }}  
              transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.45 }}  
              className="mt-8 md:mt-10 w-full max-w-md"  
            >  
              {!success ? (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for early access"
                    className="w-full bg-[#111111]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#8C8580]/40 outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto h-11 px-6 flex items-center justify-center gap-2 rounded-xl bg-[#C9A96E] text-white text-sm font-medium hover:bg-[#C9A96E]/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_20px_rgba(201,169,110,0.4)] whitespace-nowrap"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-2 px-4 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded-xl">
                  <p className="text-white font-medium text-sm">
                    {alreadyRegistered ? "✓ Already registered" : "✓ Joined waitlist"}
                  </p>
                  {position && (
                    <p className="text-xs text-[#8C8580] mt-1 font-mono">
                      Queue Position: #{position}
                    </p>
                  )}
                </div>
              )}
              <div className="flex justify-center gap-6 mt-4 text-[11px] text-[#8C8580]/60 font-mono">
                <span>1,000+ waitlisted</span>
                <span>•</span>
                <span>Release: Drop 001</span>
              </div>
            </motion.div>  
  
            {/* Dashboard Preview */}  
            <motion.div  
              initial={{ opacity: 0, y: 80 }}  
              animate={{ opacity: 1, y: 0 }}  
              transition={{ duration: 1.5, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.6 }}  
              className="mt-12 md:mt-[64px] w-full"  
            >  
              <div  
                className="rounded-[24px] p-2 md:p-3 overflow-hidden"  
                style={{  
                  background: "rgba(255, 255, 255, 0.05)",  
                  border: "1px solid rgba(255, 255, 255, 0.1)",  
                  boxShadow: "0 40px 100px -20px rgba(0,0,0,0.5)",  
                  backdropFilter: "blur(10px)",  
                }}  
              >  
                <div className="bg-[#111111]/40 rounded-[20px] shadow-2xl overflow-hidden flex flex-col h-[400px] sm:h-[500px] md:h-[600px] border border-white/10">  
                  <DashboardTopBar />  
                  <div className="flex flex-1 overflow-hidden">  
                    <DashboardSidebar activeView={activeView} setActiveView={setActiveView} />  
                    <DashboardContent activeView={activeView} />  
                  </div>  
                </div>  
              </div>  
            </motion.div>  
          </div>  
        </div>  
      </div>  
    </>  
  );  
}