"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, ShoppingBag, Clock } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { QRCodeSVG } from 'qrcode.react'
import PaymentVerification from "@/components/payment-verification"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const [showPaymentButton, setShowPaymentButton] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)
  const [orderId, setOrderId] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/checkout")
      return
    }

    // Generate order ID
    const newOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    setOrderId(newOrderId)

    // Start 10 second timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowPaymentButton(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [user, router])

  const handlePaymentVerified = async (result: any) => {
    try {
      // Store order in localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      orders.push({
        id: orderId,
        userId: user?.id,
        userEmail: user?.email,
        items: cart,
        total: subtotal,
        tax: tax,
        grandTotal: total,
        status: result.isApproved ? 'verified' : 'pending',
        paymentDetails: result.paymentDetails,
        createdAt: new Date().toISOString()
      })
      localStorage.setItem('orders', JSON.stringify(orders))

      clearCart()
      router.push(`/payment/success?orderId=${orderId}`)
    } catch (error) {
      console.error("Error processing payment:", error)
      alert("Error processing payment. Please try again.")
    }
  }

  const subtotal = cart.reduce((sum, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace('₹', '').replace(',', ''))
      : item.price || 0;
    return sum + price * item.quantity
  }, 0)

  const shipping = 0
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  // Generate UPI payment string  
  const upiString = `upi://pay?pa=payment@sjnodes&pn=SjNodes&am=${total.toFixed(2)}&cu=INR&tn=Order ${orderId}`

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={80} className="mx-auto mb-6 text-muted-foreground" />
        <h1 className="text-4xl font-bold mb-3">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 text-lg">Add some services to get started</p>
        <Button asChild>
          <a href="/">Browse Services</a>
        </Button>
      </div>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-12">Checkout - Order #{orderId}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Section */}
        <div className="lg:col-span-2">
          <div className="space-y-8">
            {/* QR Code Payment */}
            <div className="bg-secondary p-8 rounded-lg text-center">
              <h2 className="text-2xl font-semibold mb-6">Scan QR Code to Pay</h2>
              <div className="flex justify-center mb-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <QRCodeSVG value={upiString} size={250} />
                </div>
              </div>
              <div className="mb-6 space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>UPI ID:</strong> payment@sjnodes
                </p>
                <p className="text-2xl font-bold text-primary">
                  Amount: ₹{total.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Order ID:</strong> {orderId}
                </p>
              </div>

              {/* Timer or Payment Upload */}
              {!showPaymentButton ? (
                <div className="flex items-center justify-center gap-3 py-4">
                  <Clock size={24} className="text-primary animate-pulse" />
                  <p className="text-lg font-semibold">
                    Upload option will appear in {timeLeft} seconds...
                  </p>
                </div>
              ) : null}
            </div>

            {/* Payment Screenshot Upload */}
            {showPaymentButton && (
              <PaymentVerification
                orderId={orderId}
                userId={user?.id || ''}
                expectedAmount={total}
                onVerified={handlePaymentVerified}
              />
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-secondary rounded-lg p-8 h-fit">
          <div className="flex items-center gap-2 mb-8">
            <ShoppingBag size={24} className="text-primary" />
            <h2 className="text-2xl font-semibold">Order Summary</h2>
          </div>

          <div className="space-y-3 mb-6 pb-6 border-b-2 border-border max-h-96 overflow-y-auto">
            {cart.map((item, index) => {
              const price = typeof item.price === 'string' 
                ? parseFloat(item.price.replace('₹', '').replace(',', ''))
                : item.price || 0;
              
              return (
                <div key={item.id || index} className="border-b border-border pb-3 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="font-bold text-primary">₹{(price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div className="space-y-1">
                      <p>• {item.ram} RAM • {item.cpu}</p>
                      <p>• {item.disk} Storage</p>
                    </div>
                    <p className="font-medium">Qty: {item.quantity}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 mb-6 pb-6 border-b-2 border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (18%)</span>
              <span className="font-medium">₹{tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-semibold">
            <span>Total</span>
            <span className="text-primary">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </main>
  )
}
