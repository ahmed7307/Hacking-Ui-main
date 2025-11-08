import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar } from 'lucide-react';

interface HallOfFameCardProps {
  username: string;
  avatar: string;
  bugTitle: string;
  reward: string;
  date: string;
}

export default function HallOfFameCard({ username, avatar, bugTitle, reward, date }: HallOfFameCardProps) {
  return (
    <Card className="border-primary/20 hover-elevate transition-all duration-300" data-testid={`card-halloffame-${username}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="w-16 h-16 border-2 border-primary/40">
              <AvatarImage src={avatar} alt={username} />
              <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{username}</h3>
            <p className="text-sm text-muted-foreground mt-1">{bugTitle}</p>
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40">
                {reward}
              </Badge>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}