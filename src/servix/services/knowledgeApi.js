const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

async function request(path, options) {
  const response = await fetch(`${API_BASE}${path}`, options);
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.detail || 'Não foi possível concluir esta operação.');
  return payload;
}

export const listKnowledgeDocuments = () => request('/documents');

export function uploadKnowledgeDocument(file) {
  const body = new FormData();
  body.append('file', file);
  return request('/documents', { method: 'POST', body });
}

export const queryKnowledge = (question) => request('/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question }),
});
