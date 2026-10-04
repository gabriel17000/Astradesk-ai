import { Outlet } from 'react-router-dom';
import { AppShell } from '../components/MarketplaceUI';

export default function AppLayout() {
  return <AppShell><Outlet /></AppShell>;
}
