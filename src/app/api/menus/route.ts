import { NextResponse } from 'next/server';

// Deprecated: use GET /api/login to fetch menus for the authenticated user.
export async function GET() {
  return NextResponse.json(
    { error: 'Deprecated endpoint. Use GET /api/login for menus.' },
    { status: 410 }
  );
}
