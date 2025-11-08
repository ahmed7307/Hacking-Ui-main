import HallOfFameCard from '../HallOfFameCard';

export default function HallOfFameCardExample() {
  return (
    <div className="p-4">
      <HallOfFameCard
        username="user"
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
        bugTitle="CSRF Token Missing on Password Reset"
        reward="Hall of Fame + $500"
        date="2024-10-21"
      />
    </div>
  );
}