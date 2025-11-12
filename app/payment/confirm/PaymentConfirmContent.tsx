"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import PaymentVerification from "@/components/payment-verification"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function PaymentConfirmContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [amount, setAmount] = useState(0)
  const [userId, setUserId] = useState('')

  // Get params from search params on client side
  useEffect(() => {
    setOrderId(searchParams.get('orderId') || '')
    setAmount(parseFloat(searchParams.get('amount') || '0'))
    setUserId(searchParams.get('userId') || '')
  }, [searchParams])

  const handleVerified = (result: any) => {
    if (result.isApproved) {
      setIsVerified(true)
      
      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push(`/payment/success?orderId=${orderId}`)
      }, 2000)
    }
  }

  if (!orderId || !amount) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Invalid Request</CardTitle>
            <CardDescription>
              Missing payment details. Please try again.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Confirm Your Payment</h1>
          <p className="text-muted-foreground">
            Upload your payment screenshot for instant verification
          </p>
        </div>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID:</span>
              <span className="font-mono font-medium">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-semibold text-lg">₹{amount.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Verification */}
        {!isVerified ? (
          <PaymentVerification
            orderId={orderId}
            userId={userId}
            expectedAmount={amount}
            onVerified={handleVerified}
          />
        ) : (
          <Card className="border-green-500/50 bg-green-500/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
                <div>
                  <h2 className="text-2xl font-bold text-green-500">Payment Verified!</h2>
                  <p className="text-muted-foreground mt-2">
                    Redirecting to confirmation page...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Instructions */}
        <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-base">Payment Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold">Step 1: Make Payment</h4>
              <p className="text-muted-foreground">
                Send ₹{amount.toFixed(2)} to our FamPay UPI ID: <code className="bg-muted px-2 py-1 rounded">sjnodes@fam</code>
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Step 2: Take Screenshot</h4>
              <p className="text-muted-foreground">
                Capture a full screenshot of the payment confirmation showing all details
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Step 3: Upload & Verify</h4>
              <p className="text-muted-foreground">
                Upload the screenshot above. Our AI will verify it instantly against FamPay records
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
