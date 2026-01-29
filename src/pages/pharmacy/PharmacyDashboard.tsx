import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  FileText, 
  AlertTriangle,
  Truck,
  ChevronRight,
  Bell,
  IndianRupee
} from 'lucide-react';

// Demo data
const pendingOrders = [
  {
    id: 'ORD001',
    patientName: 'Ramesh Kumar',
    items: 3,
    total: 450,
    status: 'pending' as const,
    type: 'pickup',
    time: '10 mins ago',
  },
  {
    id: 'ORD002',
    patientName: 'Lakshmi Devi',
    items: 5,
    total: 890,
    status: 'confirmed' as const,
    type: 'delivery',
    time: '25 mins ago',
  },
  {
    id: 'ORD003',
    patientName: 'Suresh Babu',
    items: 2,
    total: 220,
    status: 'ready' as const,
    type: 'pickup',
    time: '45 mins ago',
  },
];

const lowStockItems = [
  { name: 'Paracetamol 500mg', stock: 15, threshold: 50 },
  { name: 'Cetirizine 10mg', stock: 8, threshold: 30 },
  { name: 'Omeprazole 20mg', stock: 12, threshold: 40 },
];

export default function PharmacyDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-pharmacy px-4 pt-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-primary-foreground/80 text-sm">Pharmacy</p>
            <h1 className="text-xl font-heading font-bold text-primary-foreground">
              Thillai Nagar Branch
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={logout}
              className="text-primary-foreground hover:bg-primary-foreground/10 text-xs"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 -mt-6">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            title="Today's Orders"
            value="89"
            icon={<FileText className="h-5 w-5 text-primary-foreground" />}
            variant="success"
          />
          <StatCard
            title="Pending"
            value="12"
            icon={<Package className="h-5 w-5 text-primary-foreground" />}
            variant="warning"
          />
          <StatCard
            title="Low Stock Items"
            value="8"
            icon={<AlertTriangle className="h-5 w-5" />}
            variant="default"
          />
          <StatCard
            title="Deliveries"
            value="15"
            icon={<Truck className="h-5 w-5" />}
            variant="default"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 mt-6 space-y-6">
        {/* Pending Orders */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-semibold text-base">Pending Orders</h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs h-8">
              View All <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {pendingOrders.map((order) => (
              <Card key={order.id} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm">{order.id}</h3>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {order.patientName} • {order.items} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm flex items-center justify-end">
                        <IndianRupee className="h-3 w-3" />
                        {order.total}
                      </p>
                      <p className="text-xs text-muted-foreground">{order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.type === 'delivery' 
                        ? 'bg-info/10 text-info' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {order.type === 'delivery' ? '🚚 Delivery' : '🏪 Pickup'}
                    </span>
                    <Button size="sm" className="h-7 text-xs">
                      {order.status === 'pending' ? 'Accept' : order.status === 'confirmed' ? 'Prepare' : 'Complete'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Low Stock Alert */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-semibold text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Low Stock Alert
            </h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs h-8">
              Reorder <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          
          <Card className="shadow-card">
            <CardContent className="p-0 divide-y divide-border">
              {lowStockItems.map((item, index) => (
                <div key={index} className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Threshold: {item.threshold} units
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-destructive">{item.stock} left</p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                      Reorder
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-8" />
    </div>
  );
}
