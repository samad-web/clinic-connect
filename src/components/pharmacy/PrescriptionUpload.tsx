import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, FileText, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrescriptionUploadProps {
    onUploadComplete?: (file: File) => void;
    onRemove?: () => void;
}

export function PrescriptionUpload({ onUploadComplete, onRemove }: PrescriptionUploadProps) {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = useCallback((file: File) => {
        if (file && file.type.startsWith('image/')) {
            setUploadedFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            onUploadComplete?.(file);
        }
    }, [onUploadComplete]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    }, [handleFileSelect]);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
    };

    const handleRemove = () => {
        setUploadedFile(null);
        setPreview(null);
        onRemove?.();
    };

    if (uploadedFile && preview) {
        return (
            <Card className="shadow-card border-success/20 bg-success/5">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="h-16 w-16 rounded-lg overflow-hidden border border-border shrink-0">
                            <img src={preview} alt="Prescription" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <Check className="h-4 w-4 text-success shrink-0" />
                                <p className="text-sm font-medium truncate">Prescription uploaded</p>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{uploadedFile.name}</p>
                            <p className="text-xs text-muted-foreground">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={handleRemove}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div
            className={cn(
                'border-2 border-dashed rounded-xl p-6 text-center transition-colors',
                isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            )}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p className="font-medium text-sm mb-1">Upload Prescription</p>
                    <p className="text-xs text-muted-foreground">
                        Drag & drop or click to upload
                    </p>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                    id="prescription-upload"
                />
                <Button
                    variant="outline"
                    size="sm"
                    asChild
                >
                    <label htmlFor="prescription-upload" className="cursor-pointer">
                        <FileText className="h-4 w-4 mr-2" />
                        Choose File
                    </label>
                </Button>
            </div>
        </div>
    );
}
