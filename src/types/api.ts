/**
 * API Types and Interfaces for Royal Pharmacy
 * Defines all request/response contracts for backend integration
 */

// ============= Common Types =============

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: ApiError;
    message?: string;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, any>;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
    };
}

// ============= Authentication =============

export interface LoginRequest {
    phone: string;
    otp?: string;
    role?: UserRole;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
    user: User;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface SendOTPRequest {
    phone: string;
}

// ============= User Management =============

export type UserRole =
    | 'patient'
    | 'doctor'
    | 'pharmacy'
    | 'lab'
    | 'admin'
    | 'physiotherapist'
    | 'nurse';

export interface User {
    id: string;
    name: string;
    phone: string;
    email?: string;
    role: UserRole;
    isAuthorized: boolean;
    branchId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserRequest {
    name: string;
    phone: string;
    email?: string;
    role: UserRole;
    branchId?: string;
}

export interface UpdateUserRequest {
    name?: string;
    email?: string;
    role?: UserRole;
    branchId?: string;
    isAuthorized?: boolean;
}

// ============= Patients =============

export interface Patient extends User {
    role: 'patient';
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
    bloodGroup?: string;
    address?: Address;
    emergencyContact?: string;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    pincode: string;
}

// ============= Appointments =============

export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    type: 'consultation' | 'follow-up' | 'emergency';
    symptoms?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAppointmentRequest {
    patientId: string;
    doctorId: string;
    date: string;
    time: string;
    type: Appointment['type'];
    symptoms?: string;
}

export interface UpdateAppointmentRequest {
    date?: string;
    time?: string;
    status?: Appointment['status'];
    notes?: string;
}

// ============= Prescriptions =============

export interface Prescription {
    id: string;
    appointmentId: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    date: string;
    diagnosis: string;
    medicines: Medicine[];
    instructions?: string;
    createdAt: string;
}

export interface Medicine {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
}

export interface CreatePrescriptionRequest {
    appointmentId: string;
    patientId: string;
    diagnosis: string;
    medicines: Omit<Medicine, 'id'>[];
    instructions?: string;
}

// ============= Lab Reports =============

export interface LabTest {
    id: string;
    patientId: string;
    patientName: string;
    testName: string;
    date: string;
    status: 'pending' | 'collected' | 'processing' | 'completed';
    urgency: 'normal' | 'urgent';
    prescriptionId?: string;
    labName: string;
    parameters?: TestParameter[];
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface TestParameter {
    id: string;
    name: string;
    value: string;
    unit: string;
    refRange: string;
}

export interface CreateLabTestRequest {
    patientId: string;
    testName: string;
    urgency?: LabTest['urgency'];
    prescriptionId?: string;
}

export interface UpdateLabTestRequest {
    status?: LabTest['status'];
    parameters?: Omit<TestParameter, 'id'>[];
    notes?: string;
}

// ============= Pharmacy =============

export interface PharmacyOrder {
    id: string;
    patientId: string;
    patientName: string;
    prescriptionId?: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'ready' | 'completed' | 'cancelled';
    paymentStatus: 'pending' | 'paid';
    deliveryType: 'pickup' | 'delivery';
    deliveryAddress?: Address;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    medicineId: string;
    medicineName: string;
    quantity: number;
    price: number;
    discount?: number;
}

export interface Medicine {
    id: string;
    name: string;
    category: string;
    manufacturer?: string;
    price: number;
    stock: number;
    expiryDate?: string;
    requiresPrescription: boolean;
}

export interface CreateOrderRequest {
    patientId: string;
    prescriptionId?: string;
    items: Omit<OrderItem, 'medicineId'>[];
    deliveryType: PharmacyOrder['deliveryType'];
    deliveryAddress?: Address;
}

// ============= Branches =============

export interface Branch {
    id: string;
    name: string;
    address: Address;
    phone: string;
    email?: string;
    services: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBranchRequest {
    name: string;
    address: Address;
    phone: string;
    email?: string;
    services: string[];
}

export interface UpdateBranchRequest {
    name?: string;
    address?: Address;
    phone?: string;
    email?: string;
    services?: string[];
    isActive?: boolean;
}

// ============= Services (Physio & Nurse) =============

export interface ServiceAppointment {
    id: string;
    patientId: string;
    patientName: string;
    providerId: string;
    providerName: string;
    serviceType: 'physiotherapy' | 'nursing';
    date: string;
    time: string;
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    notes?: string;
    visitType: 'clinic' | 'home';
    address?: Address;
    createdAt: string;
    updatedAt: string;
}

export interface CreateServiceAppointmentRequest {
    patientId: string;
    providerId: string;
    serviceType: ServiceAppointment['serviceType'];
    date: string;
    time: string;
    visitType: ServiceAppointment['visitType'];
    address?: Address;
    notes?: string;
}
