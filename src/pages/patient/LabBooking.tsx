import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  FlaskConical,
  Home,
  Building2,
  Search,
  Clock,
  Check,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Demo lab tests
const labTests = [
  { id: '1', name: 'Complete Blood Count (CBC)', price: 350, duration: '4-6 hours', popular: true },
  { id: '2', name: 'Thyroid Profile (T3, T4, TSH)', price: 650, duration: '24 hours', popular: true },
  { id: '3', name: 'Lipid Profile', price: 450, duration: '12 hours', popular: true },
  { id: '4', name: 'Liver Function Test (LFT)', price: 550, duration: '24 hours', popular: false },
  { id: '5', name: 'Kidney Function Test (KFT)', price: 500, duration: '24 hours', popular: false },
  { id: '6', name: 'Diabetes Panel (FBS, PPBS, HbA1c)', price: 750, duration: '24 hours', popular: true },
  { id: '7', name: 'Vitamin D', price: 900, duration: '24-48 hours', popular: false },
  { id: '8', name: 'Vitamin B12', price: 700, duration: '24-48 hours', popular: false },
  { id: '9', name: 'Urine Routine', price: 150, duration: '2-4 hours', popular: false },
  { id: '10', name: 'Full Body Checkup', price: 2500, duration: '48 hours', popular: true },
];

const timeSlots = [
  '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
  '11:00 AM', '04:00 PM', '05:00 PM', '06:00 PM',
];

type Step = 'tests' | 'type' | 'datetime' | 'confirm';

export default function LabBooking() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('tests');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTests, setSelectedTests] = useState<typeof labTests>([]);
  const [visitType, setVisitType] = useState<'home' | 'lab'>('home');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [address, setAddress] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const filteredTests = labTests.filter(test =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTest = (test: typeof labTests[0]) => {
    if (selectedTests.find(t => t.id === test.id)) {
      setSelectedTests(selectedTests.filter(t => t.id !== test.id));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const subtotal = selectedTests.reduce((sum, test) => sum + test.price, 0);
  const homeVisitCharge = visitType === 'home' ? 100 : 0;
  const total = subtotal + homeVisitCharge;

  const handleNext = () => {
    if (step === 'tests' && selectedTests.length > 0) setStep('type');
    else if (step === 'type') setStep('datetime');
    else if (step === 'datetime' && selectedTime) setStep('confirm');
  };

  const handleBack = () => {
    if (step === 'type') setStep('tests');
    else if (step === 'datetime') setStep('type');
    else if (step === 'confirm') setStep('datetime');
  };

  const handleBooking = async () => {
    setIsBooking(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsBooking(false);
    navigate('/patient/records', { state: { booked: true } });
  };

  return (
    <div className="min-h-screen pb-6">
      <PageHeader
        title="Book Lab Test"
        showBack
        backPath="/patient"
      />

      <div className="px-4">
        {/* Step 1: Select Tests */}
        {step === 'tests' && (
          <div className="space-y-4 animate-fade-in">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Popular Tests */}
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Popular Tests</h3>
              <div className="space-y-2">
                {filteredTests.filter(t => t.popular).map((test) => (
                  <Card
                    key={test.id}
                    className={cn(
                      'shadow-card cursor-pointer transition-all',
                      selectedTests.find(t => t.id === test.id) && 'ring-2 ring-primary bg-primary/5'
                    )}
                    onClick={() => toggleTest(test)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'h-5 w-5 rounded border-2 flex items-center justify-center',
                          selectedTests.find(t => t.id === test.id)
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground'
                        )}>
                          {selectedTests.find(t => t.id === test.id) && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{test.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Report in {test.duration}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">₹{test.price}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Tests */}
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-3">All Tests</h3>
              <div className="space-y-2">
                {filteredTests.filter(t => !t.popular).map((test) => (
                  <Card
                    key={test.id}
                    className={cn(
                      'shadow-card cursor-pointer transition-all',
                      selectedTests.find(t => t.id === test.id) && 'ring-2 ring-primary bg-primary/5'
                    )}
                    onClick={() => toggleTest(test)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'h-5 w-5 rounded border-2 flex items-center justify-center',
                          selectedTests.find(t => t.id === test.id)
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground'
                        )}>
                          {selectedTests.find(t => t.id === test.id) && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{test.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Report in {test.duration}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">₹{test.price}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sticky Cart */}
            {selectedTests.length > 0 && (
              <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto">
                <Card className="shadow-float bg-primary text-primary-foreground">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{selectedTests.length} tests selected</p>
                      <p className="text-xs opacity-80">₹{subtotal}</p>
                    </div>
                    <Button variant="secondary" size="sm" onClick={handleNext}>
                      Continue →
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Visit Type */}
        {step === 'type' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold">Sample Collection</h2>
              <Button variant="ghost" size="sm" onClick={handleBack}>
                ← Back
              </Button>
            </div>

            <button
              onClick={() => setVisitType('home')}
              className={cn(
                'w-full p-4 rounded-xl border-2 transition-all text-left',
                visitType === 'home'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Home Collection</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Our phlebotomist will visit your home
                  </p>
                  <p className="text-xs text-primary mt-1">+ ₹100 home visit charge</p>
                </div>
                {visitType === 'home' && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
            </button>

            <button
              onClick={() => setVisitType('lab')}
              className={cn(
                'w-full p-4 rounded-xl border-2 transition-all text-left',
                visitType === 'lab'
                  ? 'border-warning bg-warning/5'
                  : 'border-border hover:border-warning/50'
              )}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Building2 className="h-5 w-5 text-warning" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Visit Lab</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Visit Royal Pharmacy Lab, Trichy
                  </p>
                  <p className="text-xs text-success mt-1">No extra charges</p>
                </div>
                {visitType === 'lab' && (
                  <Check className="h-5 w-5 text-warning" />
                )}
              </div>
            </button>

            {visitType === 'home' && (
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Home Address</h3>
                <Input
                  placeholder="Enter your complete address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            )}

            <Button onClick={handleNext} className="w-full mt-4">
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
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      'py-2 px-2 rounded-lg text-xs font-medium transition-all',
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
        {step === 'confirm' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold">Confirm Booking</h2>
              <Button variant="ghost" size="sm" onClick={handleBack}>
                ← Back
              </Button>
            </div>

            <Card className="shadow-card-lg">
              <CardContent className="p-4 space-y-4">
                {/* Tests */}
                <div className="pb-4 border-b border-border">
                  <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-warning" />
                    Selected Tests ({selectedTests.length})
                  </h3>
                  <div className="space-y-1">
                    {selectedTests.map(test => (
                      <div key={test.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{test.name}</span>
                        <span>₹{test.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Collection Type</span>
                    <span className="text-sm font-medium flex items-center gap-1">
                      {visitType === 'home' ? (
                        <><Home className="h-4 w-4 text-primary" /> Home Collection</>
                      ) : (
                        <><Building2 className="h-4 w-4 text-warning" /> Lab Visit</>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-medium">
                      {selectedDate?.toLocaleDateString('en-IN', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time</span>
                    <span className="text-sm font-medium">{selectedTime}</span>
                  </div>
                  {visitType === 'lab' && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span className="text-sm font-medium">Royal Pharmacy Lab, Trichy</span>
                    </div>
                  )}
                </div>

                {/* Payment Summary */}
                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="text-sm">₹{subtotal}</span>
                  </div>
                  {visitType === 'home' && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Home Collection</span>
                      <span className="text-sm">₹100</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-dashed">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-lg">₹{total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleBooking}
              className="w-full h-12"
              disabled={isBooking}
            >
              {isBooking ? 'Booking...' : `Pay ₹${total} & Confirm`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
