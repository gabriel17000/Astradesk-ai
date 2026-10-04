import { ArrowLeft, Check, MessageCircle, ShieldCheck, Star } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageHeading, StatusBadge, formatCurrency } from '../components/MarketplaceUI';
import { useAstraDesk } from '../context/AstraDeskContext';
import { orderStatuses } from '../data/mockData';

export default function ServiceTrackingPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, services, professionals, advanceOrder } = useAstraDesk();
  const order = orders.find((item) => item.id === orderId);
  const service = services.find((item) => item.id === order?.serviceId);
  const professional = professionals.find((item) => item.id === order?.professionalId);

  if (!order || !service || !professional) return <div className="empty-panel"><div><strong>Solicitação não encontrada</strong><span>Confira sua lista de serviços ou faça uma nova busca.</span></div><button className="button primary small" onClick={() => navigate('/services')}>Meus serviços</button></div>;

  const currentStep = orderStatuses.indexOf(order.status);
  const nextStep = orderStatuses[currentStep + 1];
  const nextLabel = { Aceito: 'Simular aceite do profissional', Agendado: 'Confirmar horário', 'Em andamento': 'Iniciar atendimento', Concluído: 'Concluir serviço' }[nextStep];

  return (
    <div className="page-stack">
      <button className="back-link" onClick={() => navigate('/services')}><ArrowLeft size={16} /> Meus serviços</button>
      <PageHeading eyebrow={`PEDIDO ${order.id}`} title={service.name} description={`${order.date} às ${order.time} · ${order.address}`} action={<StatusBadge status={order.status} />} />
      <div className="tracking-grid">
        <div className="page-stack">
          <section className="content-panel"><PageHeading title="Acompanhe seu serviço" description="Você recebe atualizações aqui a cada etapa." /><ol className="timeline">{orderStatuses.map((step, index) => <li key={step} className={index <= currentStep ? 'complete' : ''}><span className="timeline-marker">{index < currentStep ? <Check size={15} /> : index + 1}</span><div><strong>{step}</strong><small>{index === currentStep ? 'Etapa atual' : index < currentStep ? 'Concluída' : 'Aguardando'}</small></div></li>)}</ol>
            {nextStep ? <button className="button primary full" onClick={() => advanceOrder(order.id)}>{nextLabel}</button> : <div className="complete-note"><Check size={17} /> Serviço concluído. Obrigado por usar o AstraDesk!</div>}
            {nextStep && <p className="demo-note">Protótipo demonstrável: avance as etapas para simular atualizações do serviço.</p>}
          </section>
          <section className="content-panel"><PageHeading title="Detalhes do pedido" /><dl className="detail-list"><div><dt>Serviço</dt><dd>{service.name}</dd></div><div><dt>Descrição</dt><dd>{order.description}</dd></div><div><dt>Local</dt><dd>{order.address}</dd></div><div><dt>Data e horário</dt><dd>{order.date}, às {order.time}</dd></div>{order.notes && <div><dt>Observações</dt><dd>{order.notes}</dd></div>}<div><dt>Valor estimado</dt><dd>{formatCurrency(service.price)}</dd></div></dl></section>
        </div>
        <aside className="page-stack">
          <section className="content-panel pro-mini-card"><PageHeading title="Seu profissional" /><Link to={`/professional/${professional.id}`} className="provider-detail"><img className="professional-avatar large" src={professional.avatar} alt="" /><span className="provider-detail-copy"><strong>{professional.name}</strong><small>{professional.profession}</small><span><Star size={14} fill="currentColor" />{professional.rating.toFixed(1)} · {professional.reviews} avaliações</span></span></Link><div className="security-note"><ShieldCheck size={18} /><span>Perfil e avaliações disponíveis para você conferir.</span></div></section>
          <section className="content-panel"><PageHeading title="Precisa combinar algo?" description="Converse diretamente com seu profissional." /><Link className="button secondary full" to={`/chat/${order.id}`}><MessageCircle size={17} />Abrir conversa</Link><Link className="text-action report-problem-link" to="/dispute">Relatar um problema</Link></section>
          {order.status === 'Concluído' && <section className="rate-callout"><Star size={21} /><div><strong>Como foi o serviço?</strong><span>Sua avaliação ajuda outras pessoas a escolher.</span></div>{order.rated ? <span className="rated-label">Avaliado</span> : <Link className="button primary small" to={`/rating/${order.id}`}>Avaliar</Link>}</section>}
        </aside>
      </div>
    </div>
  );
}
