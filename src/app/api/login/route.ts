import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, findUserByPessoaId } from '@/lib/mockdb';
import { signToken, setAuthCookie, verifyToken } from '@/lib/auth';
import { deriveAllowedFromMenus } from '@/lib/menus';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = body?.email as string | undefined;
  const password = body?.password as string | undefined;

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Missing email or password' },
      { status: 400 }
    );
  }

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Derive allowed routes and actions from menus; add minimal overrides for demo routes
  const { allowedRoutes, allowedActions } = deriveAllowedFromMenus(user.menus, {
    allowedRoutes: ['/dashboard', '/admin/users'],
    allowedActions: {
      '/dashboard': ['view'],
      '/admin/users': ['view', 'add', 'edit'],
    },
  });

  const token = signToken({
    sub: user.pessoaId,
    name: user.claims.NomePessoa,
    email: user.email,
    allowedRoutes,
    allowedActions,
  });

  await setAuthCookie(token);

  return NextResponse.json({
    user: {
      id: user.pessoaId,
      name: user.claims.NomePessoa,
      email: user.email,
      allowedRoutes,
      allowedActions,
    },
    menus: user.menus,
  });
}

// Retorna os menus do usuário autenticado usando o mesmo endpoint de login
export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth')?.value;

  if (!token)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded?.sub)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = findUserByPessoaId(decoded.sub);
  if (!user) return NextResponse.json({ error: 'Not Found' }, { status: 404 });

  return NextResponse.json({ menus: user.menus });
}
