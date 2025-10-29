"use client"

import { BarChart3, Zap, TrendingUp, Award } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
  { label: "Orders in Progress", value: "3", icon: Zap, color: "bg-blue-100 text-blue-600" },
  { label: "Saved Designs", value: "12", icon: TrendingUp, color: "bg-green-100 text-green-600" },
  { label: "Total Spent", value: "Rs. 2,450", icon: BarChart3, color: "bg-purple-100 text-purple-600" },
  { label: "Loyalty Points", value: "1,250", icon: Award, color: "bg-orange-100 text-orange-600" },
  ]

  const recentOrders = [
    {
      id: 1,
      product: "Custom T-Shirt",
      date: "Oct 20, 2025",
      status: "In Production",
      image: "/plain-white-tshirt.png",
    },
    { id: 2, product: "Mug Design", date: "Oct 18, 2025", status: "Shipped", image: "/ceramic-mug.png" },
    { id: 3, product: "Logo Frame", date: "Oct 15, 2025", status: "Delivered", image: "/ornate-gold-frame.png" },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 text-primary-foreground">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Charuka 👋</h1>
        <p className="text-primary-foreground/90">Ready to create something amazing?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Promotional Banner */}
      <Card className="bg-primary/10 border-primary/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-foreground mb-1">Special Offer This Week!</h3>
            <p className="text-muted-foreground">Get 20% off on all Mug Printing orders</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Shop Now</Button>
        </div>
      </Card>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Recent Orders</h2>
          <Link href="/dashboard/my-orders">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-foreground">Product</th>
                  <th className="text-left p-4 font-semibold text-foreground">Date</th>
                  <th className="text-left p-4 font-semibold text-foreground">Status</th>
                  <th className="text-left p-4 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.image || "/placeholder.svg"}
                          alt={order.product}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <span className="font-medium text-foreground">{order.product}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{order.date}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">
                        Track
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
