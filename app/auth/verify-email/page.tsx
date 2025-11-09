import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <Mail size={64} className="mx-auto mb-6 text-primary" />
        <h1 className="text-3xl font-light tracking-tight mb-2">Verify Your Email</h1>
        <p className="text-muted-foreground mb-8">
          We've sent a verification link to your email address. Please check your inbox and click the link to verify
          your account.
        </p>

        <div className="bg-secondary rounded p-4 mb-8">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or try signing up again.
          </p>
        </div>

        <Link href="/auth/login">
          <Button className="w-full bg-primary text-primary-foreground">Back to Sign In</Button>
        </Link>
      </div>
    </div>
  )
}
