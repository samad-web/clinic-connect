import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface QuickActionProps {
  icon: ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info';
  className?: string;
}

const iconVariants = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  info: 'bg-info/10 text-info',
};

export function QuickAction({ 
  icon, 
  label, 
  description, 
  onClick, 
  variant = 'primary',
  className 
}: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className={cn('quick-action w-full', className)}
    >
      <div className={cn('p-3 rounded-xl mb-2', iconVariants[variant])}>
        {icon}
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {description && (
        <span className="text-xs text-muted-foreground mt-0.5">{description}</span>
      )}
    </button>
  );
}
