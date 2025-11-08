import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WriteupCard from '@/components/WriteupCard';
import AdminControls from '@/components/AdminControls';
import WriteupFormModal from '@/components/WriteupFormModal';
import { mockWriteups } from '@/lib/mockData';
import { isAdmin } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';

export default function WriteupList() {
  const [filter, setFilter] = useState<'All' | 'Web' | 'Reversing' | 'Forensics'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [writeups, setWriteups] = useState(mockWriteups);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWriteup, setEditingWriteup] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const filteredWriteups = writeups.filter((writeup) => {
    const matchesCategory = filter === 'All' || writeup.category === filter;
    const matchesSearch = searchQuery === '' || 
      writeup.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      writeup.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      writeup.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      writeup.author?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleAddNew = () => {
    setModalMode('add');
    setEditingWriteup(null);
    setIsModalOpen(true);
  };

  const handleEdit = (writeup: any) => {
    setModalMode('edit');
    setEditingWriteup(writeup);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this write-up?')) {
      setWriteups(writeups.filter((w) => w.id !== id));
      toast.success('Write-up deleted successfully!');
    }
  };

  const handleSave = (data: any) => {
    if (modalMode === 'add') {
      const newWriteup = {
        ...data,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        views: 0,
        authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.author}`,
      };
      setWriteups([newWriteup, ...writeups]);
    } else {
      setWriteups(
        writeups.map((w) => (w.id === editingWriteup.id ? { ...w, ...data } : w))
      );
    }
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
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="font-serif text-3xl font-bold mb-2">
                  Challenge <span className="text-primary">Write-ups</span>
                </h1>
                <p className="text-muted-foreground">Learn from detailed walkthroughs</p>
              </div>
              
              {isAdmin() && (
                <Button onClick={handleAddNew} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add New
                </Button>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search write-ups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Web">Web</SelectItem>
                  <SelectItem value="Reversing">Reversing</SelectItem>
                  <SelectItem value="Forensics">Forensics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredWriteups.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No write-ups found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWriteups.map((writeup, index) => (
                  <motion.div
                    key={writeup.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <WriteupCard {...writeup} />
                    {isAdmin() && (
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <AdminControls
                          onEdit={() => handleEdit(writeup)}
                          onDelete={() => handleDelete(writeup.id)}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />

      <WriteupFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingWriteup}
        mode={modalMode}
      />
    </div>
  );
}