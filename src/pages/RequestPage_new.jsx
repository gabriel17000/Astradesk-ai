import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageHeading, formatCurrency, navigateBack } from '../components/MarketplaceUI';
import { useAstraDesk } from '../context/AstraDeskContext';
import { getAvailableSlots } from '../data/mockData';

export default function RequestPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { services, professionals, client, createOrder } = useAstraDesk();
  const service = services.find((item) => item.id === params.get('serviceId'));
  const professional = professionals.find((item) => item.id === service?.professionalId);
  const availableSlots = getAvailableSlots(professional?.id);
  const [reviewing, setReviewing] = useState(false);
  const [form, setForm] = useState({
    description: '',
    address: client.address,
    date: availableSlots[0]?.date || '',
    time: availableSlots[0]?.times[0] || '',
    notes: '',
  });
  const [error, setError] = useState('');
  const selectedSlot = availableSlots.find((slot) => slot.date === form.date);
  useEffect(() => {
    const firstSlot = getAvailableSlots(professional?.id)[0];
    setReviewing(false);
    setError('');
    setForm((current) => ({ ...current, date: firstSlot?.date || '', time: firstSlot?.times[0] || '' }));
  }, [professional?.id]);
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  if (!service || !professional) return <div className="empty-panel"><div><strong>Escolha um serviço para solicitar</strong><span>Encontre uma opção disponível e confira os detalhes antes de enviar seu pedido.</span></div><button className="button primary small" onClick={() => navigate('/search')}>Encontrar serviço</button></div>;

  const continueToReview = (event) => {
    event.preventDefault();
    if (!selectedSlot || !selectedSlot.times.includes(form.time)) {
      setError('Escolha uma das datas e horários disponíveis.');
      return;
    }
    setError('');
    setReviewing(true);
  };

  const confirmRequest = () => {
    if (!selectedSlot || !selectedSlot.times.includes(form.time)) {
      setError('Esse horário não está mais disponível. Escolha outro horário.');
      setReviewing(false);
      return;
    }
    const date = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long' }).format(new Date(`${form.date}T12:00:00`));
    const order = createOrder({ serviceId: service.id, description: form.description, address: form.address, date, time: form.time, notes: form.notes });
    navigate(`/services/${order.id}`);
  };

  const updateDate = (event) => {
    const slot = availableSlots.find((item) => item.date === event.target.value);
    setForm((current) => ({ ...current, date: event.target.value, time: slot?.times[0] || '' }));
  };

  return (
    <div className="page-stack narrow-page">
      <button className="back-link" onClick={() => navigateBack(navigate)}><ArrowLeft size={16} /> Voltar</button>
      <PageHeading eyebrow={reviewing ? 'REVISE SEU PEDIDO' : 'NOVO PEDIDO'} title={reviewing ? 'Revise sua solicitação' : 'Solicitar serviço'} description={reviewing ? 'Confira os detalhes antes de confirmar.' : 'Conte o que precisa. Você poderá acompanhar e conversar com o profissional por aqui.'} />
      <div className="content-panel request-service-summary"><div><span className="eyebrow">{service.category}</span><h2>{service.name}</h2><p>com {professional.name}</p></div><strong>{formatCurrency(service.price)}<small> estimado</small></strong></div>
      {reviewing ? <section className="content-panel request-review">
        <h2>Resumo do pedido</h2>
        <dl className="detail-list">
          <div><dt>Serviço</dt><dd>{service.name}</dd></div>
          <div><dt>Profissional</dt><dd>{professional.name}</dd></div>
          <div><dt>Data e horário</dt><dd>{selectedSlot?.label}, às {form.time}</dd></div>
          <div><dt>Endereço</dt><dd>{form.address}</dd></div>
          <div><dt>Descrição</dt><dd>{form.description}</dd></div>
          {form.notes && <div><dt>Observações</dt><dd>{form.notes}</dd></div>}
          <div><dt>Valor estimado</dt><dd>{formatCurrency(service.price)}</dd></div>
        </dl>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="button-row"><button className="button secondary" type="button" onClick={() => setReviewing(false)}>Editar informações</button><button className="button primary" type="button" onClick={confirmRequest}>Confirmar solicitação</button></div>
        <p className="demo-note">A solicitação é demonstrativa e não gera cobrança.</p>
      </section> : <form className="content-panel request-form" onSubmit={continueToReview}>
        <label className="form-field"><span>Descreva o que você precisa <b>*</b></span><textarea required minLength={8} maxLength={500} rows={4} value={form.description} onChange={update('description')} placeholder="Ex.: preciso instalar uma luminária pendente na sala. O ponto elétrico já está pronto." /></label>
        <label className="form-field"><span>Endereço do atendimento <b>*</b></span><span className="input-with-icon"><MapPin size={17} /><input required maxLength={160} value={form.address} onChange={update('address')} placeholder="Rua, número e bairro" /></span></label>
        <div className="form-two-col">
          <label className="form-field"><span>Data disponível <b>*</b></span><span className="input-with-icon"><CalendarDays size={17} /><select required value={form.date} onChange={updateDate}>{availableSlots.map((slot) => <option key={slot.date} value={slot.date}>{slot.label}</option>)}</select></span></label>
          <label className="form-field"><span>Horário disponível <b>*</b></span><span className="input-with-icon"><Clock3 size={17} /><select required value={form.time} onChange={update('time')}>{(selectedSlot?.times || []).map((time) => <option key={time} value={time}>{time}</option>)}</select></span></label>
        </div>
        <label className="form-field"><span>Observações <small>Opcional</small></span><textarea maxLength={300} rows={3} value={form.notes} onChange={update('notes')} placeholder="Referência para chegar, detalhes de acesso ou outras informações." /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-assurance"><CheckCircle2 size={18} /><span>Os horários disponíveis são os informados pelo profissional. Nenhum pagamento é realizado nesta demonstração.</span></div>
        <button className="button primary full large" type="submit">Revisar solicitação</button>
      </form>}
    </div>
  );
}
