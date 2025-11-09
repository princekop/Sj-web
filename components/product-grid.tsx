"use client"

import { useEffect, useState } from "react"
import ProductCard from "@/components/product-card"
import type { Database } from "@/types/supabase"

type Product = Database["public"]["Tables"]["products"]["Row"]

interface ProductGridProps {
  featured?: boolean
  category?: string
}

export default function ProductGrid({ featured = false, category }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    const fetchProducts = async () => {
      try {
        setError(null)

        console.log("[v0] Fetching products with filters:", { featured, category })

        const params = new URLSearchParams()
        if (featured) {
          params.append('featured', 'true')
        }
        if (category) {
          params.append('category', category)
        }
        params.append('limit', '12')

        const response = await fetch(`/api/products?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`)
        }

        const data = await response.json()
        console.log("[v0] Products fetched successfully:", data?.length || 0)
        setProducts(data || [])
      } catch (error) {
        console.error("[v0] Error fetching products:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [featured, category])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-secondary rounded animate-pulse h-80"></div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error loading products: {error}</p>
        <p className="text-muted-foreground text-sm">Please make sure the database schema has been initialized.</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
