import BlogCard from '../BlogCard';

export default function BlogCardExample() {
  return (
    <div className="p-4">
      <BlogCard
        id="1"
        title="Getting Started with Bug Bounty Hunting"
        excerpt="Learn the fundamentals of bug bounty hunting and how to get started"
        author="admin"
        authorAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
        date="2024-10-28"
        tags={['Bug Bounty', 'Career', 'Tutorial']}
        likes={245}
        comments={32}
        thumbnail="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400"
      />
    </div>
  );
}