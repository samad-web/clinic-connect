import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Clock, 
  FileText, 
  Calendar,
  ChevronRight,
  Bell,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Demo data
const todayQueue = [
  {
    id: '1',
    patientName: 'Ramesh Kumar',
    patientId: 'P12345',
    time: '10:30 AM',
    type: 'in-person',
    status: 'waiting' as const,
    tokenNumber: 12,
  },
  {
    id: '2',
    patientName: 'Lakshmi Devi',
    patientId: 'P12346',
    time: '10:45 AM',
    type: 'online',
    status: 'in-consultation' as const,
    tokenNumber: 13,
  },
  {
    id: '3',
    patientName: 'Suresh Babu',
    patientId: 'P12347',
    time: '11:00 AM',
    type: 'in-person',
    status: 'waiting' as const,
    tokenNumber: 14,
  },
];

export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-doctor px-4 pt-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-primary-foreground/80 text-sm">{getGreeting()}</p>
            <h1 className="text-xl font-heading font-bold text-primary-foreground">
              {user?.name || 'Doctor'}
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
            title="Today's Patients"
            value="18"
            icon={<Users className="h-5 w-5 text-primary-foreground" />}
            variant="primary"
          />
          <StatCard
            title="In Queue"
            value="6"
            icon={<Clock className="h-5 w-5 text-primary-foreground" />}
            variant="info"
          />
          <StatCard
            title="Completed"
            value="12"
            icon={<CheckCircle2 className="h-5 w-5" />}
            variant="default"
          />
          <StatCard
            title="Prescriptions"
            value="12"
            icon={<FileText className="h-5 w-5" />}
            variant="default"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 mt-6 space-y-6">
        {/* Today's Queue */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-semibold text-base">Today's Queue</h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs h-8">
              View All <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {todayQueue.map((patient) => (
              <Card 
                key={patient.id} 
                className={`shadow-card hover:shadow-card-lg transition-shadow ${
                  patient.status === 'in-consultation' ? 'ring-2 ring-info' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        patient.status === 'in-consultation' 
                          ? 'bg-info text-info-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        #{patient.tokenNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-sm">{patient.patientName}</h3>
                          {patient.status === 'in-consultation' && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-info/10 text-info">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {patient.patientId} • {patient.time}
                        </p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant={patient.status === 'in-consultation' ? 'default' : 'outline'}
                      className="h-8"
                    >
                      {patient.status === 'in-consultation' ? 'Continue' : 'Start'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="font-heading font-semibold text-base mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card className="shadow-card">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">New Prescription</p>
                  <p className="text-xs text-muted-foreground">Create manually</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Calendar className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium text-sm">My Schedule</p>
                  <p className="text-xs text-muted-foreground">View & manage</p>
                </div>
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
