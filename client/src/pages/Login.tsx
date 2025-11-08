import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { login } from '@/lib/auth';
import toast from 'react-hot-toast';
import { Terminal } from 'lucide-react';

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use email instead of username for Supabase login
      const { user, error } = await login(username, password);

      if (error) {
        toast.error(error);
        setIsLoading(false);
        return;
      }

      if (user) {
        toast.success(`Welcome back, ${user.username}!`);
        // Trigger auth change event
        window.dispatchEvent(new Event('auth-changed'));
        setTimeout(() => {
          setLocation('/dashboard');
        }, 500);
      }
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-card">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/">
            <a className="inline-flex items-center gap-2 mb-4">
              <Terminal className="w-8 h-8 text-primary animate-glow-pulse" />
              <span className="font-serif text-2xl font-bold">
                Hacking <span className="text-primary">Vidya</span>
              </span>
            </a>
          </Link>
        </div>

        <Card className="border-primary/20 shadow-neon">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Login to continue your hacking journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  id="username"
                  type="email"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  data-testid="input-username"
                  className="focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="input-password"
                  className="focus:border-primary"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-testid="button-login"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/register">
                <a className="text-primary hover:underline" data-testid="link-register">
                  Register
                </a>
              </Link>
            </div>


            <div className="mt-4 text-center">
              <Link href="/admin/login">
                <a className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Admin Login →
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}