import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsCard from '@/components/StatsCard';
import CTFCard from '@/components/CTFCard';
import { Trophy, Target, Flame, TrendingUp } from 'lucide-react';
import { mockCTFs } from '@/lib/mockData';
import { getCurrentUser } from '@/lib/auth';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function DashboardContent() {
  const user = getCurrentUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-3xl font-bold mb-2">
              Welcome back, <span className="text-primary">{user?.username}</span>
            </h1>
            <p className="text-muted-foreground mb-8">Here's your progress overview</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatsCard title="Total XP" value="4,250" icon={Trophy} trend="+12% this week" trendUp />
              <StatsCard title="Current Rank" value="Advanced" icon={TrendingUp} />
              <StatsCard title="Current Streak" value="12 days" icon={Flame} />
              <StatsCard title="Completed Rooms" value="24" icon={Target} />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="font-semibold text-xl mb-4">New Challenges</h2>
                <div className="grid gap-6">
                  {mockCTFs.slice(0, 3).map((ctf) => (
                    <CTFCard key={ctf.id} {...ctf} />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-xl mb-4">Recent Activity</h2>
                <Card className="border-primary/20">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Completed Web Exploitation 101</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Earned 250 XP</p>
                          <p className="text-xs text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Started Network Forensics</p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}