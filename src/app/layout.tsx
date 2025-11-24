import type { Metadata } from 'next';
import { getUserFromCookie } from '@/lib/auth';
import { Nav } from '@/components/Nav';
import { UserProvider } from '@/components/UserProvider';

import './styles.css';

export const metadata: Metadata = {
  title: 'PoC Permissions',
  description: 'Demo de autenticação e permissões com Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookie();

  return (
    <html lang='pt-BR'>
      <body className='bg-sidebar'>
        <UserProvider user={user}>
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
