"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ResetPage() {
  const router = useRouter()

  const handleReset = () => {
    localStorage.clear()
    alert('All data cleared!')
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Clear All Data</h1>
        <p className="text-muted-foreground">
          This will clear all users, cart, and orders from localStorage
        </p>
        <Button onClick={handleReset} variant="destructive" size="lg">
          Clear Everything
        </Button>
      </div>
    </div>
  )
}
