import { agents } from '../data';

export function Avatar({ person, size = '' }) { return <span className={`avatar avatar-${person.color || 'blue'} ${size}`}>{person.initials}</span>; }
export function Heading({ eyebrow, title, description, action }) { return <div className="content-heading"><div><div className="eyebrow-label">{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div>; }
export function Button({ children, onClick, secondary = false }) { return <button className={secondary ? 'secondary-button' : 'primary-button'} onClick={onClick}>{children}</button>; }
export function StatusPill({ status }) { const kind = status === 'Aberta' ? 'open' : status === 'Pendente' ? 'pending' : 'resolved'; return <span className={`status-pill ${kind}`}><i/>{status}</span>; }
export function Detail({ label, value, icon: Icon }) { return <div className="customer-detail-row"><Icon size={14}/><span>{label}</span><b title={value}>{value}</b></div>; }
export const initialsColor = (id) => ({ c1: 'violet', c2: 'blue', c3: 'amber', c4: 'green', c5: 'rose', c6: 'slate' }[id] || 'blue');
export const agentById = (id) => agents.find((item) => item.id === id) || agents[0];
export function formatSize(size = 0) { return size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`; }
export function formatDate(value) { if (!value) return 'Na biblioteca'; const date = new Date(value); return Number.isNaN(date.getTime()) ? 'Na biblioteca' : `Adicionado em ${new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(date)}`; }
