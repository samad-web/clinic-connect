import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import PatientLayout from "./layouts/PatientLayout";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientRecords from "./pages/patient/PatientRecords";
import PatientPharmacy from "./pages/patient/PatientPharmacy";
import PatientProfile from "./pages/patient/PatientProfile";
import DoctorLayout from "./layouts/DoctorLayout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorPrescription from "./pages/doctor/DoctorPrescription";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PharmacyLayout from "./layouts/PharmacyLayout";
import PharmacyDashboard from "./pages/pharmacy/PharmacyDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            
            {/* Patient Routes */}
            <Route path="/patient" element={<PatientLayout />}>
              <Route index element={<PatientDashboard />} />
              <Route path="appointments" element={<PatientAppointments />} />
              <Route path="records" element={<PatientRecords />} />
              <Route path="pharmacy" element={<PatientPharmacy />} />
              <Route path="profile" element={<PatientProfile />} />
            </Route>
            
            {/* Doctor Routes */}
            <Route path="/doctor" element={<DoctorLayout />}>
              <Route index element={<DoctorDashboard />} />
              <Route path="patients" element={<DoctorPatients />} />
              <Route path="prescriptions" element={<DoctorPrescription />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>
            
            {/* Pharmacy Routes */}
            <Route path="/pharmacy" element={<PharmacyLayout />}>
              <Route index element={<PharmacyDashboard />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
