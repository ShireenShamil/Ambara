"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">PrintHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition">
              Products
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
            <Link href="/dashboard" className="text-foreground hover:text-primary transition">
              Dashboard
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
            <Link href="/dashboard">
              <Button className="hidden sm:inline-flex bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-foreground hover:bg-muted rounded">
              Home
            </Link>
            <Link href="/products" className="block px-4 py-2 text-foreground hover:bg-muted rounded">
              Products
            </Link>
            <Link href="/about" className="block px-4 py-2 text-foreground hover:bg-muted rounded">
              About
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-foreground hover:bg-muted rounded">
              Contact
            </Link>
            <Link href="/dashboard" className="block px-4 py-2 text-foreground hover:bg-muted rounded">
              Dashboard
            </Link>
            <Link href="/dashboard">
              <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
