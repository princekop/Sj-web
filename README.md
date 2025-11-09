# SjNodes - Minecraft Hosting, VPS & Discord Bots

A modern hosting platform for Minecraft servers, VPS hosting, and Discord bot services. Built with Next.js, Prisma, and custom authentication.

## Tech Stack

- **Next.js 16** - React framework
- **Prisma** - Database ORM
- **JWT Authentication** - Secure backend authentication
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **bcryptjs** - Password hashing

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will also automatically run `prisma generate` thanks to the postinstall script.

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database URL (SQLite by default)
DATABASE_URL="file:./dev.db"

# JWT Secret (change this to a secure random string in production)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
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
- **SQLite** database for development (can be changed to PostgreSQL/MySQL for production)
- **JWT tokens** stored in HTTP-only cookies for secure authentication
- Products (hosting services), cart items, orders, and reviews are stored via Prisma

## Authentication

Backend authentication system with:
- **POST /api/auth/register** - User registration with password hashing
- **POST /api/auth/login** - User login with JWT token generation
- **POST /api/auth/logout** - Clear authentication cookie
- **GET /api/auth/me** - Get current authenticated user

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

## Notes

- All service images use Unsplash URLs for demonstration
- The database is seeded with 12 hosting services (Minecraft, VPS, Discord Bots)
- Make sure to run `npm install` to install bcryptjs and jsonwebtoken dependencies
- Change JWT_SECRET in production to a secure random string

