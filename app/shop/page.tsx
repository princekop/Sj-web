"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import ProductGrid from "@/components/product-grid"
import { Button } from "@/components/ui/button"

function ShopContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || undefined
  const [sortBy, setSortBy] = useState("featured")

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-light tracking-tight mb-2">Shop</h1>
        <p className="text-muted-foreground">{category ? `Browsing ${category}` : "Explore our complete collection"}</p>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-8 border-b border-border">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={!category ? "default" : "outline"}
            size="sm"
            onClick={() => (window.location.href = "/shop")}
          >
            All
          </Button>
          {["Tops", "Bottoms", "Outerwear", "Dresses", "Accessories"].map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              size="sm"
              onClick={() => (window.location.href = `/shop?category=${cat}`)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-border rounded text-sm bg-background"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <ProductGrid category={category} />
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  )
}
