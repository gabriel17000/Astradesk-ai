import type { ChatReply, DocumentItem, QuestionItem } from '../types';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API}${path}`, init);
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail ?? 'Não foi possível concluir esta ação. Tente novamente.');
  }
  return response.status === 204 ? undefined as T : response.json();
}
export const api = {
  documents: () => request<DocumentItem[]>('/documents'),
  upload: (file: File) => { const body = new FormData(); body.append('file', file); return request<DocumentItem>('/documents', { method: 'POST', body }); },
  remove: (id: number) => request<void>(`/documents/${id}`, { method: 'DELETE' }),
  chat: (question: string) => request<ChatReply>('/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question }) }),
  questions: () => request<QuestionItem[]>('/questions'),
};
