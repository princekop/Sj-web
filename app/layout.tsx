import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Suspense } from "react"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { CartPanel } from "@/components/cart-panel"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

import { Inter, Poppins } from 'next/font/google'

// Initialize fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ["300","400","500","600","700","800","900"],
  variable: '--font-poppins' 
})

export const metadata: Metadata = {
  title: "SjNodes - Minecraft Hosting, VPS & Discord Bots",
  description: "Premium Minecraft server hosting, VPS solutions, and Discord bot services. reliable, fast, and affordable hosting for gamers and developers.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`} suppressHydrationWarning style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <Suspense fallback={<div className="h-16 border-b border-border bg-background"></div>}>
                <Navigation />
              </Suspense>
              {children}
              <Footer />
              <CartPanel />
              <Toaster />
              <Analytics />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
