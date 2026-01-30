import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Package,
    CheckCircle2,
    Truck,
    Clock,
    MapPin,
    Phone,
    Calendar,
    FlaskConical
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Demo orders
const medicineOrders = [
    {
        id: 'ORD001',
        date: '30 Jan 2026',
        items: 3,
        total: 450,
        status: 'delivered' as const,
        deliveryType: 'home',
        timeline: [
            { step: 'Ordered', time: '10:30 AM', completed: true },
            { step: 'Confirmed', time: '10:35 AM', completed: true },
            { step: 'Packed', time: '11:00 AM', completed: true },
            { step: 'Out for Delivery', time: '2:00 PM', completed: true },
            { step: 'Delivered', time: '3:30 PM', completed: true },
        ],
    },
    {
        id: 'ORD002',
        date: '30 Jan 2026',
        items: 2,
        total: 220,
        status: 'out_for_delivery' as const,
        deliveryType: 'home',
        estimatedTime: '4:00 PM',
        timeline: [
            { step: 'Ordered', time: '11:00 AM', completed: true },
            { step: 'Confirmed', time: '11:05 AM', completed: true },
            { step: 'Packed', time: '12:30 PM', completed: true },
            { step: 'Out for Delivery', time: '3:00 PM', completed: true },
            { step: 'Delivered', time: 'Arriving soon', completed: false },
        ],
    },
];

const labOrders = [
    {
        id: 'LAB001',
        date: '29 Jan 2026',
        testName: 'Complete Blood Count (CBC)',
        status: 'ready' as const,
        collectionType: 'lab',
        timeline: [
            { step: 'Booked', time: '10:00 AM', completed: true },
            { step: 'Sample Collected', time: '10:30 AM', completed: true },
            { step: 'Processing', time: '11:00 AM', completed: true },
            { step: 'Report Ready', time: '4:00 PM', completed: true },
        ],
    },
    {
        id: 'LAB002',
        date: '30 Jan 2026',
        testName: 'Thyroid Profile',
        status: 'processing' as const,
        collectionType: 'home',
        estimatedReady: '31 Jan, 5:00 PM',
        timeline: [
            { step: 'Booked', time: '8:00 AM', completed: true },
            { step: 'Sample Collected', time: '9:30 AM', completed: true },
            { step: 'Processing', time: '10:00 AM', completed: true },
            { step: 'Report Ready', time: 'Tomorrow', completed: false },
        ],
    },
];

type OrderStatus = 'ordered' | 'confirmed' | 'packed' | 'out_for_delivery' | 'delivered' | 'booked' | 'collected' | 'processing' | 'ready';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case 'delivered':
        case 'ready':
            return 'bg-success/10 text-success border-success/20';
        case 'out_for_delivery':
        case 'processing':
            return 'bg-info/10 text-info border-info/20';
        case 'packed':
        case 'collected':
            return 'bg-warning/10 text-warning border-warning/20';
        default:
            return 'bg-muted text-muted-foreground border-border';
    }
};

const getStatusText = (status: OrderStatus) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function OrderTracking() {
    return (
        <div className="min-h-screen pb-6">
            <PageHeader
                title="Track Orders"
                showBack
                backPath="/patient"
            />

            <div className="px-4">
                <Tabs defaultValue="medicine">
                    <TabsList className="w-full grid grid-cols-2 mb-4">
                        <TabsTrigger value="medicine">Medicine</TabsTrigger>
                        <TabsTrigger value="lab">Lab Tests</TabsTrigger>
                    </TabsList>

                    {/* Medicine Orders */}
                    <TabsContent value="medicine" className="space-y-4 mt-0">
                        {medicineOrders.map((order) => (
                            <Card key={order.id} className="shadow-card">
                                <CardContent className="p-4">
                                    {/* Order Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="font-medium text-sm">{order.id}</p>
                                            <p className="text-xs text-muted-foreground">{order.date}</p>
                                        </div>
                                        <Badge className={cn('border', getStatusColor(order.status))}>
                                            {getStatusText(order.status)}
                                        </Badge>
                                    </div>

                                    {/* Order Details */}
                                    <div className="flex items-center justify-between py-3 border-y border-border">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Package className="h-4 w-4 text-muted-foreground" />
                                            <span>{order.items} items</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="font-semibold">₹{order.total}</span>
                                        </div>
                                    </div>

                                    {/* Timeline */}
                                    <div className="mt-4 space-y-3">
                                        {order.timeline.map((step, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="relative">
                                                    <div
                                                        className={cn(
                                                            'h-6 w-6 rounded-full border-2 flex items-center justify-center',
                                                            step.completed
                                                                ? 'bg-primary border-primary'
                                                                : 'bg-background border-muted-foreground'
                                                        )}
                                                    >
                                                        {step.completed && (
                                                            <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                                                        )}
                                                    </div>
                                                    {index < order.timeline.length - 1 && (
                                                        <div
                                                            className={cn(
                                                                'absolute left-[11px] top-6 w-0.5 h-6',
                                                                step.completed ? 'bg-primary' : 'bg-muted'
                                                            )}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1 pt-0.5">
                                                    <p className={cn('text-sm font-medium', !step.completed && 'text-muted-foreground')}>
                                                        {step.step}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">{step.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Estimated Delivery */}
                                    {order.estimatedTime && (
                                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Estimated Delivery</span>
                                            <span className="text-sm font-medium text-primary">{order.estimatedTime}</span>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    {order.status === 'delivered' && (
                                        <Button variant="outline" size="sm" className="w-full mt-4">
                                            Reorder
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>

                    {/* Lab Test Orders */}
                    <TabsContent value="lab" className="space-y-4 mt-0">
                        {labOrders.map((order) => (
                            <Card key={order.id} className="shadow-card">
                                <CardContent className="p-4">
                                    {/* Order Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="font-medium text-sm">{order.id}</p>
                                            <p className="text-xs text-muted-foreground">{order.date}</p>
                                        </div>
                                        <Badge className={cn('border', getStatusColor(order.status))}>
                                            {getStatusText(order.status)}
                                        </Badge>
                                    </div>

                                    {/* Test Details */}
                                    <div className="flex items-center gap-2 py-3 border-y border-border">
                                        <FlaskConical className="h-4 w-4 text-primary" />
                                        <span className="text-sm font-medium">{order.testName}</span>
                                    </div>

                                    {/* Timeline */}
                                    <div className="mt-4 space-y-3">
                                        {order.timeline.map((step, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="relative">
                                                    <div
                                                        className={cn(
                                                            'h-6 w-6 rounded-full border-2 flex items-center justify-center',
                                                            step.completed
                                                                ? 'bg-primary border-primary'
                                                                : 'bg-background border-muted-foreground'
                                                        )}
                                                    >
                                                        {step.completed && (
                                                            <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                                                        )}
                                                    </div>
                                                    {index < order.timeline.length - 1 && (
                                                        <div
                                                            className={cn(
                                                                'absolute left-[11px] top-6 w-0.5 h-6',
                                                                step.completed ? 'bg-primary' : 'bg-muted'
                                                            )}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1 pt-0.5">
                                                    <p className={cn('text-sm font-medium', !step.completed && 'text-muted-foreground')}>
                                                        {step.step}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">{step.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Estimated Ready */}
                                    {order.estimatedReady && (
                                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Estimated Ready</span>
                                            <span className="text-sm font-medium text-primary">{order.estimatedReady}</span>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    {order.status === 'ready' && (
                                        <Button size="sm" className="w-full mt-4">
                                            View Report
                                        </Button>
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
