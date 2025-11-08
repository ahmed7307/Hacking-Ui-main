import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import { mockUsers, type User } from '@/lib/mockData';

function AdminUsersContent() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [warningDialogOpen, setWarningDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [warningMessage, setWarningMessage] = useState('');

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendWarning = () => {
    if (selectedUser && warningMessage) {
      toast.success(`Warning sent to ${selectedUser.username}`);
      console.log('Send warning to:', selectedUser.username, warningMessage);
      setWarningDialogOpen(false);
      setWarningMessage('');
    }
  };

  const handleBan = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: 'banned' as const } : u
    ));
    toast.success('User banned');
    console.log('Ban user:', userId);
  };

  const handleUnban = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: 'active' as const } : u
    ));
    toast.success('User unbanned');
    console.log('Unban user:', userId);
  };

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
              User <span className="text-primary">Management</span>
            </h1>
            <p className="text-muted-foreground mb-8">Manage platform users</p>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search users by username or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 focus:border-primary"
                data-testid="input-search-users"
              />
            </div>

            <div className="overflow-x-auto bg-card rounded-lg border border-primary/20">
              <table className="w-full" role="table" aria-label="User management">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-6 text-sm font-semibold">User</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold">Email</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold">Role</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-border hover-elevate"
                      data-testid={`row-user-${user.id}`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar} alt={user.username} />
                            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.username}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-muted-foreground">{user.email}</td>
                      <td className="py-4 px-6">
                        <Badge variant="outline">{user.role}</Badge>
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          variant="outline"
                          className={user.status === 'active' ? 'bg-primary/20 text-primary border-primary/40' : 'bg-destructive/20 text-destructive border-destructive/40'}
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedUser(user);
                              setWarningDialogOpen(true);
                            }}
                            data-testid={`button-warn-${user.id}`}
                          >
                            Warn
                          </Button>
                          {user.status === 'active' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleBan(user.id)}
                              data-testid={`button-ban-${user.id}`}
                            >
                              Ban
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUnban(user.id)}
                              data-testid={`button-unban-${user.id}`}
                            >
                              Unban
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No users found matching your search
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Dialog open={warningDialogOpen} onOpenChange={setWarningDialogOpen}>
        <DialogContent aria-labelledby="warning-dialog-title" aria-describedby="warning-dialog-description">
          <DialogHeader>
            <DialogTitle id="warning-dialog-title">Send Warning</DialogTitle>
            <DialogDescription id="warning-dialog-description">
              Send a warning message to {selectedUser?.username}
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter warning message..."
            value={warningMessage}
            onChange={(e) => setWarningMessage(e.target.value)}
            rows={4}
            data-testid="input-warning-message"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setWarningDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendWarning} data-testid="button-send-warning">
              Send Warning
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

export default function AdminUsers() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminUsersContent />
    </ProtectedRoute>
  );
}