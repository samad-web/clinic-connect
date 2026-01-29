import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/ui/bottom-nav';
import { LayoutDashboard, Users, Building2, BarChart3, Settings } from 'lucide-react';

const adminNavItems = [
  { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, href: '/admin' },
  { label: 'Staff', icon: <Users className="h-5 w-5" />, href: '/admin/staff' },
  { label: 'Branches', icon: <Building2 className="h-5 w-5" />, href: '/admin/branches' },
  { label: 'Reports', icon: <BarChart3 className="h-5 w-5" />, href: '/admin/reports' },
  { label: 'Settings', icon: <Settings className="h-5 w-5" />, href: '/admin/settings' },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Outlet />
      <BottomNav items={adminNavItems} />
    </div>
  );
}
