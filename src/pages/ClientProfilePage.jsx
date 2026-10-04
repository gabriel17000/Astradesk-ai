import { Check, MapPin, Pencil, ShieldCheck, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeading } from '../components/MarketplaceUI';
import { useAstraDesk } from '../context/AstraDeskContext';

export default function ClientProfilePage() {
  const { client, orders, reviews, updateClient, showToast } = useAstraDesk();
  const [form, setForm] = useState(client);
  const [editing, setEditing] = useState(false);
  useEffect(() => setForm(client), [client]);
  const completed = orders.filter((order) => order.status === 'Concluído').length;
  const clientOrderIds = new Set(orders.map((order) => order.id));
  const givenReviews = reviews.filter((review) => clientOrderIds.has(review.orderId)).length;
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const save = (event) => {
    event.preventDefault();
    updateClient(form);
    setEditing(false);
    showToast('Perfil atualizado nesta demonstração.');
  };

  return (
    <div className="page-stack">
      <PageHeading eyebrow="SUA CONTA" title="Meu perfil" description="Confira seus dados e acompanhe seu histórico no AstraDesk." action={!editing && <button className="button secondary" onClick={() => setEditing(true)}><Pencil size={16} />Editar perfil</button>} />
      <div className="profile-content-grid">
        <section className="content-panel">
          <div className="client-profile-heading"><span className="user-avatar profile-avatar-fallback">{client.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><div><h2>{client.name}</h2><span><MapPin size={14} />{client.location}</span></div><span className="verified-badge"><ShieldCheck size={14} /> Conta demonstrativa</span></div>
          {editing ? <form className="profile-form" onSubmit={save}>
            <label className="form-field"><span>Nome</span><input required value={form.name} onChange={update('name')} /></label>
            <div className="form-two-col"><label className="form-field"><span>E-mail</span><input required type="email" value={form.email} onChange={update('email')} /></label><label className="form-field"><span>Telefone</span><input required value={form.phone} onChange={update('phone')} /></label></div>
            <label className="form-field"><span>Localização</span><input required value={form.location} onChange={update('location')} /></label>
            <label className="form-field"><span>Endereço preferido</span><input required value={form.address} onChange={update('address')} /></label>
            <div className="button-row"><button className="button secondary" type="button" onClick={() => { setForm(client); setEditing(false); }}>Cancelar</button><button className="button primary" type="submit"><Check size={16} />Salvar alterações</button></div>
          </form> : <dl className="detail-list profile-details"><div><dt><UserRound size={15} />Nome</dt><dd>{client.name}</dd></div><div><dt>E-mail</dt><dd>{client.email}</dd></div><div><dt>Telefone</dt><dd>{client.phone}</dd></div><div><dt>Localização</dt><dd>{client.location}</dd></div><div><dt>Endereço preferido</dt><dd>{client.address}</dd></div></dl>}
        </section>
        <aside className="page-stack">
          <section className="content-panel"><PageHeading title="Seu histórico" /><div className="profile-stats"><div><strong>{completed}</strong><span>serviços concluídos</span></div><div><strong>{givenReviews}</strong><span>avaliações enviadas</span></div></div><Link className="text-action profile-history-link" to="/services">Ver todos os serviços →</Link></section>
          <section className="content-panel"><span className="trust-icon"><ShieldCheck size={21} /></span><h3>Contrate com confiança</h3><p className="muted-copy">Confira avaliações, alinhe detalhes com o profissional e acompanhe cada solicitação pelo aplicativo.</p><Link className="text-action" to="/safety">Ver dicas de segurança →</Link></section>
        </aside>
      </div>
    </div>
  );
}
