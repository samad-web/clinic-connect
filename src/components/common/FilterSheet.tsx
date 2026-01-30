import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { SlidersHorizontal, X } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

export interface FilterOptions {
    category?: string;
    sortBy?: string;
    priceRange?: string;
    inStockOnly?: boolean;
}

interface FilterSheetProps {
    filters: FilterOptions;
    onFiltersChange: (filters: FilterOptions) => void;
    type: 'medicine' | 'doctor' | 'lab';
}

export function FilterSheet({ filters, onFiltersChange, type }: FilterSheetProps) {
    const [open, setOpen] = useState(false);
    const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

    const hasActiveFilters = Object.values(filters).some(v => v !== undefined && v !== '');

    const handleApply = () => {
        onFiltersChange(localFilters);
        setOpen(false);
    };

    const handleReset = () => {
        setLocalFilters({});
        onFiltersChange({});
    };

    const getMedicineContent = () => (
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select
                    value={localFilters.category || ''}
                    onValueChange={(value) => setLocalFilters({ ...localFilters, category: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pain-relief">Pain Relief</SelectItem>
                        <SelectItem value="diabetes">Diabetes</SelectItem>
                        <SelectItem value="cardiac">Cardiac</SelectItem>
                        <SelectItem value="vitamins">Vitamins & Supplements</SelectItem>
                        <SelectItem value="antibiotics">Antibiotics</SelectItem>
                        <SelectItem value="digestive">Digestive Health</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select
                    value={localFilters.sortBy || ''}
                    onValueChange={(value) => setLocalFilters({ ...localFilters, sortBy: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select sorting" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="discount">Discount</SelectItem>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <Select
                    value={localFilters.priceRange || ''}
                    onValueChange={(value) => setLocalFilters({ ...localFilters, priceRange: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0-100">Under ₹100</SelectItem>
                        <SelectItem value="100-500">₹100 - ₹500</SelectItem>
                        <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                        <SelectItem value="1000+">Above ₹1000</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="inStock"
                    checked={localFilters.inStockOnly || false}
                    onChange={(e) => setLocalFilters({ ...localFilters, inStockOnly: e.target.checked })}
                    className="rounded border-border"
                />
                <label htmlFor="inStock" className="text-sm">Show only in stock</label>
            </div>
        </div>
    );

    const getDoctorContent = () => (
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium mb-2 block">Specialization</label>
                <Select
                    value={localFilters.category || ''}
                    onValueChange={(value) => setLocalFilters({ ...localFilters, category: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="general">General Medicine</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="ent">ENT</SelectItem>
                        <SelectItem value="orthopedic">Orthopedic</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="text-sm font-medium mb-2 block">Experience</label>
                <Select
                    value={localFilters.priceRange || ''}
                    onValueChange={(value) => setLocalFilters({ ...localFilters, priceRange: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0-5">0-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10-20">10-20 years</SelectItem>
                        <SelectItem value="20+">20+ years</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="text-sm font-medium mb-2 block">Consultation Fee</label>
                <Select
                    value={localFilters.sortBy || ''}
                    onValueChange={(value) => setLocalFilters({ ...localFilters, sortBy: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select fee range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="fee-low">Low to High</SelectItem>
                        <SelectItem value="fee-high">High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );

    const getLabContent = () => (
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select
                    value={localFilters.category || ''}
                    onValueChange={(value) => setLocalFilters({ ...localFilters, category: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="blood">Blood Tests</SelectItem>
                        <SelectItem value="diabetes">Diabetes</SelectItem>
                        <SelectItem value="thyroid">Thyroid</SelectItem>
                        <SelectItem value="vitamins">Vitamins</SelectItem>
                        <SelectItem value="packages">Health Packages</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select
                    value={localFilters.sortBy || ''}
                    onValueChange={(value) => setLocalFilters({ ...localFilters, sortBy: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select sorting" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <Select
                    value={localFilters.priceRange || ''}
                    onValueChange={(value) => setLocalFilters({ ...localFilters, priceRange: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0-500">Under ₹500</SelectItem>
                        <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                        <SelectItem value="1000-2000">₹1000 - ₹2000</SelectItem>
                        <SelectItem value="2000+">Above ₹2000</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                            •
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                    <SheetTitle>Filters & Sort</SheetTitle>
                    <SheetDescription>
                        Refine your search with filters
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {type === 'medicine' && getMedicineContent()}
                    {type === 'doctor' && getDoctorContent()}
                    {type === 'lab' && getLabContent()}

                    <div className="flex gap-2 pt-4 border-t">
                        <Button variant="outline" onClick={handleReset} className="flex-1">
                            <X className="h-4 w-4 mr-2" />
                            Clear All
                        </Button>
                        <Button onClick={handleApply} className="flex-1">
                            Apply Filters
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
