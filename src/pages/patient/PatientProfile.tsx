import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  ChevronRight,
  LogOut,
  FileText,
  Settings,
  HelpCircle
} from 'lucide-react';

export default function PatientProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const profileItems = [
    { icon: <FileText className="h-5 w-5" />, label: 'Medical History', href: '/patient/records' },
    { icon: <Heart className="h-5 w-5" />, label: 'Emergency Contacts', href: '#' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: '#' },
    { icon: <HelpCircle className="h-5 w-5" />, label: 'Help & Support', href: '#' },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader title="Profile" />

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <Card className="shadow-card-lg overflow-hidden">
          <div className="gradient-patient p-6 text-center">
            <div className="h-20 w-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-3">
              <User className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="font-heading font-bold text-lg text-primary-foreground">
              {user?.name || 'Patient Name'}
            </h2>
            <p className="text-sm text-primary-foreground/80">Patient ID: P12345</p>
          </div>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>+91 {user?.phone || '9876543210'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user?.email || 'email@example.com'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Trichy, Tamil Nadu</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>DOB: 15 Aug 1990</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <span>Blood Group: B+</span>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card className="shadow-card">
          <CardContent className="p-0">
            {profileItems.map((item, index) => (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${index !== profileItems.length - 1 ? 'border-b border-border' : ''
                  }`}
                onClick={() => item.href !== '#' && navigate(item.href)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground">{item.icon}</div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
