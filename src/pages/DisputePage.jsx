import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeading } from '../components/MarketplaceUI';
import { useAstraDesk } from '../context/AstraDeskContext';

export default function DisputePage() {
  const { showToast } = useAstraDesk();
  const [description, setDescription] = useState('');
  const [sent, setSent] = useState(false);
  return <div className="page-stack narrow-page">
    <Link className="back-link" to="/safety"><ArrowLeft size={16} /> Segurança e confiança</Link>
    <PageHeading eyebrow="AJUDA COM UM SERVIÇO" title="Relatar um problema" description="Conte o que aconteceu. Nesta demonstração, seu relato fica apenas na tela." />
    {sent ? <div className="content-panel rating-success"><span><CheckCircle2 size={25} /></span><h2>Relato registrado</h2><p>Obrigado por compartilhar. No produto real, nossa equipe entraria em contato para entender melhor.</p><Link className="button primary" to="/services">Voltar aos serviços</Link></div> : <form className="content-panel request-form" onSubmit={(event) => { event.preventDefault(); setSent(true); showToast('Relato registrado nesta demonstração.'); }}>
      <div className="safety-banner"><span><ShieldAlert size={23} /></span><div><strong>Precisamos de um pouco de contexto</strong><p>Evite compartilhar dados sensíveis. Descreva o problema relacionado ao serviço.</p></div></div>
      <label className="form-field"><span>O que aconteceu? <b>*</b></span><textarea required minLength={8} maxLength={500} rows={5} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Descreva a situação..." /></label>
      <button className="button primary full" type="submit">Enviar relato</button>
    </form>}
  </div>;
}
