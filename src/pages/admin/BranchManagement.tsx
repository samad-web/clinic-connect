import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, Search, Plus, MapPin, Phone, Users, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BranchManagement() {
    const [searchQuery, setSearchQuery] = useState('');

    // Sample branches data
    const branches = [
        {
            id: 1,
            name: 'Main Clinic',
            location: 'Trichy - Main Road',
            phone: '+91 431 2234567',
            staff: 12,
            status: 'active' as const,
            address: '123 Main Road, Trichy - 620001'
        },
        {
            id: 2,
            name: 'Thillai Nagar Branch',
            location: 'Thillai Nagar, Trichy',
            phone: '+91 431 2345678',
            staff: 8,
            status: 'active' as const,
            address: '45 Thillai Nagar, Trichy - 620018'
        },
        {
            id: 3,
            name: 'Srirangam Pharmacy',
            location: 'Srirangam, Trichy',
            phone: '+91 431 2456789',
            staff: 5,
            status: 'active' as const,
            address: '78 Temple Street, Srirangam - 620006'
        },
        {
            id: 4,
            name: 'Central Lab',
            location: 'Anna Nagar, Trichy',
            phone: '+91 431 2567890',
            staff: 6,
            status: 'active' as const,
            address: '90 Anna Nagar, Trichy - 620020'
        },
    ];

    const filteredBranches = branches.filter(branch =>
        branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background pb-8">
            <PageHeader title="Branch Management" />

            <div className="container-padding space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search branches..."
                            className="pl-9 rounded-xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button className="w-full md:w-auto gap-2 rounded-xl">
                        <Plus className="h-4 w-4" />
                        Add New Branch
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredBranches.map((branch) => (
                        <Card key={branch.id} className="shadow-card border-none rounded-2xl hover:shadow-card-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Building2 className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">{branch.name}</CardTitle>
                                            <Badge className="mt-1 bg-success/10 text-success border-0 text-xs">
                                                {branch.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-start gap-2 text-muted-foreground">
                                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                        <span>{branch.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                        <span>{branch.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        <span>{branch.staff} Staff Members</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                                        <Edit className="h-3 w-3 mr-1" />
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1 rounded-lg text-destructive hover:text-destructive">
                                        <Trash2 className="h-3 w-3 mr-1" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredBranches.length === 0 && (
                    <Card className="shadow-card border-none rounded-2xl">
                        <CardContent className="py-12 text-center">
                            <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
                            <p className="text-muted-foreground">No branches found</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
