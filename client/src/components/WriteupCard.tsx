import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Calendar } from 'lucide-react';
import { Link } from 'wouter';

interface WriteupCardProps {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  likes: number;
}

const difficultyColors = {
  Easy: 'bg-primary/20 text-primary border-primary/40',
  Medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/40',
  Hard: 'bg-destructive/20 text-destructive border-destructive/40',
};

export default function WriteupCard({ id, title, author, authorAvatar, date, category, difficulty, likes }: WriteupCardProps) {
  return (
    <Link href={`/writeup/${id}`}>
      <a data-testid={`card-writeup-${id}`}>
        <Card className="border-primary/20 hover-elevate transition-all duration-300 h-full">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={difficultyColors[difficulty]}>
                {difficulty}
              </Badge>
              <Badge variant="outline">{category}</Badge>
            </div>
            <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={authorAvatar} alt={author} />
                  <AvatarFallback>{author[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{author}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Heart className="w-4 h-4" />
                {likes}
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}