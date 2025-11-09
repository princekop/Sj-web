import type React from "react"
import Link from "next/link"
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card premium-shadow-lg">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-light tracking-wider">LUXE Admin</h1>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin/dashboard">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition text-foreground hover:text-primary">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link href="/admin/products">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition text-foreground hover:text-primary">
              <Package size={20} />
              <span>Products</span>
            </div>
          </Link>
          <Link href="/admin/orders">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition text-foreground hover:text-primary">
              <ShoppingCart size={20} />
              <span>Orders</span>
            </div>
          </Link>
          <Link href="/admin/customers">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition text-foreground hover:text-primary">
              <Users size={20} />
              <span>Customers</span>
            </div>
          </Link>
          <Link href="/admin/settings">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition text-foreground hover:text-primary">
              <Settings size={20} />
              <span>Settings</span>
            </div>
          </Link>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="outline" className="w-full flex items-center gap-2 bg-transparent">
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
