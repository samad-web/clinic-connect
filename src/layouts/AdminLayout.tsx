import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '@/components/ui/bottom-nav';
import { AppSidebar } from '@/components/ui/app-sidebar-custom';
import { LayoutDashboard, Users, Building2, BarChart3, Settings } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();
  // Determine base path from current location (either /admin or /clinic)
  const basePath = location.pathname.startsWith('/clinic') ? '/clinic' : '/admin';

  const adminNavItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, href: basePath },
    { label: 'Staff', icon: <Users className="h-5 w-5" />, href: `${basePath}/staff` },
    { label: 'Branches', icon: <Building2 className="h-5 w-5" />, href: `${basePath}/branches` },
    { label: 'Reports', icon: <BarChart3 className="h-5 w-5" />, href: `${basePath}/reports` },
    { label: 'Settings', icon: <Settings className="h-5 w-5" />, href: `${basePath}/settings` },
  ];
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar items={adminNavItems} />
      <div className="flex-1 pb-20 md:pb-0">
        <Outlet />
        <div className="md:hidden">
          <BottomNav items={adminNavItems} />
        </div>
      </div>
    </div>
  );
}
