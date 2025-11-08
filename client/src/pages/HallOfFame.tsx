import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HallOfFameCard from '@/components/HallOfFameCard';
import { mockHallOfFame } from '@/lib/mockData';

export default function HallOfFame() {
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
              Hall of <span className="text-primary">Fame</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Recognizing our security researchers who have contributed to platform security
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {mockHallOfFame.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <HallOfFameCard {...entry} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}