import { motion } from 'framer-motion';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCurrentUser } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, Flame, Settings } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

function ProfileContent() {
  const user = getCurrentUser();

  if (!user) return null;

  const isAdmin = user.role === 'admin';

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
            <Card className="border-primary/20 mb-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <Avatar className="w-24 h-24 border-2 border-primary/40">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="text-2xl">{user.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="font-serif text-3xl font-bold">{user.username}</h1>
                      <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40">
                        {isAdmin ? 'Administrator' : 'Advanced'}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {isAdmin ? 'Platform Administrator' : 'Cybersecurity enthusiast | CTF player'}
                    </p>
                    {!isAdmin && (
                      <div className="flex gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-primary" />
                          <span>4,250 XP</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary" />
                          <span>24 Rooms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-primary" />
                          <span>12 Day Streak</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link href={isAdmin ? "/admin/settings" : "/settings"}>
                    <Button variant="outline" data-testid="button-edit-profile">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                </div>

                {!isAdmin && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress to Expert</span>
                      <span className="text-sm text-muted-foreground">4,250 / 7,000 XP</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {!isAdmin && (
              <Tabs defaultValue="rooms" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="rooms" data-testid="tab-rooms">Completed Rooms</TabsTrigger>
                  <TabsTrigger value="blogs" data-testid="tab-blogs">Blogs</TabsTrigger>
                  <TabsTrigger value="writeups" data-testid="tab-writeups">Write-ups</TabsTrigger>
                </TabsList>

                <TabsContent value="rooms">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle>Completed Rooms</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                          <div>
                            <p className="font-medium">Web Exploitation 101</p>
                            <p className="text-sm text-muted-foreground">Completed 2 days ago</p>
                          </div>
                          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40">
                            Easy
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="blogs">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle>Published Blogs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">No blogs published yet.</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="writeups">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle>Published Write-ups</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                          <div>
                            <p className="font-medium">Web Exploitation 101 - Complete Walkthrough</p>
                            <p className="text-sm text-muted-foreground">Published 4 days ago • 89 likes</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}