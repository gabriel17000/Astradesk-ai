# AstraDesk AI

> Transforme documentos em respostas rastreáveis, de forma simples e local.

AstraDesk AI é uma aplicação full-stack para organizar arquivos de texto e fazer perguntas sobre seu conteúdo. Cada resposta informa a fonte utilizada, facilitando a verificação da informação. A V1 foi desenhada para ser objetiva, demonstrável e fácil de evoluir: usa busca lexical no SQLite e pode habilitar IA generativa de forma opcional.

## Funcionalidades principais

- Dashboard com visão de documentos, perguntas e atividade recente.
- Upload e exclusão de arquivos `.txt` e `.md`, com limite padrão de 5 MB.
- Processamento em trechos com sobreposição para recuperar conteúdo relevante.
- Chat com histórico de sessão e referência ao documento-fonte.
- Modo demonstração funcional sem chave de IA.
- Histórico das últimas 50 perguntas persistido no SQLite.
- Interface responsiva em português.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS e Lucide |
| Backend | Python 3.12+, FastAPI, Pydantic, SQLAlchemy e Uvicorn |
| Dados | SQLite |
| IA opcional | API OpenAI via variável de ambiente |

## Arquitetura

```text
React + TypeScript
        ↓ HTTP/JSON
FastAPI + Pydantic
        ↓
Serviços: documentos, recuperação lexical e IA opcional
        ↓                              ↓
SQLite                         Provedor de IA
```

O serviço de recuperação é independente, mantendo a V1 simples e criando um ponto claro para uma futura camada de embeddings e busca semântica.

## Como executar localmente

### Pré-requisitos

- Python 3.12 ou superior
- Node.js 18 ou superior

### Backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env   # macOS/Linux: cp .env.example .env
uvicorn app.main:app --reload
```

O backend estará em `http://localhost:8000` e a documentação interativa em `http://localhost:8000/docs`. Sem `OPENAI_API_KEY`, a aplicação inicia em modo demonstração.

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173`. Por padrão, o cliente usa `http://localhost:8000/api`. Para alterar essa URL, crie `frontend/.env.local` com `VITE_API_URL=http://localhost:8000/api`.

### Testes

Com o ambiente virtual do backend ativo:

```bash
cd backend
pytest
```

## Variáveis de ambiente

Copie `backend/.env.example` para `backend/.env`. Arquivos `.env` não são versionados.

| Variável | Padrão | Finalidade |
| --- | --- | --- |
| `DATABASE_URL` | `sqlite:///./astradesk.db` | URL de conexão do SQLAlchemy |
| `OPENAI_API_KEY` | vazio | Habilita respostas com IA; mantenha somente no ambiente local |
| `OPENAI_MODEL` | `gpt-4o-mini` | Modelo usado pelo serviço de IA |
| `MAX_UPLOAD_MB` | `5` | Tamanho máximo de upload |
| `CORS_ORIGINS` | `http://localhost:5173` | Origens permitidas, separadas por vírgula |

## Estrutura do projeto

```text
astradesk-ai/
├── backend/
│   ├── app/
│   │   ├── models/       # Entidades e relacionamentos
│   │   ├── routers/      # Endpoints REST
│   │   ├── schemas/      # Contratos de API
│   │   ├── services/     # Documentos, recuperação e IA
│   │   ├── config.py     # Configuração por ambiente
│   │   ├── database.py   # Conexão e sessão SQLAlchemy
│   │   └── main.py       # Aplicação FastAPI
│   ├── tests/            # Testes da API e processamento
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── services/     # Cliente HTTP
│   │   ├── types/        # Tipos TypeScript
│   │   ├── App.tsx       # Dashboard e assistente
│   │   └── styles.css    # Identidade visual e responsividade
│   └── package.json
└── README.md
```

## Frontend e backend

O frontend React consome a API REST do FastAPI. O backend valida uploads, fragmenta os documentos, persiste dados no SQLite e recupera o trecho mais relevante para cada pergunta. Quando uma chave OpenAI é configurada exclusivamente no ambiente do backend, ela pode gerar respostas a partir do contexto recuperado.

## Próximos passos

- Adicionar suporte a PDF e extração de texto.
- Implementar embeddings e busca semântica.
- Incluir autenticação e isolamento de documentos por usuário.
- Migrar para PostgreSQL e adicionar migrações com Alembic.
- Criar configuração Docker e pipeline de CI.
- Preparar o deploy após a publicação no GitHub.

## Licença

Distribuído sob a licença MIT. Consulte [LICENSE](LICENSE) para mais informações.
