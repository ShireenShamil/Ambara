"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Type, Palette, Download, Save, ShoppingCart } from "lucide-react"

export default function CreateDesign() {
  const [selectedProduct, setSelectedProduct] = useState("tshirt")
  const [designText, setDesignText] = useState("Your Text Here")
  const [textColor, setTextColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#FFFFFF")

  const products = [
    { id: "tshirt", name: "T-Shirt", image: "/plain-white-tshirt.png" },
    { id: "mug", name: "Mug", image: "/ceramic-mug.png" },
    { id: "frame", name: "Frame", image: "/ornate-gold-frame.png" },
    { id: "logo", name: "Logo", image: "/abstract-logo.png" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Design</h1>
        <p className="text-muted-foreground">Customize your product with text, colors, and images</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Product Selection */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4">
            <h3 className="font-bold text-foreground mb-4">Select Product</h3>
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedProduct === product.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-20 object-cover rounded mb-2"
                  />
                  <p className="text-sm font-medium text-foreground">{product.name}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Toolbox */}
          <Card className="p-4 space-y-4">
            <h3 className="font-bold text-foreground">Toolbox</h3>

            {/* Text Input */}
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                <Type size={16} /> Text
              </label>
              <input
                type="text"
                value={designText}
                onChange={(e) => setDesignText(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                placeholder="Enter text"
              />
            </div>

            {/* Text Color */}
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                <Palette size={16} /> Text Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                />
              </div>
            </div>

            {/* Background Color */}
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                <Palette size={16} /> Background
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4">
              <Button className="w-full bg-primary hover:bg-primary/90 gap-2">
                <Save size={16} /> Save Design
              </Button>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Download size={16} /> Download
              </Button>
            </div>
          </Card>
        </div>

        {/* Center Panel - Canvas Preview */}
        <div className="lg:col-span-1">
          <Card className="p-8 flex items-center justify-center min-h-96">
            <div
              className="w-full h-full flex items-center justify-center rounded-lg"
              style={{ backgroundColor: bgColor }}
            >
              <p className="text-4xl font-bold text-center px-4" style={{ color: textColor }}>
                {designText}
              </p>
            </div>
          </Card>
        </div>

        {/* Right Panel - Product Preview */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-6 flex flex-col items-center justify-center min-h-96">
            <img
              src={products.find((p) => p.id === selectedProduct)?.image || "/placeholder.svg"}
              alt="Product preview"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-muted-foreground text-center">
              {products.find((p) => p.id === selectedProduct)?.name} Preview
            </p>
          </Card>

          {/* Add to Cart */}
          <Button className="w-full bg-primary hover:bg-primary/90 gap-2 h-12">
            <ShoppingCart size={18} /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
