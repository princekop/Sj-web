import { Suspense } from "react"
import PaymentConfirmContent from "@/app/payment/confirm/PaymentConfirmContent"

function PaymentConfirmFallback() {
  return (
    <main className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="h-8 bg-muted rounded animate-pulse mx-auto w-64"></div>
          <div className="h-4 bg-muted rounded animate-pulse mx-auto w-96"></div>
        </div>
        <div className="h-32 bg-muted rounded animate-pulse"></div>
        <div className="h-64 bg-muted rounded animate-pulse"></div>
        <div className="h-48 bg-muted rounded animate-pulse"></div>
      </div>
    </main>
  )
}

export default function PaymentConfirmPage() {
  return (
    <Suspense fallback={<PaymentConfirmFallback />}>
      <PaymentConfirmContent />
    </Suspense>
  )
}
