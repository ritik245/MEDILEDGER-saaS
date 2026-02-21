import { Role } from '@/types/auth';

export const roleHomePath = (role: Role): string => {
  switch (role) {
    case 'PATIENT':
      return '/dashboard/patient';
    case 'DOCTOR':
      return '/dashboard/doctor';
    case 'ADMIN':
      return '/dashboard/admin';
    default:
      return '/dashboard';
  }
};
