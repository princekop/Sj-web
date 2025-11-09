export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          original_price: number | null
          category: string
          image_url: string | null
          images: string[]
          sizes: string[]
          colors: string[]
          stock: number
          rating: number
          reviews_count: number
          featured: boolean
          created_at: string
          updated_at: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          size: string | null
          color: string | null
          created_at: string
          updated_at: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: string
          total_amount: number
          shipping_address: Record<string, unknown>
          billing_address: Record<string, unknown> | null
          payment_method: string | null
          stripe_payment_id: string | null
          created_at: string
          updated_at: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          size: string | null
          color: string | null
          created_at: string
        }
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string
          rating: number
          title: string | null
          comment: string | null
          created_at: string
          updated_at: string
        }
      }
      wishlist: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
      }
    }
  }
}
