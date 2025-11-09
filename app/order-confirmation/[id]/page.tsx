"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Truck } from "lucide-react"
import type { Database } from "@/types/supabase"

type Order = Database["public"]["Tables"]["orders"]["Row"]
type OrderItem = Database["public"]["Tables"]["order_items"]["Row"] & {
  products?: Database["public"]["Tables"]["products"]["Row"]
}

export default function OrderConfirmationPage() {
  const params = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const supabase = getSupabaseClient()

        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select("*")
          .eq("id", params.id)
          .single()

        if (orderError) throw orderError
        setOrder(orderData)

        const { data: itemsData, error: itemsError } = await supabase
          .from("order_items")
          .select("*, products(*)")
          .eq("order_id", params.id)

        if (itemsError) throw itemsError
        setOrderItems(itemsData || [])
      } catch (error) {
        console.error("Error fetching order:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [params.id])

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-12">Loading...</div>
  }

  if (!order) {
    return <div className="max-w-7xl mx-auto px-4 py-12">Order not found</div>
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Success Message */}
      <div className="text-center mb-12">
        <CheckCircle size={64} className="mx-auto mb-4 text-green-600" />
        <h1 className="text-4xl font-light tracking-tight mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-2">Thank you for your purchase</p>
        <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Timeline */}
          <div className="border border-border rounded p-6">
            <h2 className="text-lg font-medium mb-6">Order Status</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <CheckCircle size={24} className="text-green-600 mb-2" />
                  <div className="w-0.5 h-12 bg-border"></div>
                </div>
                <div>
                  <h3 className="font-medium">Order Confirmed</h3>
                  <p className="text-sm text-muted-foreground">Your order has been received</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <Package size={24} className="text-muted-foreground mb-2" />
                  <div className="w-0.5 h-12 bg-border"></div>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Processing</h3>
                  <p className="text-sm text-muted-foreground">We're preparing your items</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <Truck size={24} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Shipping</h3>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border border-border rounded p-6">
            <h2 className="text-lg font-medium mb-6">Order Items</h2>
            <div className="space-y-4">
              {orderItems.map((item) => {
                const product = item.products as any
                return (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                    <div className="w-20 h-20 bg-secondary rounded overflow-hidden flex-shrink-0">
                      <img
                        src={product?.image_url || "/placeholder.svg"}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{product?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity} × ${item.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-secondary rounded p-6 h-fit">
          <h2 className="text-lg font-medium mb-6">Order Summary</h2>

          <div className="space-y-3 mb-6 pb-6 border-b border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${(order.total_amount * 0.9).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>${(order.total_amount * 0.1).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between text-lg font-medium mb-6">
            <span>Total</span>
            <span>${order.total_amount.toFixed(2)}</span>
          </div>

          <div className="space-y-2 text-sm mb-6 pb-6 border-b border-border">
            <p>
              <span className="text-muted-foreground">Order ID:</span>
              <br />
              <span className="font-mono text-xs">{order.id}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Date:</span>
              <br />
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </p>
          </div>

          <Link href="/shop" className="w-full">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
