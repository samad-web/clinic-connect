import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    FileText,
    Upload,
    Search,
    Filter,
    Download,
    Share2,
    Star,
    Calendar,
    User,
    Users,
    Plus,
    Eye,
    Trash2,
    FlaskConical,
    Pill,
    Stethoscope,
    Syringe,
    XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HealthRecord {
    id: string;
    familyMemberId: string;
    type: 'prescription' | 'lab_report' | 'consultation' | 'vaccination' | 'scan';
    title: string;
    date: string;
    fileUrl: string;
    tags: string[];
    starred: boolean;
    doctor?: string;
    description?: string;
}

interface FamilyMember {
    id: string;
    name: string;
    relation: string;
    age: number;
}

export default function HealthVault() {
    const [selectedMember, setSelectedMember] = useState<string>('self');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');

    // Mock data
    const familyMembers: FamilyMember[] = [
        { id: 'self', name: 'You', relation: 'Self', age: 32 },
        { id: 'fm1', name: 'Priya', relation: 'Spouse', age: 30 },
        { id: 'fm2', name: 'Aarav', relation: 'Son', age: 5 },
    ];

    const records: HealthRecord[] = [
        {
            id: 'r1',
            familyMemberId: 'self',
            type: 'lab_report',
            title: 'Complete Blood Count (CBC)',
            date: '2026-01-28',
            fileUrl: '#',
            tags: ['Blood Test', 'Routine'],
            starred: true,
            doctor: 'Dr. Priya Sharma',
            description: 'Annual health checkup'
        },
        {
            id: 'r2',
            familyMemberId: 'self',
            type: 'prescription',
            title: 'Fever & Cold Medication',
            date: '2026-01-25',
            fileUrl: '#',
            tags: ['General Medicine'],
            starred: false,
            doctor: 'Dr. Rajesh Kumar'
        },
        {
            id: 'r3',
            familyMemberId: 'fm2',
            type: 'vaccination',
            title: 'MMR Vaccine - Dose 2',
            date: '2026-01-20',
            fileUrl: '#',
            tags: ['Vaccination', 'Pediatric'],
            starred: false,
            doctor: 'Dr. Pediatric Specialist'
        },
        {
            id: 'r4',
            familyMemberId: 'self',
            type: 'scan',
            title: 'Chest X-Ray',
            date: '2026-01-15',
            fileUrl: '#',
            tags: ['Imaging', 'Respiratory'],
            starred: false,
            doctor: 'Dr. Radiology'
        },
    ];

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'lab_report': return <FlaskConical className="h-4 w-4" />;
            case 'prescription': return <Pill className="h-4 w-4" />;
            case 'consultation': return <Stethoscope className="h-4 w-4" />;
            case 'vaccination': return <Syringe className="h-4 w-4" />;
            case 'scan': return <FileText className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'lab_report': return 'bg-info/10 text-info';
            case 'prescription': return 'bg-success/10 text-success';
            case 'consultation': return 'bg-primary/10 text-primary';
            case 'vaccination': return 'bg-warning/10 text-warning';
            case 'scan': return 'bg-destructive/10 text-destructive';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    const filteredRecords = records.filter(record => {
        const matchesMember = record.familyMemberId === selectedMember;
        const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesType = selectedType === 'all' || record.type === selectedType;

        return matchesMember && matchesSearch && matchesType;
    });

    const documentTypes = [
        { value: 'all', label: 'All Documents', count: records.filter(r => r.familyMemberId === selectedMember).length },
        { value: 'lab_report', label: 'Lab Reports', count: records.filter(r => r.familyMemberId === selectedMember && r.type === 'lab_report').length },
        { value: 'prescription', label: 'Prescriptions', count: records.filter(r => r.familyMemberId === selectedMember && r.type === 'prescription').length },
        { value: 'vaccination', label: 'Vaccinations', count: records.filter(r => r.familyMemberId === selectedMember && r.type === 'vaccination').length },
    ];

    return (
        <div className="min-h-screen bg-background pb-8">
            <PageHeader title="Health Vault" showBack backPath="/patient" />

            <div className="container-padding space-y-6">
                {/* Family Member Selector */}
                <Card className="shadow-card border-none rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg">Select Family Member</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            {familyMembers.map((member) => (
                                <button
                                    key={member.id}
                                    onClick={() => setSelectedMember(member.id)}
                                    className={cn(
                                        'flex items-center gap-3 p-4 rounded-xl border-2 transition-all',
                                        selectedMember === member.id
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/50'
                                    )}
                                >
                                    <div className={cn(
                                        'h-10 w-10 rounded-full flex items-center justify-center',
                                        selectedMember === member.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                    )}>
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.relation} · {member.age} years</p>
                                    </div>
                                </button>
                            ))}
                            <button className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-all">
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                    <Plus className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold">Add Member</p>
                                    <p className="text-xs text-muted-foreground">Family member</p>
                                </div>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Search and Actions */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search documents, tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 rounded-xl"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2 rounded-xl">
                            <Upload className="h-4 w-4" />
                            Upload
                        </Button>
                        <Button variant="outline" className="gap-2 rounded-xl">
                            <Share2 className="h-4 w-4" />
                            Share
                        </Button>
                        <Button variant="outline" className="gap-2 rounded-xl">
                            <Download className="h-4 w-4" />
                            Export All
                        </Button>
                    </div>
                </div>

                {/* Document Type Tabs */}
                <Tabs value={selectedType} onValueChange={setSelectedType}>
                    <TabsList className="grid w-full grid-cols-4 rounded-xl">
                        {documentTypes.map((type) => (
                            <TabsTrigger key={type.value} value={type.value} className="rounded-lg">
                                {type.label}
                                <Badge className="ml-2 bg-muted text-muted-foreground border-0">
                                    {type.count}
                                </Badge>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value={selectedType} className="mt-6 space-y-4">
                        {filteredRecords.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredRecords.map((record) => (
                                    <Card key={record.id} className="shadow-card border-none rounded-2xl hover:shadow-card-lg transition-shadow">
                                        <CardContent className="p-5 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <Badge className={cn('border-0', getTypeColor(record.type))}>
                                                    <span className="flex items-center gap-1">
                                                        {getTypeIcon(record.type)}
                                                        {record.type.replace('_', ' ')}
                                                    </span>
                                                </Badge>
                                                <button className="text-muted-foreground hover:text-warning transition-colors">
                                                    <Star className={cn('h-4 w-4', record.starred && 'fill-warning text-warning')} />
                                                </button>
                                            </div>

                                            <div>
                                                <h3 className="font-semibold line-clamp-2">{record.title}</h3>
                                                {record.description && (
                                                    <p className="text-xs text-muted-foreground mt-1">{record.description}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{new Date(record.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                </div>
                                                {record.doctor && (
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-3 w-3" />
                                                        <span>{record.doctor}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {record.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {record.tags.map((tag, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs border-border/50">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex gap-2 pt-2">
                                                <Button size="sm" variant="outline" className="flex-1 rounded-lg gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    View
                                                </Button>
                                                <Button size="sm" variant="outline" className="flex-1 rounded-lg gap-1">
                                                    <Download className="h-3 w-3" />
                                                    Download
                                                </Button>
                                                <Button size="sm" variant="outline" className="rounded-lg text-destructive hover:text-destructive">
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="shadow-card border-none rounded-2xl">
                                <CardContent className="py-16 text-center">
                                    <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-40" />
                                    <h3 className="font-semibold text-lg mb-2">No documents found</h3>
                                    <p className="text-muted-foreground mb-6">
                                        {searchQuery ? 'Try different search terms' : 'Upload your first document to get started'}
                                    </p>
                                    <Button className="gap-2 rounded-xl">
                                        <Upload className="h-4 w-4" />
                                        Upload Document
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
