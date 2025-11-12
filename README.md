# SjNodes - Minecraft Hosting, VPS & Discord Bots

A modern hosting platform for Minecraft servers, VPS hosting, and Discord bot services. Built with Next.js, Prisma, and custom authentication.

## Features

- ✅ Service listing (Minecraft Hosting, VPS, Discord Bots)
- ✅ Product detail pages with image galleries
- ✅ Shopping cart functionality
- ✅ Backend JWT authentication system
- ✅ Secure password hashing with bcrypt
- ✅ Order management
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ HTTP-only cookie authentication
- ✅ Dark mode support with theme toggle
- ✅ Modern UI with animations and effects

## Tech Stack

- **Next.js 16** - React framework
- **Prisma** - Database ORM
- **JWT Authentication** - Secure backend authentication
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **bcryptjs** - Password hashing
- **next-themes** - Theme management

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will also automatically run `prisma generate` thanks to the postinstall script.

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database URL (PostgreSQL)
DATABASE_URL="postgresql://neondb_owner:npg_HnYlhbJz4o9x@ep-winter-night-a14rrm6s-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

# JWT Secret (change this to a secure random string in production)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Site URL
NEXT_PUBLIC_SITE_URL="https://www.sjnode.site"

# Discord
NEXT_PUBLIC_DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/1437037588707016724/cfod3ZbtQ3LE2nfWki_WPjW1tWOZ_UJm08pZHQnxIKkIPqqYFGLAGHPxV_RIeKfD20oV"
NEXT_PUBLIC_DISCORD_INVITE="https://discord.gg/25WFhNFMdX"

# Google Vision API (optional)
GOOGLE_VISION_API_KEY="AIzaSyAGLfjGCUjO8CLPkvBEMHzV9E4a8Z9IbuE"
```

### 3. Database Setup

Run the setup command to generate Prisma client, push schema, and seed the database:

```bash
npm run prisma:setup
```

Or run the commands individually:

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed database with sample products
npm run prisma:seed
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### Prisma Commands

- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:push` - Push schema changes to database
- `npm run prisma:seed` - Seed database with sample products
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:setup` - Complete setup (generate + push + seed)
- `npm run prisma:reset` - Reset database (use with caution!)

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   │   └── products/    # Product API endpoints
│   ├── products/        # Product pages
│   ├── admin/           # Admin pages
│   └── ...
├── components/          # React components
├── lib/                 # Utility libraries
│   ├── prisma.ts        # Prisma client
│   └── supabase/        # Supabase clients
├── prisma/              # Prisma files
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seed script
└── types/               # TypeScript type definitions
```

## Database Architecture

- **Prisma** manages all database operations
- **PostgreSQL** database (NeonDB)
- **JWT tokens** stored in HTTP-only cookies for secure authentication
- Products (hosting services), cart items, orders, and reviews are stored via Prisma

## Authentication

Backend authentication system with:
- **POST /api/auth/register** - User registration with password hashing
- **POST /api/auth/login** - User login with JWT token generation
- **POST /api/auth/logout** - Clear authentication cookie
- **GET /api/auth/me** - Get current authenticated user

## Deployment

To deploy to production:

1. Push changes to GitHub
2. Run the VPS setup script on your server
3. The script will automatically pull the latest changes and deploy the application

## Notes

- All service images use Unsplash URLs for demonstration
- The database is seeded with 12 hosting services (Minecraft, VPS, Discord Bots)
- Make sure to run `npm install` to install bcryptjs and jsonwebtoken dependencies
- Change JWT_SECRET in production to a secure random string
- The application supports both light and dark modes with a theme toggle

## Production Deployment

1. Push changes to GitHub (already done)
2. Run the VPS setup script on your server:
   ```bash
   curl -s https://raw.githubusercontent.com/princekop/Sj-web/main/vps-setup.sh | sudo bash
   ```

3. Or manually run the commands from `vps-setup.sh` on your VPS

## Dark Mode

The application now supports dark mode with a theme toggle in the navigation bar. Users can switch between light and dark themes based on their preference.
