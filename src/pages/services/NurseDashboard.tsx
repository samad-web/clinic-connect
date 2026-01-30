import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Home,
    ClipboardCheck,
    Stethoscope,
    Droplets,
    AlertCircle,
    Clock,
    ChevronRight,
    UserPlus
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function NurseDashboard() {
    const stats = [
        { title: 'Home Visits', value: '5', icon: <Home className="h-5 w-5" />, variant: 'primary' as const },
        { title: 'Tasks Done', value: '12', icon: <ClipboardCheck className="h-5 w-5" />, variant: 'success' as const },
        { title: 'Medications', value: '45', icon: <Droplets className="h-5 w-5" />, variant: 'info' as const },
        { title: 'Alerts', value: '2', icon: <AlertCircle className="h-5 w-5" />, variant: 'warning' as const },
    ];

    const visits = [
        { id: '1', patient: 'Mrs. Jayanthi', time: '09:00 AM', task: 'Dressing & Insulin', status: 'completed' },
        { id: '2', patient: 'Mr. Subramani', time: '11:30 AM', task: 'Vital Monitoring', status: 'ongoing' },
        { id: '3', patient: 'Karthik P', time: '01:00 PM', task: 'Injection (Vaccination)', status: 'upcoming' },
    ];

    return (
        <div className="min-h-screen bg-background pb-8">
            <PageHeader title="Nursing Overview" />

            <div className="container-padding space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Active Tasks/Visits */}
                    <Card className="lg:col-span-2 shadow-card border-none rounded-3xl overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <ClipboardCheck className="h-5 w-5 text-primary" />
                                Active Nursing Tasks
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {visits.map((visit) => (
                                <div key={visit.id} className="p-4 rounded-2xl border border-border/50 hover:bg-muted/30 transition-all cursor-pointer flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${visit.status === 'ongoing' ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-muted'
                                            }`}>
                                            <Stethoscope className={`h-6 w-6 ${visit.status === 'ongoing' ? 'text-white' : 'text-muted-foreground'}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base group-hover:text-primary transition-colors">{visit.patient}</h3>
                                            <p className="text-xs text-muted-foreground">{visit.task} • {visit.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge className={`rounded-lg px-2 text-[10px] uppercase font-bold tracking-widest ${visit.status === 'completed' ? 'bg-success/10 text-success border-success/20' :
                                                visit.status === 'ongoing' ? 'bg-primary text-white border-none' :
                                                    'bg-muted text-muted-foreground'
                                            }`}>
                                            {visit.status}
                                        </Badge>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Quick Tools */}
                    <div className="space-y-4">
                        <Card className="shadow-card border-none rounded-3xl bg-success/5">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-bold flex items-center gap-2">
                                    <Droplets className="h-5 w-5 text-success" />
                                    Medicines Due
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="p-3 bg-white/50 rounded-xl border border-success/20 flex items-center justify-between">
                                        <span className="text-xs font-semibold">Insulin (7 patients)</span>
                                        <Badge variant="outline" className="text-[10px] bg-white">09:00 AM</Badge>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full text-xs font-bold border-success/20 text-success rounded-lg">
                                        Mark All Given
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Button className="w-full h-14 rounded-2xl gap-3 text-sm font-bold shadow-lg shadow-primary/20">
                            <UserPlus className="h-5 w-5" />
                            New Home Visit Request
                        </Button>

                        <Card className="shadow-card-lg border-none rounded-2xl bg-destructive overflow-hidden text-white">
                            <CardContent className="p-4 flex items-center gap-3">
                                <AlertCircle className="h-8 w-8 opacity-50" />
                                <div>
                                    <p className="text-[10px] uppercase font-bold opacity-70">Critical Alert</p>
                                    <p className="text-sm font-bold leading-tight">Emergency Home Call from B-6</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
