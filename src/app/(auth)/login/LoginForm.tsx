'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get('next');

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function performLogin(emailParam: string, passwordParam: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailParam, password: passwordParam }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Falha ao autenticar');
      }

      // Persist menus locally to avoid another request on the sidebar
      const data = (await res.json().catch(() => ({}))) as { menus?: any };

      if (data?.menus) {
        try {
          localStorage.setItem('menus', JSON.stringify(data.menus));
        } catch {}
      }

      router.replace(next || '/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await performLogin(email, password);
  }

  return (
    <div className='container'>
      <h1>Entrar</h1>
      <p>
        Use um dos usuários de teste: <code>admin@example.com</code> /{' '}
        <code>justReportsReadOnly@example.com</code> /{' '}
        <code>doctorsNoteReadAndReportsAll@example.com</code>
      </p>
      <div className='card'>
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 12,
            flexWrap: 'wrap',
          }}
        >
          <Button
            type='button'
            disabled={loading}
            onClick={() => performLogin('admin@example.com', 'admin123')}
            title='Entrar como Admin'
            variant='outline'
          >
            Entrar como Admin
          </Button>
          <Button
            type='button'
            disabled={loading}
            onClick={() =>
              performLogin('justReportsReadOnly@example.com', 'manager123')
            }
            title='Entrar como Reports ReadOnly'
            variant='outline'
          >
            Entrar como Reports ReadOnly
          </Button>
          <Button
            type='button'
            disabled={loading}
            onClick={() =>
              performLogin(
                'doctorsNoteReadAndReportsAll@example.com',
                'viewer123'
              )
            }
            title='Entrar como Doctors Note + Reports'
            variant='outline'
          >
            Entrar como Doctors Note + Reports
          </Button>
        </div>
        <form onSubmit={onSubmit} style={{ maxWidth: 360 }}>
          <label htmlFor='email'>E-mail</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='password'>Senha</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: 'crimson' }}>{error}</p>}

          <div style={{ marginTop: 12 }}>
            <Button type='submit' disabled={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </Button>
          </div>
        </form>
      </div>

      <details>
        <summary>Senhas</summary>
        <ul>
          <li>admin@example.com / admin123</li>
          <li>justReportsReadOnly@example.com / manager123</li>
          <li>doctorsNoteReadAndReportsAll@example.com / viewer123</li>
        </ul>
      </details>
    </div>
  );
}
