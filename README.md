# Servix

Servix é uma plataforma de atendimento e relacionamento com clientes. Esta etapa evolui o frontend React existente para um painel SaaS com dashboard, caixa de entrada, clientes, base de conhecimento, equipe, métricas e configurações.

## Aplicação principal

A aplicação servida pela raiz do repositório usa React 18, Vite, JavaScript e Lucide. A interface e o design system ficam em `src/servix/`; o pacote da marca fornecido está em `public/brand/`.

```powershell
npm install
npm run dev
```

O Vite serve a aplicação em `http://localhost:5173`. Para compilar e pré-visualizar a versão de produção:

```powershell
npm run build
npm run preview
```

As conversas, clientes, usuários e indicadores do MVP usam dados demonstrativos em memória. As alterações nessas áreas não são persistidas após atualizar a página.

## API de conhecimento

`backend/` contém o backend FastAPI existente. Ele oferece upload e consulta de documentos `.txt` e `.md`, recuperação de trechos e respostas com citação da fonte. Sem `OPENAI_API_KEY`, a API sinaliza o modo de demonstração; com uma chave configurada no ambiente do backend, usa o provedor OpenAI.

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload
```

A API fica em `http://localhost:8000`; a documentação interativa em `/docs`. Configure `VITE_API_URL` no frontend apenas se o endereço padrão `http://localhost:8000/api` mudar. A rota de conhecimento integrada à aplicação principal requer a API em execução.

O backend ainda não oferece autenticação, CRM, gestão de usuários nem isolamento multiempresa. As tabelas atuais de documentos e perguntas não têm `organization_id`; não use esses dados como armazenamento de produção multi-tenant sem antes implementar autorização e isolamento por organização.

## Estrutura do repositório

```text
src/
├── servix/
│   ├── components/  # Componentes visuais compartilhados
│   ├── pages/       # Telas do MVP
│   ├── services/    # Cliente da API de conhecimento
│   ├── data.js      # Dados demonstrativos
│   ├── ServixApp.jsx
│   └── styles.css   # Tokens do tema, componentes e layouts responsivos
├── pages/           # Telas do marketplace anterior, preservadas para referência
└── context/         # Estado demonstrativo anterior
backend/             # FastAPI, SQLite, documentos e consultas
frontend/            # Protótipo TypeScript de conhecimento anterior, independente
public/brand/        # Guia rasterizado original e ícone derivado por recorte
```

O marketplace residencial e o protótipo TypeScript anteriores foram mantidos no repositório, mas não fazem parte da entrada da aplicação Servix. A stack não foi substituída nem foram adicionadas dependências ao `package.json` da raiz.

## Configuração do backend

Copie `backend/.env.example` para `backend/.env` e configure conforme necessário:

| Variável | Padrão | Uso |
| --- | --- | --- |
| `DATABASE_URL` | `sqlite:///./astradesk.db` | Banco SQLAlchemy local |
| `OPENAI_API_KEY` | vazio | Ativa respostas geradas por IA |
| `OPENAI_MODEL` | `gpt-4o-mini` | Modelo para respostas |
| `MAX_UPLOAD_MB` | `5` | Limite dos uploads |
| `CORS_ORIGINS` | `http://localhost:5173` | Origens permitidas |

Mantenha chaves de API somente no ambiente do backend; não as inclua no bundle do navegador.

## Licença

Distribuído sob a licença MIT. Consulte [LICENSE](LICENSE).
