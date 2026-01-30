import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Star,
    Award,
    GraduationCap,
    MapPin,
    Calendar,
    Clock,
    Users,
    ThumbsUp,
    Languages,
    Stethoscope,
    TrendingUp,
    Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock doctor data with detailed profiles
const doctorsData = {
    'd1': {
        id: 'd1',
        name: 'Dr. Priya Sharma',
        photo: '/placeholder-doctor-1.jpg',
        specialization: 'General Medicine',
        experience: 12,
        rating: 4.8,
        totalReviews: 245,
        consultationFee: 500,
        languages: ['English', 'Hindi', 'Tamil'],
        education: [
            { degree: 'MBBS', institution: 'Madras Medical College', year: 2010 },
            { degree: 'MD (Internal Medicine)', institution: 'AIIMS Delhi', year: 2014 }
        ],
        awards: [
            { title: 'Best Young Doctor Award', year: 2020 },
            { title: 'Excellence in Patient Care', year: 2022 }
        ],
        about: 'Dr. Priya Sharma is a dedicated general physician with over 12 years of experience. She specializes in preventive medicine and chronic disease management, with a patient-first approach.',
        branches: ['Main Clinic', 'Thillai Nagar Branch'],
        successRate: 96,
        avgWaitTime: '15 mins',
        followUpRate: 92,
        reviews: [
            {
                id: '1',
                patientName: 'Ramesh K.',
                rating: 5,
                date: '2026-01-25',
                comment: 'Excellent doctor! Very patient and explains everything clearly. Highly recommend.',
                verified: true,
                helpful: 24
            },
            {
                id: '2',
                patientName: 'Lakshmi P.',
                rating: 5,
                date: '2026-01-20',
                comment: 'Dr. Sharma is very thorough with her diagnosis. She takes time to listen to all concerns.',
                verified: true,
                helpful: 18
            },
            {
                id: '3',
                patientName: 'Vijay S.',
                rating: 4,
                date: '2026-01-15',
                comment: 'Good experience overall. Wait time was a bit longer than expected but consultation was worth it.',
                verified: true,
                helpful: 12
            }
        ]
    },
    'd2': {
        id: 'd2',
        name: 'Dr. Rajesh Kumar',
        photo: '/placeholder-doctor-2.jpg',
        specialization: 'Cardiologist',
        experience: 15,
        rating: 4.9,
        totalReviews: 312,
        consultationFee: 800,
        languages: ['English', 'Hindi'],
        education: [
            { degree: 'MBBS', institution: 'CMC Vellore', year: 2007 },
            { degree: 'DM (Cardiology)', institution: 'AIIMS Delhi', year: 2012 }
        ],
        awards: [
            { title: 'Cardiology Excellence Award', year: 2021 },
            { title: 'Research Publication Award', year: 2023 }
        ],
        about: 'Dr. Rajesh Kumar is a renowned cardiologist specializing in interventional cardiology and heart disease prevention. He has performed over 2000 successful procedures.',
        branches: ['Main Clinic'],
        successRate: 98,
        avgWaitTime: '20 mins',
        followUpRate: 95,
        reviews: [
            {
                id: '1',
                patientName: 'Murali D.',
                rating: 5,
                date: '2026-01-28',
                comment: 'Life-saving treatment! Dr. Kumar is extremely skilled and caring. Forever grateful.',
                verified: true,
                helpful: 45
            },
            {
                id: '2',
                patientName: 'Kavitha R.',
                rating: 5,
                date: '2026-01-22',
                comment: 'Best cardiologist in Trichy. Very knowledgeable and explains everything in detail.',
                verified: true,
                helpful: 32
            }
        ]
    }
};

export default function DoctorProfile() {
    const { doctorId } = useParams<{ doctorId: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('about');

    const doctor = doctorId ? doctorsData[doctorId as keyof typeof doctorsData] : null;

    if (!doctor) {
        return (
            <div className="min-h-screen bg-background">
                <PageHeader title="Doctor Not Found" showBack />
                <div className="container-padding">
                    <Card className="shadow-card border-none rounded-2xl">
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground">Doctor profile not found</p>
                            <Button onClick={() => navigate('/patient/appointments/book')} className="mt-4">
                                Back to Doctors
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                className={cn(
                    'h-4 w-4',
                    i < Math.floor(rating) ? 'fill-warning text-warning' : 'text-muted-foreground'
                )}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-background pb-8">
            <PageHeader title="Doctor Profile" showBack backPath="/patient/appointments/book" />

            <div className="container-padding space-y-6">
                {/* Doctor Header Card */}
                <Card className="shadow-card border-none rounded-3xl overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Photo */}
                            <div className="flex-shrink-0">
                                <div className="h-32 w-32 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Stethoscope className="h-16 w-16 text-primary" />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 space-y-3">
                                <div>
                                    <h2 className="text-2xl font-bold">{doctor.name}</h2>
                                    <p className="text-muted-foreground">{doctor.specialization}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {renderStars(doctor.rating)}
                                    </div>
                                    <span className="font-semibold">{doctor.rating}</span>
                                    <span className="text-sm text-muted-foreground">({doctor.totalReviews} reviews)</span>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span>{doctor.experience} years exp.</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span>{doctor.totalReviews}+ patients</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Languages className="h-4 w-4 text-muted-foreground" />
                                        <span>{doctor.languages.join(', ')}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {doctor.branches.map((branch, index) => (
                                        <Badge key={index} className="bg-primary/10 text-primary border-0">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {branch}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Booking Info */}
                            <div className="flex flex-col items-end justify-between">
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-primary">₹{doctor.consultationFee}</p>
                                    <p className="text-xs text-muted-foreground">Consultation Fee</p>
                                </div>
                                <Button
                                    className="rounded-xl gap-2"
                                    onClick={() => navigate('/patient/appointments/book')}
                                >
                                    <Calendar className="h-4 w-4" />
                                    Book Appointment
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Success Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="shadow-card border-none rounded-2xl">
                        <CardContent className="p-4 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <TrendingUp className="h-8 w-8 text-success" />
                            </div>
                            <p className="text-3xl font-bold text-success">{doctor.successRate}%</p>
                            <p className="text-xs text-muted-foreground">Success Rate</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-card border-none rounded-2xl">
                        <CardContent className="p-4 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Clock className="h-8 w-8 text-info" />
                            </div>
                            <p className="text-3xl font-bold text-info">{doctor.avgWaitTime}</p>
                            <p className="text-xs text-muted-foreground">Avg. Wait Time</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-card border-none rounded-2xl">
                        <CardContent className="p-4 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Heart className="h-8 w-8 text-destructive" />
                            </div>
                            <p className="text-3xl font-bold text-destructive">{doctor.followUpRate}%</p>
                            <p className="text-xs text-muted-foreground">Follow-up Rate</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 rounded-xl">
                        <TabsTrigger value="about" className="rounded-lg">About</TabsTrigger>
                        <TabsTrigger value="qualifications" className="rounded-lg">Qualifications</TabsTrigger>
                        <TabsTrigger value="reviews" className="rounded-lg">Reviews</TabsTrigger>
                    </TabsList>

                    {/* About Tab */}
                    <TabsContent value="about" className="space-y-4">
                        <Card className="shadow-card border-none rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-lg">About Dr. {doctor.name.split(' ')[1]}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">{doctor.about}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Qualifications Tab */}
                    <TabsContent value="qualifications" className="space-y-4">
                        <Card className="shadow-card border-none rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Education
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {doctor.education.map((edu, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <GraduationCap className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{edu.degree}</p>
                                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                                            <p className="text-xs text-muted-foreground">Graduated: {edu.year}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="shadow-card border-none rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Awards & Recognition
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {doctor.awards.map((award, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-warning/5">
                                        <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                                            <Award className="h-5 w-5 text-warning" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{award.title}</p>
                                            <p className="text-sm text-muted-foreground">Year: {award.year}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Reviews Tab */}
                    <TabsContent value="reviews" className="space-y-4">
                        <Card className="shadow-card border-none rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-lg">Patient Reviews ({doctor.totalReviews})</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {doctor.reviews.map((review) => (
                                    <div key={review.id} className="p-4 rounded-xl bg-muted/30 space-y-2">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold">{review.patientName}</p>
                                                    {review.verified && (
                                                        <Badge className="bg-success/10 text-success border-0 text-xs">
                                                            Verified Patient
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex items-center gap-0.5">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">{review.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                                        <div className="flex items-center gap-2 pt-2">
                                            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                                                <ThumbsUp className="h-3 w-3" />
                                                Helpful ({review.helpful})
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Sticky Book Button (Mobile) */}
                <div className="fixed bottom-20 left-4 right-4 md:hidden">
                    <Button
                        className="w-full h-14 rounded-2xl gap-2 shadow-lg"
                        onClick={() => navigate('/patient/appointments/book')}
                    >
                        <Calendar className="h-5 w-5" />
                        Book Appointment - ₹{doctor.consultationFee}
                    </Button>
                </div>
            </div>
        </div>
    );
}
