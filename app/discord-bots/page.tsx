"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductGrid from "@/components/product-grid"
import { SplineScene } from "@/components/ui/splite"

export default function DiscordBotsPage() {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative h-80 bg-gradient-to-br from-purple-600/20 via-background to-background flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Discord Bot Hosting
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            24/7 reliable Discord bot hosting with auto-restart, unlimited bandwidth, 
            and custom bot development services.
          </p>
        </div>
      </section>

      {/* 3D Interactive Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-purple-400">POWERED BY AI</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Next-Gen Discord Bots
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Experience the future of Discord automation with our AI-powered bots. 
                Custom moderation, music streaming, games, and more - all running 24/7 
                on enterprise-grade infrastructure.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Lightning Fast Response</h3>
                    <p className="text-sm text-muted-foreground">Optimized for speed with sub-millisecond response times</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Advanced Security</h3>
                    <p className="text-sm text-muted-foreground">Built-in protection against raids, spam, and malicious users</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Fully Customizable</h3>
                    <p className="text-sm text-muted-foreground">Tailor every aspect to match your server's unique needs</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold">
                Explore Bot Features →
              </Button>
            </div>

            {/* Right 3D Scene */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-purple-500/5 to-background">
              <SplineScene 
                scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-background to-pink-500/10 p-12 text-center">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full mb-6">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">Coming Soon</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Discord Bot Hosting Plans
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're working hard to bring you the best Discord bot hosting experience. Stay tuned for our launch!
            </p>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <svg className="w-12 h-12 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Instant bot response times</p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <svg className="w-12 h-12 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="font-semibold mb-2">Always Online</h3>
                <p className="text-sm text-muted-foreground">24/7 uptime guarantee</p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <svg className="w-12 h-12 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <h3 className="font-semibold mb-2">Fully Customizable</h3>
                <p className="text-sm text-muted-foreground">Build your perfect bot</p>
              </div>
            </div>

            {/* Notify Button */}
            <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-6 text-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Notify Me at Launch
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-background to-pink-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Bot Hosting</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Enterprise-grade infrastructure designed specifically for Discord bots
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">24/7 Online</h3>
              <p className="text-sm text-muted-foreground">
                Your bot stays online around the clock with automatic monitoring
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Auto-Restart</h3>
              <p className="text-sm text-muted-foreground">
                Intelligent crash detection with instant automatic recovery
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-pink-500/10 to-transparent rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Music Support</h3>
              <p className="text-sm text-muted-foreground">
                Pre-configured Lavalink integration for seamless audio streaming
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Custom Bots</h3>
              <p className="text-sm text-muted-foreground">
                Full development support with dedicated resources and API access
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
