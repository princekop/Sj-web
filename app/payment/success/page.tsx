import { Suspense } from "react"
import PaymentSuccessContent from "@/app/payment/success/PaymentSuccessContent"

function PaymentSuccessFallback() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-500/5 via-background to-emerald-500/5">
      <div className="max-w-2xl w-full space-y-6">
        <div className="h-96 bg-muted rounded animate-pulse"></div>
        <div className="h-32 bg-muted rounded animate-pulse"></div>
      </div>
    </main>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
