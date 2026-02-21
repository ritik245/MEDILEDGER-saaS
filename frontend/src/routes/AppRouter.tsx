import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleBasedRoute } from '@/components/RoleBasedRoute';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { DashboardHomePage } from '@/pages/DashboardHomePage';
import { DoctorDashboardPage } from '@/pages/DoctorDashboardPage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PatientDashboardPage } from '@/pages/PatientDashboardPage';
import { PermissionsPage } from '@/pages/PermissionsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RecordsPage } from '@/pages/RecordsPage';
import { SignupPage } from '@/pages/SignupPage';
import { UploadPage } from '@/pages/UploadPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHomePage />} />

          <Route element={<RoleBasedRoute allow={['PATIENT']} />}>
            <Route path="/dashboard/patient" element={<PatientDashboardPage />} />
          </Route>
          <Route element={<RoleBasedRoute allow={['DOCTOR']} />}>
            <Route path="/dashboard/doctor" element={<DoctorDashboardPage />} />
          </Route>
          <Route element={<RoleBasedRoute allow={['ADMIN']} />}>
            <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
          </Route>

          <Route path="/records" element={<RecordsPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/permissions" element={<PermissionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
