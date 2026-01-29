import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  User, 
  Plus, 
  Trash2,
  Save,
  Printer,
  Clock,
  Pill
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  timing: string;
}

// Demo patient
const selectedPatient = {
  id: 'P12345',
  name: 'Ramesh Kumar',
  age: 35,
  gender: 'Male',
  phone: '9876543210',
};

export default function DoctorPrescription() {
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: '1', name: '', dosage: '', frequency: '', duration: '', timing: 'after_food' }
  ]);
  const [instructions, setInstructions] = useState('');
  const [nextVisit, setNextVisit] = useState('');

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      { id: Date.now().toString(), name: '', dosage: '', frequency: '', duration: '', timing: 'after_food' }
    ]);
  };

  const removeMedicine = (id: string) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter(m => m.id !== id));
    }
  };

  const updateMedicine = (id: string, field: keyof Medicine, value: string) => {
    setMedicines(medicines.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="New Prescription" 
        showBack 
        rightAction={
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Printer className="h-4 w-4" />
            </Button>
            <Button size="sm" className="h-9">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        }
      />
      
      <div className="p-4 space-y-4">
        {/* Patient Info */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{selectedPatient.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedPatient.age} yrs, {selectedPatient.gender} • {selectedPatient.id}
                </p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </CardContent>
        </Card>

        {/* Diagnosis */}
        <div className="space-y-2">
          <Label htmlFor="diagnosis">Diagnosis</Label>
          <Textarea
            id="diagnosis"
            placeholder="Enter diagnosis..."
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        {/* Medicines */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Medicines</Label>
            <Button variant="ghost" size="sm" onClick={addMedicine} className="h-8">
              <Plus className="h-4 w-4 mr-1" />
              Add Medicine
            </Button>
          </div>

          {medicines.map((medicine, index) => (
            <Card key={medicine.id} className="shadow-card">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-primary/10">
                      <Pill className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Medicine {index + 1}</span>
                  </div>
                  {medicines.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeMedicine(medicine.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <Input
                  placeholder="Medicine name"
                  value={medicine.name}
                  onChange={(e) => updateMedicine(medicine.id, 'name', e.target.value)}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Dosage (e.g., 500mg)"
                    value={medicine.dosage}
                    onChange={(e) => updateMedicine(medicine.id, 'dosage', e.target.value)}
                  />
                  <Select 
                    value={medicine.frequency}
                    onValueChange={(v) => updateMedicine(medicine.id, 'frequency', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Once daily</SelectItem>
                      <SelectItem value="twice">Twice daily</SelectItem>
                      <SelectItem value="thrice">Thrice daily</SelectItem>
                      <SelectItem value="sos">SOS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Duration (e.g., 5 days)"
                    value={medicine.duration}
                    onChange={(e) => updateMedicine(medicine.id, 'duration', e.target.value)}
                  />
                  <Select 
                    value={medicine.timing}
                    onValueChange={(v) => updateMedicine(medicine.id, 'timing', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Timing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="before_food">Before food</SelectItem>
                      <SelectItem value="after_food">After food</SelectItem>
                      <SelectItem value="with_food">With food</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <Label htmlFor="instructions">Additional Instructions</Label>
          <Textarea
            id="instructions"
            placeholder="Any special instructions for the patient..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="min-h-[60px]"
          />
        </div>

        {/* Next Visit */}
        <div className="space-y-2">
          <Label htmlFor="nextVisit">Next Visit</Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="nextVisit"
              type="date"
              value={nextVisit}
              onChange={(e) => setNextVisit(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1">
            Preview
          </Button>
          <Button className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save Prescription
          </Button>
        </div>
      </div>
    </div>
  );
}
