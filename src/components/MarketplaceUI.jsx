import {
  Bell, CalendarDays, Check, ChevronRight, Clock3, Droplets, Hammer, House, Home,
  Laptop, MapPin, MessageCircle, Paintbrush, Search, ShieldCheck, Sparkles, Star,
  UserRound, Wrench, Zap,
} from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAstraDesk } from '../context/AstraDeskContext';
import { getProfessional, getService } from '../data/mockData';

const iconMap = { Zap, Droplets, Sparkles, Wrench, Laptop, Hammer, Paintbrush, House };

export function navigateBack(navigate, fallback = '/search') {
  const historyIndex = window.history.state?.idx;
  if (Number.isInteger(historyIndex) && historyIndex > 0) {
    navigate(-1);
    return;
  }
  navigate(fallback, { replace: true });
}

export function AppShell({ children }) {
  const { client, unreadCount, toast } = useAstraDesk();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pageTitles = [
    ['/', 'Início'], ['/search', 'Encontrar serviços'], ['/services', 'Meus serviços'],
    ['/chat', 'Mensagens'], ['/notifications', 'Notificações'], ['/profile', 'Meu perfil'],
    ['/safety', 'Segurança e confiança'], ['/request', 'Solicitar serviço'],
    ['/professional', 'Profissional'], ['/service', 'Detalhe do serviço'],
    ['/rating', 'Avaliação'], ['/payment', 'Pagamentos'], ['/dispute', 'Ajuda'],
  ];
  const title = pageTitles.find(([path]) => pathname === path || (path !== '/' && pathname.startsWith(`${path}/`)))?.[1] || 'AstraDesk';
  const navItems = [
    { to: '/', label: 'Início', mobileLabel: 'Início', icon: Home, end: true },
    { to: '/search', label: 'Encontrar serviços', icon: Search },
    { to: '/services', label: 'Meus serviços', mobileLabel: 'Meus serviços', icon: CalendarDays },
    { to: '/chat', label: 'Mensagens', icon: MessageCircle },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand" aria-label="AstraDesk — início"><span className="brand-mark">A</span><span>astra<span>desk</span></span></Link>
        <nav className="main-nav" aria-label="Navegação principal">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} title={label} aria-label={label} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <Icon size={17} strokeWidth={1.8} /><span className="nav-desktop-label">{label}</span>{to === '/search' && <span className="nav-compact-label">Serviços</span>}
            </NavLink>
          ))}
        </nav>
        <div className="topbar-actions">
          <button className="icon-button notification-trigger" aria-label={unreadCount > 0 ? `Abrir notificações, ${unreadCount} não lidas` : 'Abrir notificações'} onClick={() => navigate('/notifications')}>
            <Bell size={19} />{unreadCount > 0 && <i />}
          </button>
          <button className="top-profile" onClick={() => navigate('/profile')} aria-label={`Abrir perfil de ${client.name}`}><span className="user-avatar small">{client.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><span>{client.name.split(' ')[0]}</span></button>
        </div>
      </header>
      <main className="main-area" aria-label={title}>
        <div className="page-content">{children}</div>
      </main>
      <nav className="mobile-nav" aria-label="Navegação principal">
        {navItems.map(({ to, label, mobileLabel, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}><Icon size={20} /><span>{mobileLabel || (to === '/search' ? 'Serviços' : label)}</span></NavLink>)}
        <NavLink to="/profile" className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}><UserRound size={20} /><span>Perfil</span></NavLink>
      </nav>
      {toast && <div className="toast"><Check size={17} />{toast}</div>}
    </div>
  );
}

export function PageHeading({ eyebrow, title, description, action }) {
  return <div className="page-heading"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div>;
}

export function CategoryCard({ category, selected = false, onClick }) {
  const Icon = iconMap[category.icon] || Wrench;
  return <button className={`category-card ${category.color}${selected ? ' selected' : ''}`} onClick={onClick}>
    <span className="category-icon"><Icon size={20} /></span><strong>{category.name}</strong><ChevronRight size={15} className="category-arrow" />
  </button>;
}

export function ProfessionalCard({ professional, service, compact = false }) {
  return <article className={`professional-card${compact ? ' compact' : ''}`}>
    <Link to={`/professional/${professional.id}`} className="professional-card-top" aria-label={`Ver perfil de ${professional.name}`}>
      <img className="professional-avatar" src={professional.avatar} alt="" loading="lazy" />
      <div className="professional-identity"><strong>{professional.name}</strong><span>{professional.profession}</span><small><MapPin size={13} />{professional.location}</small></div>
      {professional.verified && <span className="verified-badge"><ShieldCheck size={14} /> Verificado</span>}
    </Link>
    {service && <Link to={`/service/${service.id}`} className="card-service"><span>{service.category}</span><strong>{service.name}</strong><small>{service.duration} · a partir de <b>{formatCurrency(service.price)}</b></small></Link>}
    <div className="professional-card-footer"><span className="rating-inline"><Star size={15} fill="currentColor" />{professional.rating.toFixed(1)} <small>({professional.reviews} avaliações)</small></span><Link to={service ? `/service/${service.id}` : `/professional/${professional.id}`} className="card-link">{service ? 'Ver serviço' : 'Ver detalhes'} <ChevronRight size={15} /></Link></div>
  </article>;
}

export function OrderCard({ order, compact = false }) {
  const service = getService(order.serviceId);
  const professional = getProfessional(order.professionalId);
  if (!service || !professional) return null;
  return <Link to={`/services/${order.id}`} className={`order-card${compact ? ' compact' : ''}`}>
    <img className="professional-avatar" src={professional.avatar} alt="" loading="lazy" />
    <div className="order-card-copy"><strong>{service.name}</strong><span>{professional.name} · {order.date} às {order.time}</span><small>{order.address}</small></div>
    <div className="order-card-end"><StatusBadge status={order.status} />{order.status === 'Concluído' && !order.rated && <span className="rate-hint">Avaliar</span>}</div>
  </Link>;
}

export function StatusBadge({ status }) {
  const statusClass = status.toLowerCase().replaceAll(' ', '-');
  return <span className={`status-badge ${statusClass}`}><span />{status}</span>;
}

export function ServiceSummary({ service, professional }) {
  return <div className="service-summary">
    <div><span>{service.category}</span><h3>{service.name}</h3><p>{service.description}</p></div>
    <div className="summary-meta"><span><Clock3 size={15} />{service.duration}</span><span><Star size={15} fill="currentColor" />{professional.rating.toFixed(1)} ({professional.reviews})</span><strong>A partir de {formatCurrency(service.price)}</strong></div>
  </div>;
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
}
