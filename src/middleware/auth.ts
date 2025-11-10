import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function Authmiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/registration', request.url));
  }

  return null;
}
