import { Menu } from './types';

interface Privileges {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

const viewPrivilege = {
  Id: 79,
  Nome: 'Visualizar',
  CodigoReferencia: 'view',
};

const createPrivilege = {
  Id: 83,
  Nome: 'Inserir',
  CodigoReferencia: 'add',
};

const editPrivilege = {
  Id: 80,
  Nome: 'Editar',
  CodigoReferencia: 'edit',
};

const deletePrivilege = {
  Id: 84,
  Nome: 'Excluir',
  CodigoReferencia: 'delete',
};

export const reportsMenu = ({
  view,
  create,
  edit,
  delete: deletePermission,
}: Privileges) => {
  return {
    Id: 62,
    Nome: 'Relatórios',
    Url: '#',
    NomeIcone: 'fa fa-file-text',
    CodigoReferencia: null,
    Visivel: 0,
    MenuPai: null,
    Filhos: [
      {
        Id: 273,
        Nome: 'Atestados',
        Url: 'relatorios/visualizar',
        NomeIcone: null,
        CodigoReferencia: 'relatorioVisualizar',
        Visivel: 1,
        MenuPai: null,
        Filhos: [],
        Privilegios: [
          ...(view ? [viewPrivilege] : []),
          ...(create ? [createPrivilege] : []),
          ...(edit ? [editPrivilege] : []),
          ...(deletePermission ? [deletePrivilege] : []),
        ],
      },
      {
        Id: 274,
        Nome: 'Vacinas',
        Url: 'relatorios/vacina',
        NomeIcone: null,
        CodigoReferencia: 'relatorioVacina',
        Visivel: 1,
        MenuPai: null,
        Filhos: [],
        Privilegios: [
          ...(view ? [viewPrivilege] : []),
          ...(create ? [createPrivilege] : []),
          ...(edit ? [editPrivilege] : []),
          ...(deletePermission ? [deletePrivilege] : []),
        ],
      },
    ],
    Privilegios: [],
  };
};

export const doctorsNoteMenu = ({
  view,
  create,
  edit,
  delete: deletePermission,
}: Privileges) => {
  return {
    Id: 51,
    Nome: 'Atestado',
    Url: null,
    NomeIcone: 'flaticon-settings',
    CodigoReferencia: null,
    Visivel: 0,
    MenuPai: null,
    Filhos: [
      {
        Id: 56,
        Nome: 'Acompanhamento',
        Url: 'acompanhamento',
        NomeIcone: null,
        CodigoReferencia: 'acompanhamento',
        Visivel: 0,
        MenuPai: null,
        Filhos: [],
        Privilegios: [
          ...(view ? [viewPrivilege] : []),
          ...(create ? [createPrivilege] : []),
          ...(edit ? [editPrivilege] : []),
          ...(deletePermission ? [deletePrivilege] : []),
        ],
      },
      {
        Id: 54,
        Nome: 'Enviar Atestado/Declaração',
        Url: 'formulario/atestado-medico',
        NomeIcone: 'flaticon-user-add',
        CodigoReferencia: 'atestadoFormulario',
        Visivel: 1,
        MenuPai: null,
        Filhos: [],
        Privilegios: [
          ...(view ? [viewPrivilege] : []),
          ...(create ? [createPrivilege] : []),
          ...(edit ? [editPrivilege] : []),
          ...(deletePermission ? [deletePrivilege] : []),
        ],
      },
      {
        Id: 60,
        Nome: 'Meus Envios',
        Url: 'atestado/acompanhamento-visualizar',
        NomeIcone: null,
        CodigoReferencia: 'acompanhamento-view',
        Visivel: 1,
        MenuPai: null,
        Filhos: [],
        Privilegios: [
          ...(view ? [viewPrivilege] : []),
          ...(create ? [createPrivilege] : []),
          ...(edit ? [editPrivilege] : []),
          ...(deletePermission ? [deletePrivilege] : []),
        ],
      },
      {
        Id: 55,
        Nome: 'Perguntas Frequentes',
        Url: 'perguntas-frequentes',
        NomeIcone: 'flaticon-chat-1',
        CodigoReferencia: 'atestadoPerguntas',
        Visivel: 1,
        MenuPai: null,
        Filhos: [],
        Privilegios: [
          ...(view ? [viewPrivilege] : []),
          ...(create ? [createPrivilege] : []),
          ...(edit ? [editPrivilege] : []),
          ...(deletePermission ? [deletePrivilege] : []),
        ],
      },
    ],
    Privilegios: [],
  };
};

const occupationalHealthMenu = ({
  view,
  create,
  edit,
  delete: deletePermission,
}: Privileges) => {
  return {
    Id: 52,
    Nome: 'Medicina do Trabalho',
    Url: null,
    NomeIcone: 'flaticon-user-settings',
    CodigoReferencia: null,
    Visivel: 0,
    MenuPai: null,
    Filhos: [
      {
        Id: 65,
        Nome: 'Atestados Enviados',
        Url: 'sesmt/atestados-visualizar',
        NomeIcone: null,
        CodigoReferencia: 'visualizar',
        Visivel: 0,
        MenuPai: null,
        Filhos: [],
        Privilegios: [
          {
            Id: 79,
            Nome: 'Visualizar',
            CodigoReferencia: 'view',
          },
          {
            Id: 86,
            Nome: 'Visualizar Cid',
            CodigoReferencia: 'view_cid',
          },
        ],
      },
      {
        Id: 57,
        Nome: 'CID',
        Url: 'sesmt/cid/visualizar',
        NomeIcone: null,
        CodigoReferencia: 'cid',
        Visivel: 1,
        MenuPai: null,
        Filhos: [],
        Privilegios: [
          {
            Id: 79,
            Nome: 'Visualizar',
            CodigoReferencia: 'view',
          },
          {
            Id: 80,
            Nome: 'Editar',
            CodigoReferencia: 'edit',
          },
          {
            Id: 83,
            Nome: 'Inserir',
            CodigoReferencia: 'add',
          },
        ],
      },
      {
        Id: 59,
        Nome: 'Contra Turno',
        Url: 'sesmt/contra-turno/visualizar',
        NomeIcone: null,
        CodigoReferencia: 'contraturno',
        Visivel: 1,
        MenuPai: null,
        Filhos: [],
        Privilegios: [
          {
            Id: 79,
            Nome: 'Visualizar',
            CodigoReferencia: 'view',
          },
          {
            Id: 83,
            Nome: 'Inserir',
            CodigoReferencia: 'add',
          },
          {
            Id: 84,
            Nome: 'Excluir',
            CodigoReferencia: 'delete',
          },
        ],
      },
      {
        Id: 53,
        Nome: 'Dashboard',
        Url: 'sesmt/dashboard',
        NomeIcone: null,
        CodigoReferencia: 'dashboard',
        Visivel: 1,
        MenuPai: null,
        Filhos: [],
        Privilegios: [
          {
            Id: 79,
            Nome: 'Visualizar',
            CodigoReferencia: 'view',
          },
        ],
      },
      {
        Id: 66,
        Nome: 'Envio Original',
        Url: 'sesmt/envio-original',
        NomeIcone: null,
        CodigoReferencia: 'enviooriginal',
        Visivel: 1,
        MenuPai: null,
        Filhos: [],
        Privilegios: [
          {
            Id: 79,
            Nome: 'Visualizar',
            CodigoReferencia: 'view',
          },
          {
            Id: 83,
            Nome: 'Inserir',
            CodigoReferencia: 'add',
          },
        ],
      },
      {
        Id: 58,
        Nome: 'Motivo Rejeição',
        Url: 'sesmt/motivo-rejeicao/visualizar',
        NomeIcone: null,
        CodigoReferencia: 'motivorejeicao',
        Visivel: 1,
        MenuPai: null,
        Filhos: [],
        Privilegios: [
          {
            Id: 79,
            Nome: 'Visualizar',
            CodigoReferencia: 'view',
          },
          {
            Id: 80,
            Nome: 'Editar',
            CodigoReferencia: 'edit',
          },
          {
            Id: 83,
            Nome: 'Inserir',
            CodigoReferencia: 'add',
          },
        ],
      },
      {
        Id: 61,
        Nome: 'Perguntas Frequentes',
        Url: 'sesmt/duvidas/visualizar',
        NomeIcone: null,
        CodigoReferencia: 'duvida',
        Visivel: 1,
        MenuPai: null,
        Filhos: [],
        Privilegios: [
          {
            Id: 79,
            Nome: 'Visualizar',
            CodigoReferencia: 'view',
          },
          {
            Id: 80,
            Nome: 'Editar',
            CodigoReferencia: 'edit',
          },
          {
            Id: 83,
            Nome: 'Inserir',
            CodigoReferencia: 'add',
          },
          {
            Id: 84,
            Nome: 'Excluir',
            CodigoReferencia: 'delete',
          },
        ],
      },
    ],
    Privilegios: [],
  };
};

export const allAccess: Menu[] = [
  doctorsNoteMenu({
    view: true,
    create: true,
    edit: true,
    delete: true,
  }),

  reportsMenu({
    view: true,
    create: true,
    edit: true,
    delete: true,
  }),

  occupationalHealthMenu({
    view: true,
    create: true,
    edit: true,
    delete: true,
  }),
];

export const justReportsReadOnly: Menu[] = [
  reportsMenu({
    view: true,
    create: false,
    edit: false,
    delete: false,
  }),
];

export const doctorsNoteReadAndReportsAll: Menu[] = [
  reportsMenu({
    view: true,
    create: true,
    edit: true,
    delete: true,
  }),

  doctorsNoteMenu({
    view: true,
    create: false,
    edit: false,
    delete: false,
  }),
];
