'use client';

import { File, Bell, UserRound, ChevronDown, ChevronLeft } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import type { ClientUser } from '@/lib/types';
import { Button } from './ui/button';
import { useEffect, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';

export function Nav({ user }: { user: ClientUser | null }) {
  async function doLogout() {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } finally {
      try {
        localStorage.removeItem('menus');
      } catch {}
      window.location.href = '/login';
    }
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  return (
    <nav className='flex items-center justify-between py-3 border-b border-gray-200 mx-6'>
      <div className='flex items-center gap-x-4'>
        <SidebarTrigger />

        <div className='flex items-center'>
          <Button variant='icon' size='icon' className='flex items-center'>
            <ChevronLeft />

            <span className='text-xs'>Voltar</span>
          </Button>
        </div>

        {/* Select substituído por Dropdown (shadcn-like) */}
        <NavQuickSelect />
      </div>

      <div className='flex items-center gap-x-9'>
        <Button variant='icon'>
          <File />
        </Button>

        <div className='flex items-center gap-x-3'>
          <Bell />

          <div className='relative flex items-center' ref={menuRef}>
            <div className='flex flex-col gap-x-3'>
              <span className='text-xs uppercase'>{user?.name}</span>
              <span className='text-xs'>{user?.id}</span>
            </div>

            <Button
              className='w-fit! h-fit! pr-0!'
              variant='icon'
              size='icon'
              aria-haspopup='menu'
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <div className='size-6 border border-blue-950 rounded-full flex items-center justify-center'>
                <UserRound />
              </div>
              <ChevronDown
                className={`size-4 transition-transform ${
                  menuOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>

            {menuOpen && (
              <div
                role='menu'
                aria-label='Menu do usuário'
                className='absolute right-0 top-full mt-2 w-44 rounded-md border border-gray-200 bg-white shadow-md z-50'
              >
                <button
                  role='menuitem'
                  className='w-full text-left px-3 py-2 text-sm hover:bg-gray-100'
                  onClick={doLogout}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavQuickSelect() {
  const [value, setValue] = useState<string>('Selecione um sistema');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='h-8 min-w-48 justify-between rounded-lg!'
        >
          <span className='truncate'>{value}</span>
          <ChevronDown className='size-4 opacity-70' />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
