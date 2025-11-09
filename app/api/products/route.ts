import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '12')

    let where: any = {}

    if (featured === 'true') {
      where.featured = true
    }

    if (category) {
      where.category = category
    }

    const products = await prisma.product.findMany({
      where,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Transform Prisma products to match the expected format
    const formattedProducts = products.map((product) => {
      // Parse JSON strings back to arrays (SQLite stores arrays as JSON strings)
      const images = typeof product.images === 'string' 
        ? JSON.parse(product.images || '[]') 
        : Array.isArray(product.images) ? product.images : []
      const sizes = typeof product.sizes === 'string'
        ? JSON.parse(product.sizes || '[]')
        : Array.isArray(product.sizes) ? product.sizes : []
      const colors = typeof product.colors === 'string'
        ? JSON.parse(product.colors || '[]')
        : Array.isArray(product.colors) ? product.colors : []
      
      // Ensure imageUrl is included in images array if it exists
      const allImages = product.imageUrl && !images.includes(product.imageUrl)
        ? [product.imageUrl, ...images]
        : images.length > 0 ? images : product.imageUrl ? [product.imageUrl] : []

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        original_price: product.originalPrice,
        category: product.category,
        image_url: product.imageUrl || (allImages.length > 0 ? allImages[0] : null),
        images: allImages,
        sizes: sizes,
        colors: colors,
        stock: product.stock,
        rating: product.rating,
        reviews_count: product.reviewsCount,
        featured: product.featured,
        created_at: product.createdAt.toISOString(),
        updated_at: product.updatedAt.toISOString(),
      }
    })

    return NextResponse.json(formattedProducts)
  } catch (error) {
    console.error('[API] Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
