import type { Menu } from './types';
import {
  allAccess,
  justReportsReadOnly,
  doctorsNoteReadAndReportsAll,
} from './menusMock';

export type InternalUser = {
  pessoaId: string;
  claims: { NomePessoa: string };
  email: string;
  password: string;
  menus: Menu[];
};

const users: InternalUser[] = [
  {
    pessoaId: '1',
    claims: { NomePessoa: 'Alice Admin' },
    email: 'admin@example.com',
    password: 'admin123',
    menus: allAccess,
  },
  {
    pessoaId: '2',
    claims: { NomePessoa: 'Mark justReportsReadOnly' },
    email: 'justReportsReadOnly@example.com',
    password: 'manager123',
    menus: justReportsReadOnly,
  },
  {
    pessoaId: '3',
    claims: { NomePessoa: 'Vera doctorsNoteReadAndReportsAll' },
    email: 'doctorsNoteReadAndReportsAll@example.com',
    password: 'viewer123',
    menus: doctorsNoteReadAndReportsAll,
  },
];

export function findUserByEmail(email: string) {
  return (
    users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
  );
}

export function findUserByPessoaId(pessoaId: string) {
  return users.find((u) => u.pessoaId === pessoaId) || null;
}
