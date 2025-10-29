import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Create Something <span className="text-primary">Amazing</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Design and customize your perfect products. From t-shirts to mugs, bring your ideas to life with our
              easy-to-use design studio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/design">
                <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  Start Designing
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <img
              src="/custom-printed-products-mockup.jpg"
              alt="Design Studio Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
