import { getUserFromCookie } from '@/lib/auth';
import { Button } from '@/components/ui/button';

type Props = {
  title: string;
  route: string; // absolute path starting with '/'
  actionsToShow?: string[]; // defaults to ["add","edit","delete"]
};

const LABELS: Record<string, string> = {
  add: 'Novo',
  edit: 'Editar',
  delete: 'Excluir',
  view_cid: 'Visualizar CID',
};

export default async function RouteActionsCard({
  title,
  route,
  actionsToShow,
}: Props) {
  const user = await getUserFromCookie();
  const actions = user?.allowedActions[route] || [];
  const list = actionsToShow ?? ['add', 'edit', 'delete'];

  return (
    <div className='card bg-white flex flex-col gap-4 m-0! p-6!'>
      <h1 className='text-2xl font-bold text-blue-950'>{title}</h1>

      <p>Rota: {route}</p>

      <p>Ações permitidas: {actions.join(', ') || 'nenhuma'}</p>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        {list.map((key) => {
          const label = LABELS[key] || key;
          const enabled = actions.includes(key);

          return (
            <Button
              variant='outline'
              key={key}
              disabled={!enabled}
              title={enabled ? undefined : 'Sem permissão'}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
