import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Stethoscope, 
  Building2, 
  Pill, 
  FlaskConical, 
  Activity, 
  Heart,
  Shield,
  Phone,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoleOption {
  role: UserRole;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const roleOptions: RoleOption[] = [
  { 
    role: 'patient', 
    label: 'Patient', 
    icon: <User className="h-6 w-6" />,
    description: 'Book appointments & order medicines',
    color: 'gradient-patient'
  },
  { 
    role: 'doctor', 
    label: 'Doctor', 
    icon: <Stethoscope className="h-6 w-6" />,
    description: 'Manage consultations & prescriptions',
    color: 'gradient-doctor'
  },
  { 
    role: 'clinic_staff', 
    label: 'Clinic Staff', 
    icon: <Building2 className="h-6 w-6" />,
    description: 'Manage appointments & patients',
    color: 'bg-secondary'
  },
  { 
    role: 'pharmacy_staff', 
    label: 'Pharmacy', 
    icon: <Pill className="h-6 w-6" />,
    description: 'Inventory & order management',
    color: 'gradient-pharmacy'
  },
  { 
    role: 'lab_staff', 
    label: 'Lab Staff', 
    icon: <FlaskConical className="h-6 w-6" />,
    description: 'Manage tests & reports',
    color: 'gradient-lab'
  },
  { 
    role: 'physiotherapist', 
    label: 'Physiotherapy', 
    icon: <Activity className="h-6 w-6" />,
    description: 'Manage therapy sessions',
    color: 'bg-secondary'
  },
  { 
    role: 'nurse', 
    label: 'Nursing', 
    icon: <Heart className="h-6 w-6" />,
    description: 'Home care services',
    color: 'bg-secondary'
  },
  { 
    role: 'admin', 
    label: 'Admin', 
    icon: <Shield className="h-6 w-6" />,
    description: 'Full system management',
    color: 'gradient-admin'
  },
];

export default function LoginPage() {
  const [step, setStep] = useState<'role' | 'phone' | 'otp'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('phone');
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep('otp');
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    setIsLoading(true);
    const success = await login(phone, otp, selectedRole);
    setIsLoading(false);
    
    if (success) {
      // Navigate based on role
      const roleRoutes: Record<UserRole, string> = {
        patient: '/patient',
        doctor: '/doctor',
        clinic_staff: '/clinic',
        pharmacy_staff: '/pharmacy',
        lab_staff: '/lab',
        physiotherapist: '/services',
        nurse: '/services',
        admin: '/admin',
      };
      navigate(roleRoutes[selectedRole]);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-patient p-6 pb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Heart className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-primary-foreground">MedCare+</h1>
              <p className="text-xs text-primary-foreground/80">Trichy Healthcare</p>
            </div>
          </div>
          <p className="text-primary-foreground/90 text-sm">
            Your complete healthcare companion for clinic visits, pharmacy orders, lab tests & more
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 -mt-4 bg-background rounded-t-2xl">
        <div className="max-w-md mx-auto p-4">
          {step === 'role' && (
            <div className="animate-fade-in">
              <h2 className="font-heading font-semibold text-lg mb-4">Select your role</h2>
              <div className="grid grid-cols-2 gap-3">
                {roleOptions.map((option) => (
                  <button
                    key={option.role}
                    onClick={() => handleRoleSelect(option.role)}
                    className={cn(
                      'p-4 rounded-xl border border-border bg-card text-left transition-all',
                      'hover:border-primary/50 hover:shadow-card-lg',
                      'active:scale-[0.98]'
                    )}
                  >
                    <div className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center mb-3 text-primary-foreground',
                      option.color
                    )}>
                      {option.icon}
                    </div>
                    <p className="font-medium text-sm text-foreground">{option.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'phone' && (
            <Card className="animate-fade-in border-0 shadow-none">
              <CardHeader className="px-0">
                <button 
                  onClick={() => setStep('role')}
                  className="text-sm text-primary mb-2 flex items-center gap-1"
                >
                  ← Change role
                </button>
                <CardTitle className="font-heading">Enter your phone number</CardTitle>
                <CardDescription>We'll send you an OTP to verify</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="pl-10 h-12 text-lg"
                      autoFocus
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-medium"
                    disabled={phone.length !== 10}
                  >
                    Send OTP
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 'otp' && (
            <Card className="animate-fade-in border-0 shadow-none">
              <CardHeader className="px-0">
                <button 
                  onClick={() => setStep('phone')}
                  className="text-sm text-primary mb-2 flex items-center gap-1"
                >
                  ← Change number
                </button>
                <CardTitle className="font-heading">Enter OTP</CardTitle>
                <CardDescription>Sent to +91 {phone}</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="pl-10 h-12 text-lg tracking-widest"
                      autoFocus
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-medium"
                    disabled={otp.length !== 6 || isLoading}
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Login'}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Didn't receive OTP? <button type="button" className="text-primary font-medium">Resend</button>
                  </p>
                </form>
                
                {/* Demo hint */}
                <div className="mt-6 p-3 bg-secondary rounded-lg">
                  <p className="text-xs text-secondary-foreground">
                    <strong>Demo:</strong> Enter any 6 digits to login as {selectedRole?.replace('_', ' ')}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
