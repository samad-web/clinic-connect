import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Settings as SettingsIcon,
    Bell,
    Lock,
    Palette,
    Database,
    Mail,
    Globe,
    Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Settings() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);

    const settingsSections = [
        {
            title: 'Notifications',
            icon: Bell,
            items: [
                {
                    label: 'Email Notifications',
                    description: 'Receive email alerts for important updates',
                    value: emailNotifications,
                    onChange: setEmailNotifications
                },
                {
                    label: 'SMS Notifications',
                    description: 'Receive SMS alerts for urgent matters',
                    value: smsNotifications,
                    onChange: setSmsNotifications
                }
            ]
        },
        {
            title: 'Security',
            icon: Lock,
            items: [
                {
                    label: 'Two-Factor Authentication',
                    description: 'Add an extra layer of security to your account',
                    value: twoFactorAuth,
                    onChange: setTwoFactorAuth
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background pb-8">
            <PageHeader title="Settings" />

            <div className="container-padding space-y-6">
                {/* Settings Sections */}
                {settingsSections.map((section, index) => (
                    <Card key={index} className="shadow-card border-none rounded-2xl">
                        <CardHeader className="bg-muted/30">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <section.icon className="h-5 w-5 text-primary" />
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {section.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center justify-between">
                                    <div className="space-y-0.5 flex-1">
                                        <Label className="text-base font-medium">{item.label}</Label>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                    <Switch
                                        checked={item.value}
                                        onCheckedChange={item.onChange}
                                        className="ml-4"
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}

                {/* Clinic Information */}
                <Card className="shadow-card border-none rounded-2xl">
                    <CardHeader className="bg-muted/30">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Globe className="h-5 w-5 text-primary" />
                            Clinic Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="clinic-name">Clinic Name</Label>
                                <Input
                                    id="clinic-name"
                                    defaultValue="Royal Pharmacy"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="clinic-phone">Phone Number</Label>
                                <Input
                                    id="clinic-phone"
                                    defaultValue="+91 431 2234567"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="clinic-email">Email</Label>
                                <Input
                                    id="clinic-email"
                                    type="email"
                                    defaultValue="contact@royalpharmacy.com"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="clinic-website">Website</Label>
                                <Input
                                    id="clinic-website"
                                    defaultValue="www.royalpharmacy.com"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clinic-address">Address</Label>
                            <Input
                                id="clinic-address"
                                defaultValue="123 Main Road, Trichy - 620001"
                                className="rounded-lg"
                            />
                        </div>
                        <div className="flex justify-end pt-2">
                            <Button className="rounded-lg">Save Changes</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* System Settings */}
                <Card className="shadow-card border-none rounded-2xl">
                    <CardHeader className="bg-muted/30">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Database className="h-5 w-5 text-primary" />
                            System Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button variant="outline" className="justify-start gap-2 h-auto py-4 rounded-lg">
                                <Database className="h-5 w-5" />
                                <div className="text-left">
                                    <p className="font-medium">Backup Database</p>
                                    <p className="text-xs text-muted-foreground">Export all data</p>
                                </div>
                            </Button>
                            <Button variant="outline" className="justify-start gap-2 h-auto py-4 rounded-lg">
                                <Shield className="h-5 w-5" />
                                <div className="text-left">
                                    <p className="font-medium">Security Audit</p>
                                    <p className="text-xs text-muted-foreground">Review access logs</p>
                                </div>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
