import { NextResponse, type NextRequest } from 'next/server';
import { Authmiddleware } from './middleware/auth';

export async function middleware(request: NextRequest) {
  const authResponse = Authmiddleware(request);
  if (authResponse) {
    return authResponse;
  }

  return NextResponse.next();
}
