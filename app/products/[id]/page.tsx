"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { addToCart } from "@/app/lib/actions/cart"
import { useCart } from "@/components/cart-context"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Truck, RotateCcw, Star } from "lucide-react"
import { toast } from "sonner"
import type { Database } from "@/types/supabase"

type Product = Database["public"]["Tables"]["products"]["Row"]

export default function ProductPage() {
  const params = useParams()
  const { openCart, refreshCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState("")
  const [cartLoading, setCartLoading] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`)
        }

        const data = await response.json()
        setProduct(data)
        // Set main image - prefer image_url, fallback to first image in images array
        const initialImage = data?.image_url || (data?.images && data.images.length > 0 ? data.images[0] : "")
        setMainImage(initialImage)
        if (data?.sizes?.[0]) setSelectedSize(data.sizes[0])
        if (data?.colors?.[0]) setSelectedColor(data.colors[0])
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = async () => {
    if (!product || !selectedSize || !selectedColor) {
      toast.error("Please select size and color")
      return
    }

    setCartLoading(true)
    try {
      const result = await addToCart(product.id, quantity, selectedSize, selectedColor)
      
      if (!result.success) {
        if (result.error === "User not authenticated") {
          toast.error("Please sign in to add items to cart")
          setTimeout(() => {
            window.location.href = "/auth/login"
          }, 1000)
        } else {
          toast.error(result.error || "Failed to add to cart")
        }
        return
      }
      
      await refreshCart()
      
      toast.success("Added to cart!", {
        description: `${product.name} has been added to your cart.`,
      })
      
      // Open cart panel after a brief delay
      setTimeout(() => {
        openCart()
      }, 300)
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add to cart. Please try again.")
    } finally {
      setCartLoading(false)
    }
  }

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-12">Loading...</div>
  }

  if (!product) {
    return <div className="max-w-7xl mx-auto px-4 py-12">Product not found</div>
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-secondary rounded-lg overflow-hidden aspect-square premium-shadow-lg fabric-texture">
            <img
              src={mainImage || "/placeholder.svg?height=600&width=600&query=luxury%20fashion"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images?.slice(0, 4).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainImage(img || "")}
                className="bg-secondary rounded-lg overflow-hidden aspect-square cursor-pointer hover:opacity-75 transition premium-shadow fabric-texture"
              >
                <img
                  src={img || "/placeholder.svg?height=150&width=150"}
                  alt={`${product.name} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-serif font-light tracking-tight mb-4">{product.name}</h1>
            <div className="flex items-center gap-6">
              <div className="flex gap-3">
                <span className="text-3xl font-light">${product.price}</span>
                {product.original_price && (
                  <span className="text-xl text-muted-foreground line-through">${product.original_price}</span>
                )}
              </div>
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < Math.floor(product.rating || 0) ? "fill-accent text-accent" : "text-muted"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews_count} reviews)</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-4">Size</label>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-lg transition font-medium ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-4">Color</label>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 border-2 rounded-lg transition font-medium ${
                      selectedColor === color
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-4">Quantity</label>
            <div className="flex items-center gap-4 w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 border-2 border-border rounded-lg hover:bg-secondary transition font-medium"
              >
                −
              </button>
              <span className="text-lg font-medium w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 border-2 border-border rounded-lg hover:bg-secondary transition font-medium"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4 pt-4">
            <Button
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-7 text-lg font-medium premium-shadow"
            >
              {cartLoading ? "Adding..." : "Add to Cart"}
            </Button>
            <div className="flex gap-3">
              <button className="flex-1 py-4 border-2 border-border rounded-lg hover:bg-secondary transition flex items-center justify-center gap-2 font-medium">
                <Heart size={20} />
                <span>Wishlist</span>
              </button>
              <button className="flex-1 py-4 border-2 border-border rounded-lg hover:bg-secondary transition flex items-center justify-center gap-2 font-medium">
                <Share2 size={20} />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="border-t-2 border-border pt-8 space-y-6">
            <div className="flex gap-4">
              <Truck className="text-primary flex-shrink-0" size={28} />
              <div>
                <h4 className="font-medium mb-1 text-lg">Free Shipping</h4>
                <p className="text-sm text-muted-foreground">On orders over $100</p>
              </div>
            </div>
            <div className="flex gap-4">
              <RotateCcw className="text-primary flex-shrink-0" size={28} />
              <div>
                <h4 className="font-medium mb-1 text-lg">Easy Returns</h4>
                <p className="text-sm text-muted-foreground">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20 border-t-2 border-border pt-16">
        <h2 className="text-4xl font-serif font-light tracking-tight mb-12">Customer Reviews</h2>
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="pb-8 border-b border-border last:border-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-lg">Verified Buyer</h4>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Exceptional quality and perfect fit. The fabric is luxurious and the craftsmanship is impeccable. Highly
                recommend!
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
