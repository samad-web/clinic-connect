import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';
import {
    Package,
    Search,
    Plus,
    Filter,
    MoreVertical,
    AlertTriangle,
    FileDown,
    History,
    Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Medicine {
    id: string;
    name: string;
    category: string;
    stock: number;
    unit: string;
    expiryDate: string;
    price: number;
    status: 'active' | 'out_of_stock' | 'low_stock';
    batchNo: string;
}

const demoInventory: Medicine[] = [
    {
        id: 'MED001',
        name: 'Paracetamol 500mg',
        category: 'Analgesics',
        stock: 450,
        unit: 'Tablets',
        expiryDate: '2025-12-15',
        price: 1.5,
        status: 'active',
        batchNo: 'BAT-2024-001'
    },
    {
        id: 'MED002',
        name: 'Amoxicillin 250mg',
        category: 'Antibiotics',
        stock: 12,
        unit: 'Capsules',
        expiryDate: '2024-08-20',
        price: 12.0,
        status: 'low_stock',
        batchNo: 'BAT-2024-012'
    },
    {
        id: 'MED003',
        name: 'Cetirizine 10mg',
        category: 'Antihistamines',
        stock: 0,
        unit: 'Tablets',
        expiryDate: '2025-03-10',
        price: 3.5,
        status: 'out_of_stock',
        batchNo: 'BAT-2023-088'
    },
    {
        id: 'MED004',
        name: 'Metformin 500mg',
        category: 'Antidiabetics',
        stock: 820,
        unit: 'Tablets',
        expiryDate: '2026-06-25',
        price: 5.0,
        status: 'active',
        batchNo: 'BAT-2024-005'
    },
    {
        id: 'MED005',
        name: 'Omeprazole 20mg',
        category: 'Gastrointestinal',
        stock: 45,
        unit: 'Capsules',
        expiryDate: '2024-11-30',
        price: 8.5,
        status: 'low_stock',
        batchNo: 'BAT-2024-009'
    }
];

export default function InventoryManager() {
    const [searchQuery, setSearchQuery] = useState('');
    const [inventory] = useState<Medicine[]>(demoInventory);

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.batchNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 space-y-6 animate-fade-in pb-24">
            {/* Page Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-heading font-bold">Inventory Management</h1>
                <p className="text-muted-foreground text-sm">Manage stock, check expiry, and update medicine details</p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search medicine, ID or batch..."
                        className="pl-9 h-11"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-11 px-3">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                    <Button className="h-11 px-4 bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Medicine
                    </Button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-primary/5 border-primary/10">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                            <Package className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Total Items</p>
                            <h3 className="text-xl font-bold">1,284</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-warning/5 border-warning/10">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-warning/20 flex items-center justify-center text-warning">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Low Stock</p>
                            <h3 className="text-xl font-bold">12</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-info/5 border-info/10">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-info/20 flex items-center justify-center text-info">
                            <History className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Expiry Incoming</p>
                            <h3 className="text-xl font-bold">5</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Inventory Table */}
            <Card className="border-border/50 shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/30 border-b border-border">
                                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Medicine & ID</th>
                                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stock</th>
                                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Expiry</th>
                                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredInventory.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/10 transition-colors">
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm">{item.name}</span>
                                            <span className="text-xs text-muted-foreground">ID: {item.id} • Batch: {item.batchNo}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className={cn(
                                                "text-sm font-semibold",
                                                item.stock === 0 ? "text-destructive" : item.stock < 50 ? "text-warning" : "text-foreground"
                                            )}>
                                                {item.stock} {item.unit}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-xs font-medium">{item.expiryDate}</span>
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={item.status as any} />
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Footer Info */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1.5 text-xs">
                    <Info className="h-3.5 w-3.5" />
                    <span>Last inventory sync: Today, 10:45 AM</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-xs h-8">
                        <FileDown className="h-3.5 w-3.5 mr-1" />
                        Export CSV
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs h-8">
                        View History
                    </Button>
                </div>
            </div>
        </div>
    );
}
