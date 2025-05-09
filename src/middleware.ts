import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = ['/user', '/forum/create'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Debug authentication cookies
  const cookies = request.cookies.getAll();
  
  // Check for authentication by looking for the authentication cookie
  // The API returns HTTP-only cookies which the browser automatically includes in requests
  const isAuthenticated = request.cookies.has('jwt') || request.cookies.has('auth_token');

  // Check if the route requires authentication and user is not logged in
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    // Create a URL for the login page
    const loginUrl = new URL('/auth/login', request.url);
    
    // Add the current URL as a "from" parameter to enable redirect after login
    loginUrl.searchParams.set('from', pathname);
    
    // Redirect to login page
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    '/user/:path*', 
    '/forum/create:path*'
  ],
}; 