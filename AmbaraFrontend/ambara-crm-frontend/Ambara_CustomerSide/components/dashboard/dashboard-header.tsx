"use client"

import { Menu, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useNotifications } from "@/contexts/notification-context"

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { state } = useNotifications()
  const unreadCount = state.notifications.filter(n => !n.read).length
  return (
    <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
      <button onClick={onMenuClick} className="md:hidden text-foreground hover:text-primary">
        <Menu size={24} />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <Link href="/dashboard/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
        </Link>
        <Link href="/dashboard/profile">
          <Button variant="ghost" size="icon">
            <User size={20} />
          </Button>
        </Link>
      </div>
    </header>
  )
}
