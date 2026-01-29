import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ShoppingCart, Pill, Plus, Minus, Truck, MapPin } from 'lucide-react';
import { useState } from 'react';

// Demo medicines
const popularMedicines = [
  { id: '1', name: 'Paracetamol 500mg', manufacturer: 'Cipla', price: 25, mrp: 30, inStock: true },
  { id: '2', name: 'Vitamin C 1000mg', manufacturer: 'Himalaya', price: 180, mrp: 220, inStock: true },
  { id: '3', name: 'Cetirizine 10mg', manufacturer: 'Sun Pharma', price: 45, mrp: 55, inStock: true },
  { id: '4', name: 'Omeprazole 20mg', manufacturer: 'Dr. Reddy\'s', price: 85, mrp: 100, inStock: true },
  { id: '5', name: 'Azithromycin 500mg', manufacturer: 'Cipla', price: 120, mrp: 150, inStock: false },
];

const pharmacyBranches = [
  { id: '1', name: 'MedCare+ Pharmacy - Thillai Nagar', distance: '1.2 km' },
  { id: '2', name: 'MedCare+ Pharmacy - Srirangam', distance: '3.5 km' },
  { id: '3', name: 'MedCare+ Pharmacy - K.K. Nagar', distance: '4.8 km' },
];

export default function PatientPharmacy() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id]--;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const medicine = popularMedicines.find(m => m.id === id);
    return sum + (medicine?.price || 0) * qty;
  }, 0);

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Pharmacy" 
        rightAction={
          <Button variant="outline" size="sm" className="relative h-9">
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        }
      />
      
      <div className="p-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        {/* Delivery Options */}
        <div className="flex gap-2 mb-4">
          <Card className="flex-1 shadow-card">
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Truck className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium">Home Delivery</p>
                <p className="text-[10px] text-muted-foreground">Free above ₹499</p>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 shadow-card">
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-success/10">
                <MapPin className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-xs font-medium">Store Pickup</p>
                <p className="text-[10px] text-muted-foreground">Ready in 30 mins</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="browse">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="my-orders">My Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="space-y-3 mt-0">
            <h3 className="font-medium text-sm text-muted-foreground">Popular Medicines</h3>
            {popularMedicines.map((medicine) => (
              <Card key={medicine.id} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Pill className="h-4 w-4 text-primary" />
                        <h3 className="font-medium text-sm">{medicine.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{medicine.manufacturer}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">₹{medicine.price}</span>
                        <span className="text-xs text-muted-foreground line-through">₹{medicine.mrp}</span>
                        <span className="text-xs text-success font-medium">
                          {Math.round((1 - medicine.price / medicine.mrp) * 100)}% off
                        </span>
                      </div>
                    </div>
                    <div>
                      {!medicine.inStock ? (
                        <span className="text-xs text-destructive">Out of stock</span>
                      ) : cart[medicine.id] ? (
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => removeFromCart(medicine.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-6 text-center">
                            {cart[medicine.id]}
                          </span>
                          <Button 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => addToCart(medicine.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          className="h-8"
                          onClick={() => addToCart(medicine.id)}
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="my-orders" className="mt-0">
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm">No orders yet</p>
              <p className="text-xs text-muted-foreground mt-1">Your order history will appear here</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Cart Summary */}
        {cartCount > 0 && (
          <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto">
            <Card className="shadow-float bg-primary text-primary-foreground">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{cartCount} items</p>
                  <p className="text-xs opacity-80">₹{cartTotal} + GST</p>
                </div>
                <Button variant="secondary" size="sm">
                  View Cart →
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
