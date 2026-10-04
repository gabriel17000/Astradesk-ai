import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  categories, getProfessional, getService, initialClient, initialMessages, initialNotifications,
  initialOrders, initialReviews, professionals, services,
} from '../data/mockData';

const AstraDeskContext = createContext(null);
const STORAGE_KEY = 'astradesk-demo-v1';

function readSavedState() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.warn('Não foi possível restaurar os dados desta demonstração.', error);
    return {};
  }
}

function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function restoreReviews(savedReviews) {
  if (!Array.isArray(savedReviews)) return initialReviews;
  const savedIds = new Set(savedReviews.map((review) => review.id));
  const restored = savedReviews.map((review) => {
    const initialReview = initialReviews.find((item) => item.id === review.id);
    return initialReview
      ? { ...initialReview, ...review, professionalId: review.professionalId || initialReview.professionalId }
      : review;
  });
  return [...restored, ...initialReviews.filter((review) => !savedIds.has(review.id))];
}

export function AstraDeskProvider({ children }) {
  const [saved] = useState(readSavedState);
  const [orders, setOrders] = useState(() => saved.orders || initialOrders);
  const [messagesByOrder, setMessagesByOrder] = useState(() => ({ ...initialMessages, ...saved.messagesByOrder }));
  const [notifications, setNotifications] = useState(() => saved.notifications || initialNotifications);
  const [reviews, setReviews] = useState(() => restoreReviews(saved.reviews));
  const [client, setClient] = useState(() => saved.client || initialClient);
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ orders, messagesByOrder, notifications, reviews, client }));
    } catch (error) {
      console.warn('Não foi possível salvar os dados locais desta demonstração.', error);
    }
  }, [orders, messagesByOrder, notifications, reviews, client]);

  const notify = (title, description, orderId = null) => {
    setNotifications((current) => [
      { id: createId('n'), title, description, time: 'Agora', orderId, read: false },
      ...current,
    ]);
  };

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.astradeskToastTimeout);
    window.astradeskToastTimeout = window.setTimeout(() => setToast(''), 3000);
  };

  const createOrder = (details) => {
    const service = getService(details.serviceId);
    if (!service) throw new Error('Selecione um serviço válido para continuar.');
    const order = {
      ...details,
      id: `AS-${Math.floor(2000 + Math.random() * 7999)}`,
      professionalId: service.professionalId,
      status: 'Solicitado',
      createdAt: 'Agora',
      rated: false,
    };
    setOrders((current) => [order, ...current]);
    setMessagesByOrder((current) => ({
      ...current,
      [order.id]: [{
        id: createId('m'),
        author: 'professional',
        text: `Olá! Recebi sua solicitação de ${service.name}. Vou conferir minha agenda e já retorno por aqui.`,
        time: 'Agora',
      }],
    }));
    notify('Solicitação enviada', `${service.name} foi enviado para ${getProfessional(service.professionalId)?.name}.`, order.id);
    showToast('Pedido enviado! Você pode acompanhar em Meus serviços.');
    return order;
  };

  const advanceOrder = (orderId) => {
    const order = orders.find((item) => item.id === orderId);
    if (!order) return;
    const statuses = ['Solicitado', 'Aceito', 'Agendado', 'Em andamento', 'Concluído'];
    const currentIndex = statuses.indexOf(order.status);
    if (currentIndex < 0 || currentIndex >= statuses.length - 1) return;
    const status = statuses[currentIndex + 1];
    setOrders((current) => current.map((item) => item.id === orderId ? { ...item, status } : item));
    const events = {
      Aceito: ['Solicitação aceita', `${getProfessional(order.professionalId)?.name} aceitou seu pedido.`],
      Agendado: ['Horário confirmado', `Seu serviço ficou agendado para ${order.date} às ${order.time}.`],
      'Em andamento': ['Serviço iniciado', `${getProfessional(order.professionalId)?.name} iniciou o atendimento.`],
      Concluído: ['Serviço concluído', 'Seu serviço foi finalizado. Avalie sua experiência.'],
    };
    const [title, description] = events[status];
    notify(title, description, orderId);
    showToast(`Status atualizado: ${status}`);
  };

  const sendMessage = (orderId, text) => {
    const message = text.trim();
    if (!message || !orders.some((order) => order.id === orderId)) return;
    setMessagesByOrder((current) => ({
      ...current,
      [orderId]: [...(current[orderId] || []), { id: createId('m'), author: 'client', text: message, time: 'Agora' }],
    }));
    showToast('Mensagem enviada.');
    window.setTimeout(() => {
      const order = orders.find((item) => item.id === orderId);
      if (!order) return;
      setMessagesByOrder((current) => ({
        ...current,
        [orderId]: [...(current[orderId] || []), {
          id: createId('m'),
          author: 'professional',
          text: 'Combinado! Obrigado por avisar. Se precisar ajustar algum detalhe, pode me chamar por aqui.',
          time: 'Agora',
        }],
      }));
      notify('Nova mensagem', `${getProfessional(order.professionalId)?.name} respondeu na conversa.`, orderId);
    }, 1100);
  };

  const submitReview = (orderId, rating, comment) => {
    const order = orders.find((item) => item.id === orderId);
    if (!order || order.status !== 'Concluído' || order.rated) return false;
    const professional = getProfessional(order.professionalId);
    setOrders((current) => current.map((item) => item.id === orderId ? { ...item, rated: true } : item));
    setReviews((current) => [{
      id: createId('r'),
      author: client.name,
      rating,
      text: comment.trim() || `Avaliou o serviço com ${rating} estrelas.`,
      date: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(new Date()),
      professionalId: order.professionalId,
      orderId,
    }, ...current]);
    notify('Avaliação enviada', `Obrigado por avaliar ${professional?.name}.`, orderId);
    showToast('Obrigado! Sua avaliação foi registrada.');
    return true;
  };

  const markNotificationsRead = () => setNotifications((current) => current.every((item) => item.read) ? current : current.map((item) => ({ ...item, read: true })));
  const updateClient = (changes) => setClient((current) => ({ ...current, ...changes }));

  const providersWithRatings = useMemo(() => professionals.map((professional) => {
    const addedReviews = reviews.filter((review) => review.professionalId === professional.id && review.orderId);
    const reviewCount = professional.reviews + addedReviews.length;
    const rating = reviewCount
      ? ((professional.rating * professional.reviews) + addedReviews.reduce((total, review) => total + review.rating, 0)) / reviewCount
      : 0;
    return { ...professional, rating, reviews: reviewCount };
  }), [reviews]);

  const value = useMemo(() => ({
    categories,
    services,
    professionals: providersWithRatings,
    client,
    orders,
    notifications,
    reviews,
    messagesByOrder,
    unreadCount: notifications.filter((item) => !item.read).length,
    toast,
    notify,
    showToast,
    createOrder,
    advanceOrder,
    sendMessage,
    submitReview,
    markNotificationsRead,
    updateClient,
  }), [client, orders, notifications, reviews, messagesByOrder, toast, providersWithRatings]);

  return <AstraDeskContext.Provider value={value}>{children}</AstraDeskContext.Provider>;
}

export function useAstraDesk() {
  const context = useContext(AstraDeskContext);
  if (!context) throw new Error('useAstraDesk must be used inside AstraDeskProvider');
  return context;
}
