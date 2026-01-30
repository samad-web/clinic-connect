import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Users,
    Calendar,
    Activity,
    Clock,
    ChevronRight,
    Zap,
    Plus,
    Stethoscope
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PhysioDashboard() {
    const stats = [
        { title: 'Today Sessions', value: '8', icon: <Calendar className="h-5 w-5" />, variant: 'primary' as const },
        { title: 'New Referrals', value: '3', icon: <Users className="h-5 w-5" />, variant: 'info' as const },
        { title: 'Active Plans', value: '24', icon: <Activity className="h-5 w-5" />, variant: 'success' as const },
        { title: 'Pending Reports', value: '5', icon: <Clock className="h-5 w-5" />, variant: 'warning' as const },
    ];

    const sessions = [
        { id: '1', patient: 'Murugan G', time: '10:30 AM', type: 'Post-Op Rehab', status: 'ongoing' },
        { id: '2', patient: 'Rani K', time: '11:45 AM', type: 'Back Pain Management', status: 'upcoming' },
        { id: '3', patient: 'Abdul R', time: '02:00 PM', type: 'Sports Injury', status: 'upcoming' },
    ];

    return (
        <div className="min-h-screen bg-background pb-8">
            <PageHeader title="Physiotherapy Overview" />

            <div className="container-padding space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Today's Sessions */}
                    <Card className="lg:col-span-2 shadow-card border-none rounded-3xl overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                Today's Schedule
                            </CardTitle>
                            <Button variant="ghost" size="sm" className="text-primary text-xs font-semibold">
                                Full Schedule
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {sessions.map((session) => (
                                <div key={session.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-border/50 hover:bg-muted/30 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${session.status === 'ongoing' ? 'bg-primary animate-pulse shadow-lg shadow-primary/20' : 'bg-muted'
                                            }`}>
                                            <Zap className={`h-6 w-6 ${session.status === 'ongoing' ? 'text-white' : 'text-muted-foreground'}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base group-hover:text-primary transition-colors">{session.patient}</h3>
                                            <p className="text-xs text-muted-foreground">{session.type} • {session.time}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                                        <Badge variant={session.status === 'ongoing' ? 'default' : 'outline'} className="rounded-lg px-3 py-1 uppercase tracking-wider text-[10px]">
                                            {session.status}
                                        </Badge>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Quick Tasks */}
                    <Card className="shadow-card border-none rounded-3xl bg-primary/5">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Stethoscope className="h-5 w-5 text-primary" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full justify-start h-12 rounded-xl gap-3 text-sm font-medium shadow-sm hover:scale-[1.02] active:scale-95 transition-all">
                                <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                                    <Plus className="h-5 w-5" />
                                </div>
                                New Treatment Plan
                            </Button>
                            <Button variant="outline" className="w-full justify-start h-12 rounded-xl gap-3 text-sm font-medium border-primary/20 hover:bg-primary/5 hover:scale-[1.02] active:scale-95 transition-all">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                                Recall Patients
                            </Button>
                            <Button variant="ghost" className="w-full justify-start h-12 rounded-xl gap-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:scale-[1.02] active:scale-95 transition-all">
                                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                                    <Clock className="h-5 w-5" />
                                </div>
                                Session Logs
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
