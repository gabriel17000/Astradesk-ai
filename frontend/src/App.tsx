import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Activity, ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, CircleHelp, Command, FileText, Files, Headphones, LayoutDashboard, LoaderCircle, MessageCircle, MoreHorizontal, Plus, Search, Send, Settings, ShieldCheck, Sparkles, Upload, X, Zap } from 'lucide-react';
import { api } from './services/api';
import type { ChatMessage, DocumentItem, QuestionItem } from './types';

type Page = 'overview' | 'documents' | 'assistant';
const suggestions = ['Qual é a política de reembolso?', 'Resuma os pontos principais', 'Quais são as datas importantes?'];
const formatSize = (size: number) => size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`;
const relativeDate = (date: string) => { const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000); return days < 1 ? 'Hoje' : days === 1 ? 'Ontem' : `Há ${days} dias`; };

export default function App() {
  const [page, setPage] = useState<Page>('overview');
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [documentSearch, setDocumentSearch] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const loadData = async () => { try { const [docs, qs] = await Promise.all([api.documents(), api.questions()]); setDocuments(docs); setQuestions(qs); setError(''); } catch (e) { setError(e instanceof Error ? e.message : 'Não foi possível conectar à API.'); } };
  useEffect(() => { void loadData(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const upload = async (file?: File) => {
    if (!file) return;
    if (!['text/plain', 'text/markdown', ''].includes(file.type) && !/\.(txt|md)$/i.test(file.name)) { setError('Envie um arquivo .txt ou .md.'); return; }
    setUploading(true); setError('');
    try { const doc = await api.upload(file); setDocuments(current => [doc, ...current]); setNotice(`${doc.filename} foi adicionado à biblioteca.`); setTimeout(() => setNotice(''), 3500); }
    catch (e) { setError(e instanceof Error ? e.message : 'Falha ao enviar documento.'); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ''; }
  };
  const remove = async (doc: DocumentItem) => {
    try { await api.remove(doc.id); setDocuments(current => current.filter(item => item.id !== doc.id)); setNotice('Documento removido.'); setTimeout(() => setNotice(''), 3000); }
    catch (e) { setError(e instanceof Error ? e.message : 'Falha ao excluir documento.'); }
  };
  const ask = async (text = input) => {
    const question = text.trim(); if (!question || loading) return;
    setInput(''); setError(''); setMessages(current => [...current, { role: 'user', content: question }]); setLoading(true);
    try { const reply = await api.chat(question); setMessages(current => [...current, { role: 'assistant', content: reply.answer, source: reply.source, mode: reply.mode }]); setQuestions(await api.questions()); }
    catch (e) { setMessages(current => [...current, { role: 'assistant', content: e instanceof Error ? e.message : 'Não consegui responder agora.' }]); }
    finally { setLoading(false); }
  };
  const onSubmit = (event: FormEvent) => { event.preventDefault(); void ask(); };

  return <div className="app-shell">
    <aside className="sidebar">
      <button className="brand" onClick={() => setPage('overview')}><span className="brand-mark"><Sparkles size={19}/></span><span>AstraDesk<span className="brand-ai"> AI</span></span></button>
      <div className="workspace-picker"><div className="workspace-avatar">A</div><div className="workspace-text"><strong>Meu espaço</strong><span>Plano pessoal</span></div><ChevronDown size={15}/></div>
      <div className="nav-label">ESPAÇO DE TRABALHO</div>
      <nav className="main-nav">
        <button className={page === 'overview' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('overview')}><LayoutDashboard size={17}/> Visão geral</button>
        <button className={page === 'documents' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('documents')}><Files size={17}/> Documentos <span className="nav-count">{documents.length}</span></button>
        <button className={page === 'assistant' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('assistant')}><MessageCircle size={17}/> Assistente</button>
      </nav>
      <div className="sidebar-library"><div className="library-head"><span>RECENTES</span><button title="Adicionar documento" onClick={() => fileRef.current?.click()}><Plus size={15}/></button></div>
        {documents.slice(0, 4).map(doc => <button className="recent-doc" key={doc.id} onClick={() => setPage('documents')}><span className="mini-file"><FileText size={14}/></span><span className="recent-name">{doc.filename}</span></button>)}
        {!documents.length && <p className="recent-empty">Seus documentos aparecem aqui.</p>}
      </div>
      <div className="sidebar-bottom"><div className="usage-card"><div className="usage-icon"><Zap size={15}/></div><strong>Seu espaço está pronto</strong><p>Adicione documentos e descubra novas respostas.</p><button onClick={() => fileRef.current?.click()}>Adicionar arquivo <ArrowRight size={13}/></button></div><button className="nav-item muted"><Settings size={17}/> Configurações</button><button className="profile-row"><div className="profile-avatar">GV</div><div className="profile-copy"><strong>Gabriel Victor</strong><span>Workspace pessoal</span></div><MoreHorizontal size={17}/></button></div>
    </aside>

    <main className="main-area"><header className="topbar"><div className="breadcrumbs"><span>Meu espaço</span><span className="crumb-slash">/</span><strong>{page === 'overview' ? 'Visão geral' : page === 'documents' ? 'Documentos' : 'Assistente'}</strong></div><div className="topbar-actions"><span className="status-pill"><span/> Todos os sistemas operacionais</span><button className="icon-button" title="Ajuda"><CircleHelp size={18}/></button><div className="top-avatar">GV</div></div></header>
      <div className="content-wrap">
        {error && <div className="alert error-alert"><CircleHelp size={17}/><span>{error}</span><button onClick={() => setError('')}><X size={16}/></button></div>}
        {notice && <div className="alert success-alert"><Check size={17}/>{notice}<button onClick={() => setNotice('')}><X size={16}/></button></div>}
        {page === 'overview' && <>
          <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-line"/> {new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }).format(new Date()).toLocaleUpperCase('pt-BR')}</div><h1>Seu conhecimento,<br/><span>em um só lugar.</span></h1><p>Olá, Gabriel. O que vamos descobrir hoje?</p></div><button className="primary-button" onClick={() => fileRef.current?.click()}><Plus size={17}/> Adicionar documento</button></section>
          <section className="stats-grid"><StatCard icon={<Files size={17}/>} label="Documentos" value={documents.length.toString().padStart(2, '0')} note="Na sua biblioteca" color="purple"/><StatCard icon={<MessageCircle size={17}/>} label="Perguntas feitas" value={questions.length.toString().padStart(2, '0')} note="Consultas realizadas" color="blue"/><StatCard icon={<Activity size={17}/>} label="Conhecimento" value={documents.length ? 'Ativo' : 'Aguardando'} note={documents.length ? 'Pronto para explorar' : 'Adicione seu primeiro arquivo'} color="green"/></section>
          <section className="dashboard-grid"><div className="assistant-card"><div className="assistant-top"><div className="ai-orb"><Sparkles size={21}/></div><div><span className="card-kicker">ASTRADESK ASSISTANT</span><h2>Uma pergunta muda tudo.</h2></div><span className="online-dot"/></div><p className="assistant-description">Converse com seus documentos. Encontre respostas claras, com fontes que você pode conferir.</p><button className="assistant-cta" onClick={() => setPage('assistant')}>Abrir assistente <ArrowUpRight size={16}/></button><div className="orb-decoration orb-one"/><div className="orb-decoration orb-two"/></div>
          <div className="recent-card"><div className="section-heading"><div><span className="card-kicker">SUA BIBLIOTECA</span><h2>Documentos recentes</h2></div><button className="text-link" onClick={() => setPage('documents')}>Ver todos <ArrowRight size={14}/></button></div>{documents.length ? <div className="document-list">{documents.slice(0, 4).map(doc => <DocumentRow key={doc.id} doc={doc}/>)}</div> : <div className="empty-docs"><div className="empty-icon"><BookOpen size={21}/></div><strong>Sua biblioteca começa aqui</strong><span>Envie seu primeiro documento para conversar com ele.</span><button className="outline-button" onClick={() => fileRef.current?.click()}><Upload size={15}/> Enviar documento</button></div>}</div></section>
          <section className="activity-card"><div className="section-heading"><div><span className="card-kicker">ACOMPANHAMENTO</span><h2>Atividade recente</h2></div><button className="subtle-select">Últimos 7 dias <ChevronDown size={14}/></button></div>{questions.length ? <div className="activity-list">{questions.slice(0, 3).map(q => <div className="activity-row" key={q.id}><span className="activity-icon"><MessageCircle size={15}/></span><div><strong>{q.question}</strong><span>Consulta ao assistente · {relativeDate(q.created_at)}</span></div><ArrowUpRight size={15}/></div>)}</div> : <div className="activity-empty"><div className="activity-empty-icon"><Activity size={19}/></div><span>Suas perguntas e descobertas aparecerão aqui.</span><button onClick={() => setPage('assistant')}>Faça sua primeira pergunta <ArrowRight size={14}/></button></div>}</section>
        </>}
        {page === 'documents' && <section className="page-section"><div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> SUA BASE DE CONHECIMENTO</div><h1>Documentos</h1><p>Seus arquivos, organizados e prontos para responder.</p></div><button className="primary-button" onClick={() => fileRef.current?.click()} disabled={uploading}>{uploading ? <LoaderCircle className="spin" size={16}/> : <Plus size={17}/>} Adicionar documento</button></div><div className="library-panel"><div className="library-toolbar"><div className="search-box"><Search size={16}/><input placeholder="Buscar documentos" value={documentSearch} onChange={e => setDocumentSearch(e.target.value)}/></div><span>{documents.length} {documents.length === 1 ? 'documento' : 'documentos'}</span></div>{documents.length ? <div className="table-wrap"><table><thead><tr><th>NOME</th><th>TIPO</th><th>TAMANHO</th><th>ADICIONADO</th><th/></tr></thead><tbody>{documents.filter(doc => doc.filename.toLowerCase().includes(documentSearch.toLowerCase())).map(doc => <tr key={doc.id}><td><DocumentRow doc={doc}/></td><td><span className="file-tag">{doc.file_type.toUpperCase()}</span></td><td>{formatSize(doc.file_size)}</td><td>{relativeDate(doc.created_at)}</td><td><button className="delete-button" title={`Excluir ${doc.filename}`} onClick={() => void remove(doc)}><X size={16}/></button></td></tr>)}</tbody></table>{!documents.some(doc => doc.filename.toLowerCase().includes(documentSearch.toLowerCase())) && <div className="activity-empty"><Search size={16}/><span>Nenhum documento corresponde à busca.</span></div>}</div> : <div className="large-empty"><div className="empty-icon"><Files size={23}/></div><h3>Nenhum documento por aqui</h3><p>Adicione arquivos .txt ou .md para começar a explorar seu conhecimento.</p><button className="primary-button" onClick={() => fileRef.current?.click()}><Upload size={16}/> Enviar primeiro documento</button></div>}</div><div className="upload-hint"><ShieldCheck size={16}/> Seus documentos são privados e ficam armazenados localmente.</div></section>}
        {page === 'assistant' && <section className="chat-page"><div className="chat-heading"><div className="ai-orb small-orb"><Sparkles size={18}/></div><div><div className="eyebrow"><span className="eyebrow-line"/> SEU ESPAÇO DE CONHECIMENTO</div><h1>Assistente</h1></div><div className="chat-doc-count"><Files size={15}/>{documents.length} {documents.length === 1 ? 'documento' : 'documentos'} conectados</div></div><div className="chat-stage">{messages.length === 0 ? <div className="chat-welcome"><div className="welcome-spark"><Sparkles size={23}/></div><span className="card-kicker">ASTRADESK AI</span><h2>Curiosidade é o começo<br/>de toda descoberta.</h2><p>Pergunte qualquer coisa sobre seus documentos.<br/>Vou encontrar a resposta e mostrar de onde ela veio.</p>{documents.length ? <div className="suggestions"><span>EXPERIMENTE PERGUNTAR</span>{suggestions.map(s => <button key={s} onClick={() => void ask(s)}>{s}<ArrowUpRight size={14}/></button>)}</div> : <div className="chat-no-docs"><div className="empty-icon"><BookOpen size={20}/></div><strong>Nenhum documento conectado ainda</strong><span>Adicione um arquivo para começar a conversar.</span><button className="outline-button" onClick={() => fileRef.current?.click()}><Plus size={15}/> Adicionar documento</button></div>}</div> : <div className="messages">{messages.map((msg, i) => <div key={i} className={`message ${msg.role}`}><div className="message-avatar">{msg.role === 'assistant' ? <Sparkles size={14}/> : 'GV'}</div><div className="message-body"><div className="message-label">{msg.role === 'assistant' ? 'ASTRADESK' : 'VOCÊ'}{msg.mode === 'demo' && <span className="demo-tag">MODO DEMO</span>}</div><p>{msg.content}</p>{msg.source && <div className="source-card"><div className="source-icon"><FileText size={15}/></div><div><span>FONTE DO DOCUMENTO</span><strong>{msg.source.filename}</strong><p>{msg.source.excerpt}</p></div><Check size={15}/></div>}</div></div>)}{loading && <div className="message assistant"><div className="message-avatar"><Sparkles size={14}/></div><div className="message-body"><div className="message-label">ASTRADESK</div><div className="typing"><i/><i/><i/></div></div></div>}<div ref={bottomRef}/></div>}</div><form className="chat-composer" onSubmit={onSubmit}><textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void ask(); } }} placeholder={documents.length ? 'Pergunte algo sobre seus documentos...' : 'Adicione um documento para começar...'} disabled={!documents.length || loading} rows={2}/><div className="composer-footer"><span><Sparkles size={13}/> Respostas baseadas nos seus documentos</span><button className="send-button" type="submit" disabled={!input.trim() || !documents.length || loading}>{loading ? <LoaderCircle className="spin" size={17}/> : <Send size={16}/>}</button></div></form><div className="chat-footnote">O AstraDesk pode cometer erros. Confira sempre as fontes citadas.</div></section>}
      </div>
      <footer className="app-footer"><span>© 2026 AstraDesk AI</span><span><span className="footer-live"/> Seus documentos estão protegidos</span><button><Headphones size={14}/> Suporte</button></footer>
    </main>
    <input ref={fileRef} type="file" accept=".txt,.md,text/plain,text/markdown" hidden onChange={e => void upload(e.target.files?.[0])}/>
    <div className="mobile-nav"><button onClick={() => setPage('overview')} className={page === 'overview' ? 'selected' : ''}><LayoutDashboard size={18}/><span>Início</span></button><button onClick={() => setPage('documents')} className={page === 'documents' ? 'selected' : ''}><Files size={18}/><span>Arquivos</span></button><button onClick={() => setPage('assistant')} className={page === 'assistant' ? 'selected' : ''}><MessageCircle size={18}/><span>Assistente</span></button></div>
  </div>;
}

function StatCard({ icon, label, value, note, color }: { icon: ReactNode; label: string; value: string; note: string; color: string }) { return <div className="stat-card"><div className={`stat-icon ${color}`}>{icon}</div><span className="stat-label">{label}</span><div className="stat-value">{value}</div><div className="stat-note">{note}</div></div>; }
function DocumentRow({ doc }: { doc: DocumentItem }) { return <div className="document-row"><span className={`doc-icon ${doc.file_type}`}><FileText size={17}/></span><span className="doc-copy"><strong>{doc.filename}</strong><small>{doc.file_type.toUpperCase()} · {formatSize(doc.file_size)}</small></span></div>; }
