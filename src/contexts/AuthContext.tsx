import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, otp: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
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

  const login = async (phone: string, otp: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo, accept any 6-digit OTP
    if (otp.length === 6) {
      setUser(demoUsers[role]);
      return true;
    }
    return false;
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
      setUserRole 
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
