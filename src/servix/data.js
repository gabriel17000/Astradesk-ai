export const agents = [
  { id: 'camila', name: 'Camila Mendes', initials: 'CM', role: 'Gestor', color: 'violet' },
  { id: 'rafael', name: 'Rafael Costa', initials: 'RC', role: 'Atendente', color: 'blue' },
  { id: 'juliana', name: 'Juliana Alves', initials: 'JA', role: 'Atendente', color: 'amber' },
  { id: 'marcos', name: 'Marcos Lima', initials: 'ML', role: 'Administrador', color: 'green' },
];

export const initialCustomers = [
  { id: 'c1', name: 'Mariana Oliveira', initials: 'MO', email: 'mariana.oliveira@email.com', phone: '(11) 98452-7610', company: 'Oliveira Arquitetura', tags: ['Projeto residencial', 'VIP'], owner: 'camila', status: 'Ativo', lastContact: 'Hoje, 10:42', note: 'Prefere contato no período da manhã. Em andamento: orçamento de reforma comercial.' },
  { id: 'c2', name: 'Pedro Henrique Souza', initials: 'PS', email: 'pedro.souza@email.com', phone: '(11) 99281-4306', company: 'Horizonte Digital', tags: ['Novo cliente'], owner: 'rafael', status: 'Ativo', lastContact: 'Hoje, 09:18', note: 'Conheceu a empresa por indicação. Avaliando plano Equipe.' },
  { id: 'c3', name: 'Fernanda Lima', initials: 'FL', email: 'fernanda@limastudio.com.br', phone: '(21) 99112-0941', company: 'Lima Studio', tags: ['Renovação'], owner: 'juliana', status: 'Ativo', lastContact: 'Ontem, 16:35', note: 'Contrato renova no próximo mês. Acompanhar proposta de ampliação.' },
  { id: 'c4', name: 'Ricardo Almeida', initials: 'RA', email: 'ricardo.almeida@email.com', phone: '(31) 98873-5204', company: 'Autônomo', tags: ['Suporte'], owner: 'rafael', status: 'Ativo', lastContact: 'Ontem, 14:12', note: 'Já recebeu instruções de configuração por e-mail.' },
  { id: 'c5', name: 'Beatriz Santos', initials: 'BS', email: 'beatriz@casasantos.com', phone: '(41) 99604-3178', company: 'Casa Santos', tags: ['Indicação', 'VIP'], owner: 'camila', status: 'Ativo', lastContact: '15 mai, 11:06', note: 'Contato principal: Beatriz. Prefere conversar pelo WhatsApp.' },
  { id: 'c6', name: 'Lucas Ferreira', initials: 'LF', email: 'lucas.ferreira@email.com', phone: '(51) 99910-8823', company: 'Ferreira Consultoria', tags: ['Comercial'], owner: 'juliana', status: 'Ativo', lastContact: '14 mai, 17:20', note: 'Pediu apresentação para levar à equipe na próxima reunião.' },
];

export const initialConversations = [
  { id: 'cv1', customerId: 'c1', subject: 'Dúvida sobre orçamento', channel: 'WhatsApp', status: 'Aberta', priority: 'Alta', unread: true, owner: 'camila', time: '10:42', messages: [
    { id: 1, from: 'customer', text: 'Oi, Camila! Recebi a proposta. O valor já inclui a configuração inicial para a minha equipe?', time: '10:38' },
    { id: 2, from: 'agent', text: 'Olá, Mariana! Sim, o plano já inclui a configuração inicial e o treinamento da equipe. Posso te explicar como funciona a implantação.', time: '10:40' },
    { id: 3, from: 'customer', text: 'Ótimo! E em quanto tempo conseguimos começar?', time: '10:42' },
  ]},
  { id: 'cv2', customerId: 'c2', subject: 'Acesso ao painel', channel: 'Chat', status: 'Pendente', priority: 'Normal', unread: true, owner: 'rafael', time: '09:18', messages: [
    { id: 1, from: 'customer', text: 'Bom dia! Não estou conseguindo redefinir a senha da minha conta.', time: '09:14' },
    { id: 2, from: 'agent', text: 'Bom dia, Pedro! Vou enviar um novo link de acesso para o seu e-mail cadastrado.', time: '09:18' },
  ]},
  { id: 'cv3', customerId: 'c3', subject: 'Renovação do plano', channel: 'E-mail', status: 'Aberta', priority: 'Normal', unread: false, owner: 'juliana', time: 'Ontem', messages: [
    { id: 1, from: 'customer', text: 'Gostaria de conversar sobre as opções disponíveis para a renovação do nosso contrato.', time: 'Ontem, 16:30' },
    { id: 2, from: 'agent', text: 'Claro, Fernanda! Vou preparar as opções e retorno ainda hoje.', time: 'Ontem, 16:35' },
  ]},
  { id: 'cv4', customerId: 'c4', subject: 'Configuração inicial', channel: 'WhatsApp', status: 'Resolvida', priority: 'Baixa', unread: false, owner: 'rafael', time: 'Ontem', messages: [
    { id: 1, from: 'customer', text: 'Consegui concluir a configuração, obrigado pela ajuda!', time: 'Ontem, 14:08' },
    { id: 2, from: 'agent', text: 'Que bom, Ricardo! Se surgir qualquer outra dúvida, é só chamar.', time: 'Ontem, 14:12' },
  ]},
  { id: 'cv5', customerId: 'c5', subject: 'Apresentação para equipe', channel: 'Chat', status: 'Pendente', priority: 'Alta', unread: false, owner: 'camila', time: '15 mai', messages: [
    { id: 1, from: 'customer', text: 'Seria possível agendarmos uma apresentação para a equipe na semana que vem?', time: '15 mai, 11:01' },
    { id: 2, from: 'agent', text: 'Com certeza, Beatriz. Vou verificar a agenda e te envio algumas opções.', time: '15 mai, 11:06' },
  ]},
  { id: 'cv6', customerId: 'c6', subject: 'Conhecer o plano Equipe', channel: 'E-mail', status: 'Aberta', priority: 'Normal', unread: false, owner: 'juliana', time: '14 mai', messages: [
    { id: 1, from: 'customer', text: 'Olá! Pode me enviar mais informações sobre o plano para empresas?', time: '14 mai, 17:16' },
    { id: 2, from: 'agent', text: 'Olá, Lucas! Claro. Vou te enviar a apresentação completa em instantes.', time: '14 mai, 17:20' },
  ]},
].map((item, index) => ({ ...item, createdAt: new Date(Date.now() - index * 86400000).toISOString() }));

export const knowledgeExamples = [
  { title: 'Apresentação institucional', category: 'Empresa', detail: 'Quem somos, como trabalhamos e nossos canais de atendimento', updated: 'Atualizado há 2 dias' },
  { title: 'Planos e condições comerciais', category: 'Produtos e preços', detail: 'Planos Essencial e Equipe, valores e formas de pagamento', updated: 'Atualizado há 5 dias' },
  { title: 'Perguntas frequentes de implantação', category: 'Perguntas frequentes', detail: 'Prazos, treinamento inicial e requisitos de configuração', updated: 'Atualizado há 1 semana' },
  { title: 'Política de suporte e atendimento', category: 'Políticas', detail: 'Horários, prazos de resposta e canais disponíveis', updated: 'Atualizado há 2 semanas' },
];
