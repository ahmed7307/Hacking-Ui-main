import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import { mockReports, type Report } from '@/lib/mockData';

function AdminReportsContent() {
  const [reports, setReports] = useState<Report[]>(mockReports);

  const handleApprove = (reportId: string) => {
    setReports(reports.map(r => 
      r.id === reportId ? { ...r, status: 'approved' as const } : r
    ));
    toast.success('Report approved and added to Hall of Fame!');
    console.log('Approve report:', reportId);
  };

  const handleReject = (reportId: string) => {
    setReports(reports.map(r => 
      r.id === reportId ? { ...r, status: 'rejected' as const } : r
    ));
    toast.success('Report rejected');
    console.log('Reject report:', reportId);
  };

  const handleDelete = (reportId: string) => {
    setReports(reports.filter(r => r.id !== reportId));
    toast.success('Report deleted');
    console.log('Delete report:', reportId);
  };

  const severityColors = {
    Low: 'bg-blue-500/20 text-blue-500 border-blue-500/40',
    Medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/40',
    High: 'bg-orange-500/20 text-orange-500 border-orange-500/40',
    Critical: 'bg-destructive/20 text-destructive border-destructive/40',
  };

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/40',
    approved: 'bg-primary/20 text-primary border-primary/40',
    rejected: 'bg-destructive/20 text-destructive border-destructive/40',
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
              Bug <span className="text-primary">Reports</span>
            </h1>
            <p className="text-muted-foreground mb-8">Review and manage security reports</p>

            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="border-primary/20 p-6" data-testid={`card-report-${report.id}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={severityColors[report.severity]}>
                          {report.severity}
                        </Badge>
                        <Badge variant="outline" className={statusColors[report.status]}>
                          {report.status}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{report.bugTitle}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Submitted on {new Date(report.submittedDate).toLocaleDateString()}
                      </p>
                    </div>

                    {report.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(report.id)}
                          data-testid={`button-approve-${report.id}`}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(report.id)}
                          data-testid={`button-reject-${report.id}`}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(report.id)}
                          data-testid={`button-delete-${report.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}

              {reports.length === 0 && (
                <Card className="border-primary/20 p-12 text-center">
                  <p className="text-muted-foreground">No reports found</p>
                </Card>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function AdminReports() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminReportsContent />
    </ProtectedRoute>
  );
}