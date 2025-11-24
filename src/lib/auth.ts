import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import type { ClientUser, AuthTokenPayload } from './types';

const DEFAULT_SECRET = 'dev-only-secret-change-me';

export type AuthToken = AuthTokenPayload;

export function signToken(
  payload: AuthToken,
  { expiresIn = '1h' }: { expiresIn?: string } = {}
) {
  const secret = process.env.AUTH_SECRET || DEFAULT_SECRET;
  // Casts are used to satisfy jsonwebtoken's complex typings across versions

  return jwt.sign(
    payload as any,
    secret as any,
    { expiresIn } as any
  ) as string;
}

export function verifyToken(token: string): AuthToken | null {
  try {
    const secret = process.env.AUTH_SECRET || DEFAULT_SECRET;
    return jwt.verify(token, secret) as AuthToken;
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set('auth', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60, // 1 hour
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set('auth', '', { path: '/', maxAge: 0 });
}

export async function getUserFromCookie(): Promise<ClientUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth')?.value;

  if (!token) return null;

  const decoded = verifyToken(token);

  if (!decoded) return null;

  return {
    id: decoded.sub,
    name: decoded.name,
    email: decoded.email,
    allowedRoutes: decoded.allowedRoutes || [],
    allowedActions: decoded.allowedActions || {},
  };
}
