import { ArrowLeft, CheckCircle2, Star } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageHeading } from '../components/MarketplaceUI';
import { useAstraDesk } from '../context/AstraDeskContext';
import { getProfessional, getService } from '../data/mockData';

export default function RatingPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, submitReview } = useAstraDesk();
  const order = orders.find((item) => item.id === orderId);
  const service = getService(order?.serviceId);
  const professional = getProfessional(order?.professionalId);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!order || !service || !professional || order.status !== 'Concluído') return <div className="empty-panel"><div><strong>A avaliação fica disponível ao concluir o serviço</strong><span>Você poderá compartilhar sua experiência depois do atendimento.</span></div><Link className="button primary small" to="/services">Ver meus serviços</Link></div>;
  if (order.rated || submitted) return <div className="content-panel rating-success"><span><CheckCircle2 size={25} /></span><h2>Avaliação registrada</h2><p>Obrigado por contar como foi sua experiência com {professional.name}.</p><button className="button primary" onClick={() => navigate(`/services/${order.id}`)}>Voltar ao serviço</button></div>;

  return (
    <div className="page-stack narrow-page">
      <button className="back-link" onClick={() => navigate(`/services/${order.id}`)}><ArrowLeft size={16} /> Voltar ao serviço</button>
      <PageHeading eyebrow="SUA OPINIÃO AJUDA" title="Como foi o serviço?" description={`${service.name} com ${professional.name}`} />
      <form className="content-panel rating-form" onSubmit={(event) => { event.preventDefault(); if (submitReview(order.id, rating, comment)) setSubmitted(true); }}>
        <div className="star-picker" role="radiogroup" aria-label="Selecione sua avaliação">{[1, 2, 3, 4, 5].map((value) => <button key={value} className={value <= rating ? 'selected' : ''} type="button" role="radio" aria-checked={rating === value} aria-label={`${value} estrelas`} onClick={() => setRating(value)}><Star size={34} fill={value <= rating ? 'currentColor' : 'none'} /></button>)}</div>
        <strong className="rating-label">{rating} de 5 estrelas</strong>
        <label className="form-field"><span>Conte um pouco mais <small>Opcional</small></span><textarea rows={4} maxLength={400} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="O que você mais gostou no atendimento?" /></label>
        <button className="button primary full large" type="submit">Enviar avaliação</button>
      </form>
    </div>
  );
}
