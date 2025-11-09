"use client"

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import type { Database } from "@/types/supabase"

type Product = Database["public"]["Tables"]["products"]["Row"]
type CartItem = Database["public"]["Tables"]["cart_items"]["Row"] & {
  product?: Product
}

interface CartContextType {
  isOpen: boolean
  cartItems: CartItem[]
  cartCount: number
  openCart: () => void
  closeCart: () => void
  refreshCart: () => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { user } = useAuth()

  const fetchCart = async () => {
    if (!user) {
      setCartItems([])
      return
    }

    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          product:products(*)
        `)
        .eq("user_id", user.id)

      if (error) throw error
      setCartItems((data as CartItem[]) || [])
    } catch (error) {
      console.error("Error fetching cart:", error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCart()
    }
  }, [user])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const refreshCart = async () => await fetchCart()
  const clearCart = () => setCartItems([])

  const removeItem = async (itemId: string) => {
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from("cart_items").delete().eq("id", itemId)

      if (error) throw error
      await fetchCart()
    } catch (error) {
      console.error("Error removing item:", error)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(itemId)
      return
    }

    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity, updated_at: new Date().toISOString() } as any)
        .eq("id", itemId)

      if (error) throw error
      await fetchCart()
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        isOpen,
        cartItems,
        cartCount,
        openCart,
        closeCart,
        refreshCart,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
