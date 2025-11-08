import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import AdminControls from '@/components/AdminControls';
import BlogFormModal from '@/components/BlogFormModal';
import { mockBlogs } from '@/lib/mockData';
import { fetchUserArticles, fetchArticlesByTag } from '@/lib/devto';
import { Skeleton } from '@/components/ui/skeleton';
import { isAdmin } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useLocation } from 'wouter';

export default function BlogList() {
  const [location, setLocation] = useLocation();
  const initialParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const initialQuery = initialParams.get('q') ?? '';
  const initialPage = Math.max(1, Number(initialParams.get('page') ?? '1'));

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const pageSize = 15;
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const debounceTimer = useRef<number | null>(null);

  const filteredBlogs = blogs.filter((blog: any) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sync URL params (q and page)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) params.set('q', searchQuery); else params.delete('q');
    params.set('page', String(page));
    const newSearch = `?${params.toString()}`;
    const newUrl = `${window.location.pathname}${newSearch}`;
    if (newUrl !== `${window.location.pathname}${window.location.search}`) {
      setLocation(newUrl, { replace: true });
    }
  }, [searchQuery, page, setLocation]);

  // Debounce the search query before fetching
  useEffect(() => {
    if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    debounceTimer.current = window.setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300);
    return () => { if (debounceTimer.current) window.clearTimeout(debounceTimer.current); };
  }, [searchQuery]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const q = debouncedQuery.toLowerCase();
        const articles = await fetchUserArticles('luaxd777', pageSize, page);
        const mapped = articles.map((a) => ({
          id: String(a.id),
          title: a.title,
          excerpt: a.description ?? '',
          author: a.user?.name ?? 'Unknown',
          authorAvatar: a.user?.profile_image ?? '',
          date: a.published_at,
          tags: Array.isArray(a.tag_list) ? a.tag_list : (typeof a.tag_list === 'string' ? a.tag_list.split(',').map((t) => t.trim()).filter(Boolean) : []),
          likes: a.public_reactions_count ?? 0,
          comments: a.comments_count ?? 0,
          thumbnail: a.cover_image ?? undefined,
        }));
        const allowTags = [
          'cybersecurity', 'security', 'infosec', 'bug-bounty', 'bugbounty',
          'web-security', 'pentesting', 'ctf', 'hacking', 'vulnerability',
          'vulnerabilities', 'xss', 'sql-injection', 'appsec'
        ];
        const allowWords = [
          'cybersecurity', 'security', 'infosec', 'bug bounty', 'bugbounty',
          'pentest', 'pentesting', 'ctf', 'hacking', 'appsec', 'owasp', 'xss', 'sql injection'
        ];
        let byTags = mapped.filter((b: any) =>
          (b.tags || []).some((t: string) => allowTags.includes(t.toLowerCase()))
          || allowWords.some((w) =>
            (b.title || '').toLowerCase().includes(w) || (b.excerpt || '').toLowerCase().includes(w)
          )
        );
        // If searching, add tag-based results and keyword filter
        if (q) {
          try {
            const tagResults = await fetchArticlesByTag(q, pageSize, page);
            const mappedTag = tagResults.map((a) => ({
              id: String(a.id),
              title: a.title,
              excerpt: a.description ?? '',
              author: a.user?.name ?? 'Unknown',
              authorAvatar: a.user?.profile_image ?? '',
              date: a.published_at,
              tags: Array.isArray(a.tag_list) ? a.tag_list : (typeof a.tag_list === 'string' ? a.tag_list.split(',').map((t) => t.trim()).filter(Boolean) : []),
              likes: a.public_reactions_count ?? 0,
              comments: a.comments_count ?? 0,
              thumbnail: a.cover_image ?? undefined,
            }));
            const combined = [...byTags, ...mappedTag];
            const seen = new Set<string>();
            byTags = combined.filter((b) => !seen.has(b.id) && (seen.add(b.id), true))
              .filter((b) =>
                (b.title || '').toLowerCase().includes(q) ||
                (b.excerpt || '').toLowerCase().includes(q) ||
                (b.tags || []).some((t: string) => t.toLowerCase().includes(q))
              );
          } catch {}
        }
        // Sort by popularity (reactions desc)
        const sorted = byTags.sort((a: any, b: any) => (b.likes || 0) - (a.likes || 0));
        let result = sorted.slice(0, pageSize);
        if (!result.length) {
          const tagFallbacks = ['cybersecurity', 'security', 'bug-bounty', 'bugbounty', 'appsec', 'pentesting', 'ctf'];
          for (const tag of tagFallbacks) {
            const tagged = await fetchArticlesByTag(tag, pageSize, page);
            if (tagged && tagged.length) {
              result = tagged.map((a) => ({
                id: String(a.id),
                title: a.title,
                excerpt: a.description ?? '',
                author: a.user?.name ?? 'Unknown',
                authorAvatar: a.user?.profile_image ?? '',
                date: a.published_at,
                tags: Array.isArray(a.tag_list) ? a.tag_list : (typeof a.tag_list === 'string' ? a.tag_list.split(',').map((t) => t.trim()).filter(Boolean) : []),
                likes: a.public_reactions_count ?? 0,
                comments: a.comments_count ?? 0,
                thumbnail: a.cover_image ?? undefined,
              }));
              result = result.sort((a: any, b: any) => (b.likes || 0) - (a.likes || 0));
              break;
            }
          }
        }
        if (mounted) setBlogs(result);
      } catch (e) {
        if (mounted) setBlogs([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [page, debouncedQuery]);

  const handleAddNew = () => {
    setModalMode('add');
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const handleEdit = (blog: any) => {
    setModalMode('edit');
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter((b) => b.id !== id));
      toast.success('Blog post deleted successfully!');
    }
  };

  const handleSave = (data: any) => {
    if (modalMode === 'add') {
      const newBlog = {
        ...data,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: 0,
        views: 0,
        tags: data.category ? [data.category] : ['Tutorial'],
        authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.author}`,
        thumbnail: data.image || '',
        excerpt: data.excerpt,
      };
      setBlogs([newBlog, ...blogs]);
    } else {
      setBlogs(
        blogs.map((b) => (b.id === editingBlog.id ? { ...b, ...data, tags: data.category ? [data.category] : b.tags } : b))
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
                  Security <span className="text-primary">Blogs</span>
                </h1>
                <p className="text-muted-foreground">Learn from expert insights and tutorials</p>
              </div>
              
              {isAdmin() && (
                <Button onClick={handleAddNew} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add New
                </Button>
              )}
            </div>

            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                className="pl-10 focus:border-primary"
                data-testid="input-search-blogs"
              />
            </div>

            <div className="columns-1 md:columns-2 gap-6 [column-fill:_balance]">
              {loading && (
                <>
                  {[...Array(4)].map((_, i) => (
                    <div key={`sk-${i}`} className="space-y-3 mb-6 break-inside-avoid">
                      <Skeleton className="h-48 w-full" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  ))}
                </>
              )}
              {!loading && !filteredBlogs.length && (
                <div className="md:col-span-2 text-center text-muted-foreground">
                  No posts found on DEV.to for now.
                </div>
              )}
              {!loading && filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group mb-6 break-inside-avoid"
                >
                  <BlogCard {...blog} />
                  {isAdmin() && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <AdminControls
                        onEdit={() => handleEdit(blog)}
                        onDelete={() => handleDelete(blog.id)}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {!loading && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                  Previous
                </Button>
                {[1,2,3,4,5].map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}
                <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)}>
                  Next
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />

      <BlogFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingBlog}
        mode={modalMode}
      />
    </div>
  );
}