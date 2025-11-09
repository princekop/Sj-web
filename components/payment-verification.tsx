"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Upload, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

interface PaymentDetails {
  amount: string | null
  timestamp: string | null
  transactionId: string | null
  paymentMethod: string | null
  receiverEmail: string | null
}

interface VerificationResult {
  paymentDetails: PaymentDetails
  emailVerified: boolean
  isApproved: boolean
  message: string
}

interface PaymentVerificationProps {
  orderId: string
  userId: string
  expectedAmount: number
  onVerified: (result: VerificationResult) => void
}

export default function PaymentVerification({ 
  orderId, 
  userId, 
  expectedAmount,
  onVerified 
}: PaymentVerificationProps) {
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [error, setError] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }

      setScreenshot(file)
      setError("")
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVerify = async () => {
    if (!screenshot) {
      setError('Please upload a payment screenshot')
      return
    }

    setIsVerifying(true)
    setError("")

    try {
      // Convert to base64
      const reader = new FileReader()
      reader.readAsDataURL(screenshot)
      
      reader.onload = async () => {
        const base64Image = reader.result as string

        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image,
            orderId,
            userId,
            expectedAmount
          })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed')
        }

        setVerificationResult(data)
        
        if (data.isApproved) {
          onVerified(data)
        }
      }

      reader.onerror = () => {
        throw new Error('Failed to read file')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Payment Verification
        </CardTitle>
        <CardDescription>
          Upload your payment screenshot for AI-powered verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              id="payment-screenshot"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="payment-screenshot" className="cursor-pointer">
              {previewUrl ? (
                <div className="space-y-4">
                  <img 
                    src={previewUrl} 
                    alt="Payment screenshot" 
                    className="max-h-64 mx-auto rounded-lg border border-border"
                  />
                  <p className="text-sm text-muted-foreground">
                    Click to change screenshot
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-base font-medium">Upload Payment Screenshot</p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
              )}
            </label>
          </div>

          {/* Instructions */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Make sure your screenshot includes:
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Payment amount (₹{expectedAmount})</li>
                <li>Transaction date and time</li>
                <li>Transaction ID or reference number</li>
                <li>Receiver's email/UPI ID</li>
                <li>Payment method (FamPay preferred)</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Verification Result */}
        {verificationResult && (
          <div className="space-y-4">
            <Alert variant={verificationResult.isApproved ? "default" : "destructive"}>
              {verificationResult.isApproved ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>{verificationResult.message}</AlertDescription>
            </Alert>

            {/* Extracted Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Extracted Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">
                    {verificationResult.paymentDetails.amount 
                      ? `₹${verificationResult.paymentDetails.amount}` 
                      : 'Not detected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timestamp:</span>
                  <span className="font-medium">
                    {verificationResult.paymentDetails.timestamp || 'Not detected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-medium">
                    {verificationResult.paymentDetails.transactionId || 'Not detected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium">
                    {verificationResult.paymentDetails.paymentMethod || 'Not detected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email Verified:</span>
                  <span className="font-medium">
                    {verificationResult.emailVerified ? (
                      <span className="text-green-500">✓ Verified</span>
                    ) : (
                      <span className="text-red-500">✗ Not verified</span>
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Button */}
        <Button 
          onClick={handleVerify}
          disabled={!screenshot || isVerifying}
          className="w-full"
          size="lg"
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying Payment...
            </>
          ) : (
            'Verify Payment'
          )}
        </Button>

        {/* Help Text */}
        <p className="text-xs text-center text-muted-foreground">
          Your payment will be verified using AI and FamPay email confirmation. 
          This process typically takes 10-30 seconds.
        </p>
      </CardContent>
    </Card>
  )
}
