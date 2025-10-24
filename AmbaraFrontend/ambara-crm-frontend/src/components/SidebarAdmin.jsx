import React from 'react'
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Box
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import InventoryIcon from '@mui/icons-material/Inventory'
import MessageIcon from '@mui/icons-material/Message'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate, useLocation } from 'react-router-dom'

export default function SidebarAdmin({ open }) {
  const navigate = useNavigate()
  const loc = useLocation()

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

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 30,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 260,
          background: 'linear-gradient(180deg, #064e3b 0%, #10b981 100%)',
          color: '#fff',
          borderRight: 'none',
          boxShadow: '4px 0 15px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease'
        }
      }}
    >
      <Box sx={{ textAlign: 'center', py: 3, borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            color: '#ecfdf5',
            textTransform: 'uppercase'
          }}
        >
          Admin Panel
        </Typography>
      </Box>

      <List sx={{ mt: 1 }}>
        {menu.map((m, idx) => {
          const isActive = loc.pathname === m.path
          return (
            <ListItemButton
              key={idx}
              onClick={() => navigate(m.path)}
              selected={isActive}
              sx={{
                my: 0.5,
                mx: 1,
                borderRadius: 2,
                color: isActive ? '#064e3b' : '#ecfdf5',
                backgroundColor: isActive ? '#a7f3d0' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive ? '#6ee7b7' : 'rgba(255,255,255,0.12)',
                  transform: 'scale(1.03)',
                  transition: '0.3s'
                },
                transition: 'all 0.25s ease-in-out',
                py: 1.2
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? '#065f46' : '#ecfdf5',
                  minWidth: 40,
                  transform: isActive ? 'scale(1.1)' : 'none',
                  transition: '0.3s'
                }}
              >
                {m.icon}
              </ListItemIcon>
              <ListItemText
                primary={m.text}
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: isActive ? 600 : 400
                }}
              />
            </ListItemButton>
          )
        })}
      </List>
    </Drawer>
  )
}
