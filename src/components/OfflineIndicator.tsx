import { useOfflineStorage } from '@/hooks/useOfflineStorage';
import { Wifi, WifiOff, RefreshCw, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function OfflineIndicator() {
  const { isOnline, isSyncing, pendingSyncCount, syncData, lastSyncTime } = useOfflineStorage();

  if (isOnline && pendingSyncCount === 0) {
    return null;
  }

  return (
    <div className={cn(
      'fixed top-0 left-0 right-0 z-50 px-4 py-2 flex items-center justify-between text-sm',
      isOnline ? 'bg-warning text-warning-foreground' : 'bg-destructive text-destructive-foreground'
    )}>
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Cloud className="h-4 w-4" />
        ) : (
          <WifiOff className="h-4 w-4" />
        )}
        <span>
          {isOnline 
            ? `${pendingSyncCount} items pending sync` 
            : 'You are offline'
          }
        </span>
      </div>
      
      {isOnline && pendingSyncCount > 0 && (
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={syncData}
          disabled={isSyncing}
          className="h-7 text-xs"
        >
          {isSyncing ? (
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
          ) : (
            <RefreshCw className="h-3 w-3 mr-1" />
          )}
          Sync Now
        </Button>
      )}
    </div>
  );
}

export function OfflineBadge() {
  const { isOnline, pendingSyncCount } = useOfflineStorage();

  return (
    <div className="flex items-center gap-2 text-xs">
      {isOnline ? (
        <span className="flex items-center gap-1 text-success">
          <Wifi className="h-3 w-3" />
          Online
        </span>
      ) : (
        <span className="flex items-center gap-1 text-destructive">
          <WifiOff className="h-3 w-3" />
          Offline
        </span>
      )}
      {pendingSyncCount > 0 && (
        <span className="px-1.5 py-0.5 rounded-full bg-warning/20 text-warning">
          {pendingSyncCount} pending
        </span>
      )}
    </div>
  );
}
