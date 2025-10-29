import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "T-Shirts",
    description: "Premium quality custom printed t-shirts",
    price: "Rs. 12.99",
    image: "/custom-printed-tshirt.jpg",
    category: "apparel",
  },
  {
    id: 2,
    name: "Mugs",
    description: "Personalized ceramic mugs for any occasion",
    price: "Rs. 8.99",
    image: "/custom-printed-mug.jpg",
    category: "drinkware",
  },
  {
    id: 3,
    name: "Frames",
    description: "Custom photo frames with your designs",
    price: "Rs. 15.99",
    image: "/custom-photo-frame.jpg",
    category: "home",
  },
  {
    id: 4,
    name: "Logos & Branding",
    description: "Professional logo printing services",
    price: "Rs. 24.99",
    image: "/professional-logo.png",
    category: "branding",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our wide range of customizable products and bring your creative vision to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition">
              <div className="bg-muted h-48 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-foreground mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  <Link href={`/customize/${product.id}`}>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Customize
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button size="lg" variant="outline">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
