import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    TrendingDown,
    CheckCircle2,
    Info,
    ShoppingCart,
    ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MedicineAlternative {
    id: string;
    name: string;
    type: 'branded' | 'generic';
    composition: string;
    strength: string;
    manufacturer: string;
    price: number;
    mrp: number;
    availability: boolean;
    rating?: number;
}

interface MedicineAlternativesProps {
    originalMedicine: {
        name: string;
        price: number;
        composition: string;
    };
    onAddToCart?: (medicine: MedicineAlternative) => void;
}

export function MedicineAlternatives({ originalMedicine, onAddToCart }: MedicineAlternativesProps) {
    // Mock alternatives data
    const alternatives: MedicineAlternative[] = [
        {
            id: 'alt1',
            name: originalMedicine.name,
            type: 'branded',
            composition: originalMedicine.composition,
            strength: '500mg',
            manufacturer: 'GSK',
            price: originalMedicine.price,
            mrp: originalMedicine.price,
            availability: true,
            rating: 4.5
        },
        {
            id: 'alt2',
            name: 'Dolo 650',
            type: 'branded',
            composition: originalMedicine.composition,
            strength: '650mg',
            manufacturer: 'Micro Labs',
            price: Math.floor(originalMedicine.price * 0.6),
            mrp: Math.floor(originalMedicine.price * 0.75),
            availability: true,
            rating: 4.7
        },
        {
            id: 'alt3',
            name: 'Paracetamol',
            type: 'generic',
            composition: originalMedicine.composition,
            strength: '500mg',
            manufacturer: 'Various',
            price: Math.floor(originalMedicine.price * 0.3),
            mrp: Math.floor(originalMedicine.price * 0.4),
            availability: true,
            rating: 4.2
        }
    ];

    const calculateSavings = (alt: MedicineAlternative) => {
        return originalMedicine.price - alt.price;
    };

    const calculateSavingsPercentage = (alt: MedicineAlternative) => {
        return Math.round(((originalMedicine.price - alt.price) / originalMedicine.price) * 100);
    };

    return (
        <div className="space-y-4">
            <Card className="shadow-card border-none rounded-2xl">
                <CardHeader className="bg-muted/30">
                    <CardTitle className="text-lg">Alternative Options</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Save money with these alternatives having the same composition
                    </p>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    {/* Comparison Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-xs uppercase bg-muted/20 text-muted-foreground border-b border-border/50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Medicine</th>
                                    <th className="px-4 py-3 text-left font-semibold">Type</th>
                                    <th className="px-4 py-3 text-left font-semibold">Strength</th>
                                    <th className="px-4 py-3 text-left font-semibold">Manufacturer</th>
                                    <th className="px-4 py-3 text-right font-semibold">Price</th>
                                    <th className="px-4 py-3 text-right font-semibold">Save</th>
                                    <th className="px-4 py-3 text-center font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {alternatives.map((alt) => {
                                    const savings = calculateSavings(alt);
                                    const savingsPercent = calculateSavingsPercentage(alt);

                                    return (
                                        <tr key={alt.id} className={cn(
                                            'hover:bg-muted/30 transition-colors',
                                            alt.id === 'alt1' && 'bg-primary/5'
                                        )}>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{alt.name}</span>
                                                    {alt.id === 'alt1' && (
                                                        <Badge className="bg-primary/10 text-primary border-0 text-xs">
                                                            Current
                                                        </Badge>
                                                    )}
                                                    {alt.type === 'generic' && (
                                                        <Badge className="bg-success/10 text-success border-0 text-xs">
                                                            Generic
                                                        </Badge>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 capitalize">{alt.type}</td>
                                            <td className="px-4 py-4">{alt.strength}</td>
                                            <td className="px-4 py-4 text-muted-foreground">{alt.manufacturer}</td>
                                            <td className="px-4 py-4 text-right">
                                                <div>
                                                    <p className="font-bold text-primary">₹{alt.price}</p>
                                                    {alt.mrp !== alt.price && (
                                                        <p className="text-xs text-muted-foreground line-through">₹{alt.mrp}</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                {savings > 0 ? (
                                                    <div className="flex flex-col items-end">
                                                        <span className="font-bold text-success">₹{savings}</span>
                                                        <span className="text-xs text-success">({savingsPercent}% off)</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                {alt.availability ? (
                                                    <Button
                                                        size="sm"
                                                        variant={alt.id === 'alt1' ? 'default' : 'outline'}
                                                        className="rounded-lg gap-1"
                                                        onClick={() => onAddToCart?.(alt)}
                                                    >
                                                        <ShoppingCart className="h-3 w-3" />
                                                        {alt.id === 'alt1' ? 'Selected' : 'Switch'}
                                                    </Button>
                                                ) : (
                                                    <Badge variant="outline" className="text-xs">Out of Stock</Badge>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Why Generic Info Card */}
                    <Card className="bg-info/5 border-info/20 rounded-xl">
                        <CardContent className="p-4 flex items-start gap-3">
                            <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
                            <div className="space-y-2 text-sm">
                                <p className="font-semibold text-info">Why choose Generic medicines?</p>
                                <ul className="space-y-1 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                                        <span>Same active ingredients as branded medicines</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                                        <span>Approved by regulatory authorities (DCGI)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                                        <span>Same effectiveness and safety standards</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <TrendingDown className="h-4 w-4 text-success shrink-0 mt-0.5" />
                                        <span>Up to 70% cheaper than branded alternatives</span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Composition Info */}
                    <div className="p-4 bg-muted/30 rounded-xl">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Active Composition</p>
                        <p className="text-sm font-medium">{originalMedicine.composition}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
