import FeatureCard from '../FeatureCard';
import { Flag } from 'lucide-react';

export default function FeatureCardExample() {
  return (
    <div className="p-4">
      <FeatureCard
        title="CTF Challenges"
        description="Hands-on capture-the-flag challenges across multiple categories"
        icon={Flag}
      />
    </div>
  );
}