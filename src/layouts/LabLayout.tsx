import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/ui/bottom-nav';
import { AppSidebar } from '@/components/ui/app-sidebar-custom';
import { LayoutDashboard, ClipboardList, Send, History, User } from 'lucide-react';

const labNavItems = [
    { label: 'Overview', icon: <LayoutDashboard className="h-5 w-5" />, href: '/lab' },
    { label: 'Tasks', icon: <ClipboardList className="h-5 w-5" />, href: '/lab/tasks' },
    { label: 'Pending', icon: <Send className="h-5 w-5" />, href: '/lab/pending' },
    { label: 'History', icon: <History className="h-5 w-5" />, href: '/lab/history' },
    { label: 'Profile', icon: <User className="h-5 w-5" />, href: '/lab/profile' },
];

export default function LabLayout() {
    return (
        <div className="flex min-h-screen bg-background">
            <AppSidebar items={labNavItems} />
            <div className="flex-1 pb-20 md:pb-0">
                <Outlet />
                <div className="md:hidden">
                    <BottomNav items={labNavItems} />
                </div>
            </div>
        </div>
    );
}
