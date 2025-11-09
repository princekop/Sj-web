"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CartPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart, cartCount, removeFromCart, updateQuantity, cartTotal } = useCart()

  const closeCart = () => setIsOpen(false)

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="left" className="w-full sm:max-w-lg flex flex-col p-0">
        {/* Header */}
        <SheetHeader className="border-b border-border px-6 py-5 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-primary" size={24} />
            <div>
              <SheetTitle className="text-2xl font-serif font-light tracking-tight">Shopping Cart</SheetTitle>
              <p className="text-sm text-muted-foreground font-normal">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </SheetHeader>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="text-muted-foreground mb-4" size={64} strokeWidth={1} />
            <h3 className="text-xl font-light mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Add items to get started</p>
            <Button onClick={closeCart} asChild>
              <Link href="/minecraft-hosting">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-6">
                {cart.map((item, index) => {
                  const price = typeof item.price === 'string' 
                    ? parseFloat(item.price.replace('₹', '').replace(',', ''))
                    : item.price;
                  
                  return (
                    <div key={index} className="flex gap-4 group">
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-2">
                            <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                            <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                              <span>{item.ram}</span>
                              <span>• {item.cpu}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.name)}
                            className="text-muted-foreground hover:text-foreground transition opacity-0 group-hover:opacity-100"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.name, item.quantity - 1)}
                              className="w-7 h-7 rounded border border-border hover:bg-secondary transition flex items-center justify-center"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.name, item.quantity + 1)}
                              className="w-7 h-7 rounded border border-border hover:bg-secondary transition flex items-center justify-center"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-medium">₹{(price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            {/* Footer */}
            <SheetFooter className="border-t border-border px-6 py-5 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center text-lg">
                <span className="font-light">Subtotal</span>
                <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
              </div>

              {/* Shipping Notice */}
              <p className="text-xs text-muted-foreground text-center">
                Taxes calculated at checkout
              </p>

              {/* Checkout Button */}
              <Button asChild className="w-full py-6 text-base font-medium" size="lg">
                <Link href="/checkout" onClick={closeCart}>
                  Proceed to Checkout
                </Link>
              </Button>

              {/* Continue Shopping */}
              <Button
                variant="outline"
                className="w-full"
                onClick={closeCart}
                asChild
              >
                <Link href="/minecraft-hosting">Continue Shopping</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
