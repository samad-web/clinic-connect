import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/ui/bottom-nav';
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
    <div className="min-h-screen bg-background pb-20">
      <Outlet />
      <BottomNav items={doctorNavItems} />
    </div>
  );
}
