"use client"

import { createContext, useContext, useReducer, ReactNode } from 'react'

export interface Notification {
  id: string
  title: string
  description: string
  date: string
  read: boolean
  type: 'order' | 'design' | 'shipping' | 'promotion' | 'other'
  actionUrl?: string
}

interface NotificationState {
  notifications: Notification[]
  preferences: {
    order: boolean
    design: boolean
    shipping: boolean
    promotion: boolean
    other: boolean
  }
}

type NotificationAction =
  | { type: 'MARK_AS_READ'; id: string }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'CLEAR_ALL' }
  | { type: 'UPDATE_PREFERENCES'; preferences: NotificationState['preferences'] }

const initialState: NotificationState = {
  notifications: [
    {
      id: "1",
      title: "Your Order is Confirmed",
      description: "Order #AT7789 for Custom T-shirt has been confirmed. We'll start working on your design soon!",
      date: "2025-10-25",
      type: "order",
      read: false,
      actionUrl: "/dashboard/my-orders/AT789"
    },
    {
      id: "2",
      title: "Design Preview Ready",
      description: "The design preview for your Custom Mug (Order #AT788) is ready for your review.",
      date: "2025-10-24",
      type: "design",
      read: false,
      actionUrl: "/dashboard/my-orders/AT788"
    },
    {
      id: "3",
      title: "Order Shipped",
      description: "Your Custom Frame (Order #AT785) has been shipped! Track your package with tracking number LK123456789.",
      date: "2025-10-23",
      type: "shipping",
      read: true,
      actionUrl: "/dashboard/my-orders/AT785"
    },
    {
      id: "4",
      title: "Special Discount",
      description: "Enjoy 20% off on your next custom design order! Use code DESIGN20 at checkout.",
      date: "2025-10-22",
      type: "promotion",
      read: true
    }
  ],
  preferences: {
    order: true,
    design: true,
    shipping: true,
    promotion: true,
    other: true
  }
}

const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.id ? { ...notification, read: true } : notification
        )
      }
    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification => ({ ...notification, read: true }))
      }
    case 'CLEAR_ALL':
      return {
        ...state,
        notifications: []
      }
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: action.preferences
      }
    default:
      return state
  }
}

const NotificationContext = createContext<{
  state: NotificationState
  dispatch: React.Dispatch<NotificationAction>
} | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
