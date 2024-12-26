import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname 

  const isPublic = path ==='/login' || path ==='/signup'

  const token = request.cookies.get('token')?.value || '';

  if(isPublic && token){
    return NextResponse.redirect(new URL('/profile',request.nextUrl));
  }
  if(!isPublic && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/profile/:path'
  ],
}