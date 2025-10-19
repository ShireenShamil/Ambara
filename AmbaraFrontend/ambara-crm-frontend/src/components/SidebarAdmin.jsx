import React from 'react'
import { Drawer, List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import InventoryIcon from '@mui/icons-material/Inventory'
import MessageIcon from '@mui/icons-material/Message'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate, useLocation } from 'react-router-dom'

export default function SidebarAdmin({ open }) {
  const navigate = useNavigate()
  const menu = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
    { text: 'Orders', icon: <InventoryIcon />, path: '/admin/orders' },
    { text: 'Products', icon: <InventoryIcon />, path: '/admin/products' },
    { text: 'Messages', icon: <MessageIcon />, path: '/admin/messages' },
    { text: 'Templates', icon: <InventoryIcon />, path: '/admin/templates' },
    { text: 'Print Jobs', icon: <AnalyticsIcon />, path: '/admin/print-jobs' },
    { text: 'Reports', icon: <AnalyticsIcon />, path: '/admin/reports' },
    { text: 'Invoices', icon: <InventoryIcon />, path: '/admin/invoices' },
    { text: 'Notifications', icon: <MessageIcon />, path: '/admin/notifications' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' }
  ]

  const loc = useLocation()
  return (
    <Drawer variant="persistent" anchor="left" open={open} sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240 } }}>
      <List>
        {menu.map((m, idx) => (
          <ListItemButton key={idx} selected={loc.pathname === m.path} onClick={() => navigate(m.path)} sx={{ py:1 }}>
            <ListItemIcon>{m.icon}</ListItemIcon>
            <ListItemText primary={m.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}
