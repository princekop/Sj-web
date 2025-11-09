import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") || "/dashboard"

  if (code) {
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
            cookiesToSet.forEach(({ name, value, options }) => {
              try {
                cookieStore.set(name, value, options)
              } catch (error) {
                console.error("Error setting cookie:", error)
              }
            })
          },
        },
      },
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Ensure the session is properly set
      const { data: { session } } = await supabase.auth.getSession()
      console.log("[Auth Callback] Session established:", !!session)
      
      return NextResponse.redirect(new URL(next, request.url))
    } else {
      console.error("[Auth Callback] Error exchanging code:", error)
    }
  }

  // If no code or error, redirect to home
  return NextResponse.redirect(new URL("/", request.url))
}
