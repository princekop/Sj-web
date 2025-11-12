import type React from "react"
import { Suspense } from "react"
import LoginForm from "@/app/auth/login/LoginForm"

function LoginFormFallback() {
  return (
    <div className="space-y-4">
      <div className="h-20 bg-muted rounded animate-pulse"></div>
      <div className="h-20 bg-muted rounded animate-pulse"></div>
      <div className="h-12 bg-muted rounded animate-pulse"></div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-tight mb-2">Sign In</h1>
          <p className="text-muted-foreground">Welcome back to our collection</p>
        </div>
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <a href="/auth/register" className="text-primary hover:underline font-medium">
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}
