/**
 * API Endpoints
 * Centralized definition of all API endpoints
 */

export const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        SEND_OTP: '/auth/send-otp',
        VERIFY_OTP: '/auth/verify-otp',
        ME: '/auth/me',
    },

    // Users
    USERS: {
        LIST: '/users',
        GET: (id: string) => `/users/${id}`,
        CREATE: '/users',
        UPDATE: (id: string) => `/users/${id}`,
        DELETE: (id: string) => `/users/${id}`,
        TOGGLE_AUTHORIZATION: (id: string) => `/users/${id}/authorization`,
    },

    // Patients
    PATIENTS: {
        LIST: '/patients',
        GET: (id: string) => `/patients/${id}`,
        CREATE: '/patients',
        UPDATE: (id: string) => `/patients/${id}`,
        DELETE: (id: string) => `/patients/${id}`,
        MEDICAL_HISTORY: (id: string) => `/patients/${id}/medical-history`,
    },

    // Appointments
    APPOINTMENTS: {
        LIST: '/appointments',
        GET: (id: string) => `/appointments/${id}`,
        CREATE: '/appointments',
        UPDATE: (id: string) => `/appointments/${id}`,
        CANCEL: (id: string) => `/appointments/${id}/cancel`,
        BY_DOCTOR: (doctorId: string) => `/appointments/doctor/${doctorId}`,
        BY_PATIENT: (patientId: string) => `/appointments/patient/${patientId}`,
    },

    // Prescriptions
    PRESCRIPTIONS: {
        LIST: '/prescriptions',
        GET: (id: string) => `/prescriptions/${id}`,
        CREATE: '/prescriptions',
        UPDATE: (id: string) => `/prescriptions/${id}`,
        BY_PATIENT: (patientId: string) => `/prescriptions/patient/${patientId}`,
    },

    // Lab Tests
    LAB_TESTS: {
        LIST: '/lab-tests',
        GET: (id: string) => `/lab-tests/${id}`,
        CREATE: '/lab-tests',
        UPDATE: (id: string) => `/lab-tests/${id}`,
        UPDATE_STATUS: (id: string) => `/lab-tests/${id}/status`,
        ADD_RESULTS: (id: string) => `/lab-tests/${id}/results`,
        BY_PATIENT: (patientId: string) => `/lab-tests/patient/${patientId}`,
    },

    // Pharmacy
    PHARMACY: {
        MEDICINES: {
            LIST: '/pharmacy/medicines',
            GET: (id: string) => `/pharmacy/medicines/${id}`,
            CREATE: '/pharmacy/medicines',
            UPDATE: (id: string) => `/pharmacy/medicines/${id}`,
            DELETE: (id: string) => `/pharmacy/medicines/${id}`,
            SEARCH: '/pharmacy/medicines/search',
        },
        ORDERS: {
            LIST: '/pharmacy/orders',
            GET: (id: string) => `/pharmacy/orders/${id}`,
            CREATE: '/pharmacy/orders',
            UPDATE_STATUS: (id: string) => `/pharmacy/orders/${id}/status`,
            BY_PATIENT: (patientId: string) => `/pharmacy/orders/patient/${patientId}`,
        },
        INVENTORY: {
            LIST: '/pharmacy/inventory',
            UPDATE: (id: string) => `/pharmacy/inventory/${id}`,
            LOW_STOCK: '/pharmacy/inventory/low-stock',
        },
    },

    // Branches
    BRANCHES: {
        LIST: '/branches',
        GET: (id: string) => `/branches/${id}`,
        CREATE: '/branches',
        UPDATE: (id: string) => `/branches/${id}`,
        DELETE: (id: string) => `/branches/${id}`,
    },

    // Services (Physiotherapy & Nursing)
    SERVICES: {
        APPOINTMENTS: {
            LIST: '/services/appointments',
            GET: (id: string) => `/services/appointments/${id}`,
            CREATE: '/services/appointments',
            UPDATE: (id: string) => `/services/appointments/${id}`,
            UPDATE_STATUS: (id: string) => `/services/appointments/${id}/status`,
            BY_PROVIDER: (providerId: string) => `/services/appointments/provider/${providerId}`,
            BY_PATIENT: (patientId: string) => `/services/appointments/patient/${patientId}`,
        },
    },

    // Dashboard & Analytics
    DASHBOARD: {
        STATS: '/dashboard/stats',
        PATIENT_STATS: '/dashboard/patient/stats',
        DOCTOR_STATS: '/dashboard/doctor/stats',
        LAB_STATS: '/dashboard/lab/stats',
        PHARMACY_STATS: '/dashboard/pharmacy/stats',
        ADMIN_STATS: '/dashboard/admin/stats',
    },
} as const;
