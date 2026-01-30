import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, otp: string, role: UserRole) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
  isUserAuthorized: (phone: string) => boolean;
  toggleAuthorization: (phone: string) => void;
  authorizedPhones: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for different roles
const demoUsers: Record<UserRole, User> = {
  patient: {
    id: 'p1',
    name: 'Ramesh Kumar',
    email: 'ramesh@email.com',
    phone: '9876543210',
    role: 'patient',
  },
  doctor: {
    id: 'd1',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@medcare.com',
    phone: '9876543211',
    role: 'doctor',
  },
  clinic_staff: {
    id: 'cs1',
    name: 'Anitha R',
    email: 'anitha@medcare.com',
    phone: '9876543212',
    role: 'clinic_staff',
  },
  pharmacy_staff: {
    id: 'ps1',
    name: 'Suresh M',
    email: 'suresh@medcare.com',
    phone: '9876543213',
    role: 'pharmacy_staff',
  },
  lab_staff: {
    id: 'ls1',
    name: 'Kavitha S',
    email: 'kavitha@medcare.com',
    phone: '9876543214',
    role: 'lab_staff',
  },
  physiotherapist: {
    id: 'pt1',
    name: 'Dr. Arun K',
    email: 'arun@medcare.com',
    phone: '9876543215',
    role: 'physiotherapist',
  },
  nurse: {
    id: 'n1',
    name: 'Lakshmi V',
    email: 'lakshmi@medcare.com',
    phone: '9876543216',
    role: 'nurse',
  },
  admin: {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@medcare.com',
    phone: '9876543217',
    role: 'admin',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authorizedPhones, setAuthorizedPhones] = useState<string[]>([
    '9876543210', // Ramesh (Patient)
    '9876543211', // Dr. Priya
    '9876543217', // Admin
  ]);

  const isUserAuthorized = (phone: string) => authorizedPhones.includes(phone);

  const toggleAuthorization = (phone: string) => {
    setAuthorizedPhones(prev =>
      prev.includes(phone) ? prev.filter(p => p !== phone) : [...prev, phone]
    );
  };

  const login = async (phone: string, otp: string, role: UserRole): Promise<{ success: boolean; message?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!isUserAuthorized(phone)) {
      return { success: false, message: 'Your account is not authorized by the administrator.' };
    }

    // For demo, accept any 6-digit OTP
    if (otp.length === 6 || otp === '123456') {
      setUser(demoUsers[role]);
      return { success: true };
    }
    return { success: false, message: 'Invalid OTP. Please try again.' };
  };

  const logout = () => {
    setUser(null);
  };

  const setUserRole = (role: UserRole) => {
    setUser(demoUsers[role]);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      setUserRole,
      isUserAuthorized,
      toggleAuthorization,
      authorizedPhones
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
