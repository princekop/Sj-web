"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import MinecraftPlansGrid from "@/components/minecraft-plans-grid"
import MinecraftWorld3D from "@/components/minecraft-world-3d"
import RotatingText from "@/components/ui/rotating-text"

export default function HomePage() {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Minecraft 3D World Background */}
        <MinecraftWorld3D />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-[1]"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Brand Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium tracking-[0.25em] text-green-400 uppercase">
              SJ Nodes Premium
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mb-6">
            <span className="block text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] mb-3" 
                  style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '-0.02em' }}>
              Premium Minecraft
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl font-black tracking-tight" 
                  style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '-0.02em' }}>
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 text-transparent bg-clip-text drop-shadow-[0_4px_30px_rgba(34,197,94,0.9)]">
                Hosting
              </span>
            </span>
          </h1>

          {/* Rotating Features */}
          <div className="mb-8 h-12 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <RotatingText
                  texts={[
                    'Lightning Fast',
                    '99.9% Uptime',
                    '24/7 Support',
                    'DDoS Protected',
                    'Auto Backups'
                  ]}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  rotationInterval={2500}
                  staggerDuration={0}
                  splitBy="words"
                  mainClassName="text-base md:text-lg font-semibold text-white"
                />
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-base md:text-lg font-light text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed"
             style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
            Experience enterprise-grade Minecraft hosting with NVMe SSDs, instant setup, and unbeatable performance
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/minecraft-hosting">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-10 py-6 text-lg font-bold shadow-2xl shadow-green-500/50 transition-all hover:scale-105 hover:shadow-green-500/70 rounded-xl border-2 border-green-400/50"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
              >
                Get Started Now →
              </Button>
            </Link>
            <Link href="/minecraft-hosting">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white border-2 border-white/20 hover:border-white/40 px-10 py-6 text-lg font-bold transition-all hover:scale-105 rounded-xl"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
              >
                View Plans
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-medium">Instant Setup</span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-medium">DDoS Protected</span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Minecraft Plans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Popular Hosting Plans</h2>
          <p className="text-muted-foreground text-lg">Most chosen by our customers</p>
        </div>
        <MinecraftPlansGrid limit={8} />
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all hover:scale-[1.02] group">
            <div className="w-14 h-14 bg-green-500/20 rounded-lg flex items-center justify-center mb-5 group-hover:bg-green-500/30 transition-colors">
              <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Blazing Fast</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              NVMe SSD storage with up to 10 Gbps network speeds for instant response times
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all hover:scale-[1.02] group">
            <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-5 group-hover:bg-blue-500/30 transition-colors">
              <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">DDoS Protection</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Enterprise-grade security with real-time threat detection and automatic mitigation
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-[1.02] group">
            <div className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-5 group-hover:bg-purple-500/30 transition-colors">
              <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Expert technical support team ready to assist you via Discord, email, or live chat
            </p>
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="bg-gradient-to-br from-green-500/10 via-background to-blue-500/10 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-400">New Services Available</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Explore Our Full Range of Services
          </h2>
          <p className="text-muted-foreground mb-8 text-base max-w-2xl mx-auto">
            From Minecraft servers to VPS hosting and Discord bots - we've got everything you need to power your projects
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-green-500/50 transition-all">
              View All Services →
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
