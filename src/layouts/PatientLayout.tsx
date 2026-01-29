import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/ui/bottom-nav';
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
    <div className="min-h-screen bg-background pb-20">
      <Outlet />
      <BottomNav items={patientNavItems} />
    </div>
  );
}
