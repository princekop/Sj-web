import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper to convert arrays to JSON strings for SQLite
const json = (arr: string[]) => JSON.stringify(arr)

const products = [
  {
    name: 'Minecraft Server - Starter',
    description: 'Perfect for small communities. 2GB RAM, unlimited slots, DDoS protection, and 24/7 support.',
    price: 4.99,
    originalPrice: 7.99,
    category: 'Minecraft Hosting',
    imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
    images: json([
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=800&fit=crop',
    ]),
    sizes: json(['2GB RAM', '4GB RAM', '6GB RAM', '8GB RAM']),
    colors: json(['US East', 'US West', 'EU', 'Asia']),
    stock: 150,
    rating: 4.8,
    reviewsCount: 342,
    featured: true,
  },
  {
    name: 'Minecraft Server - Premium',
    description: 'High-performance hosting with 8GB RAM, mod support, automatic backups, and priority support.',
    price: 19.99,
    originalPrice: 29.99,
    category: 'Minecraft Hosting',
    imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
    images: json([
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=800&fit=crop',
    ]),
    sizes: json(['8GB RAM', '12GB RAM', '16GB RAM', '24GB RAM']),
    colors: json(['US East', 'US West', 'EU', 'Asia']),
    stock: 98,
    rating: 4.9,
    reviewsCount: 567,
    featured: true,
  },
  {
    name: 'Minecraft Server - Enterprise',
    description: 'Maximum performance with 32GB RAM, dedicated IP, custom plugins, and white-glove support.',
    price: 49.99,
    originalPrice: 69.99,
    category: 'Minecraft Hosting',
    imageUrl: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=800&fit=crop',
    images: json([
      'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=800&fit=crop',
    ]),
    sizes: json(['32GB RAM', '48GB RAM', '64GB RAM', '128GB RAM']),
    colors: json(['US East', 'US West', 'EU', 'Asia', 'Australia']),
    stock: 45,
    rating: 5.0,
    reviewsCount: 234,
    featured: true,
  },
  {
    name: 'VPS - Basic',
    description: 'Reliable VPS with 2 vCPU cores, 4GB RAM, 50GB NVMe SSD, and 1TB bandwidth.',
    price: 9.99,
    originalPrice: 14.99,
    category: 'VPS',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop',
    images: json([
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=800&fit=crop',
    ]),
    sizes: json(['2 vCPU', '4 vCPU', '6 vCPU', '8 vCPU']),
    colors: json(['US', 'EU', 'Asia']),
    stock: 120,
    rating: 4.7,
    reviewsCount: 456,
    featured: true,
  },
  {
    name: 'VPS - Professional',
    description: 'High-performance VPS with 8 vCPU cores, 16GB RAM, 200GB NVMe SSD, and unlimited bandwidth.',
    price: 29.99,
    originalPrice: 44.99,
    category: 'VPS',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop',
    images: json([
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=800&fit=crop',
    ]),
    sizes: json(['8 vCPU', '12 vCPU', '16 vCPU', '24 vCPU']),
    colors: json(['US', 'EU', 'Asia', 'Australia']),
    stock: 67,
    rating: 4.9,
    reviewsCount: 389,
    featured: true,
  },
  {
    name: 'VPS - Enterprise',
    description: 'Ultimate VPS power with 32 vCPU cores, 64GB RAM, 1TB NVMe SSD, and dedicated resources.',
    price: 89.99,
    originalPrice: 129.99,
    category: 'VPS',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=800&fit=crop',
    images: json([
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=800&fit=crop',
    ]),
    sizes: json(['32 vCPU', '48 vCPU', '64 vCPU', '96 vCPU']),
    colors: json(['US', 'EU', 'Asia', 'Australia', 'South America']),
    stock: 34,
    rating: 5.0,
    reviewsCount: 178,
    featured: true,
  },
  {
    name: 'Discord Bot - Starter',
    description: 'Custom Discord bot hosting with 99.9% uptime, auto-restart, and basic commands.',
    price: 3.99,
    originalPrice: 5.99,
    category: 'Discord Bots',
    imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
    images: json([
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=800&fit=crop',
    ]),
    sizes: json(['1 Bot', '2 Bots', '3 Bots', '5 Bots']),
    colors: json(['Standard', 'Premium']),
    stock: 200,
    rating: 4.6,
    reviewsCount: 892,
    featured: false,
  },
  {
    name: 'Discord Bot - Advanced',
    description: 'Advanced bot hosting with music support, moderation, custom plugins, and 24/7 hosting.',
    price: 12.99,
    originalPrice: 19.99,
    category: 'Discord Bots',
    imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
    images: json([
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=800&fit=crop',
    ]),
    sizes: json(['3 Bots', '5 Bots', '10 Bots', 'Unlimited']),
    colors: json(['Standard', 'Premium', 'Deluxe']),
    stock: 145,
    rating: 4.8,
    reviewsCount: 654,
    featured: false,
  },
  {
    name: 'Discord Bot - Custom Development',
    description: 'Fully custom Discord bot development with unlimited features, dedicated support, and source code.',
    price: 99.99,
    originalPrice: 149.99,
    category: 'Discord Bots',
    imageUrl: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=800&fit=crop',
    images: json([
      'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop',
    ]),
    sizes: json(['Custom']),
    colors: json(['Full Development', 'Premium Support']),
    stock: 25,
    rating: 5.0,
    reviewsCount: 123,
    featured: true,
  },
  {
    name: 'Minecraft Network Bundle',
    description: 'Complete network solution with BungeeCord, multiple servers, and central hub.',
    price: 79.99,
    originalPrice: 119.99,
    category: 'Minecraft Hosting',
    imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
    images: json([
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=800&fit=crop',
    ]),
    sizes: json(['5 Servers', '10 Servers', '20 Servers', 'Unlimited']),
    colors: json(['US', 'EU', 'Asia']),
    stock: 56,
    rating: 4.9,
    reviewsCount: 267,
    featured: true,
  },
  {
    name: 'Web Hosting - Basic',
    description: 'Reliable web hosting with cPanel, unlimited bandwidth, free SSL, and email accounts.',
    price: 5.99,
    originalPrice: 8.99,
    category: 'VPS',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop',
    images: json([
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=800&fit=crop',
    ]),
    sizes: json(['10GB', '25GB', '50GB', '100GB']),
    colors: json(['Shared', 'Managed']),
    stock: 180,
    rating: 4.7,
    reviewsCount: 543,
    featured: false,
  },
  {
    name: 'DDoS Protection Service',
    description: 'Enterprise-grade DDoS protection for all your services with real-time monitoring.',
    price: 24.99,
    originalPrice: 34.99,
    category: 'VPS',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop',
    images: json([
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=800&fit=crop',
    ]),
    sizes: json(['Basic', 'Advanced', 'Enterprise']),
    colors: json(['Global']),
    stock: 99,
    rating: 4.9,
    reviewsCount: 421,
    featured: false,
  },
]

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing products
  console.log('🗑️  Clearing existing products...')
  await prisma.product.deleteMany({})

  // Create products
  console.log('📦 Creating products...')
  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
    console.log(`✅ Created product: ${product.name}`)
  }

  console.log('✨ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
