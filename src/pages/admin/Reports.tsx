import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    BarChart3,
    TrendingUp,
    Users,
    Calendar,
    DollarSign,
    Activity,
    Download,
    Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Reports() {
    const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

    const stats = [
        {
            title: 'Total Revenue',
            value: '₹2,45,670',
            change: '+12.5%',
            trend: 'up' as const,
            icon: DollarSign,
            color: 'text-success'
        },
        {
            title: 'Total Patients',
            value: '1,234',
            change: '+8.2%',
            trend: 'up' as const,
            icon: Users,
            color: 'text-info'
        },
        {
            title: 'Appointments',
            value: '542',
            change: '-3.1%',
            trend: 'down' as const,
            icon: Calendar,
            color: 'text-warning'
        },
        {
            title: 'Active Staff',
            value: '28',
            change: '+2',
            trend: 'up' as const,
            icon: Activity,
            color: 'text-primary'
        },
    ];

    const recentReports = [
        {
            id: 1,
            title: 'Monthly Financial Report',
            type: 'Financial',
            date: '2026-01-30',
            size: '2.4 MB',
            status: 'ready' as const
        },
        {
            id: 2,
            title: 'Patient Visit Analytics',
            type: 'Analytics',
            date: '2026-01-29',
            size: '1.8 MB',
            status: 'ready' as const
        },
        {
            id: 3,
            title: 'Inventory Summary',
            type: 'Inventory',
            date: '2026-01-28',
            size: '890 KB',
            status: 'ready' as const
        },
        {
            id: 4,
            title: 'Staff Performance Report',
            type: 'HR',
            date: '2026-01-27',
            size: '1.2 MB',
            status: 'ready' as const
        },
    ];

    return (
        <div className="min-h-screen bg-background pb-8">
            <PageHeader title="Reports & Analytics" />

            <div className="container-padding space-y-6">
                {/* Period Selector */}
                <div className="flex gap-2">
                    {(['week', 'month', 'year'] as const).map((period) => (
                        <Button
                            key={period}
                            variant={selectedPeriod === period ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedPeriod(period)}
                            className="rounded-lg capitalize"
                        >
                            {period}
                        </Button>
                    ))}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className="shadow-card border-none rounded-2xl">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={cn("h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center", stat.color)}>
                                        <stat.icon className="h-5 w-5" />
                                    </div>
                                    <Badge className={cn(
                                        "border-0",
                                        stat.trend === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                                    )}>
                                        {stat.change}
                                    </Badge>
                                </div>
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recent Reports */}
                <Card className="shadow-card border-none rounded-2xl">
                    <CardHeader className="bg-muted/30">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-primary" />
                                Recent Reports
                            </CardTitle>
                            <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                                <Filter className="h-4 w-4" />
                                Filter
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-muted/20 text-muted-foreground border-b border-border/50">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Report Name</th>
                                        <th className="px-6 py-4 font-semibold">Type</th>
                                        <th className="px-6 py-4 font-semibold">Date</th>
                                        <th className="px-6 py-4 font-semibold">Size</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {recentReports.map((report) => (
                                        <tr key={report.id} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-6 py-4 font-medium">{report.title}</td>
                                            <td className="px-6 py-4">
                                                <Badge className="bg-primary/10 text-primary border-0">
                                                    {report.type}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">{report.date}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{report.size}</td>
                                            <td className="px-6 py-4">
                                                <Badge className="bg-success/10 text-success border-0">
                                                    {report.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="sm" className="gap-2 rounded-lg">
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
