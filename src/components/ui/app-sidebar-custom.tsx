import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './button';

interface NavItem {
    label: string;
    icon: ReactNode;
    href: string;
}

interface AppSidebarProps {
    items: NavItem[];
}

export function AppSidebar({ items }: AppSidebarProps) {
    const location = useLocation();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        // Force redirect to login page
        window.location.href = '/login';
    };

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen bg-card border-r border-border sticky top-0 left-0 shrink-0">
            <div className="p-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                    <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                    <h2 className="font-heading font-bold text-base leading-tight">Royal Pharmacy</h2>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Trichy</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {items.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative',
                                isActive
                                    ? 'bg-primary text-primary-foreground shadow-card'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                        >
                            <span className={cn(
                                'transition-transform group-hover:scale-110 duration-200',
                                isActive ? 'text-primary-foreground' : 'text-primary'
                            )}>
                                {item.icon}
                            </span>
                            <span className="font-medium text-sm">
                                {item.label}
                            </span>
                            {isActive && (
                                <div className="absolute left-0 w-1 h-6 bg-primary-foreground rounded-r-full my-auto" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border mt-auto">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={handleLogout}
                >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                </Button>
            </div>
        </aside>
    );
}
