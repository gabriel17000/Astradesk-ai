import { ArrowLeft, CalendarDays, CheckCircle2, MapPin, ShieldCheck, Star } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageHeading, ProfessionalCard, formatCurrency, navigateBack } from '../components/MarketplaceUI';
import { useAstraDesk } from '../context/AstraDeskContext';
import { getAvailableSlots } from '../data/mockData';

export default function ProfessionalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { professionals, services, reviews } = useAstraDesk();
  const professional = professionals.find((item) => item.id === id);
  const offeredServices = services.filter((item) => item.professionalId === id);

  if (!professional) return <div className="empty-panel"><div><strong>Não encontramos esse profissional</strong><span>Volte à busca para conhecer outras opções.</span></div><button className="button primary small" onClick={() => navigate('/search')}>Voltar à busca</button></div>;

  const professionalReviews = reviews.filter((review) => !review.professionalId || review.professionalId === id).slice(0, 3);
  const availabilitySlots = getAvailableSlots(id);

  return (
    <div className="page-stack">
      <button className="back-link" onClick={() => navigateBack(navigate)}><ArrowLeft size={16} /> Voltar</button>
      <section className="profile-hero">
        <img className="profile-avatar" src={professional.avatar} alt="" />
        <div className="profile-main"><div className="eyebrow">{professional.category}</div><h1>{professional.name}</h1><p>{professional.profession}</p><div className="profile-meta"><span><Star size={16} fill="currentColor" /> <b>{professional.rating.toFixed(1)}</b> ({professional.reviews} avaliações)</span><span><MapPin size={15} />{professional.location}</span></div></div>
        {professional.verified && <span className="verified-badge large"><ShieldCheck size={15} /> Profissional verificado</span>}
      </section>
      <div className="profile-content-grid">
        <div className="page-stack">
          <section className="content-panel"><PageHeading title="Sobre o profissional" /><p className="body-copy">{professional.description}</p><div className="professional-facts"><span><CheckCircle2 size={17} />{professional.experience}</span><span><Star size={17} />{professional.reviews} avaliações</span></div><div className="specialties-section"><strong>Especialidades</strong><div className="specialty-list">{professional.specialties.map((specialty) => <span className="specialty-chip" key={specialty}>{specialty}</span>)}</div></div></section>
          <section className="content-panel"><PageHeading title="Disponibilidade" description="Horários demonstrativos disponíveis para solicitar." /><div className="availability-list">{availabilitySlots.map((slot) => <div className="availability-item" key={slot.date}><strong>{slot.label}</strong><span>{slot.times.join(' · ')}</span></div>)}</div></section>
          <section className="content-panel"><PageHeading title="Serviços oferecidos" description="Escolha o serviço para ver detalhes e solicitar." /><div className="service-option-list">{offeredServices.map((service) => <Link key={service.id} to={`/service/${service.id}`} className="service-option"><span><strong>{service.name}</strong><small>{service.duration} · valor estimado</small></span><b>{formatCurrency(service.price)}</b><span className="round-arrow">›</span></Link>)}</div></section>
          <section className="content-panel"><PageHeading title="O que os clientes dizem" /><div className="review-list">{professionalReviews.length ? professionalReviews.map((review) => <div className="review-item" key={review.id}><div className="review-heading"><strong>{review.author}</strong><span><Star size={14} fill="currentColor" /> {review.rating}.0</span></div><p>{review.text}</p><small>{review.date}</small></div>) : <p className="body-copy">As avaliações deste profissional aparecerão aqui.</p>}</div></section>
        </div>
        <aside className="profile-aside"><div className="content-panel"><span className="eyebrow">A PARTIR DE</span><div className="profile-price">{formatCurrency(professional.priceFrom)}<small> / serviço</small></div><p className="muted-copy">Preço final combinado com você antes do atendimento.</p><button className="button primary full" onClick={() => navigate(offeredServices[0] ? `/service/${offeredServices[0].id}` : '/search')}>Ver serviços disponíveis</button><div className="security-note"><ShieldCheck size={18} /><span>Confira os detalhes, combine o horário e acompanhe cada etapa pelo AstraDesk.</span></div></div></aside>
      </div>
      {offeredServices[0] && <div className="related-professional"><PageHeading title="Comece por um serviço" /><ProfessionalCard professional={professional} service={offeredServices[0]} compact /></div>}
    </div>
  );
}
