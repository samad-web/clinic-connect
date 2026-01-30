import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import PatientLayout from "./layouts/PatientLayout";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientAppointments from "./pages/patient/PatientAppointments";
import BookAppointment from "./pages/patient/BookAppointment";
import PatientRecords from "./pages/patient/PatientRecords";
import PatientPharmacy from "./pages/patient/PatientPharmacy";
import PharmacyCart from "./pages/patient/PharmacyCart";
import LabBooking from "./pages/patient/LabBooking";
import PatientProfile from "./pages/patient/PatientProfile";
import OrderTracking from "./pages/patient/OrderTracking";
import DoctorLayout from "./layouts/DoctorLayout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorPrescription from "./pages/doctor/DoctorPrescription";
import ServiceLayout from "./layouts/ServiceLayout";
import PhysioDashboard from "./pages/services/PhysioDashboard";
import NurseDashboard from "./pages/services/NurseDashboard";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PharmacyLayout from "./layouts/PharmacyLayout";
import PharmacyDashboard from "./pages/pharmacy/PharmacyDashboard";
import PharmacyBilling from "./pages/pharmacy/PharmacyBilling";
import InventoryManager from "./pages/pharmacy/InventoryManager";
import UserManagement from "./pages/admin/UserManagement";
import BranchManagement from "./pages/admin/BranchManagement";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import LabLayout from "./layouts/LabLayout";
import LabDashboard from "./pages/lab/LabDashboard";
import LabTasks from "./pages/lab/LabTasks";
import ReportEditor from "./pages/lab/ReportEditor";
import LabPending from "./pages/lab/LabPending";
import LabHistory from "./pages/lab/LabHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Register service worker for offline support
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration.scope);
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    });
  }
}

const App = () => {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <OfflineIndicator />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Patient Routes */}
              <Route path="/patient" element={<PatientLayout />}>
                <Route index element={<PatientDashboard />} />
                <Route path="appointments" element={<PatientAppointments />} />
                <Route path="appointments/book" element={<BookAppointment />} />
                <Route path="records" element={<PatientRecords />} />
                <Route path="pharmacy" element={<PatientPharmacy />} />
                <Route path="pharmacy/cart" element={<PharmacyCart />} />
                <Route path="lab" element={<LabBooking />} />
                <Route path="orders" element={<OrderTracking />} />
                <Route path="profile" element={<PatientProfile />} />
              </Route>

              {/* Clinic Staff Routes - same as admin */}
              <Route path="/clinic" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="staff" element={<UserManagement />} />
                <Route path="branches" element={<BranchManagement />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Doctor Routes */}
              <Route path="/doctor" element={<DoctorLayout />}>
                <Route index element={<DoctorDashboard />} />
                <Route path="patients" element={<DoctorPatients />} />
                <Route path="prescriptions" element={<DoctorPrescription />} />
              </Route>

              {/* Service Routes (Physio & Nurse) */}
              <Route path="/services" element={<ServiceLayout />}>
                <Route index element={<PhysioDashboard />} />
                <Route path="physio" element={<PhysioDashboard />} />
                <Route path="nurse" element={<NurseDashboard />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="branches" element={<BranchManagement />} />
              </Route>

              {/* Lab Routes */}
              <Route path="/lab" element={<LabLayout />}>
                <Route index element={<LabDashboard />} />
                <Route path="tasks" element={<LabTasks />} />
                <Route path="tasks/:taskId/edit" element={<ReportEditor />} />
                <Route path="pending" element={<LabPending />} />
                <Route path="history" element={<LabHistory />} />
              </Route>

              {/* Pharmacy Routes */}
              <Route path="/pharmacy" element={<PharmacyLayout />}>
                <Route index element={<PharmacyDashboard />} />
                <Route path="billing" element={<PharmacyBilling />} />
                <Route path="inventory" element={<InventoryManager />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
