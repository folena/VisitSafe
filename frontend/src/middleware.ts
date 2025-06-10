import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const role  = req.cookies.get('role')?.value
  const { pathname } = req.nextUrl

  const isProtected   = pathname.startsWith('/dashboard')
                    || pathname.startsWith('/admin')
                    || pathname.startsWith('/employee')
                    || pathname.startsWith('/owner')

  const isAdminRoute    = pathname.startsWith('/admin')
  const isOwnerRoute    = pathname.startsWith('/owner')
  const isEmployeeRoute = pathname.startsWith('/employee')

  if (!token && isProtected)
    return NextResponse.redirect(new URL('/login', req.url))

  if (isAdminRoute    && role !== 'ADMIN')    return NextResponse.redirect(new URL('/dashboard', req.url))
  if (isOwnerRoute    && role !== 'OWNER')    return NextResponse.redirect(new URL('/dashboard', req.url))
  if (isEmployeeRoute && role !== 'EMPLOYEE') return NextResponse.redirect(new URL('/dashboard', req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/employee/:path*', '/owner/:path*'],
}
