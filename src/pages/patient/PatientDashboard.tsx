import { useAuth } from '@/contexts/AuthContext';
import { QuickAction } from '@/components/ui/quick-action';
import { StatusBadge } from '@/components/ui/status-badge';
import { OfflineBadge } from '@/components/OfflineIndicator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Pill, 
  FlaskConical, 
  Activity, 
  Heart,
  Clock,
  Video,
  ChevronRight,
  Bell,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Demo data
const upcomingAppointments = [
  {
    id: '1',
    doctorName: 'Dr. Priya Sharma',
    specialization: 'General Medicine',
    date: '30 Jan 2026',
    time: '10:30 AM',
    type: 'in-person' as const,
    status: 'confirmed' as const,
  },
  {
    id: '2',
    doctorName: 'Dr. Arun Kumar',
    specialization: 'Dermatologist',
    date: '02 Feb 2026',
    time: '3:00 PM',
    type: 'online' as const,
    status: 'pending' as const,
  },
];

const recentPrescriptions = [
  {
    id: '1',
    doctorName: 'Dr. Priya Sharma',
    date: '25 Jan 2026',
    medicines: 3,
    diagnosis: 'Viral Fever',
  },
];

export default function PatientDashboard() {
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
      <div className="gradient-patient px-4 pt-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-primary-foreground/80 text-sm">{getGreeting()}</p>
            <h1 className="text-xl font-heading font-bold text-primary-foreground">
              {user?.name || 'Patient'}
            </h1>
            <div className="mt-1">
              <OfflineBadge />
            </div>
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

      {/* Quick Actions - overlapping header */}
      <div className="px-4 -mt-6">
        <Card className="shadow-card-lg border-0">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-3">
              <QuickAction 
                icon={<Calendar className="h-5 w-5" />}
                label="Book"
                variant="primary"
                onClick={() => navigate('/patient/appointments/book')}
              />
              <QuickAction 
                icon={<Video className="h-5 w-5" />}
                label="Consult"
                variant="info"
                onClick={() => navigate('/patient/appointments/book?type=online')}
              />
              <QuickAction 
                icon={<Pill className="h-5 w-5" />}
                label="Pharmacy"
                variant="success"
                onClick={() => navigate('/patient/pharmacy')}
              />
              <QuickAction
                icon={<FlaskConical className="h-5 w-5" />}
                label="Lab Test"
                variant="warning"
                onClick={() => navigate('/patient/lab')}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="px-4 mt-6 space-y-6">
        {/* Upcoming Appointments */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-semibold text-base">Upcoming Appointments</h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs h-8">
              View All <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {upcomingAppointments.map((apt) => (
              <Card key={apt.id} className="shadow-card hover:shadow-card-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm">{apt.doctorName}</h3>
                        <StatusBadge status={apt.status} />
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{apt.specialization}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {apt.date} • {apt.time}
                        </span>
                        {apt.type === 'online' && (
                          <span className="flex items-center gap-1 text-info">
                            <Video className="h-3 w-3" />
                            Online
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* More Services */}
        <section>
          <h2 className="font-heading font-semibold text-base mb-3">More Services</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card className="shadow-card">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Physiotherapy</p>
                  <p className="text-xs text-muted-foreground">Home visits</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Heart className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-sm">Nursing Care</p>
                  <p className="text-xs text-muted-foreground">At your home</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recent Prescriptions */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-semibold text-base">Recent Prescriptions</h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs h-8">
              View All <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentPrescriptions.map((rx) => (
              <Card key={rx.id} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary">
                      <FileText className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{rx.diagnosis}</p>
                      <p className="text-xs text-muted-foreground">
                        {rx.doctorName} • {rx.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{rx.medicines} medicines</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        Order now →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-8" />
    </div>
  );
}
