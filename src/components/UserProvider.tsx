'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { ClientUser } from '@/lib/types';

export type UserContextValue = {
  user: ClientUser | null;
  hasRoute: (pathname: string) => boolean;
  hasAction: (route: string, action: string) => boolean;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({
  user,
  children,
}: {
  user: ClientUser | null;
  children: React.ReactNode;
}) {
  const value = useMemo<UserContextValue>(
    () => ({
      user,
      hasRoute: (pathname: string) =>
        !!user?.allowedRoutes?.some((r) => pathname.startsWith(r)),
      hasAction: (route: string, action: string) => {
        const key = route.startsWith('/') ? route : `/${route}`;
        const actions = user?.allowedActions?.[key] || [];
        return actions.includes(action);
      },
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within <UserProvider>');
  return ctx;
}
