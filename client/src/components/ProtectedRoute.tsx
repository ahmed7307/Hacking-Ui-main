import { useLocation } from 'wouter';
import { getCurrentUser } from '@/lib/auth';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      setLocation('/login', { replace: true });
      return;
    }

    if (requireAdmin && user.role !== 'admin') {
      setLocation('/dashboard', { replace: true });
      return;
    }

    if (!requireAdmin && user.role === 'admin' && window.location.pathname === '/dashboard') {
      setLocation('/admin/dashboard', { replace: true });
      return;
    }
  }, [user, requireAdmin, setLocation]);

  if (!user) {
    return null;
  }

  if (requireAdmin && user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}