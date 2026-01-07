# Supabase Setup Guide for Pulse HIIT

This guide will help you set up Supabase backend for cloud sync functionality.

## Prerequisites

- A Supabase account (free tier available)
- Node.js and npm installed

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in the details:
   - **Project Name**: `pulse-hiit` (or your preferred name)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is sufficient for development

5. Wait for the project to be created (~2 minutes)

## Step 2: Run Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire content from `supabase/migrations/20250102_initial_schema.sql`
4. Paste it into the SQL Editor
5. Click "Run" to execute the migration
6. Verify tables were created in **Table Editor**

You should see these tables:
- `profiles`
- `workout_sessions`
- `presets`
- `program_progress`

## Step 3: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** > **API**
2. You'll need two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 4: Configure Environment Variables

### Option A: Using .env file (Recommended for development)

1. Create a `.env` file in the root of your project:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Add `.env` to your `.gitignore` (already done)

### Option B: Using Expo EAS Secrets (For production)

```bash
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value https://your-project.supabase.co
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value your-anon-key
```

## Step 5: Enable Authentication

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Enable **Email** provider (enabled by default)
3. Optional: Enable social providers (Google, Apple, etc.)
4. Configure email templates in **Authentication** > **Email Templates**

## Step 6: Test the Connection

Run the app and check the console for Supabase connection logs:

```bash
npm start
```

## Database Schema Overview

### `profiles`
Stores user profile information (weight, height, age, sex) for calorie calculations.

### `workout_sessions`
Stores all completed workout sessions with stats (rounds, calories, duration).

### `presets`
Stores user's custom workout presets synced across devices.

### `program_progress`
Tracks user progress in training programs (which workouts completed).

## Row Level Security (RLS)

All tables have RLS enabled, meaning:
- Users can only see/modify their own data
- Data is automatically filtered by `user_id`
- Secure by default - no manual security checks needed in the app

## Monitoring

- **Database**: Check table contents in **Table Editor**
- **Logs**: View real-time logs in **Logs** section
- **API Usage**: Monitor in **Settings** > **Usage**

## Troubleshooting

### "Invalid API key" error
- Double-check your `EXPO_PUBLIC_SUPABASE_ANON_KEY` matches the one in Settings > API
- Make sure you're using the **anon/public** key, not the service_role key

### "relation does not exist" error
- The migration wasn't run successfully
- Re-run the SQL migration in SQL Editor

### RLS policy errors
- Check that you're authenticated (have a valid session)
- Verify RLS policies in Table Editor > table > Policies

### Data not syncing
- Check network connectivity
- Verify authentication status
- Check Supabase logs for errors

## Next Steps

After setup is complete:
1. Test authentication flow
2. Verify data syncs across devices
3. Monitor usage in Supabase dashboard
4. Consider upgrading to Pro for production ($25/month)

## Free Tier Limits

- Database: 500 MB
- Storage: 1 GB
- Bandwidth: 5 GB
- Monthly Active Users: Unlimited
- API Requests: Unlimited

These limits are usually sufficient for small to medium apps. Monitor usage in your dashboard.
