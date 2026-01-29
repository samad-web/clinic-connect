import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, Phone, Calendar, ChevronRight, FileText } from 'lucide-react';

// Demo patients
const patients = [
  {
    id: 'P12345',
    name: 'Ramesh Kumar',
    age: 35,
    gender: 'Male',
    phone: '9876543210',
    lastVisit: '25 Jan 2026',
    totalVisits: 5,
  },
  {
    id: 'P12346',
    name: 'Lakshmi Devi',
    age: 42,
    gender: 'Female',
    phone: '9876543211',
    lastVisit: '20 Jan 2026',
    totalVisits: 3,
  },
  {
    id: 'P12347',
    name: 'Suresh Babu',
    age: 28,
    gender: 'Male',
    phone: '9876543212',
    lastVisit: '18 Jan 2026',
    totalVisits: 2,
  },
  {
    id: 'P12348',
    name: 'Meena S',
    age: 55,
    gender: 'Female',
    phone: '9876543213',
    lastVisit: '15 Jan 2026',
    totalVisits: 8,
  },
];

export default function DoctorPatients() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen">
      <PageHeader title="My Patients" />
      
      <div className="p-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        {/* Patient List */}
        <div className="space-y-3">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="shadow-card hover:shadow-card-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm">{patient.name}</h3>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {patient.age} yrs, {patient.gender} • {patient.id}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {patient.phone}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Last: {patient.lastVisit}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        {patient.totalVisits} visits
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1 h-8">
                    View History
                  </Button>
                  <Button size="sm" className="flex-1 h-8">
                    New Prescription
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">No patients found</p>
          </div>
        )}
      </div>
    </div>
  );
}
