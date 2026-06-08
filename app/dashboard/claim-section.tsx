"use client";

import { useState } from "react";
import { Loader2, ShieldCheck, HelpCircle, Wallet } from "lucide-react";

type ClaimSectionProps = {
  orderId: string;
  userEmail: string;
};

export function ClaimSection({ orderId, userEmail }: ClaimSectionProps) {
  const [tab, setTab] = useState<'custodial' | 'self-custody'>('custodial');
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleClaim() {
    setLoading(true);
    setMessage("");

    try {
      const body: Record<string, string> = { orderId, method: tab };
      if (tab === "self-custody") {
        body.walletAddress = walletAddress;
      }

      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Claim failed");
        return;
      }

      if (data.alreadyClaimed) {
        setMessage("Already claimed.");
        return;
      }

      setSuccess(true);
      setMessage(data.message);
    } catch {
      setMessage("Unable to submit claim.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="border border-[#C9A96E]/30 bg-[#05061B]/60 p-6 rounded-2xl text-sm">
        <p className="text-[#C9A96E] font-medium flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" /> CLAIM SUBMITTED
        </p>
        <p className="text-[#8C8580] text-xs leading-relaxed">{message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="font-display text-sm font-semibold text-white mb-1">CLAIM YOUR DIGITAL TWIN</h3>
      <p className="text-[#8C8580] text-xs mb-6 leading-relaxed">
        Your NFT is your permanent certificate of ownership on the Polygon network. Claiming upgrades you to Tier 02 membership.
      </p>

      <div className="flex gap-2.5 mb-6">
        <button
          onClick={() => setTab("custodial")}
          className={`flex-1 py-2 rounded-xl text-[11px] font-mono tracking-wider transition-all border ${
            tab === "custodial"
              ? "bg-[#C9A96E] border-[#C9A96E] text-white"
              : "border-white/10 text-[#8C8580] hover:bg-white/5"
          }`}
        >
          I&apos;M NEW TO CRYPTO
        </button>
        <button
          onClick={() => setTab("self-custody")}
          className={`flex-1 py-2 rounded-xl text-[11px] font-mono tracking-wider transition-all border ${
            tab === "self-custody"
              ? "bg-[#C9A96E] border-[#C9A96E] text-white"
              : "border-white/10 text-[#8C8580] hover:bg-white/5"
          }`}
        >
          I HAVE A WALLET
        </button>
      </div>

      {tab === "custodial" ? (
        <div className="space-y-4">
          <p className="text-[#8C8580] text-[11px] leading-relaxed flex items-start gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 mt-0.5" />
            We will provision a secure custodial wallet linked to your login email address. No configuration needed.
          </p>
          <div className="bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-[#E9EAF0] font-mono">
            {userEmail}
          </div>
          <button
            onClick={handleClaim}
            disabled={loading}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-[#C9A96E] text-white text-xs font-semibold hover:bg-[#C9A96E]/90 transition-colors shadow-[0_0_15px_rgba(201,169,110,0.3)] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Provisioning Wallet...
              </>
            ) : (
              "Create Wallet & Claim NFT"
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-[#8C8580] text-[11px] leading-relaxed flex items-start gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 mt-0.5" />
            Provide your Polygon-compatible wallet address (MetaMask, Coinbase Wallet, Phantom, etc.).
          </p>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="0x..."
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-[#8C8580]/40 outline-none focus:border-[#C9A96E]"
          />
          <button
            onClick={handleClaim}
            disabled={loading || !walletAddress.startsWith("0x") || walletAddress.length !== 42}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-[#C9A96E] text-white text-xs font-semibold hover:bg-[#C9A96E]/90 transition-colors shadow-[0_0_15px_rgba(201,169,110,0.3)] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Transferring Token...
              </>
            ) : (
              "Claim to My Wallet"
            )}
          </button>
        </div>
      )}

      {message && (
        <div className="mt-4 text-xs text-[#8C8580]/60 font-mono">
          {message}
        </div>
      )}
    </div>
  );
}
