import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductGrid from "@/components/product-grid"

export default function VPSPage() {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative h-80 bg-gradient-to-br from-blue-600/20 via-background to-background flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            VPS Hosting
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Enterprise-grade virtual private servers with full root access, 
            high-speed networks, and guaranteed resources.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">VPS Plans</h2>
          <p className="text-muted-foreground">Scalable solutions for every need</p>
        </div>
        <ProductGrid category="VPS" />
      </section>

      {/* Features */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">VPS Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-3">💻</div>
              <h3 className="text-lg font-semibold mb-2">Full Root Access</h3>
              <p className="text-sm text-muted-foreground">Complete control</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold mb-2">NVMe SSD</h3>
              <p className="text-sm text-muted-foreground">Lightning fast I/O</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="text-lg font-semibold mb-2">Global Locations</h3>
              <p className="text-sm text-muted-foreground">Choose your datacenter</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold mb-2">99.9% Uptime</h3>
              <p className="text-sm text-muted-foreground">Guaranteed SLA</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
