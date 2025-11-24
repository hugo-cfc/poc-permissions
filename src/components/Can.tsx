'use client';

import type { ClientUser } from '@/lib/types';

export function Can({
  user,
  route,
  action,
  children,
}: {
  user: ClientUser | null;
  route: string;
  action: string;
  children: React.ReactNode;
}) {
  if (!user) return null;
  const key = route.startsWith('/') ? route : `/${route}`;
  const actions = user.allowedActions[key] || [];
  return actions.includes(action) ? <>{children}</> : null;
}
