"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Eye, RotateCcw } from "lucide-react"

export default function MyOrders() {
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const orders = [
    {
      id: "ORD-001",
      product: "Custom T-Shirt",
      date: "Oct 20, 2025",
      status: "In Production",
      amount: "Rs. 45.99",
      image: "/plain-white-tshirt.png",
      estimatedDelivery: "Oct 27, 2025",
    },
    {
      id: "ORD-002",
      product: "Mug Design",
      date: "Oct 18, 2025",
      status: "Shipped",
      amount: "Rs. 24.99",
      image: "/ceramic-mug.png",
      estimatedDelivery: "Oct 25, 2025",
    },
    {
      id: "ORD-003",
      product: "Logo Frame",
      date: "Oct 15, 2025",
      status: "Delivered",
      amount: "Rs. 89.99",
      image: "/ornate-gold-frame.png",
      estimatedDelivery: "Oct 22, 2025",
    },
    {
      id: "ORD-004",
      product: "Business Cards",
      date: "Oct 10, 2025",
      status: "Delivered",
      amount: "Rs. 34.99",
      image: "/playing-cards-scattered.png",
      estimatedDelivery: "Oct 17, 2025",
    },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    const matchesSearch = order.product.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Production":
        return "bg-yellow-100 text-yellow-700"
      case "Shipped":
        return "bg-blue-100 text-blue-700"
      case "Delivered":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track and manage all your orders</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>
        <div className="flex gap-2">
          <Button variant={filterStatus === "all" ? "default" : "outline"} onClick={() => setFilterStatus("all")}>
            All
          </Button>
          <Button
            variant={filterStatus === "In Production" ? "default" : "outline"}
            onClick={() => setFilterStatus("In Production")}
          >
            In Progress
          </Button>
          <Button
            variant={filterStatus === "Shipped" ? "default" : "outline"}
            onClick={() => setFilterStatus("Shipped")}
          >
            Shipped
          </Button>
          <Button
            variant={filterStatus === "Delivered" ? "default" : "outline"}
            onClick={() => setFilterStatus("Delivered")}
          >
            Delivered
          </Button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Card key={order.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <img
                  src={order.image || "/placeholder.svg"}
                  alt={order.product}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-foreground">{order.product}</p>
                      <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Order Date</p>
                      <p className="font-medium text-foreground">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. Delivery</p>
                      <p className="font-medium text-foreground">{order.estimatedDelivery}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p className="font-medium text-foreground">{order.amount}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                        <Eye size={16} /> View
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                        <RotateCcw size={16} /> Reorder
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No orders found</p>
          </Card>
        )}
      </div>
    </div>
  )
}
