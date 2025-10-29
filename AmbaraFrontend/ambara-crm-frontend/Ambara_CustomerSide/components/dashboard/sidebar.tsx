"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Palette, ShoppingBag, BookmarkIcon, LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/create-design", label: "Create Design", icon: Palette },
    { href: "/dashboard/my-orders", label: "My Orders", icon: ShoppingBag },
    { href: "/dashboard/saved-designs", label: "Saved Designs", icon: BookmarkIcon },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen bg-sidebar border-r border-sidebar-border transition-transform duration-300 z-50 md:z-0 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold">A</span>
              </div>
              <span className="font-bold text-sidebar-foreground hidden sm:inline">Ambara</span>
            </Link>
            <button onClick={() => setOpen(false)} className="md:hidden text-sidebar-foreground">
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={active ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 ${
                      active
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-gray-200 hover:text-sidebar-black"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-green-500 hover:text-sidebar-primary-foreground"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
    </>
  )
}
