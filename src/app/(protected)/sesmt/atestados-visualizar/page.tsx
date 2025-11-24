import RouteActionsCard from '@/components/RouteActionsCard';

export default async function Page() {
  return (
    <RouteActionsCard
      title='SESMT - Atestados Enviados'
      route='/sesmt/atestados-visualizar'
      actionsToShow={['view_cid', 'add', 'edit', 'delete']}
    />
  );
}
