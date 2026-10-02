import { Bell, CheckCheck, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeading } from '../components/MarketplaceUI';
import { useAstraDesk } from '../context/AstraDeskContext';

export default function NotificationsPage() {
  const { notifications, markNotificationsRead } = useAstraDesk();
  useEffect(() => { markNotificationsRead(); }, [markNotificationsRead]);

  return (
    <div className="page-stack narrow-page">
      <PageHeading eyebrow="NOVIDADES" title="Notificações" description="Acompanhe atualizações dos seus pedidos e conversas." action={<button className="text-action" onClick={markNotificationsRead}><CheckCheck size={16} /> Marcar como lidas</button>} />
      {notifications.length ? <div className="notification-list">{notifications.map((notification) => <Link to={notification.orderId ? `/services/${notification.orderId}` : '/services'} className={`notification-item${notification.read ? '' : ' unread'}`} key={notification.id}><span className="notification-icon">{notification.title.toLowerCase().includes('mensagem') ? <MessageCircle size={18} /> : <Bell size={18} />}</span><span className="notification-copy"><strong>{notification.title}</strong><span>{notification.description}</span><small>{notification.time}</small></span>{!notification.read && <i aria-label="Não lida" />}</Link>)}</div> : <div className="empty-panel"><Bell size={22} /><div><strong>Nenhuma notificação</strong><span>Quando houver novidades sobre seus serviços, avisaremos aqui.</span></div></div>}
    </div>
  );
}
