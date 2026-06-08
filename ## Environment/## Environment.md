## Environment  
  
This template is structured for a Next.js project with the App Router:  
  
- File paths use /components/... and /app/page.tsx  
- Components use the "use client" directive  
- Imports use the @/components/... path alias  
- Tailwind CSS for styling  
- framer-motion for animations  
- lucide-react for icons  
  
If you support this exact structure, apply the files below as written.  
  
If your builder uses a different structure (e.g. /src directory, Pages  
Router, or Vite + React), adapt the file paths and entry point — but  
keep every component file's CODE 100% IDENTICAL to what's provided  
below. Do not rewrite, refactor, or reinterpret any component.  
  
The only adaptations allowed are:  
- File paths (e.g. /src/components/... instead of /components/...)  
- Entry point file (e.g. src/App.tsx instead of app/page.tsx)  
- Removing "use client" directives if your builder doesn't use Next.js  
- Replacing the @/components/... alias with the correct relative path  
- Replacing Next.js-specific imports (e.g. next/image, next/link) with  
  standard equivalents (<img>, <a>) — only if your builder doesn't  
  support Next.js  
- Installing any missing dependencies via your builder's package manager  
  before applying the files  
  
Everything else — JSX, hooks, component names, default exports, props,  
className values, animations, styling, logic — stays exactly as written.  
The output must run without any errors.  
  
If your builder cannot support React + JSX at all, stop and tell the user  
before proceeding.  
  
## Add Template: Strova - Al Automation Landing Page  
  
### File 1 of 9: /components/templates/strova-al-automation-landing-page/Header 01 Strova.tsx  
  
"use client";  
  
import React, { useEffect, useState } from "react";  
import { motion } from "framer-motion";  
import { Menu, X, Search, Bell, Home, CheckCircle2, MoreHorizontal, Plus, ChevronRight, LayoutGrid, FileText, CreditCard, Landmark, Wallet, Settings, ArrowUpRight } from "lucide-react";  
import { cn } from "@/lib/utils";  
import { cva, type VariantProps } from "class-variance-authority";  
  
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
    { icon: Home, label: "Home" },  
    { icon: LayoutGrid, label: "Tasks", badge: "10" },  
    { icon: FileText, label: "Transactions" },  
    { icon: CreditCard, label: "Payments", chevron: true },  
    { icon: Wallet, label: "Cards" },  
    { icon: Landmark, label: "Capital" },  
    { icon: Landmark, label: "Accounts", chevron: true },  
  ];  
  
  const workflowItems = ["Track routes", "Payments", "Notifications", "Settings"];  
  
  return (  
    <div className="w-40 border-r border-white/5 bg-[#030513]/50 h-full flex-col p-3 shrink-0 hidden md:flex">  
      <div className="space-y-1 mb-6">  
        {menuItems.map((item, idx) => (  
          <div  
            key={idx}  
            onClick={() => setActiveView(item.label)}  
            className={cn(  
              "flex items-center justify-between px-2 py-1.5 rounded-md text-[11px] cursor-pointer hover:bg-white/5 transition-colors",  
              item.label === activeView ? "bg-white/10 text-[#E9EAF0] font-medium" : "text-[#9DA3B9]"  
            )}  
          >  
            <div className="flex items-center gap-2">  
              <item.icon className={cn("h-3 w-3", item.label === activeView ? "text-[#1D07FF]" : "text-[#9DA3B9]")} />  
              <span>{item.label}</span>  
            </div>  
            {item.badge && (  
              <span className="bg-[#1D07FF]/20 text-[#1D07FF] px-1 rounded-sm text-[9px]">{item.badge}</span>  
            )}  
            {item.chevron && <ChevronRight className="h-2.5 w-2.5 opacity-30" />}  
          </div>  
        ))}  
      </div>  
      <div className="mt-2">  
        <h3 className="px-2 text-[9px] font-semibold text-[#9DA3B9] uppercase tracking-wider mb-2">Workflows</h3>  
        <div className="space-y-1">  
          {workflowItems.map((item, idx) => (  
            <div  
              key={idx}  
              onClick={() => setActiveView(item)}  
              className={cn(  
                "px-2 py-1 text-[11px] cursor-pointer transition-colors",  
                item === activeView ? "text-[#E9EAF0] font-medium" : "text-[#9DA3B9] hover:text-[#E9EAF0]"  
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
    <div className="h-12 border-b border-white/5 bg-[#030513]/80 flex items-center justify-between px-4 shrink-0">  
      <div className="flex items-center gap-2">  
        <img  
          src="https://cdn.jiro.build/Strova/All%20SVG/strova-logo.svg"  
          alt="Strova Logo"  
          className="h-5 w-auto"  
        />  
        <span className="text-[11px] font-semibold text-[#E9EAF0]">Strova</span>  
        <ChevronRight className="h-3 w-3 opacity-30 rotate-90 text-[#E9EAF0]" />  
      </div>  
      <div className="flex-1 max-w-xs mx-4 sm:mx-8 relative hidden sm:block">  
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[#9DA3B9]" />  
        <div className="w-full h-7 bg-white/5 rounded-md border border-white/10 flex items-center justify-between px-8 text-[10px] text-[#9DA3B9]">  
          <span>Search...</span>  
          <span className="font-mono opacity-30">Cmd+K</span>  
        </div>  
      </div>  
      <div className="flex items-center gap-2 sm:gap-3">  
        <span className="text-[10px] font-medium px-2 py-1 bg-white/10 text-[#E9EAF0] rounded cursor-pointer hover:bg-white/20 transition-colors hidden xs:block">Move Money</span>  
        <Bell className="h-3.5 w-3.5 text-[#9DA3B9] cursor-pointer hover:text-[#E9EAF0] transition-colors" />  
        <div className="w-6 h-6 bg-[#1D07FF]/80 rounded-full flex items-center justify-center text-[9px] font-bold text-white uppercase cursor-pointer hover:opacity-80 transition-opacity">JB</div>  
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
            <stop offset="0%" stopColor="#1D07FF" stopOpacity="0.2" />  
            <stop offset="100%" stopColor="#1D07FF" stopOpacity="0" />  
          </linearGradient>  
        </defs>  
        <motion.path  
          initial={{ pathLength: 0, opacity: 0 }}  
          animate={{ pathLength: 1, opacity: 1 }}  
          transition={{ duration: 3, ease: "easeInOut" as const, repeat: Infinity as number, repeatDelay: 1 }}  
          d="M0 60 C 100 50, 200 70, 300 40 S 500 10, 600 35 S 800 65, 1000 30"  
          fill="none"  
          stroke="#1D07FF"  
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
    { date: "Live", desc: "Neural Link: Established", amount: "SECURE", status: "Active", statusColor: "text-emerald-400 bg-emerald-400/10" },  
    { date: "2m ago", desc: "Data Pipeline: Continuous Sync", amount: "+45.2GB/s", status: "Syncing", statusColor: "text-[#1D07FF] bg-[#1D07FF]/10" },  
    { date: "15m ago", desc: "Agent Alpha: Task Deployed", amount: "EXECUTING", status: "Running", statusColor: "text-amber-400 bg-amber-400/10" },  
    { date: "1h ago", desc: "System Optimization: Success", amount: "+12.4%", status: "Complete", statusColor: "text-emerald-400 bg-emerald-400/10" },  
  ];  
  
  return (  
    <div className="flex-1 bg-[#05061B]/20 p-4 sm:p-6 overflow-auto">  
      <motion.div  
        key={activeView}  
        initial={{ opacity: 0, x: 10 }}  
        animate={{ opacity: 1, x: 0 }}  
        transition={{ duration: 0.3 }}  
      >  
        {activeView === "Home" ? (  
          <>  
            <div className="mb-6">  
              <div className="flex items-center justify-between mb-3">  
                <h2 className="text-sm font-semibold text-[#E9EAF0]">Active Agents: <span className="text-[#1D07FF]">14</span></h2>  
                <motion.div  
                  animate={{ opacity: [0.4, 1, 0.4] }}  
                  transition={{ duration: 2, repeat: Infinity as number }}  
                  className="flex items-center gap-2"  
                >  
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />  
                  <span className="text-[10px] text-[#9DA3B9] uppercase tracking-widest font-mono hidden sm:inline">Real-time status</span>  
                </motion.div>  
              </div>  
              <div className="flex flex-wrap gap-2">  
                {[  
                  "Deploy",  
                  "Optimize",  
                  "Scale",  
                  "Logs",  
                  "Metrics",  
                  "Security",  
                ].map((label, idx) => (  
                  <motion.button  
                    key={idx}  
                    whileHover={{ scale: 1.05 }}  
                    whileTap={{ scale: 0.95 }}  
                    className={cn(  
                      "px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-medium border border-white/10 shadow-sm transition-all",  
                      label === "Deploy"  
                        ? "bg-[#1D07FF] text-white border-[#1D07FF] hover:bg-[#1D07FF]/90"  
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#1D07FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />  
                <div className="flex items-center justify-between mb-1">  
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#9DA3B9]">  
                    <span>Efficiency Index</span>  
                    <motion.div  
                      animate={{ scale: [1, 1.2, 1] }}  
                      transition={{ duration: 2, repeat: Infinity as number }}  
                    >  
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />  
                    </motion.div>  
                  </div>  
                </div>  
                <div className="text-xl sm:text-2xl font-semibold tracking-tight text-[#E9EAF0]">  
                  <Counter value={98.4} decimals={1} suffix="%" />  
                </div>  
                <div className="flex flex-wrap items-center gap-3 mt-3 text-[10px]">  
                  <span className="text-[#9DA3B9] uppercase tracking-wider font-semibold">Stats</span>  
                  <div className="flex items-center gap-1 text-emerald-400 font-medium">  
                    <ArrowUpRight className="h-2.5 w-2.5" />  
                    +1.8%  
                  </div>  
                  <div className="flex items-center gap-1 text-[#1D07FF] font-medium">  
                    <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity as number }}>  
                      Live  
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
                <div className="absolute inset-0 bg-gradient-to-bl from-[#1D07FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />  
                <div className="flex items-center justify-between mb-4">  
                  <span className="text-[11px] font-semibold text-[#E9EAF0]">Active Clusters</span>  
                  <div className="flex items-center gap-2">  
                    <Plus className="h-3 w-3 text-[#9DA3B9] cursor-pointer" />  
                    <MoreHorizontal className="h-3 w-3 text-[#9DA3B9] cursor-pointer" />  
                  </div>  
                </div>  
                <div className="space-y-1">  
                  {[  
                    { label: "Mainnet Cluster", amount: "Stable", status: "live" },  
                    { label: "Edge Nodes", amount: "Syncing", status: "sync" },  
                    { label: "Testnet API", amount: "Active", status: "live" },  
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
                            acc.status === "sync" ? "bg-[#1D07FF]" : "bg-emerald-500"  
                          )}  
                        />  
                        <span className="text-[#9DA3B9] truncate max-w-[100px]">{acc.label}</span>  
                      </div>  
                      <span className={cn(  
                        "font-medium",  
                        acc.amount === "Syncing" ? "text-[#1D07FF]" : "text-[#E9EAF0]"  
                      )}>  
                        {acc.amount}  
                      </span>  
                    </div>  
                  ))}  
                </div>  
              </motion.div>  
            </div>  
  
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 shadow-sm">  
              <h3 className="text-[11px] font-semibold mb-4 text-[#E9EAF0]">Agent Activity Logs</h3>  
              <div className="w-full overflow-hidden">  
                <div className="flex items-center text-[9px] sm:text-[10px] text-[#9DA3B9] font-medium border-b border-white/10 pb-2 mb-2 px-1 sm:px-2">  
                  <span className="w-14 sm:w-20">Time</span>  
                  <span className="flex-1 px-1 sm:px-0">Neural Action</span>  
                  <span className="hidden sm:block w-24 text-right">Throughput</span>  
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
                      <span className="w-14 sm:w-20 text-[#9DA3B9] font-mono">{t.date}</span>  
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
          <div className="flex flex-col items-center justify-center h-full py-20 text-center">  
            <motion.div  
              animate={{ rotate: 360 }}  
              transition={{ duration: 10, repeat: Infinity as number, ease: "linear" as const }}  
              className="w-16 h-16 rounded-full bg-[#1D07FF]/10 flex items-center justify-center mb-4"  
            >  
              <Settings className="h-8 w-8 text-[#1D07FF]" />  
            </motion.div>  
            <h2 className="text-xl font-semibold text-[#E9EAF0] mb-2">{activeView} System</h2>  
            <p className="text-[#9DA3B9] max-w-sm">  
              {"Establishing secure neural connection to " + activeView.toLowerCase() + " protocols..."}  
            </p>  
            <motion.div  
              animate={{ opacity: [1, 0.4, 1] }}  
              transition={{ duration: 1.5, repeat: Infinity as number }}  
              className="mt-6 font-mono text-[#1D07FF] text-[12px]"  
            >  
              ENCRYPTING_DATA_LINK_04X1...  
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
  const [activeView, setActiveView] = useState("Home");  
  
  useEffect(() => {  
    setIsMounted(true);  
  }, []);  
  
  return (  
    <>  
      <div  
        className={cn("min-h-screen w-full flex flex-col relative", className)}  
        style={{ backgroundColor: "#020205" }}  
      >  
        {/* Background Video */}  
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">  
          {isMounted && (  
            <video  
              autoPlay  
              muted  
              loop  
              playsInline  
              className="w-full h-full object-cover opacity-60"  
            >  
              <source  
                src="https://cdn.jiro.build/Strova/BG%20img/Page%2001%20Header%2001%20BG.mp4"  
                type="video/mp4"  
              />  
            </video>  
          )}  
          <div className="absolute inset-0 bg-gradient-to-b from-[#020205]/20 via-transparent to-[#020205]/80" />  
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
            >  
              <img  
                src="https://cdn.jiro.build/Strova/All%20SVG/strova-logo%20brand%20name.svg"  
                alt="Strova Logo"  
                className="h-[32px] md:h-[40px] w-auto"  
              />  
            </motion.div>  
  
            <div className="flex items-center gap-4 md:gap-8">  
              <motion.div  
                initial={{ opacity: 0, y: -5 }}  
                animate={{ opacity: 1, y: 0 }}  
                transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.1 }}  
                className="hidden lg:flex items-center gap-8 text-[16px] font-normal text-[#9DA3B9]"  
              >  
                {["Home", "Pricing", "About", "Contact"].map((link) => (  
                  <a key={link} href="#" className="hover:text-[#E9EAF0] transition-all duration-300">  
                    {link}  
                  </a>  
                ))}  
              </motion.div>  
  
              <motion.div  
                initial={{ opacity: 0, x: 15 }}  
                animate={{ opacity: 1, x: 0 }}  
                transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.2 }}  
                className="hidden sm:block"  
              >  
                <Button  
                  className="rounded-full px-6 md:px-8 h-[36px] md:h-[40px] text-[14px] md:text-[16px] font-medium transition-all duration-300 hover:shadow-[0_10px_20px_-5px_rgba(29,7,255,0.4)] active:scale-95 shadow-lg"  
                  style={{ backgroundColor: "#1D07FF", color: "#E9EAF0" }}  
                >  
                  Get Started  
                </Button>  
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
            className="absolute top-full left-0 w-full lg:hidden overflow-hidden bg-[#030513]/95 backdrop-blur-2xl border-t border-white/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.4)]"  
          >  
            <div className="max-w-[1440px] mx-auto w-full px-6 md:px-[64px]">  
              <div className="flex flex-col gap-4 py-8">  
                {["Home", "Pricing", "About", "Contact"].map((link) => (  
                  <a  
                    key={link}  
                    href="#"  
                    onClick={() => setIsMobileMenuOpen(false)}  
                    className="text-[#9DA3B9] text-[18px] hover:text-[#E9EAF0] py-2 transition-all w-fit"  
                  >  
                    {link}  
                  </a>  
                ))}  
                <div className="pt-2">  
                  <Button  
                    className="rounded-full w-full sm:w-fit px-8 h-[48px] text-[16px] font-medium shadow-lg"  
                    style={{ backgroundColor: "#1D07FF", color: "#E9EAF0" }}  
                    onClick={() => setIsMobileMenuOpen(false)}  
                  >  
                    Get Started  
                  </Button>  
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
              className="inline-flex items-center gap-2 rounded-full border border-[#E9EAF0]/10 bg-white/5 backdrop-blur-md px-5 py-2 text-[16px] text-[#9DA3B9] mb-[20px]"  
            >  
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D07FF] animate-pulse" />  
              <span>Now with GPT-5 support</span>  
            </motion.div>  
  
            {/* Headline */}  
            <motion.h1  
              initial={{ opacity: 0, y: 30 }}  
              animate={{ opacity: 1, y: 0 }}  
              transition={{ duration: 1.2, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.15 }}  
              className="text-center font-display text-4xl sm:text-5xl md:text-5xl lg:text-[5.5rem] leading-[1.1] md:leading-[1.05] tracking-tight text-[#E9EAF0] max-w-4xl"  
            >  
              <span className="font-sans font-normal">The Future of</span>{" "}  
              <span className="italic font-display">Smarter</span>{" "}  
              <span className="font-sans font-normal">Automation</span>  
            </motion.h1>  
  
            {/* Subheadline */}  
            <motion.p  
              initial={{ opacity: 0, y: 25 }}  
              animate={{ opacity: 1, y: 0 }}  
              transition={{ duration: 1.2, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.3 }}  
              className="mt-[20px] text-center text-[16px] md:text-[19px] lg:text-[22px] text-[#9DA3B9] max-w-[620px] lg:max-w-[850px] leading-relaxed font-normal"  
            >  
              Automate your busywork with intelligent agents that learn, adapt, and execute so your team can focus on what matters most.  
            </motion.p>  
  
            {/* CTA Buttons */}  
            <motion.div  
              initial={{ opacity: 0, y: 20 }}  
              animate={{ opacity: 1, y: 0 }}  
              transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.45 }}  
              className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"  
            >  
              <Button  
                className="rounded-full w-full sm:w-auto px-12 h-[56px] md:h-[60px] text-[16px] md:text-[18px] font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(29,7,255,0.5)] active:scale-95 shadow-lg"  
                style={{ backgroundColor: "#1D07FF", color: "#E9EAF0" }}  
              >  
                Book a demo  
              </Button>  
              <Button  
                className="rounded-full w-full sm:w-auto px-12 h-[56px] md:h-[60px] text-[16px] md:text-[18px] font-medium transition-all duration-300 hover:bg-white/[0.08] active:scale-95 border-none shadow-lg"  
                style={{ backgroundColor: "#050C45", color: "#E9EAF0" }}  
              >  
                Learn More  
              </Button>  
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
                <div className="bg-[#030513]/40 rounded-[20px] shadow-2xl overflow-hidden flex flex-col h-[400px] sm:h-[500px] md:h-[600px] border border-white/10">  
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
  
### File 2 of 9: /components/templates/strova-al-automation-landing-page/Why Choose Us 01 Strova.tsx  
  
"use client";  
  
import React, { useState } from "react";  
import { motion } from "framer-motion";  
import { Zap, BarChart3, Puzzle, Network, Sparkles } from "lucide-react";  
  
type CardData = {  
  icon: React.ElementType;  
  title: string;  
  description: string;  
  iconColor: string;  
  ui: React.ReactNode;  
};  
  
const cards: CardData[] = [  
  {  
    icon: Zap,  
    title: "Real-Time Intelligence",  
    description: "Access accurate, real-time data to drive smarter decisions",  
    iconColor: "#1D07FF",  
    ui: (  
      <div className="relative w-full h-full flex items-center justify-center">  
        <div className="relative w-[180px] h-[180px]">  
          <div className="absolute inset-0 rounded-full bg-[#1D07FF]/5 blur-[20px]" />  
          <div className="absolute inset-[10px] rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-inner backdrop-blur-[2px]" />  
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-[220deg]">  
            <circle  
              cx="50"  
              cy="50"  
              r="40"  
              fill="none"  
              stroke="#1D07FF"  
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
              stroke="#1D07FF"  
              strokeWidth="5"  
              strokeDasharray="180 360"  
              initial={{ strokeDashoffset: 180 }}  
              animate={{ strokeDashoffset: [180, 40, 100, 20] }}  
              transition={{ duration: 4, repeat: Infinity as number, ease: "easeInOut" as const }}  
              strokeLinecap="round"  
              className="drop-shadow-[0_0_15px_rgba(29,7,255,1)]"  
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#030513] border border-[#1D07FF]/50 shadow-[0_0_30px_#1D07FF] z-20 flex items-center justify-center">  
            <div className="w-4 h-4 rounded-full bg-[#1D07FF] flex items-center justify-center">  
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />  
            </div>  
          </div>  
          <motion.div  
            animate={{ rotate: [-40, 140, 80, 200] }}  
            transition={{ duration: 4, repeat: Infinity as number, ease: "easeInOut" as const }}  
            className="absolute top-1/2 left-1/2 w-[2px] h-[90px] origin-bottom -translate-x-1/2 -translate-y-full z-10"  
          >  
            <div className="w-full h-full bg-gradient-to-t from-[#1D07FF] via-[#1D07FF] to-white rounded-full relative">  
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
    icon: BarChart3,  
    title: "Measurable Impact",  
    description: "Track performance, uncover insights, and achieve data-backed growth",  
    iconColor: "#1D07FF",  
    ui: (  
      <div className="relative w-full h-[180px] flex items-end justify-center gap-5 px-10 pb-6">  
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[150px] bg-[#1D07FF]/10 blur-[60px] rounded-full" />  
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
            <div className="relative w-full h-full bg-[#1D07FF]/10 rounded-t-lg border border-white/10 overflow-hidden backdrop-blur-[1px]">  
              <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-[#1D07FF] via-[#4F46E5]/80 to-[#7C3AED]/60" />  
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
    icon: Puzzle,  
    title: "Seamless Integration",  
    description: "Connect tools, teams, and workflows with intelligent automation",  
    iconColor: "#1D07FF",  
    ui: (  
      <div className="relative w-full h-full flex items-center justify-center">  
        <div className="relative w-48 h-48">  
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1D07FF_1px,transparent_1px)] [background-size:20px_20px]" />  
          {([1, 1.4, 1.8] as number[]).map((scale: number, i: number) => (  
            <motion.div  
              key={i}  
              initial={{ scale: 0.5, opacity: 0 }}  
              animate={{ scale: scale, opacity: [0, 0.15, 0] }}  
              transition={{ duration: 5, repeat: Infinity as number, delay: i * 1.5 }}  
              className="absolute inset-0 border border-[#1D07FF] rounded-full"  
            />  
          ))}  
          <motion.div  
            animate={{ rotate: 360 }}  
            transition={{ duration: 40, repeat: Infinity as number, ease: "linear" as const }}  
            className="relative w-full h-full flex items-center justify-center"  
          >  
            <div className="relative w-20 h-20 bg-[#030513] rounded-3xl border-2 border-[#1D07FF] shadow-[0_0_50px_rgba(29,7,255,0.7)] z-20 flex items-center justify-center">  
              <motion.div  
                animate={{ scale: [1, 1.05, 1] }}  
                transition={{ duration: 3, repeat: Infinity as number }}  
                className="w-10 h-10 bg-gradient-to-br from-[#1D07FF] to-[#7C3AED] rounded-xl flex items-center justify-center shadow-[0_0_20px_#1D07FF]"  
              >  
                <Network className="w-6 h-6 text-white" />  
              </motion.div>  
              <div className="absolute inset-[-10px] border border-[#1D07FF]/20 rounded-3xl animate-pulse" />  
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
                    className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#1D07FF] to-transparent shadow-[0_0_8px_#1D07FF]"  
                  />  
                </div>  
                <motion.div  
                  animate={{ scale: [1, 1.1, 1] }}  
                  transition={{ duration: 3, delay: i * 0.3, repeat: Infinity as number }}  
                  className="absolute w-6 h-6 bg-[#030513]/80 backdrop-blur-md rounded-xl border border-[#1D07FF]/40 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(29,7,255,0.3)]"  
                  style={{  
                    transform: "rotate(" + angle + "deg) translateY(-85px) rotate(-" + angle + "deg)"  
                  } as React.CSSProperties}  
                >  
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1D07FF] shadow-[0_0_8px_#1D07FF]" />  
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
      className="relative w-full h-[420px] bg-[#030513] rounded-[32px] border border-white/[0.08] overflow-hidden group shadow-2xl"  
    >  
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(29,7,255,0.05),transparent_70%)]" />  
      <div className="absolute inset-0 pointer-events-none rounded-[32px] border border-white/[0.08]" />  
      <div className="relative h-full flex flex-col p-8 gap-5 z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">  
        <div className="flex-1 flex items-center justify-center min-h-[180px]">  
          {card.ui}  
        </div>  
        <div>  
          <div className="flex items-center gap-3 mb-3">  
            <div className="w-8 h-8 rounded-lg bg-[#1D07FF] flex items-center justify-center shadow-[0_0_15px_rgba(29,7,255,0.4)]">  
              <card.icon className="w-4 h-4 text-white" />  
            </div>  
            <h3 className="text-white text-2xl font-medium leading-tight">  
              {card.title}  
            </h3>  
          </div>  
          <p className="text-[#9DA3B9] text-[16px] leading-relaxed max-w-[320px]">  
            {card.description}  
          </p>  
        </div>  
      </div>  
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#1D07FF] blur-[120px] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />  
    </motion.div>  
  );  
}  
  
export default function P01WhyUsStorva({ className }: { className?: string }) {  
  return (  
    <>  
      <link rel="preconnect" href="https://fonts.googleapis.com" />  
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />  
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" crossOrigin="anonymous" />  
  
      <section className={"relative w-full py-16 md:py-24 lg:py-[120px] bg-[#030513] overflow-hidden " + (className || "")}>  
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#1D07FF]/5 blur-[150px] pointer-events-none" />  
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24">  
          <div className="flex flex-col items-center mb-12 md:mb-20 text-center">  
            <motion.div  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const }}  
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#0A0D21] backdrop-blur-xl px-5 py-2 mb-6 md:mb-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]"  
            >  
              <Sparkles className="w-4 h-4 text-[#1D07FF] fill-[#1D07FF]/20" />  
              <span className="uppercase tracking-[0.05em] text-[12px] md:text-[14px] font-medium text-white/90">Benefits</span>  
            </motion.div>  
  
            <motion.h2  
              initial={{ opacity: 0, y: 30 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ duration: 1.2, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.1 }}  
              className="font-display text-white text-[32px] sm:text-[42px] md:text-[56px] lg:text-[64px] leading-[1.2] md:leading-tight mb-4"  
            >  
              <span className="font-sans font-normal">Why Choose</span>{" "}  
              <span className="italic text-[#1D07FF] drop-shadow-[0_0_15px_rgba(29,7,255,0.5)]">Us?</span>  
            </motion.h2>  
  
            <motion.p  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.2 }}  
              className="text-[#9DA3B9] text-[16px] md:text-[18px] max-w-2xl px-4"  
            >  
              Everything you need to automate, optimize, and scale  
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
  
### File 3 of 9: /components/templates/strova-al-automation-landing-page/Services 01 Strova.tsx  
  
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
        "relative bg-[#030513] rounded-[32px] border border-white/[0.08] overflow-hidden group shadow-2xl flex flex-col h-[420px] md:h-[420px]",  
        className  
      )}  
    >  
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(29,7,255,0.05),transparent_70%)]" />  
      <div className="absolute inset-0 pointer-events-none rounded-[32px] border border-white/[0.08]" />  
      <div className="relative h-full flex flex-col p-8 gap-5 z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">  
        {children}  
      </div>  
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#1D07FF] blur-[120px] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />  
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
    { Icon: MousePointer2, color: "#1D07FF" },  
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
              className="absolute top-1/2 left-1/2 h-px bg-[#1D07FF] origin-left"  
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
  
export default function Services01Strova({ className }: { className?: string }) {  
  return (  
    <>  
      <link rel="preconnect" href="https://fonts.googleapis.com" />  
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />  
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />  
  
      <section className={"relative w-full py-16 md:py-24 lg:py-[120px] bg-[#030513] overflow-hidden " + (className || "")}>  
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#1D07FF]/5 blur-[150px] pointer-events-none" />  
  
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24">  
          <div className="flex flex-col items-center mb-12 md:mb-20 text-center">  
            <motion.div  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const }}  
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#0A0D21] backdrop-blur-xl px-5 py-2 mb-6 md:mb-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]"  
            >  
              <Layers className="w-4 h-4 text-[#1D07FF]" />  
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
              <span className="italic text-[#1D07FF] drop-shadow-[0_0_15px_rgba(29,7,255,0.5)]">Built with AI</span>  
            </motion.h2>  
  
            <motion.p  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const, delay: 0.2 }}  
              className="text-[#9DA3B9] text-[16px] md:text-[18px] max-w-2xl px-4"  
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
                            <item.icon className="w-4 h-4 text-[#1D07FF]" />  
                            <span className="text-white/80 text-xs md:text-sm font-medium">{item.label}</span>  
                          </div>  
                          {item.active ? (  
                            <CheckCircle2 className="w-4 h-4 text-[#1D07FF] fill-[#1D07FF]/10" />  
                          ) : (  
                            <RefreshCcw className={cn("w-4 h-4 text-[#1D07FF]/40", item.loading && "animate-spin")} />  
                          )}  
                        </motion.div>  
                      ))}  
                    </div>  
                  </div>  
                  <div>  
                    <h3 className="text-white text-xl md:text-2xl font-medium mb-2 md:mb-3">Task Automation</h3>  
                    <p className="text-[#9DA3B9] text-[14px] md:text-[16px] font-normal leading-relaxed">  
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
                          <div className="absolute inset-0 bg-[#1D07FF] blur-[60px] opacity-20" />  
                          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-[#1D07FF] bg-[#030513] flex items-center justify-center shadow-[0_0_40px_rgba(29,7,255,0.4)]">  
                            <Bot className="w-8 h-8 md:w-12 md:h-12 text-[#1D07FF]" />  
                          </div>  
                        </div>  
                      </div>  
                      <SatelliteOrbit />  
                    </div>  
                  </div>  
                  <div className="max-w-2xl">  
                    <h3 className="text-white text-xl md:text-2xl font-medium mb-2 md:mb-3">Automated Workflows</h3>  
                    <p className="text-[#9DA3B9] text-[14px] md:text-[18px] font-normal leading-relaxed">  
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
                    <div className="absolute inset-0 bg-[#1D07FF]/10 blur-[40px] rounded-full" />  
                    <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">  
                      <LineChart className="w-12 h-12 text-[#1D07FF] mb-4" />  
                      <div className="space-y-2">  
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">  
                          <motion.div  
                            initial={{ width: 0 }}  
                            whileInView={{ width: "75%" }}  
                            transition={{ duration: 1.5, delay: 0.5 }}  
                            className="h-full bg-[#1D07FF]"  
                          />  
                        </div>  
                        <div className="h-2 w-2/3 bg-white/10 rounded-full overflow-hidden">  
                          <motion.div  
                            initial={{ width: 0 }}  
                            whileInView={{ width: "90%" }}  
                            transition={{ duration: 1.5, delay: 0.7 }}  
                            className="h-full bg-[#1D07FF]"  
                          />  
                        </div>  
                      </div>  
                    </div>  
                  </div>  
                </div>  
                <div>  
                  <h3 className="text-white text-xl font-medium mb-2">Real-Time Insights</h3>  
                  <p className="text-[#9DA3B9] text-[16px] font-normal leading-relaxed line-clamp-2">  
                    Track data and gain insights for faster business decisions.  
                  </p>  
                </div>  
              </BeamCard>  
  
              <BeamCard width="100%">  
                <div className="flex-1 flex items-center justify-center">  
                  <div className="relative w-full max-w-[200px]">  
                    <div className="absolute inset-0 bg-[#1D07FF]/10 blur-[40px] rounded-full" />  
                    <div className="relative px-6 py-8 rounded-2xl border border-white/10 bg-[#0A0D21] backdrop-blur-md overflow-hidden">  
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
                        className="absolute bottom-4 right-4 w-10 h-10 rounded-lg bg-[#1D07FF] flex items-center justify-center shadow-[0_0_15px_#1D07FF]"  
                      >  
                        <Code2 className="w-5 h-5 text-white" />  
                      </motion.div>  
                    </div>  
                  </div>  
                </div>  
                <div>  
                  <h3 className="text-white text-xl font-medium mb-2">Custom AI Solutions</h3>  
                  <p className="text-[#9DA3B9] text-[16px] font-normal leading-relaxed line-clamp-2">  
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
                      className="absolute inset-0 rounded-full border border-dashed border-[#1D07FF]/20"  
                    />  
                    <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#1D07FF]/20 to-transparent border border-white/10 flex items-center justify-center backdrop-blur-md">  
                      <ShieldCheck className="w-16 h-16 text-[#1D07FF]" />  
                      <motion.div  
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}  
                        transition={{ duration: 2, repeat: Infinity as number }}  
                        className="absolute inset-0 rounded-full bg-[#1D07FF]/20"  
                      />  
                    </div>  
                  </div>  
                </div>  
                <div>  
                  <h3 className="text-white text-xl font-medium mb-2">Secure & Reliable</h3>  
                  <p className="text-[#9DA3B9] text-[16px] font-normal leading-relaxed line-clamp-2">  
                    Enterprise security to keep your data safe and operations smooth.  
                  </p>  
                </div>  
              </BeamCard>  
  
              <BeamCard width="100%">  
                <div className="flex-1 flex items-center justify-center">  
                  <div className="relative w-full max-w-[200px]">  
                    <div className="absolute inset-0 bg-[#1D07FF]/10 blur-[40px] rounded-full" />  
                    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">  
                      <div className="absolute inset-0 rounded-full border border-[#1D07FF]/20 animate-ping" />  
                      <div className="relative w-24 h-24 rounded-full bg-[#030513] border-2 border-[#1D07FF] flex items-center justify-center shadow-[0_0_30px_rgba(29,7,255,0.3)]">  
                        <Headphones className="w-10 h-10 text-[#1D07FF]" />  
                      </div>  
                      <motion.div  
                        animate={{ x: [0, 10, 0], y: [0, -5, 0] }}  
                        transition={{ duration: 3, repeat: Infinity as number }}  
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"  
                      >  
                        <div className="w-4 h-1 bg-[#1D07FF]/50 rounded-full" />  
                      </motion.div>  
                    </div>  
                  </div>  
                </div>  
                <div>  
                  <h3 className="text-white text-xl font-medium mb-2">Expert Support</h3>  
                  <p className="text-[#9DA3B9] text-[16px] font-normal leading-relaxed line-clamp-2">  
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
  
  
### File 4 of 9: /components/templates/strova-al-automation-landing-page/Metrics 01 Strova.tsx  
  
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
  
export default function Metrics01Strova({ className }: { className?: string }) {  
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
  
      <section className={"relative w-full py-16 md:py-24 lg:py-32 bg-[#020205] overflow-hidden " + (className || "")}>  
        {/* Background Gradients */}  
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#1D07FF]/5 blur-[120px] pointer-events-none" />  
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
                Results that <span className="font-serif italic text-[#1D07FF] drop-shadow-[0_0_15px_rgba(29,7,255,0.5)]">speak</span> <br />  
                for <span className="font-serif italic text-[#1D07FF] drop-shadow-[0_0_15px_rgba(29,7,255,0.5)]">themselves</span>  
              </motion.h2>  
            </div>  
            <motion.p  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ delay: 0.2 }}  
              className="text-[#9DA3B9] text-base md:text-lg max-w-[280px] leading-relaxed"  
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
                  className="relative h-[300px] bg-[#0A0D21]/30 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col group overflow-hidden"  
                >  
                  {/* Static Border */}  
                  <div className="absolute inset-0 rounded-[32px] border border-white/10 pointer-events-none" />  
                  <div className="absolute inset-0 bg-[#1D07FF]/5 blur-[80px] opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />  
  
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
                    <span className="font-sans text-[32px] sm:text-[42px] md:text-[56px] lg:text-[64px] text-[#1D07FF] leading-none">  
                      {metric.suffix}  
                    </span>  
                  </div>  
  
                  {/* Metric Label */}  
                  <p className="text-[#9DA3B9] text-base md:text-lg font-normal leading-tight">  
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
                className="relative h-[300px] bg-[#0A0D21]/30 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col transition-transform duration-500"  
              >  
                <div className="flex-1">  
                  <div className="mb-6">  
                    <Quote className="w-10 h-10 text-[#1D07FF] fill-[#1D07FF]/20" />  
                  </div>  
                  <p className="text-white text-lg md:text-xl lg:text-2xl font-light italic leading-tight max-w-lg">  
                    &quot;Automated our messy manual workflows in <span className="text-[#1D07FF] font-medium not-italic">under a week</span>. Violet just works for us.&quot;  
                  </p>  
                </div>  
  
                {/* Author Info */}  
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">  
                  <div className="flex items-center gap-4">  
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 ring-1 ring-[#1D07FF]/20">  
                      <img  
                        src="https://picsum.photos/seed/james/100/100"  
                        alt="James M."  
                        className="w-full h-full object-cover"  
                      />  
                    </div>  
                    <div>  
                      <h4 className="text-white font-medium text-sm md:text-base">James M.</h4>  
                      <p className="text-[#9DA3B9] text-[10px] md:text-xs">CTO, Capsule AI</p>  
                    </div>  
                  </div>  
  
                  {/* Company Logo Group */}  
                  <div className="flex items-center gap-2">  
                    <div className="relative flex items-center">  
                      <div className="w-5 h-5 rounded-full bg-[#1D07FF] opacity-60" />  
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
                className="relative h-[300px] bg-[#0A0D21]/30 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col justify-center transition-transform duration-500"  
              >  
                <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-normal mb-8 tracking-tight leading-tight whitespace-nowrap">  
                  Your first <span className="text-[#1D07FF]">30 days</span> are free.  
                </h3>  
                <p className="text-[#9DA3B9] text-sm md:text-base lg:text-lg leading-relaxed max-w-md">  
                  Try every feature, automate your first workflow, and see the results before you ever pay a thing.  
                </p>  
              </motion.div>  
            </div>  
  
            {/* Row 3: Get Started Today (Full Width) */}  
            <motion.div  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              className="w-full bg-[#0A0D21]/30 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 flex items-center justify-between"  
            >  
              <h4 className="text-white text-xl font-medium">Get started today</h4>  
              <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-white/20 bg-white/5 hover:bg-[#1D07FF] hover:border-[#1D07FF] transition-all group">  
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
  
### File 5 of 9: /components/templates/strova-al-automation-landing-page/How it Works 01 Strova.tsx  
  
"use client";  
  
import React, { useState } from "react";  
import { motion, AnimatePresence } from "framer-motion";  
import type { Variants } from "framer-motion";  
import {  
  Search,  
  Settings,  
  TrendingUp,  
  BarChart2,  
  Terminal,  
  Zap,  
  Activity,  
  Users,  
  Code  
} from "lucide-react";  
  
interface StepContent {  
  id: string;  
  number: string;  
  title: string;  
  subtitle: string;  
  description: string;  
  ui: React.ReactNode;  
}  
  
export default function HowItWorks01Strova({ className }: { className?: string }) {  
  const [activeStep, setActiveStep] = useState(1);  
  
  const steps: StepContent[] = [  
    {  
      id: "discover",  
      number: "01",  
      title: "Discover & Plan",  
      subtitle: "DISCOVER & PLAN",  
      description: "We begin by analyzing your existing workflows to identify bottlenecks and opportunities for automation. Our team crafts a strategic roadmap tailored to your business goals.",  
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
                <div className="w-8 h-8 rounded-lg bg-[#1D07FF]/20 flex items-center justify-center">  
                  {i === 1 && <Search className="w-4 h-4 text-[#1D07FF]" />}  
                  {i === 2 && <Users className="w-4 h-4 text-[#1D07FF]" />}  
                  {i === 3 && <Activity className="w-4 h-4 text-[#1D07FF]" />}  
                  {i === 4 && <Zap className="w-4 h-4 text-[#1D07FF]" />}  
                </div>  
                <div className="h-2 w-2/3 bg-white/20 rounded-full" />  
                <div className="h-2 w-1/2 bg-white/10 rounded-full" />  
              </motion.div>  
            ))}  
          </div>  
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">  
            <motion.path  
              d="M 100 100 Q 200 150 300 100"  
              stroke="#1D07FF"  
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
      id: "build",  
      number: "02",  
      title: "Build & Implement",  
      subtitle: "BUILD & IMPLEMENT",  
      description: "We build and implement intelligent workflows customized to your needs. Our team ensures seamless integration and reliable performance from day one.",  
      ui: (  
        <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 lg:p-6 gap-4 lg:gap-6">  
          <div className="w-full max-w-[400px] bg-[#0A0D21] border border-white/10 rounded-2xl p-6 relative z-0">  
            <div className="flex justify-between items-center mb-8">  
              <h4 className="text-white text-sm font-medium">Workflow Activity</h4>  
              <div className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded border border-white/10">This Month</div>  
            </div>  
            <div className="flex items-end justify-between h-32 gap-2">  
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (  
                <div key={i} className="flex-1 flex flex-col items-center gap-2">  
                  <motion.div  
                    initial={{ height: 0 }}  
                    animate={{ height: h + "%" }}  
                    className="w-full bg-[#1D07FF]/20 rounded-t-sm relative overflow-hidden"  
                  >  
                    <motion.div  
                      initial={{ height: 0 }}  
                      animate={{ height: "40%" }}  
                      className="absolute bottom-0 inset-x-0 bg-[#1D07FF]"  
                    />  
                  </motion.div>  
                  <span className="text-[8px] text-white/40">{"W" + (i + 1)}</span>  
                </div>  
              ))}  
            </div>  
            <div className="mt-8 pt-6 border-t border-white/5 flex gap-8">  
              <div>  
                <div className="flex items-center gap-2 text-[10px] text-white/40 mb-1">  
                  <Users className="w-3 h-3" /> Users  
                </div>  
                <div className="text-white font-bold text-lg">3.6K</div>  
              </div>  
              <div>  
                <div className="flex items-center gap-2 text-[10px] text-white/40 mb-1">  
                  <Zap className="w-3 h-3 text-[#1D07FF]" /> Automations  
                </div>  
                <div className="text-white font-bold text-lg">2M</div>  
              </div>  
            </div>  
          </div>  
          <motion.div  
            initial={{ x: 20, y: 20, opacity: 0 }}  
            animate={{ x: 40, y: -40, opacity: 1 }}  
            className="absolute right-4 bottom-4 w-full max-w-[340px] bg-[#05060F] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-10"  
          >  
            <div className="h-8 bg-white/5 flex items-center px-4 gap-1.5 border-b border-white/10">  
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />  
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />  
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />  
            </div>  
            <div className="p-4 font-mono text-[10px] leading-relaxed">  
              <div className="text-white/40 mb-1">1  // Build &amp; Implement =&gt;</div>  
              <div className="flex gap-2">  
                <span className="text-white/40">2</span>  
                <span className="text-blue-400">async function</span>  
                <span className="text-white">generateResponse(prompt) &#123;</span>  
              </div>  
              <div className="flex gap-2 pl-4">  
                <span className="text-white/40">3</span>  
                <span className="text-blue-400">const</span>  
                <span className="text-white">response = </span>  
                <span className="text-blue-400">await</span>  
                <span className="text-white">fetch(</span>  
                <span className="text-orange-300">&apos;https://api.violet.app/v1/chat&apos;</span>  
                <span className="text-white">, &#123;</span>  
              </div>  
              <div className="flex gap-2 pl-8">  
                <span className="text-white/40">4</span>  
                <span className="text-white">method: </span>  
                <span className="text-orange-300">&apos;POST&apos;</span>  
                <span className="text-white">,</span>  
              </div>  
              <div className="flex gap-2 pl-8">  
                <span className="text-white/40">5</span>  
                <span className="text-white">headers: &#123;</span>  
              </div>  
              <div className="flex gap-2 pl-12">  
                <span className="text-white/40">6</span>  
                <span className="text-orange-300">&apos;Content-Type&apos;</span>  
                <span className="text-white">: </span>  
                <span className="text-orange-300">&apos;application/json&apos;</span>  
              </div>  
              <div className="text-white/40">...</div>  
            </div>  
          </motion.div>  
        </div>  
      )  
    },  
    {  
      id: "optimize",  
      number: "03",  
      title: "Optimize & Scale",  
      subtitle: "OPTIMIZE & SCALE",  
      description: "Once your workflows are live, we continuously monitor performance and apply optimizations. We help you scale these automations across your entire organization seamlessly.",  
      ui: (  
        <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-6">  
          <div className="relative w-64 h-64 rounded-full border border-white/5 flex items-center justify-center">  
            <motion.div  
              animate={{ rotate: 360 }}  
              transition={{ duration: 20, repeat: Infinity as number, ease: "linear" as const }}  
              className="absolute inset-0"  
            >  
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#1D07FF] rounded-xl flex items-center justify-center">  
                <TrendingUp className="w-5 h-5 text-white" />  
              </div>  
            </motion.div>  
            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#1D07FF]/20 to-transparent border border-white/10 flex flex-col items-center justify-center">  
              <BarChart2 className="w-12 h-12 text-[#1D07FF] mb-2" />  
              <span className="text-2xl font-bold text-white">+140%</span>  
              <span className="text-[10px] text-white/40">Efficiency</span>  
            </div>  
          </div>  
        </div>  
      )  
    }  
  ];  
  
  return (  
    <>  
      <link rel="preconnect" href="https://fonts.googleapis.com" />  
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />  
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" crossOrigin="anonymous" />  
  
      <section className={"py-20 bg-[#020410] overflow-hidden " + (className || "")}>  
        <div className="max-w-[1248px] mx-auto px-6">  
          <div className="flex flex-col items-center text-center mb-16">  
            <motion.div  
              initial={{ opacity: 0, scale: 0.9 }}  
              whileInView={{ opacity: 1, scale: 1 }}  
              viewport={{ once: true }}  
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"  
            >  
              <div className="w-4 h-4 rounded-sm bg-[#1D07FF]/20 flex items-center justify-center">  
                <Zap className="w-2.5 h-2.5 text-[#1D07FF]" />  
              </div>  
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">Process</span>  
            </motion.div>  
  
            <motion.h2  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              className="text-4xl md:text-5xl lg:text-[56px] font-sans text-white leading-[1.1] mb-6"  
            >  
              Our Simple &amp; <span className="font-display italic text-[#1D07FF] drop-shadow-[0_0_15px_rgba(29,7,255,0.5)]">Smart Process</span>  
            </motion.h2>  
  
            <motion.p  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ delay: 0.1 }}  
              className="text-[#9DA3B9] text-lg max-w-2xl"  
            >  
              Everything you need to automate, optimize, and scale, all in one place.  
            </motion.p>  
          </div>  
  
          <div className="mt-[64px] bg-[#0A0D21]/30 backdrop-blur-xl border border-white/10 rounded-[32px] p-4 md:p-8 relative group">  
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">  
              <svg className="w-full h-full" preserveAspectRatio="none">  
                <motion.rect  
                  width="100%"  
                  height="100%"  
                  rx="32"  
                  fill="none"  
                  stroke="#1D07FF"  
                  strokeWidth="2"  
                  pathLength="1"  
                  strokeDasharray="0.1 0.9"  
                  animate={{ strokeDashoffset: [0, -1] }}  
                  transition={{ duration: 6, repeat: Infinity as number, ease: "linear" as const }}  
                  style={{ filter: "drop-shadow(0 0 8px #1D07FF)" }}  
                />  
              </svg>  
            </div>  
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-[#1D07FF] blur-xl opacity-30 rounded-full" />  
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">  
              {steps.map((step, idx) => (  
                <button  
                  key={step.id}  
                  onClick={() => setActiveStep(idx + 1)}  
                  className={"relative flex items-center justify-center gap-4 py-4 px-6 rounded-2xl transition-all duration-300 border " + (activeStep === idx + 1 ? "bg-[#1D07FF]/10 border-[#1D07FF]/50 shadow-[0_0_20px_rgba(29,7,255,0.15)]" : "bg-white/5 border-white/5 hover:bg-white/10")}  
                >  
                  <div className={"w-10 h-10 rounded-[6px] flex items-center justify-center text-sm font-bold border " + (activeStep === idx + 1 ? "bg-[#1D07FF]/20 border-[#1D07FF] text-[#1D07FF]" : "bg-white/5 border-white/10 text-white/40")}>  
                    {step.number}  
                  </div>  
                  <span className={"text-[14px] font-normal tracking-widest uppercase " + (activeStep === idx + 1 ? "text-white" : "text-white/40")}>  
                    {step.subtitle}  
                  </span>  
                  {activeStep === idx + 1 && (  
                    <motion.div  
                      layoutId="tab-glow"  
                      className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#1D07FF] to-transparent shadow-[0_0_10px_#1D07FF]"  
                    />  
                  )}  
                </button>  
              ))}  
            </div>  
  
            <div className="min-h-0 lg:min-h-[450px] lg:border lg:border-white/10 lg:rounded-[24px] p-0 lg:p-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">  
              <div className="w-full lg:w-1/2 h-[450px] bg-[#0A0D21]/30 border border-white/10 rounded-[24px] relative overflow-hidden flex items-center justify-center">  
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
                    <span className="text-[#1D07FF] font-bold text-3xl mb-4 block">  
                      {steps[activeStep - 1].number}  
                    </span>  
                    <h3 className="text-white text-3xl md:text-4xl font-normal mb-6 tracking-tight">  
                      {steps[activeStep - 1].title}  
                    </h3>  
                    <p className="text-[#9DA3B9] text-base md:text-lg leading-relaxed font-normal">  
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
  
### File 6 of 9: /components/templates/strova-al-automation-landing-page/Testimonial 01 Strova.tsx  
  
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
    quote: "Strova AI Automation completely streamlined our workflow. We went from manual and messy to fully automated in just days. Productivity is up, costs are down, and our team can finally focus on growth.",  
    name: "Alex Morgan",  
    role: "Founder & CEO, GrowthFlow"  
  },  
  {  
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",  
    quote: "The efficiency gains we've seen since implementing Strova are staggering. What used to take hours now happens in minutes, with zero errors. It's been a game-changer for our scale operations.",  
    name: "Sarah Chen",  
    role: "COO, TechScale AI"  
  },  
  {  
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",  
    quote: "Integrating AI into our legacy systems seemed impossible until we met Strova. Their process was seamless, and the results were immediate. Our ROI has exceeded all initial projections.",  
    name: "Michael Ross",  
    role: "CTO, Legacy Dynamics"  
  }  
];  
  
export default function Testimonial01Strova({ className }: { className?: string }) {  
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
  
      <section className={"py-20 bg-[#020410] overflow-hidden " + (className || "")}>  
        <div className="max-w-[1248px] mx-auto px-6">  
          {/* Header Section */}  
          <div className="flex flex-col items-center text-center mb-16">  
            <motion.div  
              initial={{ opacity: 0, scale: 0.9 }}  
              whileInView={{ opacity: 1, scale: 1 }}  
              viewport={{ once: true }}  
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"  
            >  
              <div className="w-4 h-4 rounded-sm bg-[#1D07FF]/20 flex items-center justify-center">  
                <MessageSquare className="w-2.5 h-2.5 text-[#1D07FF]" />  
              </div>  
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">Testimonials</span>  
            </motion.div>  
  
            <motion.h2  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              className="text-4xl md:text-5xl lg:text-[56px] font-sans text-white leading-[1.1] mb-6"  
            >  
              What our clients are <span className="font-display italic text-[#1D07FF] drop-shadow-[0_0_15px_rgba(29,7,255,0.5)]">saying</span>  
            </motion.h2>  
  
            <motion.p  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ delay: 0.1 }}  
              className="text-[#9DA3B9] text-lg max-w-2xl"  
            >  
              Real results and experiences from businesses who transformed their operations with Strova AI Automation.  
            </motion.p>  
          </div>  
  
          {/* Testimonials Content Container */}  
          <div className="flex flex-col md:flex-row items-stretch gap-6">  
            {/* Left: User Image */}  
            <div className="w-full md:w-[380px] lg:w-[506px] flex-shrink-0">  
              <div className="relative aspect-square md:h-full w-full rounded-[24px] overflow-hidden border border-white/10 bg-[#020410] group">  
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020410] via-[#020410]/20 to-transparent opacity-80" />  
                  </motion.div>  
                </AnimatePresence>  
              </div>  
            </div>  
  
            {/* Right: Testimonial Card */}  
            <div className="flex-grow bg-[#0A0D21]/30 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 lg:p-8 xl:p-12 flex flex-col justify-center min-h-[400px]">  
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
                    <Quote className="w-12 h-12 text-[#1D07FF]" fill="#1D07FF" />  
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
                      <p className="text-[#9DA3B9] text-base md:text-lg">  
                        {testimonials[currentIndex].role}  
                      </p>  
                    </div>  
  
                    {/* Navigation Buttons */}  
                    <div className="flex gap-4 mb-4">  
                      <button  
                        onClick={prevTestimonial}  
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#1D07FF]/60 hover:text-[#1D07FF] hover:border-[#1D07FF]/50 hover:bg-[#1D07FF]/5 transition-all duration-300"  
                      >  
                        <ChevronLeft className="w-8 h-8" />  
                      </button>  
                      <button  
                        onClick={nextTestimonial}  
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#1D07FF]/60 hover:text-[#1D07FF] hover:border-[#1D07FF]/50 hover:bg-[#1D07FF]/5 transition-all duration-300"  
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
                        className={"h-1.5 rounded-full transition-all duration-300 " + (currentIndex === idx ? "w-8 bg-[#1D07FF]" : "w-2 bg-white/20")}  
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
  
### File 7 of 9: /components/templates/strova-al-automation-landing-page/Pricing 01 Strova.tsx  
  
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
  
export default function Pricing01Strova({ className }: { className?: string }) {  
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);  
  const [_isExpertHovered, setIsExpertHovered] = useState(false);  
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");  
  
  return (  
    <>  
      <link rel="preconnect" href="https://fonts.googleapis.com" />  
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />  
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />  
  
      <section className={"py-20 bg-[#020410] overflow-hidden " + (className || "")}>  
        <div className="max-w-[1248px] mx-auto px-4 md:px-8 lg:px-0">  
          {/* Header Section */}  
          <div className="flex flex-col items-center text-center mb-12">  
            <motion.div  
              initial={{ opacity: 0, scale: 0.9 }}  
              whileInView={{ opacity: 1, scale: 1 }}  
              viewport={{ once: true }}  
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"  
            >  
              <div className="w-4 h-4 rounded-sm bg-[#1D07FF]/20 flex items-center justify-center">  
                <Tag className="w-2.5 h-2.5 text-[#1D07FF]" />  
              </div>  
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">Pricing</span>  
            </motion.div>  
  
            <motion.h2  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              className="text-4xl md:text-5xl lg:text-[56px] font-sans text-white leading-[1.1] mb-6"  
            >  
              Plans and <span className="font-display italic text-[#1D07FF] drop-shadow-[0_0_15px_rgba(29,7,255,0.5)]">Pricing</span>  
            </motion.h2>  
  
            <motion.p  
              initial={{ opacity: 0, y: 20 }}  
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}  
              transition={{ delay: 0.1 }}  
              className="text-[#9DA3B9] text-lg max-w-2xl mb-16"  
            >  
              Flexible plans designed to scale your automation with <span className="text-[#1D07FF]">Strova</span>.  
            </motion.p>  
  
            {/* Toggle */}  
            <div className="flex flex-col sm:flex-row items-center gap-4 p-1.5 rounded-2xl sm:rounded-full bg-[#0A0D21] border border-white/10">  
              <button  
                onClick={() => setBillingCycle("monthly")}  
                className={"w-full sm:w-auto px-8 py-2.5 rounded-xl sm:rounded-full text-sm md:text-base font-bold transition-all duration-300 " + (billingCycle === "monthly" ? "bg-[#1D07FF] text-white shadow-[0_0_20px_rgba(29,7,255,0.3)]" : "text-white/40 hover:text-white")}  
              >  
                Monthly  
              </button>  
              <button  
                onClick={() => setBillingCycle("annual")}  
                className={"w-full sm:w-auto px-4 sm:px-8 py-2.5 rounded-xl sm:rounded-full text-sm md:text-base font-bold transition-all duration-300 flex items-center justify-center gap-3 " + (billingCycle === "annual" ? "bg-[#1D07FF] text-white shadow-[0_0_20px_rgba(29,7,255,0.3)]" : "text-white/40 hover:text-white")}  
              >  
                Annual  
                <div className={"px-2.5 py-1 rounded-md sm:rounded-full border border-white/20 bg-white/10 text-[10px] md:text-xs font-bold transition-colors " + (billingCycle === "annual" ? "text-white" : "text-[#1D07FF]")}>  
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
                  className={"relative w-full lg:max-w-[400px] h-full bg-[#0A0D21]/30 backdrop-blur-xl border rounded-[32px] p-8 md:p-12 lg:p-8 flex flex-col transition-all duration-500 overflow-hidden " + (isActive ? "border-[#1D07FF]/50 shadow-[0_0_40px_rgba(29,7,255,0.1)] translate-y-[-8px] lg:scale-[1.02] z-10" : "border-white/10 hover:border-white/20")}  
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
                    <p className="text-[#9DA3B9] text-[18px] font-normal mb-6">{plan.tagline}</p>  
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
                    className="text-[#9DA3B9] text-[18px] font-normal mt-4 mb-8"  
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
                      className={"w-full py-4 rounded-full text-sm font-bold border transition-all duration-300 " + (isActive ? "bg-[#1D07FF] border-[#1D07FF] text-white shadow-[0_0_20px_rgba(29,7,255,0.3)]" : "bg-transparent border-white/20 text-white hover:bg-white/5")}  
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
                        <li key={idx} className="flex items-center gap-3 text-[#9DA3B9] text-[18px] font-normal">  
                          <Check className="w-5 h-5 text-[#1D07FF] flex-shrink-0" />  
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
                      <span className="text-white text-xl font-medium transition-colors duration-300 group-hover:text-[#1D07FF]">Contact Sales</span>  
                      <ArrowRight className="w-5 h-5 text-white transition-all duration-300 group-hover:text-[#1D07FF] group-hover:translate-x-1" />  
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
            className="relative bg-[#0A0D21]/30 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 md:p-12 overflow-hidden group"  
          >  
            {/* Static Border */}  
            <div className="absolute inset-0 pointer-events-none rounded-[32px] border border-white/10" />  
  
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 transition-transform duration-500 group-hover:translate-y-[-2px]">  
              <div className="max-w-md text-center lg:text-left">  
                <h2 className="text-white text-2xl md:text-[32px] font-normal mb-4">Need a Human Expert?</h2>  
                <p className="text-[#9DA3B9] text-base md:text-[18px] font-normal">  
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
                    <div className="text-[10px] md:text-xs text-[#1D07FF] font-bold">ex-Dyson, AWA Digital, Blubolt</div>  
                  </div>  
                </div>  
  
                {/* Coaches Counter */}  
                <div className="flex items-center gap-4 sm:pl-8 sm:border-l border-white/10">  
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#1D07FF]/50 bg-[#1D07FF]/10 flex items-center justify-center text-xl md:text-2xl font-bold text-[#1D07FF] shadow-[0_0_20px_rgba(29,7,255,0.2)] flex-shrink-0">  
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
  
### File 8 of 9: /components/templates/strova-al-automation-landing-page/Integration 01 Strova.tsx  
  
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
      className={"group relative flex items-center gap-4 bg-[#050714]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-full md:w-[220px] lg:w-[340px] transition-all duration-500 hover:border-[#1D07FF]/50 hover:bg-[#0A0D21]/90 hover:shadow-[0_0_30px_rgba(29,7,255,0.1)]"}  
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
        <p className="text-[#9DA3B9] text-[11px] font-medium leading-tight opacity-70 group-hover:opacity-100 transition-opacity duration-300">{description}</p>  
      </div>  
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-[#1D07FF] group-hover:text-white transition-all duration-300 cursor-pointer border border-white/5 group-hover:border-[#1D07FF]">  
        <Plus className="w-4 h-4" />  
      </div>  
      <div  
        className={"absolute top-1/2 -translate-y-1/2 " + (side === 'left' ? '-right-1.5' : '-left-1.5') + " w-3 h-3 rounded-full bg-[#1D07FF] border-2 border-[#020410] z-10 hidden md:block shadow-[0_0_8px_#1D07FF]"}  
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
                stroke="#1D07FF"  
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
                fill="#1D07FF"  
              />  
            </React.Fragment>  
          );  
        })}  
      </svg>  
    </div>  
  );  
}  
  
export default function Integration01Strova({ className }: { className?: string }) {  
  const leftTools: { name: string; description: string; icon: string | React.ReactNode; iconColor: string }[] = [  
    { name: "ChatGPT", description: "GPT-4o, o1, o1-mini & more", icon: "https://cdn.jiro.build/Strova/All%20SVG/ChatGPT.svg", iconColor: "#9DA3B9" },  
    { name: "Claude", description: "Claude 3.5 Sonnet & more", icon: "https://cdn.jiro.build/Strova/All%20SVG/Claude.svg", iconColor: "#9DA3B9" },  
    { name: "Gemini", description: "Gemini 1.5 Pro & more", icon: "https://cdn.jiro.build/Strova/All%20SVG/Gemini.svg", iconColor: "#9DA3B9" },  
    { name: "MidJourney", description: "Image Generation", icon: "https://cdn.jiro.build/Strova/All%20SVG/MidJourney.svg", iconColor: "#9DA3B9" },  
    { name: "DALL-E", description: "Image Generation", icon: "https://cdn.jiro.build/Strova/All%20SVG/ChatGPT.svg", iconColor: "#9DA3B9" },  
  ];  
  
  const rightTools: { name: string; description: string; icon: string | React.ReactNode; iconColor: string }[] = [  
    { name: "DeepL", description: "Advanced Translation", icon: "https://cdn.jiro.build/Strova/All%20SVG/DeepL.svg", iconColor: "#9DA3B9" },  
    { name: "HeyGen", description: "Video Generation", icon: "https://cdn.jiro.build/Strova/All%20SVG/HeyGen.svg", iconColor: "#9DA3B9" },  
    { name: "DeepGram", description: "Voice AI", icon: "https://cdn.jiro.build/Strova/All%20SVG/DeepGram.svg", iconColor: "#9DA3B9" },  
    { name: "ElevenLabs", description: "Voice Generation", icon: "https://cdn.jiro.build/Strova/All%20SVG/ElevenLabs.svg", iconColor: "#9DA3B9" },  
    {  
      name: "And More",  
      description: "New models added regularly",  
      icon: (  
        <div className="flex items-center justify-center font-bold text-xs tracking-tighter opacity-80">AI</div>  
      ),  
      iconColor: "#9DA3B9"  
    },  
  ];  
  
  return (  
    <section className={"relative py-24 bg-[#020410] overflow-hidden min-h-screen flex items-center " + (className || "")}>  
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(29,7,255,0.06)_0%,transparent_50%)] pointer-events-none" />  
  
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full">  
        <div className="text-center mb-16">  
          <motion.div  
            initial={{ opacity: 0, y: 10 }}  
            whileInView={{ opacity: 1, y: 0 }}  
            viewport={{ once: true }}  
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#1D07FF]/30 bg-[#1D07FF]/5 mb-8"  
          >  
            <Layers className="w-4 h-4 text-[#1D07FF]" />  
            <span className="text-white text-xs font-bold tracking-widest uppercase">AI Ecosystem</span>  
          </motion.div>  
  
          <motion.h2  
            initial={{ opacity: 0, y: 30 }}  
            whileInView={{ opacity: 1, y: 0 }}  
            viewport={{ once: true }}  
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}  
            className="text-white text-4xl md:text-6xl lg:text-[72px] font-normal leading-[1.1] mb-6"  
          >  
            One AI Space. <br /> <span className="font-display italic font-light text-[#1D07FF]">Endless</span> Possibilities.  
          </motion.h2>  
  
          <motion.p  
            initial={{ opacity: 0, y: 20 }}  
            whileInView={{ opacity: 1, y: 0 }}  
            viewport={{ once: true }}  
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}  
            className="text-[#9DA3B9] text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-16"  
          >  
            Access the best AI models in one unified workspace. <br className="hidden md:block" />  
            Compare, create, and scale — all in <span className="text-[#1D07FF] font-medium">Strova</span>.  
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
              <div className="absolute inset-2 md:inset-4 lg:inset-8 rounded-full bg-gradient-to-br from-[#1D07FF] to-[#0A0D21] flex items-center justify-center overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(29,7,255,0.4)]">  
                <div className="absolute inset-0 bg-[#0A0D21]/40 backdrop-blur-xl" />  
                <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 lg:w-20 lg:h-20">  
                  <Image  
                    src="https://cdn.jiro.build/Strova/All%20SVG/strova-logo-white.svg"  
                    alt="Strova Logo"  
                    fill  
                    className="object-contain"  
                    referrerPolicy="no-referrer"  
                  />  
                </div>  
                <motion.div  
                  animate={{ opacity: [0.1, 0.3, 0.1] }}  
                  transition={{ duration: 4, repeat: Infinity as number, ease: "easeInOut" as const }}  
                  className="absolute inset-0 bg-[#1D07FF] pointer-events-none"  
                />  
              </div>  
  
              <motion.div  
                animate={{ rotate: 360 }}  
                transition={{ duration: 25, repeat: Infinity as number, ease: "linear" as const }}  
                className="absolute inset-0 rounded-full border border-dashed border-[#1D07FF]/20"  
              />  
  
              <motion.div  
                animate={{  
                  scale: [1, 1.3, 1],  
                  opacity: [0.2, 0.1, 0.2]  
                }}  
                transition={{ duration: 5, repeat: Infinity as number, ease: "easeInOut" as const }}  
                className="absolute inset-[-20%] rounded-full bg-[#1D07FF] blur-3xl -z-10"  
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
  
### File 9 of 9: /components/templates/strova-al-automation-landing-page/Footer 01 Strova.tsx  
  
"use client";  
  
import React from "react";  
import Image from "next/image";  
import { motion } from "framer-motion";  
import {  
  MessageCircle,  
  Mail,  
  Phone,  
  MapPin,  
  Building2,  
  Clock,  
  Send,  
  Facebook,  
  Twitter,  
  Instagram,  
  Linkedin,  
  ArrowRight  
} from "lucide-react";  
  
export default function Footer01Strova({ className }: { className?: string }) {  
  return (  
    <>  
      <footer className={"relative bg-[#020410] pt-24 pb-12 overflow-hidden " + (className || "")}>  
        {/* Background Video */}  
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">  
          <video  
            autoPlay  
            loop  
            muted  
            playsInline  
            className="w-full h-full object-cover opacity-60"  
          >  
            <source src="https://cdn.jiro.build/Strova/BG%20img/Page%2001%20Footer%20BG.mp4" type="video/mp4" />  
          </video>  
          <div className="absolute inset-0 bg-[#020410]/40" />  
        </div>  
  
        {/* Background radial glow */}  
        <div className="absolute bottom-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(circle_at_bottom_right,rgba(29,7,255,0.08)_0%,transparent_60%)] pointer-events-none" />  
        <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-[radial-gradient(circle_at_top_left,rgba(29,7,255,0.04)_0%,transparent_60%)] pointer-events-none" />  
  
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-20">  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-20">  
  
            {/* Left Section */}  
            <motion.div  
              initial={{ opacity: 0, x: -20 }}  
              whileInView={{ opacity: 1, x: 0 }}  
              viewport={{ once: true }}  
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}  
            >  
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1D07FF]/30 bg-[#1D07FF]/5 mb-10">  
                <MessageCircle className="w-4 h-4 text-[#1D07FF]" />  
                <span className="text-white text-[11px] font-bold tracking-widest uppercase">Automation Consult</span>  
              </div>  
  
              <h2 className="text-white text-5xl lg:text-[72px] font-normal leading-[1.1] mb-2">  
                Let&apos;s build <br /> your AI system  
              </h2>  
              <h3 className="font-display italic font-light text-[#4A88FF] text-4xl lg:text-[56px] leading-[1.1] mb-8">  
                that runs your business  
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
                className="h-1 bg-gradient-to-r from-[#1D07FF] to-transparent mb-12 rounded-full"  
              />  
  
              <div className="max-w-md">  
                <p className="text-[#9DA3B9] text-lg leading-relaxed mb-1">  
                  Turn your manual workflows into intelligent  
                </p>  
                <p className="text-[#9DA3B9] text-lg leading-relaxed flex items-center gap-1.5">  
                  systems with <span className="text-[#1D07FF] font-semibold">Strova.</span>  
                </p>  
                <p className="text-[#9DA3B9] text-lg leading-relaxed mt-1">  
                  Automate, optimize, and scale &mdash;  
                </p>  
                <p className="text-[#9DA3B9] text-lg leading-relaxed">  
                  without adding complexity.  
                </p>  
              </div>  
  
              <motion.a  
                href="#"  
                whileHover={{ x: 5 }}  
                className="group inline-flex items-center gap-3 text-white text-xl font-medium mt-16 border-b border-white/10 pb-2 hover:border-[#1D07FF] transition-colors duration-300"  
              >  
                Ready to automate your workflow?  
                <ArrowRight className="w-5 h-5 text-[#1D07FF] group-hover:translate-x-1 transition-transform" />  
              </motion.a>  
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
                  <div className="w-10 h-10 rounded-xl bg-[#1D07FF]/10 flex items-center justify-center border border-[#1D07FF]/20">  
                    <Mail className="w-5 h-5 text-[#1D07FF]" />  
                  </div>  
                  <h4 className="text-white text-lg font-normal">Connect with us</h4>  
                </div>  
  
                <div className="flex items-center gap-4 group cursor-pointer">  
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#1D07FF]/10 group-hover:border-[#1D07FF]/30 transition-all duration-300">  
                    <Mail className="w-5 h-5 text-[#1D07FF]" />  
                  </div>  
                  <span className="text-[#9DA3B9] group-hover:text-white transition-colors">hello@strova.ai</span>  
                </div>  
  
                <div className="flex items-center gap-4 group cursor-pointer">  
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#1D07FF]/10 group-hover:border-[#1D07FF]/30 transition-all duration-300">  
                    <Phone className="w-5 h-5 text-[#1D07FF]" />  
                  </div>  
                  <span className="text-[#9DA3B9] group-hover:text-white transition-colors">+1 (888) 807-5000</span>  
                </div>  
              </div>  
  
              {/* Address Section */}  
              <div className="space-y-6">  
                <div className="flex items-center gap-3 mb-8">  
                  <div className="w-10 h-10 rounded-xl bg-[#1D07FF]/10 flex items-center justify-center border border-[#1D07FF]/20">  
                    <MapPin className="w-5 h-5 text-[#1D07FF]" />  
                  </div>  
                  <h4 className="text-white text-lg font-normal">Address</h4>  
                </div>  
  
                <div className="flex items-start gap-4">  
                  <div className="mt-1 w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">  
                    <Building2 className="w-5 h-5 text-[#1D07FF]" />  
                  </div>  
                  <div className="text-[#9DA3B9]">  
                    <p className="text-white font-normal mb-1">Strova HQ</p>  
                    <p className="text-sm leading-relaxed">123 Innovation Avenue, Suite 400</p>  
                    <p className="text-sm leading-relaxed">San Francisco, CA 94103</p>  
                  </div>  
                </div>  
              </div>  
  
              {/* Insights Section */}  
              <div className="space-y-6 lg:mt-4">  
                <div className="flex items-center gap-3 mb-8">  
                  <div className="w-10 h-10 rounded-xl bg-[#1D07FF]/10 flex items-center justify-center border border-[#1D07FF]/20">  
                    <Send className="w-5 h-5 text-[#1D07FF]" />  
                  </div>  
                  <h4 className="text-white text-lg font-normal">Get automation insights</h4>  
                </div>  
  
                <div className="relative max-w-sm">  
                  <input  
                    type="email"  
                    placeholder="Enter your email"  
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-6 pr-16 text-white placeholder:text-[#9DA3B9]/50 focus:outline-none focus:border-[#1D07FF]/50 transition-colors"  
                  />  
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-lg bg-gradient-to-br from-[#1D07FF] to-[#0A0D21] flex items-center justify-center text-white hover:shadow-[0_0_20px_rgba(29,7,255,0.3)] transition-all">  
                    <ArrowRight className="w-5 h-5" />  
                  </button>  
                </div>  
                <p className="text-[#9DA3B9]/60 text-xs leading-relaxed max-w-[280px]">  
                  Actionable insights, automation tips, and product updates.  
                </p>  
              </div>  
  
              {/* Hours & Social Section */}  
              <div className="space-y-12 lg:mt-4">  
                {/* Hours */}  
                <div className="space-y-6">  
                  <div className="flex items-center gap-3 mb-8">  
                    <div className="w-10 h-10 rounded-xl bg-[#1D07FF]/10 flex items-center justify-center border border-[#1D07FF]/20">  
                      <Clock className="w-5 h-5 text-[#1D07FF]" />  
                    </div>  
                    <h4 className="text-white text-lg font-normal">Hours</h4>  
                  </div>  
                  <div className="text-[#9DA3B9]">  
                    <p className="text-sm">Monday &ndash; Friday</p>  
                    <p className="text-sm">9am &ndash; 5pm (PT)</p>  
                  </div>  
                </div>  
  
                {/* Stay Connected */}  
                <div className="space-y-8">  
                  <div className="flex items-center gap-3">  
                    <div className="w-10 h-10 rounded-xl bg-[#1D07FF]/10 flex items-center justify-center border border-[#1D07FF]/20">  
                      <MessageCircle className="w-5 h-5 text-[#1D07FF]" />  
                    </div>  
                    <h4 className="text-white text-lg font-normal">Stay connected</h4>  
                  </div>  
  
                  <div className="grid grid-cols-2 gap-4">  
                    <a href="#" className="flex items-center gap-3 group">  
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#1D07FF]/10 group-hover:border-[#1D07FF]/30 transition-all duration-300">  
                        <Facebook className="w-4 h-4 text-[#1D07FF]" />  
                      </div>  
                      <span className="text-[#9DA3B9] text-sm group-hover:text-white transition-colors">Facebook</span>  
                    </a>  
                    <a href="#" className="flex items-center gap-3 group">  
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#1D07FF]/10 group-hover:border-[#1D07FF]/30 transition-all duration-300">  
                        <Twitter className="w-4 h-4 text-[#1D07FF]" />  
                      </div>  
                      <span className="text-[#9DA3B9] text-sm group-hover:text-white transition-colors">Twitter</span>  
                    </a>  
                    <a href="#" className="flex items-center gap-3 group">  
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#1D07FF]/10 group-hover:border-[#1D07FF]/30 transition-all duration-300">  
                        <Instagram className="w-4 h-4 text-[#1D07FF]" />  
                      </div>  
                      <span className="text-[#9DA3B9] text-sm group-hover:text-white transition-colors">Instagram</span>  
                    </a>  
                    <a href="#" className="flex items-center gap-3 group">  
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#1D07FF]/10 group-hover:border-[#1D07FF]/30 transition-all duration-300">  
                        <Linkedin className="w-4 h-4 text-[#1D07FF]" />  
                      </div>  
                      <span className="text-[#9DA3B9] text-sm group-hover:text-white transition-colors">LinkedIn</span>  
                    </a>  
                  </div>  
                </div>  
              </div>  
  
            </motion.div>  
          </div>  
  
          {/* Bottom Bar */}  
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">  
            <div className="flex items-center gap-3">  
              <div className="relative w-8 h-8">  
                <Image  
                  src="https://cdn.jiro.build/Strova/All%20SVG/strova-logo-white.svg"  
                  alt="Strova Logo"  
                  fill  
                  className="object-contain"  
                  referrerPolicy="no-referrer"  
                />  
              </div>  
              <span className="text-white text-2xl font-bold tracking-tight">Strova</span>  
            </div>  
  
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 text-[#9DA3B9]/50 text-xs">  
              <p className="font-normal">&copy; 2024 Strova. All rights reserved.</p>  
              <div className="hidden md:block w-px h-4 bg-white/10" />  
              <p className="text-[#1D07FF]/60 font-normal">Build with <a href="https://jiro.build/" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline transition-all">Jiro.Build</a></p>  
            </div>  
          </div>  
        </div>  
      </footer>  
    </>  
  );  
}  
  
### Install Dependencies:  
npm install class-variance-authority framer-motion lucide-react  
  
### Update /app/page.tsx:  
  
Replace the contents of /app/page.tsx with:  
  
"use client";  
  
import Header01Strova from "@/components/templates/strova-al-automation-landing-page/Header 01 Strova";  
import WhyChooseUs01Strova from "@/components/templates/strova-al-automation-landing-page/Why Choose Us 01 Strova";  
import Services01Strova from "@/components/templates/strova-al-automation-landing-page/Services 01 Strova";  
import Metrics01Strova from "@/components/templates/strova-al-automation-landing-page/Metrics 01 Strova";  
import HowItWorks01Strova from "@/components/templates/strova-al-automation-landing-page/How it Works 01 Strova";  
import Testimonial01Strova from "@/components/templates/strova-al-automation-landing-page/Testimonial 01 Strova";  
import Pricing01Strova from "@/components/templates/strova-al-automation-landing-page/Pricing 01 Strova";  
import Integration01Strova from "@/components/templates/strova-al-automation-landing-page/Integration 01 Strova";  
import Footer01Strova from "@/components/templates/strova-al-automation-landing-page/Footer 01 Strova";  
  
export default function Home() {  
  return (  
    <main className="min-h-screen">  
      <Header01Strova />  
      <WhyChooseUs01Strova />  
      <Services01Strova />  
      <Metrics01Strova />  
      <HowItWorks01Strova />  
      <Testimonial01Strova />  
      <Pricing01Strova />  
      <Integration01Strova />  
      <Footer01Strova />  
    </main>  
  );  
}  
  
### Rules:  
- Copy each file EXACTLY as provided  
- Do NOT modify, refactor, or rename anything  
- Do NOT change any Tailwind classes  
- Do NOT add features or "improvements"  
- Just create the 9 files and update page.tsx  
