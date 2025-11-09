"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }
    
    try {
      const supabase = getSupabaseClient()

      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }).catch(() => {
        // If auth fails (e.g., no Supabase config), just set loading to false
        setUser(null)
        setLoading(false)
      })

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log('[useAuth] Auth state changed:', _event, session?.user?.email)
        setUser(session?.user ?? null)
        setLoading(false)
      })

      return () => {
        if (subscription) {
          subscription.unsubscribe()
        }
      }
    } catch (error) {
      // If Supabase is not configured, just set loading to false
      console.log('[useAuth] Supabase not configured, running without auth')
      setUser(null)
      setLoading(false)
    }
  }, [])

  return { user, loading }
}
