import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { verify } from './lib/jose'
import { message } from './app/helpers/utils'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  if (url.pathname === '/') {
    url.pathname = '/auth/user/login'
    return NextResponse.redirect(url)
  } else if (url.pathname.startsWith('/api/backend')) {
    const token = request.headers.get('x-auth-token') || request.headers.get('authorization'); // Will output `referer` header value

    const response = NextResponse.next();

    if (!token) return new NextResponse(
      JSON.stringify(message('Unauthorized', 'danger')),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )

    // Validate token
    try {
      const decoded = await verify(token)
      response.cookies.set('user', JSON.stringify(decoded.user))

      return response
    } catch (error) {
      return response
    }
  }
}