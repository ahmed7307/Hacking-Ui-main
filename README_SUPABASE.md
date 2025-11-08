# Supabase Backend Integration - Quick Start

This project now uses Supabase as the backend database and authentication provider.

## 🚀 Quick Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Supabase Project**
   - Go to https://supabase.com
   - Create a new project
   - Copy your project URL and anon key

3. **Configure Environment Variables**
   - Create `.env` file in the root directory
   - Add your Supabase credentials:
     ```env
     VITE_SUPABASE_URL=your-project-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Run Database Migration**
   - Open Supabase Dashboard → SQL Editor
   - Copy contents from `supabase/migrations/001_initial_schema.sql`
   - Paste and run in SQL Editor

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
├── client/src/lib/
│   ├── supabase.ts           # Supabase client configuration
│   ├── auth.ts               # Authentication functions
│   └── services/             # API services
│       ├── ctfService.ts
│       ├── blogService.ts
│       ├── writeupService.ts
│       ├── reportService.ts
│       ├── leaderboardService.ts
│       └── hallOfFameService.ts
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql  # Database schema
│   └── config.toml                  # Supabase CLI config
└── SUPABASE_SETUP.md               # Detailed setup guide
```

## 🔐 Authentication

### Register User
```typescript
import { register } from '@/lib/auth';

const { user, error } = await register(username, email, password);
```

### Login
```typescript
import { login } from '@/lib/auth';

const { user, error } = await login(email, password);
```

### Get Current User
```typescript
import { getCurrentUser } from '@/lib/auth';

const user = await getCurrentUser();
```

### Logout
```typescript
import { logout } from '@/lib/auth';

await logout();
```

## 📊 Database Services

### CTF Service
```typescript
import { ctfService } from '@/lib/services';

// Get all CTFs
const ctfs = await ctfService.getAll();

// Create CTF
const ctf = await ctfService.create({
  title: 'My CTF',
  description: 'Description',
  difficulty: 'Easy',
  category: 'Web',
  creator_id: userId,
});
```

### Blog Service
```typescript
import { blogService } from '@/lib/services';

// Get all blogs
const blogs = await blogService.getAll();

// Create blog
const blog = await blogService.create({
  title: 'My Blog',
  content: 'Content',
  excerpt: 'Excerpt',
  author_id: userId,
  tags: ['security'],
});
```

### Report Service
```typescript
import { reportService } from '@/lib/services';

// Get all approved reports
const reports = await reportService.getAll();

// Create report
const report = await reportService.create({
  bug_title: 'Vulnerability',
  description: 'Description',
  summary: 'Summary',
  severity: 'High',
  category: 'Web Security',
  organization: 'Company',
  year: 2024,
  reporter_id: userId,
});
```

## 🛡️ Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **Public Read**: Anyone can read approved/published content
- **Authenticated Write**: Authenticated users can create content
- **Owner Update/Delete**: Users can update/delete their own content
- **Admin Override**: Admins can manage all content

## 📝 Database Schema

### Tables
- `users` - User profiles
- `ctfs` - CTF challenges
- `blogs` - Blog posts
- `writeups` - Write-up articles
- `reports` - Security reports
- `hall_of_fame` - Hall of fame entries
- `leaderboard` - User rankings

## 🔧 Environment Variables

Required environment variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

## 📚 Documentation

For detailed setup instructions, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid API key"**
   - Check your `.env` file
   - Verify keys in Supabase Dashboard

2. **"Row Level Security policy violation"**
   - Check RLS policies in Supabase
   - Verify user permissions

3. **"User profile not created"**
   - Check database trigger `handle_new_user()`
   - Verify trigger is set up correctly

## 🚢 Deployment

Before deploying:

1. Set environment variables in your hosting platform
2. Update Supabase redirect URLs
3. Enable email confirmation (recommended)
4. Set up database backups
5. Review RLS policies

## 📖 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

