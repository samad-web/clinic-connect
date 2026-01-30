import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/ui/bottom-nav';
import { AppSidebar } from '@/components/ui/app-sidebar-custom';
import { Home, Calendar, FileText, Pill, User } from 'lucide-react';

const patientNavItems = [
  { label: 'Home', icon: <Home className="h-5 w-5" />, href: '/patient' },
  { label: 'Appointments', icon: <Calendar className="h-5 w-5" />, href: '/patient/appointments' },
  { label: 'Records', icon: <FileText className="h-5 w-5" />, href: '/patient/records' },
  { label: 'Pharmacy', icon: <Pill className="h-5 w-5" />, href: '/patient/pharmacy' },
  { label: 'Profile', icon: <User className="h-5 w-5" />, href: '/patient/profile' },
];

export default function PatientLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar items={patientNavItems} />
      <div className="flex-1 pb-20 md:pb-0">
        <Outlet />
        <div className="md:hidden">
          <BottomNav items={patientNavItems} />
        </div>
      </div>
    </div>
  );
}
