import { cn } from '@/lib/utils';

type StatusType = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'processing' | 'ready' | 'delivered';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-warning/15 text-warning border-warning/30',
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-info/15 text-info border-info/30',
  },
  completed: {
    label: 'Completed',
    className: 'bg-success/15 text-success border-success/30',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-destructive/15 text-destructive border-destructive/30',
  },
  processing: {
    label: 'Processing',
    className: 'bg-info/15 text-info border-info/30',
  },
  ready: {
    label: 'Ready',
    className: 'bg-success/15 text-success border-success/30',
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-success/15 text-success border-success/30',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
