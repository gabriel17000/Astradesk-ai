export interface DocumentItem { id: number; filename: string; file_type: string; file_size: number; created_at: string }
export interface Source { document_id: number; filename: string; excerpt: string }
export interface ChatReply { answer: string; source: Source | null; mode: 'ai' | 'demo'; question_id: number }
export interface QuestionItem { id: number; question: string; answer: string; created_at: string }
export interface ChatMessage { role: 'user' | 'assistant'; content: string; source?: Source | null; mode?: 'ai' | 'demo' }
