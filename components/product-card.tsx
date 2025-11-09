import Link from "next/link"
import { Heart } from "lucide-react"
import type { Database } from "@/types/supabase"

type Product = Database["public"]["Tables"]["products"]["Row"]

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden bg-secondary rounded-lg mb-4 aspect-square premium-shadow fabric-texture">
          <img
            src={product.image_url || "/placeholder.svg?height=400&width=400&query=luxury%20fashion%20clothing"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <button className="absolute top-4 right-4 p-2 bg-primary text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg hover:bg-primary/90">
            <Heart size={18} />
          </button>
        </div>
        <h3 className="font-light text-lg mb-1 group-hover:text-primary transition">{product.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="font-medium">${product.price}</span>
            {product.original_price && (
              <span className="text-muted-foreground line-through text-sm">${product.original_price}</span>
            )}
          </div>
          {product.rating && <span className="text-sm text-muted-foreground">★ {product.rating}</span>}
        </div>
      </div>
    </Link>
  )
}
