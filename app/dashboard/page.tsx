"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, Package, Heart, Settings } from "lucide-react"

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("orders")
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login?redirect=/dashboard")
      return
    }

    if (user) {
      // Load orders from localStorage
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      const userOrders = allOrders.filter((order: any) => order.userId === user.id)
      setOrders(userOrders)
    }
  }, [user, isLoading, router])

  const handleLogout = () => {
    logout()
  }

  if (isLoading) {
    return <div className="max-w-7xl mx-auto px-4 py-12">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-secondary rounded p-6 sticky top-20">
            <h2 className="text-lg font-medium mb-4">Account</h2>
            <div className="space-y-2 mb-6 pb-6 border-b border-border">
              <p className="text-sm text-muted-foreground">Signed in as</p>
              <p className="font-medium text-sm">{user?.email}</p>
            </div>

            <nav className="space-y-2 mb-6">
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-2 rounded transition flex items-center gap-2 ${
                  activeTab === "orders" ? "bg-primary text-primary-foreground" : "hover:bg-background"
                }`}
              >
                <Package size={18} />
                <span>Orders</span>
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full text-left px-4 py-2 rounded transition flex items-center gap-2 ${
                  activeTab === "wishlist" ? "bg-primary text-primary-foreground" : "hover:bg-background"
                }`}
              >
                <Heart size={18} />
                <span>Wishlist</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left px-4 py-2 rounded transition flex items-center gap-2 ${
                  activeTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-background"
                }`}
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>
            </nav>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-transparent"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-8">Your Orders</h1>

              {orders.length === 0 ? (
                <div className="text-center py-12 bg-secondary rounded">
                  <Package size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No orders yet</p>
                  <Button className="bg-primary text-primary-foreground" onClick={() => router.push("/shop")}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-border rounded p-6 hover:bg-secondary/50 transition">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="font-medium mb-2">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground mb-2">
                            {order.items?.length || 0} item(s)
                          </p>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-3 py-1 rounded-full font-medium ${
                                order.status === "completed" || order.status === "verified"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : order.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-medium">₹{order.grandTotal?.toFixed(2) || '0.00'}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/orders/${order.id}`)}
                            className="mt-2"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-8">Wishlist</h1>
              <div className="text-center py-12 bg-secondary rounded">
                <Heart size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
                <Button className="bg-primary text-primary-foreground" onClick={() => router.push("/shop")}>
                  Explore Products
                </Button>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-8">Account Settings</h1>
              <div className="bg-secondary rounded p-6 space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Email Address</h3>
                  <p className="text-muted-foreground mb-4">{user?.email}</p>
                  <Button variant="outline" size="sm">
                    Change Email
                  </Button>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-medium mb-4">Password</h3>
                  <p className="text-muted-foreground mb-4">Update your password to keep your account secure</p>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-medium mb-4 text-destructive">Danger Zone</h3>
                  <p className="text-muted-foreground mb-4">Permanently delete your account and all associated data</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
