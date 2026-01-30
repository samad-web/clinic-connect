import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FlaskConical, Save, Send, Plus, Trash2, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useOfflineStorage } from '@/hooks/useOfflineStorage';

interface ReportParameter {
    id: string;
    name: string;
    value: string;
    unit: string;
    refRange: string;
}

export default function ReportEditor() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const { saveOffline } = useOfflineStorage();

    // Demo data for the selected task
    const [testDetails] = useState({
        patientName: 'Anitha R',
        testName: 'Diabetes Panel',
        date: '30 Jan 2026',
        id: taskId || '123'
    });

    const [parameters, setParameters] = useState<ReportParameter[]>([
        { id: '1', name: 'Fasting Blood Sugar', value: '', unit: 'mg/dL', refRange: '70 - 100' },
        { id: '2', name: 'Post Prandial Blood Sugar', value: '', unit: 'mg/dL', refRange: '< 140' },
        { id: '3', name: 'HbA1c', value: '', unit: '%', refRange: '4.0 - 5.6' },
    ]);

    const [notes, setNotes] = useState('');

    const handleValueChange = (id: string, value: string) => {
        setParameters(prev => prev.map(p => p.id === id ? { ...p, value } : p));
    };

    const addParameter = () => {
        const newId = (parameters.length + 1).toString();
        setParameters([...parameters, { id: newId, name: '', value: '', unit: '', refRange: '' }]);
    };

    const removeParameter = (id: string) => {
        setParameters(parameters.filter(p => p.id !== id));
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        toast({
            title: "Draft Saved",
            description: "Report parameters have been saved as a draft.",
        });
    };

    const handlePublish = async () => {
        setIsPublishing(true);

        const reportData = {
            id: testDetails.id,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            testName: testDetails.testName,
            patientName: testDetails.patientName,
            status: 'completed',
            labName: 'Royal Pharmacy Lab',
            parameters,
            notes
        };

        const success = await saveOffline('labTests', reportData);

        setIsPublishing(false);

        if (success) {
            toast({
                title: "Report Published",
                description: "Laboratory report is now available for the patient.",
            });
            navigate('/lab/tasks');
        } else {
            toast({
                title: "Error",
                description: "Failed to publish report. Please try again.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen bg-background pb-8">
            <PageHeader
                title="Report Editor"
                showBack
                backPath="/lab/tasks"
            />

            <div className="container-padding space-y-6">
                {/* Task Info */}
                <Card className="shadow-card border-none bg-primary/5 rounded-2xl">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                                    <FlaskConical className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold font-heading">{testDetails.testName}</h2>
                                    <p className="text-sm text-muted-foreground">Patient: {testDetails.patientName} • ID: {testDetails.id}</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="w-fit bg-background">Processing Mode</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Parameters Editor */}
                <Card className="shadow-card border-none rounded-2xl overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-4 border-b border-border/50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-semibold">Test Parameters</CardTitle>
                            <Button variant="outline" size="sm" onClick={addParameter} className="gap-2 rounded-lg">
                                <Plus className="h-4 w-4" /> Add Parameter
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/10 text-muted-foreground border-b border-border/50">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Parameter Name</th>
                                        <th className="px-6 py-4 font-semibold">Result Value</th>
                                        <th className="px-6 py-4 font-semibold">Unit</th>
                                        <th className="px-6 py-4 font-semibold">Reference Range</th>
                                        <th className="px-6 py-4 font-semibold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {parameters.map((param) => (
                                        <tr key={param.id} className="hover:bg-muted/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <Input
                                                    value={param.name}
                                                    onChange={(e) => setParameters(prev => prev.map(p => p.id === param.id ? { ...p, name: e.target.value } : p))}
                                                    className="h-9 rounded-lg border-none bg-transparent hover:bg-muted/30 focus:bg-muted/30 transition-colors"
                                                    placeholder="e.g. Hemoglobin"
                                                />
                                            </td>
                                            <td className="px-6 py-4 w-32">
                                                <Input
                                                    value={param.value}
                                                    onChange={(e) => handleValueChange(param.id, e.target.value)}
                                                    className="h-9 rounded-lg border-primary/20 focus:ring-primary/30"
                                                    placeholder="0.0"
                                                />
                                            </td>
                                            <td className="px-6 py-4 w-24">
                                                <Input
                                                    value={param.unit}
                                                    onChange={(e) => setParameters(prev => prev.map(p => p.id === param.id ? { ...p, unit: e.target.value } : p))}
                                                    className="h-9 rounded-lg border-none bg-transparent"
                                                    placeholder="mg/dL"
                                                />
                                            </td>
                                            <td className="px-6 py-4 w-40">
                                                <Input
                                                    value={param.refRange}
                                                    onChange={(e) => setParameters(prev => prev.map(p => p.id === param.id ? { ...p, refRange: e.target.value } : p))}
                                                    className="h-9 rounded-lg border-none bg-transparent"
                                                    placeholder="0 - 100"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="icon" onClick={() => removeParameter(param.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Notes & Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <Card className="shadow-card border-none rounded-2xl h-full">
                            <CardHeader className="pb-3">
                                <Label className="text-base font-semibold">Clinical Observations / Notes</Label>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    placeholder="Enter any specific clinical observations or remarks..."
                                    className="min-h-[120px] rounded-xl border-muted resize-none focus:ring-primary/20"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <Card className="shadow-card border-none rounded-2xl bg-warning/5">
                            <CardContent className="p-4 flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-warning shrink-0" />
                                <p className="text-xs text-warning-foreground leading-relaxed">
                                    Please double check the values before publishing. Published reports are immediately visible to patients and doctors.
                                </p>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col gap-3">
                            <Button
                                variant="outline"
                                className="w-full h-12 rounded-xl gap-2 border-primary/20 hover:bg-primary/5"
                                onClick={handleSave}
                                disabled={isSaving || isPublishing}
                            >
                                <Save className="h-5 w-5" />
                                {isSaving ? 'Saving...' : 'Save as Draft'}
                            </Button>
                            <Button
                                className="w-full h-12 rounded-xl gap-2 shadow-lg shadow-primary/20"
                                onClick={handlePublish}
                                disabled={isSaving || isPublishing}
                            >
                                <Send className="h-5 w-5" />
                                {isPublishing ? 'Publishing...' : 'Publish Report'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
