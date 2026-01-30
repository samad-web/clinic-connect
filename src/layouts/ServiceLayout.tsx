import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/ui/bottom-nav';
import { AppSidebar } from '@/components/ui/app-sidebar-custom';
import { LayoutDashboard, Users, Calendar, ClipboardList, Settings, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ServiceLayout() {
    const { user } = useAuth();

    const navItems = [
        { label: 'Overview', icon: <LayoutDashboard className="h-5 w-5" />, href: '/services' },
        { label: 'My Patients', icon: <Users className="h-5 w-5" />, href: '/services/patients' },
        { label: 'Tasks', icon: <ClipboardList className="h-5 w-5" />, href: '/services/tasks' },
        { label: 'Schedule', icon: <Calendar className="h-5 w-5" />, href: '/services/schedule' },
        { label: 'Profile', icon: <User className="h-5 w-5" />, href: '/services/profile' },
    ];

    return (
        <div className="flex min-h-screen bg-background">
            <AppSidebar
                items={navItems}
            />
            <div className="flex-1 pb-20 md:pb-0">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
                <div className="md:hidden">
                    <BottomNav items={navItems} />
                </div>
            </div>
        </div>
    );
}
