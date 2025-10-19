import React from 'react'
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MessageIcon from '@mui/icons-material/Message'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useNavigate } from 'react-router-dom'

export default function SidebarCustomer({ open }) {
  const navigate = useNavigate()
  const menu = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/user/dashboard' },
    { text: 'Orders', icon: <ShoppingCartIcon />, path: '/user/orders' },
    { text: 'Wishlist', icon: <FavoriteIcon />, path: '/user/wishlist' },
    { text: 'Messages', icon: <MessageIcon />, path: '/user/messages' },
    { text: 'Profile', icon: <AccountCircleIcon />, path: '/user/profile' }
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
