"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createUserProfile(email: string, firstName: string, lastName: string) {
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
          } catch {
            // Handle cookie setting errors
          }
        },
      },
    },
  )

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("User not authenticated")
    }

    // Create user profile in users table
    const { error } = await supabase.from("users").insert({
      id: user.id,
      email,
      first_name: firstName,
      last_name: lastName,
      created_at: new Date().toISOString(),
    })

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error("Error creating user profile:", error)
    throw error
  }
}
