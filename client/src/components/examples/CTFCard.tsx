import CTFCard from '../CTFCard';

export default function CTFCardExample() {
  return (
    <div className="p-4">
      <CTFCard
        id="1"
        title="Web Exploitation 101"
        description="Learn the basics of web application security and common vulnerabilities"
        difficulty="Easy"
        category="Web"
        rating={4.8}
        players={1523}
        tags={['Web', 'SQL Injection', 'XSS']}
      />
    </div>
  );
}