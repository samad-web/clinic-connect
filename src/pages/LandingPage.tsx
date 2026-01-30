import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Heart,
  Calendar,
  Pill,
  FlaskConical,
  Shield,
  Clock,
  Users,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  MapPin
} from 'lucide-react';

const features = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Easy Appointments',
    description: 'Book clinic visits or online consultations with just a few taps.',
  },
  {
    icon: <Pill className="h-6 w-6" />,
    title: 'Pharmacy Orders',
    description: 'Order medicines online with home delivery or store pickup.',
  },
  {
    icon: <FlaskConical className="h-6 w-6" />,
    title: 'Lab Testing',
    description: 'Book lab tests with home sample collection or visit our lab.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Secure Records',
    description: 'Access your complete medical history anytime, anywhere.',
  },
];

const benefits = [
  { text: 'No more waiting in queues', icon: <Clock className="h-5 w-5" /> },
  { text: 'All your health records in one place', icon: <CheckCircle2 className="h-5 w-5" /> },
  { text: 'Trusted by 10,000+ patients in Trichy', icon: <Users className="h-5 w-5" /> },
  { text: 'Works offline for uninterrupted access', icon: <Smartphone className="h-5 w-5" /> },
];

const locations = [
  '1 Clinic',
  '6 Pharmacies',
  '1 Lab'
];

export default function LandingPage() {
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-foreground">Royal Pharmacy</span>
              <span className="hidden sm:inline text-xs text-muted-foreground ml-2">Trichy Healthcare</span>
            </div>
          </div>
          <Button onClick={handleCTA} size="sm">
            Start Web Application
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/20" />
        <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              <MapPin className="h-4 w-4" />
              Serving Trichy with {locations.join(' • ')}
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Your Complete Healthcare Companion
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              Book appointments, order medicines, schedule lab tests, and access your medical records all in one simple app.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleCTA}
                className="h-14 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Start Web Application
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              • Works on any device •
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              One platform for all your healthcare needs designed for simplicity and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-card-lg transition-shadow bg-card">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Royal Pharmacy
              </h2>
              <p className="text-muted-foreground text-lg">
                Built for the healthcare needs of Trichy families.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {benefit.icon}
                  </div>
                  <span className="font-medium text-foreground">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of patients and healthcare providers in Trichy who trust Royal Pharmacy for their daily healthcare needs.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={handleCTA}
            className="h-14 px-8 text-base font-semibold"
          >
            Start Web Application
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <span className="font-heading font-semibold text-foreground">Royal Pharmacy</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2026 Royal Pharmacy Trichy. Serving our community with care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
