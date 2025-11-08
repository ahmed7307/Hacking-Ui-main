import { useLocation } from 'wouter';
import { getCurrentUser } from '@/lib/auth';
import { useEffect } from 'react';

interface GuestRouteProps {
  children: React.ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const [, setLocation] = useLocation();
  const user = getCurrentUser();

  useEffect(() => {
    // If user is already logged in, redirect them to appropriate dashboard
    if (user) {
      if (user.role === 'admin') {
        setLocation('/admin/dashboard', { replace: true });
      } else {
        setLocation('/dashboard', { replace: true });
      }
    }
  }, [user, setLocation]);

  // If user is logged in, don't render the page (they're being redirected)
  if (user) {
    return null;
  }

  // User is not logged in, show the login/register page
  return <>{children}</>;
}