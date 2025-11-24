import { ReactNode } from 'react';
import { getUserFromCookie } from '@/lib/auth';
import { Nav } from '@/components/Nav';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserFromCookie();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-screen'>
        <Nav user={user} />

        <section className='p-6'>{children}</section>
      </main>
    </SidebarProvider>
  );
}
