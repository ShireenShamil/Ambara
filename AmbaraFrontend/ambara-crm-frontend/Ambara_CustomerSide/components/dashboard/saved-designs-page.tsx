"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, ShoppingCart, Search } from "lucide-react"

export default function SavedDesigns() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterProduct, setFilterProduct] = useState("all")

  const savedDesigns = [
    {
      id: 1,
      name: "Summer Collection",
      product: "tshirt",
      thumbnail: "/tshirt-design.jpg",
      dateSaved: "Oct 20, 2025",
    },
    {
      id: 2,
      name: "Coffee Lover Mug",
      product: "mug",
      thumbnail: "/mug-design.jpg",
      dateSaved: "Oct 18, 2025",
    },
    {
      id: 3,
      name: "Company Logo Frame",
      product: "frame",
      thumbnail: "/frame-design.jpg",
      dateSaved: "Oct 15, 2025",
    },
    {
      id: 4,
      name: "Brand Identity",
      product: "logo",
      thumbnail: "/logo-design.jpg",
      dateSaved: "Oct 12, 2025",
    },
  ]

  const filteredDesigns = savedDesigns.filter((design) => {
    const matchesSearch = design.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProduct = filterProduct === "all" || design.product === filterProduct
    return matchesSearch && matchesProduct
  })

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Saved Designs</h1>
        <p className="text-muted-foreground">Manage and reuse your saved designs</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search designs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>
        <div className="flex gap-2">
          <Button variant={filterProduct === "all" ? "default" : "outline"} onClick={() => setFilterProduct("all")}>
            All
          </Button>
          <Button
            variant={filterProduct === "tshirt" ? "default" : "outline"}
            onClick={() => setFilterProduct("tshirt")}
          >
            T-Shirt
          </Button>
          <Button variant={filterProduct === "mug" ? "default" : "outline"} onClick={() => setFilterProduct("mug")}>
            Mug
          </Button>
          <Button variant={filterProduct === "frame" ? "default" : "outline"} onClick={() => setFilterProduct("frame")}>
            Frame
          </Button>
        </div>
      </div>

      {/* Designs Grid */}
      {filteredDesigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDesigns.map((design) => (
            <Card key={design.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={design.thumbnail || "/placeholder.svg"}
                  alt={design.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="font-bold text-foreground truncate">{design.name}</p>
                  <p className="text-xs text-muted-foreground">Saved {design.dateSaved}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                    <Edit2 size={16} /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                    <ShoppingCart size={16} /> Order
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">No saved designs yet</p>
          <p className="text-sm text-muted-foreground">Start creating your first design to save it here</p>
        </Card>
      )}
    </div>
  )
}
