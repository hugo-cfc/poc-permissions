# PoC Permissions (Next.js)

Projeto Next.js (App Router) com autenticação mock (JWT via cookie) e controle de permissões em páginas, menus e botões.

## Requisitos

- Node 18+ (recomendado LTS)

## Rodando

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Usuários de teste

- admin@example.com / admin123 — role: admin — perm: dashboard:view, users:view, users:create, users:edit
- manager@example.com / manager123 — role: manager — perm: dashboard:view, users:view, users:edit
- viewer@example.com / viewer123 — role: viewer — perm: dashboard:view

## Estrutura

- `src/app/(auth)/login` — página de login
- `src/app/(protected)/dashboard` — dashboard (protegido)
- `src/app/admin/users` — listagem de usuários (protegido), com botões controlados por permissão
- `src/app/api/login` — POST para autenticar; seta cookie `auth` (HttpOnly)
- `src/app/api/logout` — POST para sair; apaga cookie `auth`
- `middleware.ts` — garante autenticação nas rotas protegidas (`/dashboard`, `/admin`)
- `src/lib/permissions.ts` — definição de roles e permissões
- `src/lib/mockdb.ts` — mock de usuários
- `src/lib/auth.ts` — assinar/verificar token e utilitários de cookie (server-side)
- `src/components/Nav.tsx` — menu que oculta links sem permissão
- `src/components/Can.tsx` — helper para condicionar render por permissão (client)

## Como funciona

- Ao fazer login, o backend mock gera um JWT com `id`, `name`, `email`, `role` e `permissions`, e salva em um cookie HttpOnly (`auth`).
- O `middleware` verifica se o cookie existe em páginas protegidas e redireciona para `/login` se necessário.
- As páginas (server components) leem o cookie no servidor e:
  - redirecionam para `/forbidden` caso falte permissão específica;
  - renderizam menus/botões apenas quando a permissão existe.

## Configurações

- Segredo do JWT: variável de ambiente `AUTH_SECRET` (opcional). Em desenvolvimento usamos um valor padrão.

## Limitações e próximos passos

- O middleware não valida a assinatura do JWT (Edge runtime não suporta `jsonwebtoken`). A validação é feita nas páginas e APIs. Em produção, considere `jose` (Web Crypto) para validar no middleware.
- Adicionar persistência real (DB/API) e paginação na lista de usuários.
- Adicionar testes automatizados (unit/integration) e linter.
# poc-permissions
