"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Download, Home } from "lucide-react"
import { useState, useEffect } from "react"

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState('')

  // Get orderId from search params on client side
  useEffect(() => {
    setOrderId(searchParams.get('orderId') || '')
  }, [searchParams])

  const handleDownloadInvoice = () => {
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const order = orders.find((o: any) => o.id === orderId)
    
    if (!order) return

    // Create invoice HTML
    const invoiceHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice - ${orderId}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { text-align: center; border-bottom: 2px solid #22c55e; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 32px; font-weight: bold; color: #22c55e; }
    .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .section { margin-bottom: 20px; }
    .section-title { font-weight: bold; font-size: 18px; margin-bottom: 10px; color: #333; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #f8f9fa; font-weight: bold; }
    .total-row { font-weight: bold; font-size: 18px; background-color: #f0fdf4; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">SJ NODES</div>
    <p>Premium Hosting</p>
  </div>
  
  <div class="invoice-details">
    <div>
      <div class="section-title">Invoice To:</div>
      <p>${order.userEmail}</p>
    </div>
    <div style="text-align: right;">
      <div class="section-title">Invoice Details:</div>
      <p><strong>Invoice #:</strong> ${orderId}</p>
      <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
      <p><strong>Status:</strong> ${order.status}</p>
    </div>
  </div>
  
  <div class="section">
    <div class="section-title">Order Items</div>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Specifications</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${order.items.map((item: any) => {
          const price = typeof item.price === 'string' 
            ? parseFloat(item.price.replace('₹', '').replace(',', ''))
            : item.price || 0;
          return `
            <tr>
              <td>${item.name}</td>
              <td>${item.ram} RAM • ${item.cpu} • ${item.disk}</td>
              <td>${item.quantity}</td>
              <td>₹${price.toFixed(2)}</td>
              <td>₹${(price * item.quantity).toFixed(2)}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  </div>
  
  <div style="text-align: right; margin-top: 20px;">
    <p><strong>Subtotal:</strong> ₹${order.total.toFixed(2)}</p>
    <p><strong>Tax (18%):</strong> ₹${order.tax.toFixed(2)}</p>
    <p class="total-row" style="font-size: 20px; margin-top: 10px;">
      <strong>Total:</strong> ₹${order.grandTotal.toFixed(2)}
    </p>
  </div>
  
  <div class="footer">
    <p>Thank you for your business!</p>
    <p>SJ Nodes - Premium Hosting | Made By Prince</p>
    <p>Discord: discord.gg/25WFhNFMdX</p>
  </div>
</body>
</html>
    `

    // Create blob and download
    const blob = new Blob([invoiceHTML], { type: 'text/html' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `invoice-${orderId}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-500/5 via-background to-emerald-500/5">
      <div className="max-w-2xl w-full space-y-6">
        {/* Success Card */}
        <Card className="border-green-500/50 shadow-2xl shadow-green-500/10">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <CardTitle className="text-3xl text-green-500">Payment Verified Successfully!</CardTitle>
            <CardDescription className="text-base mt-2">
              Your order has been confirmed and is being processed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Details */}
            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono font-semibold">{orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Verified & Processing
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estimated Setup</span>
                <span className="font-semibold">5-10 minutes</span>
              </div>
            </div>

            {/* What's Next */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmation Email</p>
                    <p className="text-sm text-muted-foreground">
                      You'll receive an email with your order details within 5 minutes
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Server Setup</p>
                    <p className="text-sm text-muted-foreground">
                      Your server will be automatically configured and deployed
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Access Details</p>
                    <p className="text-sm text-muted-foreground">
                      Login credentials and server access info will be sent to your email
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full" size="lg">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="flex-1" onClick={handleDownloadInvoice}>
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Need help? Our support team is available 24/7
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="link" size="sm">
                  Live Chat
                </Button>
                <Button variant="link" size="sm">
                  Discord
                </Button>
                <Button variant="link" size="sm">
                  Email Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
