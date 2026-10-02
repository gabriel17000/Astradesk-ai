import { ArrowLeft, MessageCircle, Send, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageHeading, StatusBadge } from '../components/MarketplaceUI';
import { useAstraDesk } from '../context/AstraDeskContext';
import { getProfessional, getService } from '../data/mockData';

export default function ChatPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, messagesByOrder, sendMessage } = useAstraDesk();
  const availableOrders = orders;
  const selectedOrder = orderId ? availableOrders.find((order) => order.id === orderId) : availableOrders[0];
  const messages = selectedOrder ? messagesByOrder[selectedOrder.id] || [] : [];
  const professional = selectedOrder && getProfessional(selectedOrder.professionalId);
  const service = selectedOrder && getService(selectedOrder.serviceId);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!orderId && selectedOrder) navigate(`/chat/${selectedOrder.id}`, { replace: true });
  }, [navigate, orderId, selectedOrder]);

  const submit = (event) => {
    event.preventDefault();
    if (!selectedOrder || !text.trim()) return;
    sendMessage(selectedOrder.id, text);
    setText('');
  };

  if (!selectedOrder || !professional || !service) return <div className="page-stack"><PageHeading title="Mensagens" description="Converse com seus profissionais sobre os serviços solicitados." /><div className="empty-panel"><MessageCircle size={22} /><div><strong>{orderId ? 'Conversa não encontrada' : 'Nenhuma conversa por enquanto'}</strong><span>{orderId ? 'Este pedido não está disponível. Confira seus serviços para abrir outra conversa.' : 'Depois de solicitar um serviço, você poderá alinhar os detalhes por aqui.'}</span></div><Link className="button primary small" to={orderId ? '/services' : '/search'}>{orderId ? 'Ver meus serviços' : 'Encontrar serviço'}</Link></div></div>;

  return (
    <div className="page-stack">
      <button className="back-link" onClick={() => navigate('/services')}><ArrowLeft size={16} /> Meus serviços</button>
      <PageHeading eyebrow="CONVERSA DO SERVIÇO" title="Mensagens" description={service.name} />
      <div className="chat-layout">
        <aside className="content-panel chat-list"><h2>Conversas</h2>{availableOrders.map((order) => { const pro = getProfessional(order.professionalId); const item = getService(order.serviceId); return <Link key={order.id} to={`/chat/${order.id}`} className={`chat-list-item${order.id === selectedOrder.id ? ' active' : ''}`}><img className="professional-avatar" src={pro?.avatar} alt="" /><span><strong>{pro?.name}</strong><small>{item?.name}</small></span></Link>; })}</aside>
        <section className="content-panel chat-panel">
          <header className="chat-header"><img className="professional-avatar" src={professional.avatar} alt="" /><div><strong>{professional.name}</strong><span>{service.name} · <StatusBadge status={selectedOrder.status} /></span></div><Link className="text-action" to={`/services/${selectedOrder.id}`}>Ver pedido</Link></header>
          <div className="chat-safety"><ShieldCheck size={15} /> Mantenha os combinados registrados nesta conversa.</div>
          <div className="chat-messages" aria-live="polite">{messages.map((message) => <div key={message.id} className={`message-row ${message.author === 'client' ? 'mine' : ''}`}><div className="message-bubble"><p>{message.text}</p><small>{message.time}</small></div></div>)}<div className="chat-demo-hint">A resposta do profissional é simulada para esta demonstração.</div></div>
          <form className="chat-form" onSubmit={submit}><input value={text} onChange={(event) => setText(event.target.value)} placeholder="Escreva uma mensagem..." aria-label="Mensagem" maxLength={500} /><button className="button primary" type="submit" disabled={!text.trim()}><Send size={16} /><span>Enviar</span></button></form>
        </section>
      </div>
    </div>
  );
}
