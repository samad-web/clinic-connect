import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Shield, ShieldOff, Search, UserPlus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

export default function UserManagement() {
    const { authorizedPhones, toggleAuthorization } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');

    // Sample users list (in a real app, this would come from an API)
    const allUsers = [
        { name: 'Ramesh Kumar', phone: '9876543210', role: 'Patient', branch: 'Main Clinic' },
        { name: 'Dr. Priya Sharma', phone: '9876543211', role: 'Doctor', branch: 'Main Clinic' },
        { name: 'Anitha R', phone: '9876543212', role: 'Clinic Staff', branch: 'Main Clinic' },
        { name: 'Suresh M', phone: '9876543213', role: 'Pharmacy', branch: 'Thillai Nagar Pharmacy' },
        { name: 'Kavitha S', phone: '9876543214', role: 'Lab', branch: 'Central Lab' },
        { name: 'Admin User', phone: '9876543217', role: 'Admin', branch: 'Corporate' },
        { name: 'New Request', phone: '1234567890', role: 'Patient', branch: 'Srirangam Pharmacy' },
    ];

    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery)
    );

    const handleToggle = (phone: string, name: string) => {
        toggleAuthorization(phone);
        const isNowAuthorized = !authorizedPhones.includes(phone);
        toast({
            title: isNowAuthorized ? "Access Granted" : "Access Revoked",
            description: `${name}'s access has been ${isNowAuthorized ? 'authorized' : 'restricted'}.`,
        });
    };

    return (
        <div className="min-h-screen bg-background pb-8">
            <PageHeader title="User Authorization" />

            <div className="container-padding space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or phone..."
                            className="pl-9 rounded-xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button className="w-full md:w-auto gap-2 rounded-xl">
                        <UserPlus className="h-4 w-4" />
                        Add New User
                    </Button>
                </div>

                <Card className="shadow-card border-none overflow-hidden rounded-2xl">
                    <CardHeader className="bg-muted/30 pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            Manage Access
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-muted/20 text-muted-foreground border-b border-border/50">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">User</th>
                                        <th className="px-6 py-4 font-semibold">Role</th>
                                        <th className="px-6 py-4 font-semibold">Branch</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {filteredUsers.map((user) => {
                                        const isAuthorized = authorizedPhones.includes(user.phone);
                                        return (
                                            <tr key={user.phone} className="hover:bg-muted/10 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-xs text-muted-foreground">{user.phone}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant="outline" className="rounded-md font-normal">
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-muted-foreground font-medium">
                                                    {user.branch}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        className={cn(
                                                            "rounded-full px-2.5 py-0.5 font-medium",
                                                            isAuthorized
                                                                ? "bg-info/10 text-info border-info/20"
                                                                : "bg-destructive/10 text-destructive border-destructive/20"
                                                        )}
                                                        variant="outline"
                                                    >
                                                        {isAuthorized ? 'Authorized' : 'Restricted'}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button
                                                        size="sm"
                                                        variant={isAuthorized ? "destructive" : "default"}
                                                        className="rounded-lg h-8 px-3 text-xs gap-1.5"
                                                        onClick={() => handleToggle(user.phone, user.name)}
                                                    >
                                                        {isAuthorized ? (
                                                            <>
                                                                <ShieldOff className="h-3.5 w-3.5" />
                                                                Revoke
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Shield className="h-3.5 w-3.5" />
                                                                Authorize
                                                            </>
                                                        )}
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
