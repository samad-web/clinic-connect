import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, FlaskConical, TestTube2, CheckCircle2, MoreVertical, FileEdit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LabTask {
    id: string;
    patientName: string;
    testName: string;
    date: string;
    status: 'pending' | 'collected' | 'processing' | 'completed';
    urgency: 'normal' | 'urgent';
}

const mockTasks: LabTask[] = [
    { id: '1', patientName: 'Ramesh Kumar', testName: 'Complete Blood Count (CBC)', date: '30 Jan 2026', status: 'pending', urgency: 'normal' },
    { id: '2', patientName: 'Anitha R', testName: 'Diabetes Panel', date: '30 Jan 2026', status: 'collected', urgency: 'urgent' },
    { id: '3', patientName: 'Suresh M', testName: 'Lipid Profile', date: '29 Jan 2026', status: 'processing', urgency: 'normal' },
    { id: '4', patientName: 'Kavitha S', testName: 'Thyroid Profile', date: '29 Jan 2026', status: 'completed', urgency: 'normal' },
];

export default function LabTasks() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [tasks, setTasks] = useState(mockTasks);

    const filteredTasks = tasks.filter(task =>
        task.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.testName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: LabTask['status']) => {
        switch (status) {
            case 'pending': return 'bg-warning/10 text-warning border-warning/20';
            case 'collected': return 'bg-info/10 text-info border-info/20';
            case 'processing': return 'bg-primary/10 text-primary border-primary/20';
            case 'completed': return 'bg-success/10 text-success border-success/20';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    return (
        <div className="min-h-screen bg-background pb-8">
            <PageHeader title="Test Tasks" />

            <div className="container-padding space-y-6">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search patients or tests..."
                            className="pl-9 rounded-xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="rounded-xl gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                </div>

                {/* Task List */}
                <div className="grid gap-4">
                    {filteredTasks.map((task) => (
                        <Card key={task.id} className="shadow-card border-none overflow-hidden rounded-2xl group transition-all hover:shadow-card-lg">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row md:items-center">
                                    {/* Status Indicator Bar */}
                                    <div className={cn(
                                        "w-full md:w-1.5 h-1 md:h-20",
                                        task.urgency === 'urgent' ? "bg-destructive" : "bg-primary"
                                    )} />

                                    <div className="flex-1 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className={cn(
                                                "h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
                                                task.status === 'completed' ? "bg-success/10" : "bg-muted"
                                            )}>
                                                {task.status === 'completed' ? (
                                                    <CheckCircle2 className="h-6 w-6 text-success" />
                                                ) : (
                                                    <FlaskConical className="h-6 w-6 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-base">{task.testName}</h3>
                                                    {task.urgency === 'urgent' && (
                                                        <Badge variant="destructive" className="h-5 px-1.5 text-[10px] uppercase tracking-wider">Urgent</Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground">{task.patientName} • {task.date}</p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <Badge className={cn("font-medium", getStatusColor(task.status))} variant="outline">
                                                        {task.status.toUpperCase()}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 self-end md:self-center">
                                            <Button variant="outline" size="sm" className="rounded-lg h-9 gap-2">
                                                <TestTube2 className="h-4 w-4" />
                                                Update Status
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="rounded-lg h-9 gap-2"
                                                disabled={task.status === 'completed'}
                                                onClick={() => navigate(`/lab/tasks/${task.id}/edit`)}
                                            >
                                                <FileEdit className="h-4 w-4" />
                                                Enter Results
                                            </Button>
                                            <Button variant="ghost" size="icon" className="rounded-lg h-9 w-9">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
