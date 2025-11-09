"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import type { Database } from "@/types/supabase"

type User = Database["public"]["Tables"]["users"]["Row"]

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })

        if (error) throw error
        setCustomers(data || [])
      } catch (error) {
        console.error("Error fetching customers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-light tracking-tight mb-8">Customers</h1>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Email</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Joined</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-border hover:bg-secondary transition">
                  <td className="py-4 px-4">
                    {customer.first_name} {customer.last_name}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{customer.email}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {new Date(customer.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                      <Eye size={16} />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
