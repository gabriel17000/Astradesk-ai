/** Demo fallback only. Configure VITE_AI_API_URL to send assist requests to a real gateway. */
export async function suggestReply({ conversation, customer, articles = [] }) {
  const endpoint = import.meta.env.VITE_AI_API_URL;
  if (endpoint) {
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'suggest_reply', conversation, customer, knowledge: articles.filter((item) => item.published) }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.detail || 'O provedor de IA não respondeu.');
    return { mode: 'provider', answer: result.answer };
  }
  const latest = [...conversation.messages].reverse().find((item) => item.from === 'customer')?.text || '';
  const topic = conversation.subject.toLowerCase();
  const supported = articles.find((item) => item.published && `${item.title} ${item.content}`.toLowerCase().split(/\s+/).some((word) => word.length > 4 && latest.toLowerCase().includes(word)));
  return { mode: 'demo', answer: `Olá, ${customer.name.split(' ')[0]}! Obrigado por explicar sua dúvida sobre ${topic}. ${supported ? `Vou conferir as informações de ${supported.title} com cuidado ` : 'Vou confirmar os detalhes com a equipe '}e retorno com uma orientação precisa. Posso ajudar com mais algum detalhe enquanto isso?` };
}

export function transformDraft(action, conversation, customer) {
  const original = [...conversation.messages].reverse().find((item) => item.from === 'agent')?.text || `Olá, ${customer.name.split(' ')[0]}! Obrigado por entrar em contato sobre ${conversation.subject.toLowerCase()}. Vou confirmar as informações e retorno com uma orientação precisa.`;
  if (action === 'Tornar mais amigável') return `Oi, ${customer.name.split(' ')[0]}! ${original.replace(/^olá,?\s*[^!.]*[!.]?\s*/i, '')} 😊`;
  if (action === 'Tornar mais profissional') return original.replace(/^oi,?/i, 'Olá,').replace(/😊|🙂/g, '').trim();
  return `${original.trim()} Se precisar, posso esclarecer qualquer outro ponto.`;
}
