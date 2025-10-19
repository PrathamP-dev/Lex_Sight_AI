# Supabase Database Setup Instructions

Your LexSight application is now configured to use Supabase for persistent data storage. To complete the setup, you need to create the database tables in your Supabase project.

## Database Setup Steps

1. **Open Supabase SQL Editor**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Click on "SQL Editor" in the left sidebar

2. **Run the Schema Script**
   - Open the file `supabase-schema.sql` in this project
   - Copy all the SQL code
   - Paste it into the Supabase SQL Editor
   - Click "Run" to execute the script

3. **Verify Tables Created**
   - Go to "Table Editor" in the Supabase dashboard
   - You should see three tables:
     - `users` - Stores user account information
     - `documents` - Stores uploaded documents
     - `sessions` - Stores user login sessions (persistent across server restarts)

## What This Does

The schema creates:
- **Users table**: Stores user accounts with email, password (hashed), name, and profile image
- **Documents table**: Stores user documents with proper foreign key relationships
- **Sessions table**: Stores authentication sessions in the database (fixes login persistence issues)
- **Indexes**: Optimizes database queries for better performance

## Security Model

This application uses **custom session-based authentication** (not Supabase Auth):

- **Access Control**: Enforced at the application layer through session cookies
- **Middleware Protection**: The `middleware.ts` file protects routes and validates user sessions
- **Server-Side Operations**: All database queries run server-side through Next.js API routes
- **Password Security**: User passwords are hashed with bcrypt before storage

### Important Security Notes

1. The `SUPABASE_ANON_KEY` is treated as a server-side secret
2. Users cannot access the database directly from the browser
3. All data access goes through authenticated API routes that verify the user's session
4. Row Level Security (RLS) is not used because access control happens at the API layer

## Testing

After running the schema:
1. Try signing up with a new account at `/signup`
2. Upload a document after logging in
3. Reload the page - your documents should persist
4. Log in from a different device - your documents will be there

All user data and documents are now securely stored in your Supabase database and will persist across restarts and device changes!
