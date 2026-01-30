import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ShoppingCart, Pill, Plus, Minus, Truck, MapPin, Upload, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { PrescriptionUpload } from '@/components/pharmacy/PrescriptionUpload';
import { FilterSheet, type FilterOptions } from '@/components/common/FilterSheet';

// Demo medicines with categories
const allMedicines = [
  { id: '1', name: 'Paracetamol 500mg', manufacturer: 'Cipla', category: 'pain-relief', price: 25, mrp: 30, inStock: true, popular: true },
  { id: '2', name: 'Vitamin C 1000mg', manufacturer: 'Himalaya', category: 'vitamins', price: 180, mrp: 220, inStock: true, popular: true },
  { id: '3', name: 'Cetirizine 10mg', manufacturer: 'Sun Pharma', category: 'pain-relief', price: 45, mrp: 55, inStock: true, popular: true },
  { id: '4', name: 'Omeprazole 20mg', manufacturer: 'Dr. Reddy\'s', category: 'digestive', price: 85, mrp: 100, inStock: true, popular: false },
  { id: '5', name: 'Azithromycin 500mg', manufacturer: 'Cipla', category: 'antibiotics', price: 120, mrp: 150, inStock: false, popular: false },
  { id: '6', name: 'Metformin 500mg', manufacturer: 'Sun Pharma', category: 'diabetes', price: 65, mrp: 80, inStock: true, popular: true },
  { id: '7', name: 'Atorvastatin 10mg', manufacturer: 'Cipla', category: 'cardiac', price: 95, mrp: 120, inStock: true, popular: false },
  { id: '8', name: 'Amoxicillin 250mg', manufacturer: 'Alkem', category: 'antibiotics', price: 75, mrp: 90, inStock: true, popular: false },
  { id: '9', name: 'Ibuprofen 400mg', manufacturer: 'Dr. Reddy\'s', category: 'pain-relief', price: 35, mrp: 45, inStock: true, popular: true },
  { id: '10', name: 'Vitamin D3 60K', manufacturer: 'Himalaya', category: 'vitamins', price: 150, mrp: 180, inStock: true, popular: true },
];

const pharmacyBranches = [
  { id: '1', name: 'Royal Pharmacy - Thillai Nagar', distance: '1.2 km' },
  { id: '2', name: 'Royal Pharmacy - Srirangam', distance: '3.5 km' },
  { id: '3', name: 'Royal Pharmacy - K.K. Nagar', distance: '4.8 km' },
];

export default function PatientPharmacy() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
  const [hasUploadedPrescription, setHasUploadedPrescription] = useState(false);

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

  // Filter and sort medicines
  const filteredMedicines = allMedicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filters.category || medicine.category === filters.category;
    const matchesInStock = !filters.inStockOnly || medicine.inStock;

    // Price filter
    let matchesPrice = true;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(s => parseInt(s.replace('+', '')) || Infinity);
      matchesPrice = medicine.price >= min && (max === Infinity || medicine.price <= max);
    }

    return matchesSearch && matchesCategory && matchesInStock && matchesPrice;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-low') return a.price - b.price;
    if (filters.sortBy === 'price-high') return b.price - a.price;
    if (filters.sortBy === 'discount') return ((b.mrp - b.price) / b.mrp) - ((a.mrp - a.price) / a.mrp);
    if (filters.sortBy === 'name') return a.name.localeCompare(b.name);
    if (filters.sortBy === 'popularity') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    return 0;
  });

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const medicine = allMedicines.find(m => m.id === id);
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

      <div className="container-padding">
        {/* Prescription Upload Banner */}
        {!hasUploadedPrescription && (
          <Card className="shadow-card mb-4 bg-gradient-to-r from-primary/5 to-info/5 border-primary/20">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Have a prescription?</p>
                  <p className="text-xs text-muted-foreground">Upload and get medicines delivered</p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => setShowPrescriptionUpload(true)}
              >
                Upload
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Prescription Upload Section */}
        {showPrescriptionUpload && (
          <div className="mb-4">
            <PrescriptionUpload
              onUploadComplete={() => setHasUploadedPrescription(true)}
              onRemove={() => {
                setHasUploadedPrescription(false);
                setShowPrescriptionUpload(false);
              }}
            />
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medicines, symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <FilterSheet
            filters={filters}
            onFiltersChange={setFilters}
            type="medicine"
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
            {filteredMedicines.length > 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    {filters.category || filters.sortBy || searchQuery ? 'Search Results' : 'All Medicines'}
                  </h3>
                  <span className="text-xs text-muted-foreground">{filteredMedicines.length} items</span>
                </div>
                {filteredMedicines.map((medicine) => (
                  <Card key={medicine.id} className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Pill className="h-4 w-4 text-primary" />
                            <h3 className="font-medium text-sm">{medicine.name}</h3>
                            {medicine.popular && (
                              <span className="flex items-center gap-1 text-[10px] bg-warning/10 text-warning px-1.5 py-0.5 rounded">
                                <TrendingUp className="h-3 w-3" /> Popular
                              </span>
                            )}
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
              </>
            ) : (
              <div className="text-center py-12">
                <Pill className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No medicines found</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Try adjusting your search or filters</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({});
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
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
                <Button variant="secondary" size="sm" onClick={() => window.location.href = '/patient/pharmacy/cart'}>
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
