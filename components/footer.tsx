import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-background via-black/95 to-black border-t border-border/50 mt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://i.postimg.cc/2Sd0WKK1/285d92e99c1b16399a275be1703f05a2.png" 
                alt="SJ Nodes Logo" 
                className="w-12 h-12 rounded-lg shadow-lg shadow-green-500/20"
              />
              <h3 className="text-2xl font-bold">
                <span className="text-green-400">SJ</span>
                <span className="text-white">Nodes</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Premium game hosting solutions with enterprise-grade infrastructure, 24/7 support, and unbeatable performance.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://discord.gg/25WFhNFMdX" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/50 rounded-lg flex items-center justify-center transition-all group">
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-green-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a href="https://dash.sjnode.site" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 rounded-lg flex items-center justify-center transition-all group">
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 rounded-lg flex items-center justify-center transition-all group">
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-4 text-sm text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/minecraft-hosting" className="text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Minecraft Hosting
                </Link>
              </li>
              <li>
                <Link href="/vps" className="text-muted-foreground hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-blue-500/50 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                  VPS Hosting
                </Link>
              </li>
              <li>
                <Link href="/discord-bots" className="text-muted-foreground hover:text-purple-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-purple-500/50 rounded-full group-hover:bg-purple-400 transition-colors"></span>
                  Discord Bots
                </Link>
              </li>
              <li>
                <a href="https://dash.sjnode.site" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-yellow-500/50 rounded-full group-hover:bg-yellow-400 transition-colors"></span>
                  Free Hosting
                  <svg className="w-3 h-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-4 text-sm text-white uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://discord.gg/25WFhNFMdX" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Contact Support
                </a>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Knowledge Base
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-4 text-sm text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Affiliates
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-4 text-sm text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 <span className="text-green-400 font-semibold">SjNodes</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                Made By Prince
              </span>
              <span className="w-1 h-1 bg-muted-foreground/30 rounded-full"></span>
              <span className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
