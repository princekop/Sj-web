"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

export async function addToCart(productId: string, quantity: number, size: string, color: string) {
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch (error) {
            console.error("[Cart Action] Cookie setting error:", error)
          }
        },
      },
    },
  )

  try {
    // Get authenticated user from Supabase
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    console.log("[Cart Action] Auth check - User:", user?.id, "Error:", authError?.message)

    if (!user) {
      return { success: false, error: "User not authenticated" }
    }

    // Use Prisma to add to cart
    await prisma.cartItem.create({
      data: {
        userId: user.id,
        productId,
        quantity,
        size,
        color,
      },
    })
    
    console.log("[Cart Action] Successfully added to cart with Prisma")
    return { success: true }
  } catch (error) {
    console.error("[Cart Action] Exception:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to add to cart" }
  }
}
