export interface Privilege {
  Id: number;
  Nome: 'Visualizar' | 'Inserir' | 'Editar' | 'Excluir' | string;
  CodigoReferencia: 'view' | 'add' | 'edit' | 'delete' | string;
}

export interface Menu {
  Id: number;
  Nome: string;
  Url: string | null;
  Filhos: ChildMenu[];
  Privilegios?: Privilege[];
}

export interface ChildMenu extends Menu {
  Privilegios: Privilege[];
}

// Payload armazenado no token JWT
export type AuthTokenPayload = {
  sub: string; // pessoaId
  name: string; // claims.NomePessoa
  email: string;
  allowedRoutes: string[];
  allowedActions: Record<string, string[]>; // rota -> ["view","add",...]
};

// Usuário disponível no client via provider
export interface ClientUser {
  id: string;
  name: string;
  email: string;
  allowedRoutes: string[];
  allowedActions: Record<string, string[]>;
}
