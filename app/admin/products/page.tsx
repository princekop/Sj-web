"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import type { Database } from "@/types/supabase"

type Product = Database["public"]["Tables"]["products"]["Row"]

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase.from("products").select("*")

        if (error) throw error
        setProducts(data || [])
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light tracking-tight">Products</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
          <Plus size={20} />
          Add Product
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Product</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Category</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Price</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Stock</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-secondary transition">
                  <td className="py-4 px-4">{product.name}</td>
                  <td className="py-4 px-4 text-muted-foreground">{product.category}</td>
                  <td className="py-4 px-4">${product.price}</td>
                  <td className="py-4 px-4">{product.stock || 0}</td>
                  <td className="py-4 px-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                      <Edit size={16} />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-destructive bg-transparent"
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
