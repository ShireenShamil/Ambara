import React from 'react'
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import InventoryIcon from '@mui/icons-material/Inventory'
import MessageIcon from '@mui/icons-material/Message'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate } from 'react-router-dom'

export default function SidebarAdmin({ open }) {
  const navigate = useNavigate()
  const menu = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
    { text: 'Orders', icon: <InventoryIcon />, path: '/admin/orders' },
    { text: 'Products', icon: <InventoryIcon />, path: '/admin/products' },
    { text: 'Messages', icon: <MessageIcon />, path: '/admin/messages' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/admin/analytics' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' }
  ]

  return (
    <Drawer variant="persistent" anchor="left" open={open} sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240 } }}>
      <List>
        {menu.map((m, idx) => (
          <ListItem button key={idx} onClick={() => navigate(m.path)}>
            <ListItemIcon>{m.icon}</ListItemIcon>
            <ListItemText primary={m.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
