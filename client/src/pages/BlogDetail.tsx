import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockBlogs } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Share2, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { fetchArticleById } from '@/lib/devto';

function BlogDetailContent() {
  const [, params] = useRoute('/blog/:id');
  const [article, setArticle] = useState<any | null>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!params?.id) return;
      try {
        const a = await fetchArticleById(params.id);
        if (mounted) setArticle(a);
      } catch (e) {
        const fallback = mockBlogs.find((b) => b.id === params?.id);
        if (mounted && fallback) {
          setArticle({
            id: fallback.id,
            title: fallback.title,
            user: { name: fallback.author, profile_image: fallback.authorAvatar },
            published_at: fallback.date,
            tag_list: fallback.tags,
            public_reactions_count: fallback.likes,
            comments_count: fallback.comments,
            cover_image: fallback.thumbnail,
            body_html: `<div>${fallback.content.replace(/</g, '&lt;').replace(/\n/g, '<br/>')}</div>`,
          });
        }
      }
    })();
    return () => { mounted = false; };
  }, [params?.id]);

  if (!article) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <Skeleton className="h-64 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-10 w-3/4" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    toast.success('Link copied to clipboard!');
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
            {article.cover_image && (
              <div className="aspect-video rounded-lg overflow-hidden mb-8">
                <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {(Array.isArray(article.tag_list) ? article.tag_list : (typeof article.tag_list === 'string' ? article.tag_list.split(',').map((t: string) => t.trim()).filter(Boolean) : [])).map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="font-serif text-4xl font-bold mb-6">{article.title}</h1>

            <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={article.user?.profile_image} alt={article.user?.name} />
                  <AvatarFallback>{(article.user?.name || 'A')[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{article.user?.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleShare} data-testid="button-share">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.body_html }} />
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BlogDetail() {
  return <BlogDetailContent />;
}