import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Video, MapPin, Plus, ChevronRight } from 'lucide-react';

interface Appointment {
  id: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  type: 'in-person' | 'online';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  location?: string;
}

// Demo appointments
const appointments: { upcoming: Appointment[]; past: Appointment[] } = {
  upcoming: [
    {
      id: '1',
      doctorName: 'Dr. Priya Sharma',
      specialization: 'General Medicine',
      date: '30 Jan 2026',
      time: '10:30 AM',
      type: 'in-person',
      status: 'confirmed',
      location: 'MedCare+ Clinic, Trichy',
    },
    {
      id: '2',
      doctorName: 'Dr. Arun Kumar',
      specialization: 'Dermatologist',
      date: '02 Feb 2026',
      time: '3:00 PM',
      type: 'online',
      status: 'pending',
    },
  ],
  past: [
    {
      id: '3',
      doctorName: 'Dr. Priya Sharma',
      specialization: 'General Medicine',
      date: '25 Jan 2026',
      time: '11:00 AM',
      type: 'in-person',
      status: 'completed',
      location: 'MedCare+ Clinic, Trichy',
    },
    {
      id: '4',
      doctorName: 'Dr. Kavitha R',
      specialization: 'ENT Specialist',
      date: '15 Jan 2026',
      time: '2:30 PM',
      type: 'in-person',
      status: 'completed',
      location: 'MedCare+ Clinic, Trichy',
    },
  ],
};

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <Card className="shadow-card hover:shadow-card-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-sm">{appointment.doctorName}</h3>
              <StatusBadge status={appointment.status} />
            </div>
            <p className="text-xs text-muted-foreground">{appointment.specialization}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            {appointment.date} • {appointment.time}
          </span>
          {appointment.type === 'online' ? (
            <span className="flex items-center gap-1 text-info">
              <Video className="h-3 w-3" />
              Video Consultation
            </span>
          ) : appointment.location && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {appointment.location}
            </span>
          )}
        </div>

        {appointment.status === 'confirmed' && appointment.type === 'online' && (
          <Button size="sm" className="w-full mt-3 h-9">
            <Video className="h-4 w-4 mr-2" />
            Join Consultation
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function PatientAppointments() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="My Appointments" 
        rightAction={
          <Button size="sm" className="h-9">
            <Plus className="h-4 w-4 mr-1" />
            Book
          </Button>
        }
      />
      
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-3 mt-0">
            {appointments.upcoming.length > 0 ? (
              appointments.upcoming.map((apt) => (
                <AppointmentCard key={apt.id} appointment={apt} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm">No upcoming appointments</p>
                <Button className="mt-4">Book Appointment</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-3 mt-0">
            {appointments.past.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
