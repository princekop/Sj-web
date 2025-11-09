"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push("/auth/login?redirect=/cart")
    return null
  }

  const tax = cartTotal * 0.1
  const total = cartTotal + tax

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif font-light tracking-tight mb-12">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag size={64} className="mx-auto mb-6 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground mb-8 text-lg">Your cart is empty</p>
          <Link href="/minecraft-hosting">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => {
              const price = typeof item.price === 'string' 
                ? item.price 
                : `₹${item.price}`;
              
              return (
                <div
                  key={index}
                  className="flex gap-6 pb-6 border-b-2 border-border premium-shadow-lg p-6 rounded-lg bg-card"
                >
                  <div className="flex-1">
                    <h3 className="font-light text-lg mb-2">{item.name}</h3>
                    <div className="text-sm text-muted-foreground mb-3 space-y-1">
                      <p>RAM: {item.ram}</p>
                      <p>CPU: {item.cpu}</p>
                      <p>Storage: {item.disk}</p>
                      <p>Allocation: {item.allocation}</p>
                    </div>
                    <p className="font-medium text-primary text-lg">{price}/month</p>
                  </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="p-2 hover:bg-secondary rounded-lg transition text-destructive hover:text-destructive/80"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="flex items-center gap-3 bg-secondary rounded-lg p-2">
                    <button
                      onClick={() => updateQuantity(item.name, item.quantity - 1)}
                      className="px-3 py-1 border border-border rounded hover:bg-background transition font-medium"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.name, item.quantity + 1)}
                      className="px-3 py-1 border border-border rounded hover:bg-background transition font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="bg-secondary rounded-lg p-8 h-fit premium-shadow-lg fabric-texture">
            <h2 className="text-2xl font-light mb-8">Order Summary</h2>

            <div className="space-y-4 mb-8 pb-8 border-b-2 border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (18% GST)</span>
                <span className="font-medium">₹{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between mb-8 text-xl font-light">
              <span>Total</span>
              <span className="text-primary font-medium">₹{total.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className="w-full block">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-7 text-base font-medium flex items-center justify-center gap-2 premium-shadow">
                Proceed to Checkout
                <ArrowRight size={20} />
              </Button>
            </Link>

            <Link
              href="/minecraft-hosting"
              className="block text-center mt-6 text-sm text-primary hover:text-primary/80 transition font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
