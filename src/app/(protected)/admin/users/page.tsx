import { getUserFromCookie } from '@/lib/auth';
import { Button } from '@/components/ui/button';

const MOCK_LIST = [
  { id: '1', name: 'Alice Admin', email: 'admin@example.com' },
  { id: '2', name: 'Mark Manager', email: 'manager@example.com' },
  { id: '3', name: 'Vera Viewer', email: 'viewer@example.com' },
];

export default async function UsersPage() {
  const user = await getUserFromCookie();
  const actions = user?.allowedActions['/admin/users'] || [];

  return (
    <div className='container'>
      <h1>Usuários</h1>

      <div style={{ margin: '12px 0' }}>
        <Button
          disabled={!actions.includes('add')}
          title={!actions.includes('add') ? 'Sem permissão' : undefined}
        >
          Novo usuário
        </Button>
      </div>

      <div className='card'>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: 'left',
                  borderBottom: '1px solid #eee',
                  padding: 8,
                }}
              >
                Nome
              </th>
              <th
                style={{
                  textAlign: 'left',
                  borderBottom: '1px solid #eee',
                  padding: 8,
                }}
              >
                E-mail
              </th>
              <th
                style={{
                  textAlign: 'left',
                  borderBottom: '1px solid #eee',
                  padding: 8,
                }}
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LIST.map((u) => (
              <tr key={u.id}>
                <td style={{ padding: 8, borderBottom: '1px solid #f2f2f2' }}>
                  {u.name}
                </td>
                <td style={{ padding: 8, borderBottom: '1px solid #f2f2f2' }}>
                  {u.email}
                </td>
                <td style={{ padding: 8, borderBottom: '1px solid #f2f2f2' }}>
                  <Button
                    disabled={!actions.includes('edit')}
                    title={
                      !actions.includes('edit') ? 'Sem permissão' : undefined
                    }
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
