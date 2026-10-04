import { BadgeCheck, ClipboardCheck, MessageCircle, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeading } from '../components/MarketplaceUI';

const tips = [
  ['Confira o perfil', 'Veja avaliações e o histórico antes de escolher. O selo identifica profissionais com perfil verificado nesta demonstração.'],
  ['Combine pelo chat', 'Alinhe escopo, endereço e horário pela conversa do serviço para manter tudo organizado.'],
  ['Revise antes de começar', 'Confirme com o profissional o que será feito e qualquer custo adicional antes do atendimento.'],
  ['Avalie ao finalizar', 'Sua avaliação ajuda outras pessoas a tomar uma decisão com mais informação.'],
];

export default function SafetyPage() {
  const icons = [BadgeCheck, MessageCircle, ClipboardCheck, Star];
  return (
    <div className="page-stack narrow-page">
      <PageHeading eyebrow="ASTRADESK COM VOCÊ" title="Segurança e confiança" description="Boas práticas para ter uma experiência mais tranquila ao contratar serviços." />
      <section className="safety-banner"><span><ShieldCheck size={27} /></span><div><strong>Informação clara em cada etapa</strong><p>Veja quem vai atender, os detalhes do serviço e o status da solicitação antes e durante o atendimento.</p></div></section>
      <div className="safety-tips">{tips.map(([title, description], index) => { const Icon = icons[index]; return <article className="safety-tip" key={title}><span className="tip-icon"><Icon size={19} /></span><div><strong>{title}</strong><p>{description}</p></div></article>; })}</div>
      <div className="demo-disclaimer"><strong>Sobre esta demonstração</strong><p>Os perfis, verificações, mensagens e atualizações são dados fictícios. Este protótipo não processa pagamentos nem executa verificações reais de identidade.</p></div>
      <Link className="button secondary full" to="/search">Explorar profissionais</Link>
    </div>
  );
}
