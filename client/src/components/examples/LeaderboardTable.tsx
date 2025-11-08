import LeaderboardTable from '../LeaderboardTable';

export default function LeaderboardTableExample() {
  const mockData = [
    { rank: 1, username: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin', xp: 8500, completedRooms: 67 },
    { rank: 2, username: 'h4ck3r_0x01', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hacker1', xp: 7200, completedRooms: 52 },
    { rank: 3, username: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user', xp: 4250, completedRooms: 24 },
  ];

  return (
    <div className="p-4">
      <LeaderboardTable entries={mockData} />
    </div>
  );
}