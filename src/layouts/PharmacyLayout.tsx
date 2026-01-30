import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/ui/bottom-nav';
import { AppSidebar } from '@/components/ui/app-sidebar-custom';
import { Home, Package, FileText, Truck, User } from 'lucide-react';

const pharmacyNavItems = [
  { label: 'Home', icon: <Home className="h-5 w-5" />, href: '/pharmacy' },
  { label: 'Inventory', icon: <Package className="h-5 w-5" />, href: '/pharmacy/inventory' },
  { label: 'Orders', icon: <FileText className="h-5 w-5" />, href: '/pharmacy/orders' },
  { label: 'Delivery', icon: <Truck className="h-5 w-5" />, href: '/pharmacy/delivery' },
  { label: 'Profile', icon: <User className="h-5 w-5" />, href: '/pharmacy/profile' },
];

export default function PharmacyLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar items={pharmacyNavItems} />
      <div className="flex-1 pb-20 md:pb-0">
        <Outlet />
        <div className="md:hidden">
          <BottomNav items={pharmacyNavItems} />
        </div>
      </div>
    </div>
  );
}
