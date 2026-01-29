import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  Pill, 
  FlaskConical,
  Building2,
  TrendingUp,
  ChevronRight,
  Bell,
  AlertCircle,
  IndianRupee
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Demo data
const branchPerformance = [
  { name: 'Main Clinic', patients: 45, revenue: 125000, type: 'clinic' },
  { name: 'Thillai Nagar Pharmacy', orders: 89, revenue: 78000, type: 'pharmacy' },
  { name: 'Srirangam Pharmacy', orders: 67, revenue: 52000, type: 'pharmacy' },
  { name: 'Central Lab', tests: 34, revenue: 48000, type: 'lab' },
];

const alerts = [
  { id: '1', message: 'Low stock: Paracetamol at Thillai Nagar', type: 'warning' },
  { id: '2', message: '5 pending lab reports for today', type: 'info' },
  { id: '3', message: '3 appointments need confirmation', type: 'info' },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-admin px-4 pt-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-primary-foreground/80 text-sm">Dashboard</p>
            <h1 className="text-xl font-heading font-bold text-primary-foreground">
              MedCare+ Admin
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground hover:bg-primary-foreground/10 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                3
              </span>
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
            title="Today's Patients"
            value="45"
            icon={<Users className="h-5 w-5 text-primary-foreground" />}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Appointments"
            value="32"
            icon={<Calendar className="h-5 w-5 text-primary-foreground" />}
            variant="info"
          />
          <StatCard
            title="Pharmacy Orders"
            value="156"
            icon={<Pill className="h-5 w-5 text-primary-foreground" />}
            variant="success"
          />
          <StatCard
            title="Lab Tests"
            value="34"
            icon={<FlaskConical className="h-5 w-5 text-primary-foreground" />}
            variant="warning"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 mt-6 space-y-6">
        {/* Revenue Card */}
        <Card className="shadow-card-lg border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-success to-success/80 p-4 text-success-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Today's Revenue</p>
                  <p className="text-2xl font-bold font-heading flex items-center">
                    <IndianRupee className="h-5 w-5" />
                    3,03,000
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">vs Yesterday</p>
                  <p className="text-lg font-semibold flex items-center justify-end">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +18%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <section>
          <h2 className="font-heading font-semibold text-base mb-3">Alerts</h2>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`shadow-card ${
                alert.type === 'warning' ? 'border-l-4 border-l-warning' : 'border-l-4 border-l-info'
              }`}>
                <CardContent className="p-3 flex items-center gap-3">
                  <AlertCircle className={`h-4 w-4 shrink-0 ${
                    alert.type === 'warning' ? 'text-warning' : 'text-info'
                  }`} />
                  <p className="text-sm">{alert.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Branch Performance */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-semibold text-base">Branch Performance</h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs h-8">
              View All <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {branchPerformance.map((branch, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        branch.type === 'clinic' 
                          ? 'bg-primary/10' 
                          : branch.type === 'pharmacy' 
                            ? 'bg-success/10' 
                            : 'bg-warning/10'
                      }`}>
                        {branch.type === 'clinic' ? (
                          <Building2 className="h-5 w-5 text-primary" />
                        ) : branch.type === 'pharmacy' ? (
                          <Pill className="h-5 w-5 text-success" />
                        ) : (
                          <FlaskConical className="h-5 w-5 text-warning" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{branch.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {branch.type === 'clinic' && `${branch.patients} patients today`}
                          {branch.type === 'pharmacy' && `${branch.orders} orders today`}
                          {branch.type === 'lab' && `${branch.tests} tests today`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm flex items-center justify-end">
                        <IndianRupee className="h-3 w-3" />
                        {(branch.revenue / 1000).toFixed(0)}K
                      </p>
                      <p className="text-xs text-success">Revenue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="font-heading font-semibold text-base mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className="p-2 rounded-lg bg-primary/10 mx-auto w-fit mb-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs font-medium">Staff</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className="p-2 rounded-lg bg-success/10 mx-auto w-fit mb-2">
                  <Pill className="h-5 w-5 text-success" />
                </div>
                <p className="text-xs font-medium">Inventory</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className="p-2 rounded-lg bg-info/10 mx-auto w-fit mb-2">
                  <TrendingUp className="h-5 w-5 text-info" />
                </div>
                <p className="text-xs font-medium">Reports</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-8" />
    </div>
  );
}
