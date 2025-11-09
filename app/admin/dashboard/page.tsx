"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = getSupabaseClient()

        const [ordersRes, customersRes, productsRes] = await Promise.all([
          supabase.from("orders").select("*", { count: "exact" }),
          supabase.from("users").select("*", { count: "exact" }),
          supabase.from("products").select("*", { count: "exact" }),
        ])

        const totalRevenue = ordersRes.data?.reduce((sum, order) => sum + (order.total || 0), 0) || 0

        setStats({
          totalOrders: ordersRes.count || 0,
          totalRevenue,
          totalCustomers: customersRes.count || 0,
          totalProducts: productsRes.count || 0,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const chartData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
  ]

  return (
    <div>
      <h1 className="text-3xl font-light tracking-tight mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 premium-shadow">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Orders</h3>
          <p className="text-3xl font-light">{stats.totalOrders}</p>
        </Card>
        <Card className="p-6 premium-shadow">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Revenue</h3>
          <p className="text-3xl font-light">${stats.totalRevenue.toFixed(2)}</p>
        </Card>
        <Card className="p-6 premium-shadow">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Customers</h3>
          <p className="text-3xl font-light">{stats.totalCustomers}</p>
        </Card>
        <Card className="p-6 premium-shadow">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Products</h3>
          <p className="text-3xl font-light">{stats.totalProducts}</p>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6 premium-shadow">
        <h2 className="text-xl font-light mb-6">Sales Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="var(--primary)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
