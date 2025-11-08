import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTFCard from '@/components/CTFCard';
import AdminControls from '@/components/AdminControls';
import CTFFormModal from '@/components/CTFFormModal';
import { mockCTFs } from '@/lib/mockData';
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

export default function CTFList() {
  const [filter, setFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [ctfs, setCtfs] = useState(mockCTFs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCTF, setEditingCTF] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const filteredCTFs = ctfs.filter((ctf) => {
    const matchesDifficulty = filter === 'All' || ctf.difficulty === filter;
    const matchesSearch = searchQuery === '' || 
      ctf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ctf.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ctf.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDifficulty && matchesSearch;
  });

  const handleAddNew = () => {
    setModalMode('add');
    setEditingCTF(null);
    setIsModalOpen(true);
  };

  const handleEdit = (ctf: any) => {
    setModalMode('edit');
    setEditingCTF(ctf);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this CTF challenge?')) {
      setCtfs(ctfs.filter((c) => c.id !== id));
      toast.success('CTF challenge deleted successfully!');
    }
  };

  const handleSave = (data: any) => {
    if (modalMode === 'add') {
      const newCTF = {
        ...data,
        id: Date.now().toString(),
        creator: 'Admin',
        rating: 4.5,
        players: 0,
        tags: [data.category, data.difficulty],
      };
      setCtfs([newCTF, ...ctfs]);
    } else {
      setCtfs(
        ctfs.map((c) => (c.id === editingCTF.id ? { ...c, ...data, tags: [data.category, data.difficulty] } : c))
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
                  CTF <span className="text-primary">Challenges</span>
                </h1>
                <p className="text-muted-foreground">Choose your challenge and start hacking</p>
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
                  placeholder="Search challenges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Difficulties</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredCTFs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No challenges found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCTFs.map((ctf, index) => (
                  <motion.div
                    key={ctf.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <CTFCard {...ctf} />
                    {isAdmin() && (
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <AdminControls
                          onEdit={() => handleEdit(ctf)}
                          onDelete={() => handleDelete(ctf.id)}
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

      <CTFFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingCTF}
        mode={modalMode}
      />
    </div>
  );
}