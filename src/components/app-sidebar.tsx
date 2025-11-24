'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/components/UserProvider';
import type { Menu } from '@/lib/types';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import UninterLogo from '@/assets/uninterLogo.svg';
import Image from 'next/image';
import {
  ChevronDown,
  ChevronUp,
  Home,
  FileText,
  FileBarChart2,
  Stethoscope,
  Settings,
  BarChart3,
  HelpCircle,
  ClipboardList,
  Upload,
  Clock3,
  Syringe,
  LayoutDashboard,
} from 'lucide-react';

type MenusResponse = { menus: Menu[] };

function normalizeRoute(url: string) {
  const withSlash = url.startsWith('/') ? url : `/${url}`;
  return withSlash.replace(/\/+$/, '');
}

export function AppSidebar() {
  const { user } = useUser();
  const [menus, setMenus] = useState<Menu[] | null>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const ACTIVE_CLASSES =
    'data-[active=true]:bg-[#0B3B8E] data-[active=true]:text-white!';

  function GroupIcon({ name }: { name: string }) {
    const n = name.toLowerCase();
    if (n.includes('atestado')) return <FileText className='size-4.5' />;
    if (n.includes('relat')) return <FileBarChart2 className='size-4.5' />;
    if (n.includes('medicina') || n.includes('trabalho'))
      return <Stethoscope className='size-4.5' />;
    if (n.includes('config')) return <Settings className='size-4.5' />;
    if (n.includes('indic')) return <BarChart3 className='size-4.5' />;
    return <FileText className='size-4.5' />;
  }

  function ItemIcon({ name, route }: { name: string; route: string }) {
    const n = name.toLowerCase();
    const r = route.toLowerCase();
    if (
      n.includes('perguntas') ||
      n.includes('dúvidas') ||
      n.includes('duvidas')
    )
      return <HelpCircle className='size-4.5' />;
    if (n.includes('acompanhamento') || n.includes('envios'))
      return <ClipboardList className='size-4.5' />;
    if (n.includes('enviar') || n.includes('original') || r.includes('envio'))
      return <Upload className='size-4.5' />;
    if (n.includes('contra turno') || r.includes('contra-turno'))
      return <Clock3 className='size-4.5' />;
    if (n.includes('vacina') || r.includes('vacina'))
      return <Syringe className='size-4.5' />;
    if (n.includes('dashboard'))
      return <LayoutDashboard className='size-4.5' />;
    if (n.includes('cid')) return <FileText className='size-4.5' />;
    return <FileText className='size-4.5' />;
  }

  useEffect(() => {
    let alive = true;
    // First, try localStorage cache filled during login
    try {
      const cached = localStorage.getItem('menus');
      if (cached) {
        const parsed = JSON.parse(cached) as Menu[];
        setMenus(parsed);
        setLoading(false);
        return () => {
          alive = false;
        };
      }
    } catch {}

    setLoading(true);
    // Fallback: reuse the same login route (GET) to obtain menus
    fetch('/api/login')
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data: MenusResponse) => {
        if (!alive) return;
        setMenus(data.menus || []);
        try {
          if (data?.menus)
            localStorage.setItem('menus', JSON.stringify(data.menus));
        } catch {}
      })
      .catch(() => {
        if (!alive) return;
        setMenus([]);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const allowed = useMemo(() => new Set(user?.allowedRoutes || []), [user]);

  // Initialize group open state when menus, allowed, or pathname changes
  useEffect(() => {
    if (!menus) return;
    const initial: Record<string, boolean> = {};
    for (const group of menus) {
      const children = Array.isArray(group.Filhos) ? group.Filhos : [];
      const anyActive = children.some((child) => {
        if (!child?.Url) return false;
        const hasView = (child.Privilegios || []).some(
          (p) => p.CodigoReferencia === 'view'
        );
        if (!hasView) return false;
        const route = normalizeRoute(child.Url);
        const visible = allowed.size > 0 ? allowed.has(route) : true;
        if (!visible) return false;
        return pathname.startsWith(route);
      });
      initial[group.Id] = anyActive;
    }
    setOpenGroups((prev) => ({ ...initial, ...prev }));
  }, [menus, allowed, pathname]);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className='flex flex-col items-center justify-center mb-2'>
          <Image
            src={UninterLogo.src}
            alt='Uninter'
            width={150 / 2}
            height={40 / 2}
          />

          <h1>Atestado Digital</h1>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {loading && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled aria-disabled>
                    Carregando...
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        {!loading && (menus?.length ?? 0) === 0 && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled aria-disabled>
                    Nenhum menu disponível
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname === '/dashboard'}
            className={ACTIVE_CLASSES}
          >
            <Link
              href={'/dashboard'}
              className='text-[#0B3B8E]! hover:no-underline!'
            >
              <span className='mr-2 inline-flex items-center justify-center'>
                <Home className='size-4.5' />
              </span>
              Início
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarSeparator />

        {(menus || []).map((group) => {
          const children = Array.isArray(group.Filhos) ? group.Filhos : [];

          const visibleChildren = children.filter((child) => {
            if (!child.Url) return false;

            const hasView = (child.Privilegios || []).some(
              (p) => p.CodigoReferencia === 'view'
            );

            if (!hasView) return false;

            const route = normalizeRoute(child.Url);

            return allowed.size > 0 ? allowed.has(route) : true;
          });

          if (visibleChildren.length === 0) return null;

          const isOpen = openGroups[group.Id] ?? false;

          return (
            <Fragment key={group.Id}>
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <button
                    type='button'
                    className='flex w-full items-center justify-between bg-transparent! hover:bg-sidebar-accent! border-0! p-2.5!'
                    onClick={() =>
                      setOpenGroups((s) => ({ ...s, [group.Id]: !isOpen }))
                    }
                  >
                    <span className='flex items-center gap-2'>
                      <GroupIcon name={group.Nome} />
                      {group.Nome}
                    </span>

                    {!isOpen ? (
                      <ChevronDown className='size-4' />
                    ) : (
                      <ChevronUp className='size-4' />
                    )}
                  </button>
                </SidebarGroupLabel>

                {isOpen && (
                  <SidebarGroupContent>
                    <SidebarMenuSub>
                      {visibleChildren.map((child) => {
                        const route = normalizeRoute(child.Url!);
                        const isActive =
                          pathname === route ||
                          pathname.startsWith(route + '/');

                        return (
                          <SidebarMenuSubItem key={child.Id}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive}
                              className={ACTIVE_CLASSES}
                            >
                              <Link
                                href={route}
                                className='text-[#0B3B8E]! hover:no-underline!'
                              >
                                <span className='mr-2 inline-flex items-center justify-center'>
                                  <ItemIcon name={child.Nome} route={route} />
                                </span>
                                {child.Nome}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </SidebarGroupContent>
                )}
              </SidebarGroup>

              <SidebarSeparator />
            </Fragment>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
