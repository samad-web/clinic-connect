import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlaskConical, Clock, CheckCircle2, AlertCircle, ChevronRight, TestTube2 } from 'lucide-react';

export default function LabDashboard() {
    const stats = [
        { title: 'Pending Tests', value: '12', icon: <Clock className="h-5 w-5" />, variant: 'warning' as const },
        { title: 'Samples Ready', value: '8', icon: <TestTube2 className="h-5 w-5" />, variant: 'info' as const },
        { title: 'Completed Today', value: '24', icon: <CheckCircle2 className="h-5 w-5" />, variant: 'success' as const },
        { title: 'Urgent', value: '3', icon: <AlertCircle className="h-5 w-5" />, variant: 'warning' as const },
    ];

    return (
        <div className="min-h-screen bg-background pb-8">
            <PageHeader title="Lab Overview" />

            <div className="container-padding space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Tasks */}
                    <Card className="shadow-card border-none rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <FlaskConical className="h-5 w-5 text-primary" />
                                Recent Test Requests
                            </CardTitle>
                            <Button variant="ghost" size="sm" className="text-xs text-primary">View All</Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                                            <TestTube2 className="h-5 w-5 text-warning" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Complete Blood Count</p>
                                            <p className="text-xs text-muted-foreground">Patient: Ramesh Kumar</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Critical Alerts */}
                    <Card className="shadow-card border-none rounded-2xl bg-destructive/5">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-destructive">
                                <AlertCircle className="h-5 w-5" />
                                Critical Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 bg-card rounded-xl border border-destructive/20 shadow-sm">
                                <p className="text-sm font-medium text-destructive">Abnormal HbA1c result</p>
                                <p className="text-xs text-muted-foreground mt-0.5">Patient ID: P-10293 • Pending Review</p>
                            </div>
                            <div className="p-3 bg-card rounded-xl border border-destructive/20 shadow-sm">
                                <p className="text-sm font-medium text-destructive">Stat Electrolytes request</p>
                                <p className="text-xs text-muted-foreground mt-0.5">ER Referral • Due in 20 mins</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
