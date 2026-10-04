import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AstraDeskProvider } from './context/AstraDeskContext';
import AppLayout from './layouts/AppLayout';
import ChatPage from './pages/ChatPage';
import ClientProfilePage from './pages/ClientProfilePage';
import DisputePage from './pages/DisputePage';
import HomePage from './pages/HomePage';
import NotificationsPage from './pages/NotificationsPage';
import PaymentPage from './pages/PaymentPage';
import ProfessionalPage from './pages/ProfessionalPage';
import RatingPage from './pages/RatingPage';
import RequestPage from './pages/RequestPage_new';
import SafetyPage from './pages/SafetyPage';
import SearchPage from './pages/SearchPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServicesPage from './pages/ServicesPage';
import ServiceTrackingPage from './pages/ServiceTrackingPage';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AstraDeskProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/professional/:id" element={<ProfessionalPage />} />
            <Route path="/service/:serviceId" element={<ServiceDetailPage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:orderId" element={<ServiceTrackingPage />} />
            <Route path="/tracking" element={<Navigate to="/services" replace />} />
            <Route path="/chat/:orderId?" element={<ChatPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ClientProfilePage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/rating/:orderId" element={<RatingPage />} />
            <Route path="/review" element={<Navigate to="/services" replace />} />
            <Route path="/dispute" element={<DisputePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AstraDeskProvider>
    </BrowserRouter>
  );
}

export default App;
