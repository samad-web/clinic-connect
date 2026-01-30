import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Send } from 'lucide-react';

export default function LabPending() {
    return (
        <div className="min-h-screen bg-background pb-8">
            <PageHeader title="Pending Samples" />
            <div className="container-padding">
                <Card className="shadow-card border-none rounded-2xl p-12 text-center">
                    <CardContent>
                        <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium text-muted-foreground">No pending samples</h3>
                        <p className="text-sm text-muted-foreground/60 mt-1">Samples awaiting processing will show up here</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
