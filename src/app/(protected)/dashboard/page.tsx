import { getUserFromCookie } from '@/lib/auth';

export default async function DashboardPage() {
  const user = await getUserFromCookie();

  return (
    <div className='card bg-white flex flex-col gap-4 m-0! p-6!'>
      <h1 className='text-2xl font-bold text-blue-950'>Dashboard</h1>

      <section className='card flex flex-col gap-4'>
        <h2>Visão geral</h2>

        <p>Rotas permitidas: {user?.allowedRoutes.join(', ')}</p>

        <p>
          Ações em /admin/users:{' '}
          {Object.values(user?.allowedActions['/admin/users'] || []).join(', ')}
        </p>
      </section>
    </div>
  );
}
