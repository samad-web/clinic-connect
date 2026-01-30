import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Pill, 
  Plus, 
  Minus, 
  Trash2, 
  Truck, 
  MapPin, 
  Receipt,
  Check,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Demo cart items
const initialCartItems = [
  { id: '1', name: 'Paracetamol 500mg', manufacturer: 'Cipla', price: 25, mrp: 30, quantity: 2, gstRate: 5 },
  { id: '2', name: 'Vitamin C 1000mg', manufacturer: 'Himalaya', price: 180, mrp: 220, quantity: 1, gstRate: 12 },
  { id: '3', name: 'Cetirizine 10mg', manufacturer: 'Sun Pharma', price: 45, mrp: 55, quantity: 1, gstRate: 5 },
];

interface CartItem {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  mrp: number;
  quantity: number;
  gstRate: number;
}

export default function PharmacyCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // GST Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const gstBreakdown = cartItems.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    const gstAmount = (itemTotal * item.gstRate) / 100;
    const rate = item.gstRate;
    
    if (acc[rate]) {
      acc[rate] += gstAmount;
    } else {
      acc[rate] = gstAmount;
    }
    return acc;
  }, {} as Record<number, number>);

  const totalGst = Object.values(gstBreakdown).reduce((sum, amt) => sum + amt, 0);
  const deliveryCharge = deliveryType === 'delivery' && subtotal < 499 ? 40 : 0;
  const grandTotal = subtotal + totalGst + deliveryCharge;

  const handlePlaceOrder = async () => {
    setIsOrdering(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOrderId(`ORD${Date.now().toString().slice(-6)}`);
    setOrderPlaced(true);
    setIsOrdering(false);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen pb-6">
        <PageHeader title="Order Placed" />
        
        <div className="px-4 py-8 text-center">
          <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Check className="h-10 w-10 text-success" />
          </div>
          <h2 className="font-heading font-bold text-xl mb-2">Order Confirmed!</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your order #{orderId} has been placed successfully
          </p>

          {/* Invoice */}
          <Card className="shadow-card-lg text-left mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                <div>
                  <h3 className="font-heading font-semibold">Tax Invoice</h3>
                  <p className="text-xs text-muted-foreground">#{orderId}</p>
                </div>
                <Receipt className="h-6 w-6 text-primary" />
              </div>

              <div className="space-y-2 text-sm mb-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {Object.entries(gstBreakdown).map(([rate, amount]) => (
                  <div key={rate} className="flex justify-between">
                    <span className="text-muted-foreground">
                      GST @ {rate}% (CGST {Number(rate)/2}% + SGST {Number(rate)/2}%)
                    </span>
                    <span>₹{amount.toFixed(2)}</span>
                  </div>
                ))}
                {deliveryCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Charge</span>
                    <span>₹{deliveryCharge.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t font-medium text-base">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <strong>GSTIN:</strong> 33AABCU9603R1ZM<br />
                  MedCare+ Pharmacy, Trichy, Tamil Nadu
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button className="w-full" onClick={() => navigate('/patient/pharmacy')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-6">
      <PageHeader title="Cart" showBack backPath="/patient/pharmacy" />
      
      <div className="px-4 space-y-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button className="mt-4" onClick={() => navigate('/patient/pharmacy')}>
              Browse Medicines
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <Card key={item.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                        <Pill className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.manufacturer}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-semibold text-sm">₹{item.price}</span>
                          <span className="text-xs text-muted-foreground line-through">₹{item.mrp}</span>
                          <span className="text-xs text-success">
                            {Math.round((1 - item.price / item.mrp) * 100)}% off
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          GST @ {item.gstRate}%
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Delivery Options */}
            <Card className="shadow-card">
              <CardContent className="p-4">
                <h3 className="font-medium text-sm mb-3">Delivery Options</h3>
                <RadioGroup value={deliveryType} onValueChange={(v) => setDeliveryType(v as any)}>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer">
                      <MapPin className="h-4 w-4 text-success" />
                      <div>
                        <p className="text-sm font-medium">Store Pickup</p>
                        <p className="text-xs text-muted-foreground">Ready in 30 mins • Free</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer">
                      <Truck className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Home Delivery</p>
                        <p className="text-xs text-muted-foreground">
                          {subtotal >= 499 ? 'Free delivery' : '₹40 delivery (Free above ₹499)'}
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {deliveryType === 'delivery' && (
                  <div className="mt-4">
                    <Label htmlFor="address" className="text-sm">Delivery Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter your complete address..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bill Summary */}
            <Card className="shadow-card-lg">
              <CardContent className="p-4">
                <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <Receipt className="h-4 w-4" />
                  Bill Summary
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {Object.entries(gstBreakdown).map(([rate, amount]) => (
                    <div key={rate} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        GST @ {rate}% (CGST {Number(rate)/2}% + SGST {Number(rate)/2}%)
                      </span>
                      <span>₹{amount.toFixed(2)}</span>
                    </div>
                  ))}
                  
                  {deliveryCharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Charge</span>
                      <span>₹{deliveryCharge.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-3 border-t border-dashed font-medium text-base">
                    <span>Grand Total</span>
                    <span className="text-lg">₹{grandTotal.toFixed(2)}</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground pt-2">
                    (Inclusive of all taxes)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button 
              className="w-full h-12" 
              onClick={handlePlaceOrder}
              disabled={isOrdering || (deliveryType === 'delivery' && !address)}
            >
              {isOrdering ? 'Placing Order...' : `Place Order • ₹${grandTotal.toFixed(2)}`}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
