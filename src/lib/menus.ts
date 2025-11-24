import type { Menu, ChildMenu } from './types';

export type AllowedFromMenus = {
  allowedRoutes: string[];
  allowedActions: Record<string, string[]>;
};

function normalizeRoute(url: string): string {
  const withSlash = url.startsWith('/') ? url : `/${url}`;
  // remove trailing slash duplicates
  return withSlash.replace(/\/+$/, '');
}

function collectChildren(menu: Menu): ChildMenu[] {
  const children: ChildMenu[] = [];
  for (const child of menu.Filhos || []) {
    children.push(child as ChildMenu);
  }
  return children;
}

export function deriveAllowedFromMenus(
  menus: Menu[],
  overrides?: AllowedFromMenus
): AllowedFromMenus {
  const allowedRoutesSet = new Set<string>();
  const allowedActions: Record<string, string[]> = {};

  for (const top of menus) {
    const children = collectChildren(top);

    for (const child of children) {
      if (!child.Url) continue;
      const route = normalizeRoute(child.Url);
      const actions = Array.isArray(child.Privilegios)
        ? Array.from(new Set(child.Privilegios.map((p) => p.CodigoReferencia)))
        : [];

      if (actions.includes('view')) {
        allowedRoutesSet.add(route);
      }
      allowedActions[route] = actions;
    }
  }

  if (overrides) {
    // merge routes
    for (const r of overrides.allowedRoutes || []) {
      allowedRoutesSet.add(normalizeRoute(r));
    }
    // merge actions
    for (const [route, acts] of Object.entries(
      overrides.allowedActions || {}
    )) {
      const key = normalizeRoute(route);
      const curr = new Set(allowedActions[key] || []);
      acts.forEach((a) => curr.add(a));
      allowedActions[key] = Array.from(curr);
      if (curr.has('view')) allowedRoutesSet.add(key);
    }
  }

  return {
    allowedRoutes: Array.from(allowedRoutesSet),
    allowedActions,
  };
}
