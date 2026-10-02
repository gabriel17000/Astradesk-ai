import { ArrowRight, CalendarDays, Clock3, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CategoryCard, OrderCard, PageHeading, ProfessionalCard } from '../components/MarketplaceUI';
import { useAstraDesk } from '../context/AstraDeskContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { client, categories, services, professionals, orders } = useAstraDesk();
  const activeOrders = orders.filter((order) => order.status !== 'Concluído').slice(0, 2);
  const recommendations = services.filter((service) => service.featured).slice(0, 3);

  return (
    <div className="page-stack">
      <section className="welcome-panel">
        <div className="welcome-copy">
          <span className="eyebrow"><Sparkles size={14} /> SEU DIA A DIA, MAIS SIMPLES</span>
          <h1>Olá, {client.name.split(' ')[0]}.<br /><span>O que você precisa resolver?</span></h1>
          <p>Encontre profissionais avaliados para cuidar da sua casa e da sua rotina.</p>
          <button className="button primary large" onClick={() => navigate('/search')}>Encontrar um serviço <ArrowRight size={17} /></button>
        </div>
        <div className="welcome-trust">
          <div className="trust-illustration"><ShieldCheck size={36} /></div>
          <strong>Contrate com tranquilidade</strong>
          <span>Perfis, avaliações e detalhes claros antes de solicitar.</span>
          <Link to="/safety">Como funciona a segurança <ArrowRight size={14} /></Link>
        </div>
      </section>

      <section>
        <PageHeading title="O que você procura?" description="Escolha uma categoria para encontrar o profissional certo." action={<Link className="text-action" to="/search">Ver todas <ArrowRight size={15} /></Link>} />
        <div className="category-grid">{categories.map((category) => <CategoryCard key={category.id} category={category} onClick={() => navigate(`/search?category=${encodeURIComponent(category.name)}`)} />)}</div>
      </section>

      <section>
        <PageHeading title="Seus serviços" description="Acompanhe pedidos e próximos atendimentos." action={<Link className="text-action" to="/services">Ver meus serviços <ArrowRight size={15} /></Link>} />
        {activeOrders.length ? <div className="order-list">{activeOrders.map((order) => <OrderCard key={order.id} order={order} />)}</div> : <div className="empty-panel"><CalendarDays size={21} /><div><strong>Nenhum serviço em andamento</strong><span>Quando solicitar um serviço, ele aparecerá aqui.</span></div><Link className="button secondary small" to="/search">Encontrar serviço</Link></div>}
      </section>

      <section>
        <PageHeading title="Recomendados para você" description="Profissionais bem avaliados perto de você." action={<Link className="text-action" to="/search">Explorar serviços <ArrowRight size={15} /></Link>} />
        <div className="recommendation-grid">
          {recommendations.map((service) => {
            const professional = professionals.find((item) => item.id === service.professionalId);
            return professional && <ProfessionalCard key={service.id} professional={professional} service={service} compact />;
          })}
        </div>
      </section>

      <section className="trust-strip"><span><ShieldCheck size={20} /></span><div><strong>Mais clareza em cada etapa</strong><p>Confira quem vai atender, alinhe os detalhes e acompanhe seu serviço pelo AstraDesk.</p></div><div className="trust-stat"><Star size={16} fill="currentColor" /><b>4,8/5</b><small>avaliação média</small></div><div className="trust-stat"><Clock3 size={16} /><b>Resposta rápida</b><small>fale pelo chat</small></div></section>
    </div>
  );
}
