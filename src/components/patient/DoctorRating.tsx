import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface DoctorRatingProps {
    doctorName: string;
    appointmentId: string;
    existingRating?: number;
    existingReview?: string;
    onRatingSubmit?: (rating: number, review: string) => void;
}

export function DoctorRating({
    doctorName,
    appointmentId,
    existingRating,
    existingReview,
    onRatingSubmit
}: DoctorRatingProps) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(existingRating || 0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState(existingReview || '');
    const { toast } = useToast();

    const handleSubmit = () => {
        if (rating === 0) {
            toast({
                title: "Rating required",
                description: "Please select a star rating before submitting",
                variant: "destructive"
            });
            return;
        }

        onRatingSubmit?.(rating, review);

        toast({
            title: "Rating submitted",
            description: `Thank you for rating ${doctorName}!`,
        });

        setOpen(false);
    };

    const getRatingText = (stars: number) => {
        switch (stars) {
            case 1: return 'Poor';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Very Good';
            case 5: return 'Excellent';
            default: return 'Select rating';
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                    {existingRating ? (
                        <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-warning text-warning" />
                            {existingRating} - Edit Rating
                        </span>
                    ) : (
                        <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            Rate Doctor
                        </span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Rate Your Experience</DialogTitle>
                    <DialogDescription>
                        How was your consultation with {doctorName}?
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Star Rating */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="transition-transform hover:scale-110 focus:outline-none"
                                >
                                    <Star
                                        className={cn(
                                            'h-8 w-8 transition-colors',
                                            (hoverRating || rating) >= star
                                                ? 'fill-warning text-warning'
                                                : 'text-muted-foreground'
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">
                            {getRatingText(hoverRating || rating)}
                        </p>
                    </div>

                    {/* Review Text */}
                    <div className="space-y-2">
                        <label htmlFor="review" className="text-sm font-medium">
                            Share your experience (optional)
                        </label>
                        <Textarea
                            id="review"
                            placeholder="Tell us about your consultation..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            rows={4}
                            className="resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                            Your review helps other patients make informed decisions
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="flex-1"
                            disabled={rating === 0}
                        >
                            Submit Rating
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// Star display component for showing existing ratings
interface StarDisplayProps {
    rating: number;
    maxStars?: number;
    size?: 'sm' | 'md' | 'lg';
}

export function StarDisplay({ rating, maxStars = 5, size = 'sm' }: StarDisplayProps) {
    const sizeClasses = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5'
    };

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: maxStars }, (_, i) => (
                <Star
                    key={i}
                    className={cn(
                        sizeClasses[size],
                        i < Math.floor(rating)
                            ? 'fill-warning text-warning'
                            : 'text-muted-foreground/30'
                    )}
                />
            ))}
            <span className="ml-1 text-xs font-medium text-muted-foreground">
                {rating.toFixed(1)}
            </span>
        </div>
    );
}
