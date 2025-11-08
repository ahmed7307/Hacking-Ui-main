import { useState } from 'react';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockWriteups } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ProtectedRoute from '@/components/ProtectedRoute';

function WriteupDetailContent() {
  const [, params] = useRoute('/writeup/:id');
  const writeup = mockWriteups.find((w) => w.id === params?.id);
  const [liked, setLiked] = useState(false);

  if (!writeup) {
    return <div>Write-up not found</div>;
  }

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? 'Removed from likes' : 'Added to likes');
  };

  const difficultyColors = {
    Easy: 'bg-primary/20 text-primary border-primary/40',
    Medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/40',
    Hard: 'bg-destructive/20 text-destructive border-destructive/40',
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className={difficultyColors[writeup.difficulty]}>
                {writeup.difficulty}
              </Badge>
              <Badge variant="outline">{writeup.category}</Badge>
            </div>

            <h1 className="font-serif text-4xl font-bold mb-6">{writeup.title}</h1>

            <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={writeup.authorAvatar} alt={writeup.author} />
                  <AvatarFallback>{writeup.author[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{writeup.author}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(writeup.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={liked ? 'text-primary' : ''}
                data-testid="button-like"
              >
                <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-primary' : ''}`} />
                {writeup.likes + (liked ? 1 : 0)}
              </Button>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line font-mono text-sm">
                {writeup.content}
              </div>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function WriteupDetail() {
  return (
    
      <WriteupDetailContent />
    
  );
}