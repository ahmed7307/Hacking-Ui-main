import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { adminLogin } from '@/lib/auth';
import toast from 'react-hot-toast';
import { Shield, Terminal } from 'lucide-react';

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const user = adminLogin(username, password);

    if (user) {
      toast.success(`Welcome back, Administrator ${user.username}!`);
      setTimeout(() => {
        setLocation('/admin/dashboard');
      }, 500);
    } else {
      toast.error('Invalid admin credentials');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-800">
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
              <span className="font-serif text-2xl font-bold text-white">
                Hacking <span className="text-primary">Vidya</span>
              </span>
            </a>
          </Link>
        </div>

        <Card className="border-red-500/30 shadow-lg shadow-red-500/20 bg-slate-900/50 backdrop-blur">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-500" />
              <CardTitle className="text-white">Admin Access</CardTitle>
            </div>
            <CardDescription className="text-slate-400">
              Restricted area - Administrator login only
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-200">Admin Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Admin Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-red-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Admin Login'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <Link href="/login">
                <a className="text-slate-400 hover:text-primary transition-colors">
                  ← Back to User Login
                </a>
              </Link>
            </div>

            <div className="mt-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-sm">
              <p className="font-semibold mb-2 text-slate-200 flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-500" />
                Demo Admin Credentials:
              </p>
              <p className="text-slate-400">Username: admin</p>
              <p className="text-slate-400">Password: admin</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}