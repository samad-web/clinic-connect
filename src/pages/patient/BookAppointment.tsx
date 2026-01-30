import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Stethoscope,
  Video,
  MapPin,
  Clock,
  ChevronRight,
  Check,
  Calendar as CalendarIcon,
  Star,
  Search
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { FilterSheet, type FilterOptions } from '@/components/common/FilterSheet';

// Demo doctors
const doctors = [
  {
    id: 'd1',
    name: 'Dr. Priya Sharma',
    specialization: 'General Medicine',
    experience: 12,
    fee: 500,
    rating: 4.8,
    nextAvailable: 'Today',
  },
  {
    id: 'd2',
    name: 'Dr. Arun Kumar',
    specialization: 'Dermatologist',
    experience: 8,
    fee: 700,
    rating: 4.6,
    nextAvailable: 'Tomorrow',
  },
  {
    id: 'd3',
    name: 'Dr. Kavitha R',
    specialization: 'ENT Specialist',
    experience: 15,
    fee: 600,
    rating: 4.9,
    nextAvailable: 'Today',
  },
  {
    id: 'd4',
    name: 'Dr. Mohan S',
    specialization: 'Orthopedic',
    experience: 20,
    fee: 800,
    rating: 4.7,
    nextAvailable: '02 Feb',
  },
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

type Step = 'type' | 'doctor' | 'datetime' | 'confirm';

export default function BookAppointment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'online' ? 'online' : 'in-person';

  const [step, setStep] = useState<Step>('type');
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'online'>(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [symptoms, setSymptoms] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  // Filter doctors
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialization = !filters.category || doctor.specialization === filters.category;

    // Experience filter
    let matchesExperience = true;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(s => parseInt(s.replace('+', '')) || Infinity);
      matchesExperience = doctor.experience >= min && (max === Infinity || doctor.experience <= max);
    }

    // Fee filter  
    let matchesFee = true;
    if (filters.sortBy === 'fee-low' || filters.sortBy === 'fee-high') {
      // Handled in sorting
      matchesFee = true;
    }

    return matchesSearch && matchesSpecialization && matchesExperience;
  }).sort((a, b) => {
    if (filters.sortBy === 'fee-low') return a.fee - b.fee;
    if (filters.sortBy === 'fee-high') return b.fee - a.fee;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const handleNext = () => {
    if (step === 'type') setStep('doctor');
    else if (step === 'doctor' && selectedDoctor) setStep('datetime');
    else if (step === 'datetime' && selectedTime) setStep('confirm');
  };

  const handleBack = () => {
    if (step === 'doctor') setStep('type');
    else if (step === 'datetime') setStep('doctor');
    else if (step === 'confirm') setStep('datetime');
  };

  const handleBooking = async () => {
    setIsBooking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsBooking(false);
    navigate('/patient/appointments', { state: { booked: true } });
  };

  return (
    <div className="min-h-screen pb-6">
      <PageHeader
        title="Book Appointment"
        showBack
        backPath="/patient"
      />

      {/* Progress Steps */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between text-xs">
          {['Type', 'Doctor', 'Date & Time', 'Confirm'].map((label, i) => {
            const stepIndex = ['type', 'doctor', 'datetime', 'confirm'].indexOf(step);
            const isActive = i <= stepIndex;
            return (
              <div key={label} className="flex items-center">
                <div className={cn(
                  'h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium',
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}>
                  {i < stepIndex ? <Check className="h-3 w-3" /> : i + 1}
                </div>
                {i < 3 && (
                  <div className={cn(
                    'w-8 h-0.5 mx-1',
                    i < stepIndex ? 'bg-primary' : 'bg-muted'
                  )} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4">
        {/* Step 1: Consultation Type */}
        {step === 'type' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-heading font-semibold">Select consultation type</h2>

            <button
              onClick={() => setAppointmentType('in-person')}
              className={cn(
                'w-full p-4 rounded-xl border-2 transition-all text-left',
                appointmentType === 'in-person'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">In-Person Visit</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Visit the clinic for physical consultation
                  </p>
                </div>
                {appointmentType === 'in-person' && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
            </button>

            <button
              onClick={() => setAppointmentType('online')}
              className={cn(
                'w-full p-4 rounded-xl border-2 transition-all text-left',
                appointmentType === 'online'
                  ? 'border-info bg-info/5'
                  : 'border-border hover:border-info/50'
              )}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <Video className="h-5 w-5 text-info" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Video Consultation</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Consult from home via video call
                  </p>
                </div>
                {appointmentType === 'online' && (
                  <Check className="h-5 w-5 text-info" />
                )}
              </div>
            </button>

            <Button onClick={handleNext} className="w-full mt-6">
              Continue <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Step 2: Select Doctor */}
        {step === 'doctor' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold">Select Doctor</h2>
              <Button variant="ghost" size="sm" onClick={handleBack}>
                ← Back
              </Button>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search doctors, specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
              <FilterSheet
                filters={filters}
                onFiltersChange={setFilters}
                type="doctor"
              />
            </div>

            <div className="space-y-3">
              {filteredDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className={cn(
                    'shadow-card cursor-pointer transition-all',
                    selectedDoctor?.id === doctor.id && 'ring-2 ring-primary'
                  )}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <Stethoscope className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm">{doctor.name}</h3>
                          <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                            ⭐ {doctor.rating}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{doctor.specialization}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="text-muted-foreground">{doctor.experience} yrs exp</span>
                          <span className="font-medium">₹{doctor.fee}</span>
                          <span className="text-success">Next: {doctor.nextAvailable}</span>
                        </div>
                      </div>
                      {selectedDoctor?.id === doctor.id && (
                        <Check className="h-5 w-5 text-primary shrink-0" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="w-full mt-4"
              disabled={!selectedDoctor}
            >
              Continue <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Step 3: Date & Time */}
        {step === 'datetime' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold">Select Date & Time</h2>
              <Button variant="ghost" size="sm" onClick={handleBack}>
                ← Back
              </Button>
            </div>

            <Card className="shadow-card">
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md w-full"
                />
              </CardContent>
            </Card>

            <div>
              <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Available Slots
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      'py-2 px-3 rounded-lg text-sm font-medium transition-all',
                      selectedTime === time
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm mb-2">Symptoms (Optional)</h3>
              <Textarea
                placeholder="Describe your symptoms..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <Button
              onClick={handleNext}
              className="w-full"
              disabled={!selectedTime}
            >
              Continue <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 'confirm' && selectedDoctor && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold">Confirm Booking</h2>
              <Button variant="ghost" size="sm" onClick={handleBack}>
                ← Back
              </Button>
            </div>

            <Card className="shadow-card-lg">
              <CardContent className="p-4 space-y-4">
                {/* Doctor Info */}
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Stethoscope className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedDoctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.specialization}</p>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <span className="text-sm font-medium flex items-center gap-1">
                      {appointmentType === 'online' ? (
                        <><Video className="h-4 w-4 text-info" /> Video Consultation</>
                      ) : (
                        <><MapPin className="h-4 w-4 text-primary" /> In-Person Visit</>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-medium">
                      {selectedDate?.toLocaleDateString('en-IN', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time</span>
                    <span className="text-sm font-medium">{selectedTime}</span>
                  </div>
                  {appointmentType === 'in-person' && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span className="text-sm font-medium">Royal Pharmacy Clinic, Trichy</span>
                    </div>
                  )}
                </div>

                {/* Payment Summary */}
                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Consultation Fee</span>
                    <span className="text-sm">₹{selectedDoctor.fee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Platform Fee</span>
                    <span className="text-sm">₹25</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-dashed">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-lg">₹{selectedDoctor.fee + 25}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleBooking}
              className="w-full h-12"
              disabled={isBooking}
            >
              {isBooking ? 'Booking...' : `Pay ₹${selectedDoctor.fee + 25} & Confirm`}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By confirming, you agree to our cancellation policy
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
