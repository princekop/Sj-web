import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

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

    // Transform Prisma product to match the expected format
    const formattedProduct = {
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

    return NextResponse.json(formattedProduct)
  } catch (error) {
    console.error('[API] Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
