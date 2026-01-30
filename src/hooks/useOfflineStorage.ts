import { useState, useEffect, useCallback } from 'react';

const DB_NAME = 'medcare_offline_db';
const DB_VERSION = 1;

interface OfflineData {
  appointments: any[];
  prescriptions: any[];
  labTests: any[];
  pharmacyOrders: any[];
  pendingSync: any[];
}

const defaultData: OfflineData = {
  appointments: [],
  prescriptions: [],
  labTests: [],
  pharmacyOrders: [],
  pendingSync: [],
};

// IndexedDB wrapper for offline storage
class OfflineDB {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores
        if (!db.objectStoreNames.contains('appointments')) {
          db.createObjectStore('appointments', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('prescriptions')) {
          db.createObjectStore('prescriptions', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('labTests')) {
          db.createObjectStore('labTests', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('pharmacyOrders')) {
          db.createObjectStore('pharmacyOrders', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('pendingSync')) {
          db.createObjectStore('pendingSync', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('meta')) {
          db.createObjectStore('meta', { keyPath: 'key' });
        }
      };
    });
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async put<T>(storeName: string, data: T): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName: string, id: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clear(storeName: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async setMeta(key: string, value: any): Promise<void> {
    return this.put('meta', { key, value, updatedAt: new Date().toISOString() });
  }

  async getMeta(key: string): Promise<any> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('meta', 'readonly');
      const store = transaction.objectStore('meta');
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result?.value);
      request.onerror = () => reject(request.error);
    });
  }
}

const offlineDB = new OfflineDB();

export function useOfflineStorage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load last sync time
    offlineDB.getMeta('lastSyncTime').then(time => {
      if (time) setLastSyncTime(new Date(time));
    });

    // Check pending sync items
    offlineDB.getAll('pendingSync').then(items => {
      setPendingSyncCount(items.length);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-sync when coming online
  useEffect(() => {
    if (isOnline && pendingSyncCount > 0) {
      syncData();
    }
  }, [isOnline]);

  const saveOffline = useCallback(async (storeName: string, data: any) => {
    try {
      await offlineDB.put(storeName, { ...data, id: data.id || Date.now().toString() });
      
      // If offline, add to pending sync queue
      if (!navigator.onLine) {
        await offlineDB.put('pendingSync', {
          id: Date.now().toString(),
          storeName,
          data,
          action: 'create',
          timestamp: new Date().toISOString(),
        });
        setPendingSyncCount(prev => prev + 1);
      }
      
      return true;
    } catch (error) {
      console.error('Error saving offline:', error);
      return false;
    }
  }, []);

  const getOfflineData = useCallback(async <T>(storeName: string): Promise<T[]> => {
    try {
      return await offlineDB.getAll<T>(storeName);
    } catch (error) {
      console.error('Error getting offline data:', error);
      return [];
    }
  }, []);

  const syncData = useCallback(async () => {
    if (!navigator.onLine || isSyncing) return;

    setIsSyncing(true);
    try {
      const pendingItems = await offlineDB.getAll<any>('pendingSync');
      
      for (const item of pendingItems) {
        // Here you would send to your backend API
        console.log('Syncing:', item);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Remove from pending sync after successful sync
        await offlineDB.delete('pendingSync', item.id);
      }

      const now = new Date();
      await offlineDB.setMeta('lastSyncTime', now.toISOString());
      setLastSyncTime(now);
      setPendingSyncCount(0);
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing]);

  const clearOfflineData = useCallback(async () => {
    await offlineDB.clear('appointments');
    await offlineDB.clear('prescriptions');
    await offlineDB.clear('labTests');
    await offlineDB.clear('pharmacyOrders');
    await offlineDB.clear('pendingSync');
    setPendingSyncCount(0);
  }, []);

  return {
    isOnline,
    isSyncing,
    lastSyncTime,
    pendingSyncCount,
    saveOffline,
    getOfflineData,
    syncData,
    clearOfflineData,
  };
}

// Simple localStorage fallback for basic data
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}
