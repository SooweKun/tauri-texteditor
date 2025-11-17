import { NextResponse, type NextRequest } from 'next/server';
import { Authmiddleware } from './middleware/auth';

export async function proxy(request: NextRequest) {
  const authResponse = Authmiddleware(request);
  if (authResponse) {
    return null;
  }

  return NextResponse.next();
}
