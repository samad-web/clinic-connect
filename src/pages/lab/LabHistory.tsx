import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { FlaskConical } from 'lucide-react';

export default function LabHistory() {
    return (
        <div className="min-h-screen bg-background pb-8">
            <PageHeader title="Test History" />
            <div className="container-padding">
                <Card className="shadow-card border-none rounded-2xl p-12 text-center">
                    <CardContent>
                        <History className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium text-muted-foreground">No history available</h3>
                        <p className="text-sm text-muted-foreground/60 mt-1">Completed tests will appear here</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

import { History } from 'lucide-react';
