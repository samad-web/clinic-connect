import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/ui/bottom-nav';
import { AppSidebar } from '@/components/ui/app-sidebar-custom';
import { Home, Users, FileText, Calendar, User } from 'lucide-react';

const doctorNavItems = [
  { label: 'Home', icon: <Home className="h-5 w-5" />, href: '/doctor' },
  { label: 'Patients', icon: <Users className="h-5 w-5" />, href: '/doctor/patients' },
  { label: 'Prescriptions', icon: <FileText className="h-5 w-5" />, href: '/doctor/prescriptions' },
  { label: 'Schedule', icon: <Calendar className="h-5 w-5" />, href: '/doctor/schedule' },
  { label: 'Profile', icon: <User className="h-5 w-5" />, href: '/doctor/profile' },
];

export default function DoctorLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar items={doctorNavItems} />
      <div className="flex-1 pb-20 md:pb-0">
        <Outlet />
        <div className="md:hidden">
          <BottomNav items={doctorNavItems} />
        </div>
      </div>
    </div>
  );
}
