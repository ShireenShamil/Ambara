import React from 'react'
import { Drawer, List, ListItemButton, ListItemText, ListItemIcon, Box, Avatar, Typography, Divider } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MessageIcon from '@mui/icons-material/Message'
import DesignServicesIcon from '@mui/icons-material/ColorLens'
import { useNavigate, useLocation } from 'react-router-dom'

const drawerWidth = 240

export default function SidebarCustomer({ open }) {
  const navigate = useNavigate()
  const location = useLocation()

  const menu = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/user/dashboard' },
    { text: 'Create Design', icon: <DesignServicesIcon />, path: '/user/create-design' },
    { text: 'My Orders', icon: <ShoppingCartIcon />, path: '/user/orders' },
    { text: 'Saved Designs', icon: <FavoriteIcon />, path: '/user/wishlist' },
    { text: 'Messages', icon: <MessageIcon />, path: '/user/messages' },
    { text: 'Profile', icon: <Avatar sx={{ width: 24, height: 24 }} />, path: '/user/profile' }
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', borderRight: '0', backgroundColor: '#ffffff' }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
        <Avatar sx={{ bgcolor: '#4CAF50', width: 44, height: 44, fontWeight: 700 }}>A</Avatar>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Ambara
        </Typography>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <List sx={{ p: 1 }}>
        {menu.map((m, idx) => (
          <ListItemButton
            key={idx}
            onClick={() => navigate(m.path)}
            sx={{
              borderRadius: 2,
              my: 1,
              px: 1.25,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              ...(isActive(m.path)
                ? { backgroundColor: '#4CAF50', color: '#ffffff', '& .MuiListItemIcon-root': { color: '#ffffff' } }
                : { '&:hover': { backgroundColor: 'rgba(76,175,80,0.08)' } })
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: isActive(m.path) ? '#fff' : '#0E1A2B' }}>{m.icon}</ListItemIcon>
            <ListItemText primary={m.text} sx={{ '& .MuiTypography-root': { fontWeight: 700, color: isActive(m.path) ? '#fff' : '#0E1A2B' } }} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}
