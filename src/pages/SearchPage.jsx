import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeading, ProfessionalCard } from '../components/MarketplaceUI';
import { useAstraDesk } from '../context/AstraDeskContext';

export default function SearchPage() {
  const { services, professionals, categories } = useAstraDesk();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('query') || '');
  const [category, setCategory] = useState(params.get('category') || '');
  const [price, setPrice] = useState('any');
  const [minimumRating, setMinimumRating] = useState('any');
  const [sort, setSort] = useState('recommended');

  const filteredServices = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('pt-BR');
    const matched = services.filter((service) => {
      const professional = professionals.find((item) => item.id === service.professionalId);
      const searchable = `${service.name} ${service.description} ${service.category} ${professional?.name || ''} ${professional?.profession || ''}`.toLocaleLowerCase('pt-BR');
      const matchesQuery = !term || searchable.includes(term);
      const matchesCategory = !category || service.category === category;
      const matchesPrice = price === 'any' || (price === 'under-120' && service.price <= 120) || (price === '120-170' && service.price > 120 && service.price <= 170) || (price === 'over-170' && service.price > 170);
      const matchesRating = minimumRating === 'any' || (professional?.rating || 0) >= Number(minimumRating);
      return matchesQuery && matchesCategory && matchesPrice && matchesRating;
    });
    if (sort === 'price-low') return [...matched].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return [...matched].sort((a, b) => b.price - a.price);
    if (sort === 'rating') return [...matched].sort((a, b) => (professionals.find((pro) => pro.id === b.professionalId)?.rating || 0) - (professionals.find((pro) => pro.id === a.professionalId)?.rating || 0));
    return matched;
  }, [category, minimumRating, price, professionals, query, services, sort]);

  const updateCategory = (value) => {
    setCategory(value);
    const next = new URLSearchParams(params);
    value ? next.set('category', value) : next.delete('category');
    setParams(next, { replace: true });
  };

  return (
    <div className="page-stack">
      <PageHeading eyebrow="ENCONTRE QUEM RESOLVE" title="Encontre um serviço" description="Compare profissionais, veja avaliações e solicite no seu tempo." />
      <section className="search-panel">
        <label className="search-field"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: instalar luminária, limpeza..." aria-label="Pesquisar serviços" />{query && <button onClick={() => setQuery('')} aria-label="Limpar busca"><X size={16} /></button>}</label>
        <div className="filter-row">
          <label className="filter-select"><SlidersHorizontal size={15} /><select value={category} onChange={(event) => updateCategory(event.target.value)} aria-label="Filtrar por categoria"><option value="">Todas as categorias</option>{categories.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></label>
          <label className="filter-select"><select value={price} onChange={(event) => setPrice(event.target.value)} aria-label="Filtrar por preço"><option value="any">Qualquer preço</option><option value="under-120">Até R$ 120</option><option value="120-170">R$ 121 a R$ 170</option><option value="over-170">Acima de R$ 170</option></select></label>
          <label className="filter-select"><select value={minimumRating} onChange={(event) => setMinimumRating(event.target.value)} aria-label="Filtrar por avaliação mínima"><option value="any">Qualquer avaliação</option><option value="4">4 estrelas ou mais</option><option value="4.5">4,5 estrelas ou mais</option><option value="4.8">4,8 estrelas ou mais</option></select></label>
          <label className="filter-select sort-select"><span>Ordenar por</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Ordenar resultados"><option value="recommended">Recomendados</option><option value="rating">Melhor avaliação</option><option value="price-low">Menor preço</option><option value="price-high">Maior preço</option></select></label>
        </div>
        <div className="quick-categories"><button className={!category ? 'active' : ''} onClick={() => updateCategory('')}>Todos</button>{categories.map((item) => <button key={item.id} className={category === item.name ? 'active' : ''} onClick={() => updateCategory(category === item.name ? '' : item.name)}>{item.name}</button>)}</div>
      </section>

      <div className="results-heading"><div><strong>{filteredServices.length} {filteredServices.length === 1 ? 'serviço encontrado' : 'serviços encontrados'}</strong><span>{category || 'Todas as categorias'}{query ? ` · “${query}”` : ''}</span></div><span className="results-note">Valores estimados, confirmados antes do atendimento</span></div>
      {filteredServices.length ? <div className="recommendation-grid search-results">
        {filteredServices.map((service) => {
          const professional = professionals.find((item) => item.id === service.professionalId);
          return professional && <ProfessionalCard key={service.id} professional={professional} service={service} />;
        })}
      </div> : <div className="empty-panel"><Search size={22} /><div><strong>Nenhum serviço encontrado</strong><span>Tente outra palavra ou remova algum filtro.</span></div><button className="button secondary small" onClick={() => { setQuery(''); setPrice('any'); setMinimumRating('any'); updateCategory(''); }}>Limpar filtros</button></div>}
    </div>
  );
}
