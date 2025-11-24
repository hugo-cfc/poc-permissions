import { NextResponse, type NextRequest } from 'next/server';

// Array de rotas protegidas
const PROTECTED_PREFIXES = [
  '/dashboard',
  '/admin',
  '/acompanhamento',
  '/formulario',
  '/atestado',
  '/perguntas-frequentes',
  '/relatorios',
  '/sesmt',
];

// Decodifica apenas o payload do JWT (sem verificação de assinatura)
// Importante: isso é suficiente para um mock, mas em produção valide a assinatura no servidor
function decodeJwtPayload<T = any>(token: string): T | null {
  try {
    const parts = token.split('.');

    if (parts.length < 2) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);

    const json = atob(padded);

    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const token = req.cookies.get('auth')?.value;

  // Se já autenticado, não permitir acessar /login (UX)
  if (pathname.startsWith('/login') && token) {
    const dashUrl = new URL('/dashboard', req.url);

    return NextResponse.redirect(dashUrl);
  }

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  // Se a rota não é protegida por login, seguir
  if (!isProtected) {
    return NextResponse.next();
  }

  // Controle de login (mantido aqui): se não autenticado, enviar para /login
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    if (pathname) loginUrl.searchParams.set('next', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // Gating por allowedRoutes no token (prefix match)
  const payload = decodeJwtPayload<{ allowedRoutes?: string[] }>(token) || {};

  const routes = Array.isArray(payload.allowedRoutes)
    ? payload.allowedRoutes
    : [];

  const isAllowed = routes.some((r) => pathname.startsWith(r));

  if (!isAllowed) {
    const forb = new URL('/forbidden', req.url);
    return NextResponse.redirect(forb);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
