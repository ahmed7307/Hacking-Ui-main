# Supabase Backend Setup Guide

This guide will walk you through setting up the Supabase backend for the Hacking Vidya platform.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. Node.js and npm installed
3. Git (optional)

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in your project details:
   - Name: `hacking-vidya` (or your preferred name)
   - Database Password: Choose a strong password
   - Region: Select the region closest to your users
4. Click "Create new project"
5. Wait for the project to be provisioned (takes a few minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## Step 3: Set Up Environment Variables

1. Create a `.env` file in the root of your project:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your-project-url-here
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Run Database Migrations

1. In your Supabase project dashboard, go to **SQL Editor**
2. Open the file `supabase/migrations/001_initial_schema.sql`
3. Copy the entire SQL content
4. Paste it into the SQL Editor in Supabase
5. Click "Run" to execute the migration
6. Verify that all tables were created successfully

## Step 5: Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- `@supabase/supabase-js`
- `@supabase/auth-helpers-react`
- `@supabase/auth-ui-react`

## Step 6: Configure Authentication

1. In your Supabase project dashboard, go to **Authentication** > **Settings**
2. Configure the following:
   - **Site URL**: Set to your application URL (e.g., `http://localhost:5000`)
   - **Redirect URLs**: Add your production and development URLs
   - **Email Auth**: Enable email authentication
   - **Email Templates**: Customize if needed

## Step 7: Set Up Storage (Optional)

If you need to store files (images, documents, etc.):

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket (e.g., `avatars`, `thumbnails`, `reports`)
3. Set up storage policies in the SQL Editor:
   ```sql
   -- Example: Allow public read access to avatars
   CREATE POLICY "Public Avatar Access" ON storage.objects
     FOR SELECT USING (bucket_id = 'avatars');
   ```

## Step 8: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Try to register a new user
3. Check your Supabase dashboard to verify:
   - User was created in `auth.users`
   - User profile was created in `public.users`
   - Leaderboard entry was created

## Step 9: Create an Admin User

To create an admin user:

1. Go to **SQL Editor** in Supabase
2. Run the following query (replace with your email):
   ```sql
   UPDATE public.users
   SET role = 'admin'
   WHERE email = 'your-admin-email@example.com';
   ```

## Database Schema Overview

### Tables

- **users**: User profiles (extends auth.users)
- **ctfs**: CTF challenges
- **blogs**: Blog posts
- **writeups**: Write-up articles
- **reports**: Security reports
- **hall_of_fame**: Hall of fame entries
- **leaderboard**: User rankings

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **Public Read**: Anyone can read approved/published content
- **Authenticated Write**: Authenticated users can create content
- **Owner Update/Delete**: Users can update/delete their own content
- **Admin Override**: Admins can manage all content

## API Services

The following services are available in `client/src/lib/services/`:

- `ctfService.ts`: CTF operations
- `blogService.ts`: Blog operations
- `writeupService.ts`: Writeup operations
- `reportService.ts`: Security report operations
- `leaderboardService.ts`: Leaderboard operations
- `hallOfFameService.ts`: Hall of fame operations

## Authentication

Authentication is handled through Supabase Auth. The auth functions are in `client/src/lib/auth.ts`:

- `register()`: Register a new user
- `login()`: Sign in with email/password
- `adminLogin()`: Sign in as admin
- `logout()`: Sign out
- `getCurrentUser()`: Get current authenticated user
- `isAdmin()`: Check if user is admin

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Verify your `.env` file has the correct keys
   - Make sure you're using the `anon` key, not the `service_role` key

2. **"Row Level Security policy violation"**
   - Check that RLS policies are correctly set up
   - Verify the user has the correct permissions

3. **"User profile not created"**
   - Check the `handle_new_user()` trigger function
   - Verify the trigger is properly set up

4. **"Cannot connect to Supabase"**
   - Check your internet connection
   - Verify the Supabase URL is correct
   - Check if your Supabase project is paused (free tier projects pause after inactivity)

### Getting Help

- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- GitHub Issues: Create an issue in the project repository

## Next Steps

1. Set up email templates for authentication
2. Configure storage buckets for file uploads
3. Set up database backups
4. Configure rate limiting
5. Set up monitoring and logging
6. Deploy to production

## Production Deployment

Before deploying to production:

1. Update environment variables in your hosting platform
2. Set up custom domain in Supabase
3. Configure production redirect URLs
4. Enable email confirmation (recommended)
5. Set up database backups
6. Configure monitoring and alerts
7. Review and test RLS policies
8. Set up CI/CD pipeline

## Security Best Practices

1. **Never expose service_role key**: Only use the `anon` key in client-side code
2. **Use RLS**: Always enable Row Level Security on sensitive tables
3. **Validate input**: Validate all user input on both client and server
4. **Rate limiting**: Implement rate limiting for authentication endpoints
5. **Email confirmation**: Enable email confirmation for new users
6. **Regular backups**: Set up automated database backups
7. **Monitor access**: Regularly review access logs and user activity

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)

