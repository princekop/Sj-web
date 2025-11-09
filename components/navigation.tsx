"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { ShoppingBag, Menu, X, User, LogOut } from "lucide-react"

// Navigation Button Component
const NavButton = ({ href, children, position }: { href: string; children: React.ReactNode; position: number }) => {
  const gifUrl = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDg0djF6b25jamVsamxrb2IzeW42Z3V2aWZuZG42aTB4MDl0MDQ2NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xddukaXxD23FL5hK7B/giphy.gif"
  
  // Calculate background position to show 1/3 of the gif
  const bgPosition = position === 0 ? '0%' : position === 1 ? '50%' : '100%'
  
  return (
    <Link href={href}>
      <div 
        className="group relative w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300 overflow-hidden hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]"
        style={{
          backgroundImage: `url(${gifUrl})`,
          backgroundSize: '400% 100%',
          backgroundPosition: `${bgPosition} center`,
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-[2px] rounded-[13px] bg-black/80 backdrop-blur-[2px] flex items-center justify-center group-hover:bg-black/60 transition-all">
          <span className="text-white font-bold text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">{children}</span>
        </div>
      </div>
    </Link>
  )
}

// Login Button Component
const LoginButton = ({ href }: { href: string }) => {
  return (
    <Link href={href}>
      <div className="group relative w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300 bg-gradient-to-br from-green-500/30 to-emerald-600/20 hover:from-green-500/50 hover:to-emerald-500/30 hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]">
        <div className="absolute inset-[2px] rounded-[13px] bg-black flex items-center justify-center gap-2 backdrop-blur-sm">
          <User className="w-5 h-5 text-green-400" />
          <span className="text-white font-bold text-sm">Log In</span>
        </div>
      </div>
    </Link>
  )
}

export default function Navigation() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="border-b border-zinc-950 bg-black sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="relative group flex items-center gap-3">
            <div className="relative">
              <img 
                src="https://i.postimg.cc/2Sd0WKK1/285d92e99c1b16399a275be1703f05a2.png" 
                alt="SJ Nodes Logo" 
                className="w-12 h-12 rounded-lg transform group-hover:scale-110 transition-transform shadow-lg"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-green-400">SJ</span>
                <span className="text-white">Nodes</span>
              </span>
              <span className="text-xs font-medium tracking-wider text-gray-400">
                Premium Hosting
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <NavButton href="/" position={0}>Home</NavButton>
            <NavButton href="/minecraft-hosting" position={1}>Minecraft</NavButton>
            <NavButton href="/discord-bots" position={2}>Discord Bot</NavButton>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link href="/cart">
              <button 
                className="relative p-3 hover:bg-green-500/10 rounded-xl transition-all text-gray-400 hover:text-green-400 backdrop-blur-sm border border-transparent hover:border-green-500/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-black text-xs font-black rounded-full w-5 h-5 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
            
            <div className="hidden md:block relative">
              {mounted && user ? (
                <div>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="px-6 py-3 rounded-xl bg-black border border-green-500/30 hover:border-green-500/60 transition-all text-white font-bold backdrop-blur-sm hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center gap-2"
                  >
                    <User className="w-5 h-5 text-green-400" />
                    {user.name}
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-black border border-green-500/30 rounded-xl shadow-xl z-50">
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-3 text-left text-white hover:bg-green-500/10 rounded-xl transition-all flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : mounted ? (
                <LoginButton href="/auth/login" />
              ) : (
                <div className="w-[131px] h-[51px]"></div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-3 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-xl transition border border-transparent hover:border-green-500/30" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-zinc-950 pt-4 bg-black">
            <Link href="/" className="block px-4 py-3 rounded-xl bg-black hover:bg-green-500/10 border border-green-500/20 hover:border-green-500/50 transition-all text-white font-bold text-center hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              Home
            </Link>
            <Link href="/minecraft-hosting" className="block px-4 py-3 rounded-xl bg-black hover:bg-green-500/10 border border-green-500/20 hover:border-green-500/50 transition-all text-white font-bold text-center hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              Minecraft Hosting
            </Link>
            <Link href="/discord-bots" className="block px-4 py-3 rounded-xl bg-black hover:bg-green-500/10 border border-green-500/20 hover:border-green-500/50 transition-all text-white font-bold text-center hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              Discord Bots
            </Link>
            {mounted && user ? (
              <>
                <div className="px-4 py-3 rounded-xl bg-black border border-green-500/30 text-white font-bold text-center">
                  {user.name}
                </div>
                <button
                  onClick={logout}
                  className="w-full px-4 py-3 rounded-xl bg-black hover:bg-red-500/10 border border-red-500/30 hover:border-red-500/60 transition-all text-white font-bold text-center hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                >
                  Logout
                </button>
              </>
            ) : mounted ? (
              <Link href="/auth/login" className="block px-4 py-3 rounded-xl bg-black hover:bg-green-500/10 border border-green-500/30 hover:border-green-500/60 transition-all text-white font-bold text-center hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                Log In
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </nav>
  )
}
