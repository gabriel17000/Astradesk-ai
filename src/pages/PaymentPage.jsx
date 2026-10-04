import { ArrowLeft, Info, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeading } from '../components/MarketplaceUI';

export default function PaymentPage() {
  return <div className="page-stack narrow-page">
    <Link className="back-link" to="/"><ArrowLeft size={16} /> Voltar ao início</Link>
    <PageHeading eyebrow="INFORMAÇÃO" title="Pagamentos" description="Como esta etapa funciona na demonstração do AstraDesk." />
    <section className="payment-demo-panel"><span><Info size={22} /></span><div><strong>Nenhuma cobrança é realizada</strong><p>Este protótipo permite solicitar e acompanhar serviços, mas ainda não possui integração de pagamentos. Combine valores diretamente com o profissional antes do atendimento.</p></div></section>
    <section className="content-panel"><span className="trust-icon"><ShieldCheck size={21} /></span><h2>Antes de confirmar</h2><p className="body-copy">Confira o valor estimado e alinhe o escopo do serviço pelo chat. O profissional deve confirmar qualquer custo extra antes de iniciar o trabalho.</p><Link className="button secondary" to="/safety">Ver informações de segurança</Link></section>
  </div>;
}
