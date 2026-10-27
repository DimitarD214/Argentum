import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // 1. Guard against missing environment variables on Vercel deployment
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse
  }

  // 2. Optimization: Skip session check/refresh on Next.js prefetch requests
  if (request.headers.get('x-middleware-prefetch') === 'true') {
    return supabaseResponse
  }

  // 3. Fast path: If the visitor has no Supabase auth cookies, skip the network round-trip
  const hasAuthCookie = request.cookies.getAll().some((c) => c.name.startsWith('sb-'))
  if (!hasAuthCookie) {
    if (request.nextUrl.pathname.startsWith('/account')) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 4. Wrap getUser call in try-catch to prevent crashing middleware and timing out
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (
      !user &&
      request.nextUrl.pathname.startsWith('/account')
    ) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  } catch (error) {
    console.error('Failed to get user session in middleware:', error)
  }

  return supabaseResponse
}
