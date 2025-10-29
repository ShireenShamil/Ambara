import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="bg-primary py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Create Something Amazing?
        </h2>
        <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Let's bring your ideas to life. Start designing your custom products today and see the difference quality
          makes.
        </p>
        <Link href="/design">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Start Your Project
          </Button>
        </Link>
      </div>
    </section>
  )
}
