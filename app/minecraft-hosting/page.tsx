"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Server, Zap, Shield } from "lucide-react"
import { GridScan } from "@/components/grid-scan-full"
import TrueFocus from "@/components/true-focus"
import MagicBento from "@/components/premium-back"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"

export default function MinecraftHostingPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section with GridScan Background */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* GridScan Background */}
        <div className="absolute inset-0 w-full h-full">
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#22c55e"
            gridScale={0.1}
            scanColor="#10b981"
            scanOpacity={0.5}
            enablePost
            bloomIntensity={0.6}
            chromaticAberration={0.002}
            noiseIntensity={0.01}
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-4">
          {/* Title */}
          <div className="text-center mb-12">
            <TrueFocus 
              sentence="MINECRAFT SERVER HOSTING"
              blurAmount={6}
              borderColor="#22c55e"
              glowColor="rgba(34, 197, 94, 0.8)"
              animationDuration={0.6}
              pauseBetweenAnimations={1.2}
            />
            <div className="inline-block px-5 py-2 mt-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-full backdrop-blur-sm">
              <p className="text-sm font-bold text-green-400">
                Starting at <span className="text-white text-base">$4.99</span><span className="text-gray-400">/month</span>
              </p>
            </div>
          </div>

          {/* Features with Arrows */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="relative flex flex-col items-center">
              <div className="mb-4 bg-gradient-to-r from-green-500/20 to-emerald-500/10 backdrop-blur-md py-2 px-5 rounded-xl border border-green-500/40">
                <p className="text-green-400 font-bold text-sm tracking-wide font-[family-name:var(--font-poppins)]">INSTANT SETUP</p>
              </div>
              <div className="my-3 relative h-12 w-full flex justify-center">
                <svg width="30" height="50" viewBox="0 0 30 50" className="text-green-500">
                  <defs>
                    <marker id="arrowhead-green" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                      <polygon points="0 0, 10 5, 0 10" fill="currentColor" />
                    </marker>
                  </defs>
                  <path d="M 15 0 L 15 45" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
                </svg>
                {/* Animated dots */}
                <div className="absolute left-1/2 top-0 w-4 h-4 -translate-x-1/2">
                  <style jsx>{`
                    @keyframes moveDown {
                      0%, 50% { transform: translate(-50%, 0) scale(1); opacity: 1; }
                      100% { transform: translate(-50%, 50px) scale(0); opacity: 0; }
                    }
                  `}</style>
                  <div className="absolute left-1/2 top-0 w-3 h-3 rounded-full bg-green-400" style={{ animation: 'moveDown 2s infinite linear' }}></div>
                  <div className="absolute left-1/2 top-0 w-3 h-3 rounded-full bg-green-400" style={{ animation: 'moveDown 2s infinite linear 1s' }}></div>
                </div>
              </div>
              {/* Card */}
              <div className="relative w-full h-44 rounded-[14px] overflow-hidden shadow-[20px_20px_60px_#0a0a0a,-20px_-20px_60px_#1a1a1a]">
                <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] z-[2] bg-[rgba(10,10,10,0.95)] backdrop-blur-[24px] rounded-[10px] outline outline-2 outline-black flex flex-col items-center justify-center">
                  <Zap size={32} className="text-green-400 mb-2" />
                  <p className="text-3xl font-black text-white mb-1 font-[family-name:var(--font-poppins)]">&lt; 60s</p>
                  <p className="text-xs text-gray-400 font-semibold">Server Ready</p>
                </div>
                <div className="absolute z-[1] top-1/2 left-1/2 w-[120px] h-[120px] rounded-full opacity-100 blur-[12px]" 
                     style={{
                       backgroundColor: 'hsl(142, 71%, 45%)',
                       animation: 'blob-bounce 5s infinite ease'
                     }} 
                />
                <style jsx>{`
                  @keyframes blob-bounce {
                    0% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
                    25% { transform: translate(-100%, -100%) translate3d(100%, 0, 0); }
                    50% { transform: translate(-100%, -100%) translate3d(100%, 100%, 0); }
                    75% { transform: translate(-100%, -100%) translate3d(0, 100%, 0); }
                    100% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
                  }
                `}</style>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative flex flex-col items-center">
              <div className="mb-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 backdrop-blur-md py-2 px-5 rounded-xl border border-blue-500/40">
                <p className="text-blue-400 font-bold text-sm tracking-wide font-[family-name:var(--font-poppins)]">DDOS PROTECTION</p>
              </div>
              <div className="my-3 relative h-12 w-full flex justify-center">
                <svg width="30" height="50" viewBox="0 0 30 50" className="text-blue-500">
                  <defs>
                    <marker id="arrowhead-blue" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                      <polygon points="0 0, 10 5, 0 10" fill="currentColor" />
                    </marker>
                  </defs>
                  <path d="M 15 0 L 15 45" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
                </svg>
                {/* Animated dots */}
                <div className="absolute left-1/2 top-0 w-4 h-4 -translate-x-1/2">
                  <style jsx>{`
                    @keyframes moveDownBlue {
                      0%, 50% { transform: translate(-50%, 0) scale(1); opacity: 1; }
                      100% { transform: translate(-50%, 50px) scale(0); opacity: 0; }
                    }
                  `}</style>
                  <div className="absolute left-1/2 top-0 w-3 h-3 rounded-full bg-blue-400" style={{ animation: 'moveDownBlue 2s infinite linear' }}></div>
                  <div className="absolute left-1/2 top-0 w-3 h-3 rounded-full bg-blue-400" style={{ animation: 'moveDownBlue 2s infinite linear 1s' }}></div>
                </div>
              </div>
              {/* Card */}
              <div className="relative w-full h-44 rounded-[14px] overflow-hidden shadow-[20px_20px_60px_#0a0a0a,-20px_-20px_60px_#1a1a1a]">
                <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] z-[2] bg-[rgba(10,10,10,0.95)] backdrop-blur-[24px] rounded-[10px] outline outline-2 outline-black flex flex-col items-center justify-center">
                  <Shield size={32} className="text-blue-400 mb-2" />
                  <p className="text-3xl font-black text-white mb-1 font-[family-name:var(--font-poppins)]">100%</p>
                  <p className="text-xs text-gray-400 font-semibold">Protected</p>
                </div>
                <div className="absolute z-[1] top-1/2 left-1/2 w-[120px] h-[120px] rounded-full opacity-100 blur-[12px]" 
                     style={{
                       backgroundColor: 'hsl(217, 91%, 60%)',
                       animation: 'blob-bounce-blue 5s infinite ease 1s'
                     }} 
                />
                <style jsx>{`
                  @keyframes blob-bounce-blue {
                    0% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
                    25% { transform: translate(-100%, -100%) translate3d(100%, 0, 0); }
                    50% { transform: translate(-100%, -100%) translate3d(100%, 100%, 0); }
                    75% { transform: translate(-100%, -100%) translate3d(0, 100%, 0); }
                    100% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
                  }
                `}</style>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative flex flex-col items-center">
              <div className="mb-4 bg-gradient-to-r from-orange-500/20 to-amber-500/10 backdrop-blur-md py-2 px-5 rounded-xl border border-orange-500/40">
                <p className="text-orange-400 font-bold text-sm tracking-wide font-[family-name:var(--font-poppins)]">SUPPORT</p>
              </div>
              <div className="my-3 relative h-12 w-full flex justify-center">
                <svg width="30" height="50" viewBox="0 0 30 50" className="text-orange-500">
                  <defs>
                    <marker id="arrowhead-purple" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                      <polygon points="0 0, 10 5, 0 10" fill="currentColor" />
                    </marker>
                  </defs>
                  <path d="M 15 0 L 15 45" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead-purple)" />
                </svg>
                {/* Animated dots */}
                <div className="absolute left-1/2 top-0 w-4 h-4 -translate-x-1/2">
                  <style jsx>{`
                    @keyframes moveDownPurple {
                      0%, 50% { transform: translate(-50%, 0) scale(1); opacity: 1; }
                      100% { transform: translate(-50%, 50px) scale(0); opacity: 0; }
                    }
                  `}</style>
                  <div className="absolute left-1/2 top-0 w-3 h-3 rounded-full bg-orange-400" style={{ animation: 'moveDownPurple 2s infinite linear' }}></div>
                  <div className="absolute left-1/2 top-0 w-3 h-3 rounded-full bg-orange-400" style={{ animation: 'moveDownPurple 2s infinite linear 1s' }}></div>
                </div>
              </div>
              {/* Card */}
              <div className="relative w-full h-44 rounded-[14px] overflow-hidden shadow-[20px_20px_60px_#0a0a0a,-20px_-20px_60px_#1a1a1a]">
                <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] z-[2] bg-[rgba(10,10,10,0.95)] backdrop-blur-[24px] rounded-[10px] outline outline-2 outline-black flex flex-col items-center justify-center">
                  <Server size={32} className="text-orange-400 mb-2" />
                  <p className="text-3xl font-black text-white mb-1 font-[family-name:var(--font-poppins)]">24/7</p>
                  <p className="text-xs text-gray-400 font-semibold">Available</p>
                </div>
                <div className="absolute z-[1] top-1/2 left-1/2 w-[120px] h-[120px] rounded-full opacity-100 blur-[12px]" 
                     style={{
                       backgroundColor: 'hsl(37.7, 92.1%, 50.2%)',
                       animation: 'blob-bounce-purple 5s infinite ease 2s'
                     }} 
                />
                <style jsx>{`
                  @keyframes blob-bounce-purple {
                    0% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
                    25% { transform: translate(-100%, -100%) translate3d(100%, 0, 0); }
                    50% { transform: translate(-100%, -100%) translate3d(100%, 100%, 0); }
                    75% { transform: translate(-100%, -100%) translate3d(0, 100%, 0); }
                    100% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
                  }
                `}</style>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Premium Panel Section */}
      <section className="relative w-full bg-black py-20 border-t border-purple-500/20">
        <div className="w-full px-4 lg:px-8">
          {/* Section Header - Centered Prince Badge */}
          <div className="mb-12 max-w-7xl mx-auto flex justify-center">
            <div className="relative px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/10 border-2 border-purple-500/40 rounded-2xl backdrop-blur-sm overflow-visible">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-pink-400 animate-pulse">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="text-white font-black text-2xl tracking-wide bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">Prince</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.9)] animate-pulse">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-pink-400 animate-pulse">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              {/* Sparkling hearts around */}
              <div className="absolute -top-2 -left-2 w-4 h-4 animate-ping">
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-pink-400">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 animate-ping" style={{ animationDelay: '0.3s' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-red-400">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 animate-ping" style={{ animationDelay: '0.6s' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-pink-500">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-3 animate-ping" style={{ animationDelay: '0.9s' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-red-300">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-3 animate-ping" style={{ animationDelay: '1.2s' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-pink-300">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* MagicBento Grid */}
          <div className="w-full">
            <MagicBento
              textAutoHide={false}
              enableStars={false}
              enableSpotlight={true}
              enableBorderGlow={true}
              spotlightRadius={300}
              particleCount={0}
              enableTilt={true}
              glowColor="168, 85, 247"
              clickEffect={true}
              enableMagnetism={false}
            />
          </div>
        </div>
      </section>

      {/* Pricing Categories Section */}
      <PricingCategoriesSection />

    </main>
  )
}

// Pricing data
const luxuriousPlans = [
  { name: "Miner Revo", ram: "4GB", cpu: "2 vCPUs", disk: "20GB NVMe", price: "₹100", subdomain: true, backups: "1", allocation: "1 Port" },
  { name: "Chinna X", ram: "6GB", cpu: "2 vCPUs", disk: "30GB NVMe", price: "₹150", subdomain: true, backups: "3", allocation: "2 Ports" },
  { name: "Parle Max", ram: "8GB", cpu: "4 vCPUs", disk: "40GB NVMe", price: "₹200", subdomain: true, backups: "3", allocation: "2 Ports" },
  { name: "Huka Pro", ram: "10GB", cpu: "4 vCPUs", disk: "60GB NVMe", price: "₹250", subdomain: true, backups: "3", allocation: "2 Ports" },
  { name: "Notty OP", ram: "12GB", cpu: "6 vCPUs", disk: "70GB NVMe", price: "₹300", subdomain: true, backups: "5", allocation: "3 Ports" },
  { name: "Dark Plus", ram: "14GB", cpu: "8 vCPUs", disk: "80GB NVMe", price: "₹350", subdomain: true, backups: "5", allocation: "4 Ports" },
  { name: "Darky Zone", ram: "16GB", cpu: "10 vCPUs", disk: "90GB NVMe", price: "₹400", subdomain: true, backups: "6", allocation: "8 Ports" },
  { name: "Dark Neo", ram: "20GB", cpu: "12 vCPUs", disk: "100GB NVMe", price: "₹500", subdomain: true, backups: "9", allocation: "12 Ports" },
  { name: "Lustnode V1", ram: "24GB", cpu: "14 vCPUs", disk: "120GB NVMe", price: "₹600", subdomain: true, backups: "10", allocation: "13 Ports" },
  { name: "Byte Elite", ram: "26GB", cpu: "16 vCPUs", disk: "140GB NVMe", price: "₹650", subdomain: true, backups: "10", allocation: "13 Ports" },
  { name: "Byte Ultra", ram: "30GB", cpu: "18 vCPUs", disk: "160GB NVMe", price: "₹750", subdomain: true, backups: "12", allocation: "15 Ports" },
  { name: "Byte Supreme", ram: "32GB", cpu: "20 vCPUs", disk: "200GB NVMe", price: "₹800", subdomain: true, backups: "16", allocation: "18 Ports" }
];

function PricingCategoriesSection() {
  return (
    <section className="relative w-full bg-black py-16 border-t border-purple-500/20">
      <div className="max-w-[1800px] mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex justify-center mb-12">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
            <h2 className="text-4xl font-black text-white tracking-wide">
              Luxurious Plans
            </h2>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {luxuriousPlans.map((plan, index) => (
            <AnimatedCard key={index} plan={plan} />
          ))}
        </div>

      </div>
    </section>
  );
}

function AnimatedCard({ plan }: any) {
  const [isHovered, setIsHovered] = React.useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!user) {
      router.push('/auth/login?redirect=/minecraft-hosting');
      return;
    }
    // Format plan data for cart
    const cartItem = {
      id: `minecraft-${plan.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `Minecraft Server - ${plan.name}`,
      price: parseFloat(plan.price.replace('₹', '')),
      image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
      category: 'Minecraft Hosting',
      ram: plan.ram,
      cpu: plan.cpu,
      disk: plan.disk,
      allocation: plan.allocation,
      backups: plan.backups,
      subdomain: plan.subdomain
    };
    addToCart(cartItem);
  };

  const handleBuyNow = () => {
    if (!user) {
      router.push('/auth/login?redirect=/minecraft-hosting');
      return;
    }
    // Format plan data for cart
    const cartItem = {
      id: `minecraft-${plan.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `Minecraft Server - ${plan.name}`,
      price: parseFloat(plan.price.replace('₹', '')),
      image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
      category: 'Minecraft Hosting',
      ram: plan.ram,
      cpu: plan.cpu,
      disk: plan.disk,
      allocation: plan.allocation,
      backups: plan.backups,
      subdomain: plan.subdomain
    };
    addToCart(cartItem);
    router.push('/checkout');
  };

  return (
    <div
      className="relative cursor-pointer group w-full max-w-[220px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card content with border */}
      <div
        className="relative bg-[#0a0a0a] rounded-xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 h-full"
        style={{
          boxShadow: isHovered ? '0 0 30px rgba(168, 85, 247, 0.4)' : '0px 0px 3px 1px rgba(0,0,0,0.53)'
        }}
      >
        {/* Inner glow on hover */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: 'rgba(168, 85, 247, 0.3)',
            width: '100px',
            height: '100px',
            filter: 'blur(60px)',
            zIndex: 0
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-5 text-white flex flex-col h-full">
          {/* Plan Name */}
          <h3 className="text-xl font-black text-center mb-2 text-white">
            {plan.name}
          </h3>

          {/* Price */}
          <div className="text-center mb-4">
            <p className="text-3xl font-black text-purple-400" style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.8)' }}>
              {plan.price}
            </p>
            <p className="text-xs text-gray-500 mt-1">/month</p>
          </div>

          {/* Specs */}
          <div className="space-y-2.5 text-sm mb-5">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">RAM:</span>
              <span className="font-bold text-white">{plan.ram}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">CPU:</span>
              <span className="font-bold text-white">{plan.cpu}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Storage:</span>
              <span className="font-bold text-white">{plan.disk}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Allocation:</span>
              <span className="font-bold text-white">{plan.allocation}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Backups:</span>
              <span className="font-bold text-white">{plan.backups}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Subdomain:</span>
              <span className="text-green-400 font-bold text-lg">✓</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-auto space-y-2.5">
            <button 
              onClick={handleBuyNow}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-lg transition-all hover:scale-105 active:scale-95"
            >
              BUY NOW
            </button>
            <button 
              onClick={handleAddToCart}
              className="w-full py-2.5 border-2 border-purple-500 hover:bg-purple-500/20 text-white text-sm font-semibold rounded-lg transition-all hover:scale-105 active:scale-95"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
