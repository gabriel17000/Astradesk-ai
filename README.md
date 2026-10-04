# AstraDesk

Este repositório contém duas aplicações independentes chamadas AstraDesk:

- **Marketplace de serviços** na raiz: protótipo frontend para encontrar profissionais, solicitar serviços e acompanhar atendimentos.
- **AstraDesk AI** em `frontend/` e `backend/`: aplicação full-stack para consultar documentos com respostas rastreáveis.

As aplicações têm dependências, comandos de execução e escopos separados.

## Marketplace AstraDesk

Protótipo navegável de um marketplace de serviços residenciais. Usa dados fictícios e estado local no navegador; não possui backend, autenticação ou pagamentos reais.

### Executar

Requisitos: Node.js 18 ou superior.

```bash
npm install
npm run dev
```

Para gerar e pré-visualizar a versão de produção:

```bash
npm run build
npm run preview
```

### Fluxos da demonstração

- Buscar serviços por texto, categoria, faixa de preço e avaliação mínima; ordenar resultados.
- Consultar profissionais, especialidades, disponibilidade, avaliações e serviços oferecidos.
- Escolher um horário disponível, revisar os dados e enviar uma solicitação.
- Acompanhar pedidos solicitados, aceitos, agendados, em andamento e concluídos.
- Conversar com o profissional e receber uma resposta automática simulada.
- Avaliar serviços concluídos e editar o perfil local do cliente.

Pedidos, mensagens, notificações, avaliações e perfil são guardados no `localStorage`. Para reiniciar a demonstração, remova a chave `astradesk-demo-v1` do armazenamento local do site.

O avanço de status e as respostas do chat são simulações para apresentação. Perfis, avaliações, disponibilidade e selos são dados ilustrativos; nenhum serviço, identidade ou pagamento é verificado ou processado de verdade.

### Estrutura do marketplace

```text
src/
├── components/   # Shell e componentes compartilhados da interface
├── context/      # Estado local e ações mockadas do produto
├── data/         # Profissionais, serviços e pedidos fictícios
├── layouts/      # Layout principal da aplicação
└── pages/        # Busca, profissionais, pedidos, chat e perfil
```

## AstraDesk AI

Aplicação full-stack para organizar arquivos de texto e fazer perguntas sobre seu conteúdo. As respostas informam as fontes utilizadas. A busca lexical usa SQLite e a geração de respostas com IA é opcional.

### Funcionalidades

- Dashboard com visão de documentos, perguntas e atividade recente.
- Upload e exclusão de arquivos `.txt` e `.md`, com limite padrão de 5 MB.
- Processamento de documentos em trechos com sobreposição para recuperar conteúdo relevante.
- Chat com histórico de sessão e referência ao documento-fonte.
- Modo demonstração sem chave de IA e histórico das últimas 50 perguntas em SQLite.
- Interface responsiva em português.

### Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS e Lucide |
| Backend | Python 3.12+, FastAPI, Pydantic, SQLAlchemy e Uvicorn |
| Dados | SQLite |
| IA opcional | API OpenAI via variável de ambiente |

### Executar localmente

Requisitos: Python 3.12 ou superior e Node.js 18 ou superior.

Backend, em um terminal:

```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env   # macOS/Linux: cp .env.example .env
uvicorn app.main:app --reload
```

A API estará em `http://localhost:8000` e a documentação interativa em `http://localhost:8000/docs`. Sem `OPENAI_API_KEY`, inicia em modo demonstração.

Frontend, em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173`. Por padrão, o cliente usa `http://localhost:8000/api`. Para alterar essa URL, crie `frontend/.env.local` com `VITE_API_URL=http://localhost:8000/api`.

Para executar os testes do backend, com o ambiente virtual ativo:

```bash
cd backend
pytest
```

### Variáveis de ambiente

Copie `backend/.env.example` para `backend/.env`. Arquivos de ambiente locais não são versionados.

| Variável | Padrão | Finalidade |
| --- | --- | --- |
| `DATABASE_URL` | `sqlite:///./astradesk.db` | URL de conexão do SQLAlchemy |
| `OPENAI_API_KEY` | vazio | Habilita respostas com IA; mantenha somente no ambiente local |
| `OPENAI_MODEL` | `gpt-4o-mini` | Modelo usado pelo serviço de IA |
| `MAX_UPLOAD_MB` | `5` | Tamanho máximo de upload |
| `CORS_ORIGINS` | `http://localhost:5173` | Origens permitidas, separadas por vírgula |

### Estrutura do AstraDesk AI

```text
backend/
├── app/
│   ├── models/       # Entidades e relacionamentos
│   ├── routers/      # Endpoints REST
│   ├── schemas/      # Contratos de API
│   ├── services/     # Documentos, recuperação e IA
│   ├── config.py
│   ├── database.py
│   └── main.py
├── tests/
└── requirements.txt
frontend/
├── src/
│   ├── services/     # Cliente HTTP
│   ├── types/        # Tipos da API
│   ├── App.tsx
│   └── styles.css
└── package.json
```

O frontend React consome a API REST do FastAPI. O backend valida uploads, fragmenta documentos, persiste dados no SQLite e recupera o trecho mais relevante. Se uma chave OpenAI for configurada no ambiente do backend, ela pode gerar respostas a partir do contexto recuperado.

## Licença

Distribuído sob a licença MIT. Consulte [LICENSE](LICENSE).
