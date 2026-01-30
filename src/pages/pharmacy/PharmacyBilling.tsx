import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
    Pill,
    Plus,
    Minus,
    Trash2,
    IndianRupee,
    Receipt,
    User,
    Phone,
    CheckCircle2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Demo medicines
const availableMedicines = [
    { id: '1', name: 'Paracetamol 500mg', manufacturer: 'Cipla', price: 25, stock: 100 },
    { id: '2', name: 'Vitamin C 1000mg', manufacturer: 'Himalaya', price: 180, stock: 50 },
    { id: '3', name: 'Cetirizine 10mg', manufacturer: 'Sun Pharma', price: 45, stock: 75 },
    { id: '4', name: 'Omeprazole 20mg', manufacturer: 'Dr. Reddy\'s', price: 85, stock: 60 },
    { id: '5', name: 'Azithromycin 500mg', manufacturer: 'Cipla', price: 120, stock: 40 },
];

interface CartItem {
    id: string;
    name: string;
    manufacturer: string;
    price: number;
    quantity: number;
}

const GST_RATE = 0.12; // 12% GST

export default function PharmacyBilling() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [includeGST, setIncludeGST] = useState(true);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const addToCart = (medicine: typeof availableMedicines[0]) => {
        const existingItem = cart.find(item => item.id === medicine.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === medicine.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, {
                id: medicine.id,
                name: medicine.name,
                manufacturer: medicine.manufacturer,
                price: medicine.price,
                quantity: 1
            }]);
        }
    };

    const updateQuantity = (id: string, change: number) => {
        setCart(cart.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + change) }
                : item
        ).filter(item => item.quantity > 0));
    };

    const removeItem = (id: string) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gstAmount = includeGST ? subtotal * GST_RATE : 0;
    const total = subtotal + gstAmount;

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast({
                title: "Cart is empty",
                description: "Please add items to the cart before checkout",
                variant: "destructive"
            });
            return;
        }

        toast({
            title: "Order completed",
            description: `Bill total: ₹${total.toFixed(2)}${includeGST ? ' (incl. GST)' : ' (excl. GST)'}`,
        });

        // Reset form
        setCart([]);
        setCustomerName('');
        setCustomerPhone('');
        setIncludeGST(true);
    };

    const filteredMedicines = availableMedicines.filter(med =>
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen pb-6">
            <PageHeader
                title="New Order"
                showBack
                backPath="/pharmacy"
            />

            <div className="px-4 space-y-4">
                {/* Customer Details */}
                <Card className="shadow-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Customer Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <Label htmlFor="name" className="text-xs">Name</Label>
                            <Input
                                id="name"
                                placeholder="Customer name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone" className="text-xs">Phone</Label>
                            <Input
                                id="phone"
                                placeholder="Phone number"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Medicine Search */}
                <Card className="shadow-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Pill className="h-4 w-4" />
                            Add Medicines
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Input
                            placeholder="Search medicines..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="max-h-48 overflow-y-auto space-y-2">
                            {filteredMedicines.map(medicine => (
                                <div
                                    key={medicine.id}
                                    className="flex items-center justify-between p-2 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{medicine.name}</p>
                                        <p className="text-xs text-muted-foreground">{medicine.manufacturer}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold">₹{medicine.price}</span>
                                        <Button
                                            size="sm"
                                            onClick={() => addToCart(medicine)}
                                            className="h-7 px-2"
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Cart */}
                {cart.length > 0 && (
                    <Card className="shadow-card">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Receipt className="h-4 w-4" />
                                Cart ({cart.length} items)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center gap-2 p-2 border border-border rounded-lg">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">₹{item.price} × {item.quantity}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={() => updateQuantity(item.id, -1)}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-destructive"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Bill Summary */}
                <Card className="shadow-card border-primary/20">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Bill Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {/* GST Toggle */}
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Receipt className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <Label htmlFor="gst-toggle" className="text-sm font-medium cursor-pointer">
                                        Include GST (12%)
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        {includeGST ? 'GST will be added to bill' : 'Bill without GST'}
                                    </p>
                                </div>
                            </div>
                            <Switch
                                id="gst-toggle"
                                checked={includeGST}
                                onCheckedChange={setIncludeGST}
                            />
                        </div>

                        <Separator />

                        {/* Price Breakdown */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                            </div>
                            {includeGST && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">GST (12%)</span>
                                    <span className="font-medium text-primary">+₹{gstAmount.toFixed(2)}</span>
                                </div>
                            )}
                            <Separator />
                            <div className="flex justify-between">
                                <span className="font-semibold">Total</span>
                                <span className="font-bold text-lg flex items-center">
                                    <IndianRupee className="h-4 w-4" />
                                    {total.toFixed(2)}
                                </span>
                            </div>
                            {!includeGST && (
                                <p className="text-xs text-warning flex items-center gap-1">
                                    ⚠️ Bill generated without GST
                                </p>
                            )}
                        </div>

                        <Button
                            onClick={handleCheckout}
                            className="w-full"
                            disabled={cart.length === 0}
                        >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Complete Order
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
