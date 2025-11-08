// Mock data for the Hacking Vidya platform
// todo: remove mock functionality

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  avatar: string;
  bio: string;
  xp: number;
  rank: string;
  streak: number;
  completedRooms: number;
  status: 'active' | 'banned';
}

export interface CTF {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  creator: string;
  rating: number;
  players: number;
  tags: string[];
}

export interface Blog {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  content: string;
  excerpt: string;
  tags: string[];
  likes: number;
  comments: number;
  thumbnail: string;
}

export interface Writeup {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  content: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  likes: number;
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName?: string;
  bugTitle: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'pending' | 'approved' | 'rejected';
  description: string;
  summary: string;
  category: 'Web Security' | 'Network Security' | 'Mobile Security' | 'Cloud Security' | 'IoT Security' | 'Cryptography' | 'Malware Analysis' | 'Social Engineering';
  organization: string;
  year: number;
  submittedDate: string;
  cveId?: string;
  program?: string;
  bounty?: number;
  stepsToReproduce?: string[];
  impactAnalysis?: string;
  proofOfConcept?: string;
  downloadLinks?: {
    label: string;
    url: string;
  }[];
  tags?: string[];
}

export interface HallOfFameEntry {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  bugTitle: string;
  reward: string;
  date: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'user',
    email: 'user@example.com',
    password: 'password',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    bio: 'Cybersecurity enthusiast | CTF player',
    xp: 4250,
    rank: 'Advanced',
    streak: 12,
    completedRooms: 24,
    status: 'active',
  },
  {
    id: '2',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    bio: 'Platform administrator',
    xp: 8500,
    rank: 'Elite',
    streak: 45,
    completedRooms: 67,
    status: 'active',
  },
  {
    id: '3',
    username: 'h4ck3r_0x01',
    email: 'hacker@example.com',
    password: 'password',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hacker1',
    bio: 'Bug bounty hunter | Security researcher',
    xp: 7200,
    rank: 'Expert',
    streak: 28,
    completedRooms: 52,
    status: 'active',
  },
];

export const mockCTFs: CTF[] = [
  {
    id: '1',
    title: 'Web Exploitation 101',
    description: 'Learn the basics of web application security and common vulnerabilities like SQL injection, XSS, and CSRF.',
    difficulty: 'Easy',
    category: 'Web',
    creator: 'admin',
    rating: 4.8,
    players: 1523,
    tags: ['Web', 'SQL Injection', 'XSS'],
  },
  {
    id: '2',
    title: 'Reverse Engineering Challenge',
    description: 'Crack this binary and find the hidden flag. Understanding x86 assembly required.',
    difficulty: 'Hard',
    category: 'Reversing',
    creator: 'h4ck3r_0x01',
    rating: 4.5,
    players: 542,
    tags: ['Reverse Engineering', 'Assembly', 'Binary'],
  },
  {
    id: '3',
    title: 'Network Forensics',
    description: 'Analyze network traffic captures to identify malicious activity and extract IOCs.',
    difficulty: 'Medium',
    category: 'Forensics',
    creator: 'admin',
    rating: 4.6,
    players: 892,
    tags: ['Forensics', 'Network', 'Wireshark'],
  },
];

export const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with Bug Bounty Hunting',
    author: 'admin',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    date: '2024-10-28',
    excerpt: 'Learn the fundamentals of bug bounty hunting and how to get started in your cybersecurity career.',
    content: `# Getting Started with Bug Bounty Hunting\n\nBug bounty hunting is an exciting way to earn money while improving your security skills...\n\n## Prerequisites\n\n- Understanding of web technologies\n- Basic programming knowledge\n- Patience and persistence`,
    tags: ['Bug Bounty', 'Career', 'Tutorial'],
    likes: 245,
    comments: 32,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
  },
  {
    id: '2',
    title: 'Advanced XSS Exploitation Techniques',
    author: 'h4ck3r_0x01',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hacker1',
    date: '2024-10-25',
    excerpt: 'Dive deep into advanced cross-site scripting techniques and bypass methods.',
    content: `# Advanced XSS Exploitation\n\nCross-site scripting remains one of the most common vulnerabilities...`,
    tags: ['XSS', 'Web Security', 'Advanced'],
    likes: 312,
    comments: 45,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
  },
];

export const mockWriteups: Writeup[] = [
  {
    id: '1',
    title: 'Web Exploitation 101 - Complete Walkthrough',
    author: 'user',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    date: '2024-10-26',
    content: `# Web Exploitation 101 Walkthrough\n\n## Initial Reconnaissance\n\nStarted by running a port scan...\n\n\`\`\`bash\nnmap -sC -sV 10.10.10.100\n\`\`\``,
    category: 'Web',
    difficulty: 'Easy',
    likes: 89,
  },
  {
    id: '2',
    title: 'Cracking the Reverse Engineering Challenge',
    author: 'h4ck3r_0x01',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hacker1',
    date: '2024-10-24',
    content: `# Reverse Engineering Challenge Writeup\n\nThis was a tough one! Let's dive in...`,
    category: 'Reversing',
    difficulty: 'Hard',
    likes: 156,
  },
];

export const mockReports: Report[] = [
  {
    id: '1',
    reporterId: '3',
    reporterName: 'SecurityHunter',
    bugTitle: 'Critical RCE in Node.js Dependency',
    severity: 'Critical',
    status: 'approved',
    description: 'A critical Remote Code Execution vulnerability was discovered in a popular Node.js dependency that affects millions of applications worldwide. The vulnerability exists in the serialization module of the dependency, which fails to properly validate untrusted input during deserialization. This allows attackers to execute arbitrary code with the privileges of the running process.',
    summary: 'A critical Remote Code Execution vulnerability was discovered in a popular Node.js dependency that affects millions of applications worldwide.',
    category: 'Web Security',
    organization: 'TechCorp',
    year: 2025,
    submittedDate: '2025-01-20',
    cveId: 'CVE-2025-1234',
    program: 'TechCorp Bug Bounty Program',
    bounty: 50000,
    stepsToReproduce: [
      'Send a crafted serialized object to the vulnerable endpoint',
      'The application deserializes the malicious payload',
      'Arbitrary code is executed in the context of the application',
      'Attacker gains full system access',
    ],
    impactAnalysis: 'This vulnerability allows unauthenticated remote attackers to execute arbitrary code on any system running the affected version of the dependency. Given the widespread use of this package, the impact is severe and affects a large number of applications.',
    proofOfConcept: `const payload = { _proto_: { command: 'touch /tmp/pwned' } }; // Send payload to vulnerable endpoint`,
    downloadLinks: [
      { label: 'Full Report PDF', url: '/reports/report-1.pdf' },
      { label: 'Proof of Concept', url: '/reports/poc-1.html' },
    ],
    tags: ['RCE', 'Node.js', 'Deserialization', 'Critical'],
  },
  {
    id: '2',
    reporterId: '1',
    reporterName: 'user',
    bugTitle: 'CSRF Token Missing on Password Reset',
    severity: 'Medium',
    status: 'approved',
    description: 'Password reset endpoint lacks CSRF protection, allowing unauthorized password changes. An attacker can craft a malicious link that resets a user\'s password without their knowledge.',
    summary: 'Missing CSRF token validation on password reset endpoint enables attackers to change user passwords through crafted requests.',
    category: 'Web Security',
    organization: 'SecureApp LLC',
    year: 2024,
    submittedDate: '2024-10-20',
    downloadLinks: [
      { label: 'Full Report PDF', url: '/reports/report-2.pdf' },
    ],
    tags: ['CSRF', 'Web', 'Authentication', 'Password Reset'],
  },
  {
    id: '3',
    reporterId: '2',
    reporterName: 'admin',
    bugTitle: 'SQL Injection in Search Function',
    severity: 'Critical',
    status: 'approved',
    description: 'The search functionality is vulnerable to SQL injection attacks, potentially exposing user data. The application concatenates user input directly into SQL queries without parameterization. This allows attackers to extract sensitive information from the database, including user credentials, personal data, and other confidential information.',
    summary: 'SQL injection vulnerability in search functionality allows attackers to extract sensitive data from the database through crafted search queries.',
    category: 'Web Security',
    organization: 'DataSafe Systems',
    year: 2024,
    submittedDate: '2024-10-28',
    cveId: 'CVE-2024-12346',
    program: 'DataSafe Bug Bounty Program',
    bounty: 35000,
    stepsToReproduce: [
      'Navigate to the search endpoint',
      'Inject SQL payload: \' OR \'1\'=\'1 --',
      'Observe database error messages revealing table structure',
      'Extract sensitive data using UNION-based SQL injection',
    ],
    impactAnalysis: 'This vulnerability allows attackers to read, modify, or delete sensitive data from the database. Attackers can extract user credentials, personal information, and potentially gain administrative access to the system.',
    proofOfConcept: `GET /search?q=' UNION SELECT username, password FROM users --`,
    downloadLinks: [
      { label: 'Full Report PDF', url: '/reports/report-3.pdf' },
      { label: 'SQL Injection Script', url: '/reports/sql-inject-3.py' },
    ],
    tags: ['SQL Injection', 'Database', 'Web', 'Critical'],
  },
  {
    id: '4',
    reporterId: '3',
    reporterName: 'h4ck3r_0x01',
    bugTitle: 'Insecure Direct Object Reference',
    severity: 'High',
    status: 'approved',
    description: 'Users can access other users\' private data by manipulating URL parameters. The application does not verify that the requested resource belongs to the authenticated user.',
    summary: 'IDOR vulnerability allows unauthorized access to private user data by manipulating object identifiers in API endpoints.',
    category: 'Web Security',
    organization: 'CloudVault Services',
    year: 2024,
    submittedDate: '2024-10-25',
    downloadLinks: [
      { label: 'Full Report PDF', url: '/reports/report-4.pdf' },
    ],
    tags: ['IDOR', 'Authorization', 'Web', 'API'],
  },
  {
    id: '5',
    reporterId: '1',
    reporterName: 'user',
    bugTitle: 'Missing Rate Limiting on Login',
    severity: 'Medium',
    status: 'approved',
    description: 'The login endpoint does not implement rate limiting, allowing brute force attacks. Attackers can attempt unlimited login attempts without being blocked.',
    summary: 'Absence of rate limiting on login endpoint enables brute force attacks against user accounts.',
    category: 'Web Security',
    organization: 'LoginSecure Inc.',
    year: 2024,
    submittedDate: '2024-10-27',
    downloadLinks: [
      { label: 'Full Report PDF', url: '/reports/report-5.pdf' },
    ],
    tags: ['Brute Force', 'Authentication', 'Rate Limiting', 'Security'],
  },
  {
    id: '6',
    reporterId: '2',
    reporterName: 'admin',
    bugTitle: 'Information Disclosure in Error Messages',
    severity: 'Low',
    status: 'approved',
    description: 'Error messages reveal sensitive system information that could aid attackers. Stack traces and database errors are exposed to users.',
    summary: 'Verbose error messages expose internal system details, including database structure and file paths, aiding potential attackers.',
    category: 'Web Security',
    organization: 'InfoSys Solutions',
    year: 2024,
    submittedDate: '2024-10-22',
    downloadLinks: [
      { label: 'Full Report PDF', url: '/reports/report-6.pdf' },
    ],
    tags: ['Information Disclosure', 'Error Handling', 'Web'],
  },
  {
    id: '7',
    reporterId: '3',
    reporterName: 'h4ck3r_0x01',
    bugTitle: 'Weak Encryption in Mobile App',
    severity: 'High',
    status: 'approved',
    description: 'The mobile application uses weak encryption algorithms for storing sensitive data locally. Data can be easily decrypted by attackers with physical access.',
    summary: 'Mobile app employs deprecated encryption algorithms, making locally stored sensitive data vulnerable to decryption attacks.',
    category: 'Mobile Security',
    organization: 'MobileSecure Corp',
    year: 2024,
    submittedDate: '2024-10-15',
    cveId: 'CVE-2024-12347',
    downloadLinks: [
      { label: 'Full Report PDF', url: '/reports/report-7.pdf' },
      { label: 'Analysis Document', url: '/reports/analysis-7.pdf' },
    ],
    tags: ['Encryption', 'Mobile', 'Cryptography', 'iOS', 'Android'],
  },
  {
    id: '8',
    reporterId: '1',
    reporterName: 'user',
    bugTitle: 'Cloud Storage Misconfiguration',
    severity: 'Critical',
    status: 'approved',
    description: 'AWS S3 bucket is misconfigured with public read access, exposing sensitive customer data to anyone on the internet.',
    summary: 'Publicly accessible S3 bucket exposes sensitive customer data due to misconfigured bucket policies.',
    category: 'Cloud Security',
    organization: 'CloudData Inc.',
    year: 2024,
    submittedDate: '2024-10-18',
    downloadLinks: [
      { label: 'Full Report PDF', url: '/reports/report-8.pdf' },
    ],
    tags: ['AWS', 'S3', 'Cloud', 'Misconfiguration', 'Data Exposure'],
  },
  {
    id: '9',
    reporterId: '2',
    reporterName: 'admin',
    bugTitle: 'Ransomware Analysis: LockBit Variant',
    severity: 'High',
    status: 'approved',
    description: 'Detailed analysis of a new LockBit ransomware variant targeting enterprise networks. Includes IOC extraction and decryption methodology.',
    summary: 'Comprehensive analysis of LockBit ransomware variant including behavior, IOCs, and potential decryption methods.',
    category: 'Malware Analysis',
    organization: 'Security Research Lab',
    year: 2024,
    submittedDate: '2024-10-12',
    downloadLinks: [
      { label: 'Full Report PDF', url: '/reports/report-9.pdf' },
      { label: 'IOC List', url: '/reports/iocs-9.txt' },
      { label: 'YARA Rules', url: '/reports/yara-9.yar' },
    ],
    tags: ['Ransomware', 'Malware', 'LockBit', 'Analysis', 'IOCs'],
  },
  {
    id: '10',
    reporterId: '3',
    reporterName: 'h4ck3r_0x01',
    bugTitle: 'Network Segmentation Bypass',
    severity: 'High',
    status: 'approved',
    description: 'Insufficient network segmentation allows lateral movement from guest network to internal production systems.',
    summary: 'Weak network segmentation enables attackers to pivot from guest network to critical internal systems.',
    category: 'Network Security',
    organization: 'NetSecure Enterprises',
    year: 2023,
    submittedDate: '2023-12-05',
    downloadLinks: [
      { label: 'Full Report PDF', url: '/reports/report-10.pdf' },
    ],
    tags: ['Network', 'Segmentation', 'Lateral Movement', 'Penetration Testing'],
  },
  {
    id: '11',
    reporterId: '1',
    reporterName: 'user',
    bugTitle: 'IoT Device Default Credentials',
    severity: 'Medium',
    status: 'approved',
    description: 'IoT devices ship with hardcoded default credentials that cannot be changed, allowing unauthorized access.',
    summary: 'Hardcoded default credentials in IoT devices create security vulnerabilities that cannot be mitigated by users.',
    category: 'IoT Security',
    organization: 'SmartHome Devices',
    year: 2023,
    submittedDate: '2023-11-20',
    downloadLinks: [
      { label: 'Full Report PDF', url: '/reports/report-11.pdf' },
    ],
    tags: ['IoT', 'Default Credentials', 'Hardware', 'Authentication'],
  },
  {
    id: '12',
    reporterId: '2',
    reporterName: 'admin',
    bugTitle: 'Weak Cryptographic Implementation',
    severity: 'High',
    status: 'approved',
    description: 'Application uses MD5 for password hashing and weak RSA key sizes, making encrypted data vulnerable to attacks.',
    summary: 'Weak cryptographic implementations including MD5 hashing and insufficient key sizes compromise data security.',
    category: 'Cryptography',
    organization: 'CryptoSoft Ltd',
    year: 2023,
    submittedDate: '2023-10-15',
    downloadLinks: [
      { label: 'Full Report PDF', url: '/reports/report-12.pdf' },
      { label: 'Technical Analysis', url: '/reports/tech-12.pdf' },
    ],
    tags: ['Cryptography', 'MD5', 'RSA', 'Encryption', 'Hashing'],
  },
];

export const mockHallOfFame: HallOfFameEntry[] = [
  {
    id: '1',
    userId: '1',
    username: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    bugTitle: 'CSRF Token Missing on Password Reset',
    reward: 'Hall of Fame + $500',
    date: '2024-10-21',
  },
];

export const mockLeaderboard = [
  { rank: 1, username: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin', xp: 8500, completedRooms: 67 },
  { rank: 2, username: 'h4ck3r_0x01', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hacker1', xp: 7200, completedRooms: 52 },
  { rank: 3, username: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user', xp: 4250, completedRooms: 24 },
  { rank: 4, username: 'cyber_ninja', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ninja', xp: 3980, completedRooms: 21 },
  { rank: 5, username: 'sec_guru', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guru', xp: 3750, completedRooms: 19 },
];