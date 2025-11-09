# Database Connection Troubleshooting

## Error: "FATAL: Tenant or user not found"

This error typically means your Supabase database is paused or the connection string is incorrect.

## Solution Steps:

### 1. Check if Database is Paused

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Check if you see a "Paused" indicator or "Resume" button
4. If paused, click **"Resume"** to activate your database

### 2. Get Correct Connection Strings

1. In Supabase Dashboard, go to **Settings** → **Database**
2. Scroll to **Connection string** section
3. Copy the **URI** connection string (Transaction mode)
   - This should look like: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true`
4. Copy the **Direct connection** string (Session mode)
   - This should look like: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres`

### 3. Update .env File

Update these variables in your `.env` file:

```env
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

**Important Notes:**
- Replace `[project-ref]` with your actual project reference
- Replace `[password]` with your actual database password
- Replace `[region]` with your actual region (e.g., `us-east-1`)

### 4. Test Connection

After updating, test the connection:

```powershell
node test-connection.js
```

Or try:

```powershell
npm run prisma:push
```

### 5. If Still Having Issues

1. **Reset Database Password**:
   - In Supabase Dashboard → Settings → Database
   - Click "Reset database password"
   - Copy the new password and update `.env`

2. **Check Project Status**:
   - Ensure your Supabase project is active
   - Free tier projects pause after 7 days of inactivity

3. **Verify Project Reference**:
   - Your project reference is in the URL: `https://[project-ref].supabase.co`
   - Make sure it matches in your connection string

## Once Connected Successfully:

After the connection works, run:

```powershell
npm run prisma:push    # Push schema to database
npm run prisma:seed    # Seed products with images
```

Then your products will be available with all images!
