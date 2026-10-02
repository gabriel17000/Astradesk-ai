from openai import OpenAI

from app.config import settings


def answer_question(question: str, context: str) -> tuple[str, str]:
    """Use the configured provider, falling back to a clearly identified demo answer."""
    if settings.openai_api_key:
        try:
            client = OpenAI(api_key=settings.openai_api_key)
            result = client.chat.completions.create(
                model=settings.openai_model,
                temperature=0.2,
                messages=[
                    {"role": "system", "content": "Responda em português usando apenas o contexto fornecido. Se a resposta não estiver no contexto, diga isso claramente. Seja conciso."},
                    {"role": "user", "content": f"Contexto:\n{context}\n\nPergunta: {question}"},
                ],
            )
            return result.choices[0].message.content or "Não encontrei uma resposta no documento.", "ai"
        except Exception:
            # Provider outages should not expose secrets or take down the local demo.
            return _mock_answer(question, context), "demo"
    return _mock_answer(question, context), "demo"


def _mock_answer(question: str, context: str) -> str:
    if not context:
        return "Ainda não encontrei documentos com informações para responder. Adicione um documento e tente novamente."
    first_sentence = context.split(". ")[0].strip()
    return f"Encontrei esta informação nos seus documentos: {first_sentence.rstrip('.')}. (Modo demonstração — configure OPENAI_API_KEY para respostas geradas por IA.)"
