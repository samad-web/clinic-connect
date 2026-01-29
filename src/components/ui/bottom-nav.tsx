import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  icon: ReactNode;
  href: string;
}

interface BottomNavProps {
  items: NavItem[];
}

export function BottomNav({ items }: BottomNavProps) {
  const location = useLocation();

  return (
    <nav className="bottom-nav z-50">
      <div className="flex items-center justify-around py-1">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'bottom-nav-item flex-1',
                isActive && 'active'
              )}
            >
              <span className={cn(
                'mb-0.5 transition-transform',
                isActive && 'scale-110'
              )}>
                {item.icon}
              </span>
              <span className={cn(
                'text-[10px] font-medium',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
