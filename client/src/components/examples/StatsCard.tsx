import StatsCard from '../StatsCard';
import { Trophy } from 'lucide-react';

export default function StatsCardExample() {
  return (
    <div className="p-4">
      <StatsCard
        title="Total XP"
        value="4,250"
        icon={Trophy}
        trend="+12% from last week"
        trendUp={true}
      />
    </div>
  );
}