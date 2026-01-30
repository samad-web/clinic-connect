import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, FlaskConical, Download, Eye, ChevronRight, Calendar } from 'lucide-react';
import { useOfflineStorage } from '@/hooks/useOfflineStorage';

// Demo records
const prescriptions = [
  {
    id: '1',
    date: '25 Jan 2026',
    doctorName: 'Dr. Priya Sharma',
    diagnosis: 'Viral Fever',
    medicines: ['Paracetamol 500mg', 'Vitamin C', 'Antihistamine'],
  },
  {
    id: '2',
    date: '15 Jan 2026',
    doctorName: 'Dr. Kavitha R',
    diagnosis: 'Throat Infection',
    medicines: ['Amoxicillin 250mg', 'Throat Lozenges'],
  },
  {
    id: '3',
    date: '02 Jan 2026',
    doctorName: 'Dr. Priya Sharma',
    diagnosis: 'Annual Checkup',
    medicines: ['Multivitamins'],
  },
];

const labReports = [
  {
    id: '1',
    date: '20 Jan 2026',
    testName: 'Complete Blood Count (CBC)',
    status: 'completed' as const,
    labName: 'Royal Pharmacy Lab',
  },
  {
    id: '2',
    date: '15 Jan 2026',
    testName: 'Thyroid Profile',
    status: 'completed' as const,
    labName: 'Royal Pharmacy Lab',
  },
  {
    id: '3',
    date: '28 Jan 2026',
    testName: 'Lipid Profile',
    status: 'pending' as const,
    labName: 'Royal Pharmacy Lab',
  },
];

export default function PatientRecords() {
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [records, setRecords] = useState(labReports);
  const { getOfflineData } = useOfflineStorage();

  useEffect(() => {
    const loadRecords = async () => {
      const offlineReports = await getOfflineData<any>('labTests');
      if (offlineReports.length > 0) {
        // Merge offline reports with demo reports, avoidance duplicates by ID
        const combined = [...offlineReports];
        labReports.forEach(demo => {
          if (!combined.find(r => r.id === demo.id)) {
            combined.push(demo);
          }
        });
        setRecords(combined);
      }
    };
    loadRecords();
  }, [getOfflineData]);

  return (
    <div className="min-h-screen">
      <PageHeader title="Medical Records" />

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="lab-reports">Lab Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions" className="space-y-3 mt-0">
            {prescriptions.map((rx) => (
              <Card key={rx.id} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary shrink-0">
                      <FileText className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm">{rx.diagnosis}</h3>
                        <span className="text-xs text-muted-foreground">{rx.date}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{rx.doctorName}</p>
                      <div className="flex flex-wrap gap-1">
                        {rx.medicines.slice(0, 2).map((med, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
                          >
                            {med}
                          </span>
                        ))}
                        {rx.medicines.length > 2 && (
                          <span className="px-2 py-0.5 text-xs text-primary">
                            +{rx.medicines.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                    <Button variant="outline" size="sm" className="flex-1 h-8">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 h-8">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" className="flex-1 h-8">
                      Order Meds
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="lab-reports" className="space-y-3 mt-0">
            {records.map((report) => (
              <Card key={report.id} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-warning/10 shrink-0">
                      <FlaskConical className="h-5 w-5 text-warning" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm">{report.testName}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${report.status === 'completed'
                          ? 'bg-success/10 text-success'
                          : 'bg-warning/10 text-warning'
                          }`}>
                          {report.status === 'completed' ? 'Ready' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{report.labName}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {report.date}
                      </p>
                    </div>
                  </div>
                  {report.status === 'completed' && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                      <Button variant="outline" size="sm" className="flex-1 h-8">
                        <Eye className="h-3 w-3 mr-1" />
                        View Report
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 h-8">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
