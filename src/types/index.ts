// User roles for the healthcare system
export type UserRole = 
  | 'patient' 
  | 'doctor' 
  | 'clinic_staff' 
  | 'pharmacy_staff' 
  | 'lab_staff' 
  | 'physiotherapist' 
  | 'nurse' 
  | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  address: Address;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  availableSlots: TimeSlot[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'in-person' | 'online';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  symptoms?: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medicines: PrescriptionMedicine[];
  instructions?: string;
  nextVisitDate?: string;
}

export interface PrescriptionMedicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  timing: 'before_food' | 'after_food' | 'with_food';
  quantity: number;
}

export interface LabTest {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  testType: string;
  date: string;
  time?: string;
  visitType: 'lab' | 'home';
  status: 'pending' | 'sample_collected' | 'processing' | 'completed';
  result?: string;
  reportUrl?: string;
  price: number;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  category: string;
  price: number;
  mrp: number;
  stock: number;
  unit: string;
  requiresPrescription: boolean;
  gstRate: number;
}

export interface PharmacyOrder {
  id: string;
  patientId: string;
  patientName: string;
  pharmacyBranchId: string;
  items: OrderItem[];
  totalAmount: number;
  gstAmount: number;
  grandTotal: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  deliveryType: 'pickup' | 'home_delivery';
  deliveryAddress?: Address;
  prescriptionId?: string;
  createdAt: string;
}

export interface OrderItem {
  medicineId: string;
  medicineName: string;
  quantity: number;
  price: number;
  gstAmount: number;
  total: number;
}

export interface ServiceBooking {
  id: string;
  patientId: string;
  patientName: string;
  serviceType: 'physiotherapy' | 'nursing';
  providerId: string;
  providerName: string;
  date: string;
  time: string;
  visitType: 'home' | 'clinic';
  address?: Address;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  price: number;
}

export interface Branch {
  id: string;
  name: string;
  type: 'clinic' | 'pharmacy' | 'lab';
  address: Address;
  phone: string;
  email: string;
  operatingHours: {
    open: string;
    close: string;
  };
}

export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  pendingOrders: number;
  pendingLabTests: number;
  revenue: number;
  newPatientsToday: number;
}
