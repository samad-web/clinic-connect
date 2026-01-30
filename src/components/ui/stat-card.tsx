import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'default';
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  primary: 'gradient-patient',
  success: 'gradient-pharmacy',
  warning: 'gradient-lab',
  info: 'gradient-doctor',
  default: 'bg-card border border-border',
};

export function StatCard({ title, value, icon, trend, variant = 'default', className, onClick }: StatCardProps) {
  const isDefault = variant === 'default';

  return (
    <div
      onClick={onClick}
      className={cn(
        'stat-card',
        variantStyles[variant],
        isDefault && 'text-foreground',
        onClick && 'cursor-pointer hover:shadow-float active:scale-[0.98] transition-all',
        className
      )}
    >
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className={cn(
            'text-sm font-medium',
            isDefault ? 'text-muted-foreground' : 'text-white/80'
          )}>
            {title}
          </p>
          <p className={cn(
            'mt-1 text-2xl font-bold font-heading',
            isDefault ? 'text-foreground' : 'text-white'
          )}>
            {value}
          </p>
          {trend && (
            <p className={cn(
              'mt-1 text-xs font-medium',
              trend.isPositive
                ? isDefault ? 'text-success' : 'text-blue-100'
                : isDefault ? 'text-destructive' : 'text-red-200'
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from yesterday
            </p>
          )}
        </div>
        <div className={cn(
          'p-2 rounded-lg',
          isDefault ? 'bg-muted' : 'bg-white/20'
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
}
