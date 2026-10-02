# AstraDesk

Protótipo navegável de um marketplace de serviços residenciais. A demonstração usa dados fictícios e estado local no navegador; não possui backend, autenticação ou pagamentos reais.

## Executar

Requisitos: Node.js 18 ou superior.

```bash
npm install
npm run dev
```

Para validar a versão de produção localmente:

```bash
npm run build
npm run preview
```

## Fluxos da demonstração

- Buscar serviços por texto, categoria, faixa de preço e ordenação.
- Consultar profissionais, avaliações, disponibilidade e detalhes dos serviços.
- Enviar uma solicitação e acompanhar as etapas: solicitada, aceita, agendada, em andamento e concluída.
- Avançar manualmente as etapas para demonstrar as notificações.
- Conversar com o profissional e receber uma resposta automática simulada.
- Avaliar o serviço após a conclusão.
- Consultar e editar o perfil local de demonstração.

Os pedidos, mensagens, notificações, avaliações e dados de perfil são guardados no armazenamento local do navegador para que a demonstração sobreviva a uma atualização da página. Para recomeçar com os dados iniciais, remova a chave `astradesk-demo-v1` do armazenamento local do site.

## Estrutura

```text
src/
├── components/   # Shell e componentes compartilhados da interface
├── context/      # Estado local e ações mockadas do produto
├── data/         # Profissionais, serviços e pedidos fictícios
├── layouts/      # Layout principal da aplicação
└── pages/        # Dashboard, busca, serviço, pedidos, chat e perfil
```

## Escopo

O botão de avanço de status existe para facilitar a apresentação do protótipo. Selo de verificação, avaliações e notificações são ilustrativos; nenhum serviço, identidade ou pagamento é verificado ou processado de verdade.
