"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import type { Database } from "@/types/supabase"

type Order = Database["public"]["Tables"]["orders"]["Row"]

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

        if (error) throw error
        setOrders(data || [])
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-light tracking-tight mb-8">Orders</h1>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Order ID</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Total</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-secondary transition">
                  <td className="py-4 px-4 font-mono text-sm">{order.id.slice(0, 8)}</td>
                  <td className="py-4 px-4">{order.user_id}</td>
                  <td className="py-4 px-4">${order.total}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-secondary text-foreground rounded-full text-sm">{order.status}</span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">
                    {new Date(order.created_at).toLocaleDateString()}
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
