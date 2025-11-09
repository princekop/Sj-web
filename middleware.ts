import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Temporarily bypassing middleware for debugging
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
