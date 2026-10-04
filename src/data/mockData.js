export const categories = [
  { id: 'eletrica', name: 'Elétrica', icon: 'Zap', color: 'gold' },
  { id: 'hidraulica', name: 'Hidráulica', icon: 'Droplets', color: 'blue' },
  { id: 'limpeza', name: 'Limpeza', icon: 'Sparkles', color: 'violet' },
  { id: 'manutencao', name: 'Manutenção', icon: 'Wrench', color: 'green' },
  { id: 'tecnologia', name: 'Tecnologia', icon: 'Laptop', color: 'indigo' },
  { id: 'montagem', name: 'Montagem', icon: 'Hammer', color: 'orange' },
  { id: 'pintura', name: 'Pintura', icon: 'Paintbrush', color: 'rose' },
  { id: 'assistencia', name: 'Assistência residencial', icon: 'House', color: 'teal' },
];

function createAvatar(background, skin, hair, clothing) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><rect width="160" height="160" rx="80" fill="${background}"/><path d="M30 160c5-29 23-46 50-46s45 17 50 46" fill="${clothing}"/><path d="M56 87c0-23 10-38 24-38s24 15 24 38v10c-6 10-14 16-24 16s-18-6-24-16z" fill="${skin}"/><path d="M53 76c-2-25 9-43 29-43 20 0 29 16 25 42-6-4-10-12-12-20-8 10-23 15-42 15z" fill="${hair}"/><path d="M54 73c-8 1-11 10-8 17 2 5 6 8 11 8V73m50 0c8 1 11 10 8 17-2 5-6 8-11 8V73" fill="${skin}"/><path d="M68 83h1m22 0h1" stroke="#443b35" stroke-width="3" stroke-linecap="round"/><path d="M73 98c5 4 10 4 15 0" fill="none" stroke="#a65f55" stroke-width="2" stroke-linecap="round"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const professionals = [
  {
    id: 'marcos-almeida', name: 'Marcos Almeida', profession: 'Eletricista residencial', category: 'Elétrica',
    location: 'Pinheiros, São Paulo', rating: 4.9, reviews: 128, priceFrom: 120, verified: true,
    avatar: createAvatar('#dfeae4', '#c98f70', '#342722', '#497466'),
    experience: '12 anos de experiência', specialties: ['Iluminação residencial', 'Tomadas e interruptores', 'Diagnóstico elétrico'], availabilitySlots: [{ dayOffset: 1, times: ['10:00', '14:00'] }, { dayOffset: 2, times: ['09:00', '13:00'] }], services: ['Instalação de luminárias', 'Reparo elétrico', 'Instalação de tomadas'],
    description: 'Atendimento residencial cuidadoso, com diagnóstico explicado antes de qualquer reparo. Especialista em iluminação, tomadas e pequenos projetos elétricos.',
  },
  {
    id: 'lucas-oliveira', name: 'Lucas Oliveira', profession: 'Encanador', category: 'Hidráulica',
    location: 'Vila Mariana, São Paulo', rating: 4.8, reviews: 96, priceFrom: 95, verified: true,
    avatar: createAvatar('#e7e6df', '#d19a7b', '#4a3428', '#63828d'),
    experience: '9 anos de experiência', specialties: ['Reparo de vazamentos', 'Torneiras e registros', 'Desentupimento'], availabilitySlots: [{ dayOffset: 1, times: ['11:00', '16:00'] }, { dayOffset: 3, times: ['09:30', '14:30'] }], services: ['Reparo de vazamentos', 'Instalação de torneiras', 'Desentupimento'],
    description: 'Resolve problemas hidráulicos do dia a dia com agilidade e transparência. O orçamento é combinado antes do início do serviço.',
  },
  {
    id: 'ana-costa', name: 'Ana Costa', profession: 'Especialista em limpeza', category: 'Limpeza',
    location: 'Moema, São Paulo', rating: 5.0, reviews: 214, priceFrom: 160, verified: true,
    avatar: createAvatar('#f0e6dc', '#e5b38c', '#573d32', '#826c98'),
    experience: '7 anos de experiência', specialties: ['Limpeza residencial', 'Limpeza pós-obra', 'Organização de ambientes'], availabilitySlots: [{ dayOffset: 1, times: ['09:00', '13:00'] }, { dayOffset: 3, times: ['09:00', '14:00'] }], services: ['Limpeza residencial', 'Limpeza pós-obra', 'Organização de ambientes'],
    description: 'Limpeza caprichada para apartamentos e casas, com atenção aos detalhes e produtos adequados para cada superfície.',
  },
  {
    id: 'rafael-santos', name: 'Rafael Santos', profession: 'Técnico de manutenção', category: 'Manutenção',
    location: 'Pinheiros, São Paulo', rating: 4.7, reviews: 83, priceFrom: 110, verified: true,
    avatar: createAvatar('#e0e9ed', '#b97f61', '#29292b', '#637d65'),
    experience: '10 anos de experiência', specialties: ['Reparos residenciais', 'Manutenção preventiva', 'Instalações domésticas'], availabilitySlots: [{ dayOffset: 2, times: ['10:00', '15:00'] }, { dayOffset: 4, times: ['09:00', '13:00'] }], services: ['Manutenção preventiva', 'Reparos gerais', 'Instalações'],
    description: 'Pequenos reparos e manutenção residencial com pontualidade, organização e explicação simples de cada etapa.',
  },
  {
    id: 'camila-rocha', name: 'Camila Rocha', profession: 'Suporte de tecnologia', category: 'Tecnologia',
    location: 'Paulista, São Paulo', rating: 4.9, reviews: 71, priceFrom: 90, verified: true,
    avatar: createAvatar('#eee3e1', '#e0aa86', '#3c2c2a', '#6e81a4'),
    experience: '6 anos de experiência', specialties: ['Redes Wi-Fi', 'Computadores', 'Impressoras e periféricos'], availabilitySlots: [{ dayOffset: 1, times: ['10:00', '14:00', '16:00'] }, { dayOffset: 2, times: ['09:00', '11:00'] }], services: ['Configuração de Wi-Fi', 'Suporte para computador', 'Instalação de impressoras'],
    description: 'Ajuda prática com computadores, internet e dispositivos. Atendimento remoto ou presencial, conforme a necessidade.',
  },
  {
    id: 'thiago-lima', name: 'Thiago Lima', profession: 'Montador de móveis', category: 'Montagem',
    location: 'Lapa, São Paulo', rating: 4.8, reviews: 147, priceFrom: 130, verified: true,
    avatar: createAvatar('#e3e5eb', '#ce9673', '#392d2a', '#a16d52'),
    experience: '8 anos de experiência', specialties: ['Móveis residenciais', 'Guarda-roupas', 'Prateleiras e suportes'], availabilitySlots: [{ dayOffset: 2, times: ['10:00', '14:00'] }, { dayOffset: 4, times: ['09:00', '13:00'] }], services: ['Montagem de móveis', 'Instalação de prateleiras', 'Desmontagem para mudança'],
    description: 'Montagem precisa e cuidadosa de móveis residenciais, com proteção do ambiente e conferência ao finalizar.',
  },
  {
    id: 'roberto-alves', name: 'Roberto Alves', profession: 'Pintor residencial', category: 'Pintura',
    location: 'Brooklin, São Paulo', rating: 4.6, reviews: 58, priceFrom: 180, verified: false,
    avatar: createAvatar('#eae3d9', '#c68f6d', '#322a27', '#647b8c'),
    experience: '11 anos de experiência', specialties: ['Pintura de interiores', 'Retoques e acabamento', 'Preparação de superfícies'], availabilitySlots: [{ dayOffset: 3, times: ['09:00', '13:00'] }, { dayOffset: 5, times: ['10:00', '14:00'] }], services: ['Pintura de paredes', 'Retoques e acabamento', 'Pintura de portas'],
    description: 'Pintura de interiores e pequenos retoques com cuidado na preparação, proteção dos móveis e limpeza do espaço.',
  },
  {
    id: 'fernanda-melo', name: 'Fernanda Melo', profession: 'Assistência residencial', category: 'Assistência residencial',
    location: 'Aclimação, São Paulo', rating: 4.9, reviews: 102, priceFrom: 100, verified: true,
    avatar: createAvatar('#e7e3ed', '#e2ab87', '#302725', '#71805c'),
    experience: '8 anos de experiência', specialties: ['Instalações domésticas', 'Reparos leves', 'Vistoria residencial'], availabilitySlots: [{ dayOffset: 1, times: ['15:00', '17:00'] }, { dayOffset: 2, times: ['10:00', '14:00'] }], services: ['Instalações domésticas', 'Reparos leves', 'Vistoria residencial'],
    description: 'Profissional versátil para instalações e reparos leves em casa, com atendimento atencioso e preço combinado.',
  },
];

export const services = [
  { id: 'instalacao-luminaria', name: 'Instalação de luminária', category: 'Elétrica', professionalId: 'marcos-almeida', price: 120, duration: '1 hora', description: 'Instalação segura de luminária em ponto elétrico existente, com teste de funcionamento ao final.', featured: true },
  { id: 'reparo-tomada', name: 'Reparo elétrico e tomadas', category: 'Elétrica', professionalId: 'marcos-almeida', price: 145, duration: '1 a 2 horas', description: 'Diagnóstico e reparo de tomadas, interruptores e falhas elétricas residenciais.', featured: false },
  { id: 'reparo-vazamento', name: 'Reparo de vazamento', category: 'Hidráulica', professionalId: 'lucas-oliveira', price: 95, duration: '1 a 2 horas', description: 'Identificação da origem do vazamento e reparo hidráulico. Peças são orçadas à parte, se necessário.', featured: true },
  { id: 'limpeza-apartamento', name: 'Limpeza de apartamento', category: 'Limpeza', professionalId: 'ana-costa', price: 160, duration: '3 horas', description: 'Limpeza completa de apartamento de até dois quartos, incluindo cozinha, banheiros e áreas comuns.', featured: true },
  { id: 'manutencao-geral', name: 'Pequenos reparos em casa', category: 'Manutenção', professionalId: 'rafael-santos', price: 110, duration: 'Até 2 horas', description: 'Pacote de pequenos ajustes e reparos residenciais. O escopo é combinado durante a solicitação.', featured: false },
  { id: 'configurar-wifi', name: 'Configuração de Wi-Fi', category: 'Tecnologia', professionalId: 'camila-rocha', price: 90, duration: '1 hora', description: 'Configuração de roteador, melhoria da conexão e conexão dos seus dispositivos à rede.', featured: true },
  { id: 'montagem-guarda-roupa', name: 'Montagem de guarda-roupa', category: 'Montagem', professionalId: 'thiago-lima', price: 180, duration: '2 a 3 horas', description: 'Montagem cuidadosa de guarda-roupa residencial com conferência de portas e gavetas.', featured: false },
  { id: 'pintura-quarto', name: 'Pintura de um cômodo', category: 'Pintura', professionalId: 'roberto-alves', price: 180, duration: 'A combinar', description: 'Pintura de um cômodo com preparação básica. Materiais e metragem são alinhados previamente.', featured: false },
  { id: 'instalacao-prateleira', name: 'Instalação de prateleiras', category: 'Assistência residencial', professionalId: 'fernanda-melo', price: 100, duration: '1 hora', description: 'Instalação e nivelamento de prateleiras em parede adequada, com alinhamento prévio do local.', featured: false },
  { id: 'instalacao-torneira', name: 'Instalação de torneira', category: 'Hidráulica', professionalId: 'lucas-oliveira', price: 115, duration: '1 hora', description: 'Retirada da torneira antiga e instalação da nova, com teste para verificar vazamentos.', featured: false },
];

export const orderStatuses = ['Solicitado', 'Aceito', 'Agendado', 'Em andamento', 'Concluído'];

export const initialOrders = [
  {
    id: 'AS-2048', serviceId: 'instalacao-luminaria', professionalId: 'marcos-almeida', status: 'Agendado',
    date: 'Hoje', time: '14:30', address: 'Rua dos Pinheiros, 420 — Pinheiros',
    description: 'Instalar luminária pendente na sala.', notes: 'A luminária já está no local.', createdAt: 'Hoje',
    rated: false,
  },
  {
    id: 'AS-2041', serviceId: 'reparo-vazamento', professionalId: 'lucas-oliveira', status: 'Em andamento',
    date: 'Hoje', time: '13:00', address: 'Rua Harmonia, 85 — Vila Madalena',
    description: 'Vazamento embaixo da pia da cozinha.', notes: 'Interfone 31.', createdAt: 'Hoje',
    rated: false,
  },
  {
    id: 'AS-2039', serviceId: 'montagem-guarda-roupa', professionalId: 'thiago-lima', status: 'Aceito',
    date: 'Quinta-feira', time: '11:00', address: 'Rua dos Pinheiros, 420 — Pinheiros',
    description: 'Montar um guarda-roupa de casal no quarto.', notes: 'As caixas já estão no local.', createdAt: 'Ontem',
    rated: false,
  },
  {
    id: 'AS-1987', serviceId: 'limpeza-apartamento', professionalId: 'ana-costa', status: 'Concluído',
    date: 'Ontem', time: '09:00', address: 'Alameda Santos, 880 — Jardins',
    description: 'Limpeza completa antes de receber visitas.', notes: '', createdAt: 'Ontem',
    rated: false,
  },
  {
    id: 'AS-2052', serviceId: 'configurar-wifi', professionalId: 'camila-rocha', status: 'Solicitado',
    date: 'Amanhã', time: '10:00', address: 'Rua Vergueiro, 1500 — Vila Mariana',
    description: 'Instalar e configurar o roteador novo.', notes: 'Prefiro atendimento pela manhã.', createdAt: 'Hoje',
    rated: false,
  },
];

export const initialMessages = {
  'AS-2041': [
    { id: 'm-1', author: 'professional', text: 'Olá! Já estou a caminho e chego por volta das 13h.', time: '12:34' },
    { id: 'm-2', author: 'client', text: 'Perfeito, obrigada! O interfone é o 31.', time: '12:38' },
    { id: 'm-3', author: 'professional', text: 'Anotado. Aviso quando chegar.', time: '12:39' },
  ],
  'AS-2048': [
    { id: 'm-4', author: 'professional', text: 'Olá! Confirmo nossa visita hoje às 14h30. Até lá!', time: '10:12' },
  ],
  'AS-2039': [
    { id: 'm-5', author: 'professional', text: 'Olá! Recebi seu pedido para montar o guarda-roupa. Podemos conferir os detalhes quando eu chegar.', time: '09:20' },
  ],
  'AS-1987': [
    { id: 'm-6', author: 'professional', text: 'Obrigado por confiar no meu trabalho. Se precisar de mais alguma coisa, estou à disposição.', time: '11:15' },
  ],
  'AS-2052': [
    { id: 'm-7', author: 'professional', text: 'Oi! Recebi sua solicitação de configuração do Wi-Fi. Vou confirmar o melhor horário por aqui.', time: 'Agora' },
  ],
};

export const initialNotifications = [
  { id: 'n-1', title: 'Horário confirmado', description: 'Marcos confirmou a instalação de luminária hoje às 14h30.', time: 'há 18 min', orderId: 'AS-2048', read: false },
  { id: 'n-2', title: 'Profissional a caminho', description: 'Lucas está chegando para o reparo hidráulico.', time: 'há 42 min', orderId: 'AS-2041', read: false },
  { id: 'n-3', title: 'Serviço concluído', description: 'Sua limpeza de apartamento foi finalizada. Conte como foi!', time: 'Ontem', orderId: 'AS-1987', read: true },
  { id: 'n-4', title: 'Nova mensagem', description: 'Marcos enviou uma mensagem sobre sua solicitação.', time: 'Ontem', orderId: 'AS-2048', read: true },
];

export const initialReviews = [
  { id: 'r-1', author: 'Marina Costa', rating: 5, text: 'Muito atenciosa e pontual. Recomendo!', date: '12 set', professionalId: 'ana-costa' },
  { id: 'r-2', author: 'Pedro Lima', rating: 5, text: 'Resolveu o problema e explicou tudo com clareza.', date: '8 set', professionalId: 'marcos-almeida' },
  { id: 'r-3', author: 'Beatriz Souza', rating: 4, text: 'Ótimo atendimento e serviço bem feito.', date: '2 set', professionalId: 'lucas-oliveira' },
];

export const initialClient = {
  name: 'Gabriel Victor',
  email: 'gabriel@email.com',
  phone: '(11) 99999-1234',
  location: 'São Paulo, SP',
  address: 'Rua dos Pinheiros, 420 — Pinheiros',
};

export const getProfessional = (id) => professionals.find((professional) => professional.id === id);
export const getService = (id) => services.find((service) => service.id === id);

export function getAvailableSlots(professionalId, fromDate = new Date()) {
  const professional = getProfessional(professionalId);
  if (!professional) return [];
  return professional.availabilitySlots.map(({ dayOffset, times }) => {
    const date = new Date(fromDate);
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + dayOffset);
    return {
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
      label: new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }).format(date),
      times,
    };
  });
}
