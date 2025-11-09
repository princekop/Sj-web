# Prisma Setup Guide

## 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

## 2. Environment Variables

Add these to your `.env` file:

```bash
# Supabase (for Auth only)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Supabase Database URLs (for Prisma)
# Get these from Supabase Dashboard -> Settings -> Database
# Connection String format: Use "Transaction" mode
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct URL (Session mode - for migrations)
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

## 3. Push Schema to Database

```bash
npm run prisma:push
```

## 4. Generate Prisma Client

```bash
npm run prisma:generate
```

## 5. Run Development Server

```bash
npm run dev
```

## Additional Commands

- **View Database**: `npm run prisma:studio`
- **Reset Database**: `npx prisma db push --force-reset`

## Notes

- Supabase is used ONLY for authentication
- Prisma manages all database operations
- No more RLS policy issues!
- Type-safe database queries
