import WriteupCard from '../WriteupCard';

export default function WriteupCardExample() {
  return (
    <div className="p-4">
      <WriteupCard
        id="1"
        title="Web Exploitation 101 - Complete Walkthrough"
        author="user"
        authorAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
        date="2024-10-26"
        category="Web"
        difficulty="Easy"
        likes={89}
      />
    </div>
  );
}