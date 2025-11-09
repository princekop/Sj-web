"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Copy, ExternalLink } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function OrderDetailsPage() {
  const params = useParams()
  const orderId = params.id as string
  const { user } = useAuth()
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const foundOrder = orders.find((o: any) => o.id === orderId)
    
    if (!foundOrder) {
      router.push("/")
      return
    }

    setOrder(foundOrder)
  }, [user, orderId, router])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p>Loading order...</p>
      </div>
    )
  }

  const DISCORD_INVITE_LINK = "https://discord.gg/25WFhNFMdX"

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Success Header */}
      <div className="text-center mb-12">
        <CheckCircle size={80} className="mx-auto mb-6 text-green-500" />
        <h1 className="text-4xl font-bold mb-3">Order Submitted Successfully!</h1>
        <p className="text-muted-foreground text-lg">
          Your order has been received and is pending verification
        </p>
      </div>

      {/* Order Status Card */}
      <div className="bg-secondary rounded-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Order Details</h2>
            <p className="text-sm text-muted-foreground">Track your order status</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border-2 border-yellow-500 rounded-lg">
            <Clock size={20} className="text-yellow-500" />
            <span className="font-semibold text-yellow-600 dark:text-yellow-400">Pending</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b-2 border-border">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Order ID</p>
            <div className="flex items-center gap-2">
              <p className="font-mono font-bold text-lg">{order.id}</p>
              <button
                onClick={() => copyToClipboard(order.id)}
                className="p-1 hover:bg-background rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Order Date</p>
            <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Customer Email</p>
            <p className="font-semibold">{order.userEmail}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
            <p className="font-bold text-primary text-xl">₹{order.grandTotal.toFixed(2)}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-3">Order Items</p>
          <div className="space-y-3">
            {order.items.map((item: any, index: number) => {
              const price = typeof item.price === 'string' 
                ? parseFloat(item.price.replace('₹', '').replace(',', ''))
                : item.price || 0;
              
              return (
                <div key={index} className="bg-background p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">{item.name}</p>
                    <p className="font-bold text-primary">₹{(price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• {item.ram} RAM • {item.cpu}</p>
                    <p>• {item.disk} Storage • Quantity: {item.quantity}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Discord Instructions */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/50 rounded-lg p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          📱 Complete Your Order Verification
        </h3>
        <p className="text-muted-foreground mb-6">
          To activate your services, please follow these steps:
        </p>
        
        <ol className="space-y-4 mb-6">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center">1</span>
            <div>
              <p className="font-semibold mb-1">Join Our Discord Server</p>
              <p className="text-sm text-muted-foreground">Click the button below to join our community</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center">2</span>
            <div>
              <p className="font-semibold mb-1">Open a Support Ticket</p>
              <p className="text-sm text-muted-foreground">Navigate to the support channel and create a new ticket</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center">3</span>
            <div>
              <p className="font-semibold mb-1">Provide Payment Details</p>
              <p className="text-sm text-muted-foreground">Share the following in your ticket:</p>
              <ul className="text-sm text-muted-foreground mt-2 ml-4 space-y-1">
                <li>• Order ID: <code className="bg-background px-2 py-1 rounded font-mono">{order.id}</code></li>
                <li>• Payment screenshot/proof</li>
                <li>• Your email: {order.userEmail}</li>
              </ul>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center">4</span>
            <div>
              <p className="font-semibold mb-1">Wait for Verification</p>
              <p className="text-sm text-muted-foreground">Our team will verify your payment and activate your services within 24 hours</p>
            </div>
          </li>
        </ol>

        <div className="flex gap-4">
          <Button 
            onClick={() => window.open(DISCORD_INVITE_LINK, '_blank')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-bold"
          >
            <ExternalLink className="mr-2" size={20} />
            Join Discord Server
          </Button>
          <Button
            onClick={() => copyToClipboard(order.id)}
            variant="outline"
            className="py-6"
          >
            {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-lg p-6">
        <h4 className="font-semibold mb-2 text-yellow-600 dark:text-yellow-400">⚠️ Important Note</h4>
        <p className="text-sm text-muted-foreground">
          Your order is currently <strong>PENDING</strong> until payment is verified by our team. 
          Please make sure to submit your payment proof in Discord to avoid delays. 
          Services will be activated within 24 hours of successful verification.
        </p>
      </div>
    </main>
  )
}
