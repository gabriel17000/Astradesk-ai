import { CalendarDays, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OrderCard, PageHeading } from '../components/MarketplaceUI';
import { useAstraDesk } from '../context/AstraDeskContext';

const serviceGroups = [
  { title: 'Solicitações pendentes', description: 'Aguardando resposta do profissional.', statuses: ['Solicitado'], empty: 'Nenhuma solicitação aguardando resposta.' },
  { title: 'Serviços aceitos ou agendados', description: 'Pedidos aceitos e próximos atendimentos.', statuses: ['Aceito', 'Agendado'], empty: 'Nenhum serviço aceito ou agendado.' },
  { title: 'Serviços em andamento', description: 'Atendimentos que já foram iniciados.', statuses: ['Em andamento'], empty: 'Nenhum serviço em andamento.' },
  { title: 'Serviços concluídos', description: 'Seu histórico de atendimentos finalizados.', statuses: ['Concluído'], empty: 'Nenhum serviço concluído ainda.' },
];

export default function ServicesPage() {
  const { orders } = useAstraDesk();

  return (
    <div className="page-stack">
      <PageHeading eyebrow="ACOMPANHAMENTO" title="Meus serviços" description="Veja os pedidos, acompanhe o andamento e fale com seus profissionais." action={<Link className="button primary" to="/search"><Search size={17} />Encontrar um serviço</Link>} />
      {orders.length === 0 && <div className="empty-panel"><CalendarDays size={23} /><div><strong>Você ainda não tem solicitações</strong><span>Encontre um profissional para começar.</span></div><Link className="button primary small" to="/search">Explorar serviços</Link></div>}
      {serviceGroups.map((group) => {
        const groupedOrders = orders.filter((order) => group.statuses.includes(order.status));
        return <section className="service-group" key={group.title}>
          <PageHeading title={group.title} description={group.description} action={<span className="service-group-count">{groupedOrders.length}</span>} />
          {groupedOrders.length ? <div className="order-list">{groupedOrders.map((order) => <OrderCard key={order.id} order={order} />)}</div> : <div className="service-group-empty">{group.empty}</div>}
        </section>;
      })}
    </div>
  );
}
