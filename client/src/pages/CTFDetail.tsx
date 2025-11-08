import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockCTFs } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RotateCcw, Users, Star, Flag, Lightbulb } from 'lucide-react';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/ProtectedRoute';

function CTFDetailContent() {
  const [, params] = useRoute('/ctf/:id');
  const ctf = mockCTFs.find((c) => c.id === params?.id);

  if (!ctf) {
    return <div>CTF not found</div>;
  }

  const handleDeployMachine = () => {
    toast.success('Machine deployed! (Placeholder action)');
    console.log('Deploy machine triggered');
  };

  const handleResetProgress = () => {
    toast.success('Progress reset! (Placeholder action)');
    console.log('Reset progress triggered');
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="outline" className={difficultyColors[ctf.difficulty]}>
                    {ctf.difficulty}
                  </Badge>
                  <Badge variant="outline">{ctf.category}</Badge>
                </div>

                <h1 className="font-serif text-3xl font-bold mb-4">{ctf.title}</h1>

                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span>{ctf.rating} rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{ctf.players.toLocaleString()} players</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flag className="w-4 h-4" />
                    <span>By {ctf.creator}</span>
                  </div>
                </div>

                <Card className="border-primary/20 mb-6">
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{ctf.description}</p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {ctf.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-primary/20 sticky top-20">
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full"
                      onClick={handleDeployMachine}
                      data-testid="button-deploy-machine"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Deploy Machine
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleResetProgress}
                      data-testid="button-reset-progress"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset Progress
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      Hints
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Start with basic reconnaissance. Look for open ports and services.
                    </p>
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

export default function CTFDetail() {
  return (
    <ProtectedRoute>
      <CTFDetailContent />
    </ProtectedRoute>
  );
}