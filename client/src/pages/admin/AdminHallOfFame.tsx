import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HallOfFameCard from '@/components/HallOfFameCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import { mockHallOfFame, mockReports, type HallOfFameEntry, type Report } from '@/lib/mockData';

function AdminHallOfFameContent() {
  const [entries, setEntries] = useState<HallOfFameEntry[]>(mockHallOfFame);
  const [manageDialogOpen, setManageDialogOpen] = useState(false);
  const [approvedReports] = useState<Report[]>(mockReports.filter(r => r.status === 'approved'));
  const [reward, setReward] = useState('Hall of Fame');

  const handleDelete = (entryId: string) => {
    setEntries(entries.filter(e => e.id !== entryId));
    toast.success('Entry removed from Hall of Fame');
    console.log('Delete Hall of Fame entry:', entryId);
  };

  const handlePromoteReport = (report: Report) => {
    const newEntry: HallOfFameEntry = {
      id: `hof-${Date.now()}`,
      username: report.submittedBy,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${report.submittedBy}`,
      bugTitle: report.bugTitle,
      reward: reward,
      date: new Date().toISOString().split('T')[0],
    };
    
    setEntries([newEntry, ...entries]);
    toast.success(`${report.submittedBy} added to Hall of Fame!`);
    console.log('Promote to Hall of Fame:', report);
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
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-bold mb-2">
                  Manage Hall of <span className="text-primary">Fame</span>
                </h1>
                <p className="text-muted-foreground">Review and manage Hall of Fame entries</p>
              </div>
              <Button onClick={() => setManageDialogOpen(true)} data-testid="button-manage-halloffame">
                <Plus className="w-4 h-4 mr-2" />
                Add from Reports
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <HallOfFameCard {...entry} />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-4 right-4"
                    onClick={() => handleDelete(entry.id)}
                    data-testid={`button-delete-${entry.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>

            {entries.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No Hall of Fame entries yet
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Dialog open={manageDialogOpen} onOpenChange={setManageDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto" aria-labelledby="manage-dialog-title" aria-describedby="manage-dialog-description">
          <DialogHeader>
            <DialogTitle id="manage-dialog-title">Add to Hall of Fame</DialogTitle>
            <DialogDescription id="manage-dialog-description">
              Select approved reports to add to Hall of Fame
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reward">Default Reward</Label>
              <Input
                id="reward"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="e.g., Hall of Fame + $500"
                data-testid="input-reward"
              />
            </div>

            <div className="space-y-4 mt-4">
              <h3 className="font-semibold">Approved Reports</h3>
              {approvedReports.length === 0 ? (
                <p className="text-sm text-muted-foreground">No approved reports available</p>
              ) : (
                approvedReports.map((report) => (
                  <Card key={report.id} className="border-primary/20 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40">
                            {report.severity}
                          </Badge>
                          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40">
                            Approved
                          </Badge>
                        </div>
                        <h4 className="font-semibold mb-1">{report.bugTitle}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Submitted by <span className="font-medium">{report.submittedBy}</span> on{' '}
                          {new Date(report.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          handlePromoteReport(report);
                          setManageDialogOpen(false);
                        }}
                        data-testid={`button-promote-${report.id}`}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setManageDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

export default function AdminHallOfFame() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminHallOfFameContent />
    </ProtectedRoute>
  );
}