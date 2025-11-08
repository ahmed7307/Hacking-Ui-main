import { Link, useLocation } from 'wouter';
import { Menu, X, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState<Awaited<ReturnType<typeof getCurrentUser>> | null>(null);

  useEffect(() => {
    // Load user on mount
    getCurrentUser().then(setUser);

    // Listen to auth changes
    const onAuthChanged = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    
    window.addEventListener('auth-changed', onAuthChanged);
    
    // Listen to Supabase auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      window.removeEventListener('auth-changed', onAuthChanged);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    try {
      window.dispatchEvent(new Event('auth-changed'));
    } catch {}
    setLocation('/');
  };

  const publicLinks = [
    { path: '/', label: 'Home' },
    // { path: '/ctfs', label: 'CTFs' },
    { path: '/reports', label: 'Security Reports' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/writeups', label: 'Write-ups' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/halloffame', label: 'Hall of Fame' },
    { path: '/about', label: 'About' },
  ];

  const userLinks = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/ctfs', label: 'CTFs' },
    { path: '/reports', label: 'Security Reports' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/writeups', label: 'Write-ups' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/halloffame', label: 'Hall of Fame' },
    { path: '/about', label: 'About' },
  ];

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/ctfs', label: 'CTFs' },
    { path: '/reports', label: 'Security Reports' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/writeups', label: 'Write-ups' },
    { path: '/admin/reports', label: 'Manage Reports' },
    { path: '/admin/users', label: 'Users' },
    { path: '/admin/halloffame', label: 'Hall of Fame' },
  ];

  const links = user ? (user.role === 'admin' ? adminLinks : userLinks) : publicLinks;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={user ? (user.role === 'admin' ? '/admin/dashboard' : '/dashboard') : '/'}>
            <a className="flex items-center gap-2 group" data-testid="link-home">
              <Terminal className="w-6 h-6 text-primary animate-glow-pulse" />
              <span className="font-serif text-xl font-bold">
                Hacking <span className="text-primary">Vidya</span>
              </span>
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link key={link.path} href={link.path}>
                <a
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === link.path ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </a>
              </Link>
            ))}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2" data-testid="button-profile-menu">
                    <Avatar className="w-8 h-8 border border-primary/20">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <a className="w-full" data-testid="link-profile">Profile</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={user.role === 'admin' ? '/admin/settings' : '/settings'}>
                      <a className="w-full" data-testid="link-settings">Settings</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} data-testid="button-logout">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" data-testid="link-login">
                    Login
                  </a>
                </Link>
                <Link href="/register">
                  <Button variant="default" size="sm" data-testid="button-register">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {links.map((link) => (
              <Link key={link.path} href={link.path}>
                <a
                  className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}

            {user ? (
              <>
                <Link href="/profile">
                  <a className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Profile
                  </a>
                </Link>
                <Link href={user.role === 'admin' ? '/admin/settings' : '/settings'}>
                  <a className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Settings
                  </a>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <a className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </a>
                </Link>
                <Link href="/register">
                  <a className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </a>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
