import { ArrowLeft, CalendarClock, CheckCircle2, Clock3, MapPin, ShieldCheck, Star } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageHeading, formatCurrency, navigateBack } from '../components/MarketplaceUI';
import { useAstraDesk } from '../context/AstraDeskContext';
import { getAvailableSlots } from '../data/mockData';

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { services, professionals } = useAstraDesk();
  const service = services.find((item) => item.id === serviceId);
  const professional = professionals.find((item) => item.id === service?.professionalId);
  const nextAvailability = getAvailableSlots(professional?.id)[0];

  if (!service || !professional) return <div className="empty-panel"><div><strong>Este serviço não está disponível</strong><span>Volte à busca para encontrar outra opção.</span></div><button className="button primary small" onClick={() => navigate('/search')}>Ir para busca</button></div>;

  return (
    <div className="page-stack">
      <button className="back-link" onClick={() => navigateBack(navigate)}><ArrowLeft size={16} /> Voltar</button>
      <PageHeading eyebrow={service.category.toUpperCase()} title={service.name} description={service.description} />
      <div className="service-detail-grid">
        <div className="page-stack">
          <section className="content-panel">
            <PageHeading title="Quem vai atender" />
            <Link to={`/professional/${professional.id}`} className="provider-detail">
              <img className="professional-avatar large" src={professional.avatar} alt="" />
              <span className="provider-detail-copy"><strong>{professional.name} {professional.verified && <CheckCircle2 size={16} />}</strong><small>{professional.profession}</small><span><Star size={15} fill="currentColor" /> {professional.rating.toFixed(1)} · {professional.reviews} avaliações</span></span>
              <span className="card-link">Ver perfil ›</span>
            </Link>
            <div className="detail-facts"><span><MapPin size={16} />{professional.location}</span><span><CalendarClock size={16} />Disponível {nextAvailability?.label} às {nextAvailability?.times[0]}</span><span><Clock3 size={16} />{service.duration}</span></div>
          </section>
          <section className="content-panel"><PageHeading title="O que está incluído" /><p className="body-copy">{service.description} O profissional confirma com você os detalhes e qualquer material necessário antes do atendimento.</p><div className="included-list"><span><CheckCircle2 size={17} />Alinhamento do escopo antes de começar</span><span><CheckCircle2 size={17} />Confirmação de horário pelo aplicativo</span><span><CheckCircle2 size={17} />Acompanhamento e conversa em um só lugar</span></div></section>
          <section className="safety-callout"><ShieldCheck size={22} /><div><strong>Escolha com mais confiança</strong><p>Veja avaliações de clientes, confira o perfil e mantenha os combinados registrados na conversa.</p></div><Link to="/safety">Saiba mais</Link></section>
        </div>
        <aside className="content-panel service-price-panel"><span className="eyebrow">VALOR ESTIMADO</span><div className="service-price">{formatCurrency(service.price)}</div><p>O valor final é alinhado com o profissional antes do serviço. Nenhum pagamento será feito por este protótipo.</p><button className="button primary full large" onClick={() => navigate(`/request?serviceId=${service.id}`)}>Solicitar serviço</button><small><ShieldCheck size={14} /> Solicitação sem compromisso</small><Link className="text-action payment-info-link" to="/payment">Como funcionam os pagamentos?</Link></aside>
      </div>
    </div>
  );
}
